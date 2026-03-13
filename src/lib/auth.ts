import { HttpClient } from '@adapters/http/HttpClient';
import { AuthAdapter } from '@adapters/auth/AuthAdapter';
import { AuthUseCase } from '@domain/usecases/auth/AuthUseCase';
import type { LoginCredentials, RegisterData, User, AuthTokens } from '@ports/AuthPort';

const API_BASE_URL = import.meta.env.PUBLIC_API_URL || 'pending__to_define';

const httpClient = new HttpClient(API_BASE_URL, {
  'Content-Type': 'application/json',
});

const oauthConfig = {
  google: {
    clientId: import.meta.env.PUBLIC_GOOGLE_CLIENT_ID || '',
    redirectUri: `${window.location.origin}/auth/callback/google`,
  },
  github: {
    clientId: import.meta.env.PUBLIC_GITHUB_CLIENT_ID || '',
    redirectUri: `${window.location.origin}/auth/callback/github`,
  },
};

const authAdapter = new AuthAdapter(httpClient, API_BASE_URL, oauthConfig);
const authUseCase = new AuthUseCase(authAdapter);

export const authService = {
  async login(credentials: LoginCredentials): Promise<{ user: User; tokens: AuthTokens }> {
    return authUseCase.login(credentials);
  },

  async register(data: RegisterData): Promise<{ user: User; tokens: AuthTokens }> {
    return authUseCase.register(data);
  },

  async logout(): Promise<void> {
    return authUseCase.logout();
  },

  async getCurrentUser(): Promise<User> {
    return authUseCase.getCurrentUser();
  },

  getOAuthUrl(provider: 'google' | 'github'): string {
    return authUseCase.getOAuthUrl(provider);
  },

  isAuthenticated(): boolean {
    return authUseCase.isAuthenticated();
  },

  getAccessToken(): string | null {
    return authUseCase.getAccessToken();
  },
};

export { authUseCase };
