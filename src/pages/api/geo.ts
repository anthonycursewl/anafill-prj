import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const countryCode = request.headers.get('cf-ipcountry');
  if (countryCode && countryCode !== 'XX') {
    return new Response(JSON.stringify({ country_code: countryCode }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const clientIp =
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();

  if (clientIp) {
    try {
      const res = await fetch(`https://api.ipquery.io/${clientIp}`, {
        signal: AbortSignal.timeout(3000),
      });
      if (res.ok) {
        const data = await res.json();
        return new Response(
          JSON.stringify({
            country_code: data.location.country_code,
            country_name: data.location.country,
            ip: clientIp,
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } },
        );
      }
    } catch {}
  }

  return new Response(JSON.stringify({ country_code: 'unknown', country_name: 'Unknown' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};