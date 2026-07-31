const upstreamOrigin = "https://lashmuse-ios.harry0615-lee.chatgpt.site";

const allowedScreens = new Set([
  "adjust-placement.png",
  "fine-tune.png",
  "instagram-story.png",
  "lash-style-classic.png",
  "lash-style-volume.png",
  "lashmuse-home.png",
  "lens-style.png",
  "share-preview.png",
]);

export async function onRequestGet(context) {
  const pathValue = context.params.path;
  const path = Array.isArray(pathValue) ? pathValue.join("/") : pathValue;

  if (!allowedScreens.has(path)) {
    return new Response("Not found", { status: 404 });
  }

  const upstreamUrl = new URL(`/screens/${path}`, upstreamOrigin);
  const upstreamResponse = await fetch(upstreamUrl, {
    cf: {
      cacheEverything: true,
      cacheTtl: 31536000,
    },
  });

  if (!upstreamResponse.ok) {
    return new Response("Image unavailable", { status: 502 });
  }

  const headers = new Headers(upstreamResponse.headers);
  headers.set("Cache-Control", "public, max-age=31536000, immutable");
  headers.set("Content-Type", "image/png");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.delete("Set-Cookie");

  return new Response(upstreamResponse.body, {
    status: 200,
    headers,
  });
}
