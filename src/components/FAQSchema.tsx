const faqs = [
  {
    question: 'How much does a custom pedalboard build cost?',
    answer:
      'Custom rig builds start at $2,000 USD. Price depends on board size, number of pedals, power requirements, MIDI integration, and cable complexity. We quote every build individually after your free consultation so there are no surprises.',
  },
  {
    question: 'How long does it take to build a custom pedalboard?',
    answer:
      'Custom rig builds typically take 4-8 weeks depending on complexity and what parts we need to source. Touring emergency? We do rush builds too. Just let us know during your consultation.',
  },
  {
    question: 'What is included in the free rig build consultation?',
    answer:
      'We talk through your rig, your signal chain, what is bugging you, and what you want it to do. Then we put together a game plan and a quote. No pressure, no obligation — just honest advice from a professional rig builder.',
  },
  {
    question: 'Do I need to send you my pedals for a custom build?',
    answer:
      'Yes. We need your actual pedals to build the board correctly — proper fitment, cable routing, and power draw all depend on what you are running. Ship them to us and we ship your completed rig back fully insured.',
  },
  {
    question: 'Do you ship custom pedalboards?',
    answer:
      'Yes, we ship across the entire United States. Completed rigs ship fully insured via UPS Ground in a hard case or flight-ready packaging. We are US-based and do not currently ship internationally.',
  },
  {
    question: 'What is Tone Tutoring?',
    answer:
      'Tone Tutoring is a 60-minute one-on-one video session where we help you dial in your signal chain, effects order, amp settings, and overall rig strategy. It is $99 USD and built for players who want better tone without buying more gear.',
  },
  {
    question: 'Can you integrate MIDI switching into my pedalboard?',
    answer:
      'Yes. MIDI integration is one of our specialties. We work with systems like RJM, Boss ES-8, Morningstar, and others to give you preset-based control over your entire rig with clean, silent switching.',
  },
  {
    question: 'What if something breaks after the build?',
    answer:
      'We stand behind our work. If something goes wrong with the build, reach out and we will figure it out with you. We are not going to leave you hanging — ongoing support is included.',
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
