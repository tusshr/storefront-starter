# Routing

## Route map (planned)

| Path                          | Status   | Notes                                                                 |
| ----------------------------- | -------- | --------------------------------------------------------------------- |
| `/`                           | building | Homepage — hero, categories, rails, deal, newsletter                  |
| `/search`                     | future   | Search results (OpenSearch later). Header form submits here: `?q=...` |
| `/c/[...slug]`                | future   | Category pages — nested slugs walk the category tree                  |
| `/p/[slug]`                   | future   | Product detail page (PDP). JSON-LD `Product`                          |
| `/cart`                       | built    | `/cart` — cart page with mock line items and order summary            |
| `/wishlist`                   | future   | Wishlist (Redis-backed)                                               |
| `/(auth)/login`               | built    | `/login` — placeholder sign-in page while auth is rebuilt             |
| `/(auth)/register`            | built    | `/register` — placeholder sign-up page while auth is rebuilt          |
| `/(protected)/account/orders` | built    | `/account/orders` — order history list (mock data)                    |
| `/(protected)/account/*`      | future   | Account, addresses, order detail (guarded layout)                     |
| `/api/auth/[...nextauth]`     | removed  | Temporary Auth.js handlers were removed with the unfinished auth flow |
| `/(legal)/privacy`            | built    | `/privacy` — Privacy Policy                                           |
| `/(legal)/terms`              | built    | `/terms` — Terms of Service                                           |
| `/(legal)/data-deletion`      | built    | `/data-deletion` — OAuth data-deletion instructions                   |
| `/robots.txt`                 | built    | `app/robots.ts` — disallows cart/wishlist/orders/account/api          |
| `/sitemap.xml`                | built    | `app/sitemap.ts` — static for now, dynamic later                      |

## Route groups

- `app/(auth)/` — auth flows. Own layout, no site chrome.
- `app/(legal)/` — privacy, terms, data-deletion. Shared thin layout with site chrome and a `max-w-3xl` article container. Use this group for any future static legal/policy page.
- `app/(protected)/` — account-oriented routes grouped under shared site chrome. Auth enforcement is still a follow-up.

## Layouts

- `app/layout.tsx` — root: html, body, fonts, theme provider. No site header/footer here (so auth/protected groups can opt out).
- Storefront pages currently wrap their own chrome via `<SiteHeader />`, `<SiteNav />`, and `<SiteFooter />` inside the `(storefront)` group routes.

## Search URL contract

Header search posts to `/search?q=...`. Keep the query param name `q` stable — typeahead hydration and external inbound links depend on it.
