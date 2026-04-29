import { NextRequest, NextResponse } from 'next/server';
import { getProduct, createCartWithAttribution } from '@/lib/shopify';
import { getUTMFromCookie, appendUTMToURL, utmToCartAttributes } from '@/lib/utm';

/**
 * Checkout API Route
 *
 * Creates a Shopify cart via the Storefront API and redirects
 * the user to Shopify's hosted checkout page.
 *
 * Attribution: reads trd_utm cookie, passes UTM params as cart attributes
 * AND appends them to the checkout URL for Shopify analytics.
 *
 * Usage: /api/checkout?handle=tone-tutoring
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

    // Read UTM attribution from cookie
    const cookieHeader = req.headers.get('cookie') || '';
    const utmParams = getUTMFromCookie(cookieHeader);
    const cartAttributes = utmParams ? utmToCartAttributes(utmParams) : [];

    // Create a cart with attribution and get the Shopify-hosted checkout URL
    const { cart, userErrors } = await createCartWithAttribution(
      variant.id,
      1,
      cartAttributes
    );

    if (userErrors.length > 0) {
      throw new Error(userErrors[0].message);
    }

    // Append UTM params to checkout URL so Shopify analytics picks them up
    let checkoutUrl = cart.checkoutUrl;
    if (utmParams) {
      checkoutUrl = appendUTMToURL(checkoutUrl, utmParams);
    }

    return NextResponse.redirect(checkoutUrl);
  } catch (err) {
    console.error('Checkout redirect error:', err);
    // Fallback: send them to the Tone Tutoring page rather than a dead end
    return NextResponse.redirect(new URL('/tone-tutoring', req.url));
  }
}
