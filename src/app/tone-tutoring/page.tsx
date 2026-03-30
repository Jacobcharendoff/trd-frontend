'use client';

import Link from 'next/link';
import { useState } from 'react';
import Section from '@/components/Section';

// Accordion Component
interface AccordionItemProps {
  title: string;
  content: string;
}

function AccordionItem({ title, content }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-white/[0.08] rounded-2xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-8 py-6 flex justify-between items-center hover:bg-white/[0.02] transition-colors duration-200"
      >
        <h3 className="text-lg font-600 text-[#f5f5f7] text-left">
          {title}
        </h3>
        <span className={`text-[#F5A623] text-2xl font-300 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          +
        </span>
      </button>
      {isOpen && (
        <div className="px-8 py-6 border-t border-white/[0.08] bg-white/[0.01]">
          <p className="text-[#f5f5f7]/80 leading-relaxed">
            {content}
          </p>
        </div>
      )}
    </div>
  );
}

export default function ToneTutoringPage() {
  return (
    <>
      {/* ──── HERO SECTION ──── */}
      <div className="relative w-full bg-black overflow-hidden">
        <div className="relative trd-aurora min-h-screen flex items-center justify-center">
          <div className="absolute inset-0 pointer-events-none" />

          <div className="relative z-10 max-w-[1080px] mx-auto px-6 pt-32 pb-20 w-full">
            {/* Badge */}
            <div className="flex justify-center mb-6">
              <div className="inline-block bg-white/[0.08] border border-[#F5A623]/40 rounded-full px-4 py-2">
                <p className="text-sm font-600 text-[#F5A623]">1-on-1 Tone Coaching</p>
              </div>
            </div>

            {/* Main Headline */}
            <div className="mb-8 text-center">
              <h1 className="text-[3rem] sm:text-[4rem] md:text-[5rem] lg:text-[5.5rem] font-700 leading-[1.1] tracking-tight text-[#f5f5f7] mb-6">
                Your tone,{' '}
                <span className="trd-gradient-text">dialed.</span>
              </h1>
              <p className="text-lg sm:text-xl text-[#f5f5f7]/80 max-w-2xl mx-auto leading-relaxed mb-8">
                Private 1-on-1 sessions with the team behind 200+ custom rigs. Whether you're stuck on your signal chain, chasing a specific sound, or just want a second set of ears — we'll get you there.
              </p>

              {/* CTA Button */}
              <div className="flex gap-4 justify-center mb-16">
                <a
                  href="https://the-rig-doctor.myshopify.com/products/tone-tutoring"
                  className="inline-flex items-center gap-2 bg-[#F5A623] hover:bg-[#D48A1A] text-black font-600 px-8 py-4 rounded-lg transition-colors duration-200"
                >
                  Book a Session
                </a>
              </div>

              {/* Stats Row */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-12 text-center pt-12 border-t border-white/10">
                <div>
                  <p className="text-2xl sm:text-3xl font-700 text-[#F5A623] mb-2">17+</p>
                  <p className="text-sm text-[#f5f5f7]/60">Years Experience</p>
                </div>
                <div className="hidden sm:block w-px h-12 bg-white/10" />
                <div>
                  <p className="text-2xl sm:text-3xl font-700 text-[#F5A623] mb-2">200+</p>
                  <p className="text-sm text-[#f5f5f7]/60">Rigs Built</p>
                </div>
                <div className="hidden sm:block w-px h-12 bg-white/10" />
                <div>
                  <p className="text-2xl sm:text-3xl font-700 text-[#F5A623] mb-2">50+</p>
                  <p className="text-sm text-[#f5f5f7]/60">Touring Artists</p>
                </div>
              </div>

              {/* Price Callout */}
              <div className="mt-12 pt-12 border-t border-white/10">
                <p className="text-[#f5f5f7]/60 text-sm mb-2">Starting at</p>
                <p className="text-3xl sm:text-4xl font-700 text-[#F5A623]">$99.99 USD</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ──── PAIN POINTS SECTION ──── */}
      <Section theme="dark" id="pain-points" reveal>
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-700 tracking-tight text-[#f5f5f7] mb-4">
            Sound familiar?
          </h2>
          <p className="text-[#f5f5f7]/60 text-lg">
            Common struggles we help guitarists overcome
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Pain Point 1 */}
          <div className="trd-glass-dark p-8">
            <div className="flex items-start gap-4">
              <div className="text-2xl flex-shrink-0">🎚️</div>
              <div>
                <h3 className="text-xl font-600 text-[#f5f5f7] mb-2">Gear Paralysis</h3>
                <p className="text-[#f5f5f7]/70">
                  Too many pedals, YouTube rabbit holes, and gear reviews pulling you in different directions.
                </p>
              </div>
            </div>
          </div>

          {/* Pain Point 2 */}
          <div className="trd-glass-dark p-8">
            <div className="flex items-start gap-4">
              <div className="text-2xl flex-shrink-0">🎸</div>
              <div>
                <h3 className="text-xl font-600 text-[#f5f5f7] mb-2">Tone Chasing</h3>
                <p className="text-[#f5f5f7]/70">
                  Sounds great in the store or on a video, but nowhere near right when you play it live.
                </p>
              </div>
            </div>
          </div>

          {/* Pain Point 3 */}
          <div className="trd-glass-dark p-8">
            <div className="flex items-start gap-4">
              <div className="text-2xl flex-shrink-0">⚡</div>
              <div>
                <h3 className="text-xl font-600 text-[#f5f5f7] mb-2">Signal Chain Confusion</h3>
                <p className="text-[#f5f5f7]/70">
                  Where does the compressor actually go? Does order really matter? Why does it sound weird?
                </p>
              </div>
            </div>
          </div>

          {/* Pain Point 4 */}
          <div className="trd-glass-dark p-8">
            <div className="flex items-start gap-4">
              <div className="text-2xl flex-shrink-0">🤔</div>
              <div>
                <h3 className="text-xl font-600 text-[#f5f5f7] mb-2">No One to Ask</h3>
                <p className="text-[#f5f5f7]/70">
                  Forums give conflicting advice. Gear shops just want to sell you something. You need a real expert.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Solution Reframe */}
        <div className="border border-[#F5A623]/30 bg-[#F5A623]/[0.05] rounded-2xl p-8 sm:p-12 text-center">
          <h3 className="text-2xl sm:text-3xl font-700 text-[#f5f5f7] mb-4">
            What if you had a rig expert on speed dial?
          </h3>
          <p className="text-[#f5f5f7]/70 text-lg max-w-2xl mx-auto">
            That's exactly what Tone Tutoring is. One-on-one video sessions with someone who's built 200+ rigs and worked with touring artists. No nonsense. Just real tone advice.
          </p>
        </div>
      </Section>

      {/* ──── WHAT YOU GET SECTION ──── */}
      <Section theme="dark" id="what-you-get" reveal>
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-700 tracking-tight text-[#f5f5f7] mb-4">
            What's included
          </h2>
          <p className="text-[#f5f5f7]/60 text-lg">
            In every Tone Tutoring session
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Item 1 */}
          <div className="trd-glass-dark p-8 flex gap-4">
            <div className="text-[#34d399] text-2xl font-700 flex-shrink-0">✓</div>
            <div>
              <h3 className="text-lg font-600 text-[#f5f5f7] mb-2">Video Walkthrough of Your Rig</h3>
              <p className="text-[#f5f5f7]/70">
                We dive deep into what you've got, how it's set up, and what's working (or not).
              </p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="trd-glass-dark p-8 flex gap-4">
            <div className="text-[#34d399] text-2xl font-700 flex-shrink-0">✓</div>
            <div>
              <h3 className="text-lg font-600 text-[#f5f5f7] mb-2">Signal Chain Audit</h3>
              <p className="text-[#f5f5f7]/70">
                We map it all out. Is your order optimized? Are you missing something? We'll tell you.
              </p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="trd-glass-dark p-8 flex gap-4">
            <div className="text-[#34d399] text-2xl font-700 flex-shrink-0">✓</div>
            <div>
              <h3 className="text-lg font-600 text-[#f5f5f7] mb-2">Pedal Placement Optimization</h3>
              <p className="text-[#f5f5f7]/70">
                Real recommendations on where to put your gear for best tone and workflow.
              </p>
            </div>
          </div>

          {/* Item 4 */}
          <div className="trd-glass-dark p-8 flex gap-4">
            <div className="text-[#34d399] text-2xl font-700 flex-shrink-0">✓</div>
            <div>
              <h3 className="text-lg font-600 text-[#f5f5f7] mb-2">Tone Goal Mapping</h3>
              <p className="text-[#f5f5f7]/70">
                What's your end goal? We create a roadmap to get you there.
              </p>
            </div>
          </div>

          {/* Item 5 */}
          <div className="trd-glass-dark p-8 flex gap-4">
            <div className="text-[#34d399] text-2xl font-700 flex-shrink-0">✓</div>
            <div>
              <h3 className="text-lg font-600 text-[#f5f5f7] mb-2">Session Recording</h3>
              <p className="text-[#f5f5f7]/70">
                Get a full video recording to review later. Reference whenever you want.
              </p>
            </div>
          </div>

          {/* Item 6 */}
          <div className="trd-glass-dark p-8 flex gap-4">
            <div className="text-[#34d399] text-2xl font-700 flex-shrink-0">✓</div>
            <div>
              <h3 className="text-lg font-600 text-[#f5f5f7] mb-2">Follow-up Notes (24 hrs)</h3>
              <p className="text-[#f5f5f7]/70">
                Written takeaways with specific recommendations you can implement right away.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ──── PROCESS SECTION ──── */}
      <Section theme="dark" id="process" reveal>
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-700 tracking-tight text-[#f5f5f7] mb-4">
            How it works
          </h2>
          <p className="text-[#f5f5f7]/60 text-lg">
            Four simple steps to better tone
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Step 1 */}
          <div className="trd-glass-dark p-8 flex flex-col">
            <div className="text-4xl font-700 text-[#F5A623] mb-4">1</div>
            <h3 className="text-xl font-600 text-[#f5f5f7] mb-3">Book a Session</h3>
            <p className="text-[#f5f5f7]/60 leading-relaxed">
              Choose your session type and pick a time that works. It's that simple.
            </p>
          </div>

          {/* Step 2 */}
          <div className="trd-glass-dark p-8 flex flex-col">
            <div className="text-4xl font-700 text-[#F5A623] mb-4">2</div>
            <h3 className="text-xl font-600 text-[#f5f5f7] mb-3">Share Rig Details</h3>
            <p className="text-[#f5f5f7]/60 leading-relaxed">
              Tell us about your gear, playing style, and what you want to work on.
            </p>
          </div>

          {/* Step 3 */}
          <div className="trd-glass-dark p-8 flex flex-col">
            <div className="text-4xl font-700 text-[#F5A623] mb-4">3</div>
            <h3 className="text-xl font-600 text-[#f5f5f7] mb-3">Meet on Video</h3>
            <p className="text-[#f5f5f7]/60 leading-relaxed">
              We'll walk through your rig, answer questions, and dial in your tone together.
            </p>
          </div>

          {/* Step 4 */}
          <div className="trd-glass-dark p-8 flex flex-col">
            <div className="text-4xl font-700 text-[#F5A623] mb-4">4</div>
            <h3 className="text-xl font-600 text-[#f5f5f7] mb-3">Get Your Plan</h3>
            <p className="text-[#f5f5f7]/60 leading-relaxed">
              Recording + notes within 24 hours. Start implementing your new tone today.
            </p>
          </div>
        </div>
      </Section>

      {/* ──── REVIEWS SECTION ──── */}
      <Section theme="dark" id="reviews" reveal>
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-700 tracking-tight text-[#f5f5f7] mb-2">
            From real players
          </h2>
          <p className="text-[#f5f5f7]/60 text-lg">
            What guitarists say about Tone Tutoring
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Review 1 */}
          <div className="trd-glass-dark p-8 hover:bg-white/[0.06] transition-colors duration-300">
            <div className="mb-4 flex gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-[#F5A623]">★</span>
              ))}
            </div>
            <p className="text-[#f5f5f7] leading-relaxed mb-6">
              "Jacob helped me completely rethink my signal chain. I thought I had it figured out, but the session revealed so much I was missing. My tone is night and day different now."
            </p>
            <div>
              <p className="font-600 text-[#f5f5f7]">Marcus T.</p>
              <p className="text-sm text-[#f5f5f7]/60">Home Guitarist & Songwriter</p>
            </div>
          </div>

          {/* Review 2 */}
          <div className="trd-glass-dark p-8 hover:bg-white/[0.06] transition-colors duration-300">
            <div className="mb-4 flex gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-[#F5A623]">★</span>
              ))}
            </div>
            <p className="text-[#f5f5f7] leading-relaxed mb-6">
              "I was drowning in gear choices and didn't know what I actually needed. After one session, I had a clear plan. No more wasting money on stuff I don't need."
            </p>
            <div>
              <p className="font-600 text-[#f5f5f7]">Sarah L.</p>
              <p className="text-sm text-[#f5f5f7]/60">Bedroom Musician</p>
            </div>
          </div>

          {/* Review 3 */}
          <div className="trd-glass-dark p-8 hover:bg-white/[0.06] transition-colors duration-300">
            <div className="mb-4 flex gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-[#F5A623]">★</span>
              ))}
            </div>
            <p className="text-[#f5f5f7] leading-relaxed mb-6">
              "The value here is insane. An hour with someone who actually knows what they're talking about is worth 100 YouTube videos. Best $99.99 I spent on my tone."
            </p>
            <div>
              <p className="font-600 text-[#f5f5f7]">Jake D.</p>
              <p className="text-sm text-[#f5f5f7]/60">Weekend Warrior & Session Bassist</p>
            </div>
          </div>
        </div>
      </Section>

      {/* ──── PRICING SECTION ──── */}
      <Section theme="dark" id="pricing" reveal>
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-700 tracking-tight text-[#f5f5f7] mb-4">
            Simple Pricing
          </h2>
          <p className="text-[#f5f5f7]/60 text-lg">
            No hidden fees. Transparent pricing for every guitarist.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Single Session Card */}
          <div className="trd-glass-dark p-10 hover:bg-white/[0.06] transition-colors duration-300">
            <h3 className="text-2xl font-700 text-[#f5f5f7] mb-2">Single Session</h3>
            <p className="text-[#f5f5f7]/60 mb-6">60-minute deep dive into your rig</p>

            <div className="mb-8">
              <p className="text-4xl font-700 text-[#F5A623] mb-1">$99.99</p>
              <p className="text-sm text-[#f5f5f7]/60">USD</p>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex gap-3">
                <span className="text-[#34d399]">✓</span>
                <span className="text-[#f5f5f7]/80">60-minute video session</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#34d399]">✓</span>
                <span className="text-[#f5f5f7]/80">Signal chain audit</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#34d399]">✓</span>
                <span className="text-[#f5f5f7]/80">Session recording</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#34d399]">✓</span>
                <span className="text-[#f5f5f7]/80">Follow-up notes (24 hrs)</span>
              </li>
            </ul>

            <a
              href="https://the-rig-doctor.myshopify.com/products/tone-tutoring"
              className="w-full block text-center bg-[#F5A623] hover:bg-[#D48A1A] text-black font-600 px-8 py-4 rounded-lg transition-colors duration-200"
            >
              Book Now
            </a>
          </div>

          {/* 3-Session Pack Card */}
          <div className="trd-glass-dark p-10 hover:bg-white/[0.06] transition-colors duration-300 relative border border-[#F5A623]/40">
            {/* Best Value Badge */}
            <div className="absolute -top-4 right-6 bg-[#F5A623] text-black px-4 py-1 rounded-full text-xs font-700">
              BEST VALUE
            </div>

            <h3 className="text-2xl font-700 text-[#f5f5f7] mb-2">3-Session Pack</h3>
            <p className="text-[#f5f5f7]/60 mb-6">Three sessions. Full signal chain transformation.</p>

            <div className="mb-8">
              <p className="text-4xl font-700 text-[#F5A623] mb-1">$149.99</p>
              <p className="text-sm text-[#f5f5f7]/60">USD (saves you $49.98)</p>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex gap-3">
                <span className="text-[#34d399]">✓</span>
                <span className="text-[#f5f5f7]/80">3x 60-minute sessions</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#34d399]">✓</span>
                <span className="text-[#f5f5f7]/80">Full rig transformation plan</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#34d399]">✓</span>
                <span className="text-[#f5f5f7]/80">All recordings & notes</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#34d399]">✓</span>
                <span className="text-[#f5f5f7]/80">Email support between sessions</span>
              </li>
            </ul>

            <a
              href="https://the-rig-doctor.myshopify.com/products/tone-tutoring"
              className="w-full block text-center bg-[#F5A623] hover:bg-[#D48A1A] text-black font-600 px-8 py-4 rounded-lg transition-colors duration-200"
            >
              Book Now
            </a>
          </div>
        </div>

        <p className="text-center text-[#f5f5f7]/60 text-sm">
          All prices are in USD. Sessions are conducted via video. No equipment required except a guitar and camera.
        </p>
      </Section>

      {/* ──── FAQ SECTION ──── */}
      <Section theme="dark" id="faq" reveal>
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-700 tracking-tight text-[#f5f5f7] mb-4">
            Questions?
          </h2>
          <p className="text-[#f5f5f7]/60 text-lg">
            We've got answers
          </p>
        </div>

        <div className="space-y-4 max-w-3xl">
          <AccordionItem
            title="What if I'm a beginner?"
            content="No problem. Tone Tutoring is for guitarists of all levels. Whether you're just starting or you've been playing for decades, we'll meet you where you are and help you improve. The concepts are the same—gear just gets more complex as you go deeper."
          />

          <AccordionItem
            title="Do I need to have my gear in front of me?"
            content="Yes, it helps. We'll want to see your actual setup so we can walk through it together. Make sure you have your guitar, amp, and any pedals ready to demo. If you don't have everything set up yet, that's okay—we can still plan for what you want to get."
          />

          <AccordionItem
            title="What platform do you use?"
            content="We use Zoom for all sessions. It's reliable, easy, and gives us good bandwidth for video. Just bring your phone or laptop to the session, and we'll do the rest. No weird software to install."
          />

          <AccordionItem
            title="Can you help me pick new pedals?"
            content="Absolutely. In fact, that's one of the things we do best. We'll discuss your goals, your budget, and what actually makes sense for your style of playing. We'll give you honest recommendations based on what you need—not what's trendy."
          />

          <AccordionItem
            title="What's the difference between this and the free build consultation?"
            content="The free consultation is great for people thinking about a custom pedalboard build. It's 20 minutes, and we talk big picture. Tone Tutoring is a deep-dive coaching session focused on optimizing your existing rig or planning your tone journey. It's way more detailed and interactive."
          />

          <AccordionItem
            title="Can I do multiple sessions back-to-back?"
            content="Yes. The 3-Session Pack is perfect for this. Many players do one session, implement the changes, then schedule another to dial in the next layer. We recommend spacing them out by at least a week so you have time to practice with your new setup."
          />

          <AccordionItem
            title="What if I'm not happy with my session?"
            content="We stand behind our work. If for some reason you don't feel like the session was valuable, reach out and we'll make it right. Your tone journey matters to us."
          />
        </div>
      </Section>

      {/* ──── FINAL CTA SECTION ──── */}
      <Section theme="dark" id="final-cta" reveal className="text-center">
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-700 tracking-tight text-[#f5f5f7] mb-4">
            Stop chasing tone.{' '}
            <span className="trd-gradient-text">Start owning it.</span>
          </h2>
          <p className="text-[#f5f5f7]/60 text-lg max-w-2xl mx-auto">
            Your tone is closer than you think. Let's unlock it together.
          </p>
        </div>

        <div className="mt-12">
          <a
            href="https://the-rig-doctor.myshopify.com/products/tone-tutoring"
            className="inline-flex items-center gap-2 bg-[#F5A623] hover:bg-[#D48A1A] text-black font-600 px-8 py-4 rounded-lg transition-colors duration-200"
          >
            Book Your Session Today
          </a>
        </div>
      </Section>
    </>
  );
}
