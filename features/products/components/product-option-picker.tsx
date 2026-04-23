import Link from "next/link";

import type { ProductOption } from "@/features/products/types";
import { cn } from "@/lib/utils";

type Props = {
  option: ProductOption;
  selected: string | undefined;
  basePath: string;
  currentParams: Record<string, string>;
};

function hrefWith(
  basePath: string,
  currentParams: Record<string, string>,
  key: string,
  value: string
): string {
  const next = new URLSearchParams(currentParams);
  next.set(key, value);
  return `${basePath}?${next.toString()}`;
}

export function ProductOptionPicker({
  option,
  selected,
  basePath,
  currentParams,
}: Props) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="text-foreground flex items-baseline gap-2 text-sm font-medium">
        <span>{option.name}</span>
        {selected && (
          <span className="text-muted-foreground text-xs">{selected}</span>
        )}
      </legend>
      <ul role="list" className="flex flex-wrap gap-2">
        {option.values.map((value) => {
          const isSelected = selected === value;
          const urlKey = option.name.toLowerCase();
          const href = hrefWith(basePath, currentParams, urlKey, value);
          return (
            <li key={value}>
              <Link
                href={href}
                scroll={false}
                replace
                aria-pressed={isSelected}
                className={cn(
                  "inline-flex h-9 min-w-11 items-center justify-center rounded-md border px-3 text-xs font-medium transition-colors",
                  isSelected
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-card text-foreground hover:border-foreground/40"
                )}
              >
                {value}
              </Link>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
}
