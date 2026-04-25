'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Section from '@/components/Section';
import { getAllProducts, type ShopifyProduct } from '@/lib/shopify';
import { products as staticProducts, getPriceDisplay } from '@/lib/products';

/* ══════════════════════════════════════════════════════════════
   STOREFRONT WHITELIST
   Only these products appear on the public site, in this order.
   Everything else stays in Shopify for custom quotes/backend use.
   ══════════════════════════════════════════════════════════════ */

type StorefrontEntry = {
  /** Partial match against Shopify product title (case-insensitive) */
  titleMatch: string;
  /** Display category on the storefront */
  category: 'Cables' | 'Accessories' | 'Services';
  /** Sort order — lower = first */
  order: number;
};

const STOREFRONT_WHITELIST: StorefrontEntry[] = [
  { titleMatch: '2314',              category: 'Cables',      order: 1 },
  { titleMatch: 'insert cable',      category: 'Cables',      order: 2 },
  { titleMatch: 'stereo cable',      category: 'Cables',      order: 3 },
  { titleMatch: '2524',              category: 'Cables',      order: 4 },
  { titleMatch: '2534',              category: 'Cables',      order: 5 },
  { titleMatch: 'tie down',          category: 'Accessories',  order: 6 },
  { titleMatch: 'powergrip',         category: 'Accessories',  order: 7 },
  { titleMatch: 'rig rendering',     category: 'Services',     order: 8 },
  { titleMatch: 'tone tutor',        category: 'Services',     order: 9 },
];

function matchWhitelist(title: string): StorefrontEntry | null {
  const lower = title.toLowerCase();
  return STOREFRONT_WHITELIST.find((entry) => lower.includes(entry.titleMatch)) || null;
}

/* ──── Helpers ──── */
function formatShopifyPrice(amount: string): number {
  return parseFloat(amount);
}

const CATEGORIES = ['Cables', 'Accessories', 'Services'] as const;

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [shopifyProducts, setShopifyProducts] = useState<ShopifyProduct[] | null>(null);
  const [loading, setLoading] = useState(true);

  // Try to fetch live Shopify data on mount
  useEffect(() => {
    let cancelled = false;
    getAllProducts()
      .then((products) => {
        if (!cancelled && products.length > 0) {
          setShopifyProducts(products);
        }
      })
      .catch(() => {
        // Fall back to static data silently
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  // Build unified product list — whitelist only
  const displayProducts = useMemo(() => {
    const source = (shopifyProducts && shopifyProducts.length > 0)
      ? shopifyProducts.map((p) => ({
          id: p.id,
          title: p.title,
          handle: p.handle,
          description: p.description,
          priceMin: formatShopifyPrice(p.priceRange.minVariantPrice.amount),
          priceMax: formatShopifyPrice(p.priceRange.maxVariantPrice.amount),
          image: p.images.edges[0]?.node.url || null,
          imageAlt: p.images.edges[0]?.node.altText || p.title,
          imageWidth: p.images.edges[0]?.node.width || 600,
          imageHeight: p.images.edges[0]?.node.height || 600,
        }))
      : staticProducts.map((p) => ({
          id: p.id,
          title: p.title,
          handle: p.handle,
          description: p.description,
          priceMin: p.priceMin,
          priceMax: p.priceMax,
          image: null as string | null,
          imageAlt: p.title,
          imageWidth: 600,
          imageHeight: 600,
        }));

    // Filter to whitelist and assign category + order
    return source
      .map((p) => {
        const entry = matchWhitelist(p.title);
        if (!entry) return null;
        return { ...p, category: entry.category, order: entry.order };
      })
      .filter(Boolean)
      .sort((a, b) => a!.order - b!.order) as Array<typeof source[number] & { category: string; order: number }>;
  }, [shopifyProducts]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') return displayProducts;
    return displayProducts.filter((p) => p.category === selectedCategory);
  }, [selectedCategory, displayProducts]);

  const isLive = shopifyProducts !== null && shopifyProducts.length > 0;

  return (
    <>
      {/* ──── HERO SECTION ──── */}
      <div className="relative w-full overflow-hidden">
        <div className="relative min-h-screen flex items-center justify-center bg-black trd-aurora-intense">
          {/* Background Video */}
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          >
            <source
              src="https://cdn.shopify.com/videos/c/o/v/2a85affb7da84ea2aebb92e333164646.mp4"
              type="video/mp4"
            />
          </video>

          <div className="relative z-10 max-w-[1080px] mx-auto px-6 py-32 w-full text-center">
            <h1 className="trd-hero-headline text-[#f5f5f7] mb-6">
              The <span className="trd-gradient-text">Tone</span> Shop
            </h1>
            <p className="trd-subheadline max-w-2xl mx-auto">
              Cables, pedalboards, switching, and more — everything you need to build a rig that works.
            </p>
          </div>
        </div>
      </div>

      {/* dark → light transition */}
      <div className="trd-divider-dark-to-light" />

      {/* ──── CATEGORY FILTERS ──── */}
      <Section theme="light" id="shop-filters" reveal={false}>
        <div className="mb-8">
          <p className="text-sm text-[#1d1d1f]/60 font-medium mb-4 uppercase tracking-wide">Filter by category</p>
          <div className="flex flex-wrap gap-2">
            {['All', ...CATEGORIES].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-[#0071E3] text-white shadow-sm'
                    : 'bg-[#f5f5f7] text-[#1d1d1f] border border-[#1d1d1f]/10 hover:bg-[#1d1d1f]/5'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count + Live Badge */}
        <div className="flex items-center gap-3 mb-8">
          <p className="text-sm text-[#1d1d1f]/50">
            {loading ? 'Loading products...' : `Showing ${filteredProducts.length} ${filteredProducts.length === 1 ? 'product' : 'products'}`}
          </p>
          {isLive && (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              Live
            </span>
          )}
        </div>

        {/* ──── PRODUCT GRID ──── */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-black/[0.06] animate-pulse">
                <div className="w-full aspect-square bg-[#f5f5f7]" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-[#f5f5f7] rounded w-20" />
                  <div className="h-5 bg-[#f5f5f7] rounded w-3/4" />
                  <div className="h-4 bg-[#f5f5f7] rounded w-full" />
                  <div className="h-8 bg-[#f5f5f7] rounded w-24 mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group">
                <div className="bg-white rounded-2xl overflow-hidden border border-black/[0.06] hover:shadow-lg transition-all duration-300 flex flex-col h-full">
                  {/* Product Image */}
                  <div className="relative w-full aspect-square overflow-hidden bg-[#f5f5f7]">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.imageAlt}
                        width={product.imageWidth}
                        height={product.imageHeight}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-16 h-16 text-[#1d1d1f]/10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6 flex flex-col">
                    <div className="mb-3">
                      <span className="inline-block text-xs font-medium text-[#0071E3] bg-[#0071E3]/10 px-3 py-1 rounded-full">
                        {product.category}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-[#1d1d1f] mb-2 leading-snug line-clamp-3">
                      {product.title}
                    </h3>

                    <p className="text-sm text-[#1d1d1f]/60 mb-4 flex-1 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="mb-6">
                      <p className="text-2xl font-bold text-[#1d1d1f]">
                        {getPriceDisplay(product.priceMin, product.priceMax)}
                      </p>
                    </div>

                    <Link
                      href={`/shop/${product.handle}`}
                      className="w-full bg-[#1d1d1f] hover:bg-[#1d1d1f]/90 text-white font-semibold px-4 py-3 rounded-full transition-colors duration-200 text-center text-sm"
                    >
                      View Product
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#1d1d1f]/60 text-lg mb-4">No products in this category yet.</p>
            <button
              onClick={() => setSelectedCategory('All')}
              className="text-[#0071E3] font-medium hover:underline"
            >
              View all products
            </button>
          </div>
        )}
      </Section>

      {/* ──── CTA SECTION ──── */}
      <Section theme="dark" id="shop-cta" reveal className="text-center">
        <div className="mb-8">
          <h2 className="trd-section-headline text-[#f5f5f7] mb-4">
            Not sure what you need?
          </h2>
          <p className="text-[#f5f5f7]/60 text-lg max-w-2xl mx-auto mb-8">
            Grab a free call and we&apos;ll help you figure out what your rig actually needs.
          </p>
        </div>
        <div className="flex gap-4 justify-center">
          <Link
            href="/book"
            className="inline-flex items-center gap-2 text-white font-semibold px-8 py-4 rounded-full trd-cta-gradient trd-glow-pulse"
          >
            Book a Free Consultation
          </Link>
        </div>
      </Section>
    </>
  );
}
