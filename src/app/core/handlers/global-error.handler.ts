import { ErrorHandler, Injectable, NgZone, inject } from '@angular/core';
import { SettingsService } from '../services/settings.service';

/**
 * Global Error Handler for catching and reporting unexpected frontend issues.
 */
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    private ngZone = inject(NgZone);
    private settingsService = inject(SettingsService);

    handleError(error: any): void {
        // Log to console for development
        console.error('FacebookClone | Uncaught Exception:', error);

        // Provide visual feedback if possible via settings service (e.g., showing a status/help alert)
        this.ngZone.run(() => {
            // In a real app, this would send to an error reporting service like Sentry
            // For this clone, we'll log it and ensure the UI doesn't completely crash
            console.warn('System anomaly detected. Attempting to maintain session integrity.');
        });
    }
}
