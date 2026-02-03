import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../../features/session/services/user.service';
import { AuthService } from '../../../features/auth/services/auth.service';
import { User } from '../../../types/auth.types';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-fb-bg dark:bg-slate-900 py-8">
      <div class="max-w-4xl mx-auto px-4">
        <!-- Back button -->
        <button
          (click)="goBack()"
          class="mb-6 text-fb-blue hover:underline flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Login
        </button>

        @if (isLoading()) {
          <div class="flex justify-center items-center py-20">
            <div class="w-12 h-12 border-4 border-fb-blue/30 border-t-fb-blue rounded-full animate-spin"></div>
          </div>
        } @else if (user()) {
          <div class="bg-white dark:bg-slate-800 rounded-lg shadow-sm overflow-hidden">
            <!-- Cover photo area -->
            <div class="h-48 bg-gradient-to-r from-fb-blue to-blue-600"></div>

            <!-- Profile info -->
            <div class="px-6 pb-6">
              <div class="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-16">
                <!-- Profile picture -->
                <div class="w-32 h-32 rounded-full border-4 border-white dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-800">
                  @if (user()?.picture) {
                    <img [src]="user()?.picture" [alt]="user()?.name" class="w-full h-full object-cover">
                  } @else {
                    <div class="w-full h-full flex items-center justify-center bg-fb-blue text-white text-4xl font-bold">
                      {{ user()?.firstName?.charAt(0) }}{{ user()?.lastName?.charAt(0) }}
                    </div>
                  }
                </div>

                <!-- User name and actions -->
                <div class="flex-1 text-center sm:text-left">
                  <h1 class="text-3xl font-bold text-fb-text dark:text-white mb-1">
                    {{ user()?.name }}
                  </h1>
                  <p class="text-fb-text-secondary dark:text-slate-400 mb-4">
                    {{ user()?.email }}
                  </p>
                </div>
              </div>

              <!-- User details -->
              <div class="mt-8 space-y-4">
                <div class="border-t border-fb-border dark:border-slate-700 pt-6">
                  <h2 class="text-xl font-semibold text-fb-text dark:text-white mb-4">About</h2>
                  <div class="grid gap-4">
                    <div>
                      <label class="text-sm text-fb-text-secondary dark:text-slate-400">Name</label>
                      <p class="text-fb-text dark:text-white">{{ user()?.name }}</p>
                    </div>
                    <div>
                      <label class="text-sm text-fb-text-secondary dark:text-slate-400">Email</label>
                      <p class="text-fb-text dark:text-white">{{ user()?.email }}</p>
                    </div>
                    <div>
                      <label class="text-sm text-fb-text-secondary dark:text-slate-400">User ID</label>
                      <p class="text-fb-text dark:text-white font-mono text-sm">{{ user()?.id }}</p>
                    </div>
                  </div>
                </div>

                <!-- Permissions -->
                <div class="border-t border-fb-border dark:border-slate-700 pt-6">
                  <h2 class="text-xl font-semibold text-fb-text dark:text-white mb-4">Granted Permissions</h2>
                  <div class="space-y-3">
                    @for (permission of user()?.permissions || []; track permission.id) {
                      <div class="flex items-center justify-between p-3 bg-fb-bg dark:bg-slate-700 rounded-lg">
                        <div>
                          <h3 class="font-medium text-fb-text dark:text-white">{{ permission.name }}</h3>
                          <p class="text-sm text-fb-text-secondary dark:text-slate-400">{{ permission.description }}</p>
                        </div>
                        @if (permission.granted) {
                          <span class="text-green-500 text-sm font-medium">Granted</span>
                        } @else {
                          <span class="text-red-500 text-sm font-medium">Revoked</span>
                        }
                      </div>
                    }
                  </div>
                </div>

                <!-- Actions -->
                <div class="border-t border-fb-border dark:border-slate-700 pt-6">
                  <div class="flex flex-wrap gap-3">
                    <button
                      (click)="goToSettings()"
                      class="bg-fb-bg dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-fb-text dark:text-white px-6 py-2 rounded-md font-medium transition-colors"
                    >
                      Account Settings
                    </button>
                    <button
                      (click)="logout()"
                      class="bg-fb-bg dark:bg-slate-700 hover:bg-red-50 dark:hover:bg-red-900/30 text-fb-text dark:text-white hover:text-red-600 dark:hover:text-red-400 px-6 py-2 rounded-md font-medium transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class ProfilePageComponent implements OnInit {
  private router = inject(Router);
  private userService = inject(UserService);
  private authService = inject(AuthService);

  user = signal<User | null>(null);
  isLoading = signal(true);

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.userService.getUserProfile().subscribe({
      next: (user) => {
        this.user.set(user);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
        this.router.navigate(['/']);
      }
    });
  }

  goToSettings(): void {
    this.router.navigate(['/settings']);
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
