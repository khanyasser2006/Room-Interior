# ✨ Aura

A cinematic residential architecture studio site with a real ASP.NET Core backend — a 195-frame scroll-scrubbed hero, a portfolio of projects and materials, a genuinely server-verified account system with hashed passwords and secure cookies, and hardened file uploads, backed by SQLite.

![React](https://img.shields.io/badge/-React%2019-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/-Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/-Tailwind%20CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![GSAP](https://img.shields.io/badge/-GSAP-88CE02?style=flat-square&logo=greensock&logoColor=white)
![.NET](https://img.shields.io/badge/-.NET%209-512BD4?style=flat-square&logo=dotnet&logoColor=white)
![C#](https://img.shields.io/badge/-C%23-239120?style=flat-square&logo=csharp&logoColor=white)
![SQLite](https://img.shields.io/badge/-SQLite-003B57?style=flat-square&logo=sqlite&logoColor=white)

---

## 🧰 Technologies

- ASP.NET Core Web API (.NET 9)
- C#
- Entity Framework Core + SQLite
- BCrypt password hashing + secure `HttpOnly` cookie sessions
- React 19
- Vite 8
- Tailwind CSS
- GSAP (ScrollTrigger) + Lenis

---

## ✨ Features

- **195-Frame Scroll Hero**: An interior flythrough scrubbed frame-by-frame against scroll position on a canvas, synced through GSAP ScrollTrigger with Lenis smooth scrolling underneath.
- **Real Server-Verified Authentication**: Login issues a signed, `HttpOnly`, `SameSite=Strict` cookie from the server, not a client-side flag, with passwords hashed via BCrypt rather than compared in the browser.
- **Rate-Limited Auth & Forms**: Sliding-window rate limiting on login (5 attempts / 15 min) and fixed-window limiting on inquiries (10 / 10 min), both enforced server-side.
- **Hardened Image Uploads**: Uploaded images are validated by magic-byte inspection rather than file extension, re-encoded through ImageSharp to strip any hidden payloads, stripped of EXIF/GPS metadata, and saved under randomized filenames.
- **Project & Materials Portfolio**: A curated set of residential projects and material swatches served from a real database through dedicated API endpoints.
- **Client Inquiry System**: A rate-limited, honeypot-protected inquiry form that's actually persisted to the database, not just a UI-only confirmation.
- **Sanitized Content Rendering**: User-facing content is passed through DOMPurify before rendering, guarding against injected HTML or scripts.
- **Security Headers & security.txt**: Custom middleware adds security headers to every response, and a `security.txt` file is published for responsible vulnerability disclosure.
- **SEO-Ready**: `sitemap.xml`, `robots.txt`, a web manifest, and a dedicated `SeoManager` component are already in place.
- **Admin CMS Dashboard**: A dashboard for editing site content, projects, and materials, backed by real API endpoints instead of browser storage.
- **A CORS Allowlist That Actually Works**: Cross-origin requests are restricted to an explicit, configurable list of allowed origins, enforced by ASP.NET Core rather than a client-side check.

---

## 🪜 The Process

I built the hero first, the same way as the other studio sites in this series: an interior flythrough exported as a 195-frame sequence, scrubbed against scroll position on a canvas and synced through GSAP ScrollTrigger, with Lenis underneath for the smooth-scroll feel.

This time, though, I wanted the account system and content management to be real instead of a browser-only simulation, so I built an actual ASP.NET Core API behind it: BCrypt password hashing, a signed `HttpOnly` cookie issued by the server on login, sliding-window rate limiting on auth, and a proper CORS allowlist enforced by the framework rather than a client-side check that can quietly end up allowing everything anyway.

File uploads got their own dedicated service rather than just accepting whatever the browser sends: every image is checked by its actual binary signature, decoded and re-encoded through ImageSharp to strip anything hidden in the file, stripped of EXIF and GPS data, and saved under a random filename rather than the one the uploader chose.

SQLite was a deliberate choice over a heavier database for this one — a single file that needs zero local server setup, seeded automatically on first run, which made the whole backend easy to clone and try immediately.

The gap I'm most aware of: the login and registration endpoints are properly secured, but I haven't yet gone back and put the `AdminOnly` authorization policy on the actual content endpoints — Projects, Materials, Media uploads, Inquiries, and CMS updates are all still reachable without a session. The authentication system works; I just haven't finished wiring the authorization checks on top of it.

---

## 📚 What I Learned

- **Server-Verified Sessions**: Used a signed, `HttpOnly`, `SameSite=Strict` cookie issued via `HttpContext.SignInAsync` instead of a client-side flag, so a session can't be forged by editing browser storage.
- **Magic-Byte File Validation**: Checked the actual binary header of uploaded files instead of trusting the extension or MIME type, then re-encoded every image through ImageSharp so a malicious payload can't hide inside a valid-looking image file.
- **Enforcing CORS at the Framework Level**: Configured an explicit origin allowlist through ASP.NET Core's CORS middleware rather than hand-rolling the check, so there's no way to accidentally leave both branches of an if/else allowing everything through.
- **Rate Limiting as Middleware, Not an Afterthought**: Used ASP.NET Core's built-in rate limiter with named policies per endpoint type — stricter for login, looser for inquiries — instead of one blanket rule.
- **SQLite for Zero-Friction Setup**: Chose a file-based database specifically so the backend could be cloned and seeded on first run without a separate database server to install.
- **Sanitizing at the Boundary**: Ran user-facing content through DOMPurify on the client in addition to whatever the server does, rather than trusting a single layer of defense.
- **Authentication and Authorization Are Two Different Jobs**: Learned that building a secure login doesn't automatically secure anything else — the endpoints behind it still need their own explicit checks.

---

## 🔧 How Can It Be Improved?

- Apply the `AdminOnly` authorization policy — already defined in `Program.cs` — to the actual content endpoints. Right now Projects, Materials, Media uploads, Inquiries, and CMS updates have no `[Authorize]` attribute, so anyone can create, edit, or delete them without logging in, even though the login system itself is properly secured.
- Add `*.db` to `.gitignore` — `aura_production.db` is currently tracked, and a database file, even a seeded demo one, generally shouldn't live in version control.
- Remove the unused `Microsoft.AspNetCore.Authentication.JwtBearer` package reference and the unused `@studio-freight/lenis` / `@gsap/react` frontend dependencies, since the app actually uses cookie auth and plain GSAP, not JWT or the `useGSAP` hook.
- Rename the project in `package.json` from the placeholder `temp_vite`.
- Consider real EF Core migrations instead of `EnsureCreatedAsync()` once the schema needs to evolve, since `EnsureCreatedAsync` can't apply incremental changes to an existing database.
- Add a progressive loading strategy for the 195 hero frames instead of loading them all before the sequence becomes scrubbable.

---

## 🚀 Running the Project

### Step 1 — Clone the Repository

```bash
git clone https://github.com/<your-username>/aura-design.git
cd aura-design
```

---

### Step 2 — Run the Backend

**Prerequisites:** .NET 9 SDK

```bash
cd backend/Aura.Api
dotnet run
```

The database is created and seeded automatically on first run — no migration step needed. Swagger UI is available in development at `http://localhost:5000/swagger`.

---

### Step 3 — Run the Frontend

**Prerequisites:** Node.js 20.19+ (in a new terminal, back at the repo root)

```bash
npm install
npm run dev
```

The dev server proxies `/api` requests to the backend on port 5000 automatically.

---

### Step 4 — Open the Application

Open the address shown in your terminal (usually):

```
http://localhost:5173
```

---

## 🎥 Video



---
