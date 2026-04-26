import Image from "next/image";
import Link from "next/link";

import {
  CheckIcon,
  InfoIcon,
  MinusIcon,
  PlusIcon,
  ProhibitIcon,
  TrashIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SiteNav } from "@/components/site-nav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { formatMoney } from "@/lib/format";
import type { Money } from "@/lib/types/money";

export const metadata: Metadata = {
  title: "Shopping Cart",
  description: "Review your items and check out at Bhalow.",
  robots: { index: false, follow: false },
};

type CartLine = {
  id: string;
  slug: string;
  title: string;
  image: string;
  options: string[];
  quantity: number;
  price: Money;
  inStock: boolean;
};

const lines: CartLine[] = [
  {
    id: "l-1",
    slug: "classic-hoodie",
    title: "Classic Hoodie",
    image: "https://picsum.photos/seed/hoodie/200/200",
    options: ["Black", "Medium"],
    quantity: 1,
    price: { amount: 45, currency: "USD" },
    inStock: true,
  },
  {
    id: "l-2",
    slug: "denim-jacket",
    title: "Denim Jacket",
    image: "https://picsum.photos/seed/jacket/200/200",
    options: ["Blue", "Large"],
    quantity: 1,
    price: { amount: 80, currency: "USD" },
    inStock: false,
  },
  {
    id: "l-3",
    slug: "slim-fit-jeans",
    title: "Slim Fit Jeans",
    image: "https://picsum.photos/seed/jeans/200/200",
    options: ["Dark Wash", "32"],
    quantity: 1,
    price: { amount: 50, currency: "USD" },
    inStock: true,
  },
];

function StockBadge({ inStock }: { inStock: boolean }) {
  if (inStock) {
    return (
      <span className="border-success/20 bg-success/10 text-success inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[11px] font-medium">
        <CheckIcon aria-hidden="true" className="size-3" />
        In stock
      </span>
    );
  }
  return (
    <span className="border-border bg-muted text-muted-foreground inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[11px] font-medium">
      <ProhibitIcon aria-hidden="true" className="size-3" />
      Sold out
    </span>
  );
}

export default function CartPage() {
  const subtotal: Money = {
    amount: lines.reduce((sum, l) => sum + l.price.amount * l.quantity, 0),
    currency: "USD",
  };
  const shipping: Money = { amount: 5, currency: "USD" };
  const tax: Money = { amount: subtotal.amount * 0.08, currency: "USD" };
  const total: Money = {
    amount: subtotal.amount + shipping.amount + tax.amount,
    currency: "USD",
  };

  return (
    <>
      <SiteHeader />
      <SiteNav />
      <main id="main" className="bg-muted/20 flex-1">
        <div className="mx-auto w-full max-w-7xl px-4 py-8 lg:px-8 lg:py-12">
          <h1 className="text-foreground mb-8 text-3xl font-semibold tracking-tight sm:text-4xl">
            Shopping Cart
          </h1>

          <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
            <section
              aria-labelledby="cart-items-title"
              className="lg:col-span-2"
            >
              <h2 id="cart-items-title" className="sr-only">
                Items
              </h2>
              <ul role="list" className="flex flex-col gap-3">
                {lines.map((line) => (
                  <li
                    key={line.id}
                    className="border-border bg-card flex items-center gap-4 rounded-lg border p-3 sm:p-4"
                  >
                    <Link
                      href={`/products/${line.slug}`}
                      className="bg-muted relative size-20 shrink-0 overflow-hidden rounded-md"
                    >
                      <Image
                        src={line.image}
                        alt={line.title}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </Link>

                    <div className="flex flex-1 flex-col gap-1">
                      <h3 className="text-foreground text-base font-semibold">
                        <Link
                          href={`/products/${line.slug}`}
                          className="hover:text-primary focus-visible:outline-none"
                        >
                          {line.title}
                        </Link>
                      </h3>
                      <div className="flex flex-wrap items-center gap-2.5">
                        <p className="text-muted-foreground text-xs">
                          {line.options.join(" | ")}
                        </p>
                        <StockBadge inStock={line.inStock} />
                      </div>
                      <p className="text-foreground text-sm font-medium tabular-nums">
                        {formatMoney(line.price)}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        min={1}
                        defaultValue={line.quantity}
                        aria-label={`Quantity for ${line.title}`}
                        className="h-8 w-12 text-center"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon-lg"
                        aria-label="Increase quantity"
                      >
                        <PlusIcon />
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon-lg"
                        aria-label="Decrease quantity"
                      >
                        <MinusIcon />
                      </Button>
                    </div>

                    <Button
                      type="button"
                      variant="destructive"
                      size="icon-lg"
                      aria-label={`Remove ${line.title} from cart`}
                    >
                      <TrashIcon />
                    </Button>
                  </li>
                ))}
              </ul>
            </section>

            <aside aria-label="Order summary" className="lg:col-span-1">
              <div className="border-border bg-card flex flex-col gap-5 rounded-lg border p-6">
                <h2 className="text-foreground text-base font-semibold">
                  Order summary
                </h2>

                <dl className="flex flex-col gap-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Subtotal</dt>
                    <dd className="text-foreground tabular-nums">
                      {formatMoney(subtotal)}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground inline-flex items-center gap-1">
                      Shipping estimate
                      <InfoIcon aria-hidden="true" className="size-3.5" />
                    </dt>
                    <dd className="text-foreground tabular-nums">
                      {formatMoney(shipping)}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground inline-flex items-center gap-1">
                      Tax estimate
                      <InfoIcon aria-hidden="true" className="size-3.5" />
                    </dt>
                    <dd className="text-foreground tabular-nums">
                      {formatMoney(tax)}
                    </dd>
                  </div>
                </dl>

                <Separator />

                <div className="flex items-baseline justify-between">
                  <span className="text-foreground text-base font-medium">
                    Order total
                  </span>
                  <span className="text-foreground text-base font-semibold tabular-nums">
                    {formatMoney(total)}
                  </span>
                </div>

                <Button type="button" size="lg" className="mt-8 h-11 w-full">
                  Checkout
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
