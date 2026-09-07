using System.Text.Json;
using Aura.Api.Data;
using Aura.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Aura.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CmsController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly ILogger<CmsController> _logger;

    public CmsController(AppDbContext context, ILogger<CmsController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpGet]
    public async Task<IActionResult> GetCmsData()
    {
        var setting = await _context.CmsSettings.FirstOrDefaultAsync(s => s.Key == "aura_main_cms");
        if (setting == null || string.IsNullOrWhiteSpace(setting.JsonContent))
        {
            return Ok(new { });
        }

        try
        {
            using var doc = JsonDocument.Parse(setting.JsonContent);
            return Ok(doc.RootElement.Clone());
        }
        catch
        {
            return Ok(new { });
        }
    }

    [HttpPut]
    public async Task<IActionResult> UpdateCmsData([FromBody] JsonElement cmsData)
    {
        var setting = await _context.CmsSettings.FirstOrDefaultAsync(s => s.Key == "aura_main_cms");
        var jsonString = cmsData.GetRawText();

        if (setting == null)
        {
            setting = new CmsSetting
            {
                Key = "aura_main_cms",
                JsonContent = jsonString,
                LastModifiedAt = DateTime.UtcNow
            };
            await _context.CmsSettings.AddAsync(setting);
        }
        else
        {
            setting.JsonContent = jsonString;
            setting.LastModifiedAt = DateTime.UtcNow;
        }

        await _context.SaveChangesAsync();
        _logger.LogInformation("CMS Data updated successfully at {Time}", DateTime.UtcNow);

        return Ok(new { success = true, message = "CMS updated successfully." });
    }
}
