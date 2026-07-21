'use client';

import Section from '@/components/Section';

export default function TermsPage() {
  return (
    <div>
      {/* Hero */}
      <Section theme="dark" reveal>
        <div className="min-h-[300px] flex flex-col items-center justify-center py-16 sm:py-24">
          <h1 className="text-[2.25rem] sm:text-[3rem] md:text-[3.5rem] font-bold text-center text-white mb-4">
            Terms of Service
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
            <h2 className="text-2xl font-bold text-[#1d1d1f] mb-4">Agreement to Terms</h2>
            <p className="text-[#1d1d1f]/70 leading-relaxed">
              By accessing or using therigdr.com, you agree to be bound by these Terms of Service. If you do not agree, please do not use our website or purchase our products and services. These terms apply to all visitors, users, and customers of The Rig Doctor Inc.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1d1d1f] mb-4">Products and Services</h2>
            <p className="text-[#1d1d1f]/70 leading-relaxed mb-4">
              The Rig Doctor offers custom pedalboard builds, tone tutoring sessions, rig rendering and wiring diagrams, patch cables, accessories, and related products. Product descriptions, images, and specifications are provided as accurately as possible, but we do not warrant that they are error-free or complete.
            </p>
            <p className="text-[#1d1d1f]/70 leading-relaxed">
              Custom builds are made to order based on your specifications. Because of the custom nature of these products, build timelines may vary. We will communicate expected timelines during the consultation process.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1d1d1f] mb-4">Pricing and Payment</h2>
            <p className="text-[#1d1d1f]/70 leading-relaxed">
              All prices are listed in US Dollars (USD). We reserve the right to change prices at any time without notice. Prices at the time of your order will be honored. Payment is processed at the time of purchase through Shopify Payments or PayPal. For custom builds, a deposit may be required before work begins, with the balance due before shipping.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1d1d1f] mb-4">Order Acceptance</h2>
            <p className="text-[#1d1d1f]/70 leading-relaxed">
              We reserve the right to refuse or cancel any order for any reason, including product availability, errors in product information or pricing, or suspected fraudulent activity. If your order is canceled after payment has been processed, a full refund will be issued.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1d1d1f] mb-4">Intellectual Property</h2>
            <p className="text-[#1d1d1f]/70 leading-relaxed">
              All content on this website — including text, images, logos, graphics, and design — is the property of The Rig Doctor Inc. and is protected by copyright and trademark laws. You may not reproduce, distribute, or use any content from this site without our written permission.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1d1d1f] mb-4">Warranty</h2>
            <p className="text-[#1d1d1f]/70 leading-relaxed">
              All custom pedalboard builds and hand-soldered cables come with lifetime support. If something we built fails under normal use, we will repair or replace it. This warranty does not cover damage caused by misuse, accidents, unauthorized modifications, or normal wear and tear. Warranty claims should be directed to info@therigdr.com.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1d1d1f] mb-4">Limitation of Liability</h2>
            <p className="text-[#1d1d1f]/70 leading-relaxed">
              To the maximum extent permitted by law, The Rig Doctor Inc. shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our website or products. Our total liability shall not exceed the amount you paid for the product or service giving rise to the claim.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1d1d1f] mb-4">Governing Law</h2>
            <p className="text-[#1d1d1f]/70 leading-relaxed">
              These terms are governed by the laws of the State of Texas, United States. Any disputes arising from these terms or your use of our website shall be resolved in the courts of Montgomery County, Texas.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1d1d1f] mb-4">Changes to These Terms</h2>
            <p className="text-[#1d1d1f]/70 leading-relaxed">
              We may update these terms from time to time. Changes will be posted on this page with an updated revision date. Continued use of the website after changes constitutes acceptance of the updated terms.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1d1d1f] mb-4">Contact</h2>
            <p className="text-[#1d1d1f]/70 leading-relaxed">
              Questions about these terms? Contact us at info@therigdr.com or write to The Rig Doctor Inc., Houston, Texas.
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}
