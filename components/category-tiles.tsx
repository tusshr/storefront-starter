import Link from "next/link";

import { HugeiconsIcon } from "@hugeicons/react";

import { resolveIcon } from "@/lib/icons";
import { getHomepageCategories } from "@/lib/mock/categories";

export function CategoryTiles() {
  const cats = getHomepageCategories();

  return (
    <section
      aria-labelledby="shop-by-category"
      className="mx-auto w-full max-w-7xl px-4 py-8 lg:px-8"
    >
      <div className="mb-4 flex items-end justify-between">
        <h2
          id="shop-by-category"
          className="text-foreground text-lg font-semibold sm:text-xl"
        >
          Shop by category
        </h2>
        <Link
          href="/c"
          className="text-muted-foreground hover:text-foreground text-xs font-medium"
        >
          View all →
        </Link>
      </div>
      <ul
        role="list"
        className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-8"
      >
        {cats.map((cat) => {
          const icon = resolveIcon(cat.icon);
          return (
            <li key={cat.id}>
              <Link
                href={`/c/${cat.name.toLowerCase().replace(/[^\w]+/g, "-")}`}
                className="group border-border bg-card hover:border-primary/40 flex aspect-square flex-col items-center justify-center gap-2 rounded-lg border p-3 text-center transition-all hover:-translate-y-0.5 hover:shadow-sm"
              >
                {icon && (
                  <span
                    aria-hidden="true"
                    className="bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary flex size-10 items-center justify-center rounded-md transition-colors"
                  >
                    <HugeiconsIcon icon={icon} strokeWidth={1.75} />
                  </span>
                )}
                <span className="text-foreground text-xs font-medium sm:text-sm">
                  {cat.name}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
