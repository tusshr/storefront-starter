import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import type { Product, ProductVariant } from "./types";

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
    description:
      "<p>A wardrobe anchor you'll reach for weekly. The <strong>Relaxed Short Sleeve Tee</strong> is cut from 240gsm combed cotton — heavy enough to skim the body without clinging, soft enough to sleep in.</p><h3>What makes it good</h3><ul><li>Ribbed crew neck holds its shape through repeated washes.</li><li>Side-seamed construction, no twisting after the first wash.</li><li>Drop shoulder for an easy, modern silhouette.</li></ul><p>Pre-shrunk and garment-washed. Machine wash cold, tumble dry low.</p>",
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
    description:
      "<p>Heavyweight fleece with tonal chain-stitch embroidery across the chest. Designed for oversized wear — size down for a closer fit.</p><h3>Details</h3><ul><li>500gsm brushed-back cotton blend (80% cotton, 20% poly).</li><li>Double-lined hood with flat drawcords that won't fray.</li><li>Kangaroo pocket with a hidden phone slip inside.</li></ul><p>Wash cold, hang dry. Do not iron embroidery.</p>",
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
    description:
      "<p>A true wrap, not a fake one — the <strong>Floral Wrap Midi</strong> ties at the waist for a fit you actually control. Printed on lightweight viscose that falls like silk and travels like a dream.</p><h3>Fit notes</h3><ul><li>True to size. Model (5'8\") wears a size S.</li><li>V-neckline, ¾ sleeves, self-tie at the waist.</li><li>Fully lined bodice.</li></ul><p>Dry clean recommended.</p>",
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
    description:
      "<p>A proper oxford, dyed after it's sewn so the color settles into the weave instead of sitting on top. The result: a slightly uneven, lived-in finish that only gets better with wear.</p><h3>Construction</h3><ul><li>100% long-staple American cotton oxford.</li><li>Button-down collar, single-needle side seams.</li><li>Locker loop at the back yoke.</li></ul><p>Machine washable. Expect a touch of softening and shrinkage on first wash — by design.</p>",
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
    description:
      "<p>A do-it-all trainer built for mixed surfaces — road, trail, or the long walk home. The <strong>Altura Running & Trekking</strong> stays grippy on wet rock and cushioned on asphalt.</p><h3>Tech</h3><ul><li>Dual-density EVA midsole for impact absorption.</li><li>Lugged rubber outsole with 4mm bite.</li><li>Breathable engineered mesh upper, reinforced toe cap.</li></ul><p>Runs a half-size large. Consider sizing down if you're between sizes.</p>",
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
    description:
      "<p>Mid-cut support for days that go longer than you planned. Waterproof membrane, aggressive tread, and a heel lock that keeps you stable on descents.</p><h3>Built for</h3><ul><li>Day hikes up to 20 km with a moderate pack.</li><li>Wet conditions and stream crossings.</li><li>Ankle support without the clunk of a full boot.</li></ul><p>Treat with a wax-based conditioner every ~100 km of use.</p>",
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
    description:
      "<p>A 95mm stiletto that you can actually stand in. Padded insole, reinforced shank, and a subtly flared heel for balance you don't have to think about.</p><h3>The details</h3><ul><li>Pointed almond toe.</li><li>Italian calf leather upper, leather-lined.</li><li>Non-slip rubber tip on the heel.</li></ul><p>Store on a shoe tree between wears to preserve the toe shape.</p>",
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
    description:
      "<p>Lightweight, springy, and quiet underfoot. The <strong>Sports Claw</strong> is tuned for tempo runs and the kind of long easy miles where you want the shoe to disappear.</p><h3>Feel</h3><ul><li>28mm stack height, 8mm drop.</li><li>Nitrogen-infused foam — returns energy without mushy landings.</li><li>Seamless knit upper, no hot spots.</li></ul><p>Rotate with a heavier trainer to extend foam life.</p>",
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
    description:
      "<p>A classic solitaire, re-cut for everyday wear. Hand-set cubic zirconia in a low-profile basket that catches light without catching on sleeves.</p><h3>Specs</h3><ul><li>Rhodium-plated sterling silver band.</li><li>6mm round brilliant-cut center stone.</li><li>Comfort-fit interior.</li></ul><p>Clean with warm soapy water and a soft brush. Avoid chlorine and ultrasonic cleaners.</p>",
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
    description:
      "<p>The sensor stack of a premium wearable in a bezel that actually looks like a watch. Tracks heart rate, SpO₂, sleep stages, and 72 workout modes.</p><h3>Highlights</h3><ul><li>1.43\" AMOLED always-on display.</li><li>14-day battery life in typical use.</li><li>5 ATM water resistance — safe for pool swims.</li></ul><p>Syncs with iOS and Android via the Tempo app. Bands are 22mm quick-release.</p>",
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
    description:
      "<p>A gentle duo built around rice protein and oat extract. Low-lather, sulfate-free, and safe for color-treated hair.</p><h3>Who it's for</h3><ul><li>Fine to medium textures that go flat with heavy conditioners.</li><li>Sensitive scalps and post-color care.</li><li>Daily washers.</li></ul><p>Pair with the Lumen weekly mask for a full routine.</p>",
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
    description:
      "<p>Hand-finished peacock motif in 18k rose gold vermeil. A statement earring that stays lightweight enough to wear all day.</p><h3>Construction</h3><ul><li>925 sterling silver base, 2.5µm rose gold plating.</li><li>Pavé-set crystal accents on the feathers.</li><li>Hypoallergenic posts, silicone backs included.</li></ul><p>Store in the pouch provided to prevent tarnish.</p>",
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

export async function getProductBySlug(slug: string): Promise<Product | null> {
  "use cache";
  cacheTag(`product:${slug}`);
  cacheLife("hours");
  return products.find((p) => p.slug === slug) ?? null;
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

export function resolveSelectedVariant(
  product: Product,
  selected: Record<string, string | undefined>
): ProductVariant | null {
  if (!product.variants?.length || !product.options?.length) return null;
  const match = product.variants.find((v) =>
    product.options!.every((opt) => {
      const picked = selected[opt.name];
      if (!picked) return false;
      return v.optionValues[opt.name] === picked;
    })
  );
  return match ?? null;
}
