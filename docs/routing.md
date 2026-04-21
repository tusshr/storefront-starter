# Routing

## Route map (planned)

| Path                       | Status        | Notes                                                                 |
|----------------------------|---------------|-----------------------------------------------------------------------|
| `/`                        | building      | Homepage — hero, categories, rails, deal, newsletter                  |
| `/search`                  | future        | Search results (OpenSearch later). Header form submits here: `?q=...` |
| `/c/[...slug]`             | future        | Category pages — nested slugs walk the category tree                  |
| `/p/[slug]`                | future        | Product detail page (PDP). JSON-LD `Product`                          |
| `/cart`                    | future        | Cart page (Redis-backed)                                              |
| `/wishlist`                | future        | Wishlist (Redis-backed)                                               |
| `/(auth)/login`            | built         | `/login` — Facebook OAuth sign-in via server action                   |
| `/(auth)/register`         | built         | `/register` — Facebook OAuth sign-up via server action                |
| `/(protected)/account/*`   | future        | Account, orders, addresses (guarded layout)                           |
| `/api/auth/[...nextauth]`  | built         | Auth.js v5 handlers (GET/POST) — exports from `auth.ts`               |
| `/(legal)/privacy`         | built         | `/privacy` — Privacy Policy                                           |
| `/(legal)/terms`           | built         | `/terms` — Terms of Service                                           |
| `/(legal)/data-deletion`   | built         | `/data-deletion` — OAuth data-deletion instructions                   |
| `/robots.txt`              | built         | `app/robots.ts` — disallows cart/wishlist/orders/account/api          |
| `/sitemap.xml`             | built         | `app/sitemap.ts` — static for now, dynamic later                      |

## Route groups

- `app/(auth)/` — auth flows. Own layout, no site chrome.
- `app/(legal)/` — privacy, terms, data-deletion. Shared thin layout with site chrome and a `max-w-3xl` article container. Use this group for any future static legal/policy page.
- `app/(protected)/` — authenticated-only routes. Server-side session check in its layout when auth lands.

## Layouts

- `app/layout.tsx` — root: html, body, fonts, theme provider. No site header/footer here (so auth/protected groups can opt out).
- The homepage page wraps its own chrome via `<SiteHeader />`, `<SiteNav />`, `<SiteFooter />`. When more pages need the same chrome, promote these into a shared `(shop)` group layout — not yet needed.

## Search URL contract

Header search posts to `/search?q=...`. Keep the query param name `q` stable — typeahead hydration and external inbound links depend on it.
