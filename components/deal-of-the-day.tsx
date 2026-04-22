import Image from "next/image";
import Link from "next/link";

import { StarIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { DealCountdown } from "@/components/deal-countdown";
import { buttonVariants } from "@/components/ui/button";
import { getDealOfTheDay } from "@/features/products/queries";
import { formatCount, formatMoney } from "@/lib/format";

export async function DealOfTheDay() {
  const product = await getDealOfTheDay();
  const price = product.price ?? product.variants?.[0]?.price;
  const compare = product.compareAtPrice ?? product.variants?.[0]?.compareAtPrice;

  return (
    <section
      aria-labelledby="deal-of-the-day"
      className="mx-auto w-full max-w-7xl px-4 py-8 lg:px-8"
    >
      <div className="grid gap-0 overflow-hidden rounded-xl border border-border bg-card md:grid-cols-2">
        <Link
          href={`/products/${product.slug}`}
          className="relative block aspect-square bg-muted md:aspect-auto"
        >
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </Link>
        <div className="flex flex-col justify-center gap-4 p-6 lg:p-10">
          <div className="flex items-center gap-2">
            <h2
              id="deal-of-the-day"
              className="text-xs font-bold tracking-widest text-destructive uppercase"
            >
              Deal of the day
            </h2>
            <DealCountdown durationHours={24} />
          </div>
          {product.rating && (
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <HugeiconsIcon
                icon={StarIcon}
                strokeWidth={2}
                className="size-3.5 text-foreground"
              />
              <span className="font-medium text-foreground">
                {product.rating.value.toFixed(1)}
              </span>
              <span>({formatCount(product.rating.count)} reviews)</span>
            </p>
          )}
          <h3 className="text-2xl font-semibold text-foreground lg:text-3xl">
            {product.title}
          </h3>
          {product.brand && (
            <p className="text-sm text-muted-foreground">by {product.brand}</p>
          )}
          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-bold text-foreground">
              {formatMoney(price)}
            </span>
            {compare && compare.amount > (price?.amount ?? 0) && (
              <span className="text-sm text-muted-foreground line-through">
                {formatMoney(compare)}
              </span>
            )}
          </div>
          <Link
            href={`/products/${product.slug}`}
            className={`${buttonVariants({ size: "lg" })} w-fit`}
          >
            Shop the deal
          </Link>
        </div>
      </div>
    </section>
  );
}
