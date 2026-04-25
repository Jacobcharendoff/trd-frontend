'use client';

const reviews = [
  { name: 'Kevin M.', stars: 5, feedback: 'Three weeks on the road, not a single issue. I used to bring a backup board to every show. Don\'t anymore.' },
  { name: 'Josh W.', stars: 5, feedback: 'had this hum for MONTHS. Jacob found it in like 10 min. dead quiet ever since' },
  { name: 'Kaden C.', stars: 5, feedback: 'Opened up the back to swap a pedal and every single cable was labeled. Who does that?? This guy apparently.' },
  { name: 'Shane T.', stars: 4, feedback: 'Setup used to take me 20 min. Now I just uncase and plug in. Solid work.' },
  { name: 'Robert B.', stars: 5, feedback: 'Two years of gigging. Nothing loose, nothing buzzes. That\'s all I wanted and that\'s what I got.' },
  { name: 'Marcus D.', stars: 5, feedback: 'Sent my board in looking like a garage sale. Got it back looking like studio gear.' },
  { name: 'Tyler R.', stars: 5, feedback: 'the noise floor dropped so much I genuinely thought something was unplugged lol. nope just quiet now' },
  { name: 'Chris P.', stars: 5, feedback: 'Jacob talked me OUT of buying 3 pedals I didn\'t need. Saved me like $600. Then built something way better with what I had. Rare to find someone who doesn\'t just try to upsell you.' },
  { name: 'Danny L.', stars: 5, feedback: '200+ shows a year. Board hasn\'t let me down once.' },
  { name: 'Ethan G.', stars: 5, feedback: 'My band thought I got a new amp. Nope. Same amp, just a proper signal chain now haha' },
  { name: 'Nick F.', stars: 4, feedback: 'Clean cable routing, easy to swap pedals. Does what it should.' },
  { name: 'Brian K.', stars: 5, feedback: 'Was skeptical about the price honestly. After the first gig I got it. Worth every penny.' },
  { name: 'Ryan H.', stars: 5, feedback: 'went from 15 min setup to under 2. my bandmates are jealous and two of them already hit up Jacob' },
  { name: 'Alex M.', stars: 5, feedback: 'The isolated power supply alone fixed problems I\'d been chasing for literally years. Wish I\'d done this sooner.' },
  { name: 'Devon W.', stars: 5, feedback: 'Sound guy told me my tone has never been this consistent night to night. That\'s the board.' },
  { name: 'Jordan S.', stars: 5, feedback: 'Flip it over. Every joint hand-soldered. You can see the craftsmanship. This isn\'t some factory assembly line thing.' },
  { name: 'Mike T.', stars: 5, feedback: 'Sent a list of my pedals and a voice memo rambling about what I wanted tone-wise. He nailed it first try.' },
  { name: 'Garrett H.', stars: 5, feedback: 'Built my own boards for 10 years. After seeing Jacob\'s work I\'m done with DIY. Not even close.' },
  { name: 'Sean O.', stars: 5, feedback: 'Had a question 6 months after the build. Response in 20 minutes on a Saturday. That kind of support doesn\'t exist anymore.' },
  { name: 'Patrick C.', stars: 4, feedback: 'Half the weight, twice the tone. Big upgrade.' },
  { name: 'Caleb J.', stars: 5, feedback: 'Jacob rearranged my signal chain and I found sounds I didn\'t know my rig could make. Seriously.' },
  { name: 'Leo R.', stars: 5, feedback: 'every cable is the exact right length. no excess, no tangles. it\'s like someone organized my brain' },
  { name: 'Trevor N.', stars: 5, feedback: 'I used to dread setup at gigs. Now it\'s the easiest part of my night. Worth every dollar.' },
  { name: 'Dustin A.', stars: 5, feedback: 'Three tours. Two continents. Zero issues. That\'s the review.' },
  { name: 'Aaron V.', stars: 5, feedback: 'Shipped my board across the country, was nervous the whole time. Came back looking like it belongs in a museum. Plays like it too.' },
  { name: 'Will E.', stars: 5, feedback: 'My tech looked at the wiring and said "whoever did this actually gives a damn." Yep.' },
  { name: 'Corey B.', stars: 5, feedback: '22 pedals through a loop switcher. Jacob made it look simple. It plays even simpler.' },
  { name: 'Jesse M.', stars: 4, feedback: 'Consultation alone was worth it. Found three issues I had no idea about.' },
  { name: 'Blake F.', stars: 5, feedback: 'Got my board back and immediately booked another session for the backup rig. That good.' },
  { name: 'Omar K.', stars: 5, feedback: 'Spent thousands on gear over the years. This is hands down the single best investment I\'ve made in my tone.' },
  { name: 'Drew P.', stars: 5, feedback: 'No more ground loops. No more hum. Just guitar, pedals, and silence between notes.' },
  { name: 'Nate L.', stars: 5, feedback: 'jacob spent an hour on the phone before I even committed to anything. no pressure at all. that told me everything I needed to know' },
  { name: 'Scott D.', stars: 5, feedback: 'Went from a board I was embarrassed to show other guitarists to one I actually want people to see.' },
  { name: 'Ian W.', stars: 4, feedback: 'Power isolation made my drives way tighter. Noticeable difference right away.' },
  { name: 'Jared T.', stars: 5, feedback: 'Built my first board with Jacob in 2019. Just sent him my third. Nobody else touches my rigs at this point.' },
  { name: 'Pete G.', stars: 5, feedback: 'Gigged with a rat\'s nest for five years. One build and I feel like a professional again.' },
  { name: 'Mitch S.', stars: 5, feedback: 'Color-coded cables. Labeled jacks. Wiring diagram in the case. The attention to detail is insane.' },
  { name: 'Vince D.', stars: 5, feedback: 'Worked with Jacob for years. The quality never dips. Every single board gets the same obsessive treatment.' },
  { name: 'Liam R.', stars: 5, feedback: 'Took this thing international. TSA, rough baggage handlers, the works. Not a scratch, not a rattle.' },
  { name: 'Greg H.', stars: 4, feedback: 'Cleaner swells, no pop between patches. Worship leader noticed day one.' },
  { name: 'Adam C.', stars: 5, feedback: 'Replaced three patch cables and my noise problem just... disappeared. Jacob knew exactly where to look.' },
  { name: 'Tony A.', stars: 5, feedback: 'Session guy here. Time is money. This board saves me time every single session. Pays for itself.' },
  { name: 'Keith N.', stars: 5, feedback: 'Pedal died mid-set. Because of how Jacob wired everything I just bypassed it and kept playing. No drama at all.' },
  { name: 'Zach M.', stars: 5, feedback: 'thought my amp was dying. turns out it was the board the whole time. jacob proved it in 5 minutes flat' },
  { name: 'Jason E.', stars: 5, feedback: 'Best customer service in the gear world. Bar none.' },
  { name: 'Ray B.', stars: 5, feedback: 'Board arrived with a handwritten note and a setup guide specific to MY rig. When does that ever happen?' },
  { name: 'Sam K.', stars: 5, feedback: 'Told my guitar group about Jacob. Three of them got builds. All happy. Not surprised.' },
  { name: 'Charlie W.', stars: 5, feedback: 'Went from analog spaghetti to a clean MIDI-controlled rig. Completely changed how I play live.' },
  { name: 'Derek F.', stars: 4, feedback: 'Was nervous shipping expensive pedals across the country. Jacob walked me through packing, sent updates along the way. Smooth process.' },
  { name: 'Carson J.', stars: 3, feedback: 'Took a bit longer than expected but the board itself is great. Sounds fantastic and the build quality is top notch.' },
  { name: 'Hunter W.', stars: 5, feedback: 'Recording engineer. The noise floor improvement was measurable — we\'re talking 6dB quieter. That\'s significant.' },
  { name: 'Jake L.', stars: 5, feedback: 'My board used to be the weak link. 50+ shows later it\'s the strongest part of my rig. Zero failures.' },
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

export default function ReviewsMarquee() {
  return (
    <div className="overflow-hidden">
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex gap-5 animate-marquee-left">
          {[...reviews, ...reviews].map((review, idx) => (
            <div
              key={`r-${idx}`}
              className="flex-shrink-0 w-[300px] sm:w-[340px] bg-[#f5f5f7] rounded-2xl p-6 border border-black/[0.06] trd-review-card"
            >
              <Stars count={review.stars} />
              <p className="text-[#1d1d1f]/70 mb-4 mt-3 leading-relaxed text-[14px]">{review.feedback}</p>
              <p className="font-semibold text-[#1d1d1f] text-sm">{review.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
