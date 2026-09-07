using System.Text.Json;
using Aura.Api.Data;
using Aura.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Aura.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MaterialsController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly ILogger<MaterialsController> _logger;

    public MaterialsController(AppDbContext context, ILogger<MaterialsController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllMaterials([FromQuery] string? category)
    {
        var query = _context.Materials.AsQueryable();

        if (!string.IsNullOrWhiteSpace(category) && category != "All")
        {
            query = query.Where(m => m.Category == category);
        }

        var materials = await query.OrderBy(m => m.SortOrder).ToListAsync();

        var result = materials.Select(m => new
        {
            id = m.Id,
            title = m.Title,
            category = m.Category,
            origin = m.Origin,
            texture = m.Texture,
            lifespan = m.Lifespan,
            acoustic = m.Acoustic,
            image = m.ImageUrl,
            tagline = m.Tagline,
            desc = m.Description,
            provenance = m.Provenance,
            applications = DeserializeApplications(m.ApplicationsJson)
        });

        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetMaterialById(string id)
    {
        var m = await _context.Materials.FindAsync(id);
        if (m == null) return NotFound(new { message = "Material not found." });

        return Ok(new
        {
            id = m.Id,
            title = m.Title,
            category = m.Category,
            origin = m.Origin,
            texture = m.Texture,
            lifespan = m.Lifespan,
            acoustic = m.Acoustic,
            image = m.ImageUrl,
            tagline = m.Tagline,
            desc = m.Description,
            provenance = m.Provenance,
            applications = DeserializeApplications(m.ApplicationsJson)
        });
    }

    [HttpPost]
    public async Task<IActionResult> CreateMaterial([FromBody] MaterialDto dto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var newMaterial = new Material
        {
            Id = string.IsNullOrWhiteSpace(dto.Id) ? $"mat-{Guid.NewGuid():N}" : dto.Id,
            Title = dto.Title.Trim(),
            Category = dto.Category ?? "Natural Stone",
            Origin = dto.Origin ?? string.Empty,
            Texture = dto.Texture ?? string.Empty,
            Lifespan = dto.Lifespan ?? string.Empty,
            Acoustic = dto.Acoustic ?? string.Empty,
            ImageUrl = dto.Image ?? string.Empty,
            Tagline = dto.Tagline ?? string.Empty,
            Description = dto.Desc ?? string.Empty,
            Provenance = dto.Provenance ?? string.Empty,
            ApplicationsJson = JsonSerializer.Serialize(dto.Applications ?? new List<string>()),
            SortOrder = await _context.Materials.CountAsync() + 1
        };

        await _context.Materials.AddAsync(newMaterial);
        await _context.SaveChangesAsync();

        _logger.LogInformation("New material created: {Title} ({Id})", newMaterial.Title, newMaterial.Id);

        return CreatedAtAction(nameof(GetMaterialById), new { id = newMaterial.Id }, newMaterial);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateMaterial(string id, [FromBody] MaterialDto dto)
    {
        var existing = await _context.Materials.FindAsync(id);
        if (existing == null) return NotFound(new { message = "Material not found." });

        existing.Title = dto.Title.Trim();
        existing.Category = dto.Category ?? existing.Category;
        existing.Origin = dto.Origin ?? string.Empty;
        existing.Texture = dto.Texture ?? string.Empty;
        existing.Lifespan = dto.Lifespan ?? string.Empty;
        existing.Acoustic = dto.Acoustic ?? string.Empty;
        existing.ImageUrl = dto.Image ?? existing.ImageUrl;
        existing.Tagline = dto.Tagline ?? string.Empty;
        existing.Description = dto.Desc ?? string.Empty;
        existing.Provenance = dto.Provenance ?? string.Empty;
        existing.ApplicationsJson = JsonSerializer.Serialize(dto.Applications ?? new List<string>());
        existing.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();
        _logger.LogInformation("Material updated: {Title} ({Id})", existing.Title, existing.Id);

        return Ok(existing);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteMaterial(string id)
    {
        var existing = await _context.Materials.FindAsync(id);
        if (existing == null) return NotFound(new { message = "Material not found." });

        _context.Materials.Remove(existing);
        await _context.SaveChangesAsync();

        _logger.LogInformation("Material deleted: {Id}", id);
        return NoContent();
    }

    private static List<string> DeserializeApplications(string json)
    {
        try
        {
            return JsonSerializer.Deserialize<List<string>>(json) ?? new List<string>();
        }
        catch
        {
            return new List<string>();
        }
    }
}
