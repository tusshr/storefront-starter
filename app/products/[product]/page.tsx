import { notFound } from "next/navigation";
import { Suspense } from "react";

import {
  HeartAddIcon,
  ShoppingCart01Icon,
  StarIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { Metadata } from "next";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SiteNav } from "@/components/site-nav";
import { Button } from "@/components/ui/button";
import { ProductBreadcrumbs } from "@/features/products/components/product-breadcrumbs";
import { ProductDescription } from "@/features/products/components/product-description";
import { ProductGallery } from "@/features/products/components/product-gallery";
import { ProductOptionPicker } from "@/features/products/components/product-option-picker";
import {
  getProductBySlug,
  resolveSelectedVariant,
} from "@/features/products/queries";
import type { Product } from "@/features/products/types";
import { formatCount, formatMoney } from "@/lib/format";
import { getCategoryChain } from "@/lib/mock/categories";

type Params = Promise<{ product: string }>;
type Search = Promise<Record<string, string | string[] | undefined>>;

function flattenSearch(
  raw: Record<string, string | string[] | undefined>
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(raw)) {
    if (typeof v === "string") out[k] = v;
    else if (Array.isArray(v) && typeof v[0] === "string") out[k] = v[0];
  }
  return out;
}

function pickSelectedByOptionName(
  product: Product,
  flat: Record<string, string>
): Record<string, string | undefined> {
  const selected: Record<string, string | undefined> = {};
  for (const opt of product.options ?? []) {
    const candidate = flat[opt.name.toLowerCase()];
    selected[opt.name] = opt.values.includes(candidate ?? "")
      ? candidate
      : undefined;
  }
  return selected;
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { product: slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product not found" };

  const price = product.price ?? product.variants?.[0]?.price;
  const description =
    product.description
      ?.replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim() ?? `${product.title} from ${product.brand ?? "Bhalow"}.`;

  return {
    title: product.title,
    description: description.slice(0, 160),
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: product.title,
      description: description.slice(0, 200),
      type: "website",
      url: `/products/${product.slug}`,
      images: product.images.map((url) => ({ url })),
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: description.slice(0, 200),
      images: product.images,
    },
    other: price
      ? {
          "product:price:amount": String(price.amount),
          "product:price:currency": price.currency,
        }
      : undefined,
  };
}

export default function ProductPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: Search;
}) {
  return (
    <>
      <SiteHeader />
      <SiteNav />
      <main id="main" className="flex-1">
        <Suspense fallback={<ProductPageSkeleton />}>
          <ProductPageContent params={params} searchParams={searchParams} />
        </Suspense>
      </main>
      <SiteFooter />
    </>
  );
}

function ProductPageSkeleton() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 pt-4 pb-12 lg:px-8">
      <div className="bg-muted h-3 w-48 animate-pulse rounded" />
      <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="bg-muted aspect-4/3 animate-pulse rounded-lg" />
        <div className="flex flex-col gap-4">
          <div className="bg-muted h-3 w-24 animate-pulse rounded" />
          <div className="bg-muted h-8 w-3/4 animate-pulse rounded" />
          <div className="bg-muted h-4 w-40 animate-pulse rounded" />
          <div className="bg-muted h-8 w-32 animate-pulse rounded" />
          <div className="bg-muted mt-4 h-11 w-full animate-pulse rounded" />
        </div>
      </div>
    </div>
  );
}

async function ProductPageContent({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: Search;
}) {
  const [{ product: slug }, rawSearch] = await Promise.all([
    params,
    searchParams,
  ]);

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const flat = flattenSearch(rawSearch);
  const selected = pickSelectedByOptionName(product, flat);
  const variant = resolveSelectedVariant(product, selected);

  const price = variant?.price ?? product.price ?? product.variants?.[0]?.price;
  const compare =
    variant?.compareAtPrice ??
    product.compareAtPrice ??
    product.variants?.[0]?.compareAtPrice;
  const discount =
    price && compare && compare.amount > price.amount
      ? Math.round(((compare.amount - price.amount) / compare.amount) * 100)
      : 0;

  const hasOptions = (product.options?.length ?? 0) > 0;
  const allOptionsPicked =
    !hasOptions ||
    (product.options ?? []).every((opt) => selected[opt.name] != null);
  const canBuy =
    (!hasOptions && (product.stock ?? 0) > 0) ||
    (variant != null && variant.stock > 0);
  const unavailable = hasOptions && allOptionsPicked && !variant;

  const basePath = `/products/${product.slug}`;
  const chain = getCategoryChain(product.categoryId);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: product.images,
    description: product.description
      ?.replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
    brand: product.brand
      ? { "@type": "Brand", name: product.brand }
      : undefined,
    sku: variant?.sku,
    aggregateRating: product.rating
      ? {
          "@type": "AggregateRating",
          ratingValue: product.rating.value,
          reviewCount: product.rating.count,
        }
      : undefined,
    offers: price
      ? {
          "@type": "Offer",
          price: price.amount,
          priceCurrency: price.currency,
          availability: canBuy
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
          url: basePath,
        }
      : undefined,
  };

  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      ...chain.map((c, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: c.name,
      })),
      {
        "@type": "ListItem",
        position: chain.length + 2,
        name: product.title,
        item: basePath,
      },
    ],
  };

  return (
    <>
      <div className="mx-auto w-full max-w-7xl px-4 pt-4 pb-12 lg:px-8">
        <ProductBreadcrumbs chain={chain} productTitle={product.title} />

        <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <ProductGallery images={product.images} alt={product.title} />

          <section aria-label="Product details" className="flex flex-col gap-5">
            <header className="flex flex-col gap-2">
              {product.brand && (
                <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                  {product.brand}
                </p>
              )}
              <h1 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">
                {product.title}
              </h1>
              {product.rating && (
                <p className="text-muted-foreground flex items-center gap-1.5 text-sm">
                  <HugeiconsIcon
                    icon={StarIcon}
                    strokeWidth={2}
                    className="text-foreground size-4"
                    aria-hidden="true"
                  />
                  <span className="text-foreground font-medium">
                    {product.rating.value.toFixed(1)}
                  </span>
                  <span>·</span>
                  <span>{formatCount(product.rating.count)} reviews</span>
                </p>
              )}
            </header>

            <div className="flex items-baseline gap-3">
              <span className="text-foreground text-2xl font-semibold">
                {formatMoney(price)}
              </span>
              {compare && compare.amount > (price?.amount ?? 0) && (
                <>
                  <span className="text-muted-foreground text-base line-through">
                    {formatMoney(compare)}
                  </span>
                  {discount > 0 && (
                    <span className="bg-destructive/10 text-destructive rounded-sm px-1.5 py-0.5 text-xs font-semibold">
                      -{discount}%
                    </span>
                  )}
                </>
              )}
            </div>

            {hasOptions && (
              <div className="flex flex-col gap-4">
                {product.options!.map((opt) => (
                  <ProductOptionPicker
                    key={opt.id}
                    option={opt}
                    selected={selected[opt.name]}
                    basePath={basePath}
                    currentParams={flat}
                  />
                ))}
                {unavailable && (
                  <p
                    role="status"
                    className="text-destructive text-xs font-medium"
                  >
                    This combination isn&apos;t available. Try another size or
                    color.
                  </p>
                )}
                {!allOptionsPicked && (
                  <p className="text-muted-foreground text-xs">
                    Select{" "}
                    {product
                      .options!.map((o) => o.name.toLowerCase())
                      .join(" and ")}{" "}
                    to continue.
                  </p>
                )}
              </div>
            )}

            <div className="flex items-center gap-2 pt-2">
              <Button
                type="button"
                size="lg"
                className="h-11 flex-1 text-sm"
                disabled={!canBuy}
                aria-label={
                  canBuy ? "Add to cart" : "Unavailable — add to cart disabled"
                }
              >
                <HugeiconsIcon icon={ShoppingCart01Icon} strokeWidth={2} />
                {canBuy ? "Add to cart" : "Unavailable"}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="size-11"
                aria-label="Add to wishlist"
              >
                <HugeiconsIcon icon={HeartAddIcon} strokeWidth={2} />
              </Button>
            </div>

            <ul
              role="list"
              className="border-border text-muted-foreground mt-2 grid gap-2 border-t pt-4 text-xs sm:grid-cols-2"
            >
              <li>Free US shipping over $50</li>
              <li>Ships in 1–2 business days</li>
              <li>30-day easy returns</li>
              <li>Secure checkout</li>
            </ul>
          </section>
        </div>

        {product.description && (
          <div className="border-border mt-12 border-t pt-10">
            <ProductDescription html={product.description} />
          </div>
        )}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
    </>
  );
}
