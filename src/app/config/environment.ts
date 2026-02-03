import { OAuthConfig } from '../types/auth.types';

/**
 * Application configuration
 */
export const environment = {
  production: false,
  demoMode: true, // Default to demo mode for development
  oauth: {
    appId: 'YOUR_FACEBOOK_APP_ID', // Replace with actual Facebook App ID
    version: 'v19.0',
    scopes: ['email', 'public_profile', 'user_likes']
  } as OAuthConfig
};

/**
 * Demo user for development/testing
 */
export const DEMO_USER = {
  id: 'demo-user-123',
  email: 'demo@example.com',
  name: 'Demo User',
  firstName: 'Demo',
  lastName: 'User',
  picture: 'https://i.pravatar.cc/150?img=68',
  permissions: [
    {
      id: 'email',
      name: 'Email',
      granted: true,
      description: 'Access your email address'
    },
    {
      id: 'public_profile',
      name: 'Public Profile',
      granted: true,
      description: 'Access your public profile information'
    },
    {
      id: 'user_likes',
      name: 'Likes',
      granted: true,
      description: 'Access your likes'
    }
  ]
};

/**
 * Session storage keys
 */
export const STORAGE_KEYS = {
  SESSION: 'fb_session',
  DEMO_MODE: 'fb_demo_mode',
  USER_PREFERENCES: 'fb_preferences'
} as const;
