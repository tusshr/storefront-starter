# Styling

## Source of truth

- `styles/globals.css` — light + dark `:root` CSS variables for every shadcn token. Any new token goes here.
- `components.json` — shadcn config. `base-mira` style, `taupe` baseColor, hugeicons, cssVariables enabled.
- No `tailwind.config.ts`. Tailwind v4 reads theme from `@theme inline` in `globals.css`.

## Only use these color utilities

| Purpose              | Utility                                               |
|----------------------|-------------------------------------------------------|
| Page bg/fg           | `bg-background` / `text-foreground`                   |
| Card surface         | `bg-card text-card-foreground`                        |
| Popover/dropdown     | `bg-popover text-popover-foreground`                  |
| Primary action       | `bg-primary text-primary-foreground`                  |
| Secondary surface    | `bg-secondary text-secondary-foreground`              |
| Muted surface/text   | `bg-muted` / `text-muted-foreground`                  |
| Accent highlight     | `bg-accent text-accent-foreground`                    |
| Border               | `border-border`                                       |
| Ring/focus           | `ring-ring`                                           |
| Destructive/urgency  | `bg-destructive/10 text-destructive` etc.             |
| Sidebar              | `bg-sidebar`, `text-sidebar-foreground`, etc.         |
| Charts               | `fill-chart-1` … `fill-chart-5`                       |

Radius: `rounded-sm|md|lg|xl|2xl|3xl|4xl` (scaled off `--radius`, currently `0.25rem` — a deliberately tight/serious look chosen on 2026-04-21). If a section feels too soft, tighten the token, not one-off overrides.

`rounded-full` is reserved for things that are *actually* circles: tiny notification/count badges on the header icons, decorative blur blobs in the hero. Icon chips, inputs, and buttons use `rounded-md`.

## Forbidden

- Hex, rgb, hsl, oklch literals in Tailwind classes or inline styles.
- Tailwind color palette utilities: `bg-zinc-50`, `text-gray-600`, `bg-pink-400`, etc.
- Re-declaring colors in component files.
- `dark:` overrides for color (tokens flip automatically). Only use `dark:` for structural differences if genuinely needed.

## Icons

`@hugeicons/react` with `@hugeicons/core-free-icons`. Size via wrapping utility or the icon's `size` prop. Example:

```tsx
import { HugeiconsIcon } from "@hugeicons/react";
import { ShoppingBag03Icon } from "@hugeicons/core-free-icons";

<HugeiconsIcon icon={ShoppingBag03Icon} className="size-5" />;
```

## Typography

Root layout loads Inter (primary), Geist Sans, Geist Mono. `font-sans` is the default in globals.css. Don't re-load fonts in sub-layouts.

## Semantic + accessibility rules

- Use landmarks (`<header> <nav> <main> <section> <article> <footer>`).
- Heading outline must be monotonic: one `<h1>` per page, `<h2>` per section, etc.
- All images via `next/image` with `alt`; decorative-only images get `alt=""`.
- All form inputs must have associated `<label>`.
- Interactive non-button targets get `role` + keyboard handlers — prefer a real `<button>` or `<a>`.
