'use client';

import Link from 'next/link';
import { Instagram, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 mt-32 border-t border-white/10 bg-black py-16">
      <div className="container mx-auto max-w-6xl px-6">
        {/* Main Footer Content */}
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand Section */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-3">The Rig Doctor</h3>
            <p className="text-sm text-gray-400 mb-4">
              Professional custom pedalboard builds for touring artists and home players. Houston, TX.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/therigdr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-white/10 rounded transition"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a
                href="mailto:info@therigdr.com"
                className="p-2 hover:bg-white/10 rounded transition"
              >
                <Mail className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/book" className="text-gray-400 hover:text-white transition">
                  Book Consultation
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-gray-400 hover:text-white transition">
                  Shop Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refunds" className="text-gray-400 hover:text-white transition">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-12" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; {currentYear} The Rig Doctor. All rights reserved.</p>
          <p>Built with precision. Delivered with passion.</p>
        </div>
      </div>
    </footer>
  );
}
