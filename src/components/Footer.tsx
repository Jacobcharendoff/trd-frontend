import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#1d1d1f] text-white/50 py-16">
      <div className="max-w-[1080px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="text-white font-semibold text-lg tracking-tight block mb-3">
              The Rig Doctor
            </Link>
            <p className="text-[13px] leading-relaxed">
              Custom pedalboard builds for touring artists and home players. Montgomery, TX.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white text-[11px] font-semibold uppercase tracking-widest mb-4">Services</h4>
            <nav className="flex flex-col gap-2.5">
              <Link href="/book" className="text-[13px] hover:text-white transition-colors">Custom Builds</Link>
              <Link href="/tone-tutoring" className="text-[13px] hover:text-white transition-colors">Tone Tutoring</Link>
              <Link href="/process" className="text-[13px] hover:text-white transition-colors">The Process</Link>
            </nav>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-white text-[11px] font-semibold uppercase tracking-widest mb-4">Shop</h4>
            <nav className="flex flex-col gap-2.5">
              <Link href="/collections" className="text-[13px] hover:text-white transition-colors">All Products</Link>
              <Link href="/collections/diy-kits" className="text-[13px] hover:text-white transition-colors">DIY Kits</Link>
              <Link href="/collections/cables" className="text-[13px] hover:text-white transition-colors">Cables</Link>
            </nav>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white text-[11px] font-semibold uppercase tracking-widest mb-4">Company</h4>
            <nav className="flex flex-col gap-2.5">
              <Link href="/about" className="text-[13px] hover:text-white transition-colors">About</Link>
              <Link href="/blog" className="text-[13px] hover:text-white transition-colors">Blog</Link>
              <a href="mailto:info@therigdr.com" className="text-[13px] hover:text-white transition-colors">Contact</a>
              <a href="https://www.instagram.com/therigdr" target="_blank" rel="noopener" className="text-[13px] hover:text-white transition-colors">Instagram</a>
            </nav>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/[0.06] pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[12px]">&copy; {new Date().getFullYear()} The Rig Doctor Inc. All rights reserved.</p>
          <div className="flex gap-6 text-[12px]">
            <Link href="/policies/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/policies/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/policies/refund" className="hover:text-white transition-colors">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
