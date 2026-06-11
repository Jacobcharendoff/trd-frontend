/**
 * Static product data fallback (used when Shopify API is unavailable)
 * TODO: This file should be populated with actual product data
 */

export type ProductCategory = 'Pedalboards' | 'Cables & Patch Cables' | 'Switching & Electronics' | 'Services' | 'Accessories';

export interface StaticProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  category: ProductCategory;
  priceMin: number;
  priceMax: number;
}

export const categories: ProductCategory[] = [
  'Pedalboards',
  'Cables & Patch Cables',
  'Switching & Electronics',
  'Services',
  'Accessories',
];

export const products: StaticProduct[] = [];

export function getPriceDisplay(min: number, max: number): string {
  if (min === max) {
    return min % 1 === 0 ? `$${min.toFixed(0)}` : `$${min.toFixed(2)}`;
  }
  const minStr = min % 1 === 0 ? `$${min.toFixed(0)}` : `$${min.toFixed(2)}`;
  const maxStr = max % 1 === 0 ? `$${max.toFixed(0)}` : `$${max.toFixed(2)}`;
  return `${minStr} – ${maxStr}`;
}
