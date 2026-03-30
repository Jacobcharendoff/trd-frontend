'use client';

import { useState } from 'react';
import Link from 'next/link';

const navItems = [
  { label: 'Book a Build', href: '/book' },
  { label: 'Shop', href: '/collections' },
  { label: 'Tone Tutoring', href: '/tone-tutoring' },
  { label: 'The Process', href: '/process' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[rgba(29,29,31,0.92)] backdrop-blur-xl border-b border-white/[0.06]">
      <div className="max-w-[1080px] mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-white font-semibold text-[15px] tracking-tight hover:opacity-80 transition-opacity">
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
              className="text-[13px] text-white/[0.85] hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/book"
            className="text-[13px] font-medium text-black bg-white rounded-full px-5 py-2 hover:bg-white/90 transition-colors"
          >
            Start a Build
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white p-2"
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
        <div className="md:hidden bg-[rgba(29,29,31,0.98)] backdrop-blur-xl border-t border-white/[0.06] px-6 py-6">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-[15px] text-white/[0.85] hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/book"
              onClick={() => setMobileOpen(false)}
              className="text-[15px] font-medium text-black bg-white rounded-full px-6 py-3 text-center mt-2 hover:bg-white/90 transition-colors"
            >
              Start a Build
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
