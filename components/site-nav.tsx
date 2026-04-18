import Link from "next/link";

import { FireIcon, Tag02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { categories, getChildren, getRoots } from "@/lib/mock/categories";
import type { Category } from "@/lib/types/category";

function slugFor(cat: Category): string {
  const parts: string[] = [];
  let current: Category | undefined = cat;
  while (current) {
    parts.unshift(current.name.toLowerCase().replace(/[^\w]+/g, "-"));
    current = categories.find((c) => c.id === current?.parentId);
  }
  return `/c/${parts.join("/")}`;
}

export function SiteNav() {
  const roots = getRoots();

  return (
    <nav
      aria-label="Primary"
      className="hidden w-full border-b border-border bg-background md:block"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-1 px-4 lg:px-8">
        <NavigationMenu className="flex-1">
          <NavigationMenuList className="justify-start">
            <NavigationMenuItem>
              <NavigationMenuLink render={<Link href="/" />}>Home</NavigationMenuLink>
            </NavigationMenuItem>

            {roots.map((root) => {
              const children = getChildren(root.id!);
              if (children.length === 0) {
                return (
                  <NavigationMenuItem key={root.id}>
                    <NavigationMenuLink render={<Link href={slugFor(root)} />}>
                      {root.name}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              }
              return (
                <NavigationMenuItem key={root.id}>
                  <NavigationMenuTrigger>{root.name}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-lg gap-3 p-3 md:grid-cols-2">
                      <Link
                        href={slugFor(root)}
                        className="col-span-full flex items-center justify-between rounded-md bg-muted/60 px-3 py-2 text-xs font-medium transition-colors hover:bg-muted"
                      >
                        <span>Shop all {root.name}</span>
                        <span aria-hidden="true">→</span>
                      </Link>
                      {children.map((child) => {
                        const grand = getChildren(child.id!);
                        return (
                          <div key={child.id} className="flex flex-col gap-1">
                            <Link
                              href={slugFor(child)}
                              className="text-xs font-semibold text-foreground hover:text-primary"
                            >
                              {child.name}
                            </Link>
                            {grand.length > 0 && (
                              <ul className="flex flex-col gap-0.5">
                                {grand.map((g) => (
                                  <li key={g.id}>
                                    <Link
                                      href={slugFor(g)}
                                      className="text-xs text-muted-foreground hover:text-foreground"
                                    >
                                      {g.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              );
            })}

            <NavigationMenuItem>
              <NavigationMenuLink render={<Link href="/blog" />}>Blog</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <Link
          href="/deals"
          className="inline-flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium text-destructive transition-colors hover:bg-destructive/10"
        >
          <HugeiconsIcon icon={FireIcon} strokeWidth={2} className="size-4" />
          Hot Offers
        </Link>
        <Link
          href="/new"
          className="inline-flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium text-foreground transition-colors hover:bg-muted"
        >
          <HugeiconsIcon icon={Tag02Icon} strokeWidth={2} className="size-4" />
          New Arrivals
        </Link>
      </div>
    </nav>
  );
}
