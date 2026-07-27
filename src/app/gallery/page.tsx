'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import Section from '@/components/Section';

const builds = [
  {
    id: 1,
    image: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Javy_B.png?v=1773867365',
    title: 'Javy B. — Touring Rig',
    description: 'Full MIDI switching system with isolated power. Built for 200+ shows a year.',
    category: 'touring',
  },
  {
    id: 2,
    image: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/William_O._1.png?v=1773867364',
    title: 'William O. — Studio Board',
    description: 'Ultra-quiet signal chain optimized for recording. Instant recall between sessions.',
    category: 'studio',
  },
  {
    id: 3,
    image: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Josh_W.png?v=1773867364',
    title: 'Josh W. — Worship Rig',
    description: 'Clean ambient tones with smart loop switching. Sunday mornings to Wednesday nights.',
    category: 'worship',
  },
  {
    id: 4,
    image: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Vince_D.png?v=1773867366',
    title: 'Vince D. — MIDI Integration',
    description: 'Full preset-based control with RJM switching. Every combination at your feet.',
    category: 'touring',
  },
  {
    id: 5,
    image: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Hunter_W._1.jpg?v=1774980806',
    title: 'Hunter W. — Home Player',
    description: 'Pro-grade tone in a compact footprint. Proof that less can be more.',
    category: 'home',
  },
  {
    id: 6,
    image: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Vince_D._2.jpg?v=1777143325',
    title: 'Vince D. — Cable Detail',
    description: 'Clean routing, labeled runs, strain relief on every connection. This is what the back of a real board looks like.',
    category: 'studio',
  },
  {
    id: 7,
    image: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/MikeStipanovLayout1.png',
    title: 'Mike Stipanov — Session Rig',
    description: 'Full signal chain rebuild with custom switching. Designed for studio-to-stage versatility.',
    category: 'studio',
  },
  {
    id: 8,
    image: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Jeremy_B.png',
    title: 'Jeremy B. — Worship Board',
    description: 'Clean-to-ambient rig with smart loop switching. Built for reliability every week.',
    category: 'worship',
  },
  {
    id: 9,
    image: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Jacob_S.png',
    title: 'Jacob S. — Full Rebuild',
    description: 'Complete rig teardown and rebuild. New wiring, new power, same pedals — totally different tone.',
    category: 'touring',
  },
  {
    id: 10,
    image: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/John_A._1.png',
    title: 'John A. — Custom Build',
    description: 'Hand-soldered from scratch. Every cable custom-cut, every connection verified.',
    category: 'touring',
  },
  {
    id: 11,
    image: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Saxon_W..jpg',
    title: 'Saxon W. — Artist Build',
    description: 'Designed for a working touring musician. Road-proof, flight-case ready, dead quiet.',
    category: 'touring',
  },
  {
    id: 12,
    image: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Rig_Build_27.png',
    title: 'Touring Pro — Road Warrior',
    description: 'Built to survive 200 shows a year. Reinforced mounting, redundant power, zero compromise.',
    category: 'touring',
  },
];

const categories = ['all', 'touring', 'studio', 'worship', 'home'] as const;

export default function GalleryPage() {
  const [filter, setFilter] = useState<string>('all');

  const filtered = filter === 'all' ? builds : builds.filter((b) => b.category === filter);

  return (
    <div>
      {/* Hero Section */}
      <Section theme="dark" reveal noPadding>
        <div className="relative w-full bg-black overflow-hidden">
          <div className="relative min-h-[60vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Custom builds, off the bench.
              </h1>
              <p className="text-lg sm:text-xl text-[#f5f5f7]/70 max-w-2xl mx-auto leading-relaxed">
                Every board tells a story. Here are some of ours.
              </p>
              <div className="flex justify-center items-center gap-8 sm:gap-16 mt-10 pt-8 border-t border-white/10">
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-white">500+</p>
                  <p className="text-sm text-[#f5f5f7]/50 mt-1">rigs built</p>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-white">17</p>
                  <p className="text-sm text-[#f5f5f7]/50 mt-1">years experience</p>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-[#0071E3]">50+</p>
                  <p className="text-sm text-[#f5f5f7]/50 mt-1">touring artists</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Build Grid */}
      <Section theme="light" reveal>
        <div className="w-full">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1d1d1f]">
              Recent builds
            </h2>

            {/* Filter tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 capitalize ${
                    filter === cat
                      ? 'bg-[#1d1d1f] text-white'
                      : 'bg-[#f5f5f7] text-[#1d1d1f]/60 hover:bg-[#e8e8ed] hover:text-[#1d1d1f]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((build) => (
              <div
                key={build.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-64 overflow-hidden bg-[#0a0a0a]">
                  <Image
                    src={build.image}
                    alt={build.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-black/50 backdrop-blur-sm text-white text-xs font-medium tracking-wider uppercase px-3 py-1 rounded-full">
                      {build.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2 text-[#1d1d1f]">
                    {build.title}
                  </h3>
                  <p className="text-[#1d1d1f]/60 text-sm leading-relaxed">
                    {build.description}
                  </p>
                </div>
              </div>
            ))}
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
            {[
              { title: 'Touring Rigs', description: 'Road-proof builds for working musicians' },
              { title: 'Studio Boards', description: 'Optimized for session work and recording' },
              { title: 'Worship Rigs', description: 'Clean ambient tones with smart switching' },
              { title: 'Home Players', description: 'Because your bedroom tone matters too' },
            ].map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 sm:p-10 hover:shadow-md transition-shadow duration-300"
              >
                <div
                  className="text-5xl font-bold mb-6"
                  style={{
                    background: 'linear-gradient(135deg, var(--trd-blue), var(--trd-purple))',
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
