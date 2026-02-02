import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

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

        <div class="text-center pt-2">
          <button 
            type="button"
            class="bg-fb-green hover:bg-opacity-90 text-white px-6 py-3 rounded-md text-lg font-bold transition-all"
          >
            Create new account
          </button>
        </div>
      </form>
    </div>
    
    <div class="text-center mt-6">
      <p class="text-sm dark:text-slate-400">
        <span class="font-bold hover:underline cursor-pointer">Create a Page</span> for a celebrity, brand or business.
      </p>
    </div>
  `
})
export class LoginFormComponent {
  private fb = inject(FormBuilder);
  isLoading = signal(false);
  showPassword = signal(false);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  togglePassword(): void {
    this.showPassword.update(v => !v);
  }

  getErrorMessage(field: string): string {
    const control = this.loginForm.get(field);
    if (!control?.errors) return '';

    if (control.errors['required']) return `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    if (control.errors['email']) return 'Please enter a valid email address';
    if (control.errors['minlength']) return 'Password must be at least 6 characters';

    return 'Invalid input';
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      // Simulate API call
      setTimeout(() => {
        this.isLoading.set(false);
        alert('Simulation: Login successful with ' + this.loginForm.value.email);
      }, 1500);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
