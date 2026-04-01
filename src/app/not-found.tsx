import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <p className="text-8xl font-bold trd-gradient-text mb-6">404</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#f5f5f7] mb-4">
          Wrong pedal, wrong patch.
        </h1>
        <p className="text-lg text-[#f5f5f7]/60 mb-8">
          Looks like this page got lost in the signal chain. Let&apos;s get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-[#0071E3] hover:bg-[#005BB5] text-white font-semibold px-8 py-4 rounded-full trd-cta-primary"
          >
            Back to Home
          </Link>
          <Link
            href="/book"
            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-[#f5f5f7] font-semibold px-8 py-4 rounded-full transition-colors duration-200 border border-white/10"
          >
            Book a Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
