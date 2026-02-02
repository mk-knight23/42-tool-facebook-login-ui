# Facebook Login UI — High-Fidelity Clone

A professional, pixel-perfect clone of the modern Facebook Login experience, engineered with Angular and Tailwind CSS. This project demonstrates high-fidelity UI replication combined with robust functional simulation.

## What's New (v2.2.0)

### New Features
- **Password Visibility Toggle** — Show/hide password with eye icon
- **Email Validation** — Real-time email format validation
- **Error Messages** — Clear validation error messages
- **Made by MK Branding** — Creator attribution in footer

### Improvements
- Better form validation with specific error messages
- Password visibility toggle for better UX
- Email format validation using Angular validators

---

## Features

| Feature | Description |
|---------|-------------|
| **Pixel-Perfect Design** | Replicates Facebook's 2026 design language |
| **Reactive Forms** | Strict form validation with Angular Reactive Forms |
| **Password Toggle** | Show/hide password visibility |
| **Email Validation** | Real-time email format checking |
| **Loading States** | Authentic loading animation simulation |
| **Dark Mode** | Automatic theme switching support |
| **Responsive Layout** | Mobile-first, works on all devices |

## Tech Stack

- **Framework:** Angular 19 (Standalone architecture)
- **Styling:** Tailwind CSS (Custom Facebook palette)
- **State:** Angular Signals (UI state management)
- **Logic:** Reactive Forms (Auth validation)
- **Services:** Settings, Audio, Keyboard (enhanced UX)

## Project Structure

```
src/app/
├── features/auth/          # Login form & simulation
│   └── components/
│       ├── login-form.component.ts
│       └── settings-panel.component.ts
├── core/
│   └── services/           # Settings, audio, keyboard
└── styles.css              # Custom FB components
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

## Form Validation

- **Email**: Required, must be valid email format
- **Password**: Required, minimum 6 characters
- Real-time error messages displayed on touch

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
