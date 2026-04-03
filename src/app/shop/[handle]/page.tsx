'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Section from '@/components/Section';
import { getProduct, getCheckoutUrl, type ShopifyProduct } from '@/lib/shopify';

function formatPrice(amount: string): string {
  const num = parseFloat(amount);
  return num % 1 === 0 ? `$${num.toFixed(0)}` : `$${num.toFixed(2)}`;
}

export default function ProductPage() {
  const params = useParams();
  const handle = params.handle as string;

  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    if (!handle) return;
    let cancelled = false;
    setLoading(true);
    getProduct(handle)
      .then((p) => {
        if (!cancelled) {
          if (p) {
            setProduct(p);
          } else {
            setError(true);
          }
        }
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [handle]);

  const handleBuyNow = async () => {
    if (!product) return;
    const variant = product.variants.edges[selectedVariant]?.node;
    if (!variant) return;
    setAddingToCart(true);
    try {
      const url = await getCheckoutUrl(variant.id);
      window.location.href = url;
    } catch {
      window.location.href = `https://the-rig-doctor.myshopify.com/products/${handle}`;
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-[1200px] mx-auto px-6 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="aspect-square bg-[#f5f5f7] rounded-3xl animate-pulse" />
            <div className="flex flex-col justify-center space-y-6">
              <div className="h-4 bg-[#f5f5f7] rounded w-24 animate-pulse" />
              <div className="h-12 bg-[#f5f5f7] rounded w-3/4 animate-pulse" />
              <div className="h-6 bg-[#f5f5f7] rounded w-1/3 animate-pulse" />
              <div className="h-20 bg-[#f5f5f7] rounded w-full animate-pulse" />
              <div className="h-14 bg-[#f5f5f7] rounded-full w-48 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <h1 className="text-3xl font-bold text-[#1d1d1f] mb-4">Product not found</h1>
          <p className="text-[#1d1d1f]/60 mb-8">
            This product may have been removed or the link is incorrect.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 trd-cta-gradient text-white font-semibold px-8 py-4 rounded-full"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const images = product.images.edges.map((e) => e.node);
  const variants = product.variants.edges.map((e) => e.node);
  const currentVariant = variants[selectedVariant];
  const hasMultipleVariants = variants.length > 1 && !(variants.length === 1 && variants[0].title === 'Default Title');
  const currentImage = images[selectedImage] || null;
  const price = currentVariant ? formatPrice(currentVariant.price.amount) : formatPrice(product.priceRange.minVariantPrice.amount);
  const isAvailable = currentVariant?.availableForSale !== false;

  return (
    <>
      <div className="bg-white border-b border-black/[0.04]">
        <div className="max-w-[1200px] mx-auto px-6 py-3">
          <nav className="flex items-center gap-2 text-sm text-[#1d1d1f]/40">
            <Link href="/shop" className="hover:text-[#0071E3] transition-colors">
              Shop
            </Link>
            <span>/</span>
            <span className="text-[#1d1d1f]/70 truncate max-w-[300px]">{product.title}</span>
          </nav>
        </div>
      </div>

      <section className="bg-white">
        <div className="max-w-[1200px] mx-auto px-6 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div className="space-y-4">
              <div className="relative aspect-square bg-[#f5f5f7] rounded-3xl overflow-hidden">
                {currentImage ? (
                  <Image
                    src={currentImage.url}
                    alt={currentImage.altText || product.title}
                    width={currentImage.width}
                    height={currentImage.height}
                    className="w-full h-full object-contain p-8"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg className="w-24 h-24 text-[#1d1d1f]/10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>

              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                        selectedImage === i
                          ? 'border-[#0071E3] shadow-sm'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <Image
                        src={img.url}
                        alt={img.altText || `${product.title} ${i + 1}`}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="lg:sticky lg:top-32 space-y-8">
              <div>
                <h1 className="text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-bold leading-[1.1] tracking-tight text-[#1d1d1f] mb-4">
                  {product.title}
                </h1>
                <p className="text-2xl sm:text-3xl font-semibold text-[#1d1d1f]">
                  {price} <span className="text-base font-normal text-[#1d1d1f]/40">USD</span>
                </p>
              </div>

              {hasMultipleVariants && (
                <div>
                  <p className="text-sm font-medium text-[#1d1d1f]/60 mb-3 uppercase tracking-wide">
                    Options
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {variants.map((v, i) => (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariant(i)}
                        className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                          selectedVariant === i
                            ? 'bg-[#1d1d1f] text-white'
                            : 'bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#1d1d1f]/5 border border-[#1d1d1f]/10'
                        } ${!v.availableForSale ? 'opacity-40 line-through cursor-not-allowed' : ''}`}
                        disabled={!v.availableForSale}
                      >
                        {v.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.description && (
                <div className="text-[#1d1d1f]/70 text-base sm:text-lg leading-relaxed">
                  <p>{product.description}</p>
                </div>
              )}

              <div className="space-y-3 pt-2">
                {isAvailable ? (
                  <button
                    onClick={handleBuyNow}
                    disabled={addingToCart}
                    className="w-full trd-cta-gradient text-white font-semibold px-8 py-4 rounded-full text-lg transition-all disabled:opacity-60 disabled:cursor-wait"
                  >
                    {addingToCart ? 'Opening checkout...' : 'Buy Now'}
                  </button>
                ) : (
                  <div className="w-full bg-[#f5f5f7] text-[#1d1d1f]/40 font-semibold px-8 py-4 rounded-full text-lg text-center">
                    Sold Out
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-black/[0.06]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#f5f5f7] flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-[#1d1d1f]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm text-[#1d1d1f]/60">Hand-built</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#f5f5f7] flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-[#1d1d1f]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <span className="text-sm text-[#1d1d1f]/60">Ships in 2–5 days</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#f5f5f7] flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-[#1d1d1f]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <span className="text-sm text-[#1d1d1f]/60">Pro-grade quality</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#f5f5f7] flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-[#1d1d1f]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <span className="text-sm text-[#1d1d1f]/60">Lifetime support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {product.descriptionHtml && product.descriptionHtml !== product.description && (
        <Section theme="light" id="product-details" reveal>
          <div className="max-w-3xl mx-auto">
            <h2 className="trd-section-headline text-[#1d1d1f] mb-8">Details</h2>
            <div
              className="prose prose-lg max-w-none text-[#1d1d1f]/70 prose-headings:text-[#1d1d1f] prose-headings:font-semibold prose-a:text-[#0071E3] prose-a:no-underline hover:prose-a:underline prose-strong:text-[#1d1d1f]"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
          </div>
        </Section>
      )}

      <Section theme="dark" id="product-cta" reveal className="text-center">
        <div className="mb-8">
          <h2 className="trd-section-headline text-[#f5f5f7] mb-4">
            Questions about this product?
          </h2>
          <p className="text-[#f5f5f7]/60 text-lg max-w-2xl mx-auto mb-8">
            We&apos;re guitarists first. If you&apos;re not sure this is the right fit for your rig, let&apos;s talk.
          </p>
        </div>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/book"
            className="inline-flex items-center gap-2 trd-cta-gradient text-white font-semibold px-8 py-4 rounded-full trd-glow-pulse"
          >
            Book a Free Call
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/10 transition-colors"
          >
            Browse All Products
          </Link>
        </div>
      </Section>
    </>
  );
}
