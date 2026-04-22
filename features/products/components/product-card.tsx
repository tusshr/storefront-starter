import Image from "next/image";
import Link from "next/link";

import { StarIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import type { Product } from "@/features/products/types";
import { formatCount, formatMoney } from "@/lib/format";

type Props = {
  product: Product;
  priority?: boolean;
};

function primaryPrice(p: Product) {
  if (p.price) return p.price;
  return p.variants?.[0]?.price;
}

function primaryCompare(p: Product) {
  if (p.compareAtPrice) return p.compareAtPrice;
  return p.variants?.[0]?.compareAtPrice;
}

export function ProductCard({ product, priority }: Props) {
  const price = primaryPrice(product);
  const compare = primaryCompare(product);
  const discount =
    price && compare && compare.amount > price.amount
      ? Math.round(((compare.amount - price.amount) / compare.amount) * 100)
      : 0;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-primary/40 hover:shadow-sm">
      <Link
        href={`/p/${product.slug}`}
        className="relative block aspect-[4/3] overflow-hidden bg-muted"
      >
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          sizes="(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 45vw"
          priority={priority}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {discount > 0 && (
          <span className="absolute top-2 left-2 rounded-sm bg-destructive/10 px-1.5 py-0.5 text-[10px] font-semibold text-destructive">
            -{discount}%
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-1 p-3">
        {product.brand && (
          <p className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
            {product.brand}
          </p>
        )}
        <h3 className="line-clamp-2 text-sm leading-snug font-medium text-foreground">
          <Link
            href={`/p/${product.slug}`}
            className="focus-visible:outline-none"
          >
            {product.title}
          </Link>
        </h3>
        {product.rating && (
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <HugeiconsIcon
              icon={StarIcon}
              strokeWidth={2}
              className="size-3.5 text-foreground"
              aria-hidden="true"
            />
            <span className="font-medium text-foreground">
              {product.rating.value.toFixed(1)}
            </span>
            <span>({formatCount(product.rating.count)})</span>
          </p>
        )}
        <div className="mt-auto flex items-baseline gap-2 pt-1.5">
          <span className="text-sm font-semibold text-foreground">
            {formatMoney(price)}
          </span>
          {compare && compare.amount > (price?.amount ?? 0) && (
            <span className="text-xs text-muted-foreground line-through">
              {formatMoney(compare)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
