# Facebook Login UI — High-Fidelity Clone with OAuth Integration

A professional, pixel-perfect clone of the modern Facebook Login experience, engineered with Angular and Tailwind CSS. This project demonstrates high-fidelity UI replication combined with robust OAuth integration and session management.

## What's New (v3.0.0)

### Major Features
- **OAuth Integration** — Real Facebook OAuth authentication flow
- **User Session** — Complete session management with localStorage persistence
- **Profile Page** — User profile display with granted permissions
- **Settings Page** — Account settings with permission management
- **OAuth Scopes** — Configurable OAuth permissions (email, public_profile, user_likes)
- **Logout** — Session cleanup with Facebook SDK logout
- **Error Handling** — Comprehensive auth error handling with user-friendly messages
- **Demo Mode** — Mock authentication for development and testing

### Technical Improvements
- Protected routes with auth guards
- Angular Signals for reactive state management
- Service-based architecture (AuthService, SessionService, UserService)
- Lazy-loaded components for optimal bundle size
- Router-based navigation

---

## Features

| Feature | Description |
|---------|-------------|
| **OAuth Integration** | Real Facebook OAuth with JavaScript SDK |
| **Demo Mode** | Mock authentication for development |
| **Session Management** | localStorage persistence with expiry |
| **User Profile** | Profile page with user info and permissions |
| **Settings Page** | Account settings and permission management |
| **Protected Routes** | Auth guards to protect authenticated routes |
| **Error Handling** | Comprehensive error messages and recovery |
| **Loading States** | Authentic loading animations |
| **Dark Mode** | Automatic theme switching support |
| **Responsive Layout** | Mobile-first, works on all devices |

## Tech Stack

- **Framework:** Angular 21 (Standalone architecture)
- **Styling:** Tailwind CSS (Custom Facebook palette)
- **State:** Angular Signals (Reactive state management)
- **Routing:** Angular Router with lazy loading
- **Auth:** Facebook JavaScript SDK + Demo Mode
- **Storage:** localStorage for session persistence

## Project Structure

```
src/app/
├── features/
│   ├── auth/              # Authentication
│   │   ├── services/
│   │   │   └── auth.service.ts
│   │   └── components/
│   │       ├── login-form.component.ts
│   │       ├── landing-page.component.ts
│   │       └── settings-panel.component.ts
│   ├── profile/           # User profile
│   │   └── components/
│   │       └── profile-page.component.ts
│   ├── settings/          # Account settings
│   │   └── components/
│   │       └── settings-page.component.ts
│   └── session/           # Session management
│       └── services/
│           ├── session.service.ts
│           └── user.service.ts
├── guards/                # Route guards
│   └── auth.guard.ts
├── types/                 # Type definitions
│   └── auth.types.ts
├── config/                # Configuration
│   └── environment.ts
└── core/                  # Core services
    └── services/
        ├── settings.service.ts
        ├── audio.service.ts
        └── keyboard.service.ts
```

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## Configuration

### Setting up Facebook OAuth

1. Create a Facebook App at [Facebook Developers](https://developers.facebook.com/)
2. Add your domain to the App Domains
3. Copy your App ID
4. Update `/src/app/config/environment.ts`:

```typescript
export const environment = {
  production: false,
  demoMode: false, // Set to false to enable real OAuth
  oauth: {
    appId: 'YOUR_FACEBOOK_APP_ID', // Replace with your App ID
    version: 'v19.0',
    scopes: ['email', 'public_profile', 'user_likes']
  }
};
```

### Demo Mode

Demo mode is enabled by default for development. It uses mock authentication without requiring Facebook OAuth setup. Toggle demo mode from the login page or settings page.

## Authentication Flow

### Demo Mode (Default)
1. Enable "Demo Mode" toggle on login page
2. Click "Demo Mode Login" button
3. Get authenticated with mock user data
4. Access profile and settings pages

### OAuth Mode
1. Disable "Demo Mode" toggle
2. Click "Continue with Facebook" button
3. Complete Facebook OAuth flow
4. Grant requested permissions
5. Get authenticated with real Facebook data

## Routes

| Route | Guard | Description |
|-------|-------|-------------|
| `/` | Guest | Login page (redirects to profile if authenticated) |
| `/profile` | Auth | User profile page |
| `/settings` | Auth | Account settings page |

## Session Management

- Sessions are stored in localStorage
- Session expires after 1 hour (configurable)
- Auto-refresh on user activity
- Manual logout from settings page

## OAuth Scopes

| Scope | Description | Required |
|-------|-------------|----------|
| `email` | User's email address | Yes |
| `public_profile` | Public profile information | Yes |
| `user_likes` | User's likes and interests | No |

## Deployment

### Vercel (Recommended)
```bash
vercel --prod
```

### GitHub Pages
Builds automatically on push to main via GitHub Actions.

## Live Links

| Platform | URL |
|----------|-----|
| **Vercel** | https://42-tool-facebook-login-ui.vercel.app/ |
| **GitHub Pages** | https://mk-knight23.github.io/42-tool-facebook-login-ui/ |

---

**Theme:** Social/Familiar UI (Facebook-Inspired)
**License:** MIT
**Author:** Made by MK — Musharraf Kazi
