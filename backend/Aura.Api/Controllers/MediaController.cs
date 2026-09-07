using Aura.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Aura.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MediaController : ControllerBase
{
    private readonly IImageSecurityService _imageSecurityService;
    private readonly IWebHostEnvironment _environment;
    private readonly ILogger<MediaController> _logger;

    public MediaController(
        IImageSecurityService imageSecurityService, 
        IWebHostEnvironment environment, 
        ILogger<MediaController> logger)
    {
        _imageSecurityService = imageSecurityService;
        _environment = environment;
        _logger = logger;
    }

    [HttpPost("upload")]
    [RequestSizeLimit(10 * 1024 * 1024)] // 10MB
    public async Task<IActionResult> UploadImage([FromForm] IFormFile? file)
    {
        if (file == null)
        {
            return BadRequest(new { message = "No file was uploaded." });
        }

        var webRoot = _environment.WebRootPath;
        if (string.IsNullOrEmpty(webRoot))
        {
            webRoot = Path.Combine(_environment.ContentRootPath, "wwwroot");
            if (!Directory.Exists(webRoot))
            {
                Directory.CreateDirectory(webRoot);
            }
        }

        var (isValid, errorMessage, relativeUrl) = await _imageSecurityService.ValidateAndSaveImageAsync(file, webRoot);

        if (!isValid)
        {
            _logger.LogWarning("Rejected malicious or invalid image upload: {Error}", errorMessage);
            return BadRequest(new { message = errorMessage });
        }

        _logger.LogInformation("Image sanitized and stored securely: {Url}", relativeUrl);

        return Ok(new
        {
            success = true,
            url = relativeUrl,
            message = "Image verified, sanitized, and stored securely."
        });
    }
}
