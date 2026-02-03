import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { User, Permission } from '../../../types/auth.types';
import { SessionService } from './session.service';

/**
 * User service
 * Manages user data and preferences
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private sessionService = inject(SessionService);

  /**
   * Get current user
   */
  getCurrentUser(): User | null {
    return this.sessionService.currentUser();
  }

  /**
   * Get user profile
   */
  getUserProfile(): Observable<User | null> {
    return of(this.sessionService.currentUser()).pipe(delay(300));
  }

  /**
   * Update user profile
   */
  updateProfile(updates: Partial<User>): Observable<User> {
    return new Observable<User>((observer) => {
      setTimeout(() => {
        const currentUser = this.sessionService.currentUser();
        if (currentUser) {
          const updatedUser: User = {
            ...currentUser,
            ...updates
          };

          // Update session with new user data
          const token = this.sessionService.token();
          if (token) {
            this.sessionService.setSession(updatedUser, token);
          }

          observer.next(updatedUser);
          observer.complete();
        } else {
          observer.error(new Error('No user logged in'));
        }
      }, 500);
    });
  }

  /**
   * Get user permissions
   */
  getUserPermissions(): Observable<Permission[]> {
    const user = this.sessionService.currentUser();
    return of(user?.permissions || []).pipe(delay(200));
  }

  /**
   * Revoke permission
   */
  revokePermission(permissionId: string): Observable<Permission[]> {
    return new Observable<Permission[]>((observer) => {
      setTimeout(() => {
        const user = this.sessionService.currentUser();
        if (user) {
          const updatedPermissions = user.permissions.map((perm) =>
            perm.id === permissionId ? { ...perm, granted: false } : perm
          );

          const updatedUser: User = {
            ...user,
            permissions: updatedPermissions
          };

          const token = this.sessionService.token();
          if (token) {
            this.sessionService.setSession(updatedUser, token);
          }

          observer.next(updatedPermissions);
          observer.complete();
        } else {
          observer.error(new Error('No user logged in'));
        }
      }, 400);
    });
  }

  /**
   * Grant permission
   */
  grantPermission(permissionId: string): Observable<Permission[]> {
    return new Observable<Permission[]>((observer) => {
      setTimeout(() => {
        const user = this.sessionService.currentUser();
        if (user) {
          const updatedPermissions = user.permissions.map((perm) =>
            perm.id === permissionId ? { ...perm, granted: true } : perm
          );

          const updatedUser: User = {
            ...user,
            permissions: updatedPermissions
          };

          const token = this.sessionService.token();
          if (token) {
            this.sessionService.setSession(updatedUser, token);
          }

          observer.next(updatedPermissions);
          observer.complete();
        } else {
          observer.error(new Error('No user logged in'));
        }
      }, 400);
    });
  }

  /**
   * Update user preferences
   */
  updatePreferences(preferences: Record<string, any>): Observable<void> {
    return new Observable<void>((observer) => {
      setTimeout(() => {
        try {
          // In a real app, this would be saved to a backend
          observer.next();
          observer.complete();
        } catch (error) {
          observer.error(error);
        }
      }, 300);
    });
  }

  /**
   * Delete user account
   */
  deleteAccount(): Observable<void> {
    return new Observable<void>((observer) => {
      setTimeout(() => {
        // In a real app, this would call a backend API
        this.sessionService.clearSession();
        observer.next();
        observer.complete();
      }, 500);
    });
  }
}
