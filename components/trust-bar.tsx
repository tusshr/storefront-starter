import {
  CustomerSupportIcon,
  ReturnRequestIcon,
  Timer02Icon,
  TruckIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";

type Item = { icon: IconSvgElement; title: string; copy: string };

const items: Item[] = [
  { icon: TruckIcon, title: "Free shipping", copy: "On US orders over $50" },
  { icon: ReturnRequestIcon, title: "Easy returns", copy: "30-day, no hassle" },
  { icon: Timer02Icon, title: "Fast delivery", copy: "2–5 business days" },
  { icon: CustomerSupportIcon, title: "Real support", copy: "Chat, email, phone" },
];

export function TrustBar() {
  return (
    <section
      aria-label="Service highlights"
      className="border-y border-border bg-muted/40"
    >
      <ul
        role="list"
        className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-6 sm:grid-cols-4 lg:px-8"
      >
        {items.map((item) => (
          <li key={item.title} className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="flex size-9 shrink-0 items-center justify-center rounded-md bg-background text-foreground ring-1 ring-border"
            >
              <HugeiconsIcon icon={item.icon} strokeWidth={2} />
            </span>
            <span className="flex flex-col">
              <span className="text-sm font-medium text-foreground">
                {item.title}
              </span>
              <span className="text-xs text-muted-foreground">{item.copy}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
