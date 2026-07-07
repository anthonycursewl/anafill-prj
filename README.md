# Anthony Zerpa — Portfolio

Interactive terminal-themed developer portfolio built with [Astro](https://astro.build), SSR, and TypeScript.

## Features

- **Terminal Emulator** — Interactive bash-like terminal with commands (`whoami`, `ls`, `cat`, `socials`, etc.)
- **Dual Identity View** — Toggle between a technical code-tab view and a human-friendly card view
- **Typewriter Bio** — Paragraphs auto-type on scroll via IntersectionObserver
- **Project Showcase** — Four featured projects with image carousels, lightbox, and code preview blocks
- **Particle Background** — Canvas particle grid that reacts to mouse/scroll
- **AI Playground** — Simulated AI chat with pre-written typewriter responses
- **Visitor Geolocation** — Detects visitor country via ipapi.co and displays the flag in the navbar
- **Breadriuss Banner** — Fixed bottom banner promoting Breadriuss with UTM tracking
- **Auth System** — Login/register with email/password and OAuth (Google & GitHub)
- **Responsive Design** — Fully mobile-responsive

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Astro 7 |
| Runtime | Node.js >= 22.12 |
| Adapter | @astrojs/node (standalone SSR) |
| Language | TypeScript (strict) |
| Architecture | Hexagonal (Ports & Adapters) |
| Fonts | JetBrains Mono, IBM Plex Mono, Inter |
| Icons | Simple Icons CDN |
| Auth | OAuth2 (Google, GitHub), JWT |

## Scripts

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `PUBLIC_SITE_URL` | Site URL for OAuth redirects |
| `PUBLIC_API_URL` | Backend API base URL |
| `PUBLIC_GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `PUBLIC_GITHUB_CLIENT_ID` | GitHub OAuth client ID |

## Project Structure

```
src/
├── adapters/        # Port implementations (HTTP, Auth)
├── components/
│   ├── auth/        # Auth page backgrounds
│   ├── portfolio/   # Portfolio sections (Bio, IdentityTabs, ProjectsSection, etc.)
│   └── ui/          # Reusable UI (Terminal, Navbar, Lightbox, Carousel, etc.)
├── domain/          # Business logic (entities, use cases)
├── layouts/         # Base HTML layout
├── lib/             # Service singletons
├── pages/           # Routes (/, /b/[username], /auth/*, /api/*)
├── ports/           # Interface definitions
└── styles/          # Global and theme CSS
```

## Deployment

```bash
npm run build
node dist/server/entry.mjs
```

Built as a standalone Node.js server via `@astrojs/node` adapter.
