import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService, ThemeMode } from '../../../core/services/settings.service';
import { StatsService } from '../../../core/services/stats.service';
import { AudioService } from '../../../core/services/audio.service';
import { KeyboardService } from '../../../core/services/keyboard.service';

@Component({
  selector: 'app-settings-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (settingsService.showHelp()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" (click)="close()">
        <div class="bg-white dark:bg-fb-dark-card rounded-lg shadow-2xl max-w-md w-full" (click)="$event.stopPropagation()">
          <div class="p-6">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-bold dark:text-white">Settings</h2>
              <button (click)="close()" class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <span class="text-xl dark:text-white">✕</span>
              </button>
            </div>

            <div class="space-y-6">
              <div class="space-y-3">
                <h3 class="text-sm font-semibold text-gray-600 dark:text-gray-400">Theme</h3>
                <div class="flex gap-2">
                  @for (mode of themeModes; track mode.value) {
                    <button
                      (click)="setTheme(mode.value)"
                      [class]="settingsService.theme() === mode.value
                        ? 'bg-fb-blue text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'"
                      class="flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all"
                    >
                      {{ mode.label }}
                    </button>
                  }
                </div>
              </div>

              <div class="space-y-3">
                <h3 class="text-sm font-semibold text-gray-600 dark:text-gray-400">Sound Effects</h3>
                <button
                  (click)="toggleSound()"
                  class="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <span class="font-medium dark:text-white">Enable Sound</span>
                  <span [class]="settingsService.soundEnabled() ? 'text-fb-green' : 'text-gray-400'">
                    {{ settingsService.soundEnabled() ? '✓' : '✕' }}
                  </span>
                </button>
              </div>

              <div class="space-y-3">
                <h3 class="text-sm font-semibold text-gray-600 dark:text-gray-400">Statistics</h3>
                <div class="grid grid-cols-2 gap-3">
                  <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
                    <div class="text-2xl font-bold text-fb-blue">{{ statsService.totalLogins() }}</div>
                    <div class="text-xs text-gray-500 dark:text-gray-400">Logins</div>
                  </div>
                  <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
                    <div class="text-2xl font-bold text-fb-green">{{ statsService.totalAttempts() }}</div>
                    <div class="text-xs text-gray-500 dark:text-gray-400">Attempts</div>
                  </div>
                  <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
                    <div class="text-2xl font-bold text-fb-blue">{{ statsService.formatTime() }}</div>
                    <div class="text-xs text-gray-500 dark:text-gray-400">Time Spent</div>
                  </div>
                  <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
                    <div class="text-2xl font-bold text-fb-green">{{ statsService.lastLoginDate() ? 'Yes' : 'No' }}</div>
                    <div class="text-xs text-gray-500 dark:text-gray-400">Last Login</div>
                  </div>
                </div>
                <button
                  (click)="resetStats()"
                  class="w-full p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-sm font-medium"
                >
                  Reset Statistics
                </button>
              </div>

              <div class="space-y-3">
                <h3 class="text-sm font-semibold text-gray-600 dark:text-gray-400">Keyboard Shortcuts</h3>
                <div class="space-y-2">
                  @for (shortcut of keyboardService.getShortcuts(); track shortcut.key) {
                    <div class="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <span class="text-sm dark:text-white">{{ shortcut.action }}</span>
                      <kbd class="px-2 py-1 text-xs font-mono bg-gray-200 dark:bg-gray-600 rounded dark:text-white">{{ shortcut.key }}</kbd>
                    </div>
                  }
                </div>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p class="text-center text-xs text-gray-500 dark:text-gray-400">
                Facebook Clone v1.0.0 • Built with Angular 21
              </p>
            </div>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    :host {
      display: contents;
    }
  `]
})
export class SettingsPanelComponent {
  settingsService = inject(SettingsService);
  statsService = inject(StatsService);
  private audioService = inject(AudioService);
  keyboardService = inject(KeyboardService);

  themeModes: { value: ThemeMode; label: string }[] = [
    { value: 'dark', label: 'Dark' },
    { value: 'light', label: 'Light' },
    { value: 'system', label: 'System' },
  ];

  close(): void {
    this.audioService.playClick();
    this.settingsService.toggleHelp();
  }

  setTheme(mode: ThemeMode): void {
    this.audioService.playClick();
    this.settingsService.setTheme(mode);
  }

  toggleSound(): void {
    this.settingsService.toggleSound();
    this.audioService.playSuccess();
  }

  resetStats(): void {
    this.audioService.playClick();
    if (confirm('Are you sure you want to reset all statistics?')) {
      this.statsService.resetStats();
      this.audioService.playSuccess();
    }
  }
}
