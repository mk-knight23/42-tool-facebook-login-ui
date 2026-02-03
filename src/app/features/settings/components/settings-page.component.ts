import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../../features/session/services/user.service';
import { AuthService } from '../../../features/auth/services/auth.service';
import { SessionService } from '../../../features/session/services/session.service';
import { User, Permission } from '../../../types/auth.types';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-fb-bg dark:bg-slate-900 py-8">
      <div class="max-w-4xl mx-auto px-4">
        <!-- Header -->
        <div class="mb-6">
          <button
            (click)="goBack()"
            class="text-fb-blue hover:underline flex items-center gap-2 mb-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to Profile
          </button>
          <h1 class="text-3xl font-bold text-fb-text dark:text-white">Settings</h1>
        </div>

        @if (isLoading()) {
          <div class="flex justify-center items-center py-20">
            <div class="w-12 h-12 border-4 border-fb-blue/30 border-t-fb-blue rounded-full animate-spin"></div>
          </div>
        } @else if (user()) {
          <div class="space-y-6">
            <!-- Account Settings Card -->
            <div class="bg-white dark:bg-slate-800 rounded-lg shadow-sm overflow-hidden">
              <div class="p-6 border-b border-fb-border dark:border-slate-700">
                <h2 class="text-xl font-semibold text-fb-text dark:text-white">Account Settings</h2>
                <p class="text-sm text-fb-text-secondary dark:text-slate-400 mt-1">
                  Manage your account preferences and security
                </p>
              </div>
              <div class="p-6 space-y-4">
                <!-- Email -->
                <div class="flex items-center justify-between py-3">
                  <div>
                    <label class="text-sm text-fb-text-secondary dark:text-slate-400">Email</label>
                    <p class="text-fb-text dark:text-white font-medium">{{ user()?.email }}</p>
                  </div>
                  <button class="text-fb-blue hover:underline text-sm font-medium">Change</button>
                </div>

                <!-- Password -->
                <div class="flex items-center justify-between py-3 border-t border-fb-border dark:border-slate-700">
                  <div>
                    <label class="text-sm text-fb-text-secondary dark:text-slate-400">Password</label>
                    <p class="text-fb-text dark:text-white font-medium">••••••••</p>
                  </div>
                  <button class="text-fb-blue hover:underline text-sm font-medium">Change</button>
                </div>

                <!-- Two-Factor Authentication -->
                <div class="flex items-center justify-between py-3 border-t border-fb-border dark:border-slate-700">
                  <div>
                    <label class="text-sm text-fb-text-secondary dark:text-slate-400">Two-Factor Authentication</label>
                    <p class="text-fb-text dark:text-white font-medium">Disabled</p>
                  </div>
                  <button class="text-fb-blue hover:underline text-sm font-medium">Enable</button>
                </div>
              </div>
            </div>

            <!-- Permissions Card -->
            <div class="bg-white dark:bg-slate-800 rounded-lg shadow-sm overflow-hidden">
              <div class="p-6 border-b border-fb-border dark:border-slate-700">
                <h2 class="text-xl font-semibold text-fb-text dark:text-white">App Permissions</h2>
                <p class="text-sm text-fb-text-secondary dark:text-slate-400 mt-1">
                  Manage what this app can access
                </p>
              </div>
              <div class="p-6">
                <div class="space-y-3">
                  @for (permission of permissions(); track permission.id) {
                    <div class="flex items-center justify-between p-4 bg-fb-bg dark:bg-slate-700 rounded-lg">
                      <div class="flex-1">
                        <h3 class="font-medium text-fb-text dark:text-white">{{ permission.name }}</h3>
                        <p class="text-sm text-fb-text-secondary dark:text-slate-400">{{ permission.description }}</p>
                      </div>
                      @if (permission.id === 'email' || permission.id === 'public_profile') {
                        <span class="text-sm text-fb-text-secondary dark:text-slate-400">Required</span>
                      } @else {
                        @if (permission.granted) {
                          <button
                            (click)="togglePermission(permission.id)"
                            class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-md font-medium transition-colors"
                          >
                            Revoke
                          </button>
                        } @else {
                          <button
                            (click)="togglePermission(permission.id)"
                            class="px-4 py-2 bg-fb-blue hover:bg-fb-blue-hover text-white text-sm rounded-md font-medium transition-colors"
                          >
                            Grant
                          </button>
                        }
                      }
                    </div>
                  }
                </div>
              </div>
            </div>

            <!-- Demo Mode Card -->
            <div class="bg-white dark:bg-slate-800 rounded-lg shadow-sm overflow-hidden">
              <div class="p-6 border-b border-fb-border dark:border-slate-700">
                <h2 class="text-xl font-semibold text-fb-text dark:text-white">Demo Mode</h2>
                <p class="text-sm text-fb-text-secondary dark:text-slate-400 mt-1">
                  Demo mode is currently {{ isDemoMode() ? 'enabled' : 'disabled' }}
                </p>
              </div>
              <div class="p-6">
                <button
                  (click)="toggleDemoMode()"
                  class="px-6 py-2 bg-fb-bg dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-fb-text dark:text-white rounded-md font-medium transition-colors"
                >
                  {{ isDemoMode() ? 'Disable Demo Mode' : 'Enable Demo Mode' }}
                </button>
                <p class="text-sm text-fb-text-secondary dark:text-slate-400 mt-2">
                  Demo mode uses mock authentication for development and testing.
                </p>
              </div>
            </div>

            <!-- Danger Zone Card -->
            <div class="bg-white dark:bg-slate-800 rounded-lg shadow-sm overflow-hidden border border-red-200 dark:border-red-900">
              <div class="p-6 border-b border-red-200 dark:border-red-900">
                <h2 class="text-xl font-semibold text-red-600 dark:text-red-400">Danger Zone</h2>
                <p class="text-sm text-fb-text-secondary dark:text-slate-400 mt-1">
                  Irreversible and destructive actions
                </p>
              </div>
              <div class="p-6 space-y-4">
                <!-- Logout -->
                <div class="flex items-center justify-between">
                  <div>
                    <h3 class="font-medium text-fb-text dark:text-white">Logout</h3>
                    <p class="text-sm text-fb-text-secondary dark:text-slate-400">Sign out of your account</p>
                  </div>
                  <button
                    (click)="logout()"
                    class="px-6 py-2 bg-fb-bg dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-fb-text dark:text-white rounded-md font-medium transition-colors"
                  >
                    Logout
                  </button>
                </div>

                <!-- Delete Account -->
                <div class="flex items-center justify-between pt-4 border-t border-fb-border dark:border-slate-700">
                  <div>
                    <h3 class="font-medium text-red-600 dark:text-red-400">Delete Account</h3>
                    <p class="text-sm text-fb-text-secondary dark:text-slate-400">Permanently delete your account and all data</p>
                  </div>
                  <button
                    (click)="deleteAccount()"
                    class="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md font-medium transition-colors"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class SettingsPageComponent implements OnInit {
  private router = inject(Router);
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private sessionService = inject(SessionService);

  user = signal<User | null>(null);
  permissions = signal<Permission[]>([]);
  isLoading = signal(true);
  isDemoMode = signal(false);

  ngOnInit(): void {
    this.user.set(this.userService.getCurrentUser());
    this.isDemoMode.set(this.sessionService.isDemoMode());
    this.loadPermissions();
    this.isLoading.set(false);
  }

  loadPermissions(): void {
    this.userService.getUserPermissions().subscribe({
      next: (permissions) => {
        this.permissions.set(permissions);
      },
      error: (error) => {
        console.error('Failed to load permissions:', error);
      }
    });
  }

  togglePermission(permissionId: string): void {
    const permission = this.permissions().find((p) => p.id === permissionId);
    if (permission) {
      const action$ = permission.granted
        ? this.userService.revokePermission(permissionId)
        : this.userService.grantPermission(permissionId);

      action$.subscribe({
        next: (updatedPermissions) => {
          this.permissions.set(updatedPermissions);
        },
        error: (error) => {
          console.error('Failed to toggle permission:', error);
        }
      });
    }
  }

  toggleDemoMode(): void {
    this.sessionService.toggleDemoMode();
    this.isDemoMode.set(this.sessionService.isDemoMode());
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  deleteAccount(): void {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      this.userService.deleteAccount().subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Failed to delete account:', error);
          alert('Failed to delete account. Please try again.');
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/profile']);
  }
}
