"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState, useTransition } from "react";

import { Cancel01Icon, Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Button } from "@/components/ui/button";
import { searchProducts } from "@/features/products/actions";
import type { Product } from "@/features/products/types";
import { formatMoney } from "@/lib/format";
import { cn } from "@/lib/utils";

type Suggestion = {
  id: string;
  slug: string;
  title: string;
  brand?: string;
  image: string;
  price: string;
};

function toSuggestions(items: Product[]): Suggestion[] {
  return items.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    brand: p.brand,
    image: p.images[0],
    price:
      formatMoney(p.price ?? p.variants?.[0]?.price) ||
      formatMoney(p.variants?.[0]?.price),
  }));
}

export function SearchTypeahead({ className }: { className?: string }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<Suggestion[]>([]);
  const [active, setActive] = useState(-1);
  const [, startTransition] = useTransition();
  const listId = useId();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    let cancelled = false;
    const t = setTimeout(async () => {
      const items = await searchProducts(query);
      if (cancelled) return;
      startTransition(() => setResults(toSuggestions(items)));
    }, 80);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [query]);

  const submit = (q: string) => {
    const trimmed = q.trim();
    if (!trimmed) return;
    setOpen(false);
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open || results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i <= 0 ? results.length - 1 : i - 1));
    } else if (e.key === "Enter" && active >= 0) {
      e.preventDefault();
      const picked = results[active];
      setOpen(false);
      router.push(`/products/${picked.slug}`);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div ref={wrapperRef} className={cn("relative flex-1", className)}>
      <form
        role="search"
        action="/search"
        method="get"
        onSubmit={(e) => {
          e.preventDefault();
          submit(query);
        }}
        className="relative"
      >
        <label htmlFor={listId} className="sr-only">
          Search products
        </label>
        <HugeiconsIcon
          icon={Search01Icon}
          strokeWidth={2}
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
        />
        <input
          id={listId}
          name="q"
          type="search"
          autoComplete="off"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setActive(-1);
          }}
          onFocus={() => query && setOpen(true)}
          onKeyDown={onKey}
          placeholder="Search products, brands, categories..."
          aria-autocomplete="list"
          aria-controls={open ? `${listId}-list` : undefined}
          aria-expanded={open}
          className="h-10 w-full rounded-md border border-input bg-input/20 px-10 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 dark:bg-input/30"
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Clear search"
            className="absolute top-1/2 right-2 -translate-y-1/2"
            onClick={() => {
              setQuery("");
              setResults([]);
              setOpen(false);
            }}
          >
            <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} />
          </Button>
        )}
      </form>

      {open && results.length > 0 && (
        <ul
          id={`${listId}-list`}
          role="listbox"
          className="absolute top-full right-0 left-0 z-50 mt-1 max-h-96 overflow-auto rounded-lg border border-border bg-popover p-1 shadow-lg"
        >
          {results.map((r, i) => (
            <li key={r.id}>
              <button
                type="button"
                role="option"
                aria-selected={i === active}
                onMouseEnter={() => setActive(i)}
                onClick={() => {
                  setOpen(false);
                  router.push(`/products/${r.slug}`);
                }}
                className={cn(
                  "flex w-full items-center gap-3 rounded-md px-2 py-1.5 text-left text-sm transition-colors",
                  i === active
                    ? "bg-muted text-foreground"
                    : "text-popover-foreground hover:bg-muted/60"
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={r.image}
                  alt=""
                  width={36}
                  height={36}
                  className="size-9 shrink-0 rounded object-cover"
                />
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate">{r.title}</span>
                  {r.brand && (
                    <span className="truncate text-xs text-muted-foreground">
                      {r.brand}
                    </span>
                  )}
                </span>
                {r.price && (
                  <span className="shrink-0 text-xs font-medium text-foreground">
                    {r.price}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
