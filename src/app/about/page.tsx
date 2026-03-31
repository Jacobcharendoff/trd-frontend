'use client';

import Link from 'next/link';
import Image from 'next/image';
import Section from '@/components/Section';

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <Section theme="dark" reveal>
        <div className="trd-aurora min-h-[600px] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center text-white mb-8 max-w-4xl leading-tight">
            Built by a player. For players.
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 text-center max-w-2xl leading-relaxed">
            17+ years of building rigs. Started because I couldn't find anyone who understood what guitarists actually need. Now I build for people just like me.
          </p>
        </div>
      </Section>

      {/* The Story Section */}
      <Section theme="light" reveal>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-[#1d1d1f]">
            The Story
          </h2>
          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p>
              I started out as a gigging guitarist in the Houston area, playing everything from small clubs to bigger venues. Like a lot of players, I spent way too much time chasing tone—trying different pedals, boards, cables, the whole thing. But here's what frustrated me: most pedalboard solutions felt generic. They weren't built for how I actually played or what my rig actually needed.
            </p>
            <p>
              So I started building my own. Hand-soldering cables, customizing layouts, stress-testing everything before I plugged in. Other players started asking where they could get a board like mine. Then more asked. Then more.
            </p>
            <p className="text-xl font-semibold text-[#1d1d1f]">
              What started as one guy solving his own problem turned into 200+ rigs for touring artists, session players, worship teams, and bedroom shredders.
            </p>
            <p>
              That's when The Rig Doctor became real. Not because I wanted to start a business. Because I wanted to build rigs that actually make sense.
            </p>
          </div>
        </div>
      </Section>

      {/* What We Believe Section */}
      <Section theme="lightGray" reveal>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 text-[#1d1d1f]">
            What We Believe
          </h2>
          <p className="text-center text-lg text-gray-600 mb-16 max-w-2xl mx-auto">
            Three principles that guide every board we build.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-lg p-8 sm:p-10">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-[#1d1d1f]">
                Your rig should sound like YOU
              </h3>
              <p className="text-gray-700 leading-relaxed">
                We don't do cookie-cutter. Every board is designed around your playing style, your genre, your signal chain goals. That's the whole point.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-lg p-8 sm:p-10">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-[#1d1d1f]">
                Built to survive the road
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Hand-soldered connections, pro-grade cable, stress-tested before it ships. These boards don't quit on you at 11pm on a Saturday night.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-lg p-8 sm:p-10">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-[#1d1d1f]">
                No BS, just tone
              </h3>
              <p className="text-gray-700 leading-relaxed">
                We'll tell you if you don't need something. We'd rather build you the right board than the most expensive one.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* By the Numbers Section */}
      <Section theme="dark" reveal>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-16 text-white">
            By the Numbers
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
            {/* Stat 1 */}
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold mb-2" style={{ color: 'var(--trd-blue)' }}>
                17+
              </div>
              <p className="text-gray-300 text-sm sm:text-base">Years Experience</p>
            </div>

            {/* Stat 2 */}
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold mb-2" style={{ color: 'var(--trd-blue)' }}>
                200+
              </div>
              <p className="text-gray-300 text-sm sm:text-base">Rigs Built</p>
            </div>

            {/* Stat 3 */}
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold mb-2" style={{ color: 'var(--trd-blue)' }}>
                50+
              </div>
              <p className="text-gray-300 text-sm sm:text-base">Touring Artists</p>
            </div>

            {/* Stat 4 */}
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold mb-2" style={{ color: 'var(--trd-blue)' }}>
                100%
              </div>
              <p className="text-gray-300 text-sm sm:text-base">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </Section>

      {/* The Workshop Section */}
      <Section theme="light" reveal>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Text */}
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-[#1d1d1f]">
                The Workshop
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Every build comes out of our workshop in Montgomery, Texas. No outsourcing, no assembly lines — just hands on boards.
              </p>
              <p className="text-gray-600 leading-relaxed">
                That's where the magic happens. That's where we get to know what makes your rig tick, what your needs actually are, and how to build something that's gonna work for you.
              </p>
            </div>

            {/* Image Placeholder */}
            <div className="w-full h-96 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-gray-500 text-lg font-medium">Workshop Image</div>
                <div className="text-gray-400 text-sm mt-2">Montgomery, TX</div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section theme="dark" reveal>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white">
            Ready to talk tone?
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Book a free consultation and let's figure out what your rig needs.
          </p>
          <Link
            href="/book"
            className="inline-block px-8 sm:px-10 py-4 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-lg hover:scale-105"
            style={{ backgroundColor: 'var(--trd-blue)' }}
          >
            Book a Consultation
          </Link>
        </div>
      </Section>
    </div>
  );
}
