import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ParallaxImage from '@/components/home/ParallaxImage';
import Reveal from '@/components/home/Reveal';
import { IconSolder, IconQuiet, IconLifetime, IconArrow } from '@/components/home/Icons';

const CDN = 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Meet Mason Marangell, Vince DiGoia, and Jacob Charendoff, the founders behind The Rig Doctor. 17+ years building custom pedalboards in Houston, TX for touring artists and home players nationwide.',
  openGraph: {
    title: 'About The Rig Doctor',
    description:
      'Meet the founders behind The Rig Doctor. 17+ years building custom pedalboards for touring artists and home players.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'About The Rig Doctor: Mason, Vince, and Jacob',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About The Rig Doctor',
    description:
      'Meet Mason, Vince, and Jacob. 17+ years building custom pedalboards for touring artists and home players.',
    images: ['/og-image.png'],
  },
};

const artists = [
  {
    name: 'Cory Wong',
    role: 'Vulfpeck',
    photo:
      'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/CoryWong_d62547c8-75e7-4438-9c4d-2704c4809099.jpg',
  },
  {
    name: 'Isaiah Sharkey',
    role: "D'Angelo, Solo Artist",
    photo:
      'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/IsaiahSharkey_62e0f1a1-70bd-4f47-ab97-8c27d8d75938.jpg',
  },
  {
    name: 'Raphael Saadiq',
    role: 'Tony! Toni! Toné!',
    photo:
      'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/RaphaelSaadiq_444901b7-2e8e-471e-acaf-ba72beb7a5b0.jpg',
  },
  {
    name: 'Paul Jackson Jr.',
    role: 'Michael Jackson, Whitney Houston',
    photo:
      'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/PaulJacksonJr_f874676e-bc05-4d0d-89a7-ea9e8e39d96a.jpg',
  },
  {
    name: 'Theo Katzman',
    role: 'Vulfpeck, Solo Artist',
    photo:
      'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/TheoKatzman_29b78ff0-6727-47ae-bd3d-1591dadeadd1.jpg',
  },
  {
    name: 'Emily Wolfe',
    role: 'Rock & Blues Guitarist',
    photo:
      'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/EmilyWolfe_1c6c2dca-011e-4074-8676-46d9f2abc041.jpg',
  },
  {
    name: 'Lindsay Ell',
    role: 'Country Artist',
    photo:
      'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/LindsayEll_0a1e775e-9a96-4e7c-bffc-fd25309316f3.jpg',
  },
  {
    name: 'Rhye Young',
    role: 'Guitarist & Composer',
    photo:
      'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/rhyeyoung_5cc7f2e1-f001-46d7-bae7-10d38ae3c134.jpg',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ───────── HERO ───────── */}
      <ParallaxImage src={`${CDN}Stage-Ready.jpg`} alt="Guitarist on stage with a Rig Doctor pedalboard" priority strength={10} className="bg-black min-h-[72svh] flex items-end">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/30" />
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 pb-16 sm:pb-20 pt-32">
          <p className="trd-eyebrow text-white/60 mb-6">Our story</p>
          <h1 className="text-white font-bold tracking-[-0.045em] leading-[1.0] text-[clamp(42px,6.5vw,88px)] max-w-4xl">
            We started building pedalboards because <span className="trd-gradient-text">nobody was doing it right.</span>
          </h1>
          <p className="mt-6 text-white/70 text-lg sm:text-xl max-w-2xl leading-relaxed">
            17 years. 300+ rigs. Three founders who play guitar and actually care whether your signal chain is clean.
          </p>
        </div>
      </ParallaxImage>

      {/* ───────── FOUNDERS ───────── */}
      <section className="bg-white py-24 sm:py-32">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 mb-16">
            <Reveal>
              <p className="trd-eyebrow text-black/40 mb-5">The founders</p>
              <h2 className="text-black font-bold tracking-[-0.04em] leading-[1.02] text-[clamp(36px,5vw,64px)]">
                Three guitarists. <span className="trd-gradient-text">One obsession.</span>
              </h2>
            </Reveal>
            <Reveal delay={120} className="space-y-5 text-[17px] text-black/60 leading-relaxed">
              <p>
                The Rig Doctor was founded by Mason Marangell, Vince DiGoia and Jacob Charendoff, three players who got tired of
                watching great guitarists fight bad rigs. Mason started building boards because the ones he could buy weren&apos;t
                good enough. Vince brought the ear: if a rig doesn&apos;t sound right, he&apos;ll find the problem before it leaves
                the bench. Jacob brought the reach, connecting players with the builds they actually need.
              </p>
              <p>
                Together, we&apos;ve built over 300 custom rigs for touring artists, session players and weekend warriors. Every
                board is hand-wired by someone who plays guitar and knows what a clean signal chain sounds like under stage lights.
              </p>
              <p>
                This isn&apos;t a factory. It&apos;s three guys who care whether your board works perfectly on the 200th gig the same way
                it did on the first. That&apos;s the whole pitch.
              </p>
            </Reveal>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { name: 'Mason Marangell', role: 'Builder', img: 'Mason_Avatar.png' },
              { name: 'Vince DiGoia', role: 'Builder and tone', img: 'Vince_Avatar.png' },
              { name: 'Jacob Charendoff', role: 'Players and partnerships', img: 'Jacob_avatar.png' },
            ].map((f, i) => (
              <Reveal key={f.name} delay={i * 100} className="trd-photo relative aspect-[4/5] rounded-[28px] bg-black">
                <Image src={`${CDN}${f.img}`} alt={f.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                <div className="absolute bottom-0 p-7">
                  <p className="text-white text-2xl font-bold tracking-tight">{f.name}</p>
                  <p className="text-white/60 text-[15px] mt-1">{f.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── HOW WE WORK ───────── */}
      <section className="bg-black py-24 sm:py-32">
        <div className="max-w-[1200px] mx-auto px-6">
          <Reveal className="max-w-3xl mb-14">
            <p className="trd-eyebrow text-white/45 mb-5">How we work</p>
            <h2 className="text-white font-bold tracking-[-0.04em] leading-[1.02] text-[clamp(36px,5vw,64px)]">
              Every connection <span className="trd-gradient-text">matters.</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { Icon: IconSolder, title: 'Hand-wired', desc: 'Every cable soldered to exact length. No crimped connectors, no excess wire, no mystery failure points.' },
              { Icon: IconQuiet, title: 'Stress-tested', desc: 'Every board runs through a full signal chain test before it ships. We catch problems so you never have to.' },
              { Icon: IconLifetime, title: 'Supported for life', desc: 'Something goes wrong? Call us. We stand behind every build with ongoing support and free repairs.' },
            ].map(({ Icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 90} className="bg-white/[0.04] border border-white/[0.08] rounded-[28px] p-8">
                <span className="trd-icon-ring w-12 h-12 text-white mb-6">
                  <Icon size={24} />
                </span>
                <h3 className="text-white text-xl font-bold tracking-tight mb-2">{title}</h3>
                <p className="text-white/55 text-[15px] leading-relaxed">{desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── ARTISTS ───────── */}
      <section className="bg-white py-24 sm:py-32">
        <div className="max-w-[1200px] mx-auto px-6">
          <Reveal className="max-w-3xl mb-14">
            <p className="trd-eyebrow text-black/40 mb-5">Who we build for</p>
            <h2 className="text-black font-bold tracking-[-0.04em] leading-[1.02] text-[clamp(36px,5vw,64px)]">
              From Grammy stages to <span className="trd-gradient-text">garage rehearsals.</span>
            </h2>
            <p className="mt-5 text-black/55 text-lg leading-relaxed">Some of the artists who trust us with their rigs.</p>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {artists.map((a, i) => (
              <Reveal key={a.name} delay={(i % 4) * 70} className="trd-photo relative aspect-[3/4] rounded-[24px] bg-black">
                <Image src={a.photo} alt={a.name} fill sizes="(max-width: 640px) 50vw, 25vw" className="object-cover object-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="font-semibold text-white text-[15px] leading-tight">{a.name}</p>
                  <p className="text-white/60 text-[13px] mt-0.5">{a.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── STATS + LOCATION ───────── */}
      <section className="bg-[#f5f5f7] py-24 sm:py-28">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="grid grid-cols-3 gap-6 text-center mb-20">
            {[
              { number: '300+', label: 'Rigs built' },
              { number: '17', label: 'Years at the bench' },
              { number: '50+', label: 'Touring artists' },
            ].map((s) => (
              <Reveal key={s.label}>
                <p className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight trd-gradient-text">{s.number}</p>
                <p className="text-[14px] text-black/45 mt-3">{s.label}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="max-w-2xl mx-auto text-center">
            <p className="trd-eyebrow text-black/40 mb-5">Based in Texas, ships nationwide</p>
            <h2 className="text-black font-bold tracking-[-0.04em] text-[clamp(32px,4vw,48px)] mb-4">Houston, TX</h2>
            <p className="text-black/55 text-[17px] leading-relaxed">
              Our workshop is in Houston, Texas. We build for guitarists across the entire US. Ship us your pedals, we&apos;ll ship
              you back a rig you can trust.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ───────── CLOSE ───────── */}
      <ParallaxImage src={`${CDN}L1010577.jpg`} alt="A finished Rig Doctor pedalboard in warm light" strength={10} className="bg-black min-h-[70svh] flex items-center">
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 w-full max-w-3xl mx-auto px-6 py-24 text-center">
          <h2 className="trd-display text-white mb-8">
            Let&apos;s talk about <span className="trd-gradient-text">your rig.</span>
          </h2>
          <p className="text-white/70 text-lg sm:text-xl mb-12">Full custom build or expert advice on what you&apos;ve got. The consultation is free.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Link href="/book" className="trd-cta-gradient inline-flex items-center justify-center gap-2 px-9 py-4 rounded-full font-semibold text-[17px]">
              Book a free consultation <IconArrow />
            </Link>
            <Link href="/tone-tutoring" className="trd-cta-ghost-dark inline-flex items-center justify-center px-9 py-4 rounded-full font-semibold text-[17px]">
              Tone Tutoring &middot; $99
            </Link>
          </div>
        </div>
      </ParallaxImage>
    </>
  );
}
