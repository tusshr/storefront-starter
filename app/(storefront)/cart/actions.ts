"use server";

import { revalidatePath } from "next/cache";

import { readCart, writeCart } from "@/lib/cart/cart";

const CART_PATH = "/cart";

export async function updateLine(formData: FormData) {
  const id = String(formData.get("lineId") ?? "");
  if (!id) return;

  const op = formData.get("op");
  const cart = await readCart();
  const current = cart[id] ?? 0;

  let next: number;
  if (op === "inc") {
    next = current + 1;
  } else if (op === "dec") {
    next = current - 1;
  } else {
    const raw = formData.get("quantity");
    const parsed = Number(raw);
    if (raw === null || raw === "" || !Number.isFinite(parsed)) return;
    next = Math.floor(parsed);
  }

  if (next <= 0) {
    delete cart[id];
  } else {
    cart[id] = next;
  }

  await writeCart(cart);
  revalidatePath(CART_PATH);
}

export async function removeLine(formData: FormData) {
  const id = String(formData.get("lineId") ?? "");
  if (!id) return;

  const cart = await readCart();
  delete cart[id];
  await writeCart(cart);
  revalidatePath(CART_PATH);
}
