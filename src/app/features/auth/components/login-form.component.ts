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
        
        <div class="space-y-1">
          <input 
            type="password" 
            formControlName="password"
            placeholder="Password"
            class="fb-input"
            [class.border-red-500]="loginForm.get('password')?.invalid && loginForm.get('password')?.touched"
          >
        </div>

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

  loginForm = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

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
