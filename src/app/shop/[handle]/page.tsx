'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
/* Using native <img> instead of next/image to avoid Shopify CDN domain issues */
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
  const [quantity, setQuantity] = useState(1);

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
      const url = await getCheckoutUrl(variant.id, quantity);
      window.location.href = url;
    } catch {
      window.location.href = `https://the-rig-doctor.myshopify.com/products/${handle}`;
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-20">
        <div className="max-w-[1200px] mx-auto px-6 py-16">
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
      <div className="min-h-screen bg-white flex items-center justify-center pt-20">
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
  const useDropdown = hasMultipleVariants && variants.length > 6;
  const currentImage = images[selectedImage] || null;
  const unitPrice = currentVariant ? parseFloat(currentVariant.price.amount) : parseFloat(product.priceRange.minVariantPrice.amount);
  const totalPrice = unitPrice * quantity;
  const price = totalPrice % 1 === 0 ? `$${totalPrice.toFixed(0)}` : `$${totalPrice.toFixed(2)}`;
  const isAvailable = currentVariant?.availableForSale !== false;

  return (
    <>
      {/* Breadcrumb — sits below the site Header */}
      <div className="bg-white border-b border-black/[0.04] pt-16">
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
        <div className="max-w-[1200px] mx-auto px-6 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="relative aspect-square bg-[#f5f5f7] rounded-3xl overflow-hidden">
                {currentImage ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={currentImage.url}
                    alt={currentImage.altText || product.title}
                    className="w-full h-full object-contain p-8"
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
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img.url}
                        alt={img.altText || `${product.title} ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="lg:sticky lg:top-24 space-y-6">
              <div>
                <h1 className="text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-bold leading-[1.1] tracking-tight text-[#1d1d1f] mb-3">
                  {product.title}
                </h1>
                <p className="text-2xl sm:text-3xl font-semibold text-[#1d1d1f]">
                  {price} <span className="text-base font-normal text-[#1d1d1f]/40">USD</span>
                </p>
              </div>

              {/* Variants — dropdown for 6+ options, pills for fewer */}
              {hasMultipleVariants && (
                <div>
                  <p className="text-sm font-medium text-[#1d1d1f]/60 mb-3 uppercase tracking-wide">
                    Options
                  </p>
                  {useDropdown ? (
                    <select
                      value={selectedVariant}
                      onChange={(e) => setSelectedVariant(Number(e.target.value))}
                      className="w-full px-5 py-3.5 rounded-2xl text-base font-medium bg-[#f5f5f7] text-[#1d1d1f] border border-[#1d1d1f]/10 focus:border-[#0071E3] focus:ring-2 focus:ring-[#0071E3]/20 outline-none transition-all appearance-none cursor-pointer"
                      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%231d1d1f' d='M6 8.825L1.175 4l.884-.884L6 7.058l3.941-3.942.884.884z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}
                    >
                      {variants.map((v, i) => (
                        <option key={v.id} value={i} disabled={!v.availableForSale}>
                          {v.title}{!v.availableForSale ? ' — Sold Out' : ''} — {formatPrice(v.price.amount)}
                        </option>
                      ))}
                    </select>
                  ) : (
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
                  )}
                </div>
              )}

              {/* Quantity Selector */}
              <div>
                <p className="text-sm font-medium text-[#1d1d1f]/60 mb-3 uppercase tracking-wide">
                  Quantity
                </p>
                <div className="inline-flex items-center rounded-full bg-[#f5f5f7] border border-[#1d1d1f]/10">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="w-12 h-12 flex items-center justify-center text-lg font-medium text-[#1d1d1f] rounded-full transition-all hover:bg-[#1d1d1f]/5 disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="w-12 text-center text-base font-semibold text-[#1d1d1f] tabular-nums select-none">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                    disabled={quantity >= 10}
                    className="w-12 h-12 flex items-center justify-center text-lg font-medium text-[#1d1d1f] rounded-full transition-all hover:bg-[#1d1d1f]/5 disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

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
                    {addingToCart ? 'Opening checkout...' : `Buy Now${quantity > 1 ? ` · ${quantity} items` : ''}`}
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
                  <span className="text-sm text-[#1d1d1f]/60">Ships in 2-5 days</span>
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

      {/* ──── Consultation CTA ──── */}
      <section className="relative overflow-hidden bg-[#1d1d1f] py-16 sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(0,113,227,0.15)_0%,transparent_55%),radial-gradient(ellipse_at_70%_50%,rgba(191,90,242,0.12)_0%,transparent_55%),radial-gradient(ellipse_at_50%_80%,rgba(255,55,95,0.06)_0%,transparent_50%)]" />
        <div className="relative max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#f5f5f7] tracking-tight">
              Ready to hear what your rig should sound like?
            </h3>
            <p className="text-[#f5f5f7]/50 text-base mt-3">
              30 minutes. Free. No commitment.
            </p>
          </div>
          <Link
            href="/book"
            className="trd-cta-gradient trd-glow-pulse inline-flex items-center px-8 py-4 rounded-full font-semibold text-base whitespace-nowrap"
          >
            Book a Free Consultation
          </Link>
        </div>
      </section>

      {/* ──── Service Tiers ──── */}
      <Section theme="dark" id="service-tiers" reveal>
        <div className="text-center mb-16">
          <h2 className="trd-section-headline text-[#f5f5f7] mb-4">
            Three ways to <span className="trd-gradient-text">get your tone right.</span>
          </h2>
          <p className="text-[#f5f5f7]/50 text-lg max-w-2xl mx-auto">
            Depends on how hands-on you want to be.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {/* Tier 1 */}
          <div className="rounded-2xl p-8 bg-[#f5f5f7]/[0.06] border border-white/[0.06] flex flex-col hover:-translate-y-1 transition-all duration-500">
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#f5f5f7]/30 mb-2">Current Setup</p>
            <h3 className="text-2xl font-bold text-[#f5f5f7]/70 mb-2">Ride it out</h3>
            <p className="text-[#f5f5f7]/40 text-sm mb-6">
              Keep your current board as-is. No cost, but here&apos;s what you&apos;re living with.
            </p>
            <p className="text-3xl font-bold text-[#f5f5f7]/50 mb-1">$0</p>
            <p className="text-[#f5f5f7]/30 text-sm mb-8">but it costs you tone</p>

            <div className="space-y-4 flex-grow">
              {[
                'Signal gets worse at every connection',
                'Noise and hum you can\'t track down',
                'No plan behind the signal chain',
                'Nobody to call when something breaks',
                'Gets worse over time, not better',
                'A liability on stage',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-red-400/60 mt-0.5 flex-shrink-0">&#10005;</span>
                  <span className="text-[#f5f5f7]/40 text-sm leading-snug">{item}</span>
                </div>
              ))}
            </div>

            <p className="text-[#f5f5f7]/25 text-sm italic mt-8">You know something&apos;s off.</p>
          </div>

          {/* Tier 2 */}
          <div className="rounded-2xl p-8 bg-[#f5f5f7]/[0.06] border border-white/[0.08] flex flex-col hover:-translate-y-1 transition-all duration-500">
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#f5f5f7]/30 mb-2">DIY Kits</p>
            <h3 className="text-2xl font-bold text-[#f5f5f7] mb-2">Build it yourself</h3>
            <p className="text-[#f5f5f7]/50 text-sm mb-6">
              Same components we use. You do the assembly.
            </p>
            <p className="text-3xl font-bold text-[#f5f5f7] mb-1">$750 – $1,500 <span className="text-lg font-normal text-[#f5f5f7]/50">USD</span></p>
            <p className="text-[#f5f5f7]/30 text-sm mb-8">+ your time and patience</p>

            <div className="space-y-4 flex-grow">
              {[
                { text: 'Decent signal path improvement', ok: true },
                { text: 'Pick your own layout', ok: true },
                { text: 'No isolated power design', ok: false },
                { text: 'No hand-soldered connections', ok: false },
                { text: 'No lifetime support', ok: false },
                { text: 'Stage-ready if you test it enough', ok: true },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className={`mt-0.5 flex-shrink-0 ${item.ok ? 'text-[#10B981]' : 'text-red-400/60'}`}>
                    {item.ok ? '✓' : '✕'}
                  </span>
                  <span className={`text-sm leading-snug ${item.ok ? 'text-[#f5f5f7]/70' : 'text-[#f5f5f7]/40'}`}>{item.text}</span>
                </div>
              ))}
            </div>

            <Link
              href="/shop"
              className="mt-8 block text-center font-semibold py-3.5 px-6 rounded-full border-2 border-[#0071E3]/50 text-[#0071E3] hover:bg-[#0071E3] hover:text-white transition-all duration-300"
            >
              Browse Kits
            </Link>
          </div>

          {/* Tier 3 — Most Popular */}
          <div className="relative rounded-2xl p-8 bg-gradient-to-b from-[#0a1628] to-[#0f0a1f] border border-[#0071E3]/30 flex flex-col shadow-[0_0_40px_rgba(0,113,227,0.15)] hover:shadow-[0_0_60px_rgba(0,113,227,0.25)] hover:-translate-y-1 transition-all duration-500">
            <div className="absolute -top-3.5 right-6">
              <span className="bg-[#0071E3] text-white text-xs font-semibold tracking-wider uppercase px-4 py-1.5 rounded-full">
                Most Popular
              </span>
            </div>

            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#0071E3] mb-2">Custom Build</p>
            <h3 className="text-2xl font-bold text-[#f5f5f7] mb-2">We build it for you</h3>
            <p className="text-[#f5f5f7]/50 text-sm mb-6">
              Hand us your board. Walk away. Get it back wired right and built to last.
            </p>
            <p className="text-3xl font-bold text-[#f5f5f7] mb-1">From $2,000 <span className="text-lg font-normal text-[#f5f5f7]/50">USD</span></p>
            <p className="text-[#f5f5f7]/30 text-sm mb-8">turnkey, guaranteed</p>

            <div className="space-y-4 flex-grow">
              {[
                'Fully isolated power design',
                'Hand-soldered, every connection',
                'Dead-quiet signal chain',
                'Road-tested before it ships',
                'Ongoing support when you need it',
                'Engineered signal path',
                'Bulletproof on any stage',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-[#10B981] mt-0.5 flex-shrink-0">{'✓'}</span>
                  <span className="text-[#f5f5f7]/80 text-sm leading-snug">{item}</span>
                </div>
              ))}
            </div>

            <Link
              href="/book"
              className="mt-8 block text-center font-semibold py-3.5 px-6 rounded-full bg-[#0071E3] hover:bg-[#005BB5] text-white transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,113,227,0.40)]"
            >
              Start a Build
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
