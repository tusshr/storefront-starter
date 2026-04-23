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
      className="text-foreground hover:bg-muted focus-visible:ring-ring/30 relative inline-flex size-10 items-center justify-center rounded-md transition-colors focus-visible:ring-2 focus-visible:outline-none"
    >
      <HugeiconsIcon icon={ShoppingBag03Icon} strokeWidth={2} />
      {count > 0 && (
        <span
          aria-hidden="true"
          className="bg-primary text-primary-foreground absolute -top-0.5 -right-0.5 inline-flex min-w-4 items-center justify-center rounded-full px-1 text-[10px] leading-4 font-semibold"
        >
          {formatCount(count)}
        </span>
      )}
    </Link>
  );
}
