import Image from "next/image";
import Link from "next/link";

import {
  Facebook01Icon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";

import logo from "@/assets/logo/site-logo.png";
import { ThemeToggle } from "@/components/theme-toggle";

type Column = { title: string; links: { href: string; label: string }[] };

const columns: Column[] = [
  {
    title: "Shop",
    links: [
      { href: "/c/mens", label: "Men's" },
      { href: "/c/womens", label: "Women's" },
      { href: "/c/jewelry", label: "Jewelry" },
      { href: "/c/perfume", label: "Perfume" },
      { href: "/c/watches", label: "Watches" },
      { href: "/c/beauty", label: "Beauty" },
    ],
  },
  {
    title: "Help",
    links: [
      { href: "/help/shipping", label: "Shipping" },
      { href: "/help/returns", label: "Returns" },
      { href: "/help/size-guide", label: "Size guide" },
      { href: "/help/contact", label: "Contact us" },
      { href: "/help/faq", label: "FAQ" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Bhalow" },
      { href: "/careers", label: "Careers" },
      { href: "/press", label: "Press" },
      { href: "/affiliates", label: "Affiliates" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/terms", label: "Terms of service" },
      { href: "/privacy", label: "Privacy policy" },
      { href: "/data-deletion", label: "Data deletion" },
    ],
  },
];

const socials: { href: string; label: string; icon: IconSvgElement }[] = [
  { href: "https://instagram.com/bhalow", label: "Instagram", icon: InstagramIcon },
  { href: "https://facebook.com/bhalow", label: "Facebook", icon: Facebook01Icon },
  { href: "https://twitter.com/bhalow", label: "Twitter", icon: TwitterIcon },
  { href: "https://youtube.com/@bhalow", label: "YouTube", icon: YoutubeIcon },
];

export async function SiteFooter() {
  "use cache";
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-6 lg:px-8">
        <div className="md:col-span-2 md:pr-4">
          <Link href="/" aria-label="Bhalow — home" className="inline-block">
            <Image
              src={logo}
              alt="Bhalow"
              height={32}
              className="h-8 w-auto"
            />
          </Link>
          <p className="mt-3 max-w-xs text-xs text-muted-foreground">
            Bhalow is your online store for fashion, jewelry, beauty, and more —
            shipped across the United States.
          </p>
          <ul role="list" className="mt-4 flex items-center gap-2">
            {socials.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={s.label}
                  className="inline-flex size-9 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:text-foreground"
                >
                  <HugeiconsIcon icon={s.icon} strokeWidth={2} />
                </a>
              </li>
            ))}
          </ul>
        </div>
        {columns.map((col) => (
          <nav key={col.title} aria-labelledby={`footer-${col.title}`}>
            <h3
              id={`footer-${col.title}`}
              className="mb-3 text-xs font-semibold tracking-wider text-foreground uppercase"
            >
              {col.title}
            </h3>
            <ul role="list" className="flex flex-col gap-2">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 px-4 py-4 text-xs text-muted-foreground md:flex-row md:items-center lg:px-8">
          <p>© {year} Bhalow. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <p>Ships within the United States only.</p>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
