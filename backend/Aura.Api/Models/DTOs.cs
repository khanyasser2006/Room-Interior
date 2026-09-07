using System.ComponentModel.DataAnnotations;

namespace Aura.Api.Models;

public record LoginRequest(
    [Required, EmailAddress] string Email,
    [Required] string Password
);

public record RegisterRequest(
    [Required, MaxLength(100)] string FirstName,
    [Required, MaxLength(100)] string LastName,
    [Required, EmailAddress, MaxLength(255)] string Email,
    [Required, MinLength(8)] string Password,
    [MaxLength(50)] string? Phone,
    [MaxLength(200)] string? Location,
    string? WebsiteHp // Honeypot field
);

public record UserDto(
    string Id,
    string Email,
    string Role,
    string FirstName,
    string LastName,
    string? Phone,
    string? Location
);

public record InquiryRequest(
    [Required, MaxLength(150)] string Name,
    [Required, EmailAddress, MaxLength(255)] string Email,
    [MaxLength(50)] string? Phone,
    [MaxLength(200)] string? Location,
    [MaxLength(100)] string? Scale,
    [MaxLength(100)] string? Timeline,
    string? Message,
    string? WebsiteHp // Honeypot field
);

public record InquiryStatusUpdateRequest(
    [Required, MaxLength(50)] string Status
);

public record ProjectDto(
    string? Id,
    [Required, MaxLength(200)] string Title,
    string? Subtitle,
    string? Location,
    string? Year,
    string? Area,
    string? Category,
    string? Image,
    string? Tagline,
    string? Narrative,
    List<string>? Highlights
);

public record MaterialDto(
    string? Id,
    [Required, MaxLength(200)] string Title,
    string? Category,
    string? Origin,
    string? Texture,
    string? Lifespan,
    string? Acoustic,
    string? Image,
    string? Tagline,
    string? Desc,
    string? Provenance,
    List<string>? Applications
);
