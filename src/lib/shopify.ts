/**
 * Shopify Storefront API Client
 *
 * Uses the Storefront API to fetch products, collections,
 * and handle cart/checkout operations.
 *
 * Token should be set in .env.local as NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN
 */

const SHOPIFY_DOMAIN = 'the-rig-doctor.myshopify.com';
const STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN || '';
const API_VERSION = '2024-10';

interface ShopifyImage {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

interface ShopifyPrice {
  amount: string;
  currencyCode: string;
}

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  images: { edges: Array<{ node: ShopifyImage }> };
  priceRange: {
    minVariantPrice: ShopifyPrice;
    maxVariantPrice: ShopifyPrice;
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        price: ShopifyPrice;
        availableForSale: boolean;
      };
    }>;
  };
}

export interface ShopifyCollection {
  id: string;
  title: string;
  handle: string;
  description: string;
  image: ShopifyImage | null;
  products: { edges: Array<{ node: ShopifyProduct }> };
}

async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const url = `https://${SHOPIFY_DOMAIN}/api/${API_VERSION}/graphql.json`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 300 }, // Cache for 5 minutes
  });

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.status} ${response.statusText}`);
  }

  const json = await response.json();
  if (json.errors) {
    throw new Error(`Shopify GraphQL error: ${json.errors[0]?.message}`);
  }

  return json.data;
}

// ─── Product Queries ───

export async function getProduct(handle: string): Promise<ShopifyProduct | null> {
  const query = `
    query ProductByHandle($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
        description
        descriptionHtml
        images(first: 10) {
          edges {
            node {
              url
              altText
              width
              height
            }
          }
        }
        priceRange {
          minVariantPrice { amount currencyCode }
          maxVariantPrice { amount currencyCode }
        }
        variants(first: 20) {
          edges {
            node {
              id
              title
              price { amount currencyCode }
              availableForSale
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{ product: ShopifyProduct | null }>(query, { handle });
  return data.product;
}

export async function getAllProducts(): Promise<ShopifyProduct[]> {
  const query = `
    query AllProducts {
      products(first: 50) {
        edges {
          node {
            id
            title
            handle
            description
            descriptionHtml
            images(first: 3) {
              edges {
                node {
                  url
                  altText
                  width
                  height
                }
              }
            }
            priceRange {
              minVariantPrice { amount currencyCode }
              maxVariantPrice { amount currencyCode }
            }
            variants(first: 5) {
              edges {
                node {
                  id
                  title
                  price { amount currencyCode }
                  availableForSale
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{ products: { edges: Array<{ node: ShopifyProduct }> } }>(query);
  return data.products.edges.map(({ node }) => node);
}

// ─── Cart Operations ───

export async function createCart(variantId: string, quantity: number = 1) {
  const query = `
    mutation CartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    price { amount currencyCode }
                    product { title handle }
                  }
                }
              }
            }
          }
          cost {
            totalAmount { amount currencyCode }
            subtotalAmount { amount currencyCode }
          }
        }
        userErrors { field message }
      }
    }
  `;

  const data = await shopifyFetch<{ cartCreate: { cart: { id: string; checkoutUrl: string }; userErrors: Array<{ message: string }> } }>(
    query,
    {
      input: {
        lines: [{ merchandiseId: variantId, quantity }],
      },
    }
  );

  return data.cartCreate;
}

export async function getCheckoutUrl(variantId: string, quantity: number = 1): Promise<string> {
  const { cart, userErrors } = await createCart(variantId, quantity);
  if (userErrors.length > 0) {
    throw new Error(userErrors[0].message);
  }
  return cart.checkoutUrl;
}
