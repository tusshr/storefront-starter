import Link from "next/link";

import { ProductCard } from "@/features/products/components/product-card";
import type { Product } from "@/features/products/types";

type Props = {
  id: string;
  title: string;
  viewAllHref?: string;
  products: Product[];
  prioritizeFirst?: boolean;
};

export function ProductRail({
  id,
  title,
  viewAllHref,
  products,
  prioritizeFirst,
}: Props) {
  return (
    <section
      aria-labelledby={id}
      className="mx-auto w-full max-w-7xl px-4 py-6 lg:px-8"
    >
      <div className="mb-4 flex items-end justify-between gap-4">
        <h2
          id={id}
          className="text-foreground text-lg font-semibold sm:text-xl"
        >
          {title}
        </h2>
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="text-muted-foreground hover:text-foreground shrink-0 text-xs font-medium"
          >
            View all →
          </Link>
        )}
      </div>
      <ul
        role="list"
        className="-mx-4 flex snap-x snap-mandatory scroll-pl-6 gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:snap-none sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-6"
      >
        {products.map((product, i) => (
          <li
            key={product.id}
            className="w-[58%] shrink-0 snap-start sm:w-auto"
          >
            <ProductCard
              product={product}
              priority={prioritizeFirst && i === 0}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
