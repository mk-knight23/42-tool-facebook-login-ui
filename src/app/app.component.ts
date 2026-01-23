import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './features/auth/components/login-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LoginFormComponent],
  template: `
    <div class="min-h-screen flex flex-col md:flex-row items-center justify-center bg-fb-light dark:bg-fb-dark transition-colors duration-300">
      
      <div class="max-w-[980px] w-full px-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-12 md:pb-32">
        
        <!-- Left Section: Content -->
        <div class="md:w-1/2 text-center md:text-left space-y-6 md:pt-10">
          <h1 class="text-fb-blue text-6xl font-black tracking-tighter">facebook</h1>
          <h2 class="text-2xl md:text-3xl font-medium leading-tight dark:text-white">
            Facebook helps you connect and share with the people in your life.
          </h2>
        </div>

        <!-- Right Section: Login Form -->
        <div class="md:w-1/2 flex flex-col items-center">
          <app-login-form></app-login-form>
        </div>

      </div>

      <!-- Footer -->
      <footer class="md:fixed md:bottom-0 w-full bg-white dark:bg-fb-dark-card p-6 border-t border-fb-border dark:border-[#3a3b3c]">
        <div class="max-w-[980px] mx-auto space-y-4">
          <div class="flex flex-wrap gap-4 text-xs text-slate-500 dark:text-slate-400">
            <span>English (UK)</span>
            <span>Hausa</span>
            <span>Français (France)</span>
            <span>Português (Brasil)</span>
            <span>Español</span>
            <span>Deutsch</span>
            <span>日本語</span>
            <span>Italiano</span>
            <span>العربية</span>
            <button class="bg-fb-light dark:bg-[#3a3b3c] px-2 rounded-sm border border-fb-border dark:border-none">+</button>
          </div>
          <div class="border-t border-fb-border dark:border-[#3a3b3c]"></div>
          <div class="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
            <span>Sign Up</span>
            <span>Log In</span>
            <span>Messenger</span>
            <span>Facebook Lite</span>
            <span>Video</span>
            <span>Places</span>
            <span>Games</span>
            <span>Marketplace</span>
            <span>Meta Pay</span>
            <span>Meta Store</span>
            <span>Meta Quest</span>
            <span>Imagine with Meta AI</span>
            <span>Instagram</span>
            <span>Threads</span>
            <span>Fundraisers</span>
            <span>Services</span>
            <span>Voting Information Centre</span>
            <span>Privacy Policy</span>
            <span>Privacy Centre</span>
            <span>Groups</span>
            <span>About</span>
            <span>Create ad</span>
            <span>Create Page</span>
            <span>Developers</span>
            <span>Careers</span>
            <span>Cookies</span>
            <span>AdChoices</span>
            <span>Terms</span>
            <span>Help</span>
            <span>Contact uploading and non-users</span>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400 pt-2">Meta © 2026</p>
        </div>
      </footer>
    </div>
  `
})
export class App {}
