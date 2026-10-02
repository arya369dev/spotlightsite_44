# Spotlight — Website

A static, dependency-free website for **Spotlight**, a futuristic media marketing agency. Plain HTML/CSS/JS — no build step, no framework required.

## Files

| File | What it is |
|---|---|
| `index.html` | The whole site — nav, hero, services, approach, work, blog/news/events, contact, footer |
| `style.css` | All styling — palette, layout, animation |
| `main.js` | Mobile nav toggle, cursor-follow hero glow, scroll-reveal, contact form stub |
| `robots.txt` | Search-engine crawl rules |
| `sitemap.xml` | Sitemap for search engines |
| `llms.txt` | Plain-language site summary for AI assistants / LLM crawlers (AEO/GEO/LLMO readiness) |
| `assets/logo-full.png` | Full logo lockup — icon + wordmark + tagline (used in the hero) |
| `assets/logo-mark.png` | Icon mark only, no text (used in nav + footer badge, and as the favicon source) |
| `assets/logo-wordmark.png` | Wordmark + tagline only, no icon (available for letterheads, email signatures, etc.) |
| `assets/favicon-32.png` | Browser tab favicon |
| `assets/favicon-180.png` | Apple touch icon (iOS home screen) |
| `assets/favicon-512.png` | Large icon (PWA / social) |

## Run locally

No build tools needed. Either:

- Open `index.html` directly in a browser, or
- Serve it (recommended, avoids any local file-path quirks):
  ```bash
  npx serve .
  # or
  python3 -m http.server 8000
  ```

## Deploy to Vercel

This is a static site, so Vercel needs zero configuration:

1. Push this folder to a GitHub repo.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Framework preset: **Other** (or leave auto-detect — Vercel serves static files automatically).
4. Deploy.

Or from the CLI, run `vercel` inside this folder.

## Before you go live

- Replace `https://spotlight.agency` in `index.html`, `robots.txt`, `sitemap.xml`, and `llms.txt` with your real domain.
- Fill in the bracketed placeholders (`[Engagement result — add figure]`, `[Add phone number]`, `[Add city]`) with real figures — left as placeholders intentionally rather than invented numbers.
- Wire `main.js`'s `handleContactSubmit` function to a real email API or CRM endpoint (the `TODO` comment marks the spot).
- Add a Meta Pixel / Conversions API snippet before `</head>` when you're ready for paid traffic.
- Swap in real case studies in the "Selected approach" section.

## Design notes

- **Palette**: light, elegant, and vibrant pastels (blush, lavender, mint, sand) on a warm cream base — no dark theme, per brand guidelines. Deeper "vivid" tints of each color are used for icons and accents so the palette reads energetic, not washed out.
- **Type**: Playfair Display (serif, headlines) + Manrope (sans, body) — loaded from Google Fonts.
- **Motion**: scroll-reveal on every section (IntersectionObserver-driven, so it degrades gracefully), a cursor-following spotlight glow in the hero, a drifting canvas constellation/particle network behind the hero copy, an animated circuit-line draw-in motif in the Approach section, floating gradient blobs, hover micro-interactions on every card and button. The canvas network respects `prefers-reduced-motion` (skips entirely) and pauses via IntersectionObserver when scrolled off-screen or the tab is hidden.
- Structured for **SEO/AEO/GEO/LLMO**: semantic HTML, a linked JSON-LD `@graph` (`MarketingAgency` + `WebSite` + `FAQPage`), a matching visible FAQ accordion (`#faq`), OpenGraph/Twitter cards, `robots`/`theme-color` meta, `sitemap.xml`, `robots.txt`, and `llms.txt` for AI-assistant discoverability.
