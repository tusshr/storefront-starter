import type { Money } from "@/lib/types/money";

export type OrderStatus =
  | "placed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "returned";

export type OrderItem = {
  productId: string;
  productSlug: string;
  variantId?: string;
  title: string;
  brand?: string;
  image: string;
  optionLabel?: string;
  unitPrice: Money;
  quantity: number;
};

export type ShippingAddress = {
  name: string;
  line1: string;
  line2?: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
};

export type Order = {
  id: string;
  number: string;
  placedAt: string;
  status: OrderStatus;
  estimatedDeliveryAt?: string;
  deliveredAt?: string;
  trackingNumber?: string;
  carrier?: string;
  items: OrderItem[];
  subtotal: Money;
  shipping: Money;
  tax: Money;
  total: Money;
  shipTo: ShippingAddress;
};
