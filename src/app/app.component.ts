import { Component, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginFormComponent } from './features/auth/components/login-form.component';
import { SettingsPanelComponent } from './features/auth/components/settings-panel.component';
import { SettingsService } from './core/services/settings.service';
import { AudioService } from './core/services/audio.service';
import { KeyboardService } from './core/services/keyboard.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, LoginFormComponent, SettingsPanelComponent],
  template: `
    <div class="fb-page" [class.dark]="settingsService.isDarkMode()">
      <div class="fb-auth-container">

        <!-- Left Section: Branding -->
        <div class="md:w-1/2 text-center md:text-left space-y-6 md:pt-10 px-4">
          <h1 class="fb-logo">facebook</h1>
          <h2 class="fb-tagline max-w-md">
            Facebook helps you connect and share with the people in your life.
          </h2>
        </div>

        <!-- Right Section: Login Form -->
        <div class="w-full max-w-[396px] px-4 login-section">
          <app-login-form></app-login-form>

          <!-- Create Account Section */}
          <div class="create-account-section fade-in">
            <p class="create-account-text">
              <a href="#" class="fb-link">Create a Page</a>
              {" "}for a celebrity, brand or business.
            </p>
          </div>
        </div>

      </div>

      <!-- Settings Button -->
      <button
        (click)="openSettings()"
        class="fixed bottom-6 right-6 w-12 h-12 bg-fb-blue text-white rounded-full shadow-lg flex items-center justify-center hover:bg-fb-blue-hover transition-colors z-40"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M12 1v6m0 6v6m-5.5-11.5l-4.242 4.242M8.464 15.536L4.222 19.778m15.556-11.314l-4.242-4.242M15.536 15.536l4.242 4.242"></path>
        </svg>
      </button>
    </div>

    <!-- Footer -->
    <footer class="fb-footer">
      <div class="footer-content space-y-4">
        <!-- Language Row -->
        <div class="flex flex-wrap items-center gap-4 text-xs text-fb-text-secondary dark:text-slate-400">
          <span>English (UK)</span>
          <button class="language-selector flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
            +
          </button>
          <span class="hidden sm:inline">Hausa</span>
          <span class="hidden sm:inline">Français (France)</span>
          <span class="hidden md:inline">Português (Brasil)</span>
          <span class="hidden md:inline">Español</span>
          <span class="hidden lg:inline">Deutsch</span>
          <span class="hidden lg:inline">日本語</span>
        </div>

        <div class="fb-divider"></div>

        <!-- Footer Links -->
        <div class="footer-links">
          <a href="#">Sign Up</a>
          <a href="#">Log In</a>
          <a href="#">Messenger</a>
          <a href="#">Facebook Lite</a>
          <a href="#">Video</a>
          <a href="#">Places</a>
          <a href="#">Games</a>
          <a href="#">Marketplace</a>
          <a href="#">Meta Pay</a>
          <a href="#">Meta Store</a>
          <a href="#">Meta Quest</a>
          <a href="#">Imagine with Meta AI</a>
          <a href="#">Instagram</a>
          <a href="#">Threads</a>
          <a href="#">Fundraisers</a>
          <a href="#">Services</a>
          <a href="#">Voting Information Centre</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Privacy Centre</a>
          <a href="#">Groups</a>
          <a href="#">About</a>
          <a href="#">Create ad</a>
          <a href="#">Create Page</a>
          <a href="#">Developers</a>
          <a href="#">Careers</a>
          <a href="#">Cookies</a>
          <a href="#">AdChoices</a>
          <a href="#">Terms</a>
          <a href="#">Help</a>
          <a href="#">Contact uploading and non-users</a>
        </div>

        <p class="text-xs text-fb-text-secondary dark:text-slate-400 pt-2">Meta © 2026</p>
      </div>
    </footer>

    <app-settings-panel />
  `
})
export class App {
  settingsService = inject(SettingsService);
  private audioService = inject(AudioService);
  private keyboardService = inject(KeyboardService);

  constructor() {
    effect(() => {
      this.settingsService.isDarkMode();
    });

    effect(() => {
      const action = this.keyboardService.lastAction();
      if (action !== 'none') {
        this.handleAction(action);
      }
    });
  }

  private handleAction(action: string): void {
    switch (action) {
      case 'help':
        this.settingsService.toggleHelp();
        break;
      case 'close':
        if (this.settingsService.showHelp()) {
          this.settingsService.toggleHelp();
        }
        break;
    }
  }

  openSettings(): void {
    this.audioService.playClick();
    this.settingsService.toggleHelp();
  }
}
