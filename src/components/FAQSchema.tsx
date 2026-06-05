'use client';

const faqs = [
  {
    question: 'How much does a custom pedalboard build cost?',
    answer:
      'Custom rig builds start at $999.99. Price depends on board size, number of pedals, power requirements, MIDI integration, and cable complexity. We quote every build individually after your consultation so there are no surprises.',
  },
  {
    question: 'How long does it take to build a custom pedalboard?',
    answer:
      'Custom rig builds typically take 14-21 business days from the date we receive all your pedals and materials. Custom cables take 3-5 business days. Timelines can shift based on our build queue — we give you a real ETA when we kick off your project.',
  },
  {
    question: 'Do I need to send you my pedals for a custom build?',
    answer:
      'Yes. We need your actual pedals to build the board correctly — proper fitment, cable routing, and power draw all depend on what you are running. Ship them to us and we ship your completed rig back fully insured.',
  },
  {
    question: 'What cables do you use for pedalboard builds?',
    answer:
      'We use Mogami 2314 cable on every build because the signal quality is measurably better than generic patch cables. Every cable is hand-soldered, heat-shrunk, strain-relieved, and meter-tested for continuity and capacitance before it leaves the shop.',
  },
  {
    question: 'Do you ship custom pedalboards?',
    answer:
      'Yes, we ship across the entire United States. Completed rigs ship fully insured via UPS Ground in a hard case or flight-ready packaging. We do not currently ship internationally.',
  },
  {
    question: 'What is Tone Tutoring?',
    answer:
      'Tone Tutoring is a 60-minute one-on-one video session where we help you dial in your signal chain, effects order, amp settings, and overall rig strategy. It is $99.99 and built for players who want better tone without buying more gear.',
  },
  {
    question: 'What is the difference between a DIY kit and a custom build?',
    answer:
      'A custom build means we do everything: layout, soldering, wiring, power, MIDI, testing, and shipping. A DIY kit gives you our professional spec — pre-cut cables, labeled parts, and step-by-step instructions — so you can build it yourself.',
  },
  {
    question: 'Can you integrate MIDI switching into my pedalboard?',
    answer:
      'Yes. MIDI integration is one of our specialties. We work with systems like RJM, Boss ES-8, Morningstar, and others to give you preset-based control over your entire rig with clean, silent switching.',
  },
];

export default function FAQSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
