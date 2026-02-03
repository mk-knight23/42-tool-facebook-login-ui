import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../features/auth/services/auth.service';
import { SessionService } from '../../../features/session/services/session.service';
import { AuthErrorDetails } from '../../../types/auth.types';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="fb-card w-full max-w-[396px] space-y-4">
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-4">
        <div class="space-y-1">
          <input
            type="text"
            formControlName="email"
            placeholder="Email address or phone number"
            class="fb-input"
            [class.border-red-500]="loginForm.get('email')?.invalid && loginForm.get('email')?.touched"
          >
        </div>

        <div class="space-y-1 relative">
          <input
            [type]="showPassword() ? 'text' : 'password'"
            formControlName="password"
            placeholder="Password"
            class="fb-input pr-10"
            [class.border-red-500]="loginForm.get('password')?.invalid && loginForm.get('password')?.touched"
          >
          <button
            type="button"
            (click)="togglePassword()"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-fb-text-secondary hover:text-fb-blue transition-colors"
            aria-label="Toggle password visibility"
          >
            @if (showPassword()) {
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
            } @else {
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            }
          </button>
        </div>

        <!-- Error Messages -->
        @if (loginForm.get('email')?.invalid && loginForm.get('email')?.touched) {
          <p class="text-red-500 text-sm">{{ getErrorMessage('email') }}</p>
        }
        @if (loginForm.get('password')?.invalid && loginForm.get('password')?.touched) {
          <p class="text-red-500 text-sm">{{ getErrorMessage('password') }}</p>
        }

        <!-- Auth Error Message -->
        @if (authError()) {
          <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3">
            <p class="text-red-600 dark:text-red-400 text-sm font-medium">{{ authError()?.message }}</p>
            <p class="text-red-500 dark:text-red-300 text-xs mt-1">{{ authError()?.suggestion }}</p>
          </div>
        }

        <button
          type="submit"
          [disabled]="isLoading()"
          class="w-full bg-fb-blue hover:bg-opacity-95 text-white py-3 rounded-md text-xl font-bold transition-all flex items-center justify-center space-x-2"
        >
          @if (isLoading()) {
            <span class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
          } @else {
            <span>Log In</span>
          }
        </button>

        <div class="text-center">
          <a href="#" class="text-fb-blue text-sm hover:underline">Forgotten password?</a>
        </div>

        <div class="border-t border-fb-border dark:border-[#3a3b3c] my-4"></div>

        <!-- OAuth Buttons -->
        <div class="space-y-3">
          <!-- Facebook OAuth Button -->
          <button
            type="button"
            (click)="loginWithFacebook()"
            [disabled]="isOAuthLoading()"
            class="w-full bg-[#1877f2] hover:bg-opacity-90 text-white py-3 rounded-md text-lg font-bold transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            @if (isOAuthLoading()) {
              <span class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            } @else {
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Continue with Facebook</span>
            }
          </button>

          <!-- Demo Mode Button -->
          @if (isDemoMode()) {
            <button
              type="button"
              (click)="loginWithDemo()"
              [disabled]="isLoading()"
              class="w-full bg-purple-600 hover:bg-opacity-90 text-white py-3 rounded-md text-lg font-bold transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              @if (isLoading() && isDemoLogin()) {
                <span class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              } @else {
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                </svg>
                <span>Demo Mode Login</span>
              }
            </button>
          }
        </div>

        <div class="text-center pt-2">
          <button
            type="button"
            class="bg-fb-green hover:bg-opacity-90 text-white px-6 py-3 rounded-md text-lg font-bold transition-all"
          >
            Create new account
          </button>
        </div>
      </form>

      <!-- Demo Mode Toggle -->
      <div class="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <p class="text-sm font-medium text-blue-800 dark:text-blue-200">Demo Mode</p>
            <p class="text-xs text-blue-600 dark:text-blue-300">
              {{ isDemoMode() ? 'Enabled - Mock authentication' : 'Disabled - Real OAuth' }}
            </p>
          </div>
          <button
            (click)="toggleDemoMode()"
            class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-md font-medium transition-colors"
          >
            {{ isDemoMode() ? 'Disable' : 'Enable' }}
          </button>
        </div>
      </div>
    </div>

    <div class="text-center mt-6">
      <p class="text-sm dark:text-slate-400">
        <span class="font-bold hover:underline cursor-pointer">Create a Page</span> for a celebrity, brand or business.
      </p>
    </div>
  `
})
export class LoginFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private sessionService = inject(SessionService);
  private router = inject(Router);

  isLoading = signal(false);
  isOAuthLoading = signal(false);
  isDemoLogin = signal(false);
  showPassword = signal(false);
  authError = signal<AuthErrorDetails | null>(null);
  isDemoMode = signal(false);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  ngOnInit(): void {
    this.isDemoMode.set(this.sessionService.isDemoMode());

    // Redirect if already authenticated
    if (this.sessionService.isAuthenticated()) {
      this.router.navigate(['/profile']);
    }
  }

  togglePassword(): void {
    this.showPassword.update(v => !v);
  }

  toggleDemoMode(): void {
    this.sessionService.toggleDemoMode();
    this.isDemoMode.set(this.sessionService.isDemoMode());
    this.authError.set(null);
  }

  getErrorMessage(field: string): string {
    const control = this.loginForm.get(field);
    if (!control?.errors) return '';

    if (control.errors['required']) return `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    if (control.errors['email']) return 'Please enter a valid email address';
    if (control.errors['minlength']) return 'Password must be at least 6 characters';

    return 'Invalid input';
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      this.isDemoLogin.set(false);
      this.authError.set(null);

      // For demo mode, use demo login
      if (this.isDemoMode()) {
        this.loginWithDemo();
        return;
      }

      // For OAuth mode, show message
      setTimeout(() => {
        this.isLoading.set(false);
        this.authError.set({
          code: 'OAUTH_REQUIRED',
          message: 'Please use Facebook OAuth or Demo Mode to login',
          suggestion: this.isDemoMode() ? 'Enable Demo Mode for quick testing' : 'Click "Continue with Facebook" to login'
        });
      }, 500);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  loginWithFacebook(): void {
    if (this.isDemoMode()) {
      this.authError.set({
        code: 'DEMO_MODE_ENABLED',
        message: 'Cannot use OAuth while Demo Mode is enabled',
        suggestion: 'Disable Demo Mode first to use real OAuth'
      });
      return;
    }

    this.isOAuthLoading.set(true);
    this.authError.set(null);

    this.authService.loginWithFacebook().subscribe({
      next: (response) => {
        this.isOAuthLoading.set(false);

        if (response.success && response.user) {
          this.router.navigate(['/profile']);
        } else {
          this.authError.set({
            code: 'OAUTH_FAILED',
            message: response.error || 'OAuth login failed',
            suggestion: 'Please try again or use Demo Mode'
          });
        }
      },
      error: (error) => {
        this.isOAuthLoading.set(false);
        const errorDetails = this.authService.handleError(error);
        this.authError.set(errorDetails);
      }
    });
  }

  loginWithDemo(): void {
    this.isLoading.set(true);
    this.isDemoLogin.set(true);
    this.authError.set(null);

    this.authService.loginWithDemo().subscribe({
      next: (response) => {
        this.isLoading.set(false);

        if (response.success && response.user) {
          this.router.navigate(['/profile']);
        } else {
          this.authError.set({
            code: 'DEMO_LOGIN_FAILED',
            message: response.error || 'Demo login failed',
            suggestion: 'Please try again'
          });
        }
      },
      error: (error) => {
        this.isLoading.set(false);
        const errorDetails = this.authService.handleError(error);
        this.authError.set(errorDetails);
      }
    });
  }
}
