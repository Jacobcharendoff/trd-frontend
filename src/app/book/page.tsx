'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Section from '@/components/Section';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import BeforeAfter from '@/components/BeforeAfter';

/* ──── Build images ──── */
const buildImages = [
  { src: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Jacob_S.png', alt: 'Jacob S. custom pedalboard build' },
  { src: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/John_A._1.png', alt: 'John A. custom pedalboard build' },
  { src: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Saxon_W..jpg', alt: 'Saxon W. custom pedalboard build' },
  { src: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Javy_B.png?v=1773867365', alt: 'Javy B. custom pedalboard build' },
  { src: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/William_O._1.png?v=1773867364', alt: 'William O. custom pedalboard build' },
  { src: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Josh_W.png?v=1773867364', alt: 'Josh W. custom pedalboard build' },
  { src: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Vince_D.png?v=1773867366', alt: 'Vince D. custom pedalboard build' },
  { src: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Hunter_W._1.jpg?v=1774980806', alt: 'Hunter W. custom pedalboard build' },
  { src: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Vince_D._2.jpg?v=1777143325', alt: 'Vince D. second custom build' },
];

/* ──── Hero: Build Gallery ──── */
function BuildGalleryHero() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let frame: number;
    let pos = 0;
    const speed = 0.4;

    const animate = () => {
      pos += speed;
      if (pos >= el.scrollWidth / 2) pos = 0;
      el.scrollLeft = pos;
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  const doubled = [...buildImages, ...buildImages];

  return (
    <div className="relative bg-black pt-28 pb-0 overflow-hidden">
      {/* Scrolling build gallery */}
      <div
        ref={scrollRef}
        className="flex gap-3 sm:gap-4 overflow-hidden px-4"
        style={{ scrollBehavior: 'auto' }}
      >
        {doubled.map((img, idx) => (
          <div
            key={idx}
            className="relative flex-shrink-0 w-[280px] sm:w-[360px] lg:w-[420px] aspect-[4/3] rounded-2xl overflow-hidden"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 280px, (max-width: 1024px) 360px, 420px"
              priority={idx < 4}
            />
          </div>
        ))}
      </div>

      {/* Gradient overlay into content */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />

      {/* Headline overlay */}
      <div className="relative z-10 max-w-[1080px] mx-auto px-6 pt-10 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.05] border border-white/[0.08] rounded-full mb-6">
          <span className="inline-block w-2 h-2 rounded-full bg-[#0071E3]" />
          <span className="text-[13px] text-white/[0.85]">Custom builds &middot; Houston, TX</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-white mb-4">
          {'Your rig, '}
          <span className="trd-gradient-text">built from scratch.</span>
        </h1>

        <p className="text-[18px] text-white/[0.65] leading-relaxed max-w-2xl mx-auto mb-8">
          Hand-wired pedalboards for guitarists who refuse to settle. Tell us what you play and
          what is driving you nuts. We will tell you exactly what we would do about it.
        </p>

        <div className="flex justify-center items-center gap-8 sm:gap-12">
          {[
            { value: '300+', label: 'rigs built' },
            { value: '17', label: 'years at the bench' },
            { value: '4-8', label: 'weeks to ship' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-xl sm:text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-white/[0.45] mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ──── Lead Capture Form ──── */
function LeadForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    instrument: '',
    rig: '',
  });
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

      if (res.ok) {
        router.push('/book/thank-you');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const inputClass =
    'w-full px-4 py-3.5 rounded-xl bg-white border border-[#1d1d1f]/10 text-[#1d1d1f] placeholder:text-[#1d1d1f]/30 focus:outline-none focus:ring-2 focus:ring-[#0071E3]/30 focus:border-[#0071E3]/50 transition-all text-[15px]';

  return (
    <Section theme="light" id="get-started" reveal>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#1d1d1f]/40 mb-4">
            Start Here
          </p>
          <h2 className="trd-section-headline text-[#1d1d1f] mb-2">
            Tell us about <span className="trd-gradient-text">your rig.</span>
          </h2>
          <p className="text-[#1d1d1f]/50 text-lg max-w-xl mx-auto">
            Drop your info and we will reach out within 24 hours to talk through your build. No pressure, no spam.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Your name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={inputClass}
            />
            <input
              type="email"
              placeholder="Your email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={inputClass}
            />
          </div>

          <input
            type="text"
            placeholder="What do you play? (guitar, bass, keys, etc.)"
            value={formData.instrument}
            onChange={(e) => setFormData({ ...formData, instrument: e.target.value })}
            className={inputClass}
          />

          <textarea
            placeholder="What is going on with your rig? Noise, hum, messy cables, need a full rebuild - tell us everything."
            rows={4}
            value={formData.rig}
            onChange={(e) => setFormData({ ...formData, rig: e.target.value })}
            className={`${inputClass} resize-none`}
          />

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full py-4 px-6 bg-[#0071E3] text-white font-semibold rounded-full hover:bg-[#005BB5] transition-colors text-[16px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'submitting' ? 'Sending...' : 'Get My Free Consultation'}
          </button>

          {status === 'error' && (
            <p className="text-red-500 text-sm text-center">
              Something went wrong. Try again or email us directly.
            </p>
          )}

          <div className="flex flex-wrap justify-center gap-6 pt-4">
            {[
              { icon: 'M12 8v4l3 2m6-3a9 9 0 11-18 0 9 9 0 0118 0z', label: '30-minute call' },
              { icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', label: 'Completely free' },
              { icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', label: 'No obligation' },
            ].map((meta) => (
              <div key={meta.label} className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#0071E3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={meta.icon} />
                </svg>
                <span className="text-[13px] text-[#1d1d1f]/50">{meta.label}</span>
              </div>
            ))}
          </div>
        </form>

        {/* Tone Tutoring callout */}
        <div className="mt-10 bg-[#f5f5f7] border border-[#1d1d1f]/[0.06] rounded-2xl p-5 text-center">
          <p className="text-[14px] text-[#1d1d1f]/[0.85] mb-1 font-medium">
            Not ready for a full build?
          </p>
          <p className="text-[13px] text-[#1d1d1f]/[0.55]">
            Get expert advice on your current rig with a 1-on-1 Tone Tutoring session.{' '}
            <Link href="/tone-tutoring" className="text-[#0071E3] hover:text-[#005BB5] transition-colors font-semibold">
              Book Tone Tutoring ($99) &rarr;
            </Link>
          </p>
        </div>
      </div>
    </Section>
  );
}

/* ──── Visual Process Section ──── */
function ProcessSection() {
  const steps = [
    {
      number: '01',
      title: 'We Map It Out',
      description: 'Your specs, wiring diagram, signal chain order, component list. Everything documented so nothing gets lost. We photograph your current board and plan the rebuild piece by piece.',
      image: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Jacob_S.png',
      imageAlt: 'Detailed rig planning and wiring diagram',
    },
    {
      number: '02',
      title: 'We Build It',
      description: 'Every connection hand-soldered. Every cable custom-cut. Isolated power, engineered signal path, cable management that stays clean on the road. We road-test it before it ships.',
      image: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/John_A._1.png',
      imageAlt: 'Hand-soldered pedalboard build in progress',
    },
    {
      number: '03',
      title: 'You Play It',
      description: 'Board arrives road-ready. Plug in, hit your presets, and hear the difference. Dead quiet. Zero signal loss. And if anything ever goes wrong, we are a phone call away.',
      image: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Saxon_W..jpg',
      imageAlt: 'Finished custom pedalboard ready to play',
    },
  ];

  return (
    <Section theme="light" id="process" reveal>
      <div className="text-center mb-16">
        <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#1d1d1f]/40 mb-4">
          The Process
        </p>
        <h2 className="trd-section-headline text-[#1d1d1f] mb-4">
          From call to <span className="trd-gradient-text">stage-ready.</span>
        </h2>
        <p className="text-[#1d1d1f]/50 text-lg max-w-2xl mx-auto">
          Three steps. No surprises. You know exactly what is happening at every stage.
        </p>
      </div>

      <div className="space-y-20">
        {steps.map((step, idx) => (
          <div
            key={step.number}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
              idx % 2 === 1 ? 'lg:[direction:rtl]' : ''
            }`}
          >
            <div className={`${idx % 2 === 1 ? 'lg:[direction:ltr]' : ''}`}>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#0a0a0a] shadow-xl group">
                <Image
                  src={step.image}
                  alt={step.imageAlt}
                  fill
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white text-xs font-bold tracking-widest px-3 py-1.5 rounded-full">
                  STEP {step.number}
                </div>
              </div>
            </div>

            <div className={`space-y-6 ${idx % 2 === 1 ? 'lg:[direction:ltr]' : ''}`}>
              <div className="text-6xl sm:text-7xl font-bold trd-gradient-text opacity-30">
                {step.number}
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-[#1d1d1f] -mt-4">
                {step.title}
              </h3>
              <p className="text-[16px] text-[#1d1d1f]/60 leading-relaxed max-w-md">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-20 space-y-4">
        <p className="text-[18px] text-[#1d1d1f] font-medium">
          Custom builds typically start from{' '}
          <span className="trd-gradient-text font-bold">$1,999 USD</span>
        </p>
        <p className="text-[14px] text-[#1d1d1f]/40">
          Every rig is different. Your consultation is free. We give you a straight quote.
        </p>
      </div>
    </Section>
  );
}

/* ──── Before/After Transformation ──── */
function TransformationSection() {
  return (
    <Section theme="dark" id="before-after" reveal>
      <div className="text-center mb-16">
        <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#f5f5f7]/40 mb-4">
          The Difference
        </p>
        <h2 className="trd-section-headline text-[#f5f5f7] mb-2">
          Same pedals. <span className="trd-gradient-text">Completely different rig.</span>
        </h2>
        <p className="text-[#f5f5f7]/50 text-lg">
          Drag the slider and see what changes when we get our hands on it.
        </p>
      </div>
      <BeforeAfter theme="dark" />
    </Section>
  );
}

/* ──── Build Gallery Strip ──── */
function GalleryStrip() {
  const images = [
    { src: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Javy_B.png?v=1773867365', alt: 'Javy B. build' },
    { src: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/William_O._1.png?v=1773867364', alt: 'William O. build' },
    { src: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Josh_W.png?v=1773867364', alt: 'Josh W. build' },
    { src: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Vince_D.png?v=1773867366', alt: 'Vince D. build' },
    { src: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Hunter_W._1.jpg?v=1774980806', alt: 'Hunter W. build' },
    { src: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Vince_D._2.jpg?v=1777143325', alt: 'Vince D. board' },
  ];

  return (
    <Section theme="lightGray" id="recent-builds" reveal>
      <div className="text-center mb-10">
        <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#1d1d1f]/40 mb-4">
          Recent Builds
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-[#1d1d1f]">
          Every board tells a story.
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        {images.map((img, idx) => (
          <div key={idx} className="relative aspect-[4/3] rounded-xl overflow-hidden group bg-[#0a0a0a]">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ──── Trusted By ──── */
function TrustedBy() {
  return (
    <Section theme="dark" reveal>
      <div className="text-center mb-12">
        <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#f5f5f7]/40 mb-4">On the Road</p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#f5f5f7] mb-2">
          Trusted by players who <span className="trd-gradient-text">can&apos;t afford a bad night.</span>
        </h2>
      </div>
      <TestimonialCarousel theme="dark" />
    </Section>
  );
}

/* ──── Main Page ──── */
export default function BookPage() {
  return (
    <>
      <BuildGalleryHero />
      <LeadForm />
      <ProcessSection />
      <TransformationSection />
      <GalleryStrip />
      <TrustedBy />
    </>
  );
}
