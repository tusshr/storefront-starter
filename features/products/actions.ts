"use server";

import { searchProducts as searchProductsQuery } from "./queries";
import type { Product } from "./types";

export async function searchProducts(query: string): Promise<Product[]> {
  return searchProductsQuery(query);
}
