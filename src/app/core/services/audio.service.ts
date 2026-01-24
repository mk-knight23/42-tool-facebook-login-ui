import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SettingsService } from './settings.service';

@Injectable({ providedIn: 'root' })
export class AudioService {
  private platformId = inject(PLATFORM_ID);
  private settings = inject(SettingsService);
  private audioContext: AudioContext | null = null;

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.initAudioContext();
    }
  }

  private initAudioContext(): void {
    try {
      this.audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    } catch {
      console.warn('Audio context not supported');
    }
  }

  private playTone(frequency: number, duration: number, type: OscillatorType = 'sine', volume: number = 0.3): void {
    if (!this.settings.soundEnabled() || !this.audioContext) return;

    try {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);

      gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + duration);
    } catch {
      console.warn('Audio playback failed');
    }
  }

  playClick(): void {
    this.playTone(800, 0.05, 'sine', 0.2);
  }

  playHover(): void {
    this.playTone(600, 0.03, 'sine', 0.1);
  }

  playSuccess(): void {
    this.playTone(523.25, 0.1, 'sine', 0.3);
    setTimeout(() => this.playTone(659.25, 0.1, 'sine', 0.3), 100);
    setTimeout(() => this.playTone(783.99, 0.15, 'sine', 0.3), 200);
  }

  playError(): void {
    this.playTone(200, 0.2, 'sawtooth', 0.2);
  }
}
