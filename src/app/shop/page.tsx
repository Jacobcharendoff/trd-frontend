'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Section from '@/components/Section';
import { getAllProducts, type ShopifyProduct } from '@/lib/shopify';
import { products as staticProducts, categories as staticCategories, type ProductCategory, getPriceDisplay } from '@/lib/products';

/* ──── Helpers ──── */
function inferCategory(product: ShopifyProduct): string {
  const title = product.title.toLowerCase();
  const desc = product.description.toLowerCase();
  const combined = title + ' ' + desc;

  if (combined.includes('pedalboard') || combined.includes('pedal board')) return 'Pedalboards';
  if (combined.includes('cable') || combined.includes('patch')) return 'Cables & Patch Cables';
  if (combined.includes('switch') || combined.includes('loop') || combined.includes('junction') || combined.includes('pcb') || combined.includes('solder')) return 'Switching & Electronics';
  if (combined.includes('tutor') || combined.includes('consult') || combined.includes('coaching') || combined.includes('build service') || combined.includes('custom build')) return 'Services';
  return 'Accessories';
}

function formatShopifyPrice(amount: string): number {
  return parseFloat(amount);
}

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

  // Build unified product list from whichever source we have
  const displayProducts = useMemo(() => {
    if (shopifyProducts && shopifyProducts.length > 0) {
      return shopifyProducts.map((p) => ({
        id: p.id,
        title: p.title,
        handle: p.handle,
        description: p.description,
        category: inferCategory(p),
        priceMin: formatShopifyPrice(p.priceRange.minVariantPrice.amount),
        priceMax: formatShopifyPrice(p.priceRange.maxVariantPrice.amount),
        image: p.images.edges[0]?.node.url || null,
        imageAlt: p.images.edges[0]?.node.altText || p.title,
        imageWidth: p.images.edges[0]?.node.width || 600,
        imageHeight: p.images.edges[0]?.node.height || 600,
      }));
    }
    // Fall back to static data
    return staticProducts.map((p) => ({
      id: p.id,
      title: p.title,
      handle: p.handle,
      description: p.description,
      category: p.category,
      priceMin: p.priceMin,
      priceMax: p.priceMax,
      image: null as string | null,
      imageAlt: p.title,
      imageWidth: 600,
      imageHeight: 600,
    }));
  }, [shopifyProducts]);

  // Derive categories from actual products
  const categories = useMemo(() => {
    const cats = [...new Set(displayProducts.map((p) => p.category))];
    return cats.sort();
  }, [displayProducts]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') return displayProducts;
    return displayProducts.filter((p) => p.category === selectedCategory);
  }, [selectedCategory, displayProducts]);

  const isLive = shopifyProducts !== null && shopifyProducts.length > 0;

  return (
    <>
      {/* ──── HERO SECTION ──── */}
      <div className="relative w-full bg-black overflow-hidden">
        <div className="relative trd-aurora min-h-[500px] flex items-center justify-center">
          <div className="absolute inset-0 pointer-events-none" />
          <div className="relative z-10 max-w-[1080px] mx-auto px-6 py-32 w-full text-center">
            <h1 className="text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] font-bold leading-[1.05] tracking-tight text-[#f5f5f7] mb-6">
              The Tone <span className="trd-gradient-text">Shop</span>
            </h1>
            <p className="text-lg sm:text-xl text-[#f5f5f7]/70 max-w-2xl mx-auto leading-relaxed">
              Cables, pedalboards, switching, and more — everything you need to build a rig that works.
            </p>
          </div>
        </div>
      </div>

      {/* ──── CATEGORY FILTERS ──── */}
      <Section theme="light" id="shop-filters" reveal={false}>
        <div className="mb-8">
          <p className="text-sm text-[#1d1d1f]/60 font-medium mb-4 uppercase tracking-wide">Filter by category</p>
          <div className="flex flex-wrap gap-2">
            {['All', ...categories].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-[#F5A623] text-black shadow-sm'
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
              <div key={i} className="bg-[#1d1d1f] rounded-2xl overflow-hidden animate-pulse">
                <div className="w-full aspect-square bg-[#2a2a2c]" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-[#2a2a2c] rounded w-20" />
                  <div className="h-5 bg-[#2a2a2c] rounded w-3/4" />
                  <div className="h-4 bg-[#2a2a2c] rounded w-full" />
                  <div className="h-8 bg-[#2a2a2c] rounded w-24 mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group">
                <div className="bg-[#1d1d1f] rounded-2xl overflow-hidden border border-[#1d1d1f]/30 hover:border-[#F5A623]/40 transition-all duration-300 flex flex-col h-full">
                  {/* Product Image */}
                  <div className="relative w-full aspect-square overflow-hidden bg-gradient-to-br from-[#F5A623]/10 to-[#10B981]/10 group-hover:scale-[1.02] transition-transform duration-300">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.imageAlt}
                        width={product.imageWidth}
                        height={product.imageHeight}
                        className="w-full h-full object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-16 h-16 text-[#f5f5f7]/10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6 flex flex-col">
                    <div className="mb-3">
                      <span className="inline-block text-xs font-medium text-[#F5A623] bg-[#F5A623]/10 px-3 py-1 rounded-full">
                        {product.category}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-[#f5f5f7] mb-2 leading-snug line-clamp-3">
                      {product.title}
                    </h3>

                    <p className="text-sm text-[#f5f5f7]/60 mb-4 flex-1 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="mb-6">
                      <p className="text-2xl font-bold trd-gradient-text">
                        {getPriceDisplay(product.priceMin, product.priceMax)}
                      </p>
                    </div>

                    <Link
                      href={`https://the-rig-doctor.myshopify.com/products/${product.handle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-gradient-to-r from-[#F5A623] to-[#10B981] hover:from-[#D48A1A] hover:to-[#0a8e5b] text-black font-semibold px-4 py-3 rounded-lg transition-all duration-200 text-center text-sm"
                    >
                      View on Shop
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
              className="text-[#F5A623] font-medium hover:underline"
            >
              View all products
            </button>
          </div>
        )}
      </Section>

      {/* ──── CTA SECTION ──── */}
      <Section theme="dark" id="shop-cta" reveal className="text-center">
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#f5f5f7] mb-4">
            Not sure what you need?
          </h2>
          <p className="text-[#f5f5f7]/60 text-lg max-w-2xl mx-auto mb-8">
            Book a free consultation with one of our specialists. We'll help you figure out exactly what your rig needs.
          </p>
        </div>
        <div className="flex gap-4 justify-center">
          <Link
            href="/book"
            className="inline-flex items-center gap-2 bg-[#F5A623] hover:bg-[#D48A1A] text-black font-semibold px-8 py-4 rounded-full transition-colors duration-200"
          >
            Book a Free Consultation
          </Link>
        </div>
      </Section>
    </>
  );
}
