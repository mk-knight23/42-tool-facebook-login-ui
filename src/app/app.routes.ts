import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/auth/components/landing-page.component').then(
        (m) => m.LandingPageComponent
      ),
    canActivate: [guestGuard]
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./features/profile/components/profile-page.component').then(
        (m) => m.ProfilePageComponent
      ),
    canActivate: [authGuard]
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./features/settings/components/settings-page.component').then(
        (m) => m.SettingsPageComponent
      ),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
