'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface CinemaStep {
  num: string;
  title: string;
  desc: string;
  image: string;
  color: string; // gradient stop color for active step
}

const steps: CinemaStep[] = [
  {
    num: '01',
    title: 'Signal Routing',
    desc: 'We map your whole chain before we cut a single cable. Every pedal, every combination. Your tone stays clean from input to output.',
    image:
      'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/MikeStipanovLayout1.png',
    color: '#0071E3', // blue
  },
  {
    num: '02',
    title: 'Cable Work',
    desc: 'Every run is labeled, laced, and built to handle hundreds of shows. When you open the back of this board, it makes sense.',
    image:
      'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Jeremy_B.png',
    color: '#00B4D8', // cyan
  },
  {
    num: '03',
    title: 'Power & Protection',
    desc: 'Isolated power rails kill the hum and buzz. That mystery noise you can never track down? We know where it lives.',
    image:
      'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Untitled_design_11.png',
    color: '#34D399', // green
  },
  {
    num: '04',
    title: 'Stage-Ready',
    desc: 'Your board leaves here ready to plug in. We stress-test everything so you don\u2019t think about it at the gig.',
    image:
      'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Rig_Build_27.png',
    color: '#0071E3', // blue (full circle)
  },
];

export default function CinemaSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;

      // How far we've scrolled into the section (0 = top just hit viewport, 1 = bottom leaving)
      const scrolled = -rect.top / (sectionHeight - viewportHeight);
      const clamped = Math.max(0, Math.min(1, scrolled));

      // Map scroll progress to step index
      const stepIndex = Math.min(
        steps.length - 1,
        Math.floor(clamped * steps.length)
      );
      setActiveStep(stepIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeColor = steps[activeStep].color;

  return (
    <section
      ref={sectionRef}
      id="how-we-build"
      className="relative bg-[#0a0a0a]"
      style={{ height: `${(steps.length + 1) * 100}vh` }}
    >
      {/* Sticky viewport container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col lg:flex-row">
        {/* Left panel — text */}
        <div className="relative z-10 w-full lg:w-[42%] flex flex-col justify-center px-6 sm:px-10 lg:px-16 bg-[#0a0a0a] py-12 lg:py-0">
          {/* Section label */}
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#f5f5f7]/30 mb-6">
            How We Build
          </p>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#f5f5f7] mb-10 leading-tight">
            Noise, rat&apos;s nest, tone suck.
            <br />
            <span style={{ color: activeColor, transition: 'color 0.5s ease' }}>
              Yeah, we fix that.
            </span>
          </h2>

          {/* Steps */}
          <div className="space-y-5">
            {steps.map((step, idx) => {
              const isActive = idx === activeStep;
              const isPast = idx < activeStep;

              return (
                <div
                  key={idx}
                  className={`transition-all duration-500 ease-out ${
                    isActive
                      ? 'opacity-100 translate-x-0'
                      : isPast
                      ? 'opacity-30 -translate-x-2'
                      : 'opacity-20 translate-x-2'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Step number with gradient color */}
                    <span
                      className="text-sm font-bold tracking-wider mt-1 transition-colors duration-500"
                      style={{ color: isActive ? step.color : 'rgba(245,245,247,0.2)' }}
                    >
                      {step.num}
                    </span>
                    <div>
                      <h3
                        className="text-lg font-semibold transition-colors duration-500"
                        style={{
                          color: isActive ? '#f5f5f7' : 'rgba(245,245,247,0.3)',
                        }}
                      >
                        {step.title}
                      </h3>
                      <div
                        className="overflow-hidden transition-all duration-500 ease-out"
                        style={{
                          maxHeight: isActive ? '80px' : '0px',
                          opacity: isActive ? 1 : 0,
                        }}
                      >
                        <p className="text-sm leading-relaxed mt-1 text-[#f5f5f7]/60">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Progress bar with gradient */}
          <div className="flex gap-2 mt-10">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="h-1 rounded-full transition-all duration-500"
                style={{
                  width: idx === activeStep ? '32px' : '8px',
                  backgroundColor:
                    idx === activeStep ? step.color : 'rgba(245,245,247,0.15)',
                }}
              />
            ))}
          </div>
        </div>

        {/* Right panel — rig images */}
        <div className="relative w-full lg:w-[58%] h-[50vh] lg:h-full overflow-hidden">
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
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 58vw"
                quality={75}
                loading={idx === 0 ? 'eager' : 'lazy'}
              />
              {/* Bottom gradient for mobile text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent lg:hidden" />
            </div>
          ))}

          {/* Left-edge gradient blend into text panel (desktop) */}
          <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-transparent w-[120px]" />

          {/* Active step color accent line */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[3px] transition-colors duration-500"
            style={{ backgroundColor: activeColor }}
          />
        </div>
      </div>
    </section>
  );
}
