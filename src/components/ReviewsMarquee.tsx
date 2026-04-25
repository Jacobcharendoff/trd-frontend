'use client';

const reviews = [
  { name: 'Kevin M.', stars: 5, feedback: 'Took it on a 3-week tour. Not a single issue. I used to carry a backup board — don\'t anymore.' },
  { name: 'Josh W.', stars: 5, feedback: 'Had this hum I could never figure out. Jacob found it in like 10 minutes. Board\'s been dead quiet since.' },
  { name: 'Kaden C.', stars: 5, feedback: 'Opened up the back and every cable was labeled and laced clean. I\'ve never seen anyone do that.' },
  { name: 'Shane T.', stars: 4, feedback: 'Setup used to take me 20 minutes. Now I uncase and plug in.' },
  { name: 'Robert B.', stars: 5, feedback: 'Two years in and it still holds up. I\'ve gigged this thing hard. Nothing\'s come loose, nothing buzzes.' },
  { name: 'Marcus D.', stars: 5, feedback: 'Sent my board in as a mess. Got it back and it looked like a piece of studio gear. Sounds like one too.' },
  { name: 'Tyler R.', stars: 5, feedback: 'The noise floor dropped so much I thought something was disconnected. Nope — just dead quiet now.' },
  { name: 'Chris P.', stars: 5, feedback: 'Jacob talked me out of buying three pedals I didn\'t need and saved me $600. Then built me something better.' },
  { name: 'Danny L.', stars: 5, feedback: 'I play 200+ shows a year. This board hasn\'t let me down once. Not once.' },
  { name: 'Ethan G.', stars: 5, feedback: 'Got my board back and my band thought I bought a new amp. Same amp — just a proper signal chain now.' },
  { name: 'Nick F.', stars: 4, feedback: 'Cable routing is clean. Easy to swap pedals without rewiring everything.' },
  { name: 'Brian K.', stars: 5, feedback: 'I was skeptical about spending this much on a pedalboard. After the first gig I understood why people do.' },
  { name: 'Ryan H.', stars: 5, feedback: 'Went from 15 minutes of setup to under 2. My bandmates are jealous and two of them already reached out to Jacob.' },
  { name: 'Alex M.', stars: 5, feedback: 'The isolated power supply alone fixed problems I\'d been chasing for years. Should have done this ages ago.' },
  { name: 'Devon W.', stars: 5, feedback: 'Sound guy told me my tone has never been this consistent. That\'s the board.' },
  { name: 'Jordan S.', stars: 5, feedback: 'Hand-soldered every connection. You can see the craftsmanship the second you flip it over. This isn\'t mass-produced junk.' },
  { name: 'Mike T.', stars: 5, feedback: 'Sent Jacob a list of my pedals and a voice memo about my tone goals. He nailed it first try.' },
  { name: 'Garrett H.', stars: 5, feedback: 'I\'ve built boards myself for 10 years. After seeing what Jacob did, I\'m never going back to DIY.' },
  { name: 'Sean O.', stars: 5, feedback: 'The follow-up support is insane. Had a question six months later and got a response in 20 minutes.' },
  { name: 'Patrick C.', stars: 4, feedback: 'New board is half the weight and twice the tone. Big upgrade.' },
  { name: 'Caleb J.', stars: 5, feedback: 'Jacob redesigned my signal chain and I found two new sounds I didn\'t know my rig could make.' },
  { name: 'Leo R.', stars: 5, feedback: 'Every cable is the exact right length. No excess, no tangles. It\'s like someone organized my brain.' },
  { name: 'Trevor N.', stars: 5, feedback: 'Worth every dollar. I used to dread setting up at gigs. Now it\'s the easiest part of my night.' },
  { name: 'Dustin A.', stars: 5, feedback: 'Three tours, two continents, zero issues. That\'s the review.' },
  { name: 'Aaron V.', stars: 5, feedback: 'Sent my board across the country and it came back looking like it belongs in a museum. Plays like it too.' },
  { name: 'Will E.', stars: 5, feedback: 'My tech looked at the wiring and said "whoever did this actually gives a damn." Yeah, he does.' },
  { name: 'Corey B.', stars: 5, feedback: 'I run 22 pedals through a loop switcher. Jacob made it look simple. It plays even simpler.' },
  { name: 'Jesse M.', stars: 4, feedback: 'Consultation alone was worth it. Spotted issues I didn\'t know existed.' },
  { name: 'Blake F.', stars: 5, feedback: 'Got my board back and immediately booked another session for my backup rig. That good.' },
  { name: 'Omar K.', stars: 5, feedback: 'I\'ve spent thousands on gear over the years. This is the single best investment I\'ve made in my tone.' },
  { name: 'Drew P.', stars: 5, feedback: 'No more ground loops. No more hum. Just my guitar, my pedals, and silence between notes.' },
  { name: 'Nate L.', stars: 5, feedback: 'Jacob spent an hour on the phone with me before I even committed. That told me everything I needed to know.' },
  { name: 'Scott D.', stars: 5, feedback: 'Went from a board I was embarrassed to show to one I actually want people to see. Night and day.' },
  { name: 'Ian W.', stars: 4, feedback: 'Power isolation made my drives sound tighter and more responsive. Noticeable difference.' },
  { name: 'Jared T.', stars: 5, feedback: 'Built my first board with Jacob in 2019. Just sent him my third. No one else touches my rigs.' },
  { name: 'Pete G.', stars: 5, feedback: 'I gigged with a rats nest of cables for five years. One build later and I feel like a professional again.' },
  { name: 'Mitch S.', stars: 5, feedback: 'The attention to detail is ridiculous. Color-coded cables, labeled jacks, even a wiring diagram included.' },
  { name: 'Vince D.', stars: 5, feedback: 'I\'ve worked with Jacob for years. The craftsmanship never dips. Every board gets the same obsessive attention.' },
  { name: 'Liam R.', stars: 5, feedback: 'Traveled internationally with this board. TSA, rough handling, the works. Not a scratch, not a rattle.' },
  { name: 'Greg H.', stars: 4, feedback: 'Cleaner swells, no pop between patches. My worship leader noticed on day one.' },
  { name: 'Adam C.', stars: 5, feedback: 'Replaced three patch cables and my entire noise problem disappeared. Jacob knew exactly where to look.' },
  { name: 'Tony A.', stars: 5, feedback: 'Session guitarist here. Time is money. This board saves me time at every single session.' },
  { name: 'Keith N.', stars: 5, feedback: 'Had a pedal die mid-set. Because of how it was wired, I just bypassed it and kept playing. No drama.' },
  { name: 'Zach M.', stars: 5, feedback: 'I thought my amp was the problem. Turns out it was my board the whole time. Jacob proved it in five minutes.' },
  { name: 'Jason E.', stars: 5, feedback: 'Best customer service in the gear world. Bar none.' },
  { name: 'Ray B.', stars: 5, feedback: 'The board arrived with a handwritten note and a setup guide specific to my rig. Personal touch matters.' },
  { name: 'Sam K.', stars: 5, feedback: 'Recommended Jacob to my entire guitar group. Three of them have already gotten builds done. All happy.' },
  { name: 'Charlie W.', stars: 5, feedback: 'Went from analog spaghetti to a clean, MIDI-controlled rig. Life changing for live performance.' },
  { name: 'Derek F.', stars: 5, feedback: 'I was nervous shipping my expensive pedals across the country. Jacob walked me through every step. Flawless.' },
  { name: 'Carson J.', stars: 4, feedback: 'Tone tutoring session saved my rig. Just needed someone who knew what to listen for.' },
  { name: 'Hunter W.', stars: 5, feedback: 'Recording engineer here. The noise floor improvement was measurable. We\'re talking 6dB quieter. That\'s huge.' },
  { name: 'Jake L.', stars: 5, feedback: 'My board used to be the weak link in my chain. Now it\'s the strongest. Gigged 50+ shows on it, zero failures.' },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className="w-3.5 h-3.5"
          fill={i < count ? '#EAB308' : '#d1d5db'}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ name, stars, feedback, variant }: { name: string; stars: number; feedback: string; variant: number }) {
  // Variant 0: standard (name bottom)
  // Variant 1: name top, no quotes
  // Variant 2: large quote mark, italic text
  // Variant 3: compact, bold name inline

  if (variant === 1) {
    return (
      <div className="flex-shrink-0 w-[280px] sm:w-[320px] bg-[#f5f5f7] rounded-2xl p-6 border border-black/[0.06] trd-review-card">
        <p className="font-semibold text-[#1d1d1f] text-sm mb-2">{name}</p>
        <Stars count={stars} />
        <p className="text-[#1d1d1f]/65 mt-3 leading-relaxed text-[14px]">{feedback}</p>
      </div>
    );
  }

  if (variant === 2) {
    return (
      <div className="flex-shrink-0 w-[300px] sm:w-[350px] bg-[#f5f5f7] rounded-2xl p-6 border border-black/[0.06] trd-review-card">
        <span className="text-3xl leading-none text-[#1d1d1f]/15 font-serif">&ldquo;</span>
        <p className="text-[#1d1d1f]/70 italic leading-relaxed text-[15px] mt-1">{feedback}</p>
        <div className="flex items-center justify-between mt-4">
          <p className="font-semibold text-[#1d1d1f] text-sm">{name}</p>
          <Stars count={stars} />
        </div>
      </div>
    );
  }

  if (variant === 3) {
    return (
      <div className="flex-shrink-0 w-[260px] sm:w-[290px] bg-[#f5f5f7] rounded-2xl p-5 border border-black/[0.06] trd-review-card">
        <Stars count={stars} />
        <p className="text-[#1d1d1f]/65 mt-3 leading-relaxed text-[13px]">{feedback}</p>
        <p className="font-semibold text-[#1d1d1f]/80 text-xs mt-3 uppercase tracking-wider">&mdash; {name}</p>
      </div>
    );
  }

  // Default variant 0
  return (
    <div className="flex-shrink-0 w-[300px] sm:w-[340px] bg-[#f5f5f7] rounded-2xl p-6 border border-black/[0.06] trd-review-card">
      <Stars count={stars} />
      <p className="text-[#1d1d1f]/70 mb-4 mt-3 leading-relaxed text-[14px]">{feedback}</p>
      <p className="font-semibold text-[#1d1d1f] text-sm">{name}</p>
    </div>
  );
}

export default function ReviewsMarquee() {
  return (
    <div className="overflow-hidden">
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex gap-5 animate-marquee-left">
          {/* Duplicate full set for seamless loop */}
          {[...reviews, ...reviews].map((review, idx) => (
            <ReviewCard
              key={`r-${idx}`}
              name={review.name}
              stars={review.stars}
              feedback={review.feedback}
              variant={idx % 4}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
