using Aura.Api.Data;
using Aura.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;

namespace Aura.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class InquiriesController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly ILogger<InquiriesController> _logger;

    public InquiriesController(AppDbContext context, ILogger<InquiriesController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpPost]
    [EnableRateLimiting("inquiry-policy")]
    public async Task<IActionResult> SubmitInquiry([FromBody] InquiryRequest request)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        // Honeypot bot protection
        if (!string.IsNullOrWhiteSpace(request.WebsiteHp))
        {
            _logger.LogWarning("Bot inquiry blocked via honeypot from IP: {Ip}", HttpContext.Connection.RemoteIpAddress);
            return Ok(new { success = true, message = "Inquiry received." });
        }

        var inquiry = new Inquiry
        {
            Id = $"inq-{Guid.NewGuid():N}",
            Name = request.Name.Trim(),
            Email = request.Email.Trim().ToLower(),
            Phone = request.Phone?.Trim(),
            Location = request.Location?.Trim(),
            Scale = request.Scale?.Trim(),
            Timeline = request.Timeline?.Trim(),
            Message = request.Message?.Trim(),
            Status = "New",
            ClientIp = HttpContext.Connection.RemoteIpAddress?.ToString(),
            SubmittedAt = DateTime.UtcNow
        };

        await _context.Inquiries.AddAsync(inquiry);
        await _context.SaveChangesAsync();

        _logger.LogInformation("New architectural inquiry received from {Name} ({Email})", inquiry.Name, inquiry.Email);

        return Ok(new { success = true, id = inquiry.Id, message = "Inquiry received successfully." });
    }

    [HttpGet]
    public async Task<IActionResult> GetInquiries([FromQuery] string? status)
    {
        var query = _context.Inquiries.AsQueryable();

        if (!string.IsNullOrWhiteSpace(status) && status != "All")
        {
            query = query.Where(i => i.Status == status);
        }

        var list = await query.OrderByDescending(i => i.SubmittedAt).ToListAsync();

        var result = list.Select(i => new
        {
            id = i.Id,
            name = i.Name,
            email = i.Email,
            phone = i.Phone,
            location = i.Location,
            size = i.Scale,
            timeline = i.Timeline,
            message = i.Message,
            status = i.Status,
            date = i.SubmittedAt.ToString("o")
        });

        return Ok(result);
    }

    [HttpPatch("{id}/status")]
    public async Task<IActionResult> UpdateInquiryStatus(string id, [FromBody] InquiryStatusUpdateRequest request)
    {
        var inquiry = await _context.Inquiries.FindAsync(id);
        if (inquiry == null) return NotFound(new { message = "Inquiry not found." });

        inquiry.Status = request.Status;
        await _context.SaveChangesAsync();

        _logger.LogInformation("Inquiry {Id} status updated to {Status}", id, request.Status);

        return Ok(new { success = true, id = inquiry.Id, status = inquiry.Status });
    }
}
