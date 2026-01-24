import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { STORAGE_KEYS } from '../utils/constants';

interface Stats {
  totalLogins: number;
  totalAttempts: number;
  lastLoginDate: string | null;
  totalTimeSpent: number;
}

const defaultStats: Stats = {
  totalLogins: 0,
  totalAttempts: 0,
  lastLoginDate: null,
  totalTimeSpent: 0,
};

@Injectable({ providedIn: 'root' })
export class StatsService {
  private platformId = inject(PLATFORM_ID);

  private _totalLogins = signal<number>(0);
  private _totalAttempts = signal<number>(0);
  private _totalTimeSpent = signal<number>(0);
  private _lastLoginDate = signal<string | null>(null);

  readonly totalLogins = this._totalLogins.asReadonly();
  readonly totalAttempts = this._totalAttempts.asReadonly();
  readonly totalTimeSpent = this._totalTimeSpent.asReadonly();
  readonly lastLoginDate = this._lastLoginDate.asReadonly();

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadFromStorage();
    }
  }

  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.STATS);
      if (stored) {
        const data = JSON.parse(stored);
        this._totalLogins.set(data.totalLogins ?? 0);
        this._totalAttempts.set(data.totalAttempts ?? 0);
        this._totalTimeSpent.set(data.totalTimeSpent ?? 0);
        this._lastLoginDate.set(data.lastLoginDate ?? null);
      }
    } catch {
      console.warn('Failed to load stats');
    }
  }

  private saveToStorage(): void {
    try {
      localStorage.setItem(
        STORAGE_KEYS.STATS,
        JSON.stringify({
          totalLogins: this._totalLogins(),
          totalAttempts: this._totalAttempts(),
          totalTimeSpent: this._totalTimeSpent(),
          lastLoginDate: this._lastLoginDate(),
        })
      );
    } catch {
      console.warn('Failed to save stats');
    }
  }

  recordLogin(): void {
    this._totalLogins.update(v => v + 1);
    this._lastLoginDate.set(new Date().toISOString());
    this.saveToStorage();
  }

  recordAttempt(): void {
    this._totalAttempts.update(v => v + 1);
    this.saveToStorage();
  }

  addTimeSpent(seconds: number): void {
    this._totalTimeSpent.update(v => v + seconds);
    this.saveToStorage();
  }

  resetStats(): void {
    this._totalLogins.set(0);
    this._totalAttempts.set(0);
    this._totalTimeSpent.set(0);
    this._lastLoginDate.set(null);
    this.saveToStorage();
  }

  formatTime(): string {
    const seconds = this._totalTimeSpent();
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  }
}
