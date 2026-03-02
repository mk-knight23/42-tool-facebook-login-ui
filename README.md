# Facebook Login UI

A high-fidelity clone of the modern Facebook login experience, built with **Angular 21** and **Tailwind CSS v4**.

## Features

- **Pixel-perfect login page** — Faithful reproduction of the Facebook login UI
- **Facebook OAuth integration** — Real authentication via the Facebook SDK
- **Demo mode** — Mock authentication for development and testing
- **Profile page** — Displays user info and granted OAuth permissions
- **Settings page** — Account settings with permission management
- **Dark mode** — Dark, light, and system theme switching
- **Session management** — localStorage persistence with automatic expiry
- **Protected routes** — Auth guards for authenticated pages
- **Sound effects** — Optional audio feedback via Web Audio API
- **Keyboard shortcuts** — Quick access to settings and help
- **Responsive design** — Mobile-first layout with Tailwind utility classes
- **Accessibility** — Focus management, reduced-motion support, semantic HTML

## Tech Stack

- Angular 21 (standalone components, signals, lazy-loaded routes)
- Tailwind CSS v4 (via PostCSS plugin)
- TypeScript 5.9
- Vitest (unit testing)

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

## Project Structure

```
src/
  app/
    config/          # Environment and OAuth configuration
    core/            # Global services (settings, stats, audio, keyboard)
      handlers/      # Global error handler
      services/      # Singleton services
      utils/         # Constants and shared utilities
    features/
      auth/          # Login form, landing page, settings panel, auth service
      profile/       # Profile page component
      session/       # Session and user services
      settings/      # Settings page component
    guards/          # Route guards (auth, guest)
    types/           # TypeScript interfaces and types
    app.component.ts # Root component with footer and router outlet
    app.config.ts    # Application providers
    app.routes.ts    # Route definitions
  styles.css         # Global styles and Tailwind theme
  main.ts            # Bootstrap entry point
```

## License

MIT
