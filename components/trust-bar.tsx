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
  {
    icon: CustomerSupportIcon,
    title: "Real support",
    copy: "Chat, email, phone",
  },
];

export function TrustBar() {
  return (
    <section
      aria-label="Service highlights"
      className="border-border bg-muted/40 border-y"
    >
      <ul
        role="list"
        className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-6 sm:grid-cols-4 lg:px-8"
      >
        {items.map((item) => (
          <li key={item.title} className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="bg-background text-foreground ring-border flex size-9 shrink-0 items-center justify-center rounded-md ring-1"
            >
              <HugeiconsIcon icon={item.icon} strokeWidth={2} />
            </span>
            <span className="flex flex-col">
              <span className="text-foreground text-sm font-medium">
                {item.title}
              </span>
              <span className="text-muted-foreground text-xs">{item.copy}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
