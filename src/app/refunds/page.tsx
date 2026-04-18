'use client';

import Link from 'next/link';
import Section from '@/components/Section';

export default function RefundsPage() {
  return (
    <div>
      {/* Hero */}
      <Section theme="dark" reveal>
        <div className="min-h-[300px] flex flex-col items-center justify-center py-16 sm:py-24">
          <h1 className="text-[2.25rem] sm:text-[3rem] md:text-[3.5rem] font-bold text-center text-white mb-4">
            Refund Policy
          </h1>
          <p className="text-lg text-[#f5f5f7]/50">
            Last updated: April 18, 2026
          </p>
        </div>
      </Section>

      {/* Content */}
      <Section theme="light" reveal>
        <div className="max-w-3xl mx-auto space-y-10">
          <div>
            <h2 className="text-2xl font-bold text-[#1d1d1f] mb-4">Our Commitment</h2>
            <p className="text-[#1d1d1f]/70 leading-relaxed">
              We stand behind everything we build and sell. If something isn&apos;t right, we want to make it right. Here&apos;s how our refund and return policy works for different product types.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1d1d1f] mb-4">Cables and Accessories</h2>
            <p className="text-[#1d1d1f]/70 leading-relaxed">
              Patch cables, instrument cables, power cables, and accessories may be returned within 30 days of delivery for a full refund, provided they are in original, unused condition. If a cable or accessory arrives defective, we will replace it at no cost \u2014 just contact us and we will send a prepaid return label.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1d1d1f] mb-4">Custom Pedalboard Builds</h2>
            <p className="text-[#1d1d1f]/70 leading-relaxed">
              Because custom builds are made to your exact specifications, they are non-refundable once work has begun. If you need to cancel a custom build before work starts, any deposit paid will be refunded in full. If there is a defect or issue with a completed build, we will repair or replace it under our lifetime support guarantee at no cost.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1d1d1f] mb-4">Tone Tutoring Sessions</h2>
            <p className="text-[#1d1d1f]/70 leading-relaxed">
              Tone tutoring sessions may be rescheduled up to 24 hours before the appointment. Sessions canceled with less than 24 hours notice are non-refundable. If you are unsatisfied with your session, contact us within 48 hours and we will work with you to make it right.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1d1d1f] mb-4">Rig Renderings and Wiring Diagrams</h2>
            <p className="text-[#1d1d1f]/70 leading-relaxed">
              Digital products such as rig renderings and wiring diagrams are non-refundable once delivered. If the rendering contains errors based on the specifications you provided, we will revise it at no charge.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1d1d1f] mb-4">How to Request a Refund</h2>
            <p className="text-[#1d1d1f]/70 leading-relaxed">
              To request a refund or return, email us at info@therigdr.com with your order number and a description of the issue. We will respond within 2 business days. Approved refunds are processed to the original payment method within 5\u201310 business days.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1d1d1f] mb-4">Return Shipping</h2>
            <p className="text-[#1d1d1f]/70 leading-relaxed">
              For defective products, we cover return shipping costs. For non-defective returns within the 30-day window, the customer is responsible for return shipping. All returns should be shipped to: The Rig Doctor Inc., 641 Amesbury Rd, Montgomery, TX 77316.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1d1d1f] mb-4">Questions?</h2>
            <p className="text-[#1d1d1f]/70 leading-relaxed">
              If you have any questions about our refund policy, reach out to us at{' '}
              <a href="mailto:info@therigdr.com" className="text-blue-600 hover:underline">info@therigdr.com</a>{' '}
              or visit our{' '}
              <Link href="/contact" className="text-blue-600 hover:underline">contact page</Link>.
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}
