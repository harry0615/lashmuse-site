# LashMuse website

Official marketing, support, and privacy site for the LashMuse iOS app.

## Production

- Canonical URL: `https://lashmuseapp.com`
- English: `/`
- Korean: `/ko/`
- App Store ID: `6760812078`

## Cloudflare Pages settings

Use the GitHub repository `harry0615/lashmuse-site` with:

- Production branch: `main`
- Framework preset: `None`
- Build command: `exit 0`
- Build output directory: `/`

The repository contains plain static HTML, so Cloudflare Pages can publish the
repository root without installing dependencies.

## Search and iPhone integration

- `robots.txt` and `sitemap.xml`
- canonical and `hreflang` metadata
- Open Graph and Twitter metadata
- `SoftwareApplication` and `FAQPage` JSON-LD
- iPhone Smart App Banner for App Store ID `6760812078`
- English and Korean landing URLs
- Cloudflare security and cache headers

App Store campaign attribution requires both a provider token and campaign token
created in App Store Connect. The site currently uses the territory-neutral App
Store URL and can be updated with those tokens after they are generated.
