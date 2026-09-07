using System.Text.Json;
using Aura.Api.Data;
using Aura.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Aura.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly ILogger<ProjectsController> _logger;

    public ProjectsController(AppDbContext context, ILogger<ProjectsController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllProjects([FromQuery] string? category)
    {
        var query = _context.Projects.AsQueryable();

        if (!string.IsNullOrWhiteSpace(category) && category != "All")
        {
            query = query.Where(p => p.Category == category);
        }

        var projects = await query.OrderBy(p => p.SortOrder).ToListAsync();

        var result = projects.Select(p => new
        {
            id = p.Id,
            title = p.Title,
            subtitle = p.Subtitle,
            location = p.Location,
            year = p.Year,
            area = p.Area,
            category = p.Category,
            image = p.ImageUrl,
            tagline = p.Tagline,
            narrative = p.Narrative,
            highlights = DeserializeHighlights(p.HighlightsJson)
        });

        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetProjectById(string id)
    {
        var p = await _context.Projects.FindAsync(id);
        if (p == null) return NotFound(new { message = "Project not found." });

        return Ok(new
        {
            id = p.Id,
            title = p.Title,
            subtitle = p.Subtitle,
            location = p.Location,
            year = p.Year,
            area = p.Area,
            category = p.Category,
            image = p.ImageUrl,
            tagline = p.Tagline,
            narrative = p.Narrative,
            highlights = DeserializeHighlights(p.HighlightsJson)
        });
    }

    [HttpPost]
    public async Task<IActionResult> CreateProject([FromBody] ProjectDto dto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var newProject = new Project
        {
            Id = string.IsNullOrWhiteSpace(dto.Id) ? $"proj-{Guid.NewGuid():N}" : dto.Id,
            Title = dto.Title.Trim(),
            Subtitle = dto.Subtitle ?? string.Empty,
            Location = dto.Location ?? string.Empty,
            Year = dto.Year ?? string.Empty,
            Area = dto.Area ?? string.Empty,
            Category = dto.Category ?? "Residential",
            ImageUrl = dto.Image ?? string.Empty,
            Tagline = dto.Tagline ?? string.Empty,
            Narrative = dto.Narrative ?? string.Empty,
            HighlightsJson = JsonSerializer.Serialize(dto.Highlights ?? new List<string>()),
            SortOrder = await _context.Projects.CountAsync() + 1
        };

        await _context.Projects.AddAsync(newProject);
        await _context.SaveChangesAsync();

        _logger.LogInformation("New project created: {Title} ({Id})", newProject.Title, newProject.Id);

        return CreatedAtAction(nameof(GetProjectById), new { id = newProject.Id }, newProject);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateProject(string id, [FromBody] ProjectDto dto)
    {
        var existing = await _context.Projects.FindAsync(id);
        if (existing == null) return NotFound(new { message = "Project not found." });

        existing.Title = dto.Title.Trim();
        existing.Subtitle = dto.Subtitle ?? string.Empty;
        existing.Location = dto.Location ?? string.Empty;
        existing.Year = dto.Year ?? string.Empty;
        existing.Area = dto.Area ?? string.Empty;
        existing.Category = dto.Category ?? existing.Category;
        existing.ImageUrl = dto.Image ?? existing.ImageUrl;
        existing.Tagline = dto.Tagline ?? string.Empty;
        existing.Narrative = dto.Narrative ?? string.Empty;
        existing.HighlightsJson = JsonSerializer.Serialize(dto.Highlights ?? new List<string>());
        existing.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();
        _logger.LogInformation("Project updated: {Title} ({Id})", existing.Title, existing.Id);

        return Ok(existing);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProject(string id)
    {
        var existing = await _context.Projects.FindAsync(id);
        if (existing == null) return NotFound(new { message = "Project not found." });

        _context.Projects.Remove(existing);
        await _context.SaveChangesAsync();

        _logger.LogInformation("Project deleted: {Id}", id);
        return NoContent();
    }

    private static List<string> DeserializeHighlights(string json)
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
