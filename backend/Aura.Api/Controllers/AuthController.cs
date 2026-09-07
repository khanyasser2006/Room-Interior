using System.Security.Claims;
using Aura.Api.Data;
using Aura.Api.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;

namespace Aura.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly ILogger<AuthController> _logger;

    public AuthController(AppDbContext context, ILogger<AuthController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpPost("login")]
    [EnableRateLimiting("login-policy")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var email = request.Email.Trim().ToLower();
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email.ToLower() == email);

        if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
        {
            _logger.LogWarning("Failed login attempt for email: {Email} from IP: {Ip}", email, HttpContext.Connection.RemoteIpAddress);
            return Unauthorized(new { message = "Invalid email or password." });
        }

        user.LastLoginAt = DateTime.UtcNow;
        await _context.SaveChangesAsync();

        // Build Claims
        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, user.Id),
            new(ClaimTypes.Email, user.Email),
            new(ClaimTypes.Name, $"{user.FirstName} {user.LastName}".Trim()),
            new(ClaimTypes.Role, user.Role)
        };

        var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
        var authProperties = new AuthenticationProperties
        {
            IsPersistent = true,
            ExpiresUtc = DateTimeOffset.UtcNow.AddDays(7),
            IssuedUtc = DateTimeOffset.UtcNow
        };

        await HttpContext.SignInAsync(
            CookieAuthenticationDefaults.AuthenticationScheme,
            new ClaimsPrincipal(claimsIdentity),
            authProperties
        );

        _logger.LogInformation("Successful login for user: {Email} with role: {Role}", user.Email, user.Role);

        return Ok(new
        {
            user = new UserDto(
                user.Id,
                user.Email,
                user.Role,
                user.FirstName,
                user.LastName,
                user.Phone,
                user.Location
            )
        });
    }

    [HttpPost("register")]
    [EnableRateLimiting("inquiry-policy")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        // Invisible Honeypot Check: Silently accept if bot filled it
        if (!string.IsNullOrWhiteSpace(request.WebsiteHp))
        {
            _logger.LogWarning("Bot submission blocked via registration honeypot from IP: {Ip}", HttpContext.Connection.RemoteIpAddress);
            return Ok(new { success = true, message = "Account created." });
        }

        var email = request.Email.Trim().ToLower();
        var exists = await _context.Users.AnyAsync(u => u.Email.ToLower() == email);
        if (exists)
        {
            return BadRequest(new { message = "An account with this email already exists." });
        }

        var newUser = new User
        {
            Email = email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password, 12),
            Role = "Client",
            FirstName = request.FirstName.Trim(),
            LastName = request.LastName.Trim(),
            Phone = request.Phone?.Trim(),
            Location = request.Location?.Trim(),
            CreatedAt = DateTime.UtcNow
        };

        await _context.Users.AddAsync(newUser);
        await _context.SaveChangesAsync();

        _logger.LogInformation("New user registered: {Email}", newUser.Email);

        return Ok(new
        {
            success = true,
            user = new UserDto(
                newUser.Id,
                newUser.Email,
                newUser.Role,
                newUser.FirstName,
                newUser.LastName,
                newUser.Phone,
                newUser.Location
            )
        });
    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        return Ok(new { success = true });
    }

    [HttpGet("me")]
    public async Task<IActionResult> GetCurrentUser()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized();
        }

        var user = await _context.Users.FindAsync(userId);
        if (user == null)
        {
            return Unauthorized();
        }

        return Ok(new UserDto(
            user.Id,
            user.Email,
            user.Role,
            user.FirstName,
            user.LastName,
            user.Phone,
            user.Location
        ));
    }
}
