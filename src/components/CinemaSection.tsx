'use client';

import { useEffect, useRef, useState } from 'react';

interface CinemaStep {
  num: string;
  title: string;
  desc: string;
}

const steps: CinemaStep[] = [
  {
    num: '01',
    title: 'Signal Routing',
    desc: 'We map every pedal combination before a single cable is cut. Your tone stays clean from input to output.',
  },
  {
    num: '02',
    title: 'Cable Architecture',
    desc: 'Every run is labeled, laced, and built to survive hundreds of shows. No rat\u2019s nest. No guesswork.',
  },
  {
    num: '03',
    title: 'Power & Protection',
    desc: 'Isolated power rails kill the hum, buzz, and mystery noise. The stuff that\u2019s been driving you nuts? Gone.',
  },
  {
    num: '04',
    title: 'Tour-Ready',
    desc: 'Your board leaves here stage-ready. Peace of mind on stage. Every night.',
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
    handleScroll(); // initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-we-build"
      className="relative bg-[#0a0a0a]"
      style={{ height: `${(steps.length + 1) * 100}vh` }}
    >
      {/* Sticky viewport container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex">
        {/* Left panel — dark text panel */}
        <div className="relative z-10 w-full lg:w-[40%] flex flex-col justify-center px-6 sm:px-10 lg:px-16 bg-[#0a0a0a]/90 lg:bg-[#0a0a0a]">
          {/* Section label */}
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#f5f5f7]/30 mb-6">
            How We Build
          </p>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#f5f5f7] mb-10 leading-tight">
            Noise. Rat&apos;s nest.
            <br />
            Tone suck.{' '}
            <span className="text-[#0071E3]">We fix that.</span>
          </h2>

          {/* Steps */}
          <div className="space-y-6">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className={`transition-all duration-500 ease-out ${
                  idx === activeStep
                    ? 'opacity-100 translate-x-0'
                    : idx < activeStep
                    ? 'opacity-30 -translate-x-2'
                    : 'opacity-20 translate-x-2'
                }`}
              >
                <div className="flex items-start gap-4">
                  <span
                    className={`text-sm font-bold tracking-wider mt-1 transition-colors duration-500 ${
                      idx === activeStep ? 'text-[#0071E3]' : 'text-[#f5f5f7]/20'
                    }`}
                  >
                    {step.num}
                  </span>
                  <div>
                    <h3
                      className={`text-lg font-semibold transition-colors duration-500 ${
                        idx === activeStep ? 'text-[#f5f5f7]' : 'text-[#f5f5f7]/30'
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`text-sm leading-relaxed mt-1 transition-all duration-500 ${
                        idx === activeStep
                          ? 'text-[#f5f5f7]/60 max-h-20 opacity-100'
                          : 'text-[#f5f5f7]/20 max-h-0 opacity-0 overflow-hidden'
                      }`}
                    >
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dot indicators */}
          <div className="flex gap-2 mt-10">
            {steps.map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  idx === activeStep
                    ? 'bg-[#0071E3] w-6'
                    : 'bg-[#f5f5f7]/20'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right panel — video */}
        <div className="hidden lg:block absolute inset-0 lg:relative lg:w-[60%]">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
          >
            <source
              src="https://cdn.shopify.com/videos/c/o/v/fd1dd8951a58473399e8ee70e902ed4e.mp4"
              type="video/mp4"
            />
          </video>
          {/* Subtle left-edge gradient for text legibility on mobile */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent lg:from-[#0a0a0a]/40 lg:via-transparent lg:to-transparent" />
        </div>

        {/* Mobile video background (behind the text panel) */}
        <div className="absolute inset-0 lg:hidden -z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover opacity-30"
          >
            <source
              src="https://cdn.shopify.com/videos/c/o/v/fd1dd8951a58473399e8ee70e902ed4e.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </div>
    </section>
  );
}
