# Social/Familiar UI Design System (Facebook-Inspired)

**Theme Identity:** Familiar social media interface with Facebook's design language

## Color Palette

### Facebook Brand Colors
```css
--fb-blue: #1877f2;          /* Primary Facebook blue */
--fb-blue-hover: #166fe5;
--fb-green: #42b72a;         /* Action button green */
--fb-green-hover: #36a420;
```

### Background & Surface
```css
--fb-bg: #f0f2f5;            /* Light gray background */
--fb-card: #ffffff;          /* White cards */
--fb-input-bg: #ffffff;      /* Input background */
```

### Text Colors
```css
--fb-text-primary: #050505;  /* Near black */
--fb-text-secondary: #65676b; /* Gray text */
--fb-text-muted: #bcc0c4;    /* Light gray */
--fb-link: #1877f2;          /* Blue links */
```

### Border Colors
```css
--fb-border: #dddfe2;        /* Light borders */
--fb-border-focus: #1877f2;  /* Focus blue */
--fb-divider: #dadde1;       /* Divider lines */
```

## Typography

### Font Family
```css
--font-fb: Helvetica, Arial, sans-serif;
--font-fb-secondary: Segoe UI Historic, Segoe UI, Helvetica, Arial, sans-serif;
```

### Type Scale
```css
--text-xs: 0.75rem;     /* 12px - helper text */
--text-sm: 0.8125rem;   /* 13px - labels */
--text-base: 0.875rem;  /* 14px - body text */
--text-lg: 1rem;        /* 16px - headings */
--text-xl: 1.25rem;     /* 20px - page titles */
```

## Component Patterns

### Facebook Button
```css
.btn-facebook {
  background: var(--fb-blue);
  color: white;
  font-weight: 600;
  font-size: var(--text-base);
  padding: 0.375rem 1rem;
  border: none;
  border-radius: 6px;
  transition: background 0.2s;
}

.btn-facebook:hover {
  background: var(--fb-blue-hover);
}

.btn-facebook:disabled {
  background: var(--fb-bg);
  color: var(--fb-text-muted);
}
```

### Green Action Button
```css
.btn-action {
  background: var(--fb-green);
  color: white;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
}

.btn-action:hover {
  background: var(--fb-green-hover);
}
```

### Form Inputs
```css
.fb-input {
  width: 100%;
  padding: 0.625rem 1rem;
  border: 1px solid var(--fb-border);
  border-radius: 6px;
  background: var(--fb-input-bg);
  font-size: var(--text-base);
}

.fb-input:focus {
  border-color: var(--fb-border-focus);
  box-shadow: 0 0 0 2px rgba(24, 119, 242, 0.2);
  outline: none;
}

.fb-input::placeholder {
  color: var(--fb-text-muted);
}
```

### Social Card
```css
.fb-card {
  background: var(--fb-card);
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  padding: 1rem;
}
```

### Profile Header
```css
.profile-header {
  background: var(--fb-card);
  border-radius: 0 0 8px 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  text-align: center;
  padding: 1rem 1rem 0.5rem;
}

.profile-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: #e4e6eb;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: -60px auto 0.5rem;
  border: 4px solid var(--fb-card);
}

.profile-name {
  font-size: 2rem;
  font-weight: 700;
  color: var(--fb-text-primary);
}
```

### Link Style
```css
.fb-link {
  color: var(--fb-link);
  text-decoration: none;
  font-size: var(--text-sm);
}

.fb-link:hover {
  text-decoration: underline;
}
```

## Layout Patterns

### Auth Page Layout
```css
.fb-auth-layout {
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  background: var(--fb-bg);
  padding: 1rem;
}

.fb-auth-container {
  max-width: 980px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
```

### Footer Links
```css
.fb-footer-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: var(--text-xs);
  color: var(--fb-text-secondary);
}

.fb-footer-links a {
  color: var(--fb-text-secondary);
  text-decoration: none;
}

.fb-footer-links a:hover {
  text-decoration: underline;
}
```

## Dark Mode Overrides

```css
.dark {
  --fb-bg: #18191a;
  --fb-card: #242526;
  --fb-input-bg: #2a2b2c;
  --fb-text-primary: #e4e6eb;
  --fb-text-secondary: #b0b3b8;
  --fb-text-muted: #6c757d;
  --fb-border: #3e4042;
  --fb-divider: #3e4042;
}
```

## Design Tokens Summary

| Token | Light Mode | Dark Mode |
|-------|-----------|-----------|
| Background | #f0f2f5 | #18191a |
| Card | #ffffff | #242526 |
| Primary Blue | #1877f2 | #1877f2 |
| Action Green | #42b72a | #42b72a |
| Text Primary | #050505 | #e4e6eb |
| Text Secondary | #65676b | #b0b3b8 |
| Border | #dddfe2 | #3e4042 |
