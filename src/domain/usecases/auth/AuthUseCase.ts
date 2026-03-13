import type { AuthPort, User, LoginCredentials, RegisterData, AuthTokens } from '@ports/AuthPort';

export class AuthUseCase {
  constructor(private authPort: AuthPort) {}

  async login(credentials: LoginCredentials): Promise<{ user: User; tokens: AuthTokens }> {
    return this.authPort.login(credentials);
  }

  async register(data: RegisterData): Promise<{ user: User; tokens: AuthTokens }> {
    return this.authPort.register(data);
  }

  async logout(): Promise<void> {
    return this.authPort.logout();
  }

  async refreshToken(refreshToken: string): Promise<AuthTokens> {
    return this.authPort.refreshToken(refreshToken);
  }

  async getCurrentUser(): Promise<User> {
    return this.authPort.getCurrentUser();
  }

  getOAuthUrl(provider: 'google' | 'github'): string {
    return this.authPort.getOAuthUrl(provider);
  }

  async handleOAuthCallback(provider: 'google' | 'github', code: string): Promise<{ user: User; tokens: AuthTokens }> {
    return this.authPort.handleOAuthCallback(provider, code);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }
}
