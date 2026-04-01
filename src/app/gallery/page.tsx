'use client';

import Link from 'next/link';
import Image from 'next/image';
import Section from '@/components/Section';

export default function GalleryPage() {
  const builds = [
    {
      id: 1,
      image: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/MikeStipanovLayout1.png',
      title: 'Mike Stipanov — Session Rig',
      description: 'Full signal chain rebuild with custom switching. Designed for studio-to-stage versatility.',
    },
    {
      id: 2,
      image: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Jeremy_B.png',
      title: 'Jeremy B. — Worship Board',
      description: 'Clean-to-ambient rig with smart loop switching. Built for Sunday mornings and Wednesday nights.',
    },
    {
      id: 3,
      image: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Untitled_design_11.png',
      title: 'The Minimalist — Home Player',
      description: 'Proof that less can be more. Four pedals, zero compromise, all tone.',
    },
    {
      id: 4,
      image: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Rig_Build_27.png',
      title: 'Touring Pro Rig',
      description: 'Road-tested, flight-case ready. Built to survive 200 shows a year.',
    },
  ];

  const categories = [
    {
      title: 'Touring Rigs',
      description: 'Road-proof builds for working musicians',
    },
    {
      title: 'Studio Boards',
      description: 'Optimized for session work and recording',
    },
    {
      title: 'Worship Rigs',
      description: 'Clean ambient tones with smart switching',
    },
    {
      title: 'Home Players',
      description: 'Because your bedroom tone matters too',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <Section theme="dark" reveal noPadding>
        <div className="relative w-full bg-black overflow-hidden">
          <div className="relative trd-aurora min-h-[60vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Off the bench.
              </h1>
              <p className="text-lg sm:text-xl text-[#f5f5f7]/70 max-w-2xl mx-auto leading-relaxed">
                Every board tells a story. Here are some of ours.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Featured Builds Grid */}
      <Section theme="light" reveal>
        <div className="w-full">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-16 text-[#1d1d1f]">
            Recent builds
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Real builds */}
            {builds.map((build) => (
              <div
                key={build.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="relative h-64 overflow-hidden bg-[#f5f5f7]">
                  <Image
                    src={build.image}
                    alt={build.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-[#1d1d1f]">
                    {build.title}
                  </h3>
                  <p className="text-[#1d1d1f]/60 leading-relaxed">
                    {build.description}
                  </p>
                </div>
              </div>
            ))}

            {/* Placeholder cards */}
            <div className="bg-gradient-to-br from-[#0071E3]/10 to-[#00B4D8]/10 rounded-2xl overflow-hidden flex items-center justify-center min-h-96">
              <div className="text-center px-6">
                <p className="text-lg sm:text-xl font-semibold text-[#1d1d1f] mb-2">
                  More builds coming soon
                </p>
                <p className="text-[#1d1d1f]/60">
                  Fresh rigs, fresh stories.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#0071E3]/10 to-[#00B4D8]/10 rounded-2xl overflow-hidden flex items-center justify-center min-h-96">
              <div className="text-center px-6">
                <p className="text-lg sm:text-xl font-semibold text-[#1d1d1f] mb-2">
                  More builds coming soon
                </p>
                <p className="text-[#1d1d1f]/60">
                  Fresh rigs, fresh stories.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Build Categories */}
      <Section theme="lightGray" reveal>
        <div className="w-full">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 text-[#1d1d1f]">
            We build for all kinds of players.
          </h2>
          <p className="text-center text-lg text-[#1d1d1f]/60 mb-16 max-w-2xl mx-auto">
            Different players, different needs. Same standard of work.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 sm:p-10 hover:shadow-md transition-shadow duration-300"
              >
                <div
                  className="text-5xl font-bold mb-6"
                  style={{
                    background: 'linear-gradient(135deg, var(--trd-blue), var(--trd-green))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {index + 1}
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-[#1d1d1f]">
                  {category.title}
                </h3>
                <p className="text-[#1d1d1f]/60 leading-relaxed">
                  {category.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section theme="dark" reveal>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white">
            Want to see yours here?
          </h2>
          <p className="text-lg text-[#f5f5f7]/60 mb-10 max-w-2xl mx-auto leading-relaxed">
            Every build starts with a conversation.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 bg-[#0071E3] hover:bg-[#005BB5] text-white font-semibold px-8 py-4 rounded-full trd-cta-primary"
          >
            Book a Free Consultation
          </Link>
        </div>
      </Section>
    </div>
  );
}
