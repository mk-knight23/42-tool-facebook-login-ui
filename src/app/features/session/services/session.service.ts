import { Injectable, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User, SessionData } from '../../../types/auth.types';
import { STORAGE_KEYS, DEMO_USER } from '../../../config/environment';

/**
 * Session management service
 * Handles user session persistence and state
 */
@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private router = inject(Router);

  // Signals for reactive state
  private currentUserSignal = signal<User | null>(null);
  private tokenSignal = signal<string | null>(null);
  private expiresAtSignal = signal<number | null>(null);
  private demoModeSignal = signal<boolean>(false);

  // Computed signals
  readonly isAuthenticated = computed(() => this.currentUserSignal() !== null);
  readonly currentUser = computed(() => this.currentUserSignal());
  readonly token = computed(() => this.tokenSignal());
  readonly isDemoMode = computed(() => this.demoModeSignal());
  readonly sessionExpiry = computed(() => this.expiresAtSignal());

  constructor() {
    this.loadSession();
  }

  /**
   * Set user session
   */
  setSession(user: User, token: string, expiresIn: number = 3600): void {
    const expiresAt = Date.now() + expiresIn * 1000;

    this.currentUserSignal.set(user);
    this.tokenSignal.set(token);
    this.expiresAtSignal.set(expiresAt);

    // Persist to localStorage
    const sessionData: SessionData = {
      user,
      token,
      expiresAt
    };

    try {
      localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(sessionData));
    } catch (error) {
      console.error('Failed to save session:', error);
    }

    // Setup session expiry check
    this.setupSessionExpiryCheck(expiresAt);
  }

  /**
   * Clear user session
   */
  clearSession(): void {
    this.currentUserSignal.set(null);
    this.tokenSignal.set(null);
    this.expiresAtSignal.set(null);

    try {
      localStorage.removeItem(STORAGE_KEYS.SESSION);
    } catch (error) {
      console.error('Failed to clear session:', error);
    }
  }

  /**
   * Load session from localStorage
   */
  private loadSession(): void {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SESSION);
      if (stored) {
        const sessionData: SessionData = JSON.parse(stored);

        // Check if session is still valid
        if (sessionData.expiresAt > Date.now()) {
          this.currentUserSignal.set(sessionData.user);
          this.tokenSignal.set(sessionData.token);
          this.expiresAtSignal.set(sessionData.expiresAt);

          // Setup expiry check
          this.setupSessionExpiryCheck(sessionData.expiresAt);
        } else {
          // Session expired, clear it
          this.clearSession();
        }
      }

      // Load demo mode preference
      const demoMode = localStorage.getItem(STORAGE_KEYS.DEMO_MODE);
      this.demoModeSignal.set(demoMode === 'true');
    } catch (error) {
      console.error('Failed to load session:', error);
      this.clearSession();
    }
  }

  /**
   * Setup session expiry check
   */
  private setupSessionExpiryCheck(expiresAt: number): void {
    const timeUntilExpiry = expiresAt - Date.now();

    if (timeUntilExpiry > 0) {
      setTimeout(() => {
        this.clearSession();
        this.router.navigate(['/']);
      }, timeUntilExpiry);
    }
  }

  /**
   * Validate session
   */
  validateSession(): boolean {
    if (!this.isAuthenticated()) {
      return false;
    }

    const expiresAt = this.expiresAtSignal();
    if (!expiresAt || expiresAt < Date.now()) {
      this.clearSession();
      return false;
    }

    return true;
  }

  /**
   * Toggle demo mode
   */
  toggleDemoMode(): void {
    const newValue = !this.demoModeSignal();
    this.demoModeSignal.set(newValue);

    try {
      localStorage.setItem(STORAGE_KEYS.DEMO_MODE, String(newValue));
    } catch (error) {
      console.error('Failed to save demo mode preference:', error);
    }

    // Clear session when toggling demo mode
    if (this.isAuthenticated()) {
      this.clearSession();
      this.router.navigate(['/']);
    }
  }

  /**
   * Set demo mode
   */
  setDemoMode(enabled: boolean): void {
    this.demoModeSignal.set(enabled);

    try {
      localStorage.setItem(STORAGE_KEYS.DEMO_MODE, String(enabled));
    } catch (error) {
      console.error('Failed to save demo mode preference:', error);
    }
  }

  /**
   * Get demo user
   */
  getDemoUser(): User {
    return { ...DEMO_USER };
  }

  /**
   * Refresh session (extend expiry)
   */
  refreshSession(expiresIn: number = 3600): void {
    const user = this.currentUserSignal();
    const token = this.tokenSignal();

    if (user && token) {
      this.setSession(user, token, expiresIn);
    }
  }
}
