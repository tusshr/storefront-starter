import { cookies } from "next/headers";

import type { Money } from "@/lib/types/money";

export type CartLine = {
  id: string;
  slug: string;
  title: string;
  image: string;
  options: string[];
  quantity: number;
  price: Money;
  inStock: boolean;
};

type CartLineMeta = Omit<CartLine, "quantity">;

const COOKIE = "bhalow_cart";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

const catalog: CartLineMeta[] = [
  {
    id: "l-1",
    slug: "classic-hoodie",
    title: "Classic Hoodie",
    image: "https://picsum.photos/seed/hoodie/200/200",
    options: ["Black", "Medium"],
    price: { amount: 45, currency: "USD" },
    inStock: true,
  },
  {
    id: "l-2",
    slug: "denim-jacket",
    title: "Denim Jacket",
    image: "https://picsum.photos/seed/jacket/200/200",
    options: ["Blue", "Large"],
    price: { amount: 80, currency: "USD" },
    inStock: false,
  },
  {
    id: "l-3",
    slug: "slim-fit-jeans",
    title:
      "Samsung Galaxy S25 FE Cell Phone (2025), 256GB AI Smartphone, Unlocked Android, Large Display, 4900mAh Battery, High Res-Camera, AI Photo Edits, Durable, US 1 Yr Warranty, Navy",
    image: "https://picsum.photos/seed/jeans/200/200",
    options: ["Dark Wash", "32"],
    price: { amount: 50, currency: "USD" },
    inStock: true,
  },
];

const DEFAULT_QUANTITIES: Record<string, number> = Object.fromEntries(
  catalog.map((line) => [line.id, 1])
);

export async function readCart(): Promise<Record<string, number>> {
  const store = await cookies();
  const raw = store.get(COOKIE)?.value;
  if (!raw) return { ...DEFAULT_QUANTITIES };
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return { ...DEFAULT_QUANTITIES };
    const result: Record<string, number> = {};
    for (const [id, qty] of Object.entries(parsed as Record<string, unknown>)) {
      if (typeof qty === "number" && Number.isFinite(qty) && qty > 0) {
        result[id] = Math.floor(qty);
      }
    }
    return result;
  } catch {
    return { ...DEFAULT_QUANTITIES };
  }
}

export async function writeCart(state: Record<string, number>) {
  const store = await cookies();
  store.set(COOKIE, JSON.stringify(state), {
    path: "/",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
  });
}

export async function getCartLines(): Promise<CartLine[]> {
  const quantities = await readCart();
  return catalog
    .filter((line) => (quantities[line.id] ?? 0) > 0)
    .map((line) => ({ ...line, quantity: quantities[line.id] }));
}
