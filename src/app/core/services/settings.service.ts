import { Injectable, signal, PLATFORM_ID, inject, effect } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { STORAGE_KEYS } from '../utils/constants';

export type ThemeMode = 'dark' | 'light' | 'system';

interface Settings {
  soundEnabled: boolean;
  theme: ThemeMode;
  reducedMotion: boolean;
  showHelp: boolean;
}

const defaultSettings: Settings = {
  soundEnabled: true,
  theme: 'dark',
  reducedMotion: false,
  showHelp: false,
};

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private platformId = inject(PLATFORM_ID);

  private _soundEnabled = signal<boolean>(defaultSettings.soundEnabled);
  private _theme = signal<ThemeMode>(defaultSettings.theme);
  private _showHelp = signal<boolean>(defaultSettings.showHelp);
  private _reducedMotion = signal<boolean>(defaultSettings.reducedMotion);
  private _isDarkMode = signal<boolean>(true);

  readonly soundEnabled = this._soundEnabled.asReadonly();
  readonly theme = this._theme.asReadonly();
  readonly showHelp = this._showHelp.asReadonly();
  readonly reducedMotion = this._reducedMotion.asReadonly();
  readonly isDarkMode = this._isDarkMode.asReadonly();

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadFromStorage();
      this.applyTheme();
    }

    effect(() => {
      this._isDarkMode();
      if (isPlatformBrowser(this.platformId)) {
        this.saveToStorage();
      }
    });
  }

  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (stored) {
        const data = JSON.parse(stored);
        this._soundEnabled.set(data.soundEnabled ?? true);
        this._theme.set(data.theme ?? 'dark');
        this._reducedMotion.set(data.reducedMotion ?? false);
      }
    } catch {
      console.warn('Failed to load settings');
    }
  }

  private saveToStorage(): void {
    try {
      localStorage.setItem(
        STORAGE_KEYS.SETTINGS,
        JSON.stringify({
          soundEnabled: this._soundEnabled(),
          theme: this._theme(),
          reducedMotion: this._reducedMotion(),
        })
      );
    } catch {
      console.warn('Failed to save settings');
    }
  }

  toggleSound(): void {
    this._soundEnabled.update(v => !v);
  }

  setTheme(value: ThemeMode): void {
    this._theme.set(value);
    this.applyTheme();
  }

  applyTheme(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const theme = this._theme();
    const isDark =
      theme === 'dark' ||
      (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    this._isDarkMode.set(isDark);

    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }

  toggleHelp(): void {
    this._showHelp.update(v => !v);
  }

  setReducedMotion(value: boolean): void {
    this._reducedMotion.set(value);
  }
}
