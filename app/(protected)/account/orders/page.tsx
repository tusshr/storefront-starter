import Link from "next/link";

import type { Metadata } from "next";

import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Your orders",
  description: "Track, return, or reorder items from your past Bhalow orders.",
  robots: { index: false, follow: false },
};

export default function OrdersPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 lg:px-8 lg:py-12">
      <header className="mb-6 flex flex-col gap-1">
        <h1 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">
          Your orders
        </h1>
        <p className="text-muted-foreground text-sm">
          Track shipments, start a return, or reorder items.
        </p>
      </header>

      <section
        aria-labelledby="orders-empty"
        className="border-border bg-card flex flex-col items-center gap-4 rounded-lg border px-6 py-16 text-center"
      >
        <h2 id="orders-empty" className="text-foreground text-lg font-semibold">
          No orders yet
        </h2>
        <p className="text-muted-foreground max-w-sm text-sm">
          When you place your first order, it&apos;ll show up here with tracking
          and return options.
        </p>
        <Link href="/" className={buttonVariants({ size: "lg" })}>
          Start shopping
        </Link>
      </section>
    </div>
  );
}
