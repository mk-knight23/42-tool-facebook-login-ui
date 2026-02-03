/**
 * Authentication type definitions
 */

export interface User {
  id: string;
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  picture?: string;
  permissions: Permission[];
}

export interface Permission {
  id: string;
  name: string;
  granted: boolean;
  description: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  error?: string;
}

export interface SessionData {
  user: User;
  token: string;
  expiresAt: number;
}

export interface OAuthConfig {
  appId: string;
  version: string;
  scopes: string[];
}

export type AuthError =
  | 'INVALID_CREDENTIALS'
  | 'OAUTH_CANCELLED'
  | 'OAUTH_FAILED'
  | 'OAUTH_REQUIRED'
  | 'DEMO_MODE_ENABLED'
  | 'DEMO_LOGIN_FAILED'
  | 'SESSION_EXPIRED'
  | 'NETWORK_ERROR'
  | 'UNKNOWN_ERROR';

export interface AuthErrorDetails {
  code: AuthError;
  message: string;
  suggestion: string;
}
