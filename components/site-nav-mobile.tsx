"use client";

import Link from "next/link";
import { useState } from "react";

import { ArrowDown01Icon, Menu01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { categories, getChildren, getRoots } from "@/lib/mock/categories";
import type { Category } from "@/lib/types/category";
import { cn } from "@/lib/utils";

function slugFor(cat: Category): string {
  const parts: string[] = [];
  let current: Category | undefined = cat;
  while (current) {
    parts.unshift(current.name.toLowerCase().replace(/[^\w]+/g, "-"));
    current = categories.find((c) => c.id === current?.parentId);
  }
  return `/c/${parts.join("/")}`;
}

function RootItem({
  root,
  onNavigate,
}: {
  root: Category;
  onNavigate: () => void;
}) {
  const children = getChildren(root.id!);
  const [open, setOpen] = useState(false);
  const hasChildren = children.length > 0;

  return (
    <li className="border-border/60 border-b last:border-b-0">
      <div className="flex items-center">
        <Link
          href={slugFor(root)}
          onClick={onNavigate}
          className="text-foreground flex-1 py-3 text-sm font-medium"
        >
          {root.name}
        </Link>
        {hasChildren && (
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-expanded={open}
            aria-label={open ? `Collapse ${root.name}` : `Expand ${root.name}`}
            onClick={() => setOpen((v) => !v)}
          >
            <HugeiconsIcon
              icon={ArrowDown01Icon}
              strokeWidth={2}
              className={cn("transition-transform", open && "rotate-180")}
            />
          </Button>
        )}
      </div>
      {hasChildren && open && (
        <ul className="flex flex-col gap-0.5 pb-2 pl-3">
          {children.map((child) => (
            <li key={child.id}>
              <Link
                href={slugFor(child)}
                onClick={onNavigate}
                className="text-muted-foreground hover:text-foreground block rounded-md py-1.5 text-xs"
              >
                {child.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export function SiteNavMobile() {
  const [open, setOpen] = useState(false);
  const roots = getRoots();
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon-lg"
            aria-label="Open navigation menu"
          />
        }
      >
        <HugeiconsIcon icon={Menu01Icon} strokeWidth={2} />
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0">
        <SheetHeader>
          <SheetTitle>Bhalow</SheetTitle>
          <SheetDescription>Browse the catalog</SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-4 pb-6">
          <nav aria-label="Mobile">
            <ul className="flex flex-col">
              <li>
                <SheetClose
                  render={
                    <Link
                      href="/"
                      className="text-foreground flex py-3 text-sm font-medium"
                    >
                      Home
                    </Link>
                  }
                />
              </li>
              {roots.map((root) => (
                <RootItem key={root.id} root={root} onNavigate={close} />
              ))}
              <li>
                <SheetClose
                  render={
                    <Link
                      href="/deals"
                      className="text-destructive flex py-3 text-sm font-medium"
                    >
                      Hot Offers
                    </Link>
                  }
                />
              </li>
              <li>
                <SheetClose
                  render={
                    <Link
                      href="/blog"
                      className="text-foreground flex py-3 text-sm font-medium"
                    >
                      Blog
                    </Link>
                  }
                />
              </li>
            </ul>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
