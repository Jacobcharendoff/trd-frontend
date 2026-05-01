/**
 * Shopify Custom Pixel — GA4 Purchase Event
 *
 * Paste this script into:
 *   Shopify Admin > Settings > Customer events > Add custom pixel
 *
 * Name it: "GA4 Purchase Tracking"
 * Permission: "Not required"
 *
 * This fires the GA4 'purchase' event when a customer completes checkout.
 * It runs on Shopify's checkout domain, which the headless frontend can't reach.
 *
 * IMPORTANT: Replace GA_MEASUREMENT_ID below with your actual GA4 ID.
 */

// ── Configuration ──
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // TODO: Replace with your GA4 measurement ID

// ── Load gtag ──
const script = document.createElement('script');
script.setAttribute('src', `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`);
script.setAttribute('async', '');
document.head.appendChild(script);

window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag('js', new Date());
gtag('config', GA_MEASUREMENT_ID, { send_page_view: false });

// ── Purchase Event ──
analytics.subscribe('checkout_completed', (event) => {
  const checkout = event.data.checkout;

  const items = checkout.lineItems.map((item) => ({
    item_id: item.variant?.id?.toString() || item.id?.toString(),
    item_name: item.title,
    item_variant: item.variant?.title !== 'Default Title' ? item.variant?.title : undefined,
    price: parseFloat(item.variant?.price?.amount || item.finalLinePrice?.amount || '0'),
    quantity: item.quantity,
  }));

  const value = parseFloat(checkout.totalPrice?.amount || '0');
  const shipping = parseFloat(checkout.shippingLine?.price?.amount || '0');
  const tax = parseFloat(checkout.totalTax?.amount || '0');

  gtag('event', 'purchase', {
    transaction_id: checkout.order?.id?.toString() || checkout.token,
    currency: checkout.currencyCode || 'USD',
    value: value,
    shipping: shipping,
    tax: tax,
    items: items,
  });
});

// ── Begin Checkout (backup — fires on Shopify's checkout page load) ──
analytics.subscribe('checkout_started', (event) => {
  const checkout = event.data.checkout;

  const items = checkout.lineItems.map((item) => ({
    item_id: item.variant?.id?.toString() || item.id?.toString(),
    item_name: item.title,
    item_variant: item.variant?.title !== 'Default Title' ? item.variant?.title : undefined,
    price: parseFloat(item.variant?.price?.amount || item.finalLinePrice?.amount || '0'),
    quantity: item.quantity,
  }));

  const value = parseFloat(checkout.totalPrice?.amount || '0');

  gtag('event', 'begin_checkout', {
    currency: checkout.currencyCode || 'USD',
    value: value,
    items: items,
  });
});

// ── Add Payment Info ──
analytics.subscribe('payment_info_submitted', (event) => {
  const checkout = event.data.checkout;

  const items = checkout.lineItems.map((item) => ({
    item_id: item.variant?.id?.toString() || item.id?.toString(),
    item_name: item.title,
    price: parseFloat(item.variant?.price?.amount || item.finalLinePrice?.amount || '0'),
    quantity: item.quantity,
  }));

  gtag('event', 'add_payment_info', {
    currency: checkout.currencyCode || 'USD',
    value: parseFloat(checkout.totalPrice?.amount || '0'),
    items: items,
  });
});
