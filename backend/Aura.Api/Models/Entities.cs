using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Aura.Api.Models;

public class User
{
    [Key]
    public string Id { get; set; } = Guid.NewGuid().ToString();

    [Required]
    [EmailAddress]
    [MaxLength(255)]
    public string Email { get; set; } = string.Empty;

    [Required]
    public string PasswordHash { get; set; } = string.Empty;

    [Required]
    [MaxLength(50)]
    public string Role { get; set; } = "Client"; // "Admin" or "Client"

    [MaxLength(100)]
    public string FirstName { get; set; } = string.Empty;

    [MaxLength(100)]
    public string LastName { get; set; } = string.Empty;

    [MaxLength(50)]
    public string? Phone { get; set; }

    [MaxLength(200)]
    public string? Location { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? LastLoginAt { get; set; }
}

public class Project
{
    [Key]
    public string Id { get; set; } = Guid.NewGuid().ToString();

    [Required]
    [MaxLength(200)]
    public string Title { get; set; } = string.Empty;

    [MaxLength(200)]
    public string Subtitle { get; set; } = string.Empty;

    [MaxLength(100)]
    public string Location { get; set; } = string.Empty;

    [MaxLength(50)]
    public string Year { get; set; } = string.Empty;

    [MaxLength(50)]
    public string Area { get; set; } = string.Empty;

    [MaxLength(100)]
    public string Category { get; set; } = string.Empty;

    public string ImageUrl { get; set; } = string.Empty;

    [MaxLength(500)]
    public string Tagline { get; set; } = string.Empty;

    public string Narrative { get; set; } = string.Empty;

    public string HighlightsJson { get; set; } = "[]"; // JSON array of highlight strings

    public int SortOrder { get; set; } = 0;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

public class Material
{
    [Key]
    public string Id { get; set; } = Guid.NewGuid().ToString();

    [Required]
    [MaxLength(200)]
    public string Title { get; set; } = string.Empty;

    [MaxLength(100)]
    public string Category { get; set; } = string.Empty;

    [MaxLength(150)]
    public string Origin { get; set; } = string.Empty;

    [MaxLength(150)]
    public string Texture { get; set; } = string.Empty;

    [MaxLength(100)]
    public string Lifespan { get; set; } = string.Empty;

    [MaxLength(100)]
    public string Acoustic { get; set; } = string.Empty;

    public string ImageUrl { get; set; } = string.Empty;

    [MaxLength(500)]
    public string Tagline { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public string Provenance { get; set; } = string.Empty;

    public string ApplicationsJson { get; set; } = "[]"; // JSON array of application strings

    public int SortOrder { get; set; } = 0;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

public class Inquiry
{
    [Key]
    public string Id { get; set; } = Guid.NewGuid().ToString();

    [Required]
    [MaxLength(150)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    [MaxLength(255)]
    public string Email { get; set; } = string.Empty;

    [MaxLength(50)]
    public string? Phone { get; set; }

    [MaxLength(200)]
    public string? Location { get; set; }

    [MaxLength(100)]
    public string? Scale { get; set; }

    [MaxLength(100)]
    public string? Timeline { get; set; }

    public string? Message { get; set; }

    [MaxLength(50)]
    public string Status { get; set; } = "New"; // "New", "In Review", "Contacted", "Completed"

    public string? ClientIp { get; set; }

    public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;
}

public class CmsSetting
{
    [Key]
    [MaxLength(100)]
    public string Key { get; set; } = "aura_main_cms";

    [Required]
    public string JsonContent { get; set; } = "{}";

    public DateTime LastModifiedAt { get; set; } = DateTime.UtcNow;
}

public class AuditLog
{
    [Key]
    public string Id { get; set; } = Guid.NewGuid().ToString();

    [MaxLength(100)]
    public string? UserId { get; set; }

    [Required]
    [MaxLength(100)]
    public string Action { get; set; } = string.Empty;

    [MaxLength(100)]
    public string? EntityName { get; set; }

    [MaxLength(100)]
    public string? EntityId { get; set; }

    [MaxLength(50)]
    public string? IpAddress { get; set; }

    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
}
