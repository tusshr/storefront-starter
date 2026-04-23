import Link from "next/link";

import type { Category } from "@/lib/types/category";

type Props = {
  chain: Category[];
  productTitle: string;
};

function slugChain(chain: Category[]): string {
  return `/c/${chain.map((c) => c.name.toLowerCase().replace(/[^\w]+/g, "-")).join("/")}`;
}

export function ProductBreadcrumbs({ chain, productTitle }: Props) {
  return (
    <nav aria-label="Breadcrumb" className="text-muted-foreground text-xs">
      <ol role="list" className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
        </li>
        {chain.map((cat, i) => (
          <li key={cat.id} className="flex items-center gap-1.5">
            <span aria-hidden="true">/</span>
            <Link
              href={slugChain(chain.slice(0, i + 1))}
              className="hover:text-foreground transition-colors"
            >
              {cat.name}
            </Link>
          </li>
        ))}
        <li className="flex items-center gap-1.5">
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="text-foreground line-clamp-1">
            {productTitle}
          </span>
        </li>
      </ol>
    </nav>
  );
}
