# Handoff

**Last updated**: 2026-04-22 (feature-folder refactor; products is the template slice)
**Current focus**: moving remaining slices (categories, cart, search, auth) into `features/`

## Done

- Project scan + decisions aligned with user.
- `docs/` scaffolding: overview, routing, styling, data-model, components, handoff.
- `next.config.ts` — `cacheComponents: true`, `images.remotePatterns` for picsum/unsplash.
- Installed shadcn primitives: input, sheet, dropdown-menu, navigation-menu, separator, skeleton (button preserved — not overwritten). `next-themes` added.
- Types: `lib/types/category.ts`, `lib/types/money.ts`, `features/products/types.ts`.
- Mock data: `lib/mock/categories.ts` (8 root + 25 nested, 2-level deep). Products moved to `features/products/queries.ts` (cached via `'use cache'` + `cacheTag('products')` + `cacheLife('hours')`) with a `searchProducts` server action at `features/products/actions.ts`.
- Helpers: `lib/format.ts` (money/count via `Intl.NumberFormat`), `lib/icons.ts` (hugeicons key-name map).
- `app/layout.tsx` — metadata (title template, OG, Twitter, canonical, robots, favicon), viewport, Inter font, `ThemeProvider` wrapper.
- Site chrome: `site-header`, `site-nav` (mega-menu), `site-nav-mobile` (sheet drawer), `site-footer`.
- Header bits: `search-typeahead` (debounced, keyboard-nav, submits to `/search?q=`), `cart-button`, `wishlist-button`, `account-menu`, `theme-toggle`.
- Homepage sections: `hero` (placeholder), `category-tiles`, `product-rail` × 3 (New arrivals / Trending / Top rated), `deal-of-the-day` + `deal-countdown`, `trust-bar`, `newsletter` (server-action stub), `site-footer`.
- SEO: JSON-LD on `/` (`Organization`, `WebSite` + `SearchAction`), `app/robots.ts` (now disallows `/api/`), `app/sitemap.ts`.
- Verified: HTTP 200, clean log on fresh load, semantic structure (1 `<header>`, 6 `<nav>`, 1 `<main>`, 8 `<section>`, 18 `<article>`, 1 `<footer>`, 1 `<h1>`, 6 `<h2>`).
- Radius tightened globally via `--radius: 0.25rem`. `rounded-full` reserved for actual circles.
- **Auth.js v5 handlers** wired at `app/api/auth/[...nextauth]/route.ts` (exports GET/POST from `@/auth`). `auth.ts` is user-authored with only the Facebook provider.
- **Legal pages** at `/privacy`, `/terms`, `/data-deletion` under `app/(legal)/`. Faithful ports of bhalow.com content, restyled to match the rest of the app. Footer Legal column retargeted; sitemap includes them.
- **Auth pages** at `/login`, `/register` under `app/(auth)/` with a minimal logo-only layout. Both use `FacebookSignIn` (a server component whose form action calls `signIn("facebook")` from Auth.js). Pages are noindex. Existing `AccountMenu` links (`/login`, `/register`) now resolve.

## Next (pick any)

1. **Backend/DB schema** (user owns) — once the product model is confirmed, tighten `features/products/types.ts` and swap `features/products/queries.ts` body for drizzle calls. Callers don't change.
   1a. **Finish the refactor** — move `categories`, `cart`, `wishlist`, `search`, `auth` into `features/` following the `products` template. See `docs/architecture.md`.
2. **Real cart/wishlist count**: server-fetch cookie → Redis → count. Wrap `CartButton`/`WishlistButton` in `<Suspense>` and remove the `MOCK_*_COUNT` constants.
3. **Search**: wire typeahead to a server action or API route backed by OpenSearch. Client side only keeps input + arrow-key handling.
4. **Category listing page** `/c/[...slug]` — this is where the **sidebar** lives (filters, nested nav). JSON-LD `BreadcrumbList` + paginated `ItemList`.
5. **PDP** `/p/[slug]` — variant picker (uses `Product.options`/`variants`), JSON-LD `Product` + `Offer`.
6. **Auth**: `app/(auth)/login`, `app/(auth)/register` with their own minimal layout. Clarify purpose of existing `(protected)` group.
7. **Hero v2** — user said placeholder is fine for now; revisit once brand direction is clearer.

## Facebook App publication flow (reminder)

Deploying does not trigger Facebook verification. The actual sequence is:

1. Deploy so `/privacy`, `/terms`, `/data-deletion`, and `/api/auth/callback/facebook` resolve publicly.
2. In the Facebook App Dashboard, paste those URLs into the appropriate fields and set a valid OAuth redirect URI.
3. Flip the app from Development mode to Live mode.
4. App Review is only required for scopes beyond `email` + `public_profile`. Our current `auth.ts` doesn't request any, so Live mode alone is sufficient. If scopes are added later (e.g. `user_friends`), each advanced scope needs its own App Review submission (screencast + business verification).

## Auth.js env vars required

Running OAuth needs these env vars (not in the repo — add via `.env.local` locally and Vercel project settings for deploys):

```bash
AUTH_SECRET=<generate with `openssl rand -base64 32` or `npx auth secret`>
AUTH_FACEBOOK_ID=<Facebook app ID>
AUTH_FACEBOOK_SECRET=<Facebook app secret>

# Only for self-hosting behind a proxy; Vercel sets this automatically:
# AUTH_TRUST_HOST=true
```

In the Facebook app dashboard, set:

- **Valid OAuth Redirect URI**: `https://bhalow.com/api/auth/callback/facebook` (and `http://localhost:3000/api/auth/callback/facebook` for dev)
- **Privacy Policy URL**: `https://bhalow.com/privacy`
- **Terms of Service URL**: `https://bhalow.com/terms`
- **User Data Deletion**: `https://bhalow.com/data-deletion`

## Open questions / assumptions to confirm

- **Product model** in `data-model.md` — draft only. Confirm whether variants always own price/stock, or whether we keep a "default variant" pointer on the base product.
- **`(protected)` route group** — assumed "requires auth"; not confirmed.
- **Hero final design** — placeholder only.
- **Whether to promote `site-header/nav/footer` into a shared `(shop)` layout** once PLP/PDP arrive — recommended but trivial to do later.

## Gotchas learned

- **Cache Components is strict**: `new Date()`, `Math.random()`, etc. in a server component throws unless the function uses `"use cache"` or accesses request data first. Fixed in `site-footer.tsx` (made it `async` + `"use cache"`). The `deal-countdown` sidesteps this entirely by computing on the client.
- **Base UI `<Button>` has a `nativeButton` prop that defaults to `true`**. Using `<Button render={<Link />}>` logs a warning about non-`<button>` semantics. Fix: use the `buttonVariants({ ... })` classname on `<Link>` directly (see `hero.tsx`, `deal-of-the-day.tsx`). Keep `<Button render={<Button ... />}>` only when the render target _is_ a button.
- **`DropdownMenuLabel`** must be inside a `<DropdownMenuGroup>` — it looks up a context from the group. Separators can sit anywhere.
- **Tailwind v4**: theme tokens live in `@theme inline` in `globals.css`; there is no `tailwind.config.ts`. Use canonical class names (e.g., `bg-linear-to-br`, not `bg-gradient-to-br`; `min-w-9`, not `min-w-[2.25rem]`).
- **Hugeicons names differ from intuitive guesses**: `Shoes01Icon` doesn't exist — `RunningShoesIcon` does; `Brush02Icon` → `PaintBrush02Icon`; `FacebookIcon` → `Facebook01Icon`. Grep `node_modules/@hugeicons/core-free-icons/dist/types/index.d.ts` for `declare const <Name>:` to verify before importing.
- **shadcn CLI** will prompt to overwrite existing components when their deps pull them in. Answer "N" to preserve custom `button.tsx`. Or pipe `yes N | bunx shadcn add ...`.
- **Logo** lives in `assets/logo/site-logo.png` (user's choice). Static-import it via `@/assets/...` — next/image handles that fine.
- **Filenames must be kebab-case** (ESLint rule `check-file/filename-naming-convention`).

## Dev setup

```bash
bun dev           # http://localhost:3000
bunx tsc --noEmit # static check
bun run lint      # eslint
bun run format    # prettier
```

User has a persistent dev server running at PID 54785 (started before engagement). Don't `kill` it without asking.
