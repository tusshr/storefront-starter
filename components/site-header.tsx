import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import logo from "@/assets/logo/site-logo.png";
import { AccountMenu } from "@/components/account-menu";
import { CartButton } from "@/components/cart-button";
import { SearchTypeahead } from "@/components/search-typeahead";
import { SiteNavMobile } from "@/components/site-nav-mobile";
import { WishlistButton } from "@/components/wishlist-button";

export function SiteHeader() {
  return (
    <header className="border-border bg-background/85 supports-backdrop-filter:bg-background/70 sticky top-0 z-40 w-full border-b backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 lg:px-8">
        <div className="md:hidden">
          <SiteNavMobile />
        </div>

        <Link
          href="/"
          aria-label="Bhalow — home"
          className="focus-visible:ring-ring/30 shrink-0 rounded-md focus-visible:ring-2 focus-visible:outline-none"
        >
          <Image
            src={logo}
            alt="Bhalow"
            height={32}
            priority
            placeholder="blur"
            className="h-8 w-auto"
            loading="eager"
          />
        </Link>

        <div className="hidden flex-1 md:flex">
          <SearchTypeahead />
        </div>

        <div className="ml-auto flex items-center gap-0.5 md:gap-1">
          <div className="hidden md:inline-flex">
            <Suspense fallback={<div className="size-10" />}>
              <AccountMenu />
            </Suspense>
          </div>
          <div className="hidden md:inline-flex">
            <WishlistButton />
          </div>
          <CartButton />
          {/* <ThemeToggle /> */}
        </div>
      </div>

      <div className="px-4 pb-3 md:hidden">
        <SearchTypeahead />
      </div>
    </header>
  );
}
