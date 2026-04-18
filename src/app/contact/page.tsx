'use client';

import Link from 'next/link';
import Section from '@/components/Section';

export default function ContactPage() {
  return (
    <div>
      {/* Hero */}
      <Section theme="dark" reveal>
        <div className="min-h-[300px] flex flex-col items-center justify-center py-16 sm:py-24">
          <h1 className="text-[2.25rem] sm:text-[3rem] md:text-[3.5rem] font-bold text-center text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-[#f5f5f7]/50 text-center max-w-xl">
            Questions about a build, need help with your rig, or just want to talk tone? We&apos;re here.
          </p>
        </div>
      </Section>

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
            <a href="mailto:info@therigdr.com" className="text-blue-600 hover:underline">
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
            <a href="tel:+18327797447" className="text-blue-600 hover:underline">
              (832) 779-7447
            </a>
            <p className="text-sm text-[#1d1d1f]/50 mt-2">Mon\u2013Fri, 9am\u20135pm CT</p>
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
              641 Amesbury Rd<br />
              Montgomery, TX 77316
            </p>
            <p className="text-sm text-[#1d1d1f]/50 mt-2">By appointment only</p>
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
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#6366f1] to-[#ec4899] px-8 py-4 text-lg font-semibold text-white shadow-lg hover:opacity-90 transition"
          >
            Book a Consultation
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </Section>

      {/* Social / Follow */}
      <Section theme="lightGray" reveal>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#1d1d1f] mb-4">Follow Along</h2>
          <p className="text-[#1d1d1f]/60 mb-6">
            See our latest builds, behind-the-scenes content, and gear talk on Instagram.
          </p>
          <a
            href="https://instagram.com/therigdr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#1d1d1f] font-semibold hover:opacity-70 transition"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
            </svg>
            @therigdr on Instagram
          </a>
        </div>
      </Section>
    </div>
  );
}
