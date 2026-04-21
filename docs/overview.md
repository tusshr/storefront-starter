# Bhalow — Overview

Scalable ecommerce frontend, USA-only, Amazon/eBay-style IA. Deployed on Vercel. Backend/DB design is in progress; this frontend is built against typed mocks that swap to real fetchers later.

## Stack

- **Next.js 16.2.3** (App Router, RSC, Cache Components). See `AGENTS.md` — always consult `node_modules/next/dist/docs/` before writing Next-specific code.
- **React 19.2.4**.
- **Tailwind v4** via `@import "tailwindcss"` in `styles/globals.css`. No `tailwind.config.ts`.
- **shadcn v4** — `base-mira` style, `taupe` baseColor, `cssVariables: true`, icons via `hugeicons`, primitives via `@base-ui/react` (not Radix).
- **Bun** package manager.
- **next-themes** for dark mode.

## Architecture

- **Rendering**: Cache Components (`cacheComponents: true`). Homepage sections are cached server components with `use cache` + `cacheTag("home:<section>")`; personal chips (cart/wishlist count) are dynamic, streamed under `<Suspense>`.
- **Data**: `lib/mock/*` provides typed fixtures today; the same function signatures will be re-implemented against the DB later (drop-in swap, no component changes).
- **SEO**: per-route `generateMetadata`, semantic HTML, JSON-LD (`Organization`, `WebSite` + `SearchAction`, `ItemList` for rails, `Product` on PDP later), `robots.ts`, `sitemap.ts`.
- **Theming**: theme tokens only — never hex/rgb/palette utilities like `bg-zinc-*`. Dark mode via `next-themes` + the `.dark` class already defined in globals.css.

## Folder layout

```text
app/
  layout.tsx                  root layout — metadata, fonts, theme provider
  page.tsx                    homepage
  robots.ts                   /robots.txt
  sitemap.ts                  /sitemap.xml
  api/auth/[...nextauth]/
    route.ts                  Auth.js v5 GET/POST handlers
  (auth)/                     login/register (built)
    layout.tsx                minimal centered layout with logo only
    login/page.tsx
    register/page.tsx
  (legal)/                    privacy, terms, data-deletion (built)
    layout.tsx                site chrome + max-w-3xl article container
    privacy/page.tsx
    terms/page.tsx
    data-deletion/page.tsx
  (protected)/                authenticated user area (future)
components/
  ui/                         shadcn primitives
  site-header.tsx             header (logo + search + account/wishlist/cart + theme)
  site-nav.tsx                desktop mega-menu
  site-nav-mobile.tsx         mobile drawer (client)
  site-footer.tsx             footer
  search-typeahead.tsx        client — input + suggestion dropdown
  cart-button.tsx             client — reads cart count (Redis later)
  wishlist-button.tsx         client — reads wishlist count (Redis later)
  theme-provider.tsx          next-themes wrapper
  theme-toggle.tsx            client — light/dark button
  hero.tsx                    homepage placeholder hero
  category-tiles.tsx          featured categories strip
  product-card.tsx            single product card
  product-rail.tsx            labeled rail of product cards (N Arrivals / Trending / Top Rated)
  deal-of-the-day.tsx         single deal card with countdown
  trust-bar.tsx               free ship / returns / support strip
  newsletter.tsx              email capture block
lib/
  types/
    category.ts
    product.ts
  mock/
    categories.ts
    products.ts
  format.ts                   currency + compact number
  utils.ts                    cn()
styles/globals.css
assets/logo/site-logo.png
docs/                         this directory
```

## Conventions

- Filenames: kebab-case (ESLint-enforced).
- Imports: prettier plugin sorts them; server-only modules import `"server-only"` at top.
- Strings: double quotes, semicolons, 2-space indent.
- Every client component starts with `"use client"` and is named to make the boundary obvious (`*-typeahead.tsx`, `theme-toggle.tsx`, etc.).
- Keep props minimal and typed; no `any`. Prefer composition over variants until a second real caller exists.

## Decision log

- **2026-04-21** — Cache Components enabled. Per-section cache tags so `updateTag("home:rails")` can selectively refresh.
- **2026-04-21** — No sidebar on homepage; reserved for category/search pages.
- **2026-04-21** — Hero is a placeholder; final design TBD by user.
- **2026-04-21** — Typeahead with static suggestions; wires to OpenSearch later. Search form submits to `/search?q=...`.
- **2026-04-21** — Categories hardcoded on homepage; DB swap later. Using the user-supplied `Category` shape (see `data-model.md`).
- **2026-04-21** — Cart/wishlist counts hardcoded; Redis-backed later.
- **2026-04-21** — Dark mode enabled via `next-themes`, toggle in header.
- **2026-04-21** — `(auth)` group for login/register; `(protected)` group exists with unknown purpose, leave alone.
- **2026-04-21** — Auth.js v5 (`next-auth@5.0.0-beta.31`) added by user with Facebook provider only. Added `app/api/auth/[...nextauth]/route.ts` so the handlers actually resolve. Requires env vars: `AUTH_SECRET`, `AUTH_FACEBOOK_ID`, `AUTH_FACEBOOK_SECRET`. For production, also `AUTH_URL` (or `AUTH_TRUST_HOST=true` on Vercel).
- **2026-04-21** — Tightened `--radius` from `0.625rem` to `0.25rem` and removed large per-component rounded overrides. `rounded-full` now reserved for actual circles only.
- **2026-04-21** — Legal pages live at `/privacy`, `/terms`, `/data-deletion` (canonical URLs for Facebook/Meta OAuth console), grouped under `app/(legal)/`. Content faithful to existing bhalow.com/* pages, cleaned up.
