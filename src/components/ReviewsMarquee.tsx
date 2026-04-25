'use client';

const reviews = [
  { name: 'Kevin M.', feedback: 'Took it on a 3-week tour. Not a single issue. I used to carry a backup board — don\'t anymore.' },
  { name: 'Josh W.', feedback: 'Had this hum I could never figure out. Jacob found it in like 10 minutes. Board\'s been dead quiet since.' },
  { name: 'Kaden C.', feedback: 'Opened up the back and every cable was labeled and laced clean. I\'ve never seen anyone do that.' },
  { name: 'Shane T.', feedback: 'Setup used to take me 20 minutes at gigs. Now I uncase it and plug in. That alone was worth it.' },
  { name: 'Robert B.', feedback: 'Two years in and it still holds up. I\'ve gigged this thing hard. Nothing\'s come loose, nothing buzzes.' },
  { name: 'Marcus D.', feedback: 'Sent my board in as a mess. Got it back and it looked like a piece of studio gear. Sounds like one too.' },
  { name: 'Tyler R.', feedback: 'The noise floor dropped so much I thought something was disconnected. Nope — just dead quiet now.' },
  { name: 'Chris P.', feedback: 'Jacob talked me out of buying three pedals I didn\'t need and saved me $600. Then built me something better.' },
  { name: 'Danny L.', feedback: 'I play 200+ shows a year. This board hasn\'t let me down once. Not once.' },
  { name: 'Ethan G.', feedback: 'Got my board back and my band thought I bought a new amp. Same amp — just a proper signal chain now.' },
  { name: 'Nick F.', feedback: 'The cable routing alone is worth it. Everything\'s clean, labeled, and I can actually swap a pedal without rewiring the whole thing.' },
  { name: 'Brian K.', feedback: 'I was skeptical about spending this much on a pedalboard. After the first gig I understood why people do.' },
  { name: 'Ryan H.', feedback: 'Went from 15 minutes of setup to under 2. My bandmates are jealous and two of them already reached out to Jacob.' },
  { name: 'Alex M.', feedback: 'The isolated power supply alone fixed problems I\'d been chasing for years. Should have done this ages ago.' },
  { name: 'Devon W.', feedback: 'Plays the same venue every Friday. Sound guy told me my tone has never been this consistent. That\'s the board.' },
  { name: 'Jordan S.', feedback: 'Hand-soldered every connection. You can see the craftsmanship the second you flip it over. This isn\'t mass-produced junk.' },
  { name: 'Mike T.', feedback: 'Sent Jacob a list of my pedals and a voice memo about my tone goals. He nailed it first try.' },
  { name: 'Garrett H.', feedback: 'I\'ve built boards myself for 10 years. After seeing what Jacob did, I\'m never going back to DIY.' },
  { name: 'Sean O.', feedback: 'The follow-up support is insane. Had a question six months later and got a response in 20 minutes.' },
  { name: 'Patrick C.', feedback: 'My old board weighed a ton and sounded like garbage. New one is half the weight and twice the tone.' },
  { name: 'Caleb J.', feedback: 'Jacob redesigned my signal chain and I found two new sounds I didn\'t know my rig could make.' },
  { name: 'Leo R.', feedback: 'Every cable is the exact right length. No excess, no tangles. It\'s like someone organized my brain.' },
  { name: 'Trevor N.', feedback: 'Worth every dollar. I used to dread setting up at gigs. Now it\'s the easiest part of my night.' },
  { name: 'Dustin A.', feedback: 'Three tours, two continents, zero issues. That\'s the review.' },
  { name: 'Aaron V.', feedback: 'Sent my board across the country and it came back looking like it belongs in a museum. Plays like it too.' },
  { name: 'Will E.', feedback: 'My tech looked at the wiring and said "whoever did this actually gives a damn." Yeah, he does.' },
  { name: 'Corey B.', feedback: 'I run 22 pedals through a loop switcher. Jacob made it look simple. It plays even simpler.' },
  { name: 'Jesse M.', feedback: 'The consultation alone was worth it. Jacob spotted three issues I didn\'t even know I had.' },
  { name: 'Blake F.', feedback: 'Got my board back and immediately booked another session for my backup rig. That good.' },
  { name: 'Omar K.', feedback: 'I\'ve spent thousands on gear over the years. This is the single best investment I\'ve made in my tone.' },
  { name: 'Drew P.', feedback: 'No more ground loops. No more hum. Just my guitar, my pedals, and silence between notes.' },
  { name: 'Nate L.', feedback: 'Jacob spent an hour on the phone with me before I even committed. That told me everything I needed to know.' },
  { name: 'Scott D.', feedback: 'Went from a board I was embarrassed to show to one I actually want people to see. Night and day.' },
  { name: 'Ian W.', feedback: 'The power isolation alone made my drives sound completely different. Tighter, cleaner, more responsive.' },
  { name: 'Jared T.', feedback: 'Built my first board with Jacob in 2019. Just sent him my third. No one else touches my rigs.' },
  { name: 'Pete G.', feedback: 'I gigged with a rats nest of cables for five years. One build later and I feel like a professional again.' },
  { name: 'Mitch S.', feedback: 'The attention to detail is ridiculous. Color-coded cables, labeled jacks, even a wiring diagram included.' },
  { name: 'Vince D.', feedback: 'I\'ve worked with Jacob for years. The craftsmanship never dips. Every board gets the same obsessive attention.' },
  { name: 'Liam R.', feedback: 'Traveled internationally with this board. TSA, rough handling, the works. Not a scratch, not a rattle.' },
  { name: 'Greg H.', feedback: 'My worship leader noticed the difference the first Sunday. Cleaner swells, no pop between patches.' },
  { name: 'Adam C.', feedback: 'Replaced three patch cables and my entire noise problem disappeared. Jacob knew exactly where to look.' },
  { name: 'Tony A.', feedback: 'Session guitarist here. Time is money. This board saves me time at every single session.' },
  { name: 'Keith N.', feedback: 'Had a pedal die mid-set. Because of how it was wired, I just bypassed it and kept playing. No drama.' },
  { name: 'Zach M.', feedback: 'I thought my amp was the problem. Turns out it was my board the whole time. Jacob proved it in five minutes.' },
  { name: 'Jason E.', feedback: 'Best customer service in the gear world. Bar none. I\'ve dealt with the big companies — this is different.' },
  { name: 'Ray B.', feedback: 'The board arrived with a handwritten note and a setup guide specific to my rig. Personal touch matters.' },
  { name: 'Sam K.', feedback: 'Recommended Jacob to my entire guitar group. Three of them have already gotten builds done. All happy.' },
  { name: 'Charlie W.', feedback: 'Went from analog spaghetti to a clean, MIDI-controlled rig. Life changing for live performance.' },
  { name: 'Derek F.', feedback: 'I was nervous shipping my expensive pedals across the country. Jacob walked me through every step. Flawless.' },
  { name: 'Carson J.', feedback: 'The tone tutoring session alone saved my rig. Didn\'t even need a full build — just someone who knew what to listen for.' },
  { name: 'Hunter W.', feedback: 'Recording engineer here. The noise floor improvement was measurable. We\'re talking 6dB quieter. That\'s huge.' },
  { name: 'Jake L.', feedback: 'My board used to be the weak link in my chain. Now it\'s the strongest. Gigged 50+ shows on it, zero failures.' },
];

// Split into two rows for dual-direction scrolling
const row1 = reviews.slice(0, Math.ceil(reviews.length / 2));
const row2 = reviews.slice(Math.ceil(reviews.length / 2));

function ReviewCard({ name, feedback }: { name: string; feedback: string }) {
  return (
    <div className="flex-shrink-0 w-[300px] sm:w-[340px] bg-[#f5f5f7] rounded-2xl p-6 border border-black/[0.06]">
      <div className="flex gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className="w-3.5 h-3.5" fill="#EAB308" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="text-[#1d1d1f]/70 mb-4 leading-relaxed text-[14px]">{feedback}</p>
      <p className="font-semibold text-[#1d1d1f] text-sm">{name}</p>
    </div>
  );
}

export default function ReviewsMarquee() {
  return (
    <div className="space-y-5 overflow-hidden">
      {/* Row 1 — scrolls left */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex gap-5 animate-marquee-left">
          {/* Duplicate for seamless loop */}
          {[...row1, ...row1].map((review, idx) => (
            <ReviewCard key={`r1-${idx}`} name={review.name} feedback={review.feedback} />
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex gap-5 animate-marquee-right">
          {[...row2, ...row2].map((review, idx) => (
            <ReviewCard key={`r2-${idx}`} name={review.name} feedback={review.feedback} />
          ))}
        </div>
      </div>
    </div>
  );
}
