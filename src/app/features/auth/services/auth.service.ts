import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Observer, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

import { AuthResponse, User, AuthErrorDetails } from '../../../types/auth.types';
import { environment } from '../../../config/environment';
import { SessionService } from '../../../features/session/services/session.service';

declare global {
  interface Window {
    FB?: any;
    fbAsyncInit?: () => void;
  }
}

/**
 * Authentication service
 * Handles Facebook OAuth and demo mode authentication
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private sessionService = inject(SessionService);
  private router = inject(Router);

  private isFBInitialized = false;

  constructor() {
    this.initializeFacebookSDK();
  }

  /**
   * Initialize Facebook SDK
   */
  private initializeFacebookSDK(): void {
    if (this.isFBInitialized) {
      return;
    }

    // Load Facebook SDK script
    (window as any).fbAsyncInit = () => {
      window.FB.init({
        appId: environment.oauth.appId,
        version: environment.oauth.version,
        cookie: true,
        xfbml: true,
        autoLogAppEvents: true
      });
      this.isFBInitialized = true;
    };

    // Add Facebook SDK script to page
    const script = document.createElement('script');
    script.src = 'https://connect.facebook.net/en_US/sdk.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }

  /**
   * Login with Facebook OAuth
   */
  loginWithFacebook(): Observable<AuthResponse> {
    return new Observable<AuthResponse>((observer) => {
      if (this.sessionService.isDemoMode()) {
        observer.next({
          success: false,
          error: 'Cannot use OAuth in demo mode. Disable demo mode first.'
        });
        observer.complete();
        return;
      }

      if (!window.FB || !this.isFBInitialized) {
        const error: AuthResponse = {
          success: false,
          error: 'Facebook SDK not initialized. Please refresh the page.'
        };
        observer.next(error);
        observer.complete();
        return;
      }

      window.FB.login(
        (response: { authResponse: any; status: string }) => {
          if (response.authResponse) {
            // Get user data
            this.fetchFacebookUserData(response.authResponse.accessToken).subscribe({
              next: (user) => {
                this.sessionService.setSession(user, response.authResponse.accessToken);
                observer.next({
                  success: true,
                  user,
                  token: response.authResponse.accessToken
                });
                observer.complete();
              },
              error: (err) => {
                observer.next({
                  success: false,
                  error: err.message || 'Failed to fetch user data'
                });
                observer.complete();
              }
            });
          } else {
            observer.next({
              success: false,
              error: 'OAuth cancelled by user'
            });
            observer.complete();
          }
        },
        { scope: environment.oauth.scopes.join(',') }
      );
    });
  }

  /**
   * Fetch user data from Facebook Graph API
   */
  private fetchFacebookUserData(accessToken: string): Observable<User> {
    return new Observable<User>((observer) => {
      window.FB.api(
        '/me',
        'GET',
        {
          fields: 'id,email,first_name,last_name,name,picture.width(150)',
          access_token: accessToken
        },
        (response: any) => {
          if (response.error) {
            observer.error(new Error(response.error.message));
            return;
          }

          const user: User = {
            id: response.id,
            email: response.email || '',
            name: response.name,
            firstName: response.first_name,
            lastName: response.last_name,
            picture: response.picture?.data?.url,
            permissions: this.parsePermissions(response)
          };

          observer.next(user);
          observer.complete();
        }
      );
    });
  }

  /**
   * Parse permissions from Facebook response
   */
  private parsePermissions(response: any): any[] {
    return environment.oauth.scopes.map((scope) => ({
      id: scope,
      name: this.formatPermissionName(scope),
      granted: true,
      description: this.getPermissionDescription(scope)
    }));
  }

  /**
   * Format permission name for display
   */
  private formatPermissionName(scope: string): string {
    return scope
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  /**
   * Get permission description
   */
  private getPermissionDescription(scope: string): string {
    const descriptions: Record<string, string> = {
      email: 'Access your email address',
      public_profile: 'Access your public profile information',
      user_likes: 'Access your likes and interests'
    };
    return descriptions[scope] || 'Access additional information';
  }

  /**
   * Login with demo mode
   */
  loginWithDemo(): Observable<AuthResponse> {
    return new Observable<AuthResponse>((observer) => {
      // Simulate API delay
      setTimeout(() => {
        const demoUser = this.sessionService.getDemoUser();
        const demoToken = `demo_token_${Date.now()}`;

        this.sessionService.setSession(demoUser, demoToken);
        this.sessionService.setDemoMode(true);

        observer.next({
          success: true,
          user: demoUser,
          token: demoToken
        });
        observer.complete();
      }, 1000);
    }).pipe(delay(800)); // Add extra delay for realistic feel
  }

  /**
   * Logout user
   */
  logout(): Observable<void> {
    return new Observable<void>((observer) => {
      if (!this.sessionService.isDemoMode() && window.FB) {
        window.FB.logout(() => {
          // Always clear session regardless of FB logout success
          this.sessionService.clearSession();
          this.router.navigate(['/']);
          observer.next();
          observer.complete();
        });
      } else {
        this.sessionService.clearSession();
        this.router.navigate(['/']);
        observer.next();
        observer.complete();
      }
    });
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return this.sessionService.isAuthenticated();
  }

  /**
   * Get current user
   */
  getCurrentUser(): User | null {
    return this.sessionService.currentUser();
  }

  /**
   * Handle authentication errors
   */
  handleError(error: any): AuthErrorDetails {
    const errorMap: Record<string, AuthErrorDetails> = {
      'OAuth cancelled by user': {
        code: 'OAUTH_CANCELLED',
        message: 'Login was cancelled',
        suggestion: 'Try logging in again'
      },
      'Facebook SDK not initialized': {
        code: 'OAUTH_FAILED',
        message: 'Facebook SDK failed to load',
        suggestion: 'Refresh the page and try again'
      },
      'Session expired': {
        code: 'SESSION_EXPIRED',
        message: 'Your session has expired',
        suggestion: 'Please log in again'
      }
    };

    return (
      errorMap[error.message] || {
        code: 'UNKNOWN_ERROR',
        message: error.message || 'An error occurred',
        suggestion: 'Please try again'
      }
    );
  }
}
