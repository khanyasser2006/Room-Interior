using System.Text.Json;
using Aura.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Aura.Api.Data;

public static class DbInitializer
{
    public static async Task InitializeAsync(AppDbContext context)
    {
        await context.Database.EnsureCreatedAsync();

        // 1. Seed Master Admin User if none exists
        if (!await context.Users.AnyAsync(u => u.Role == "Admin"))
        {
            var adminUser = new User
            {
                Id = "admin-master-001",
                Email = "admin@aura-design.com",
                // BCrypt hashed password with salt (Work factor = 12)
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("AuraMaster2026!", 12),
                Role = "Admin",
                FirstName = "AURA",
                LastName = "Master Admin",
                Phone = "+81 (0)3 5400 8820",
                Location = "Tokyo / Milan",
                CreatedAt = DateTime.UtcNow
            };

            await context.Users.AddAsync(adminUser);
        }

        // 2. Seed Default Projects if empty
        if (!await context.Projects.AnyAsync())
        {
            var initialProjects = new List<Project>
            {
                new()
                {
                    Id = "proj-1",
                    Title = "The Minami-Aoyama Sanctuary",
                    Subtitle = "Minimalist Wood & Fluted Glass Penthouse",
                    Location = "Tokyo, Japan",
                    Year = "2025",
                    Area = "480 m²",
                    Category = "Penthouses",
                    ImageUrl = "/images/project_aspen.jpg",
                    Tagline = "A peaceful sanctuary elevated above Tokyo's vibrant skyline, combining natural hinoki timber, raw travertine stone, and soft indirect lighting.",
                    Narrative = "Located high above the vibrant streets of Minami-Aoyama, this residence was designed as a quiet retreat from the city. We used natural hinoki wood, honed silver travertine, and soft fluted glass screens to gently diffuse morning daylight throughout the open living and dining spaces.",
                    HighlightsJson = JsonSerializer.Serialize(new[] { "Handcrafted Hinoki Joinery", "Silver Travertine Open Kitchen", "Custom Japanese Soaking Tub", "Acoustic Double-Glazed Glass Walls" }),
                    SortOrder = 1
                },
                new()
                {
                    Id = "proj-2",
                    Title = "Lake Como Heritage Villa",
                    Subtitle = "Modern Restoration of a 19th Century Estate",
                    Location = "Como, Italy",
                    Year = "2024",
                    Area = "720 m²",
                    Category = "Residential",
                    ImageUrl = "/images/project_como.jpg",
                    Tagline = "Restoring historical Italian architecture with contemporary comfort, handcrafted Venetian plaster, and custom patinated bronze fixtures.",
                    Narrative = "A sensitive restoration of a lakeside Italian villa, balancing historic vaulted ceilings with contemporary minimalist interiors. Every surface was finished by local master craftsmen using Venetian lime plaster and aged bronze accents.",
                    HighlightsJson = JsonSerializer.Serialize(new[] { "Restored Vaulted Frescoes", "Hand-Patinated Bronze Doors", "Custom Lake-Facing Terrace Lounge", "Italian Calacatta Marble Fireplace" }),
                    SortOrder = 2
                },
                new()
                {
                    Id = "proj-3",
                    Title = "Tribeca Cast-Iron Loft",
                    Subtitle = "Warm Industrial Living with Custom Millwork",
                    Location = "New York, USA",
                    Year = "2024",
                    Area = "390 m²",
                    Category = "Residential",
                    ImageUrl = "/images/atelier_studio.jpg",
                    Tagline = "Exposed historical brick and cast-iron columns paired with smoked European oak and custom acoustic ceilings.",
                    Narrative = "A private loft residence in Manhattan's historic district celebrating architectural heritage through warm smoked oak, Belgian linen drapery, and integrated smart ambient lighting.",
                    HighlightsJson = JsonSerializer.Serialize(new[] { "Restored 19th-Century Cast Iron Columns", "Smoked European Oak Island", "Custom Hidden Acoustic Paneling", "Private Art Gallery Corridor" }),
                    SortOrder = 3
                },
                new()
                {
                    Id = "proj-4",
                    Title = "Kyoto Forest Residence",
                    Subtitle = "Contemporary Sukiya-Style Forest Retreat",
                    Location = "Kyoto, Japan",
                    Year = "2023",
                    Area = "560 m²",
                    Category = "Residential",
                    ImageUrl = "/images/service_architecture.jpg",
                    Tagline = "A modern forest home connected seamlessly to a private moss garden with charred cedar and tatami living suites.",
                    Narrative = "Nestled at the base of Kyoto's eastern hills, this residence blends traditional sukiya carpentry with modern floor-to-ceiling glass pavilions looking onto hundred-year-old cedar trees.",
                    HighlightsJson = JsonSerializer.Serialize(new[] { "Yakisugi Charred Cedar Siding", "Private Zen Moss Garden Pavilions", "Natural Hot Spring Rotenburo", "Handmade Washi Paper Screens" }),
                    SortOrder = 4
                }
            };

            await context.Projects.AddRangeAsync(initialProjects);
        }

        // 3. Seed Default Materials if empty
        if (!await context.Materials.AnyAsync())
        {
            var initialMaterials = new List<Material>
            {
                new()
                {
                    Id = "mat-1",
                    Title = "Silver Travertine Stone",
                    Category = "Natural Stone",
                    Origin = "Tivoli, Italy",
                    Texture = "Honed & Unfilled Pore",
                    Lifespan = "300+ Years",
                    Acoustic = "Medium-High Absorption",
                    ImageUrl = "/images/mat_travertine.jpg",
                    Tagline = "Porous, warm, and rich with natural geological banding that adds depth and timeless permanence to interior walls and floors.",
                    Description = "Quarried directly from historic Roman riverbeds, each slab contains organic mineral strata formed over tens of thousands of years. We finish the surface with a gentle hone to maintain its tactile, velvety texture.",
                    Provenance = "Sustainably quarried from certified historical Italian reserves with zero toxic chemical processing.",
                    ApplicationsJson = JsonSerializer.Serialize(new[] { "Bathroom & Spa Walls", "Living Room Feature Fireplaces", "Kitchen Island Casework", "Seamless Indoor-Outdoor Flooring" }),
                    SortOrder = 1
                },
                new()
                {
                    Id = "mat-2",
                    Title = "Yakisugi Charred Cedar",
                    Category = "Solid Timber",
                    Origin = "Okayama, Japan",
                    Texture = "Alligator-Char Scaled",
                    Lifespan = "80+ Years",
                    Acoustic = "High Sound Dampening",
                    ImageUrl = "/images/mat_yakisugi.jpg",
                    Tagline = "Traditional Japanese fire-charred timber that resists moisture, insects, and decay while offering deep, velvety black tones.",
                    Description = "Crafted by hand using a centuries-old Japanese heat-treatment method. The surface carbonizes into an iridescent, deep charcoal finish that never fades or requires harsh chemical stains.",
                    Provenance = "FSC-certified Japanese Cryptomeria cedar harvested from managed sustainable mountain forests.",
                    ApplicationsJson = JsonSerializer.Serialize(new[] { "Feature Wall Paneling", "Dining Room Accent Screens", "Exterior Cladding & Porticos", "Custom Architectural Cabinetry" }),
                    SortOrder = 2
                },
                new()
                {
                    Id = "mat-3",
                    Title = "Aged Patinated Bronze",
                    Category = "Custom Metals",
                    Origin = "Kyoto, Japan",
                    Texture = "Hand-Rubbed Satin Wax",
                    Lifespan = "100+ Years",
                    Acoustic = "Resonant Solid Core",
                    ImageUrl = "/images/mat_bronze.jpg",
                    Tagline = "Living metal that develops a subtle, richer patina over decades, giving doors and fixtures a warm, tactile presence.",
                    Description = "Cast in solid brass and bronze alloys, then hand-treated with natural oxidizing solutions to create an organic, non-uniform deep amber and charcoal finish.",
                    Provenance = "Recycled copper and tin alloys cast in a third-generation artisanal metal foundry.",
                    ApplicationsJson = JsonSerializer.Serialize(new[] { "Architectural Door Pulls & Hardware", "Custom Kitchen Range Hoods", "Floating Fireplace Surrounds", "Cabinet & Millwork Framing" }),
                    SortOrder = 3
                },
                new()
                {
                    Id = "mat-4",
                    Title = "Organic Bouclé & Alpaca Wool",
                    Category = "Textiles",
                    Origin = "Biella, Italy",
                    Texture = "Heavy Looped Wool Pile",
                    Lifespan = "30+ Years",
                    Acoustic = "Superior NRC 0.85 Dampening",
                    ImageUrl = "/images/mat_boucle.jpg",
                    Tagline = "Ultra-soft natural fibers providing tactile warmth, cozy seating, and natural acoustic dampening in large living spaces.",
                    Description = "Woven from un-dyed virgin wool and Peruvian baby alpaca fibers on traditional Italian shuttle looms. It absorbs ambient sound reflections and provides extraordinary tactile comfort.",
                    Provenance = "OEKO-TEX certified cruelty-free ethical shearing from small alpine farming cooperatives.",
                    ApplicationsJson = JsonSerializer.Serialize(new[] { "Custom Sofas & Lounge Seating", "Master Bedroom Headboard Panels", "Acoustic Wall Hangings", "Private Cinema Seating" }),
                    SortOrder = 4
                }
            };

            await context.Materials.AddRangeAsync(initialMaterials);
        }

        await context.SaveChangesAsync();
    }
}
