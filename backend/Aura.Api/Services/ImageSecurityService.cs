using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Jpeg;
using SixLabors.ImageSharp.Formats.Png;
using SixLabors.ImageSharp.Formats.Webp;
using SixLabors.ImageSharp.Metadata.Profiles.Exif;

namespace Aura.Api.Services;

public interface IImageSecurityService
{
    Task<(bool IsValid, string? ErrorMessage, string? RelativeUrl)> ValidateAndSaveImageAsync(IFormFile file, string webRootPath);
}

public class ImageSecurityService : IImageSecurityService
{
    private const long MaxFileSizeBytes = 10 * 1024 * 1024; // 10 MB

    // Magic Bytes Signatures
    private static readonly byte[] JpegHeader1 = [0xFF, 0xD8, 0xFF];
    private static readonly byte[] PngHeader = [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A];
    private static readonly byte[] RiffHeader = [0x52, 0x49, 0x46, 0x46]; // WEBP prefix

    public async Task<(bool IsValid, string? ErrorMessage, string? RelativeUrl)> ValidateAndSaveImageAsync(IFormFile file, string webRootPath)
    {
        if (file == null || file.Length == 0)
        {
            return (false, "No file provided.", null);
        }

        if (file.Length > MaxFileSizeBytes)
        {
            return (false, $"File size exceeds the 10 MB limit.", null);
        }

        // 1. Binary Magic Bytes Inspection
        using var memoryStream = new MemoryStream();
        await file.CopyToAsync(memoryStream);
        var bytes = memoryStream.ToArray();

        if (bytes.Length < 12)
        {
            return (false, "File is too small or corrupted.", null);
        }

        bool isJpeg = bytes.Take(3).SequenceEqual(JpegHeader1);
        bool isPng = bytes.Take(8).SequenceEqual(PngHeader);
        bool isWebp = bytes.Take(4).SequenceEqual(RiffHeader);

        if (!isJpeg && !isPng && !isWebp)
        {
            return (false, "Invalid image format. Only authentic JPEG, PNG, and WEBP images are permitted.", null);
        }

        // 2. Load and Strip EXIF Metadata using ImageSharp
        memoryStream.Position = 0;
        try
        {
            using var image = await Image.LoadAsync(memoryStream);

            // Strip sensitive EXIF metadata (GPS coordinates, camera serial, etc.)
            image.Metadata.ExifProfile = null;
            image.Metadata.IptcProfile = null;
            image.Metadata.XmpProfile = null;

            // 3. Save with randomized unique GUID filename
            var uploadsFolder = Path.Combine(webRootPath, "uploads");
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            var extension = isPng ? ".png" : (isWebp ? ".webp" : ".jpg");
            var uniqueFileName = $"aura_media_{Guid.NewGuid():N}{extension}";
            var destinationPath = Path.Combine(uploadsFolder, uniqueFileName);

            if (isPng)
            {
                await image.SaveAsPngAsync(destinationPath);
            }
            else if (isWebp)
            {
                await image.SaveAsWebpAsync(destinationPath);
            }
            else
            {
                await image.SaveAsJpegAsync(destinationPath, new JpegEncoder { Quality = 90 });
            }

            var relativeUrl = $"/uploads/{uniqueFileName}";
            return (true, null, relativeUrl);
        }
        catch (Exception ex)
        {
            return (false, $"Failed to process image: {ex.Message}", null);
        }
    }
}
