import type { Metadata } from 'next';
import Link from 'next/link';
import BuildTimeline from '@/components/BuildTimeline';

export const metadata: Metadata = {
  title: 'DIY Kit | The Rig Doctor',
  description:
    'Build your own pedalboard the right way. Pro-grade Mogami cables, custom rig blueprint, 60-min Tone Tutoring session, and everything you need to get started. Starting at $750.',
  openGraph: {
    title: 'DIY Kit | The Rig Doctor',
    description:
      'Build your own pedalboard the right way. Pro-grade components + expert guidance. Starting at $750.',
  },
};

const kitIncludes = [
  {
    title: 'Hand-Soldered Mogami Patch Cables',
    description:
      'Custom-length patch cables built with Mogami wire and soldered by hand. The same cables we use in our custom builds.',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.556a4.5 4.5 0 00-6.364-6.364L4.5 8.188" />
      </svg>
    ),
  },
  {
    title: 'Custom Rig Blueprint',
    description:
      'A detailed layout diagram designed for your specific pedals. Optimized signal chain, power routing, and cable paths.',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
      </svg>
    ),
  },
  {
    title: '60-Minute Tone Tutoring Session',
    description:
      'One-on-one with a Rig Doctor builder to walk through your build, dial in your signal chain, and answer every question.',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    title: 'Pedalboard Essentials Kit',
    description:
      'All the mounting hardware and cable management supplies you need to build a clean, professional board.',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
  },
];

export default function DiyKitPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative pt-36 pb-20 sm:pt-44 sm:pb-28 bg-[#0a0a0a] overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(245,166,35,0.15), transparent), radial-gradient(ellipse 40% 40% at 80% 80%, rgba(16,185,129,0.1), transparent)',
          }}
        />
        <div className="relative max-w-[1080px] mx-auto px-6 text-center">
          <p className="text-[#F5A623] text-sm font-medium tracking-wide uppercase mb-4">
            Starting at $750
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#f5f5f7] tracking-tight mb-4">
            DIY Kit
          </h1>
          <p className="text-lg sm:text-xl text-white/50 max-w-xl mx-auto mb-8">
            Pro-grade components and expert guidance. You build it, we make sure you build it right.
          </p>
          <Link
            href="/book"
            className="inline-block bg-[#F5A623] text-[#1d1d1f] font-medium text-sm rounded-full px-8 py-3.5 hover:bg-[#F5A623]/90 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-[1080px] mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1d1d1f] tracking-tight text-center mb-4">
            Everything in the kit.
          </h2>
          <p className="text-center text-[#1d1d1f]/50 text-base mb-14 max-w-lg mx-auto">
            No hunting for parts. No guessing what you need. Open the box and start building.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 max-w-3xl mx-auto">
            {kitIncludes.map((item) => (
              <div
                key={item.title}
                className="bg-[#f5f5f7] rounded-2xl p-8 border border-black/[0.04]"
              >
                <div className="text-[#F5A623] mb-4">{item.icon}</div>
                <h3 className="text-base font-semibold text-[#1d1d1f] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[#1d1d1f]/60 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 sm:py-28 bg-[#f5f5f7]">
        <div className="max-w-[680px] mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1d1d1f] tracking-tight mb-4">
            How it works.
          </h2>
          <p className="text-[#1d1d1f]/50 text-base mb-14">
            Three steps to a board you built yourself.
          </p>

          <div className="space-y-10 text-left">
            <div className="flex gap-5">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#1d1d1f] text-white flex items-center justify-center text-sm font-bold">
                1
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#1d1d1f] mb-1">
                  Tell us about your rig
                </h3>
                <p className="text-sm text-[#1d1d1f]/60 leading-relaxed">
                  Book a free consultation. We will talk through your pedals, your playing style, and what you want your board to do.
                </p>
              </div>
            </div>

            <div className="flex gap-5">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#1d1d1f] text-white flex items-center justify-center text-sm font-bold">
                2
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#1d1d1f] mb-1">
                  We design, you build
                </h3>
                <p className="text-sm text-[#1d1d1f]/60 leading-relaxed">
                  We send your custom kit with a detailed rig blueprint. Your Tone Tutoring session walks you through every step of the build.
                </p>
              </div>
            </div>

            <div className="flex gap-5">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#1d1d1f] text-white flex items-center justify-center text-sm font-bold">
                3
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#1d1d1f] mb-1">
                  Plug in and play
                </h3>
                <p className="text-sm text-[#1d1d1f]/60 leading-relaxed">
                  A board you built yourself, designed by the same people who build rigs for touring artists. Questions after? We are always a text away.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <BuildTimeline theme="light" />

      {/* CTA */}
      <section className="py-20 sm:py-28 bg-[#0a0a0a] text-center">
        <div className="max-w-[680px] mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#f5f5f7] tracking-tight mb-4">
            Ready to build your own?
          </h2>
          <p className="text-base text-white/50 mb-8">
            Book a free consultation and we will design your kit.
          </p>
          <Link
            href="/book"
            className="inline-block bg-[#F5A623] text-[#1d1d1f] font-medium text-sm rounded-full px-8 py-3.5 hover:bg-[#F5A623]/90 transition-colors"
          >
            Book a Consultation
          </Link>
        </div>
      </section>
    </main>
  );
}
