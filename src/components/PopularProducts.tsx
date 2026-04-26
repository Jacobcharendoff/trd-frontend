'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getAllProducts, type ShopifyProduct } from '@/lib/shopify';
import { products as staticProducts, formatPrice, getPriceDisplay } from '@/lib/products';

const POPULAR_HANDLES = [
  'mogami-2314-patch-cables',
  'powergrip-6-20-ft',
  'insert-cables-trs-to-dual-ts',
  'stereo-cables-trs',
  'tie-down-mounts',
  'power-cables',
];

interface PopularProduct extends ShopifyProduct {
  priceMin: number;
  priceMax: number;
}

export default function PopularProducts() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<PopularProduct[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const autoScrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch products from Shopify API
  useEffect(() => {
    async function fetchProducts() {
      try {
        const allProducts = await getAllProducts();

        // Filter and order by POPULAR_HANDLES
        const popularProducts = POPULAR_HANDLES
          .map(handle =>
            allProducts.find(p => p.handle === handle)
          )
          .filter((p): p is ShopifyProduct => p !== undefined)
          .map(p => ({
            ...p,
            priceMin: parseFloat(p.priceRange.minVariantPrice.amount),
            priceMax: parseFloat(p.priceRange.maxVariantPrice.amount),
          }));

        if (popularProducts.length > 0) {
          setProducts(popularProducts);
        } else {
          // Fallback to static data if API returns nothing
          const staticPopularProducts = POPULAR_HANDLES
            .map(handle => staticProducts.find(p => p.handle === handle))
            .filter((p): p is typeof staticProducts[0] => p !== undefined)
            .map(p => ({
              id: p.id,
              title: p.title,
              handle: p.handle,
              description: p.description,
              descriptionHtml: p.description,
              images: { edges: [] },
              priceRange: {
                minVariantPrice: {
                  amount: String(p.priceMin),
                  currencyCode: 'USD',
                },
                maxVariantPrice: {
                  amount: String(p.priceMax),
                  currencyCode: 'USD',
                },
              },
              compareAtPriceRange: null,
              variants: { edges: [] },
              priceMin: p.priceMin,
              priceMax: p.priceMax,
            }));
          setProducts(staticPopularProducts);
        }
      } catch (error) {
        console.error('Error fetching popular products:', error);
        // Fallback to static data on error
        const fallbackProducts = POPULAR_HANDLES
          .map(handle => staticProducts.find(p => p.handle === handle))
          .filter((p): p is typeof staticProducts[0] => p !== undefined)
          .map(p => ({
            id: p.id,
            title: p.title,
            handle: p.handle,
            description: p.description,
            descriptionHtml: p.description,
            images: { edges: [] },
            priceRange: {
              minVariantPrice: {
                amount: String(p.priceMin),
                currencyCode: 'USD',
              },
              maxVariantPrice: {
                amount: String(p.priceMax),
                currencyCode: 'USD',
              },
            },
            compareAtPriceRange: null,
            variants: { edges: [] },
            priceMin: p.priceMin,
            priceMax: p.priceMax,
          }));
        setProducts(fallbackProducts);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // Auto-scroll functionality
  useEffect(() => {
    if (isHovering) {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
      return;
    }

    autoScrollIntervalRef.current = setInterval(() => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } =
          scrollContainerRef.current;
        const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 10;

        scrollContainerRef.current.scrollBy({
          left: 280,
          behavior: 'smooth',
        });

        if (isAtEnd) {
          scrollContainerRef.current.scrollTo({
            left: 0,
            behavior: 'smooth',
          });
        }
      }
    }, 4000);

    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
    };
  }, [isHovering]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 280;
      scrollContainerRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const getFirstImage = (product: PopularProduct): string | null => {
    if (product.images?.edges && product.images.edges.length > 0) {
      return product.images.edges[0].node.url;
    }
    return null;
  };

  return (
    <section className="bg-[#0a0a0a] py-16">
      <div className="max-w-[1080px] mx-auto px-6 mb-8">
        <div className="mb-6">
          <p className="text-[#f5f5f7]/50 text-sm font-medium uppercase tracking-wide mb-2">
            The same gear we use in every build.
          </p>
          <h2 className="text-4xl font-bold text-[#f5f5f7]">
            Most Popular
          </h2>
        </div>
      </div>

      {/* Carousel Section */}
      <div className="relative w-[100vw] -ml-[calc((100vw-100%)/2)]">
        {/* Scrollable container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            paddingLeft: 'max(24px, calc((100vw - 1080px) / 2 + 24px))',
            paddingRight: 'max(24px, calc((100vw - 1080px) / 2 + 24px))',
          }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <style>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {/* Product Cards */}
          {!isLoading &&
            products.map((product) => {
              const imageUrl = getFirstImage(product);
              const priceDisplay = getPriceDisplay(product.priceMin, product.priceMax);

              return (
                <Link
                  key={product.id}
                  href="/shop"
                  className="flex-shrink-0 snap-start w-[220px] sm:w-[260px] group"
                >
                  <div className="bg-[#f5f5f7]/[0.06] border border-white/[0.06] rounded-2xl p-4 h-full flex flex-col transition-all duration-200 hover:border-white/[0.12] hover:bg-[#f5f5f7]/[0.08]">
                    {/* Product Image */}
                    <div className="w-full aspect-square bg-[#f5f5f7] rounded-xl overflow-hidden mb-4 flex items-center justify-center">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={product.title}
                          width={220}
                          height={220}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#1d1d1f]/20">
                          <svg
                            className="w-12 h-12"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col flex-grow">
                      <h3 className="font-medium text-[#f5f5f7] text-sm leading-tight mb-2 line-clamp-2 group-hover:text-[#0071E3] transition-colors">
                        {product.title}
                      </h3>
                      <p className="text-[#f5f5f7]/50 text-sm font-medium">
                        {priceDisplay}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}

          {/* View All Link */}
          <Link
            href="/shop"
            className="flex-shrink-0 snap-start w-[220px] sm:w-[260px]"
          >
            <div className="bg-[#f5f5f7]/[0.06] border border-white/[0.06] rounded-2xl p-4 h-full flex items-center justify-center transition-all duration-200 hover:border-white/[0.12] hover:bg-[#f5f5f7]/[0.08]">
              <div className="text-center">
                <p className="text-[#f5f5f7] font-medium text-sm mb-2">
                  Explore All
                </p>
                <p className="text-[#f5f5f7]/50 text-xs">
                  View the complete Tone Shop
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Left Arrow */}
        <button
          onClick={() => handleScroll('left')}
          className="absolute top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/90 hover:bg-white shadow-lg text-[#1d1d1f] p-3 transition-all duration-200 border border-black/10"
          style={{ left: 'max(12px, calc((100vw - 1080px) / 2 + 8px))' }}
          aria-label="Scroll left"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => handleScroll('right')}
          className="absolute top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/90 hover:bg-white shadow-lg text-[#1d1d1f] p-3 transition-all duration-200 border border-black/10"
          style={{ right: 'max(12px, calc((100vw - 1080px) / 2 + 8px))' }}
          aria-label="Scroll right"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
