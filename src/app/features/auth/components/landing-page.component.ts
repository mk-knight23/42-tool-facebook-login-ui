import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, LoginFormComponent],
  template: `
    <div class="fb-auth-container">
      <div class="md:w-1/2 text-center md:text-left space-y-6 md:pt-10 px-4">
        <h1 class="fb-logo">facebook</h1>
        <h2 class="fb-tagline max-w-md">
          Facebook helps you connect and share with the people in your life.
        </h2>
      </div>

      <div class="w-full max-w-[396px] px-4 login-section">
        <app-login-form></app-login-form>

        <div class="create-account-section fade-in">
          <p class="create-account-text">
            <a href="#" class="fb-link">Create a Page</a> for a celebrity, brand or business.
          </p>
        </div>
      </div>
    </div>
  `
})
export class LandingPageComponent {}
