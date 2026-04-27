"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  HeartIcon,
  HouseIcon,
  ShoppingBagIcon,
  UserIcon,
} from "@phosphor-icons/react/dist/ssr";

import { cn } from "@/lib/utils";

const items = [
  { href: "/", label: "Home", icon: HouseIcon },
  { href: "/wishlist", label: "Wishlist", icon: HeartIcon },
  { href: "/cart", label: "Cart", icon: ShoppingBagIcon },
  { href: "/account", label: "Account", icon: UserIcon },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteDock() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Quick"
      className="fixed inset-x-0 bottom-3 z-40 flex justify-center px-4 pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <ul className="border-border bg-background/85 supports-backdrop-filter:bg-background/70 flex w-full max-w-md items-center gap-1 rounded-lg border p-1 shadow-lg backdrop-blur">
        {items.map(({ href, label, icon: Icon }) => {
          const active = isActive(pathname, href);
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "text-muted-foreground hover:text-foreground focus-visible:ring-ring/30 inline-flex w-full flex-col items-center justify-center gap-0.5 rounded-md py-1.5 text-[10px] font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none",
                  active && "text-primary"
                )}
              >
                <Icon className="size-5" weight={active ? "fill" : "regular"} />
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
