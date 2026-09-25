'use client';

const reviews = [
  { name: 'Kevin M.', stars: 5, feedback: 'Three weeks on the road, not a single issue. I used to bring a backup board to every show. Don\'t anymore.' },
  { name: 'Dustin A.', stars: 5, feedback: 'Three tours. Two continents. Zero issues. That\'s the review.' },
  { name: 'Chris P.', stars: 5, feedback: 'Jacob talked me OUT of buying 3 pedals I didn\'t need. Saved me like $600. Then built something way better with what I had. Rare to find someone who doesn\'t just try to upsell you.' },
  { name: 'Tyler R.', stars: 5, feedback: 'the noise floor dropped so much I genuinely thought something was unplugged lol. nope just quiet now' },
  { name: 'Brian K.', stars: 5, feedback: 'Was skeptical about the price honestly. After the first gig I got it. Worth every penny.' },
  { name: 'Will E.', stars: 5, feedback: 'My tech looked at the wiring and said "whoever did this actually gives a damn." Yep.' },
  { name: 'Danny L.', stars: 5, feedback: '200+ shows a year. Board hasn\'t let me down once.' },
  { name: 'Ethan G.', stars: 5, feedback: 'My band thought I got a new amp. Nope. Same amp, just a proper signal chain now haha' },
  { name: 'Hunter W.', stars: 5, feedback: 'Recording engineer. The noise floor improvement was measurable. We\'re talking 6dB quieter. That\'s significant.' },
  { name: 'Omar K.', stars: 5, feedback: 'Spent thousands on gear over the years. This is hands down the single best investment I\'ve made in my tone.' },
  { name: 'Jared T.', stars: 5, feedback: 'Built my first board with Jacob in 2019. Just sent him my third. Nobody else touches my rigs at this point.' },
  { name: 'Sean O.', stars: 5, feedback: 'Had a question 6 months after the build. Response in 20 minutes on a Saturday. That kind of support doesn\'t exist anymore.' },
];

const TOTAL_REVIEW_COUNT = 52;

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      <svg width="0" height="0" className="absolute" aria-hidden="true"><defs><linearGradient id="trdStar" x1="0" x2="1" y1="0" y2="0"><stop offset="0%" stopColor="#30D158"/><stop offset="35%" stopColor="#0A84FF"/><stop offset="70%" stopColor="#BF5AF2"/><stop offset="100%" stopColor="#FF375F"/></linearGradient></defs></svg>
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className="w-3.5 h-3.5"
          fill={i < count ? 'url(#trdStar)' : '#d1d5db'}
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
      {/* Total count badge */}
      <div className="text-center mb-6">
        <span className="inline-flex items-center gap-2 text-sm font-medium text-[#1d1d1f]/40 bg-[#1d1d1f]/[0.04] px-4 py-2 rounded-full">
          <svg className="w-4 h-4" fill="#000" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          {TOTAL_REVIEW_COUNT} five-star reviews from real players
        </span>
      </div>

      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex gap-5 animate-marquee-left">
          {[...reviews, ...reviews].map((review, idx) => (
            <div
              key={`r-${idx}`}
              className="flex-shrink-0 w-[300px] sm:w-[340px] bg-[#f5f5f7] rounded-[22px] p-7 border border-black/[0.04]"
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
