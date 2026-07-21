'use client';

import Section from '@/components/Section';
import type { Metadata } from 'next';

export default function PrivacyPage() {
  return (
    <div>
      {/* Hero */}
      <Section theme="dark" reveal>
        <div className="min-h-[300px] flex flex-col items-center justify-center py-16 sm:py-24">
          <h1 className="text-[2.25rem] sm:text-[3rem] md:text-[3.5rem] font-bold text-center text-white mb-4">
            Privacy Policy
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
            <h2 className="text-2xl font-bold text-[#1d1d1f] mb-4">Who We Are</h2>
            <p className="text-[#1d1d1f]/70 leading-relaxed">
              The Rig Doctor Inc. (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the website therigdr.com. We are located in Houston, Texas, United States. This privacy policy explains how we collect, use, and protect your personal information when you visit our website or purchase our products and services.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1d1d1f] mb-4">Information We Collect</h2>
            <p className="text-[#1d1d1f]/70 leading-relaxed mb-4">
              We collect information you provide directly to us when you place an order, book a consultation, sign up for our mailing list, or contact us. This may include your name, email address, shipping address, phone number, and payment information.
            </p>
            <p className="text-[#1d1d1f]/70 leading-relaxed">
              We also automatically collect certain information when you visit our site, including your IP address, browser type, operating system, referring URLs, and browsing behavior through cookies and similar technologies.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1d1d1f] mb-4">How We Use Your Information</h2>
            <p className="text-[#1d1d1f]/70 leading-relaxed">
              We use the information we collect to process and fulfill your orders, communicate with you about your purchases and consultations, send you marketing communications (with your consent), improve our website and services, and comply with legal obligations. We do not sell your personal information to third parties.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1d1d1f] mb-4">Payment Processing</h2>
            <p className="text-[#1d1d1f]/70 leading-relaxed">
              All payments are processed securely through Shopify Payments and PayPal. We do not store your credit card information on our servers. Payment processing is subject to the terms and privacy policies of Shopify and PayPal respectively.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1d1d1f] mb-4">Cookies</h2>
            <p className="text-[#1d1d1f]/70 leading-relaxed">
              We use cookies and similar tracking technologies to improve your browsing experience, analyze site traffic, and understand where our visitors come from. You can control cookie preferences through your browser settings. Disabling cookies may affect some functionality of our website.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1d1d1f] mb-4">Third-Party Services</h2>
            <p className="text-[#1d1d1f]/70 leading-relaxed">
              We use third-party services including Shopify (e-commerce platform), Google Analytics (website analytics), HubSpot (customer relationship management), and shipping carriers (UPS, USPS, FedEx). These services may collect and process your data according to their own privacy policies.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1d1d1f] mb-4">Data Retention</h2>
            <p className="text-[#1d1d1f]/70 leading-relaxed">
              We retain your personal information for as long as necessary to fulfill the purposes for which it was collected, including to satisfy legal, accounting, or reporting requirements. Order data is retained for a minimum of 7 years for tax and accounting purposes.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1d1d1f] mb-4">Your Rights</h2>
            <p className="text-[#1d1d1f]/70 leading-relaxed">
              You have the right to access, correct, or delete your personal information. You may also opt out of marketing communications at any time by clicking the unsubscribe link in any email or contacting us directly. To exercise any of these rights, please contact us at info@therigdr.com.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1d1d1f] mb-4">Changes to This Policy</h2>
            <p className="text-[#1d1d1f]/70 leading-relaxed">
              We may update this privacy policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1d1d1f] mb-4">Contact Us</h2>
            <p className="text-[#1d1d1f]/70 leading-relaxed">
              If you have questions about this privacy policy or our data practices, contact us at info@therigdr.com or write to us at The Rig Doctor Inc., Houston, Texas.
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}
