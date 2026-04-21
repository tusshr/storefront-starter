# Data Model

This is a living document. Update when the backend team finalizes schemas.

## Category (user-confirmed, 2026-04-21)

```ts
// lib/types/category.ts
export type Category = {
  id?: string;
  name: string;
  parentId: string | null;
  icon: string | null;          // hugeicons key name, resolved via icon map at render
  homepageVisible: boolean;
  createdBy?: string | null;
  createdDate?: string;         // ISO 8601
};
```

- Tree is flat rows linked by `parentId`. Root categories have `parentId: null`.
- `homepageVisible === true` rows render in the homepage tiles section.
- `icon` is a hugeicons key name string (e.g. `"ShoppingBag03Icon"`). At render, a small lookup in the consuming component resolves it to the real icon from `@hugeicons/core-free-icons`. User originally typed it as `string | IconName | null`; `IconName` isn't exported by `@hugeicons/react`, so it's `string | null`. Can tighten to a string-literal union of known icon keys later if desired.
- `id` optional during mock phase; DB rows will always have a UUID/string ID.

## Product (draft — flag with user before cementing)

```ts
// lib/types/product.ts
export type Money = { amount: number; currency: "USD" };

export type ProductOption = {
  id: string;
  name: string;           // "Color", "Size"
  values: string[];       // ["Red", "Blue"] or ["S", "M", "L"]
};

export type ProductVariant = {
  id: string;
  sku: string;
  optionValues: Record<string, string>; // { Color: "Red", Size: "M" }
  price: Money;
  compareAtPrice?: Money;
  stock: number;
  image?: string;
};

export type Product = {
  id: string;
  slug: string;
  title: string;
  description?: string;
  brand?: string;
  categoryId: string;
  images: string[];       // first is primary
  rating?: { value: number; count: number };
  // Products without variations carry these at the base:
  price?: Money;
  compareAtPrice?: Money;
  stock?: number;
  // Products with variations define these:
  options?: ProductOption[];
  variants?: ProductVariant[];
};
```

**Assumption to confirm with user**: variants own their own price/stock; the base product carries price/stock only when there are no variants. If the team prefers a "default variant" pattern (base always points at a primary variant), refactor before the mock→DB swap.

## Cart / Wishlist (future — Redis)

- Guest cart keyed by cookie ID; user cart keyed by user ID.
- Shape TBD; components today consume only `count` via a client component that fetches from an API route — abstraction point is `components/cart-button.tsx`.

## Mocks

- `lib/mock/categories.ts` — flat array of `Category`, covers at least two nesting levels and 6+ homepage-visible roots.
- `lib/mock/products.ts` — mix of variation / no-variation products across categories, enough to populate three rails and a deal-of-the-day.
