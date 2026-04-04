import { NextRequest, NextResponse } from 'next/server';
import { getProduct, getCheckoutUrl } from '@/lib/shopify';

/**
 * Checkout API Route
 *
 * Creates a Shopify cart via the Storefront API and redirects
 * the user to Shopify's hosted checkout page.
 *
 * Usage: /api/checkout?handle=tone-tutoring-follow-up
 *
 * Safety net: replaces any www.therigdr.com or therigdr.com URLs
 * with the-rig-doctor.myshopify.com to ensure checkout always
 * reaches Shopify's servers (not our headless frontend).
 */
export async function GET(req: NextRequest) {
  try {
    const handle = req.nextUrl.searchParams.get('handle');

    if (!handle) {
      return NextResponse.json({ error: 'Product handle required' }, { status: 400 });
    }

    // Fetch the product to get the first available variant ID
    const product = await getProduct(handle);

    if (!product) {
      console.error(`Product not found: ${handle}`);
      return NextResponse.redirect(new URL('/tone-tutoring', req.url));
    }

    const variant = product.variants.edges.find(
      (v) => v.node.availableForSale
    )?.node;

    if (!variant) {
      console.error(`No available variants for product: ${handle}`);
      return NextResponse.redirect(new URL('/tone-tutoring', req.url));
    }

    // Create a cart and get the Shopify-hosted checkout URL
    let checkoutUrl = await getCheckoutUrl(variant.id);

    // Safety net: ensure checkout URL points to Shopify servers,
    // not our headless frontend domain
    checkoutUrl = checkoutUrl
      .replace('https://www.therigdr.com', 'https://the-rig-doctor.myshopify.com')
      .replace('https://therigdr.com', 'https://the-rig-doctor.myshopify.com');

    return NextResponse.redirect(checkoutUrl);
  } catch (err) {
    console.error('Checkout redirect error:', err);
    return NextResponse.redirect(new URL('/tone-tutoring', req.url));
  }
}
