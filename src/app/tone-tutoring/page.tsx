'use client';

import Link from 'next/link';
import { useState } from 'react';
import Section from '@/components/Section';

/* ──── Accordion ──── */
function AccordionItem({ title, content }: { title: string; content: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-black/[0.06] rounded-2xl overflow-hidden bg-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-8 py-6 flex justify-between items-center hover:bg-[#f5f5f7]/50 transition-colors duration-200"
      >
        <h3 className="text-lg font-semibold text-[#1d1d1f] text-left">{title}</h3>
        <span className={`text-[#F5A623] text-2xl transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>+</span>
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
      {/* ──── HERO (dark — cinematic) ──── */}
      <div className="relative w-full bg-black overflow-hidden">
        <div className="relative trd-aurora min-h-screen flex items-center justify-center">
          <div className="absolute inset-0 pointer-events-none" />
          <div className="relative z-10 max-w-[1080px] mx-auto px-6 pt-32 pb-20 w-full">
            <div className="flex justify-center mb-6">
              <div className="inline-block bg-white/[0.08] border border-[#F5A623]/40 rounded-full px-4 py-2">
                <p className="text-sm font-semibold text-[#F5A623]">1-on-1 Tone Coaching</p>
              </div>
            </div>
            <div className="mb-8 text-center">
              <h1 className="text-[3rem] sm:text-[4rem] md:text-[5rem] lg:text-[5.5rem] font-bold leading-[1.05] tracking-tight text-[#f5f5f7] mb-6">
                Your tone,{' '}
                <span className="trd-gradient-text">dialed.</span>
              </h1>
              <p className="text-lg sm:text-xl text-[#f5f5f7]/80 max-w-2xl mx-auto leading-relaxed mb-8">
                {"Hop on a video call with the guys who've built 200+ rigs. Stuck on your signal chain? Chasing a sound you can't quite nail? Just want someone who actually knows gear to tell you what's up? That's what this is for."}
              </p>
              <div className="flex gap-4 justify-center mb-16">
                <a
                  href="https://the-rig-doctor.myshopify.com/products/tone-tutoring"
                  className="inline-flex items-center gap-2 bg-[#F5A623] hover:bg-[#D48A1A] text-black font-semibold px-8 py-4 rounded-full transition-colors duration-200"
                >
                  Book a Session
                </a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-12 text-center pt-12 border-t border-white/10">
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-[#F5A623] mb-2">17+</p>
                <p className="text-sm text-[#f5f5f7]/60">Years Experience</p>
              </div>
              <div className="hidden sm:block w-px h-12 bg-white/10" />
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-[#F5A623] mb-2">200+</p>
                <p className="text-sm text-[#f5f5f7]/60">Rigs Built</p>
              </div>
              <div className="hidden sm:block w-px h-12 bg-white/10" />
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-[#F5A623] mb-2">50+</p>
                <p className="text-sm text-[#f5f5f7]/60">Touring Artists</p>
              </div>
            </div>

            <div className="mt-12 pt-12 border-t border-white/10 text-center">
              <p className="text-[#f5f5f7]/60 text-sm mb-2">Starting at</p>
              <p className="text-3xl sm:text-4xl font-bold text-[#F5A623]">$99.99 USD</p>
            </div>
          </div>
        </div>
      </div>

      {/* ──── PAIN POINTS (white — PAS framework, clean) ──── */}
      <Section theme="light" id="pain-points" reveal>
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1d1d1f] mb-4">
            Yeah, we&apos;ve heard this before.
          </h2>
          <p className="text-[#1d1d1f]/50 text-lg">If any of this sounds like you, you&apos;re in the right place</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {[
            { icon: '\uD83C\uDFA8', title: 'Gear Paralysis', desc: "You've watched 47 YouTube demos this week and you're more confused than when you started. We get it." },
            { icon: '\uD83C\uDFB8', title: 'Tone Chasing', desc: "It sounded incredible in the store. At home? Not even close. There's a reason for that — and it's fixable." },
            { icon: '\u26A1', title: 'Signal Chain Chaos', desc: "Compressor before or after the drive? Does your loop order actually matter? (Spoiler: yes. A lot.)" },
            { icon: '\uD83E\uDD14', title: 'No One Who Gets It', desc: "Reddit says one thing, the gear shop says another, and your buddy just told you to buy a Tube Screamer. You need someone who actually builds rigs for a living." },
          ].map((pain) => (
            <div key={pain.title} className="bg-[#f5f5f7] rounded-2xl p-8">
              <div className="flex items-start gap-4">
                <div className="text-2xl flex-shrink-0">{pain.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold text-[#1d1d1f] mb-2">{pain.title}</h3>
                  <p className="text-[#1d1d1f]/60">{pain.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Solution reframe */}
        <div className="border border-[#F5A623]/30 bg-[#F5A623]/[0.05] rounded-2xl p-8 sm:p-12 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-[#1d1d1f] mb-4">
            Imagine having a rig builder on speed dial.
          </h3>
          <p className="text-[#1d1d1f]/60 text-lg max-w-2xl mx-auto">
            {"That's basically what this is. One-on-one video with someone who's wired 200+ boards and toured with artists you listen to. No fluff, no upsell — just someone who knows tone helping you find yours."}
          </p>
        </div>
      </Section>

      {/* ──── WHAT YOU GET (light gray) ──── */}
      <Section theme="lightGray" id="what-you-get" reveal>
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1d1d1f] mb-4">
            {"Here's what you get."}
          </h2>
          <p className="text-[#1d1d1f]/50 text-lg">Every session, no exceptions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: 'Full Rig Walkthrough', desc: "Show us what you've got. We'll go through every pedal, every cable, every setting — and tell you what's helping and what's hurting." },
            { title: 'Signal Chain Audit', desc: "We'll map your whole chain and figure out if the order is working for you or fighting you. Most players are surprised." },
            { title: 'Pedal Placement Recs', desc: "Where your stuff sits on the board matters more than you think. We'll show you why and give you a plan." },
            { title: 'Tone Roadmap', desc: "Where are you trying to go? We'll draw the line from where you are now to the sound in your head." },
            { title: 'Session Recording', desc: "The whole call is recorded so you can rewatch it later. No frantic note-taking required." },
            { title: 'Follow-up Notes', desc: "Within 24 hours you'll get written notes with specific next steps. No vague advice — real action items." },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-2xl p-8 flex gap-4 border border-black/[0.04]">
              <div className="text-[#10B981] text-xl font-bold flex-shrink-0 mt-0.5">&#10003;</div>
              <div>
                <h3 className="text-lg font-semibold text-[#1d1d1f] mb-2">{item.title}</h3>
                <p className="text-[#1d1d1f]/60">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ──── PROCESS (white — clean steps) ──── */}
      <Section theme="light" id="process" reveal>
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1d1d1f] mb-4">
            Dead simple.
          </h2>
          <p className="text-[#1d1d1f]/50 text-lg">Four steps. You could be dialing in your tone this week.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { num: '1', title: 'Pick a Time', desc: "Single session or 3-pack — grab what fits and book a slot. Takes about 30 seconds." },
            { num: '2', title: 'Tell Us About Your Rig', desc: "Quick form about your gear, your style, and what's bugging you. Helps us hit the ground running." },
            { num: '3', title: 'Hop on the Call', desc: "We dig into your rig together. Real-time feedback, real answers, no BS." },
            { num: '4', title: 'Get Your Game Plan', desc: "Recording + written notes land in your inbox within 24 hours. Go make noise." },
          ].map((step) => (
            <div key={step.num} className="bg-[#f5f5f7] rounded-2xl p-8 flex flex-col">
              <div className="text-4xl font-bold trd-gradient-text mb-4">{step.num}</div>
              <h3 className="text-xl font-semibold text-[#1d1d1f] mb-3">{step.title}</h3>
              <p className="text-[#1d1d1f]/60 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ──── REVIEWS (light gray — social proof) ──── */}
      <Section theme="lightGray" id="reviews" reveal>
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1d1d1f] mb-2">
            Players talk.
          </h2>
          <p className="text-[#1d1d1f]/50 text-lg">Here&apos;s what they&apos;re saying after their sessions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { quote: "Jacob helped me completely rethink my signal chain. I thought I had it figured out, but the session revealed so much I was missing. My tone is night and day different now.", name: 'Marcus T.', role: 'Home Guitarist & Songwriter' },
            { quote: "I was drowning in gear choices and didn't know what I actually needed. After one session, I had a clear plan. No more wasting money on stuff I don't need.", name: 'Sarah L.', role: 'Bedroom Musician' },
            { quote: "The value here is insane. An hour with someone who actually knows what they're talking about is worth 100 YouTube videos. Best $99.99 I spent on my tone.", name: 'Jake D.', role: 'Weekend Warrior & Session Bassist' },
          ].map((review) => (
            <div key={review.name} className="bg-white rounded-2xl p-8 border border-black/[0.06] hover:shadow-md transition-shadow duration-300">
              <div className="mb-4 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-[#F5A623]">&#9733;</span>
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

      {/* ──── PRICING (dark accent — makes pricing pop) ──── */}
      <Section theme="dark" id="pricing" reveal>
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#f5f5f7] mb-4">
            No surprises. Just pricing.
          </h2>
          <p className="text-[#f5f5f7]/60 text-lg">Pick the one that fits. Either way, you&apos;re getting the real deal.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Single Session */}
          <div className="trd-glass-dark p-10 hover:bg-white/[0.06] transition-colors duration-300">
            <h3 className="text-2xl font-bold text-[#f5f5f7] mb-2">Single Session</h3>
            <p className="text-[#f5f5f7]/60 mb-6">One hour, one rig, full attention</p>
            <div className="mb-8">
              <p className="text-4xl font-bold text-[#F5A623] mb-1">$99.99</p>
              <p className="text-sm text-[#f5f5f7]/60">USD</p>
            </div>
            <ul className="space-y-3 mb-8">
              {['60-minute video session', 'Signal chain audit', 'Session recording', 'Follow-up notes (24 hrs)'].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-[#34d399]">&#10003;</span>
                  <span className="text-[#f5f5f7]/80">{item}</span>
                </li>
              ))}
            </ul>
            <a href="https://the-rig-doctor.myshopify.com/products/tone-tutoring" className="w-full block text-center bg-[#F5A623] hover:bg-[#D48A1A] text-black font-semibold px-8 py-4 rounded-full transition-colors duration-200">
              Book Now
            </a>
          </div>

          {/* 3-Session Pack */}
          <div className="trd-glass-dark p-10 hover:bg-white/[0.06] transition-colors duration-300 relative border border-[#F5A623]/40">
            <div className="absolute -top-4 right-6 bg-[#F5A623] text-black px-4 py-1 rounded-full text-xs font-bold">BEST VALUE</div>
            <h3 className="text-2xl font-bold text-[#f5f5f7] mb-2">3-Session Pack</h3>
            <p className="text-[#f5f5f7]/60 mb-6">For the player who wants the full transformation</p>
            <div className="mb-8">
              <p className="text-4xl font-bold text-[#F5A623] mb-1">$149.99</p>
              <p className="text-sm text-[#f5f5f7]/60">USD (saves you $49.98)</p>
            </div>
            <ul className="space-y-3 mb-8">
              {['3x 60-minute sessions', 'Full rig transformation plan', 'All recordings & notes', 'Email support between sessions'].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-[#34d399]">&#10003;</span>
                  <span className="text-[#f5f5f7]/80">{item}</span>
                </li>
              ))}
            </ul>
            <a href="https://the-rig-doctor.myshopify.com/products/tone-tutoring" className="w-full block text-center bg-[#F5A623] hover:bg-[#D48A1A] text-black font-semibold px-8 py-4 rounded-full transition-colors duration-200">
              Book Now
            </a>
          </div>
        </div>

        <p className="text-center text-[#f5f5f7]/60 text-sm">
          All prices are in USD. Sessions are conducted via video. No equipment required except a guitar and camera.
        </p>
      </Section>

      {/* ──── FAQ (white — clean, readable) ──── */}
      <Section theme="light" id="faq" reveal>
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1d1d1f] mb-4">
            Got questions? Cool.
          </h2>
          <p className="text-[#1d1d1f]/50 text-lg">Here are the ones we get the most</p>
        </div>

        <div className="space-y-4 max-w-3xl">
          <AccordionItem title="I'm kind of a beginner — is this for me?" content="100%. You don't need a massive rig to get value from this. Whether you've got three pedals or thirty, we'll meet you where you are. The fundamentals of great tone are the same at every level." />
          <AccordionItem title="Do I need my gear in front of me?" content="Yeah, that's the whole point. Have your guitar, amp, and whatever pedals you've got set up and ready to go. If your setup isn't fully built yet, no sweat — we can still plan it out together." />
          <AccordionItem title="What platform do you use?" content="Zoom. It works, it's easy, and you don't need to install anything weird. Just grab your phone or laptop and show up." />
          <AccordionItem title="Can you help me pick new pedals?" content="That's literally one of our favorite things to do. We'll talk about what you're going for, what your budget looks like, and give you honest recs — not whatever's trending on Instagram this week." />
          <AccordionItem title="How is this different from the free build consultation?" content="The free consult is a 20-minute chat for people thinking about a custom board build. Tone Tutoring is a full hour of hands-on coaching where we dig into your rig and optimize what you've already got. Way more detailed, way more interactive." />
          <AccordionItem title="Should I space out the 3-session pack?" content="We'd recommend it. Do a session, implement the changes, play for a week, then come back and we'll dial in the next layer. You'll get way more out of it that way." />
          <AccordionItem title="What if the session doesn't help?" content="Reach out. We'll make it right. We don't do this to collect checks — we do it because we're obsessed with tone. If you didn't get value, that's on us to fix." />
        </div>
      </Section>

      {/* ──── FINAL CTA (dark accent — strong close) ──── */}
      <Section theme="dark" id="final-cta" reveal className="text-center">
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#f5f5f7] mb-4">
            Stop chasing tone.{' '}
            <span className="trd-gradient-text">Start owning it.</span>
          </h2>
          <p className="text-[#f5f5f7]/60 text-lg max-w-2xl mx-auto">
            {"You're closer to your sound than you think. Let's go find it."}
          </p>
        </div>
        <div className="mt-12">
          <a
            href="https://the-rig-doctor.myshopify.com/products/tone-tutoring"
            className="inline-flex items-center gap-2 bg-[#F5A623] hover:bg-[#D48A1A] text-black font-semibold px-8 py-4 rounded-full transition-colors duration-200"
          >
            Book Your Session Today
          </a>
        </div>
      </Section>
    </>
  );
}
