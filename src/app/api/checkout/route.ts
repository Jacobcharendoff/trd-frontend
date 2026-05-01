import { NextRequest, NextResponse } from 'next/server';
import { getProduct, createCartWithAttribution } from '@/lib/shopify';
import { getUTMFromCookie, appendUTMToURL, utmToCartAttributes } from '@/lib/utm';

/**
 * Checkout API Route
 *
 * Creates a Shopify cart via the Storefront API and redirects
 * the user to Shopify's hosted checkout page.
 *
 * Accepts either:
 *   ?handle=product-slug              (legacy — picks first available variant)
 *   ?handle=slug&variantId=gid://...&quantity=2  (preferred — exact variant + qty)
 *
 * Attribution: reads trd_utm cookie, passes UTM params as cart attributes
 * AND appends them to the checkout URL for Shopify/GA4 analytics.
 */

export async function GET(req: NextRequest) {
  try {
    const handle = req.nextUrl.searchParams.get('handle');
    const variantIdParam = req.nextUrl.searchParams.get('variantId');
    const quantityParam = req.nextUrl.searchParams.get('quantity');

    if (!handle) {
      return NextResponse.json({ error: 'Product handle required' }, { status: 400 });
    }

    let variantId = variantIdParam;
    const quantity = quantityParam ? Math.max(1, parseInt(quantityParam, 10) || 1) : 1;

    // If no variantId provided, look up the product and pick first available
    if (!variantId) {
      const product = await getProduct(handle);
      if (!product) {
        console.error(`Product not found: ${handle}`);
        return NextResponse.redirect(new URL('/shop', req.url));
      }

      const variant = product.variants.edges.find(
        (v) => v.node.availableForSale
      )?.node;

      if (!variant) {
        console.error(`No available variants for product: ${handle}`);
        return NextResponse.redirect(new URL('/shop', req.url));
      }

      variantId = variant.id;
    }

    // Read UTM attribution from cookie
    const cookieHeader = req.headers.get('cookie') || '';
    const utmParams = getUTMFromCookie(cookieHeader);
    const cartAttributes = utmParams ? utmToCartAttributes(utmParams) : [];

    // Create a cart with attribution and get the Shopify-hosted checkout URL
    const { cart, userErrors } = await createCartWithAttribution(
      variantId,
      quantity,
      cartAttributes
    );

    if (userErrors.length > 0) {
      throw new Error(userErrors[0].message);
    }

    // Append UTM params to checkout URL so GA4 picks them up
    let checkoutUrl = cart.checkoutUrl;
    if (utmParams) {
      checkoutUrl = appendUTMToURL(checkoutUrl, utmParams);
    }

    return NextResponse.redirect(checkoutUrl);
  } catch (err) {
    console.error('Checkout redirect error:', err);
    // Fallback: send them to the shop rather than a dead end
    return NextResponse.redirect(new URL('/shop', req.url));
  }
}
