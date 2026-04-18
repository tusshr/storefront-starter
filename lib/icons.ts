import {
  Clock01Icon,
  DiamondIcon,
  FlowerIcon,
  ManIcon,
  PaintBrush02Icon,
  RunningShoesIcon,
  ShoppingBag03Icon,
  WomanIcon,
} from "@hugeicons/core-free-icons";
import type { IconSvgElement } from "@hugeicons/react";

const map: Record<string, IconSvgElement> = {
  ManIcon,
  WomanIcon,
  DiamondIcon,
  FlowerIcon,
  Clock01Icon,
  ShoppingBag03Icon,
  RunningShoesIcon,
  PaintBrush02Icon,
};

export function resolveIcon(key: string | null): IconSvgElement | null {
  if (!key) return null;
  return map[key] ?? null;
}
