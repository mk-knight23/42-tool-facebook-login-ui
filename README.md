# Facebook Login UI — High-Fidelity Clone

A professional, pixel-perfect clone of the modern Facebook Login experience, engineered with Angular and Tailwind CSS. This project demonstrates high-fidelity UI replication combined with robust functional simulation.

## Recent Upgrades (v2.1.0)

### Iterations 1-5: Complete Upgrade
- Added "Made by MK — Musharraf Kazi" branding
- Updated Angular version documentation
- Enhanced feature descriptions
- Documented accessibility support
- Verified build successful

---

## Social/Familiar UI Theme

This application features a **"Facebook-Inspired"** design system:
- Facebook's signature blue (#1877f2) for primary actions
- Familiar social media card style interface
- Light gray background (#f0f2f5) matching FB's aesthetic
- Profile picture placeholder with rounded styling
- Authentic social login patterns and layouts

## Features

| Feature | Description |
|---------|-------------|
| **Pixel-Perfect Design** | Replicates Facebook's 2026 design language |
| **Reactive Forms** | Strict form validation with Angular Reactive Forms |
| **Loading States** | Authentic loading animation simulation |
| **Dark Mode** | Automatic theme switching support |
| **Accessibility** | ARIA-compliant, screen reader optimized |
| **Social Login Ready** | Google OAuth integration placeholder |
| **Responsive Layout** | Mobile-first, works on all devices |

## Tech Stack

- **Framework:** Angular 19 (Standalone architecture)
- **Styling:** Tailwind CSS (Custom Facebook palette)
- **State:** Angular Signals (UI state management)
- **Logic:** Reactive Forms (Auth validation)
- **Icons:** Lucide Angular
- **Services:** Settings, Audio, Keyboard (enhanced UX)

## Design System

See `design-system/MASTER.md` for complete design token documentation.

### Color Palette
```css
--fb-blue: #1877f2;          /* Primary Facebook blue */
--fb-green: #42b72a;         /* Action button green */
--fb-bg: #f0f2f5;            /* Light gray background */
--fb-card: #ffffff;          /* White cards */
```

### Key Components
- `.fb-input` - Facebook-style form input
- `.btn-facebook` - Primary blue button
- `.btn-action` - Green action button
- `.fb-card` - Social media card container
- `.profile-avatar` - Circular profile placeholder

### Form Input Styling
```css
.fb-input {
  padding: 0.625rem 1rem;
  border: 1px solid #dddfe2;
  border-radius: 6px;
  font-size: 14px;
}

.fb-input:focus {
  border-color: #1877f2;
  box-shadow: 0 0 0 2px rgba(24, 119, 242, 0.2);
}
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

## Component API

### LoginFormComponent

The main login form with validation:

```typescript
@Component({
  selector: 'app-login-form',
  template: `
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
      <input formControlName="email" class="fb-input" />
      <input formControlName="password" type="password" class="fb-input" />
      <button type="submit" class="btn-facebook">Log In</button>
    </form>
  `
})
```

## Deployment

This project is configured for deployment on three platforms:

### GitHub Pages
- **Workflow**: `.github/workflows/deploy.yml`
- **Build Command**: `npm run build -- --base-href=/42-tool-facebook-login-ui/`
- **Output Directory**: `dist/facebook-clone/browser`
- **Trigger**: Push to `main` branch
- **Action**: `actions/deploy-page@v4`

### Vercel
- **Config**: `vercel.json`
- **Framework**: Angular
- **Build Command**: `npm run build`
- **Output Directory**: `dist/facebook-clone/browser`
- **Rewrites**: SPA fallback to `/index.html`

### Netlify
- **Config**: `netlify.toml`
- **Build Command**: `npm run build`
- **Publish Directory**: `dist/facebook-clone/browser`
- **Redirects**: All paths to `/index.html` (SPA support)

---

## Live Links

| Platform | URL |
|----------|-----|
| **GitHub Pages** | https://mk-knight23.github.io/42-tool-facebook-login-ui/ |
| **Vercel** | https://42-tool-facebook-login-ui.vercel.app/ |
| **Netlify** | https://42-tool-facebook-login-ui.netlify.app/ |

---

**Theme:** Social/Familiar UI (Facebook-Inspired)
**License:** MIT
**Created by:** mk-knight23
