'use client';

import { useState } from 'react';
import Image from 'next/image';

interface CinemaStep {
  num: string;
  title: string;
  desc: string;
  image: string;
  color: string;
  fit?: 'cover' | 'contain';
}

const steps: CinemaStep[] = [
  {
    num: '01',
    title: 'Signal Routing',
    desc: 'We map your whole chain before we cut a single cable. Every pedal, every combination. Your tone stays clean from input to output.',
    image:
      'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Signal_Routing.png',
    color: '#0071E3',
    fit: 'contain',
  },
  {
    num: '02',
    title: 'Cable Work',
    desc: 'Every run is labeled, laced, and built to handle hundreds of shows. When you open the back of this board, it makes sense.',
    image:
      'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Cable_Work.png',
    color: '#BF5AF2',
  },
  {
    num: '03',
    title: 'Power & Protection',
    desc: 'Isolated power rails kill the hum and buzz. That mystery noise you can never track down? We know where it lives.',
    image:
      'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Power_Protection.png',
    color: '#34D399',
  },
  {
    num: '04',
    title: 'Stage-Ready',
    desc: "Your board leaves here ready to plug in. We stress-test everything so you don't think about it at the gig.",
    image:
      'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Stage-Ready.jpg',
    color: '#0071E3',
  },
];

export default function CinemaSection() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="how-we-build" className="relative bg-[#0a0a0a] py-20 sm:py-28">
      <div className="max-w-[1080px] mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#f5f5f7]/30 mb-4">
            How We Build
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#f5f5f7] mb-4 leading-tight">
            Noise, rat&apos;s nest, tone suck.{' '}
            <span style={{ color: steps[activeStep].color, transition: 'color 0.5s ease' }}>
              Yeah, we fix that.
            </span>
          </h2>
        </div>

        {/* Two-column layout: steps + image */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
          {/* Left: Step cards */}
          <div className="w-full lg:w-[45%] space-y-3">
            {steps.map((step, idx) => {
              const isActive = idx === activeStep;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`w-full text-left p-5 rounded-2xl transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-white/[0.06] border border-white/[0.1]'
                      : 'bg-transparent border border-transparent hover:bg-white/[0.03]'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className="text-sm font-bold tracking-wider mt-0.5 transition-colors duration-300"
                      style={{ color: isActive ? step.color : 'rgba(245,245,247,0.2)' }}
                    >
                      {step.num}
                    </span>
                    <div>
                      <h3
                        className="text-lg font-semibold transition-colors duration-300"
                        style={{ color: isActive ? '#f5f5f7' : 'rgba(245,245,247,0.4)' }}
                      >
                        {step.title}
                      </h3>
                      <div
                        className="overflow-hidden transition-all duration-500 ease-out"
                        style={{
                          maxHeight: isActive ? '100px' : '0px',
                          opacity: isActive ? 1 : 0,
                          marginTop: isActive ? '4px' : '0px',
                        }}
                      >
                        <p className="text-sm leading-relaxed text-[#f5f5f7]/60">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}

            {/* Progress indicators */}
            <div className="flex gap-2 pt-4 pl-5">
              {steps.map((step, idx) => (
                <button
                  key={idx}
                  className="h-1 rounded-full transition-all duration-500"
                  onClick={() => setActiveStep(idx)}
                  aria-label={`Go to step ${idx + 1}`}
                  style={{
                    width: idx === activeStep ? '32px' : '8px',
                    backgroundColor:
                      idx === activeStep ? step.color : 'rgba(245,245,247,0.15)',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right: Active step image */}
          <div className="w-full lg:w-[55%]">
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#111]">
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  className="absolute inset-0 transition-all duration-700 ease-out"
                  style={{
                    opacity: idx === activeStep ? 1 : 0,
                    transform: idx === activeStep ? 'scale(1)' : 'scale(1.05)',
                  }}
                >
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className={step.fit === 'contain' ? 'object-contain p-4' : 'object-cover'}
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    quality={75}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                  />
                </div>
              ))}
              <div
                className="absolute bottom-0 left-0 right-0 h-[3px] transition-colors duration-500"
                style={{ backgroundColor: steps[activeStep].color }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
