import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import type { Order } from "./types";

function img(seed: string, w = 320, h = 320) {
  return `https://picsum.photos/seed/${seed}/${w}/${h}`;
}

const orders: Order[] = [
  {
    id: "ord_01HZX8K2",
    number: "BH-100432",
    placedAt: "2026-04-22T17:14:00.000Z",
    status: "shipped",
    estimatedDeliveryAt: "2026-05-02T00:00:00.000Z",
    trackingNumber: "1Z999AA10123456784",
    carrier: "UPS",
    items: [
      {
        productId: "p-002",
        productSlug: "embroidered-pink-hoodie",
        variantId: "v-p002-m-pink",
        title: "Embroidered Pink Hoodie",
        brand: "Bhalow Basics",
        image: img("hoodie1"),
        optionLabel: "Size M · Color Pink",
        unitPrice: { amount: 61.0, currency: "USD" },
        quantity: 1,
      },
      {
        productId: "p-005",
        productSlug: "running-trekking-shoes",
        title: "Running & Trekking Shoes",
        brand: "Altura",
        image: img("sneaker1"),
        unitPrice: { amount: 49.0, currency: "USD" },
        quantity: 1,
      },
    ],
    subtotal: { amount: 110.0, currency: "USD" },
    shipping: { amount: 0, currency: "USD" },
    tax: { amount: 9.35, currency: "USD" },
    total: { amount: 119.35, currency: "USD" },
    shipTo: {
      name: "Mohsin Ahmed",
      line1: "1820 Mission Street",
      line2: "Apt 4B",
      city: "San Francisco",
      region: "CA",
      postalCode: "94103",
      country: "US",
    },
  },
  {
    id: "ord_01HZW1A6",
    number: "BH-100388",
    placedAt: "2026-04-09T10:02:00.000Z",
    status: "delivered",
    deliveredAt: "2026-04-14T22:41:00.000Z",
    trackingNumber: "9400110200883123456789",
    carrier: "USPS",
    items: [
      {
        productId: "p-009",
        productSlug: "platinum-zircon-classic-ring",
        title: "Platinum Zircon Classic Ring",
        brand: "Sovra",
        image: img("ring1"),
        unitPrice: { amount: 62.0, currency: "USD" },
        quantity: 1,
      },
    ],
    subtotal: { amount: 62.0, currency: "USD" },
    shipping: { amount: 5.99, currency: "USD" },
    tax: { amount: 5.27, currency: "USD" },
    total: { amount: 73.26, currency: "USD" },
    shipTo: {
      name: "Mohsin Ahmed",
      line1: "1820 Mission Street",
      line2: "Apt 4B",
      city: "San Francisco",
      region: "CA",
      postalCode: "94103",
      country: "US",
    },
  },
  {
    id: "ord_01HZQ4F9",
    number: "BH-100271",
    placedAt: "2026-03-18T19:45:00.000Z",
    status: "delivered",
    deliveredAt: "2026-03-23T15:12:00.000Z",
    items: [
      {
        productId: "p-010",
        productSlug: "smart-watch-vital-plus",
        title: "Smart Watch Vital Plus",
        brand: "Tempo",
        image: img("watch1"),
        unitPrice: { amount: 156.0, currency: "USD" },
        quantity: 1,
      },
      {
        productId: "p-011",
        productSlug: "shampoo-conditioner-duo",
        title: "Shampoo + Conditioner Duo",
        brand: "Lumen",
        image: img("haircare1"),
        unitPrice: { amount: 20.0, currency: "USD" },
        quantity: 2,
      },
    ],
    subtotal: { amount: 196.0, currency: "USD" },
    shipping: { amount: 0, currency: "USD" },
    tax: { amount: 16.66, currency: "USD" },
    total: { amount: 212.66, currency: "USD" },
    shipTo: {
      name: "Mohsin Ahmed",
      line1: "1820 Mission Street",
      city: "San Francisco",
      region: "CA",
      postalCode: "94103",
      country: "US",
    },
  },
  {
    id: "ord_01HZP7B3",
    number: "BH-100204",
    placedAt: "2026-02-28T08:21:00.000Z",
    status: "cancelled",
    items: [
      {
        productId: "p-007",
        productSlug: "womens-party-wear-stiletto",
        title: "Women's Party Wear Stilettos",
        brand: "Lustre",
        image: img("stiletto1"),
        unitPrice: { amount: 94.0, currency: "USD" },
        quantity: 1,
      },
    ],
    subtotal: { amount: 94.0, currency: "USD" },
    shipping: { amount: 5.99, currency: "USD" },
    tax: { amount: 7.99, currency: "USD" },
    total: { amount: 107.98, currency: "USD" },
    shipTo: {
      name: "Mohsin Ahmed",
      line1: "1820 Mission Street",
      city: "San Francisco",
      region: "CA",
      postalCode: "94103",
      country: "US",
    },
  },
];

// TODO: replace mock with drizzle query scoped by userId once orders schema lands.
export async function getOrdersForUser(userId: string): Promise<Order[]> {
  "use cache";
  cacheTag(`orders:user:${userId}`);
  cacheLife("minutes");
  void userId;
  return orders;
}

// TODO: replace mock with drizzle query scoped by userId + orderNumber.
export async function getOrderByNumber(
  userId: string,
  number: string
): Promise<Order | null> {
  "use cache";
  cacheTag(`orders:user:${userId}`, `order:${number}`);
  cacheLife("minutes");
  void userId;
  return orders.find((o) => o.number === number) ?? null;
}
