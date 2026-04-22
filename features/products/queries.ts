import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import type { Product } from "./types";

function img(seed: string, w = 640, h = 640) {
  return `https://picsum.photos/seed/${seed}/${w}/${h}`;
}

const products: Product[] = [
  {
    id: "p-001",
    slug: "relaxed-short-sleeve-tee",
    title: "Relaxed Short Sleeve Tee",
    brand: "Bhalow Basics",
    categoryId: "c-mens-tshirts",
    images: [img("tee1"), img("tee1-b")],
    rating: { value: 4.6, count: 182 },
    price: { amount: 24.0, currency: "USD" },
    compareAtPrice: { amount: 32.0, currency: "USD" },
    stock: 87,
  },
  {
    id: "p-002",
    slug: "embroidered-pink-hoodie",
    title: "Embroidered Pink Hoodie",
    brand: "Bhalow Basics",
    categoryId: "c-womens-tops",
    images: [img("hoodie1")],
    rating: { value: 4.8, count: 341 },
    options: [
      { id: "size", name: "Size", values: ["XS", "S", "M", "L", "XL"] },
      { id: "color", name: "Color", values: ["Pink", "Cream"] },
    ],
    variants: [
      { id: "v-p002-s-pink", sku: "H1-S-PNK", optionValues: { Size: "S", Color: "Pink" }, price: { amount: 61.0, currency: "USD" }, compareAtPrice: { amount: 79.0, currency: "USD" }, stock: 14 },
      { id: "v-p002-m-pink", sku: "H1-M-PNK", optionValues: { Size: "M", Color: "Pink" }, price: { amount: 61.0, currency: "USD" }, compareAtPrice: { amount: 79.0, currency: "USD" }, stock: 9 },
      { id: "v-p002-m-cream", sku: "H1-M-CRM", optionValues: { Size: "M", Color: "Cream" }, price: { amount: 64.0, currency: "USD" }, stock: 3 },
    ],
  },
  {
    id: "p-003",
    slug: "black-floral-wrap-midi-dress",
    title: "Black Floral Wrap Midi Dress",
    brand: "Maison Noir",
    categoryId: "c-womens-dresses",
    images: [img("dress1")],
    rating: { value: 4.4, count: 98 },
    price: { amount: 76.0, currency: "USD" },
    compareAtPrice: { amount: 105.0, currency: "USD" },
    stock: 22,
  },
  {
    id: "p-004",
    slug: "pure-garment-dyed-oxford",
    title: "Pure Garment-Dyed Oxford Shirt",
    brand: "Bhalow",
    categoryId: "c-mens-shirts",
    images: [img("oxford1")],
    rating: { value: 4.5, count: 211 },
    price: { amount: 68.0, currency: "USD" },
    stock: 40,
  },
  {
    id: "p-005",
    slug: "running-trekking-shoes",
    title: "Running & Trekking Shoes",
    brand: "Altura",
    categoryId: "c-shoes-sneakers",
    images: [img("sneaker1")],
    rating: { value: 4.7, count: 523 },
    price: { amount: 49.0, currency: "USD" },
    compareAtPrice: { amount: 85.0, currency: "USD" },
    stock: 132,
  },
  {
    id: "p-006",
    slug: "trekking-running-boots",
    title: "Trekking & Running Boots",
    brand: "Altura",
    categoryId: "c-shoes-boots",
    images: [img("boot1")],
    rating: { value: 4.3, count: 76 },
    price: { amount: 78.0, currency: "USD" },
    stock: 18,
  },
  {
    id: "p-007",
    slug: "womens-party-wear-stiletto",
    title: "Women's Party Wear Stilettos",
    brand: "Lustre",
    categoryId: "c-shoes-formal",
    images: [img("stiletto1")],
    rating: { value: 4.2, count: 65 },
    price: { amount: 94.0, currency: "USD" },
    stock: 7,
  },
  {
    id: "p-008",
    slug: "sports-claw-womens",
    title: "Sports Claw — Women's Runner",
    brand: "Altura",
    categoryId: "c-shoes-sneakers",
    images: [img("sports1")],
    rating: { value: 4.5, count: 112 },
    price: { amount: 54.0, currency: "USD" },
    compareAtPrice: { amount: 72.0, currency: "USD" },
    stock: 44,
  },
  {
    id: "p-009",
    slug: "platinum-zircon-classic-ring",
    title: "Platinum Zircon Classic Ring",
    brand: "Sovra",
    categoryId: "c-jewelry-rings",
    images: [img("ring1")],
    rating: { value: 4.9, count: 412 },
    price: { amount: 62.0, currency: "USD" },
    compareAtPrice: { amount: 75.0, currency: "USD" },
    stock: 33,
  },
  {
    id: "p-010",
    slug: "smart-watch-vital-plus",
    title: "Smart Watch Vital Plus",
    brand: "Tempo",
    categoryId: "c-watches-smart",
    images: [img("watch1")],
    rating: { value: 4.6, count: 987 },
    price: { amount: 156.0, currency: "USD" },
    compareAtPrice: { amount: 198.0, currency: "USD" },
    stock: 62,
  },
  {
    id: "p-011",
    slug: "shampoo-conditioner-duo",
    title: "Shampoo + Conditioner Duo",
    brand: "Lumen",
    categoryId: "c-beauty-haircare",
    images: [img("haircare1")],
    rating: { value: 4.4, count: 188 },
    price: { amount: 20.0, currency: "USD" },
    compareAtPrice: { amount: 30.0, currency: "USD" },
    stock: 210,
  },
  {
    id: "p-012",
    slug: "rose-gold-peacock-earring",
    title: "Rose Gold Peacock Earrings",
    brand: "Sovra",
    categoryId: "c-jewelry-earrings",
    images: [img("earring1")],
    rating: { value: 4.7, count: 214 },
    price: { amount: 30.0, currency: "USD" },
    compareAtPrice: { amount: 45.0, currency: "USD" },
    stock: 15,
  },
];

export async function getNewArrivals(): Promise<Product[]> {
  "use cache";
  cacheTag("products");
  cacheLife("hours");
  return products.slice(0, 6);
}

export async function getTrending(): Promise<Product[]> {
  "use cache";
  cacheTag("products");
  cacheLife("hours");
  return [products[4], products[9], products[7], products[1], products[5], products[2]];
}

export async function getTopRated(): Promise<Product[]> {
  "use cache";
  cacheTag("products");
  cacheLife("hours");
  return [...products]
    .filter((p) => p.rating)
    .sort((a, b) => (b.rating?.value ?? 0) - (a.rating?.value ?? 0))
    .slice(0, 6);
}

export async function getDealOfTheDay(): Promise<Product> {
  "use cache";
  cacheTag("products", "products:deal");
  cacheLife("hours");
  return products.find((p) => p.id === "p-009")!;
}

export async function searchProducts(q: string): Promise<Product[]> {
  const query = q.trim().toLowerCase();
  if (!query) return [];
  return products
    .filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        (p.brand?.toLowerCase().includes(query) ?? false)
    )
    .slice(0, 6);
}
