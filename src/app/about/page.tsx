'use client';

import Link from 'next/link';
import Section from '@/components/Section';

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <Section theme="dark" reveal>
        <div className="trd-aurora min-h-[600px] flex flex-col items-center justify-center px-6 py-24 sm:py-32">
          <h1 className="text-[2.75rem] sm:text-[3.5rem] md:text-[4.25rem] font-bold text-center text-white mb-8 max-w-4xl leading-tight">
            Built by a player. For players.
          </h1>
          <p className="text-lg sm:text-xl text-[#f5f5f7]/70 text-center max-w-2xl leading-relaxed">
            17 years of building rigs. Started because I couldn&apos;t find anyone who understood what guitarists actually need.
          </p>
        </div>
      </Section>

      {/* The Story */}
      <Section theme="light" reveal>
        <div className="max-w-3xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-[#1d1d1f]">
            The Story
          </h2>
          <div className="space-y-6 text-lg text-[#1d1d1f]/70 leading-relaxed">
            <p>
              I started out gigging around the Houston area, playing everything from small clubs to bigger venues. Like most players, I spent way too much time chasing tone. Different pedals, boards, cables. But what frustrated me was that most pedalboard solutions felt generic. They weren&apos;t built for how I actually played.
            </p>
            <p>
              So I started building my own. Hand-soldering cables, customizing layouts, stress-testing everything. Other players started asking where they could get a board like mine. Then more asked. Then more.
            </p>
            <p className="text-xl font-semibold text-[#1d1d1f]">
              What started as one guy solving his own problem turned into 200+ rigs for touring artists, session players, worship teams, and bedroom shredders.
            </p>
            <p>
              That&apos;s how The Rig Doctor became a real thing. Not because I wanted to start a company. Because I wanted to build rigs that make sense.
            </p>
          </div>
        </div>
      </Section>

      {/* What We Believe */}
      <Section theme="lightGray" reveal>
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-[#1d1d1f]">
            How we think about this.
          </h2>
          <p className="text-lg text-[#1d1d1f]/50 max-w-2xl">
            Three things that guide every board we build.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-8 border border-black/[0.06]">
            <h3 className="text-xl font-semibold mb-4 text-[#1d1d1f]">
              Your rig should sound like you
            </h3>
            <p className="text-[#1d1d1f]/60 leading-relaxed">
              Every board is designed around your playing style, your genre, your signal chain. That&apos;s the whole point. If we&apos;re not building it for you specifically, we&apos;re not doing our job.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-black/[0.06]">
            <h3 className="text-xl font-semibold mb-4 text-[#1d1d1f]">
              Built to survive the road
            </h3>
            <p className="text-[#1d1d1f]/60 leading-relaxed">
              Hand-soldered connections, pro-grade cable, stress-tested before it ships. These boards don&apos;t quit on you at 11pm on a Saturday night.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-black/[0.06]">
            <h3 className="text-xl font-semibold mb-4 text-[#1d1d1f]">
              We&apos;ll tell you if you don&apos;t need it
            </h3>
            <p className="text-[#1d1d1f]/60 leading-relaxed">
              We&apos;d rather build you the right board than the most expensive one. If something doesn&apos;t serve your sound, we&apos;ll say so.
            </p>
          </div>
        </div>
      </Section>

      {/* By the Numbers */}
      <Section theme="dark" reveal>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 text-center">
          <div>
            <div className="text-4xl sm:text-5xl font-bold mb-2 trd-gradient-text">17+</div>
            <p className="text-[#f5f5f7]/60 text-sm sm:text-base">Years at the bench</p>
          </div>
          <div>
            <div className="text-4xl sm:text-5xl font-bold mb-2 trd-gradient-text">200+</div>
            <p className="text-[#f5f5f7]/60 text-sm sm:text-base">Rigs built</p>
          </div>
          <div className="col-span-2 md:col-span-1">
            <div className="text-4xl sm:text-5xl font-bold mb-2 trd-gradient-text">50+</div>
            <p className="text-[#f5f5f7]/60 text-sm sm:text-base">Touring artists</p>
          </div>
        </div>
      </Section>

      {/* The Workshop */}
      <Section theme="light" reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-[#1d1d1f]">
              The Workshop
            </h2>
            <p className="text-lg text-[#1d1d1f]/70 leading-relaxed mb-6">
              Every build comes out of our shop in Houston, Texas. No outsourcing, no assembly lines. Just hands on boards.
            </p>
            <p className="text-[#1d1d1f]/60 leading-relaxed">
              That&apos;s where we figure out what makes your rig tick, what your needs actually are, and how to build something that works for you night after night.
            </p>
          </div>

          <div className="w-full h-96 rounded-2xl overflow-hidden border border-black/[0.06]">
            <img
              src="https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Rig_Build_27.png?width=800&format=webp"
              alt="The Rig Doctor workshop â Houston, TX"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section theme="dark" reveal className="text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-[#f5f5f7]">
          Want to talk about your rig?
        </h2>
        <p className="text-lg text-[#f5f5f7]/60 mb-10 max-w-2xl mx-auto leading-relaxed">
          Book a free consultation and let&apos;s figure out what it needs.
        </p>
        <Link
          href="/book"
          className="inline-flex items-center gap-2 bg-[#0071E3] hover:bg-[#005BB5] text-white font-semibold px-8 py-4 rounded-full trd-cta-primary"
        >
          Book a Consultation
        </Link>
      </Section>
    </div>
  );
}
