'use client';

import Link from 'next/link';
import Section from '@/components/Section';

export default function ShippingPage() {
  return (
    <div>
      {/* Hero */}
      <Section theme="dark" reveal>
        <div className="min-h-[300px] flex flex-col items-center justify-center py-16 sm:py-24">
          <h1 className="text-[2.25rem] sm:text-[3rem] md:text-[3.5rem] font-bold text-center text-white mb-4">
            Shipping Policy
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
            <h2 className="text-2xl font-bold text-[#1d1d1f] mb-4">Where We Ship</h2>
            <p className="text-[#1d1d1f]/70 leading-relaxed">
              We ship to all 50 US states from our workshop in Houston, Texas. International shipping is available on a case-by-case basis — contact us at info@therigdr.com for a quote.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1d1d1f] mb-4">Processing Times</h2>
            <p className="text-[#1d1d1f]/70 leading-relaxed mb-4">
              In-stock items such as patch cables, instrument cables, and accessories typically ship within 1–3 business days of your order being placed.
            </p>
            <p className="text-[#1d1d1f]/70 leading-relaxed">
              Custom pedalboard builds have variable timelines depending on complexity and component availability. Your estimated build and ship date will be communicated during the consultation process. We will keep you updated throughout the build.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1d1d1f] mb-4">Shipping Methods and Rates</h2>
            <p className="text-[#1d1d1f]/70 leading-relaxed mb-4">
              We use UPS, USPS, and FedEx depending on package size and destination. Shipping rates are calculated at checkout based on the weight, dimensions, and destination of your order.
            </p>
            <p className="text-[#1d1d1f]/70 leading-relaxed">
              Custom pedalboard builds are shipped with full insurance and require a signature upon delivery to protect your investment.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1d1d1f] mb-4">Order Tracking</h2>
            <p className="text-[#1d1d1f]/70 leading-relaxed">
              Once your order ships, you will receive an email with tracking information. You can also check your order status anytime through your Shopify order confirmation email.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1d1d1f] mb-4">Packaging</h2>
            <p className="text-[#1d1d1f]/70 leading-relaxed">
              Every product is packed with care. Cables ship in branded packaging. Custom pedalboards are secured in padded, flight-ready packaging designed to survive transit without damage.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1d1d1f] mb-4">Damaged or Lost Shipments</h2>
            <p className="text-[#1d1d1f]/70 leading-relaxed">
              If your order arrives damaged or is lost in transit, contact us immediately at info@therigdr.com with your order number and photos of the damage (if applicable). We will work with the carrier to resolve the issue and get you a replacement as quickly as possible.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1d1d1f] mb-4">Local Pickup</h2>
            <p className="text-[#1d1d1f]/70 leading-relaxed">
              Local pickup is available by appointment at our workshop in Houston, TX. Select &quot;Local Pickup&quot; at checkout or contact us to arrange a time. We love meeting the people who play the rigs we build.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1d1d1f] mb-4">Questions?</h2>
            <p className="text-[#1d1d1f]/70 leading-relaxed">
              If you have any questions about shipping, reach out at{' '}
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
