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

  return context.next();
}
