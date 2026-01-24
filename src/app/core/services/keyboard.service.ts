import { Injectable, inject, PLATFORM_ID, signal, effect } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SettingsService } from './settings.service';
import { KEYBOARD_SHORTCUTS } from '../utils/constants';

type KeyAction = 'save' | 'close' | 'help' | 'none';

@Injectable({ providedIn: 'root' })
export class KeyboardService {
  private platformId = inject(PLATFORM_ID);
  private settings = inject(SettingsService);

  private _lastAction = signal<KeyAction>('none');

  readonly lastAction = this._lastAction.asReadonly();

  private actionMap: Record<string, KeyAction> = {
    'KeyS': 'save',
    'Escape': 'close',
    'KeyH': 'help',
    '/': 'help',
    '?': 'help',
  };

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.setupListeners();
    }

    effect(() => {
      this._lastAction();
      setTimeout(() => this._lastAction.set('none'), 100);
    });
  }

  private setupListeners(): void {
    const handleKeyDown = (e: KeyboardEvent) => {
      const action = this.actionMap[e.key] || 'none';

      if (e.ctrlKey || e.metaKey) {
        if (action === 'save') {
          e.preventDefault();
          this._lastAction.set(action);
          return;
        }
      }

      if (action === 'close' && this.settings.showHelp()) {
        e.preventDefault();
        this.settings.toggleHelp();
        this._lastAction.set(action);
        return;
      }

      if (action === 'help' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        this.settings.toggleHelp();
        this._lastAction.set(action);
        return;
      }

      if (action !== 'none') {
        this._lastAction.set(action);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
  }

  getShortcuts() {
    return KEYBOARD_SHORTCUTS;
  }
}
