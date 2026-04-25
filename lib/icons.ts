import type { Icon } from "@phosphor-icons/react";
import {
  DiamondIcon,
  DressIcon,
  FlowerIcon,
  PaintBrushIcon,
  ShoppingBagIcon,
  SneakerIcon,
  TShirtIcon,
  WatchIcon,
} from "@phosphor-icons/react/dist/ssr";

const map: Record<string, Icon> = {
  TShirtIcon,
  DressIcon,
  DiamondIcon,
  FlowerIcon,
  WatchIcon,
  ShoppingBagIcon,
  SneakerIcon,
  PaintBrushIcon,
};

export function resolveIcon(key: string | null): Icon | null {
  if (!key) return null;
  return map[key] ?? null;
}
