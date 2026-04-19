import Link from "next/link";

import { ShoppingBag03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { formatCount } from "@/lib/format";

// TODO: replace with Redis-backed count once cart service exists.
const MOCK_CART_COUNT: number = 0;

export function CartButton() {
  const count = MOCK_CART_COUNT;
  return (
    <Link
      href="/cart"
      aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`}
      className="relative inline-flex size-10 items-center justify-center rounded-md text-foreground transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:outline-none"
    >
      <HugeiconsIcon icon={ShoppingBag03Icon} strokeWidth={2} />
      {count > 0 && (
        <span
          aria-hidden="true"
          className="absolute -top-0.5 -right-0.5 inline-flex min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] leading-4 font-semibold text-primary-foreground"
        >
          {formatCount(count)}
        </span>
      )}
    </Link>
  );
}
