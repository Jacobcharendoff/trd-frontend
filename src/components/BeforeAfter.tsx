'use client';

import Image from 'next/image';

interface Transformation {
  before: {
    label: string;
    description: string;
  };
  after: {
    label: string;
    description: string;
    image: string;
  };
  playerName: string;
}

const transformations: Transformation[] = [
  {
    before: {
      label: 'Before',
      description: 'Tangled cables, inconsistent power, noise issues, pedals falling off mid-set.',
    },
    after: {
      label: 'After',
      description: 'Clean routing, isolated power, optimized signal chain, gig-ready in seconds.',
      image: 'https://www.therigdr.com/cdn/shop/files/Javy_B.png',
    },
    playerName: 'Javy B. — Live Performer',
  },
  {
    before: {
      label: 'Before',
      description: 'Random pedal order, tone sucking, no switching — tap dancing all night.',
    },
    after: {
      label: 'After',
      description: 'Smart loop switching, buffered signal path, one-stomp preset changes.',
      image: 'https://www.therigdr.com/cdn/shop/files/John_A.png',
    },
    playerName: 'John A. — Studio Session',
  },
  {
    before: {
      label: 'Before',
      description: 'Board was too big to fit in gig bag, cables kept failing mid-tour.',
    },
    after: {
      label: 'After',
      description: 'Compact, tour-ready, flawless through 40+ shows without a single cable failure.',
      image: 'https://www.therigdr.com/cdn/shop/files/Chris_G.png',
    },
    playerName: 'Chris G. — Touring Guitarist',
  },
  {
    before: {
      label: 'Before',
      description: 'Noisy ground loops, muddy signal, tone was getting lost in the mix.',
    },
    after: {
      label: 'After',
      description: 'Crystal clear, isolated power section, tone cuts through without hum.',
      image: 'https://www.therigdr.com/cdn/shop/files/Shannon_G._1.png',
    },
    playerName: 'Shannon G. — Studio & Live',
  },
  {
    before: {
      label: 'Before',
      description: 'Tried 3 different builds myself, never got the signal chain right.',
    },
    after: {
      label: 'After',
      description: 'One consultation and everything clicked. Board sounds exactly how I hear it.',
      image: 'https://www.therigdr.com/cdn/shop/files/Jeremy_B.png',
    },
    playerName: 'Jeremy B. — DIY to Pro',
  },
  {
    before: {
      label: 'Before',
      description: 'Effects were fighting each other, no switching options, tone was boxed in.',
    },
    after: {
      label: 'After',
      description: 'Effects are stacked perfectly, smooth switching, tone is now wide open.',
      image: 'https://www.therigdr.com/cdn/shop/files/Mark_A.png',
    },
    playerName: 'Mark A. — Genre Switcher',
  },
];

export default function BeforeAfter() {
  return (
    <section className="w-full py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-12">
          {transformations.map((transformation, idx) => (
            <div key={idx}>
              {/* Desktop: Side-by-side, Mobile: Stacked */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-6">
                {/* Before Card */}
                <div className="bg-[#f5f5f7] rounded-2xl p-8 h-full flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-red-500 to-orange-500"></div>
                    <span className="text-sm font-semibold text-[#1d1d1f] tracking-wide">
                      {transformation.before.label}
                    </span>
                  </div>
                  <p className="text-lg text-[#1d1d1f] leading-relaxed">
                    {transformation.before.description}
                  </p>
                </div>

                {/* Arrow divider (hidden on mobile) */}
                <div className="hidden lg:flex justify-center -mx-4 z-10">
                  <div className="text-3xl text-[#F5A623]">→</div>
                </div>

                {/* After Card */}
                <div className="rounded-2xl overflow-hidden bg-[#1d1d1f] relative h-80 lg:h-full lg:min-h-96">
                  <Image
                    src={`https://cdn.shopify.com/s/files/1/0528/3171/5486/files/${transformation.after.image}`}
                    alt={transformation.after.label}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  {/* Overlay text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-3 h-3 rounded-full bg-[#10B981]"></div>
                      <span className="text-sm font-semibold text-[#f5f5f7] tracking-wide">
                        {transformation.after.label}
                      </span>
                    </div>
                    <p className="text-lg text-[#f5f5f7] leading-relaxed">
                      {transformation.after.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Player Name */}
              <div className="text-center">
                <p className="text-sm font-semibold text-[#1d1d1f] tracking-wide uppercase">
                  {transformation.playerName}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
