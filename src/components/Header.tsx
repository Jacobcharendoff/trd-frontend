'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface NavChild {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href?: string;
  children?: NavChild[];
}

const navItems: NavItem[] = [
  {
    label: 'Rig Building',
    children: [
      { label: 'Custom Builds', href: '/custom-builds' },
      { label: 'DIY Kit', href: '/diy-kit' },
    ],
  },
  { label: 'Tone Tutoring', href: '/tone-tutoring' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Blog', href: '/blog' },
];

/* -- Announcement bar config -- */
const announcement = {
  text: 'Gift Cards now available — give the gift of better tone.',
  href: '/gift-cards',
  cta: 'Shop Gift Cards →',
};

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileRigOpen, setMobileRigOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  /* -- Scroll listener -- */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* -- Close dropdown on click outside -- */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* -- Announcement Bar -- */}
      {bannerVisible && (
        <div className="relative bg-[#1d1d1f] text-white text-center">
          <Link
            href={announcement.href}
            className="block px-10 py-2 text-[12px] sm:text-[13px] font-medium tracking-wide hover:opacity-90 transition-opacity"
          >
            <span className="hidden sm:inline">{announcement.text}</span>
            <span className="sm:hidden">Gift Cards now available</span>
            {' '}
            <span className="underline underline-offset-2 font-semibold">{announcement.cta}</span>
          </Link>
          <button
            onClick={(e) => {
              e.preventDefault();
              setBannerVisible(false);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-1"
            aria-label="Close announcement"
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* -- Main Nav -- */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          scrolled
            ? 'bg-[rgba(255,255,255,0.85)] backdrop-blur-xl border-b border-black/[0.06]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-[1080px] mx-auto px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <img
              src="/trd-logo.svg"
              alt="The Rig Doctor"
              className="h-7 w-auto"
              style={{
                filter: scrolled ? 'brightness(0)' : 'brightness(1)',
                transition: 'filter 300ms ease',
              }}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  ref={dropdownRef}
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className={`flex items-center gap-1 text-[13px] transition-colors duration-300 ${
                      scrolled
                        ? 'text-[#1d1d1f]/85 hover:text-[#1d1d1f]'
                        : 'text-white/[0.85] hover:text-white'
                    }`}
                  >
                    {item.label}
                    <svg
                      viewBox="0 0 12 12"
                      className={`w-3 h-3 transition-transform duration-200 ${
                        dropdownOpen ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M3 4.5l3 3 3-3" />
                    </svg>
                  </button>

                  {/* Dropdown Panel */}
                  {dropdownOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2">
                      <div className="bg-white/90 backdrop-blur-xl rounded-xl border border-black/[0.06] shadow-lg py-2 min-w-[180px]">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setDropdownOpen(false)}
                            className="block px-4 py-2.5 text-[13px] text-[#1d1d1f]/85 hover:bg-black/[0.04] hover:text-[#1d1d1f] transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href!}
                  className={`text-[13px] transition-colors duration-300 ${
                    scrolled
                      ? 'text-[#1d1d1f]/85 hover:text-[#1d1d1f]'
                      : 'text-white/[0.85] hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/book"
              className={`text-[13px] font-medium rounded-full px-5 py-2 transition-colors duration-300 ${
                scrolled
                  ? 'text-white bg-[#1d1d1f] hover:bg-[#1d1d1f]/90'
                  : 'text-black bg-white hover:bg-white/90'
              }`}
            >
              Book a Consultation
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden p-2 transition-colors duration-300 ${
              scrolled ? 'text-[#1d1d1f]' : 'text-white'
            }`}
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
          <div
            className={`md:hidden backdrop-blur-xl px-6 py-6 transition-colors duration-300 ${
              scrolled
                ? 'bg-[rgba(255,255,255,0.98)] border-t border-black/[0.06]'
                : 'bg-[rgba(29,29,31,0.98)] border-t border-white/[0.06]'
            }`}
          >
            <nav className="flex flex-col gap-4">
              {navItems.map((item) =>
                item.children ? (
                  <div key={item.label}>
                    <button
                      onClick={() => setMobileRigOpen(!mobileRigOpen)}
                      className={`flex items-center justify-between w-full text-[15px] transition-colors duration-300 ${
                        scrolled
                          ? 'text-[#1d1d1f]/85 hover:text-[#1d1d1f]'
                          : 'text-white/[0.85] hover:text-white'
                      }`}
                    >
                      {item.label}
                      <svg
                        viewBox="0 0 12 12"
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          mobileRigOpen ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M3 4.5l3 3 3-3" />
                      </svg>
                    </button>
                    {mobileRigOpen && (
                      <div className="mt-2 ml-4 flex flex-col gap-3">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            className={`text-[14px] transition-colors duration-300 ${
                              scrolled
                                ? 'text-[#1d1d1f]/70 hover:text-[#1d1d1f]'
                                : 'text-white/70 hover:text-white'
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href!}
                    onClick={() => setMobileOpen(false)}
                    className={`text-[15px] transition-colors duration-300 ${
                      scrolled
                        ? 'text-[#1d1d1f]/85 hover:text-[#1d1d1f]'
                        : 'text-white/[0.85] hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              )}
              <Link
                href="/book"
                onClick={() => setMobileOpen(false)}
                className={`text-[15px] font-medium rounded-full px-6 py-3 text-center mt-2 transition-colors duration-300 ${
                  scrolled
                    ? 'text-white bg-[#1d1d1f] hover:bg-[#1d1d1f]/90'
                    : 'text-black bg-white hover:bg-white/90'
                }`}
              >
                Book a Consultation
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
