import Link from "next/link";

import { HeartIcon } from "@phosphor-icons/react/dist/ssr";

import { formatCount } from "@/lib/format";

// TODO: replace with Redis-backed count once wishlist service exists.
const MOCK_WISHLIST_COUNT: number = 0;

export function WishlistButton() {
  const count = MOCK_WISHLIST_COUNT;
  return (
    <Link
      href="/wishlist"
      aria-label={`Wishlist, ${count} item${count === 1 ? "" : "s"}`}
      className="text-foreground hover:bg-muted focus-visible:ring-ring/30 relative inline-flex size-10 items-center justify-center rounded-md transition-colors focus-visible:ring-2 focus-visible:outline-none"
    >
      <HeartIcon className="size-6" />
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
