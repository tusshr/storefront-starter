import type { Money } from "@/lib/types/product";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

const compact = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1,
});

export function formatMoney(m: Money | undefined) {
  if (!m) return "";
  return usd.format(m.amount);
}

export function formatCount(n: number) {
  return compact.format(n);
}
