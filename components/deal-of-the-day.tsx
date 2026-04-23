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
  const compare =
    product.compareAtPrice ?? product.variants?.[0]?.compareAtPrice;

  return (
    <section
      aria-labelledby="deal-of-the-day"
      className="mx-auto w-full max-w-7xl px-4 py-8 lg:px-8"
    >
      <div className="border-border bg-card grid gap-0 overflow-hidden rounded-xl border md:grid-cols-2">
        <Link
          href={`/products/${product.slug}`}
          className="bg-muted relative block aspect-square md:aspect-auto"
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
              className="text-destructive text-xs font-bold tracking-widest uppercase"
            >
              Deal of the day
            </h2>
            <DealCountdown durationHours={24} />
          </div>
          {product.rating && (
            <p className="text-muted-foreground flex items-center gap-1 text-xs">
              <HugeiconsIcon
                icon={StarIcon}
                strokeWidth={2}
                className="text-foreground size-3.5"
              />
              <span className="text-foreground font-medium">
                {product.rating.value.toFixed(1)}
              </span>
              <span>({formatCount(product.rating.count)} reviews)</span>
            </p>
          )}
          <h3 className="text-foreground text-2xl font-semibold lg:text-3xl">
            {product.title}
          </h3>
          {product.brand && (
            <p className="text-muted-foreground text-sm">by {product.brand}</p>
          )}
          <div className="flex items-baseline gap-3">
            <span className="text-foreground text-2xl font-bold">
              {formatMoney(price)}
            </span>
            {compare && compare.amount > (price?.amount ?? 0) && (
              <span className="text-muted-foreground text-sm line-through">
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
