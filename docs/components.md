# Components Inventory

Living inventory. Update when components are added/removed/renamed.

## shadcn primitives (`components/ui/`)

Installed via `bunx shadcn add <name>`. Do not hand-edit unless you know what you're doing — they're regeneratable.

- `button` — default/outline/secondary/ghost/destructive/link + size variants
- `input`
- `sheet`
- `dropdown-menu`
- `navigation-menu`
- `separator`
- `skeleton`

## App routes with inlined layout/content

| Path                                  | Kind   | Purpose                                                     |
|---------------------------------------|--------|-------------------------------------------------------------|
| `app/(legal)/layout.tsx`              | server | Site chrome + `max-w-3xl` article container for legal pages |
| `app/(legal)/privacy/page.tsx`        | server | Privacy Policy                                              |
| `app/(legal)/terms/page.tsx`          | server | Terms of Service                                            |
| `app/(legal)/data-deletion/page.tsx`  | server | OAuth user data-deletion instructions                       |
| `app/api/auth/[...nextauth]/route.ts` | route  | Auth.js v5 GET/POST handlers (re-export from `auth.ts`)     |
| `app/(auth)/layout.tsx`               | server | Minimal centered layout with logo; no site chrome           |
| `app/(auth)/login/page.tsx`           | server | Sign-in card with `FacebookSignIn`                          |
| `app/(auth)/register/page.tsx`        | server | Sign-up card with `FacebookSignIn`                          |

## Custom components (`components/`)

| File                        | Kind         | Purpose                                                      |
|-----------------------------|--------------|--------------------------------------------------------------|
| `site-header.tsx`           | server       | Top header: logo, search slot, actions slot, theme toggle    |
| `site-nav.tsx`              | server       | Desktop mega-menu                                            |
| `site-nav-mobile.tsx`       | client       | Mobile drawer using `sheet`                                  |
| `site-footer.tsx`           | server       | Footer link columns, legal, socials                          |
| `search-typeahead.tsx`      | client       | Input + suggestions dropdown. Submits to `/search?q=...`     |
| `cart-button.tsx`           | client       | Cart icon with live count (mocked → Redis later)             |
| `wishlist-button.tsx`       | client       | Wishlist icon with live count (mocked → Redis later)         |
| `theme-provider.tsx`        | client       | `next-themes` wrapper                                        |
| `theme-toggle.tsx`          | client       | Light/dark icon button                                       |
| `hero.tsx`                  | server       | Homepage placeholder hero                                    |
| `category-tiles.tsx`        | server       | Homepage-visible category shortcuts                          |
| `product-card.tsx`          | server       | Single product card (image/title/price/rating)               |
| `product-rail.tsx`          | server       | Titled horizontal rail of product cards                      |
| `deal-of-the-day.tsx`       | server       | Single featured deal — composes DealCountdown                |
| `deal-countdown.tsx`        | client       | Ticking HH:MM:SS countdown; takes `durationHours`            |
| `account-menu.tsx`          | server       | Account dropdown with sign-in/register/wishlist/orders       |
| `trust-bar.tsx`             | server       | Free ship / returns / support strip                          |
| `newsletter.tsx`            | server       | Email capture (server action placeholder)                    |
| `facebook-sign-in.tsx`      | server       | Wraps `signIn("facebook")` from Auth.js in a server-action form |

## Rules

- Keep primitives in `ui/` pure — no business logic.
- Business components live flat in `components/`. Only split into a subfolder when one component has ≥3 tightly coupled files.
- Every client component starts with `"use client"`. Default to server.
- Props: no `any`. Types colocated with the component unless shared across 2+ consumers, in which case promote to `lib/types/`.
