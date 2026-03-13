import type { APIRoute } from 'astro';
export const prerender = false;

import { HttpClient } from '@adapters/http/HttpClient';
import { AuthAdapter } from '@adapters/auth/AuthAdapter';
import { AuthUseCase } from '@domain/usecases/auth/AuthUseCase';

const API_BASE_URL = import.meta.env.API_URL || 'https://api.example.com';

const httpClient = new HttpClient(API_BASE_URL);

const oauthConfig = {
  google: {
    clientId: import.meta.env.GOOGLE_CLIENT_ID || '',
    redirectUri: `${import.meta.env.PUBLIC_SITE_URL || 'http://localhost:4321'}/auth/callback/google`,
  },
  github: {
    clientId: import.meta.env.GITHUB_CLIENT_ID || '',
    redirectUri: `${import.meta.env.PUBLIC_SITE_URL || 'http://localhost:4321'}/auth/callback/github`,
  },
};

const authAdapter = new AuthAdapter(httpClient, API_BASE_URL, oauthConfig);
const authUseCase = new AuthUseCase(authAdapter);

export const POST: APIRoute = async ({ params, request }) => {
  const provider = params.provider as 'google' | 'github';
  
  if (!provider || !['google', 'github'].includes(provider)) {
    return new Response(JSON.stringify({ error: 'Invalid provider' }), { status: 400 });
  }

  try {
    const body = await request.json();
    const { code } = body;

    if (!code) {
      return new Response(JSON.stringify({ error: 'Code not provided' }), { status: 400 });
    }

    const result = await authUseCase.handleOAuthCallback(provider, code);

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Authentication failed';
    return new Response(JSON.stringify({ error: message }), { status: 500 });
  }
};
