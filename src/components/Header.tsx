'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const navItems = [
  { label: 'Book a Build', href: '/book' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Tone Tutoring', href: '/tone-tutoring' },
  { label: 'The Process', href: '/process' },
  { label: 'About', href: '/about' },
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
          className={`flex items-center gap-2 font-semibold text-[15px] tracking-tight hover:opacity-80 transition-all ${
            scrolled ? 'text-[#1d1d1f]' : 'text-white'
          }`}
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          The Rig Doctor
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

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/book"
            className={`text-[13px] font-medium rounded-full px-5 py-2 transition-colors ${
              scrolled
                ? 'bg-[#1d1d1f] text-white hover:bg-[#1d1d1f]/90'
                : 'bg-white text-black hover:bg-white/90'
            }`}
          >
            Start a Build
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
