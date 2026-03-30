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
                {"Private 1-on-1 sessions with the team behind 200+ custom rigs. Whether you're stuck on your signal chain, chasing a specific sound, or just want a second set of ears \u2014 we'll get you there."}
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
            Sound familiar?
          </h2>
          <p className="text-[#1d1d1f]/50 text-lg">Common struggles we help guitarists overcome</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {[
            { icon: '\uD83C\uDFA8', title: 'Gear Paralysis', desc: 'Too many pedals, YouTube rabbit holes, and gear reviews pulling you in different directions.' },
            { icon: '\uD83C\uDFB8', title: 'Tone Chasing', desc: 'Sounds great in the store or on a video, but nowhere near right when you play it live.' },
            { icon: '\u26A1', title: 'Signal Chain Confusion', desc: 'Where does the compressor actually go? Does order really matter? Why does it sound weird?' },
            { icon: '\uD83E\uDD14', title: 'No One to Ask', desc: 'Forums give conflicting advice. Gear shops just want to sell you something. You need a real expert.' },
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
            What if you had a rig expert on speed dial?
          </h3>
          <p className="text-[#1d1d1f]/60 text-lg max-w-2xl mx-auto">
            {"That's exactly what Tone Tutoring is. One-on-one video sessions with someone who's built 200+ rigs and worked with touring artists. No nonsense. Just real tone advice."}
          </p>
        </div>
      </Section>

      {/* ──── WHAT YOU GET (light gray) ──── */}
      <Section theme="lightGray" id="what-you-get" reveal>
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1d1d1f] mb-4">
            {"What's included"}
          </h2>
          <p className="text-[#1d1d1f]/50 text-lg">In every Tone Tutoring session</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: 'Video Walkthrough of Your Rig', desc: "We dive deep into what you've got, how it's set up, and what's working (or not)." },
            { title: 'Signal Chain Audit', desc: "We map it all out. Is your order optimized? Are you missing something? We'll tell you." },
            { title: 'Pedal Placement Optimization', desc: 'Real recommendations on where to put your gear for best tone and workflow.' },
            { title: 'Tone Goal Mapping', desc: "What's your end goal? We create a roadmap to get you there." },
            { title: 'Session Recording', desc: 'Get a full video recording to review later. Reference whenever you want.' },
            { title: 'Follow-up Notes (24 hrs)', desc: 'Written takeaways with specific recommendations you can implement right away.' },
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
            How it works
          </h2>
          <p className="text-[#1d1d1f]/50 text-lg">Four simple steps to better tone</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { num: '1', title: 'Book a Session', desc: "Choose your session type and pick a time that works. It's that simple." },
            { num: '2', title: 'Share Rig Details', desc: 'Tell us about your gear, playing style, and what you want to work on.' },
            { num: '3', title: 'Meet on Video', desc: "We'll walk through your rig, answer questions, and dial in your tone together." },
            { num: '4', title: 'Get Your Plan', desc: 'Recording + notes within 24 hours. Start implementing your new tone today.' },
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
            From real players
          </h2>
          <p className="text-[#1d1d1f]/50 text-lg">What guitarists say about Tone Tutoring</p>
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
            Simple Pricing
          </h2>
          <p className="text-[#f5f5f7]/60 text-lg">No hidden fees. Transparent pricing for every guitarist.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Single Session */}
          <div className="trd-glass-dark p-10 hover:bg-white/[0.06] transition-colors duration-300">
            <h3 className="text-2xl font-bold text-[#f5f5f7] mb-2">Single Session</h3>
            <p className="text-[#f5f5f7]/60 mb-6">60-minute deep dive into your rig</p>
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
            <p className="text-[#f5f5f7]/60 mb-6">Three sessions. Full signal chain transformation.</p>
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
            Questions?
          </h2>
          <p className="text-[#1d1d1f]/50 text-lg">{"We've got answers"}</p>
        </div>

        <div className="space-y-4 max-w-3xl">
          <AccordionItem title="What if I'm a beginner?" content="No problem. Tone Tutoring is for guitarists of all levels. Whether you're just starting or you've been playing for decades, we'll meet you where you are and help you improve. The concepts are the same — gear just gets more complex as you go deeper." />
          <AccordionItem title="Do I need to have my gear in front of me?" content="Yes, it helps. We'll want to see your actual setup so we can walk through it together. Make sure you have your guitar, amp, and any pedals ready to demo. If you don't have everything set up yet, that's okay — we can still plan for what you want to get." />
          <AccordionItem title="What platform do you use?" content="We use Zoom for all sessions. It's reliable, easy, and gives us good bandwidth for video. Just bring your phone or laptop to the session, and we'll do the rest. No weird software to install." />
          <AccordionItem title="Can you help me pick new pedals?" content="Absolutely. In fact, that's one of the things we do best. We'll discuss your goals, your budget, and what actually makes sense for your style of playing. We'll give you honest recommendations based on what you need — not what's trendy." />
          <AccordionItem title="What's the difference between this and the free build consultation?" content="The free consultation is great for people thinking about a custom pedalboard build. It's 20 minutes, and we talk big picture. Tone Tutoring is a deep-dive coaching session focused on optimizing your existing rig or planning your tone journey. It's way more detailed and interactive." />
          <AccordionItem title="Can I do multiple sessions back-to-back?" content="Yes. The 3-Session Pack is perfect for this. Many players do one session, implement the changes, then schedule another to dial in the next layer. We recommend spacing them out by at least a week so you have time to practice with your new setup." />
          <AccordionItem title="What if I'm not happy with my session?" content="We stand behind our work. If for some reason you don't feel like the session was valuable, reach out and we'll make it right. Your tone journey matters to us." />
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
            Your tone is closer than you think. {"Let's unlock it together."}
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
