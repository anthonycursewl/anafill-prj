# Anthony Zerpa — Portafolio

Portafolio de desarrollador interactivo con temática de terminal, construido con [Astro](https://astro.build), SSR y TypeScript.

## Características

- **Emulador de Terminal** — Terminal interactiva tipo bash con comandos (`whoami`, `ls`, `cat`, `socials`, etc.)
- **Vista de Identidad Dual** — Alterna entre una vista técnica con pestañas de código y una vista humana con tarjetas
- **Bio con Efecto Máquina de Escribir** — Los párrafos se escriben solos al hacer scroll mediante IntersectionObserver
- **Proyectos Destacados** — Cuatro proyectos con carruseles de imágenes, lightbox y bloques de vista previa de código
- **Fondo de Partículas** — Cuadrícula de partículas en canvas que reacciona al mouse/scroll
- **AI Playground** — Chat simulado con respuestas predefinidas con efecto de escritura
- **Geolocalización de Visitantes** — Detecta el país del visitante mediante ipapi.co y muestra la bandera en el navbar
- **Banner de Breadriuss** — Banner fijo inferior promocionando Breadriuss con tracking UTM
- **Sistema de Autenticación** — Inicio de sesión/registro con email y OAuth (Google y GitHub)
- **Diseño Responsive** — Totalmente adaptable a móviles

## Stack Tecnológico

| Capa | Tecnología |
|------|------------|
| Framework | Astro 7 |
| Runtime | Node.js >= 22.12 |
| Adapter | @astrojs/node (SSR independiente) |
| Lenguaje | TypeScript (estricto) |
| Arquitectura | Hexagonal (Puertos y Adaptadores) |
| Fuentes | JetBrains Mono, IBM Plex Mono, Inter |
| Iconos | Simple Icons CDN |
| Auth | OAuth2 (Google, GitHub), JWT |

## Scripts

```bash
npm run dev      # Iniciar servidor de desarrollo
npm run build    # Compilar para producción
npm run preview  # Previsualizar build de producción
```

## Variables de Entorno

| Variable | Descripción |
|----------|-------------|
| `PUBLIC_SITE_URL` | URL del sitio para redirecciones OAuth |
| `PUBLIC_API_URL` | URL base de la API backend |
| `PUBLIC_GOOGLE_CLIENT_ID` | ID de cliente OAuth de Google |
| `PUBLIC_GITHUB_CLIENT_ID` | ID de cliente OAuth de GitHub |

## Estructura del Proyecto

```
src/
├── adapters/        # Implementaciones de puertos (HTTP, Auth)
├── components/
│   ├── auth/        # Fondos de páginas de autenticación
│   ├── portfolio/   # Secciones del portafolio (Bio, IdentityTabs, ProjectsSection, etc.)
│   └── ui/          # Componentes reutilizables (Terminal, Navbar, Lightbox, Carousel, etc.)
├── domain/          # Lógica de negocio (entidades, casos de uso)
├── layouts/         # Layout base HTML
├── lib/             # Servicios singleton
├── pages/           # Rutas (/, /b/[username], /auth/*, /api/*)
├── ports/           # Definiciones de interfaces
└── styles/          # CSS global y de temas
```

## Despliegue

```bash
npm run build
node dist/server/entry.mjs
```

Compilado como servidor Node.js independiente mediante el adaptador `@astrojs/node`.
