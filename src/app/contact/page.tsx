'use client';

import Link from 'next/link';
import Section from '@/components/Section';

export default function ContactPage() {
  return (
    <div>
      {/* Hero with Background Video */}
      <div className="relative w-full overflow-hidden">
        <div className="relative min-h-screen flex items-center justify-center bg-black">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          >
            <source
              src="https://cdn.shopify.com/videos/c/o/v/1e7a54e296a04be0b5e8d7c34031924a.mov"
              type="video/quicktime"
            />
            <source
              src="https://cdn.shopify.com/videos/c/o/v/1e7a54e296a04be0b5e8d7c34031924a.mov"
              type="video/mp4"
            />
          </video>

          <div className="relative z-10 max-w-[1080px] mx-auto px-6 py-32 w-full text-center">
            <h1 className="trd-hero-headline text-[#f5f5f7] mb-6">
              Get in <span className="trd-gradient-text">Touch</span>
            </h1>
            <p className="trd-subheadline max-w-2xl mx-auto">
              Questions about a build, need help with your rig, or just want to talk tone? We&apos;re here.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Info Cards */}
      <Section theme="light" reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Email */}
          <div className="bg-[#f5f5f7] rounded-2xl p-8 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#1d1d1f]/5 flex items-center justify-center">
              <svg className="w-6 h-6 text-[#1d1d1f]/60" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[#1d1d1f] mb-2">Email</h3>
            <a href="mailto:info@therigdr.com" className="text-[#0071E3] hover:text-[#005BB5] transition-colors">
              info@therigdr.com
            </a>
            <p className="text-sm text-[#1d1d1f]/50 mt-2">We typically respond within 24 hours</p>
          </div>

          {/* Phone */}
          <div className="bg-[#f5f5f7] rounded-2xl p-8 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#1d1d1f]/5 flex items-center justify-center">
              <svg className="w-6 h-6 text-[#1d1d1f]/60" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[#1d1d1f] mb-2">Phone</h3>
            <a href="tel:+19365489254" className="text-[#0071E3] hover:text-[#005BB5] transition-colors">
              (936) 548-9254
            </a>
            <p className="text-sm text-[#1d1d1f]/50 mt-2">Mon–Fri, 9am–5pm CT</p>
          </div>

          {/* Location */}
          <div className="bg-[#f5f5f7] rounded-2xl p-8 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#1d1d1f]/5 flex items-center justify-center">
              <svg className="w-6 h-6 text-[#1d1d1f]/60" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[#1d1d1f] mb-2">Location</h3>
            <p className="text-[#1d1d1f]/70">
              Houston, TX
            </p>
            <p className="text-sm text-[#1d1d1f]/50 mt-2">Ships nationwide</p>
          </div>
        </div>

        {/* Book a Consultation CTA */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1d1d1f] mb-4">
            Ready to start a build?
          </h2>
          <p className="text-lg text-[#1d1d1f]/60 mb-8 max-w-xl mx-auto">
            The best way to get started is to book a free consultation. We&apos;ll talk through your rig, your playing style, and figure out exactly what you need.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 rounded-full trd-cta-gradient px-8 py-4 text-lg font-semibold text-white transition"
          >
            Book a Consultation
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </Section>
    </div>
  );
}
