'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const navItems = [
  { label: 'Custom Builds', href: '/book' },
  { label: 'Shop', href: '/shop' },
  { label: 'Tone Tutoring', href: '/tone-tutoring' },
  { label: 'Process', href: '/process' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl border-b border-black/[0.06] shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1080px] mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center hover:opacity-80 transition-all"
        >
          <Image
            src="https://cdn.shopify.com/s/files/1/0528/3171/5486/files/logo-white-hrt.png?v=1742952854"
            alt="The Rig Doctor"
            width={140}
            height={40}
            className={`h-8 w-auto transition-all duration-300 ${scrolled ? 'invert' : ''}`}
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-[13px] transition-colors ${
                scrolled
                  ? 'text-[#1d1d1f]/70 hover:text-[#1d1d1f]'
                  : 'text-white/[0.85] hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA + Icons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/book"
            className={`text-[13px] font-medium rounded-full px-5 py-2 transition-all duration-300 ${
              scrolled
                ? 'bg-[#F5A623] text-[#1d1d1f] hover:bg-[#D48E1A]'
                : 'bg-[#F5A623] text-[#1d1d1f] hover:bg-[#D48E1A]'
            }`}
          >
            Start a Build
          </Link>
          {/* Search Icon */}
          <button
            className={`p-2 rounded-full transition-colors ${
              scrolled ? 'text-[#1d1d1f]/60 hover:text-[#1d1d1f]' : 'text-white/70 hover:text-white'
            }`}
            aria-label="Search"
          >
            <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </button>
          {/* Cart Icon */}
          <Link
            href="/shop"
            className={`p-2 rounded-full transition-colors ${
              scrolled ? 'text-[#1d1d1f]/60 hover:text-[#1d1d1f]' : 'text-white/70 hover:text-white'
            }`}
            aria-label="Cart"
          >
            <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden p-2 ${scrolled ? 'text-[#1d1d1f]' : 'text-white'}`}
          aria-label="Toggle menu"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-black/[0.06] px-6 py-6">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-[15px] text-[#1d1d1f]/80 hover:text-[#1d1d1f] transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/book"
              onClick={() => setMobileOpen(false)}
              className="text-[15px] font-medium text-white bg-[#1d1d1f] rounded-full px-6 py-3 text-center mt-2 hover:bg-[#1d1d1f]/90 transition-colors"
            >
              Start a Build
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
