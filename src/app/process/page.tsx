'use client';

import Link from 'next/link';
import { useState } from 'react';
import Section from '@/components/Section';

export default function Process() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How much does a custom build cost?',
      answer: "It depends on your setup — a simple 5-pedal board starts around $200-300 in labor, while a complex touring rig with switching systems can run $800+. Pedals and components are separate. We'll give you a transparent quote before any work starts.",
    },
    {
      question: 'How long does a build take?',
      answer: "Most builds take 2-4 weeks from approval to shipping. Complex rigs with custom switching or multiple boards might take a bit longer. We'll give you a timeline upfront.",
    },
    {
      question: 'Do I need to supply my own pedals?',
      answer: "You can! If you already have your pedals, ship them to us and we'll build around them. If you need recommendations or want us to source specific gear, we can do that too.",
    },
    {
      question: 'Do you ship internationally?',
      answer: "Yes — we've shipped boards across the US and internationally. Shipping costs vary by location and we'll quote that separately.",
    },
    {
      question: 'What if I want to change my setup later?',
      answer: "That's what lifetime support is for. Need to swap a pedal, add a new one, or rethink your chain? We'll help you plan the update and can do the work if needed.",
    },
  ];

  const includedItems = [
    {
      title: 'Hand-soldered connections',
      description: 'Pro-quality construction that lasts.',
    },
    {
      title: 'Pro-grade patch cables',
      description: 'Low-noise, reliable signal path.',
    },
    {
      title: 'Custom power distribution',
      description: 'Clean power for every pedal.',
    },
    {
      title: 'Signal chain optimization',
      description: 'Tuned for your tone.',
    },
    {
      title: 'Full documentation package',
      description: 'Everything you need to understand your rig.',
    },
    {
      title: 'Lifetime support',
      description: "We're here whenever you need us.",
    },
  ];

  return (
    <>
      {/* ──── HERO SECTION (dark with aurora) ──── */}
      <div className="relative w-full bg-black overflow-hidden">
        <div className="relative trd-aurora min-h-[60vh] flex items-center justify-center">
          <div className="absolute inset-0 pointer-events-none" />
          <div className="relative z-10 max-w-[1080px] mx-auto px-6 py-20 w-full">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight text-[#f5f5f7] mb-6">
                How we build yours.
              </h1>
              <p className="text-lg sm:text-xl text-[#f5f5f7]/80 max-w-2xl mx-auto leading-relaxed">
                From first call to first gig — here's exactly what happens when you work with us.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ──── STEP 1: WE TALK (light) ──── */}
      <Section theme="light" reveal>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="text-6xl sm:text-7xl md:text-8xl font-bold trd-gradient-text mb-8">01</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1d1d1f] mb-6">We Talk</h2>
            <p className="text-lg text-[#1d1d1f]/70 leading-relaxed">
              It starts with a conversation. Hop on a free 30-minute call and tell us everything — what you play, what drives you crazy about your current setup, what tone you're chasing. We'll ask the right questions to understand your playing style, your gig schedule, and your signal chain goals. No sales pitch. Just two guitarists talking tone.
            </p>
          </div>
          <div className="bg-[#f5f5f7] rounded-2xl p-8 h-fit border border-black/[0.06]">
            <p className="text-sm font-semibold text-[#1d1d1f]/50 uppercase tracking-wide mb-4">What to expect</p>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-[#1d1d1f]/50">Duration</p>
                <p className="text-lg font-semibold text-[#1d1d1f]">30 minutes</p>
              </div>
              <div>
                <p className="text-sm text-[#1d1d1f]/50">Cost</p>
                <p className="text-lg font-semibold text-[#1d1d1f]">Free</p>
              </div>
              <div>
                <p className="text-sm text-[#1d1d1f]/50">Format</p>
                <p className="text-lg font-semibold text-[#1d1d1f]">Video or phone call</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ──── STEP 2: WE DESIGN (lightGray) ──── */}
      <Section theme="lightGray" reveal>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="text-6xl sm:text-7xl md:text-8xl font-bold trd-gradient-text mb-8">02</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1d1d1f] mb-6">We Design</h2>
            <p className="text-lg text-[#1d1d1f]/70 leading-relaxed">
              Based on our conversation, we map out your entire rig. Signal chain order, power distribution, cable routing, switching logic — every detail gets planned before we touch a soldering iron. You'll get a full build plan with layout mockups so you can see exactly what you're getting.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 h-fit border border-black/[0.06]">
            <p className="text-sm font-semibold text-[#1d1d1f]/50 uppercase tracking-wide mb-4">You'll receive</p>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-[#1d1d1f]/50">Signal chain diagram</p>
              </div>
              <div>
                <p className="text-sm text-[#1d1d1f]/50">Layout mockup</p>
              </div>
              <div>
                <p className="text-sm text-[#1d1d1f]/50">Component list</p>
              </div>
              <div>
                <p className="text-sm text-[#1d1d1f]/50">Transparent quote</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ──── STEP 3: WE BUILD (light) ──── */}
      <Section theme="light" reveal>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="text-6xl sm:text-7xl md:text-8xl font-bold trd-gradient-text mb-8">03</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1d1d1f] mb-6">We Build</h2>
            <p className="text-lg text-[#1d1d1f]/70 leading-relaxed">
              This is where it gets real. Every cable is hand-soldered with pro-grade materials. Every connection is tested. Every pedal is mounted for maximum accessibility and minimum noise. We don't rush builds — your board gets the time it deserves. And we stress-test everything before it ships.
            </p>
          </div>
          <div className="bg-[#f5f5f7] rounded-2xl p-8 h-fit border border-black/[0.06]">
            <p className="text-sm font-semibold text-[#1d1d1f]/50 uppercase tracking-wide mb-4">Build specs</p>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-[#1d1d1f]/50">Build time</p>
                <p className="text-lg font-semibold text-[#1d1d1f]">2-4 weeks</p>
              </div>
              <div>
                <p className="text-sm text-[#1d1d1f]/50">Construction</p>
                <p className="text-lg font-semibold text-[#1d1d1f]">All hand-wired</p>
              </div>
              <div>
                <p className="text-sm text-[#1d1d1f]/50">Quality assurance</p>
                <p className="text-lg font-semibold text-[#1d1d1f]">Stress-tested</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ──── STEP 4: YOU PLAY (lightGray) ──── */}
      <Section theme="lightGray" reveal>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="text-6xl sm:text-7xl md:text-8xl font-bold trd-gradient-text mb-8">04</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1d1d1f] mb-6">You Play</h2>
            <p className="text-lg text-[#1d1d1f]/70 leading-relaxed">
              Your board ships to your door, ready to plug in and play. We include a full documentation package with your signal chain diagram, settings reference, and care instructions. And here's the thing — we don't disappear after delivery. Lifetime support means if you ever need a tweak, a swap, or just want to talk tone, we're a call away.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 h-fit border border-black/[0.06]">
            <p className="text-sm font-semibold text-[#1d1d1f]/50 uppercase tracking-wide mb-4">After delivery</p>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-[#1d1d1f]/50">Documentation</p>
                <p className="text-lg font-semibold text-[#1d1d1f]">Full package included</p>
              </div>
              <div>
                <p className="text-sm text-[#1d1d1f]/50">Support</p>
                <p className="text-lg font-semibold text-[#1d1d1f]">Lifetime</p>
              </div>
              <div>
                <p className="text-sm text-[#1d1d1f]/50">Ready to</p>
                <p className="text-lg font-semibold text-[#1d1d1f]">Plug in and play</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ──── WHAT'S INCLUDED (dark) ──── */}
      <Section theme="dark" reveal>
        <div className="mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#f5f5f7]">
            Every build includes
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {includedItems.map((item, idx) => (
            <div key={idx} className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-br from-[#F5A623] to-[#10B981]">
                  <span className="text-white font-bold">{(idx + 1).toString().padStart(2, '0')}</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#f5f5f7] mb-2">{item.title}</h3>
                <p className="text-[#f5f5f7]/60">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ──── FAQ (light) ──── */}
      <Section theme="light" reveal>
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1d1d1f]">
            Questions we get a lot.
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-black/[0.06] rounded-2xl overflow-hidden bg-[#f5f5f7]/40 transition-all duration-300"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full px-8 py-6 flex items-center justify-between hover:bg-[#f5f5f7]/60 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-[#1d1d1f] text-left">{faq.question}</h3>
                <div className="flex-shrink-0 ml-4">
                  <div
                    className={`w-6 h-6 flex items-center justify-center transition-transform duration-300 ${
                      openFaq === idx ? 'rotate-180' : ''
                    }`}
                  >
                    <span className="text-[#1d1d1f]/60 text-xl">▼</span>
                  </div>
                </div>
              </button>
              {openFaq === idx && (
                <div className="px-8 pb-6 pt-2 border-t border-black/[0.06] animate-in fade-in slide-in-from-top-2 duration-300">
                  <p className="text-[#1d1d1f]/70 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* ──── CLOSING CTA (dark) ──── */}
      <Section theme="dark" reveal className="text-center">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#f5f5f7] mb-4">
            Ready to start?
          </h2>
          <p className="text-lg text-[#f5f5f7]/70 max-w-2xl mx-auto">
            Book a free consultation and let's design your next rig.
          </p>
        </div>
        <div className="flex justify-center">
          <Link
            href="/book"
            className="inline-flex items-center gap-2 bg-[#F5A623] hover:bg-[#D48A1A] text-black font-semibold px-8 py-4 rounded-full transition-colors duration-200"
          >
            Book a Free Consultation
          </Link>
        </div>
      </Section>
    </>
  );
}
