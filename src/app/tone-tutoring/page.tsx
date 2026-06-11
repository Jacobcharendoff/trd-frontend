'use client';

import Link from 'next/link';
import { useState } from 'react';
import Section from '@/components/Section';

function AccordionItem({ title, content }: { title: string; content: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-black[0.06] rounded-2xl overflow-hidden bg-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-8 py-6 flex justify-between items-center hover:bg-[#f5f5f7]/50 transition-colors duration-200"
      >
        <h3 className="text-lg font-semibold text-[#1d1d1f] text-left">{title}</h3>
        <span className={`text-[#0071E3] text-2xl transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>+</span>
      </button>
      {isOpen && (
        <div className="px-8 py-6 border-t border-black/[0.06] bg-[#f5f5f7]/30">
          <p className="text-[#1d1d1f]/70 leading-relaxed">{content}</p>
        </div>
      )}
    </div>
  );
}

export default function ToneTutoringPage() {
  return (
    <>
      {/* ──── HERO ──── */}
      <div className="relative w-full bg-black overflow-hidden">
        <div className="relative trd-aurora-intense min-h-screen flex items-end justify-center">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          >
            <source
              src="https://cdn.shopify.com/videos/c/o/v/5f0a62a68694406d95b83a837a56c2d0.mov"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 pointer-events-none" />
          <div className="relative z-10 max-w-[1080px] mx-auto px-6 pt-32 pb-20 w-full">
            <div className="flex justify-center mb-6">
              <div className="inline-block bg-white/[0.08] border border-[#0071E3]/40 rounded-full px-4 py-2">
                <p className="text-sm font-semibold text-[#0071E3]">1-on-1 Video Session</p>
              </div>
            </div>
            <div className="mb-8 text-center">
              <h1 className="trd-hero-headline text-[#f5f5f7] mb-6">
                Your tone,{' '}
                <span className="trd-gradient-text">sorted.</span>
              </h1>
              <p className="trd-subheadline max-w-2xl mx-auto mb-8">
                Hop on a video call with the guys who build rigs for touring artists. Bring your board, your questions, and whatever&apos;s been bugging you. We&apos;ll figure it out together.
              </p>
              <div className="flex gap-4 justify-center mb-16">
                <a
                  href="/api/checkout?handle=tone-tutoring-follow-up"
                  className="trd-cta-gradient trd-glow-pulse inline-flex items-center gap-2 font-semibold px-10 py-4 rounded-full text-lg"
                >
                  Book a Session
                </a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-12 text-center pt-12 border-t border-white/10">
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-white mb-2">17+</p>
                <p className="text-sm text-[#f5f5f7]/60">Years at the bench</p>
              </div>
              <div className="hidden sm:block w-px h-12 bg-white/10" />
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-white mb-2">500+</p>
                <p className="text-sm text-[#f5f5f7]/60">Rigs built</p>
              </div>
              <div className="hidden sm:block w-px h-12 bg-white/10" />
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-white mb-2">50+</p>
                <p className="text-sm text-[#f5f5f7]/60">Touring artists</p>
              </div>
            </div>

            <div className="mt-12 pt-12 border-t border-white/10 text-center">
              <p className="text-[#f5f5f7]/60 text-sm mb-2">Starting at</p>
              <p className="text-3xl sm:text-4xl font-bold trd-gradient-text">$99 USD</p>
            </div>
          </div>
        </div>
      </div>

      <div className="trd-divider-dark-to-light" />

      {/* ──── THE PROBLEM ──── */}
      <Section theme="light" id="pain-points" reveal>
        <div className="mb-12">
          <h2 className="trd-section-headline text-[#1d1d1f] mb-4">
            Sound familiar?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {[
            { title: 'Too many options, not enough clarity', desc: "You've watched dozens of YouTube demos this week. Every one says something different. You're more confused now than when you started." },
            { title: 'It sounded great in the store', desc: "But at home, at rehearsal, on stage? Not even close. There's a reason for that, and it's usually fixable." },
            { title: 'The chain order question', desc: "Compressor before or after the drive? Does your loop order actually matter? Short answer: yes. More than most players realize." },
            { title: 'Nobody to just ask', desc: "Reddit says one thing, the gear shop says another, your buddy swears by something else. You want someone who does this for a living." },
          ].map((pain) => (
            <div key={pain.title} className="bg-[#f5f5f7] rounded-2xl p-8">
              <h3 className="text-lg font-semibold text-[#1d1d1f] mb-3">{pain.title}</h3>
              <p className="text-[#1d1d1f]/60 leading-relaxed">{pain.desc}</p>
            </div>
          ))}
        </div>

        <div className="border border-[#0071E3]/20 bg-[#0071E3]/[0.04] rounded-2xl p-8 sm:p-12">
          <h3 className="text-2xl sm:text-3xl font-bold text-[#1d1d1f] mb-4">
            That&apos;s what this session is for.
          </h3>
          <p className="text-[#1d1d1f]/60 text-lg max-w-2xl">
            One hour, one-on-one, with someone who&apos;s wired 500+ boards and toured with artists you listen to. Bring your rig, your questions, whatever&apos;s on your mind. We&apos;ll work through it.
          </p>
        </div>
      </Section>

      {/* ──── WHAT YOU GET ──── */}
      <Section theme="lightGray" id="what-you-get" reveal>
        <div className="mb-12">
          <h2 className="trd-section-headline text-[#1d1d1f] mb-4">
            What&apos;s included.
          </h2>
          <p className="text-[#1d1d1f]/50 text-lg">Every session, no exceptions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: 'Full Rig Walkthrough', desc: "Show us what you've got. We go through every pedal, every cable, every setting and tell you what's helping and what's working against you." },
            { title: 'Signal Chain Audit', desc: "We map your whole chain and figure out if the order is working for you or fighting you. Most players are surprised by what we find." },
            { title: 'Pedal Placement', desc: "Where your stuff sits on the board matters more than you'd think. We'll show you why and give you a plan to fix it." },
            { title: 'Tone Roadmap', desc: "Where are you trying to go? We'll draw a line from where you are now to the sound in your head." },
            { title: 'Session Recording', desc: "The whole call is recorded. No scrambling for notes. Watch it back whenever you need a refresher." },
            { title: 'Follow-up Notes', desc: "Within 24 hours you get written notes with specific next steps. Not vague advice. Actual things to go do." },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-2xl p-8 flex gap-4 border border-black/[0.04]">
              <div className="text-[#10B981] text-lg font-bold flex-shrink-0 mt-0.5">&#10003;</div>
              <div>
                <h3 className="text-lg font-semibold text-[#1d1d1f] mb-2">{item.title}</h3>
                <p className="text-[#1d1d1f]/60 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ──── HOW IT WORKS ──── */}
      <Section theme="light" id="process" reveal>
        <div className="mb-12">
          <h2 className="trd-section-headline text-[#1d1d1f] mb-4">
            Four steps. Pretty straightforward.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { num: '1', title: 'Pick a time', desc: "Grab a slot and book your session. Takes 30 seconds." },
            { num: '2', title: 'Tell us about your rig', desc: "Quick form about your gear, your style, and what's bugging you. Helps us come prepared." },
            { num: '3', title: 'Get on the call', desc: "We dig into your rig together. Real-time feedback. Real answers." },
            { num: '4', title: 'Get your game plan', desc: "Recording and written notes hit your inbox within 24 hours. Go make some noise." },
          ].map((step) => (
            <div key={step.num} className="bg-[#f5f5f7] rounded-2xl p-8 flex flex-col">
              <div className="text-4xl font-bold trd-gradient-text mb-4">{step.num}</div>
              <h3 className="text-lg font-semibold text-[#1d1d1f] mb-3">{step.title}</h3>
              <p className="text-[#1d1d1f]/60 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ──── REVIEWS ──── */}
      <Section theme="lightGray" id="reviews" reveal>
        <div className="mb-12">
          <h2 className="trd-section-headline text-[#1d1d1f] mb-2">
            From players who&apos;ve done it.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { quote: "Jacob completely rethought my signal chain. I thought I had it figured out. I was wrong. My tone is night and day different now.", name: 'Marcus T.', role: 'Gigging Guitarist' },
            { quote: "I was drowning in gear options and didn't know what I actually needed. One session, clear plan. Stopped wasting money on stuff that doesn't serve my sound.", name: 'Sarah L.', role: 'Songwriter' },
            { quote: "An hour with someone who actually knows what they're talking about is worth more than a hundred YouTube videos. Best money I've spent on my tone.", name: 'Jake D.', role: 'Session Player' },
          ].map((review) => (
            <div key={review.name} className="bg-white rounded-2xl p-8 border border-black/[0.06]">
              <div className="mb-4 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4" fill="#EAB308" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-[#1d1d1f]/80 leading-relaxed mb-6">&ldquo;{review.quote}&rdquo;</p>
              <div>
                <p className="font-semibold text-[#1d1d1f]">{review.name}</p>
                <p className="text-sm text-[#1d1d1f]/50">{review.role}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <div className="trd-divider-gray-to-dark" />

      {/* ──── PRICING ──── */}
      <Section theme="dark" id="pricing" reveal>
        <div className="mb-12">
          <h2 className="trd-section-headline text-[#f5f5f7] mb-4">
            Pricing. No surprises.
          </h2>
          <p className="text-[#f5f5f7]/60 text-lg">One session. Everything you need.</p>
        </div>

        <div className="max-w-xl mx-auto mb-8">
          <div className="trd-glass-dark p-10 hover:bg-white/[0.06] transition-colors duration-300 border border-[#0071E3]/20">
            <h3 className="text-2xl font-bold text-[#f5f5f7] mb-2">60-Minute Session</h3>
            <p className="text-[#f5f5f7]/60 mb-6">One hour, one rig, full attention.</p>
            <div className="mb-8">
              <p className="text-4xl font-bold trd-gradient-text mb-1">$99</p>
              <p className="text-sm text-[#f5f5f7]/60">USD</p>
            </div>
            <ul className="space-y-3 mb-8">
              {['60-minute 1-on-1 video session', 'Full signal chain audit', 'Session recording delivered', 'Follow-up notes within 24 hrs', 'Honest gear recommendations'].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-[#10B981]">&#10003;</span>
                  <span className="text-[#f5f5f7]/80">{item}</span>
                </li>
              ))}
            </ul>
            <a href="/api/checkout?handle=tone-tutoring-follow-up" className="w-full block text-center trd-cta-gradient font-semibold px-8 py-4 rounded-full text-lg">
              Book Your Session
            </a>
          </div>
        </div>

        <p className="text-center text-[#f5f5f7]/40 text-sm">
          All prices in USD. Sessions are via video. Just need a guitar and a camera.
        </p>
      </Section>

      <div className="trd-divider-dark-to-light" />

      {/* ──── FAQ ──── */}
      <Section theme="light" id="faq" reveal>
        <div className="mb-12">
          <h2 className="trd-section-headline text-[#1d1d1f] mb-4">
            Questions we get a lot.
          </h2>
        </div>

        <div className="space-y-4 max-w-3xl">
          <AccordionItem title="I'm kind of a beginner. Is this for me?" content="Yeah. You don't need a massive rig to get something out of this. Whether you've got three pedals or thirty, we meet you where you are. The fundamentals of good tone are the same at every level." />
          <AccordionItem title="Do I need my gear set up?" content="That's the whole point. Have your guitar, amp, and whatever pedals you've got ready to go. If your setup isn't fully built yet, no problem. We can plan it out together." />
          <AccordionItem title="What platform?" content="Google Meet. We send you a link — just click and you're in." />
          <AccordionItem title="Can you help me pick new gear?" content="That's one of our favorite things to do. We'll talk about what you're going for, what your budget looks like, and give you honest recs. Not whatever's trending this week." />
          <AccordionItem title="How's this different from the free build consultation?" content="The free consult is a 20-minute chat for people thinking about a custom build. Tone Tutoring is a full hour of hands-on coaching where we actually dig into your rig and optimize what you've got. Way more detailed." />
          <AccordionItem title="Can I book more than one session?" content="Absolutely. A lot of guys do a session, make the changes, play for a week, then come back. You get way more out of it that way. Just book another one when you're ready." />
          <AccordionItem title="What if I don't get anything out of it?" content="Reach out. We'll make it right. We're not doing this to collect checks. If you didn't get value, that's on us." />
        </div>
      </Section>

      <div className="trd-divider-light-to-dark" />

      {/* ──── CLOSING CTA ──── */}
      <Section theme="dark" id="final-cta" reveal className="text-center">
        <div className="mb-8">
          <h2 className="trd-section-headline text-[#f5f5f7] mb-4">
            You&apos;re closer to your sound than you think.
          </h2>
          <p className="text-[#f5f5f7]/60 text-lg max-w-2xl mx-auto">
            Let&apos;s go find it.
          </p>
        </div>
        <div className="mt-12">
          <a
            href="/api/checkout?handle=tone-tutoring-follow-up"
            className="trd-cta-gradient trd-glow-pulse inline-flex items-center gap-2 font-semibold px-10 py-4 rounded-full text-lg"
          >
            Book a Session
          </a>
        </div>
      </Section>
    </>
  );
}
