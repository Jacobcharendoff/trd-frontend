/**
 * GA4 E-Commerce Analytics
 *
 * Type-safe helpers for firing Google Analytics 4 e-commerce events.
 * Follows GA4's recommended e-commerce event schema:
 * https://developers.google.com/analytics/devguides/collection/ga4/ecommerce
 *
 * Events: view_item, add_to_cart, begin_checkout, purchase
 */

/* ── Types ── */

export interface GA4Item {
  item_id: string;
  item_name: string;
  price: number;
  quantity: number;
  item_variant?: string;
  item_category?: string;
  discount?: number;
}

interface EcommerceEventParams {
  currency: string;
  value: number;
  items: GA4Item[];
}

interface PurchaseParams extends EcommerceEventParams {
  transaction_id: string;
  shipping?: number;
  tax?: number;
}

/* ── Helpers ── */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function gtag(...args: unknown[]) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag(...args);
  }
}

/**
 * Build a GA4 item from Shopify product data.
 */
export function buildGA4Item(
  product: {
    id: string;
    title: string;
  },
  variant: {
    id: string;
    title: string;
    price: { amount: string };
    compareAtPrice?: { amount: string } | null;
  },
  quantity: number = 1
): GA4Item {
  const price = parseFloat(variant.price.amount);
  const compareAt = variant.compareAtPrice
    ? parseFloat(variant.compareAtPrice.amount)
    : 0;
  const discount = compareAt > price ? compareAt - price : 0;

  return {
    item_id: variant.id,
    item_name: product.title,
    item_variant: variant.title !== 'Default Title' ? variant.title : undefined,
    price,
    quantity,
    ...(discount > 0 ? { discount } : {}),
  };
}

/* ── E-Commerce Events ── */

/**
 * Fire when a user views a product detail page.
 */
export function trackViewItem(item: GA4Item) {
  gtag('event', 'view_item', {
    currency: 'USD',
    value: item.price * item.quantity,
    items: [item],
  });
}

/**
 * Fire when a user clicks "Buy Now" / adds to cart.
 */
export function trackAddToCart(item: GA4Item) {
  gtag('event', 'add_to_cart', {
    currency: 'USD',
    value: item.price * item.quantity,
    items: [item],
  });
}

/**
 * Fire right before redirecting to Shopify checkout.
 */
export function trackBeginCheckout(items: GA4Item[]) {
  const value = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  gtag('event', 'begin_checkout', {
    currency: 'USD',
    value,
    items,
  });
}

/**
 * Fire on purchase completion (used by Shopify Custom Pixel).
 * Not called from the headless frontend — included here for type reference.
 */
export function trackPurchase(params: PurchaseParams) {
  gtag('event', 'purchase', params);
}
