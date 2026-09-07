namespace Aura.Api.Middleware;

public class SecurityHeadersMiddleware
{
    private readonly RequestDelegate _next;

    public SecurityHeadersMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        // 1. Prevent Clickjacking
        context.Response.Headers.Append("X-Frame-Options", "DENY");

        // 2. Prevent MIME-Type Sniffing
        context.Response.Headers.Append("X-Content-Type-Options", "nosniff");

        // 3. Strict Transport Security (HSTS)
        context.Response.Headers.Append("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");

        // 4. Referrer Policy
        context.Response.Headers.Append("Referrer-Policy", "strict-origin-when-cross-origin");

        // 5. Restrict Unused Browser Features
        context.Response.Headers.Append("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

        // 6. Content Security Policy (CSP)
        context.Response.Headers.Append("Content-Security-Policy", 
            "default-src 'self'; " +
            "script-src 'self' 'unsafe-inline'; " +
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
            "img-src 'self' data: blob: https:; " +
            "font-src 'self' https://fonts.gstatic.com; " +
            "connect-src 'self' http://localhost:* https://localhost:*; " +
            "frame-ancestors 'none';");

        await _next(context);
    }
}
