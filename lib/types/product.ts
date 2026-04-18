export type Money = { amount: number; currency: "USD" };

export type ProductOption = {
  id: string;
  name: string;
  values: string[];
};

export type ProductVariant = {
  id: string;
  sku: string;
  optionValues: Record<string, string>;
  price: Money;
  compareAtPrice?: Money;
  stock: number;
  image?: string;
};

export type Product = {
  id: string;
  slug: string;
  title: string;
  description?: string;
  brand?: string;
  categoryId: string;
  images: string[];
  rating?: { value: number; count: number };
  price?: Money;
  compareAtPrice?: Money;
  stock?: number;
  options?: ProductOption[];
  variants?: ProductVariant[];
};
