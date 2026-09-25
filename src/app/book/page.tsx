'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import BeforeAfter from '@/components/BeforeAfter';
import ReviewsMarquee from '@/components/ReviewsMarquee';
import ParallaxImage from '@/components/home/ParallaxImage';
import Reveal from '@/components/home/Reveal';
import {
  IconVideo,
  IconBlueprint,
  IconSolder,
  IconShip,
  IconQuiet,
  IconLifetime,
  IconArrow,
} from '@/components/home/Icons';

const CDN = 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/';

const wall = [
  'Agustin_Q..jpg',
  'Hunter_W._1.jpg',
  'Javy_B.png',
  'AfterlightImage-4.jpg',
  'Chris_G.png',
  'Saxon_W..jpg',
  'Shannon_G._2.png',
  'Jeremy_B.png',
];

const artists = ['Andy Timmons', 'Oz Noy', 'Michael Landau', 'Kirk Fletcher', 'Josh Smith', 'Matt Schofield'];

/* ─────────────── Form ─────────────── */
function ConsultForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', email: '', instrument: '', rig: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) router.push('/book/thank-you');
      else setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  const input =
    'w-full px-4 py-3.5 rounded-xl bg-[#f5f5f7] border border-transparent text-black placeholder:text-black/35 focus:outline-none focus:bg-white focus:border-[#8E3FD9]/40 focus:ring-4 focus:ring-[#8E3FD9]/10 transition-all text-[15px]';

  return (
    <form id="consult-form" onSubmit={handleSubmit} className="scroll-mt-32 bg-white rounded-[28px] p-6 sm:p-8 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] space-y-3.5">
      <div className="mb-2">
        <p className="text-black text-xl font-bold tracking-tight">Start your free consultation</p>
        <p className="text-black/50 text-[14px] mt-1">A builder replies within 24 hours.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <label className="sr-only" htmlFor="c-name">Your name</label>
        <input id="c-name" type="text" placeholder="Your name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={input} />
        <label className="sr-only" htmlFor="c-email">Your email</label>
        <input id="c-email" type="email" placeholder="Your email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={input} />
      </div>
      <label className="sr-only" htmlFor="c-inst">What do you play?</label>
      <input id="c-inst" type="text" placeholder="What do you play? Guitar, bass, keys..." value={formData.instrument} onChange={(e) => setFormData({ ...formData, instrument: e.target.value })} className={input} />
      <label className="sr-only" htmlFor="c-rig">What's going on with your rig?</label>
      <textarea
        id="c-rig"
        rows={4}
        placeholder="What's bugging you? Hum, tap-dancing between pedals, a mess under the board, tone that disappears by the third pedal. The more detail the better."
        value={formData.rig}
        onChange={(e) => setFormData({ ...formData, rig: e.target.value })}
        className={`${input} resize-none`}
      />
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="trd-cta-gradient w-full inline-flex items-center justify-center gap-2 py-4 rounded-full font-semibold text-[16px] disabled:opacity-60"
      >
        {status === 'submitting' ? 'Sending...' : 'Get my free consultation'}
        {status !== 'submitting' && <IconArrow />}
      </button>
      {status === 'error' && <p className="text-red-600 text-sm text-center">That didn&apos;t go through. Try again or email info@therigdr.com.</p>}
      <div className="flex flex-wrap justify-center gap-x-5 gap-y-1 pt-1 text-[13px] text-black/45">
        <span>30-minute call</span>
        <span aria-hidden="true">&middot;</span>
        <span>Free</span>
        <span aria-hidden="true">&middot;</span>
        <span>No obligation</span>
      </div>
    </form>
  );
}

export default function BookPage() {
  return (
    <>
      {/* ───────── HERO + FORM (above the fold) ───────── */}
      <section className="relative bg-black overflow-hidden">
        <div className="absolute inset-0">
          <Image src={`${CDN}jYrUGxJ.jpg`} alt="" fill priority sizes="100vw" className="object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/40" />
        </div>
        <div className="relative max-w-[1200px] mx-auto px-6 py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center">
          <div>
            <p className="trd-eyebrow text-white/55 mb-6">Free rig consultation &middot; 2 build spots left in 2026</p>
            <h1 className="text-white font-bold tracking-[-0.045em] leading-[1.0] text-[clamp(42px,6vw,76px)] mb-6">
              Tell us about your rig. <span className="trd-gradient-text">We&apos;ll tell you what we&apos;d build.</span>
            </h1>
            <p className="text-white/70 text-lg sm:text-xl leading-relaxed max-w-xl mb-10">
              Ground loops, spaghetti wiring, 15 minutes of setup while the band waits. One call and you&apos;ll know
              exactly what your board needs and what it costs. No pitch.
            </p>
            <ul className="space-y-4 mb-10">
              {[
                { Icon: IconVideo, t: 'A 30-minute call with a builder', d: 'Not a sales rep. One of the two guys who wires your board.' },
                { Icon: IconBlueprint, t: 'A real plan for your rig', d: 'Signal chain, power and switching, mapped to how you play.' },
                { Icon: IconQuiet, t: 'A straight quote', d: 'Builds start at $1,999 USD. You get a real number up front.' },
              ].map(({ Icon, t, d }) => (
                <li key={t} className="flex gap-4">
                  <span className="trd-icon-ring w-11 h-11 shrink-0 text-white">
                    <Icon size={22} />
                  </span>
                  <div>
                    <p className="text-white font-semibold text-[16px]">{t}</p>
                    <p className="text-white/55 text-[15px]">{d}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-8 border-t border-white/10">
              {[
                ['300+', 'boards built'],
                ['17', 'years at the bench'],
                ['4-8', 'weeks to ship'],
              ].map(([n, l]) => (
                <div key={l}>
                  <p className="text-2xl font-bold text-white">{n}</p>
                  <p className="text-[13px] text-white/50">{l}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:pl-4">
            <ConsultForm />
          </div>
        </div>
      </section>

      {/* ───────── PROOF STRIP ───────── */}
      <section className="bg-white border-b border-black/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6 py-10 flex flex-col md:flex-row items-center gap-5 md:gap-10">
          <p className="trd-eyebrow text-black/40 shrink-0">Mason has built rigs for</p>
          <ul className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-2">
            {artists.map((a) => (
              <li key={a} className="text-black/80 text-[17px] font-semibold tracking-tight">{a}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────── WHAT HAPPENS NEXT ───────── */}
      <section className="bg-white py-24 sm:py-32">
        <div className="max-w-[1200px] mx-auto px-6">
          <Reveal className="max-w-3xl mb-16">
            <p className="trd-eyebrow text-black/40 mb-5">What happens after you hit send</p>
            <h2 className="text-black font-bold tracking-[-0.04em] leading-[1.02] text-[clamp(36px,5vw,64px)]">
              From your message <span className="trd-gradient-text">to your board.</span>
            </h2>
          </Reveal>
          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { n: '01', Icon: IconVideo, t: 'We talk', d: 'A builder reaches out within 24 hours to set up a free 30-minute call about your rig.', img: 'Tone_Consultation_Screen_1.png' },
              { n: '02', Icon: IconBlueprint, t: 'We design it', d: 'Wiring diagram, power layout, signal chain order and parts list, before a single cable is cut.', img: 'Signal_Routing.png' },
              { n: '03', Icon: IconSolder, t: 'We build it by hand', d: 'Hand-soldered connections, cables cut to length, isolated power. The same two builders on every board.', img: '6_219d02cd-1fd7-44f4-ab74-f42783ae338f.png' },
              { n: '04', Icon: IconShip, t: 'It ships ready', d: 'Tested under load, then shipped back insured. Uncase it, plug in, play.', img: 'Pedal-Board-Building-Original-scaled.jpg' },
            ].map(({ n, Icon, t, d, img }, i) => (
              <Reveal as="li" key={n} delay={i * 90} className="bg-[#f5f5f7] rounded-[28px] overflow-hidden">
                <div className="trd-photo relative aspect-[4/3] bg-black">
                  <Image src={`${CDN}${img}`} alt={t} fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover" />
                  <span className="absolute top-4 left-4 text-white/90 text-[12px] font-semibold tracking-[0.2em] bg-black/45 backdrop-blur-md rounded-full px-3 py-1">STEP {n}</span>
                </div>
                <div className="p-7">
                  <span className="trd-icon-ring w-10 h-10 text-black mb-4">
                    <Icon size={20} />
                  </span>
                  <h3 className="text-xl font-bold tracking-tight text-black mb-2">{t}</h3>
                  <p className="text-black/55 text-[15px] leading-relaxed">{d}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────── BEFORE / AFTER ───────── */}
      <section className="bg-[#f5f5f7] py-24 sm:py-32">
        <div className="max-w-[1200px] mx-auto px-6">
          <Reveal className="text-center max-w-3xl mx-auto mb-16">
            <p className="trd-eyebrow text-black/40 mb-5">The difference</p>
            <h2 className="text-black font-bold tracking-[-0.04em] leading-[1.02] text-[clamp(36px,5vw,64px)]">
              Same pedals. Same player. <span className="trd-gradient-text">Drag the slider.</span>
            </h2>
          </Reveal>
          <BeforeAfter />
        </div>
      </section>

      {/* ───────── WALL ───────── */}
      <section className="bg-black py-24 sm:py-32">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 px-2">
            <div className="max-w-2xl">
              <p className="trd-eyebrow text-white/45 mb-5">Flip it over</p>
              <h2 className="text-white font-bold tracking-[-0.04em] leading-[1.02] text-[clamp(36px,5vw,64px)]">
                Every one of these <span className="trd-gradient-text">went out quiet.</span>
              </h2>
            </div>
            <Link href="/gallery" className="text-white/70 hover:text-white text-[15px] font-medium inline-flex items-center gap-2 shrink-0">
              See the full gallery <IconArrow />
            </Link>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
            {wall.map((f, i) => (
              <Reveal key={f} delay={(i % 4) * 60} className="trd-photo relative aspect-square rounded-2xl bg-[#111]">
                <Image src={`${CDN}${f}`} alt="Custom pedalboard built by The Rig Doctor" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── REVIEWS ───────── */}
      <section className="bg-white py-24 sm:py-32">
        <Reveal className="text-center max-w-3xl mx-auto px-6 mb-12">
          <p className="trd-eyebrow text-black/40 mb-5">From the players</p>
          <h2 className="text-black font-bold tracking-[-0.04em] leading-[1.02] text-[clamp(36px,5vw,64px)]">
            &ldquo;Three tours. Two continents. <span className="trd-gradient-text">Zero issues.&rdquo;</span>
          </h2>
        </Reveal>
        <ReviewsMarquee />
      </section>

      {/* ───────── NOT READY? ───────── */}
      <section className="bg-[#f5f5f7] py-20">
        <Reveal className="max-w-[1000px] mx-auto px-6">
          <div className="bg-white rounded-[28px] p-8 sm:p-12 flex flex-col md:flex-row items-start md:items-center gap-8 justify-between border border-black/[0.04]">
            <div className="flex gap-5">
              <span className="trd-icon-ring w-12 h-12 shrink-0 text-black">
                <IconLifetime size={24} />
              </span>
              <div>
                <p className="text-black text-2xl font-bold tracking-tight mb-2">Not sure you need a full build yet?</p>
                <p className="text-black/55 text-[16px] leading-relaxed max-w-xl">
                  Start with Tone Tutoring. An hour on video going through your whole rig. You&apos;ll know exactly what&apos;s going on and what we&apos;d do about it.
                </p>
              </div>
            </div>
            <Link href="/tone-tutoring" className="trd-cta-ink inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-[15px] shrink-0">
              Tone Tutoring &middot; $99
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ───────── CLOSE ───────── */}
      <ParallaxImage src={`${CDN}2022-L1010577.jpg`} alt="Close-up of a finished Rig Doctor pedalboard" strength={10} className="bg-black min-h-[70svh] flex items-center">
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 w-full max-w-3xl mx-auto px-6 py-24 text-center">
          <p className="trd-eyebrow text-white/55 mb-6">2 build spots left in 2026</p>
          <h2 className="trd-display text-white mb-10">
            Your board, <span className="trd-gradient-text">done right.</span>
          </h2>
          <a href="#consult-form" className="trd-cta-gradient inline-flex items-center gap-2 px-9 py-4 rounded-full font-semibold text-[17px]">
            Book my free consultation <IconArrow />
          </a>
        </div>
      </ParallaxImage>
    </>
  );
}
