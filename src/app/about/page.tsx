import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Section from '@/components/Section';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Meet Mason Marangell, Vince DiGoia, and Jacob Charendoff — the founders behind The Rig Doctor. 17+ years building custom pedalboards in Houston, TX for touring artists and home players nationwide.',
  openGraph: {
    title: 'About The Rig Doctor',
    description:
      'Meet the founders behind The Rig Doctor. 17+ years building custom pedalboards for touring artists and home players.',
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
      {/* ── Hero ── */}
      <Section theme="dark" className="!py-20 md:!py-32">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#F5A623] mb-4">
          Our Story
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#f5f5f7] mb-6 max-w-3xl">
          We started building pedalboards because nobody was doing it right.
        </h1>
        <p className="text-lg text-[#f5f5f7]/60 max-w-2xl">
          17 years. 500+ rigs. Three founders who play guitar and actually
          care whether your signal chain is clean.
        </p>
      </Section>

      {/* ── The Founders ── */}
      <Section theme="light">
        <div className="md:grid md:grid-cols-2 md:gap-16 items-center">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-8 md:mb-0 border border-black/[0.04]">
            <Image
              src="https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Jacob_S.jpg"
              alt="The Rig Doctor workshop — custom pedalboard build in progress"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#F5A623] mb-3">
              The Founders
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1d1d1f] mb-6">
              Three guitarists. One obsession.
            </h2>
            <div className="space-y-4 text-[15px] text-black/60 leading-relaxed">
              <p>
                The Rig Doctor was founded by Mason Marangell, Vince DiGoia,
                and Jacob Charendoff — three players who got tired of watching
                great guitarists fight bad rigs. Mason started building boards
                because the ones he could buy weren&apos;t good enough. Vince
                brought the ear — if a rig doesn&apos;t sound right, he&apos;ll find
                the problem before it leaves the bench. Jacob brought the
                reach — connecting players with the builds they actually need.
              </p>
              <p>
                Together, we&apos;ve built over 500 custom rigs for touring
                artists, session players, and weekend warriors. Every board
                is hand-wired by someone who plays guitar and knows what a
                clean signal chain sounds like under stage lights.
              </p>
              <p>
                This isn&apos;t a factory. It&apos;s three guys who care whether your
                board works perfectly on the 200th gig the same way it did
                on the first. That&apos;s it. That&apos;s the whole pitch.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ── The Approach ── */}
      <Section theme="lightGray">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#F5A623] mb-3">
            How We Work
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1d1d1f] mb-4">
            Every connection matters.
          </h2>
          <p className="text-[15px] text-black/50 leading-relaxed">
            We don&apos;t cut corners. Every cable is hand-soldered, every power
            rail is isolated, every signal path is tested under load before
            your board ships.
          </p>
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            {
              title: 'Hand-wired',
              desc: 'Every cable soldered to exact length. No crimped connectors, no excess wire, no mystery failure points.',
            },
            {
              title: 'Stress-tested',
              desc: 'Every board runs through a full signal chain test before it ships. We catch problems so you never have to.',
            },
            {
              title: 'Supported for life',
              desc: 'Something goes wrong? Call us. We stand behind every build with ongoing support and free repairs.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl border border-black/[0.04] p-6"
            >
              <h3 className="text-[15px] font-semibold text-[#1d1d1f] mb-2">
                {item.title}
              </h3>
              <p className="text-[14px] text-black/50 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Artists ── */}
      <Section theme="light">
        <div className="text-center mb-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#F5A623] mb-3">
            Who We Build For
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1d1d1f] mb-4">
            From Grammy stages to garage rehearsals.
          </h2>
          <p className="text-[15px] text-black/50 max-w-xl mx-auto">
            We build for anyone who takes their tone seriously. These are
            some of the artists who trust us with their rigs.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {artists.map((artist) => (
            <div key={artist.name} className="group">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-black/[0.04]">
                <Image
                  src={artist.photo}
                  alt={artist.name}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="font-semibold text-white text-sm leading-tight">
                    {artist.name}
                  </p>
                  <p className="text-white/60 text-xs mt-0.5">
                    {artist.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Stats ── */}
      <Section theme="dark">
        <div className="grid grid-cols-3 gap-6 text-center">
          {[
            { number: '500+', label: 'Rigs built' },
            { number: '17', label: 'Years at the bench' },
            { number: '50+', label: 'Touring artists' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#f5f5f7] tracking-tight">
                {stat.number}
              </p>
              <p className="text-sm text-[#f5f5f7]/40 mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Location ── */}
      <Section theme="lightGray">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#F5A623] mb-3">
            Based in Texas, Ships Nationwide
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1d1d1f] mb-4">
            Houston, TX
          </h2>
          <p className="text-[15px] text-black/50 leading-relaxed">
            Our workshop is in Houston, Texas.
            We build for guitarists across the entire US. Ship us your
            pedals, we&apos;ll ship you back a rig you can trust.
          </p>
        </div>
      </Section>

      {/* ── CTA ── */}
      <Section theme="dark">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#f5f5f7] mb-4">
            Let&apos;s talk about your rig.
          </h2>
          <p className="text-lg text-[#f5f5f7]/60 mb-8 max-w-xl mx-auto">
            Whether you need a full custom build or expert advice on what
            you&apos;ve got — the consultation is free.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 bg-[#F5A623] hover:bg-[#D48A1A] text-black font-semibold px-8 py-4 rounded-full transition-colors"
            >
              Book a Free Consultation
            </Link>
            <Link
              href="/tone-tutoring"
              className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-[#f5f5f7] font-semibold px-8 py-4 rounded-full transition-colors"
            >
              Tone Tutoring — $99
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
