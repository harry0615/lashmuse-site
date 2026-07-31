const canonicalHost = "lashmuseapp.com";

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const isPagesHost = url.hostname.endsWith(".pages.dev");
  const isWwwHost = url.hostname === `www.${canonicalHost}`;

  if (isPagesHost || isWwwHost) {
    url.protocol = "https:";
    url.hostname = canonicalHost;
    url.port = "";
    return Response.redirect(url.toString(), 301);
  }

  const response = await context.next();
  const headers = new Headers(response.headers);
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Frame-Options", "DENY");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  headers.set(
    "Content-Security-Policy",
    "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; connect-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'",
  );

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
