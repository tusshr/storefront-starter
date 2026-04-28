import { notFound } from "next/navigation";
import { Suspense } from "react";

import {
  HeartIcon,
  ShoppingCartIcon,
  StarIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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

function stripHtml(input?: string): string {
  if (!input) return "";
  return input
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractMatches(input: string | undefined, pattern: RegExp): string[] {
  if (!input) return [];
  return Array.from(input.matchAll(pattern))
    .map((match) => stripHtml(match[1]))
    .filter(Boolean);
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
    <Suspense fallback={<ProductPageSkeleton />}>
      <ProductPageContent params={params} searchParams={searchParams} />
    </Suspense>
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
  const categoryLabel = chain.at(-1)?.name ?? "Product";
  const intro = extractMatches(product.description, /<p>(.*?)<\/p>/g)[0];
  const highlights = extractMatches(
    product.description,
    /<li>(.*?)<\/li>/g
  ).slice(0, 4);
  const stockCount = variant?.stock ?? product.stock ?? 0;
  const isLimitedStock = canBuy && stockCount > 0 && stockCount <= 10;
  const stockLabel = unavailable
    ? "Unavailable in this combination"
    : canBuy
      ? isLimitedStock
        ? `Only ${stockCount} left in stock`
        : "In stock"
      : "Currently unavailable";
  const deliveryLabel = canBuy
    ? "FREE delivery in 1-2 business days"
    : "Select an available option to continue";
  const selectedSummary = (product.options ?? [])
    .map((option) => {
      const value = selected[option.name];
      return value ? `${option.name}: ${value}` : null;
    })
    .filter((value): value is string => value != null);
  const savings =
    price && compare && compare.amount > price.amount
      ? { ...compare, amount: compare.amount - price.amount }
      : null;
  const detailItems = [
    { label: "Brand", value: product.brand ?? "Storefront" },
    { label: "Category", value: categoryLabel },
    { label: "SKU", value: variant?.sku ?? "Assigned after selection" },
    { label: "Availability", value: stockLabel },
    { label: "Shipping", value: "Free on eligible orders over $50" },
    { label: "Returns", value: "30-day easy returns" },
  ];

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
      <article className="mx-auto w-full max-w-7xl px-4 pt-4 pb-12 lg:px-8">
        <ProductBreadcrumbs chain={chain} productTitle={product.title} />

        <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)_19rem] xl:items-start">
          <section aria-label="Product media" className="min-w-0">
            <ProductGallery images={product.images} alt={product.title} />
          </section>

          <section aria-labelledby="product-title" className="min-w-0">
            <div className="flex flex-col gap-6">
              <header className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  {product.brand && (
                    <Badge variant="secondary">{product.brand}</Badge>
                  )}
                  <Badge variant="outline">{categoryLabel}</Badge>
                  {discount > 0 && (
                    <Badge variant="destructive">Save {discount}%</Badge>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <h1
                    id="product-title"
                    className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl"
                  >
                    {product.title}
                  </h1>

                  {product.rating && (
                    <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-sm">
                      <p className="flex items-center gap-1.5">
                        <StarIcon
                          className="text-foreground size-4"
                          aria-hidden="true"
                        />
                        <span className="text-foreground font-medium">
                          {product.rating.value.toFixed(1)}
                        </span>
                        <span>
                          ({formatCount(product.rating.count)} ratings)
                        </span>
                      </p>
                      <span aria-hidden="true">|</span>
                      <p>
                        {formatCount(product.rating.count)} verified reviews
                      </p>
                    </div>
                  )}
                </div>

                {intro && (
                  <p className="text-muted-foreground max-w-2xl text-sm leading-6">
                    {intro}
                  </p>
                )}
              </header>

              <Card className="bg-muted/30 gap-3 border">
                <CardContent className="flex flex-col gap-3 pt-4">
                  <div className="flex flex-wrap items-end gap-x-3 gap-y-1">
                    <span className="text-foreground text-3xl font-semibold tracking-tight">
                      {formatMoney(price)}
                    </span>
                    {compare && compare.amount > (price?.amount ?? 0) && (
                      <span className="text-muted-foreground text-base line-through">
                        {formatMoney(compare)}
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {savings
                      ? `You save ${formatMoney(savings)} compared with the original price.`
                      : "Everyday pricing with no surprises at checkout."}
                  </p>
                </CardContent>
              </Card>

              {hasOptions && (
                <section
                  aria-labelledby="purchase-options-heading"
                  className="flex flex-col gap-4"
                >
                  <div className="flex flex-col gap-1">
                    <h2
                      id="purchase-options-heading"
                      className="text-sm font-semibold"
                    >
                      Choose your options
                    </h2>
                    {!allOptionsPicked && (
                      <p className="text-muted-foreground text-xs">
                        Select{" "}
                        {product
                          .options!.map((o) => o.name.toLowerCase())
                          .join(" and ")}{" "}
                        to see the available purchase combination.
                      </p>
                    )}
                  </div>

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
                </section>
              )}

              <section
                aria-labelledby="highlights-heading"
                className="grid gap-4"
              >
                <Card className="gap-3 border">
                  <CardHeader>
                    <h2 id="highlights-heading" className="text-sm font-medium">
                      About this item
                    </h2>
                    <CardDescription>
                      Clean, useful details up front so the buying decision is
                      easy.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {highlights.length > 0 ? (
                      <ul
                        role="list"
                        className="flex flex-col gap-2 text-sm leading-6"
                      >
                        {highlights.map((item) => (
                          <li key={item} className="flex gap-2">
                            <span
                              aria-hidden="true"
                              className="text-muted-foreground"
                            >
                              •
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted-foreground text-sm leading-6">
                        {stripHtml(product.description) ||
                          "Detailed product information will appear here."}
                      </p>
                    )}
                  </CardContent>
                </Card>

                <Card className="gap-3 border">
                  <CardHeader>
                    <h2 className="text-sm font-medium">Quick facts</h2>
                  </CardHeader>
                  <CardContent>
                    <dl className="grid gap-4 text-sm sm:grid-cols-2">
                      {detailItems.slice(0, 4).map((item) => (
                        <div key={item.label} className="flex flex-col gap-1">
                          <dt className="text-muted-foreground text-xs tracking-wide uppercase">
                            {item.label}
                          </dt>
                          <dd className="text-foreground font-medium">
                            {item.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </CardContent>
                </Card>
              </section>
            </div>
          </section>

          <aside aria-label="Purchase panel" className="xl:sticky xl:top-24">
            <Card className="gap-0 border">
              <CardHeader className="gap-2">
                <h2 className="text-lg font-semibold">Buy now</h2>
                <CardDescription>
                  Fast checkout, clear delivery timing, and easy returns.
                </CardDescription>
              </CardHeader>

              <CardContent className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-foreground text-3xl font-semibold tracking-tight">
                    {formatMoney(price)}
                  </span>
                  {compare && compare.amount > (price?.amount ?? 0) && (
                    <p className="text-muted-foreground text-xs">
                      List price{" "}
                      <span className="line-through">
                        {formatMoney(compare)}
                      </span>
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium">{deliveryLabel}</p>
                  <p className="text-muted-foreground text-xs">
                    Secure checkout. Taxes and final shipping are calculated at
                    checkout.
                  </p>
                </div>

                <p
                  className={
                    isLimitedStock
                      ? "text-destructive text-sm font-medium"
                      : "text-sm font-medium"
                  }
                >
                  {stockLabel}
                </p>

                {selectedSummary.length > 0 && (
                  <div className="bg-muted/40 rounded-lg p-3">
                    <p className="text-xs font-medium tracking-wide uppercase">
                      Selected
                    </p>
                    <ul
                      role="list"
                      className="mt-2 flex flex-col gap-1 text-sm"
                    >
                      {selectedSummary.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  <Button
                    type="button"
                    size="lg"
                    className="h-10 w-full text-sm"
                    disabled={!canBuy}
                    aria-label={
                      canBuy
                        ? "Add to cart"
                        : "Unavailable - add to cart disabled"
                    }
                  >
                    <ShoppingCartIcon data-icon="inline-start" />
                    {canBuy ? "Add to cart" : "Unavailable"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    className="h-10 w-full text-sm"
                    aria-label="Add to wishlist"
                  >
                    <HeartIcon data-icon="inline-start" />
                    Add to wishlist
                  </Button>
                </div>

                <Separator />

                <dl className="flex flex-col gap-3 text-sm">
                  {detailItems.slice(4).map((item) => (
                    <div
                      key={item.label}
                      className="flex items-start justify-between gap-4"
                    >
                      <dt className="text-muted-foreground">{item.label}</dt>
                      <dd className="text-right font-medium">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </CardContent>

              <CardFooter className="text-muted-foreground border-t pt-4 text-xs leading-5">
                Sold by Storefront. Covered by secure payment protection and
                standard support.
              </CardFooter>
            </Card>
          </aside>
        </div>

        <section
          aria-labelledby="product-details-heading"
          className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.85fr)]"
        >
          {product.description && (
            <ProductDescription html={product.description} />
          )}

          <Card className="h-fit gap-3 border">
            <CardHeader>
              <h2 id="product-details-heading" className="text-sm font-medium">
                Purchase details
              </h2>
              <CardDescription>
                The practical information most shoppers look for before checking
                out.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <dl className="grid gap-4 text-sm">
                {detailItems.map((item) => (
                  <div
                    key={item.label}
                    className="grid gap-1 sm:grid-cols-[7rem_minmax(0,1fr)] sm:items-start"
                  >
                    <dt className="text-muted-foreground text-xs tracking-wide uppercase sm:pt-0.5">
                      {item.label}
                    </dt>
                    <dd className="leading-6">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>
        </section>
      </article>
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
