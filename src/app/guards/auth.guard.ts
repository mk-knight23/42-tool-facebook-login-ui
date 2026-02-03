import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { SessionService } from '../features/session/services/session.service';

/**
 * Authentication guard
 * Protects routes that require user authentication
 */
export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const sessionService = inject(SessionService);
  const router = inject(Router);

  if (sessionService.isAuthenticated()) {
    // Validate session is not expired
    if (sessionService.validateSession()) {
      return true;
    }
  }

  // Not authenticated, redirect to login
  router.navigate(['/'], {
    queryParams: { returnUrl: state.url }
  });
  return false;
};

/**
 * Guest guard
 * Prevents authenticated users from accessing login/register pages
 */
export const guestGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const sessionService = inject(SessionService);
  const router = inject(Router);

  if (sessionService.isAuthenticated()) {
    // Already authenticated, redirect to profile
    router.navigate(['/profile']);
    return false;
  }

  return true;
};
