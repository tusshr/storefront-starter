import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import {
  CheckCircleIcon,
  InfoIcon,
  MinusIcon,
  PlusIcon,
  ProhibitIcon,
  TrashIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { getCartLines } from "@/lib/cart/cart";
import { formatMoney } from "@/lib/format";
import type { Money } from "@/lib/types/money";
import { cn } from "@/lib/utils";

import { removeLine, updateLine } from "./actions";

export const metadata: Metadata = {
  title: "Shopping Cart",
  description: "Review your items and check out at Bhalow.",
  robots: { index: false, follow: false },
};

export default function CartPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 lg:px-8 lg:py-12">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Shopping Cart
      </h1>
      <Separator className="mt-6 mb-8" />

      <Suspense fallback={<CartSkeleton />}>
        <CartContents />
      </Suspense>
    </div>
  );
}

async function CartContents() {
  const lines = await getCartLines();

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
    <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
      <section aria-labelledby="cart-items-title" className="lg:col-span-2">
        <h2 id="cart-items-title" className="sr-only">
          Items
        </h2>
        <ul role="list" className="flex flex-col gap-3">
          {lines.map((line) => (
            <li key={line.id}>
              <Item
                variant="muted"
                className={cn(
                  "flex-wrap items-start gap-4 p-4 sm:flex-nowrap sm:items-center sm:p-5",
                  !line.inStock && "opacity-75"
                )}
              >
                <ItemMedia className="bg-muted relative size-20 shrink-0 self-start overflow-hidden rounded-md sm:size-24 sm:self-center">
                  <Link
                    href={`/products/${line.slug}`}
                    aria-hidden="true"
                    tabIndex={-1}
                    className="absolute inset-0"
                  >
                    <Image
                      src={line.image}
                      alt=""
                      fill
                      sizes="(min-width: 640px) 96px, 80px"
                      className="object-cover"
                    />
                  </Link>
                </ItemMedia>

                <ItemContent className="min-w-0 gap-1.5">
                  <ItemTitle className="line-clamp-2 text-sm font-semibold whitespace-normal sm:text-base">
                    <Link
                      href={`/products/${line.slug}`}
                      className="hover:text-primary focus-visible:outline-none"
                    >
                      {line.title}
                    </Link>
                  </ItemTitle>

                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
                    {line.options.length > 0 && (
                      <span className="text-muted-foreground text-xs sm:text-sm">
                        {line.options.join(" | ")}
                      </span>
                    )}
                    {line.inStock ? (
                      <Badge variant="secondary" className="text-success gap-1">
                        <CheckCircleIcon weight="fill" />
                        In stock
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="gap-1">
                        <ProhibitIcon />
                        Sold out
                      </Badge>
                    )}
                  </div>

                  <p className="text-sm font-semibold tabular-nums sm:text-base">
                    {formatMoney(line.price)}
                  </p>
                </ItemContent>

                <ItemActions className="ml-auto basis-full justify-end sm:basis-auto">
                  <form action={updateLine} className="contents">
                    <input type="hidden" name="lineId" value={line.id} />
                    <ButtonGroup>
                      <Input
                        key={line.quantity}
                        name="quantity"
                        type="number"
                        min={1}
                        inputMode="numeric"
                        defaultValue={line.quantity}
                        aria-label={`Quantity of ${line.title}`}
                        className="h-8 w-12 [appearance:textfield] text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      />
                      <Button
                        type="submit"
                        name="op"
                        value="inc"
                        variant="outline"
                        size="icon-lg"
                        aria-label={`Increase quantity of ${line.title}`}
                      >
                        <PlusIcon />
                      </Button>
                      <Button
                        type="submit"
                        name="op"
                        value="dec"
                        variant="outline"
                        size="icon-lg"
                        aria-label={
                          line.quantity <= 1
                            ? `Remove ${line.title} from cart`
                            : `Decrease quantity of ${line.title}`
                        }
                      >
                        <MinusIcon />
                      </Button>
                    </ButtonGroup>
                  </form>
                  <form action={removeLine}>
                    <input type="hidden" name="lineId" value={line.id} />
                    <Button
                      type="submit"
                      variant="ghost"
                      size="icon-lg"
                      aria-label={`Remove ${line.title} from cart`}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <TrashIcon weight="bold" />
                    </Button>
                  </form>
                </ItemActions>
              </Item>
            </li>
          ))}
        </ul>
      </section>

      <aside aria-labelledby="order-summary-title" className="lg:col-span-1">
        <Card className="lg:sticky lg:top-24">
          <CardHeader>
            <h2 id="order-summary-title" className="text-base font-semibold">
              Order summary
            </h2>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <dl className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="tabular-nums">{formatMoney(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground inline-flex items-center gap-1">
                  Shipping estimate
                  <InfoIcon aria-hidden className="size-3.5" />
                </dt>
                <dd className="tabular-nums">{formatMoney(shipping)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground inline-flex items-center gap-1">
                  Tax estimate
                  <InfoIcon aria-hidden className="size-3.5" />
                </dt>
                <dd className="tabular-nums">{formatMoney(tax)}</dd>
              </div>
            </dl>
            <Separator />
            <dl className="flex items-baseline justify-between">
              <dt className="font-medium">Order total</dt>
              <dd className="font-semibold tabular-nums">
                {formatMoney(total)}
              </dd>
            </dl>
          </CardContent>
          <CardFooter>
            <Button
              type="button"
              className="h-11 w-full"
              disabled={lines.length === 0}
            >
              Checkout
            </Button>
          </CardFooter>
        </Card>
      </aside>
    </div>
  );
}

function CartSkeleton() {
  return (
    <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
      <div className="flex flex-col gap-3 lg:col-span-2">
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="h-32 w-full rounded-md sm:h-36" />
        ))}
      </div>
      <Skeleton className="h-72 w-full rounded-lg lg:col-span-1" />
    </div>
  );
}
