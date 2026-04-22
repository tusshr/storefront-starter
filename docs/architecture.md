# Architecture

Domain-first layout. Each bounded context (products, categories, cart, orders, auth, search…) owns its types, data access, server actions, and React components under `features/<domain>/`. Infrastructure clients (drizzle, redis, opensearch, s3) sit in `lib/`. Routes in `app/` stay thin — no direct DB calls, no business logic.

## Folder layout

```text
app/                       # routes + layouts only
  (auth)/ (legal)/ (protected)/ api/ layout.tsx page.tsx ...

lib/                       # infrastructure + generic utilities
  db/                      # drizzle client, schemas, migrations  (not yet)
  cache/                   # redis client, key prefixes           (not yet)
  search/                  # opensearch client, indices           (not yet)
  storage/                 # s3 client, signed-url helpers        (not yet)
  auth/                    # Auth.js config (root auth.ts for now)
  types/                   # cross-domain types (Money, ...)
  mock/                    # mock data, removed as features land
  env.ts                   # zod-validated process.env            (not yet)
  format.ts  icons.ts  utils.ts

features/                  # domain slices
  products/                # ← template
    types.ts               # domain types, safe for client + server
    queries.ts             # `import "server-only"`, `'use cache'` functions
    mutations.ts           # `import "server-only"`, cache-invalidating writes
    actions.ts             # `"use server"` — callable from client components
    cache.ts               # cacheTag / cacheLife helpers for this domain
    components/            # domain-specific React components
  categories/ cart/ wishlist/ orders/ search/ auth/ ...

components/                # no domain knowledge
  ui/                      # shadcn primitives
  site-header.tsx  site-footer.tsx  site-nav.tsx  site-nav-mobile.tsx
  theme-toggle.tsx  theme-provider.tsx
```

## Import rules

1. `app/*` imports from `features/*` and `components/*`. Never drizzle/redis/s3 directly.
2. `features/<a>/*` imports from `lib/*` and `components/ui/*`. Never from `features/<b>/*`. Cross-domain composition lives in a dedicated feature (e.g. `features/search/` composes `products` + `categories`).
3. `lib/*` is the only layer that talks to external services.

Server-only leakage guard: every `queries.ts` / `mutations.ts` starts with `import "server-only";`. Accidental client imports become build errors instead of runtime leaks.

## Slice conventions

- **types.ts** — domain types shared across client and server. No `server-only`.
- **queries.ts** — read paths. Each function uses the `"use cache"` directive plus `cacheTag(...)` and `cacheLife(...)` from `next/cache` so cached results survive drizzle swaps.
- **mutations.ts** — write paths. Call `revalidateTag(...)` after each write.
- **actions.ts** — thin `"use server"` wrappers that client components can call directly. Validate input with zod from `schema.ts`; delegate to `queries` / `mutations`.
- **components/** — server components by default; `"use client"` only when required by interactivity.

## Template: products

Done. `features/products/` shows the full shape with mock data today. When drizzle lands, only `queries.ts` / `mutations.ts` change — `types.ts`, `actions.ts`, `components/` stay put. Follow this shape for the next slice.
