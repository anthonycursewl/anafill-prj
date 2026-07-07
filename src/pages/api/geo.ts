import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    const res = await fetch('https://ipapi.co/json/');
    if (!res.ok) throw new Error('ipapi.co request failed');
    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'geolocation unavailable' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};