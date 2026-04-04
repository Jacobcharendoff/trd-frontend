import { NextRequest, NextResponse } from 'next/server';
import { getProduct, getCheckoutUrl } from '@/lib/shopify';

/**
 * Checkout API Route
 *
 * Creates a Shopify cart via the Storefront API and redirects
 * the user to Shopify's hosted checkout page.
 *
 * Usage: /api/checkout?handle=tone-tutoring
 *
 * This avoids the broken redirect loop where
 * the-rig-doctor.myshopify.com/products/* → www.therigdr.com/products/* → 404
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
    const checkoutUrl = await getCheckoutUrl(variant.id);

    return NextResponse.redirect(checkoutUrl);
  } catch (err) {
    console.error('Checkout redirect error:', err);
    // Fallback: send them to the Tone Tutoring page rather than a dead end
    return NextResponse.redirect(new URL('/tone-tutoring', req.url));
  }
}
