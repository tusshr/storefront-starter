import type { Category } from "@/lib/types/category";

export const categories: Category[] = [
  { id: "c-mens", name: "Men's", parentId: null, icon: "ManIcon", homepageVisible: true },
  { id: "c-womens", name: "Women's", parentId: null, icon: "WomanIcon", homepageVisible: true },
  { id: "c-jewelry", name: "Jewelry", parentId: null, icon: "DiamondIcon", homepageVisible: true },
  { id: "c-perfume", name: "Perfume", parentId: null, icon: "FlowerIcon", homepageVisible: true },
  { id: "c-watches", name: "Watches", parentId: null, icon: "Clock01Icon", homepageVisible: true },
  { id: "c-bags", name: "Bags", parentId: null, icon: "ShoppingBag03Icon", homepageVisible: true },
  { id: "c-shoes", name: "Shoes", parentId: null, icon: "RunningShoesIcon", homepageVisible: true },
  { id: "c-beauty", name: "Beauty", parentId: null, icon: "PaintBrush02Icon", homepageVisible: true },

  { id: "c-mens-tops", name: "Tops", parentId: "c-mens", icon: null, homepageVisible: false },
  { id: "c-mens-tshirts", name: "T-Shirts", parentId: "c-mens-tops", icon: null, homepageVisible: false },
  { id: "c-mens-shirts", name: "Shirts", parentId: "c-mens-tops", icon: null, homepageVisible: false },
  { id: "c-mens-jackets", name: "Jackets", parentId: "c-mens-tops", icon: null, homepageVisible: false },
  { id: "c-mens-bottoms", name: "Bottoms", parentId: "c-mens", icon: null, homepageVisible: false },
  { id: "c-mens-jeans", name: "Jeans", parentId: "c-mens-bottoms", icon: null, homepageVisible: false },
  { id: "c-mens-shorts", name: "Shorts", parentId: "c-mens-bottoms", icon: null, homepageVisible: false },

  { id: "c-womens-dresses", name: "Dresses", parentId: "c-womens", icon: null, homepageVisible: false },
  { id: "c-womens-tops", name: "Tops", parentId: "c-womens", icon: null, homepageVisible: false },
  { id: "c-womens-bottoms", name: "Bottoms", parentId: "c-womens", icon: null, homepageVisible: false },
  { id: "c-womens-activewear", name: "Activewear", parentId: "c-womens", icon: null, homepageVisible: false },

  { id: "c-jewelry-rings", name: "Rings", parentId: "c-jewelry", icon: null, homepageVisible: false },
  { id: "c-jewelry-earrings", name: "Earrings", parentId: "c-jewelry", icon: null, homepageVisible: false },
  { id: "c-jewelry-necklaces", name: "Necklaces", parentId: "c-jewelry", icon: null, homepageVisible: false },

  { id: "c-perfume-women", name: "For Her", parentId: "c-perfume", icon: null, homepageVisible: false },
  { id: "c-perfume-men", name: "For Him", parentId: "c-perfume", icon: null, homepageVisible: false },

  { id: "c-watches-analog", name: "Analog", parentId: "c-watches", icon: null, homepageVisible: false },
  { id: "c-watches-smart", name: "Smart", parentId: "c-watches", icon: null, homepageVisible: false },

  { id: "c-bags-backpacks", name: "Backpacks", parentId: "c-bags", icon: null, homepageVisible: false },
  { id: "c-bags-handbags", name: "Handbags", parentId: "c-bags", icon: null, homepageVisible: false },

  { id: "c-shoes-sneakers", name: "Sneakers", parentId: "c-shoes", icon: null, homepageVisible: false },
  { id: "c-shoes-formal", name: "Formal", parentId: "c-shoes", icon: null, homepageVisible: false },
  { id: "c-shoes-boots", name: "Boots", parentId: "c-shoes", icon: null, homepageVisible: false },

  { id: "c-beauty-skincare", name: "Skincare", parentId: "c-beauty", icon: null, homepageVisible: false },
  { id: "c-beauty-makeup", name: "Makeup", parentId: "c-beauty", icon: null, homepageVisible: false },
  { id: "c-beauty-haircare", name: "Haircare", parentId: "c-beauty", icon: null, homepageVisible: false },
];

export function getHomepageCategories() {
  return categories.filter((c) => c.homepageVisible);
}

export function getChildren(parentId: string | null) {
  return categories.filter((c) => c.parentId === parentId);
}

export function getRoots() {
  return categories.filter((c) => c.parentId === null);
}
