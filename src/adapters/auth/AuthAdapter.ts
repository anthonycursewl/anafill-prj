import type { AuthPort, AuthTokens, LoginCredentials, RegisterData, OAuthProvider, User } from '@ports/AuthPort';
import type { HttpPort } from '@ports/HttpPort';

export class AuthAdapter implements AuthPort {
  private httpClient: HttpPort;
  private baseURL: string;
  private oauthConfig: Record<string, { clientId: string; redirectUri: string }>;

  constructor(httpClient: HttpPort, baseURL: string, oauthConfig: Record<string, { clientId: string; redirectUri: string }>) {
    this.httpClient = httpClient;
    this.baseURL = baseURL;
    this.oauthConfig = oauthConfig;
  }

  private get endpoints() {
    return {
      login: `${this.baseURL}/auth/login`,
      register: `${this.baseURL}/auth/register`,
      logout: `${this.baseURL}/auth/logout`,
      refresh: `${this.baseURL}/auth/refresh`,
      me: `${this.baseURL}/auth/me`,
      oauth: (provider: string) => `${this.baseURL}/auth/oauth/${provider}`,
    };
  }

  async login(credentials: LoginCredentials): Promise<{ user: User; tokens: AuthTokens }> {
    const response = await this.httpClient.post<{ user: User; tokens: AuthTokens }>(this.endpoints.login, credentials);
    this.setTokens(response.data.tokens);
    return response.data;
  }

  async register(data: RegisterData): Promise<{ user: User; tokens: AuthTokens }> {
    const response = await this.httpClient.post<{ user: User; tokens: AuthTokens }>(this.endpoints.register, data);
    this.setTokens(response.data.tokens);
    return response.data;
  }

  async logout(): Promise<void> {
    try {
      await this.httpClient.post(this.endpoints.logout);
    } finally {
      this.clearTokens();
    }
  }

  async refreshToken(refreshToken: string): Promise<AuthTokens> {
    const response = await this.httpClient.post<AuthTokens>(this.endpoints.refresh, { refreshToken });
    this.setTokens(response.data);
    return response.data;
  }

  async getCurrentUser(): Promise<User> {
    const response = await this.httpClient.get<User>(this.endpoints.me);
    return response.data;
  }

  getOAuthUrl(provider: keyof OAuthProvider): string {
    const config = this.oauthConfig[provider];
    if (!config) throw new Error(`OAuth provider ${provider} not configured`);

    const params = new URLSearchParams({
      client_id: config.clientId,
      redirect_uri: config.redirectUri,
      response_type: 'code',
      scope: provider === 'google' ? 'openid email profile' : 'read:user user:email',
    });

    const authUrls: Record<string, string> = {
      google: `https://accounts.google.com/o/oauth2/v2/auth?${params}`,
      github: `https://github.com/login/oauth/authorize?${params}`,
    };

    return authUrls[provider];
  }

  async handleOAuthCallback(provider: keyof OAuthProvider, code: string): Promise<{ user: User; tokens: AuthTokens }> {
    const response = await this.httpClient.post<{ user: User; tokens: AuthTokens }>(this.endpoints.oauth(provider), { code });
    this.setTokens(response.data.tokens);
    return response.data;
  }

  private setTokens(tokens: AuthTokens): void {
    localStorage.setItem('accessToken', tokens.accessToken);
    if (tokens.refreshToken) {
      localStorage.setItem('refreshToken', tokens.refreshToken);
    }
  }

  private clearTokens(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}
