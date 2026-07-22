'use client';

const steps = [
  { label: 'Consultation', time: 'Day 1', detail: '30 min call' },
  { label: 'Design', time: 'Week 1', detail: 'Diagram + quote' },
  { label: 'Build', time: 'Weeks 2–7', detail: 'Hands-on work' },
  { label: 'Delivery', time: 'Week 4–8', detail: 'At your door' },
];

interface BuildTimelineProps {
  theme?: 'light' | 'dark';
}

export default function BuildTimeline({ theme = 'dark' }: BuildTimelineProps) {
  const isDark = theme === 'dark';

  return (
    <section
      className={`py-20 sm:py-28 ${
        isDark ? 'bg-[#0a0a0a]' : 'bg-[#f5f5f7]'
      }`}
    >
      <div className="max-w-[1080px] mx-auto px-6 text-center">
        <h2
          className={`text-3xl sm:text-4xl font-bold tracking-tight mb-3 ${
            isDark ? 'text-[#f5f5f7]' : 'text-[#1d1d1f]'
          }`}
        >
          Typical timeline
        </h2>
        <p
          className={`text-base mb-14 ${
            isDark ? 'text-white/50' : 'text-[#1d1d1f]/50'
          }`}
        >
          From first call to plugging in.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto">
          {steps.map((step, i) => (
            <div
              key={step.label}
              className={`rounded-2xl p-5 sm:p-6 ${
                isDark
                  ? 'bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm'
                  : 'bg-white border border-black/[0.06] shadow-sm'
              }`}
            >
              <p
                className={`text-xs font-medium tracking-wide uppercase mb-2 ${
                  isDark ? 'text-white/50' : 'text-[#1d1d1f]/50'
                }`}
              >
                {step.label}
              </p>
              <p
                className="text-xl sm:text-2xl font-bold mb-1"
                style={{
                  background: `linear-gradient(135deg, ${
                    i === 0
                      ? '#0071E3, #BF5AF2'
                      : i === 1
                      ? '#BF5AF2, #0071E3'
                      : i === 2
                      ? '#0071E3, #BF5AF2'
                      : '#BF5AF2, #0071E3'
                  })`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {step.time}
              </p>
              <p
                className={`text-xs ${
                  isDark ? 'text-white/40' : 'text-[#1d1d1f]/40'
                }`}
              >
                {step.detail}
              </p>
            </div>
          ))}
        </div>

        <p
          className={`text-sm mt-10 ${
            isDark ? 'text-white/30' : 'text-[#1d1d1f]/30'
          }`}
        >
          Rush builds available for tour dates and studio deadlines. Just let us know.
        </p>
      </div>
    </section>
  );
}
