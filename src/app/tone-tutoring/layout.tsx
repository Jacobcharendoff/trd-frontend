import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tone Tutoring',
  description:
    'Private 60-minute tone coaching sessions with a rig expert. Signal chain audit, pedal placement, gear recommendations, and a game plan — $99.99 USD.',
  openGraph: {
    title: 'Tone Tutoring — The Rig Doctor',
    description:
      '60-minute 1-on-1 video session with a rig expert. Signal chain audit, gear recs, and a written game plan. $99.99 USD.',
    url: 'https://www.therigdr.com/tone-tutoring',
  },
  alternates: {
    canonical: 'https://www.therigdr.com/tone-tutoring',
  },
};

const toneTutoringFAQs = [
  {
    q: "I'm kind of a beginner. Is this for me?",
    a: "Yes. You don't need a massive rig to get something out of this. Whether you've got three pedals or thirty, we meet you where you are. The fundamentals of good tone are the same at every level.",
  },
  {
    q: 'Do I need my gear set up?',
    a: "That's the whole point. Have your guitar, amp, and whatever pedals you've got ready to go. If your setup isn't fully built yet, no problem. We can plan it out together.",
  },
  {
    q: 'What platform is the session on?',
    a: "Zoom. It works, it's easy, nothing weird to install.",
  },
  {
    q: 'Can you help me pick new gear?',
    a: "That's one of our favorite things to do. We'll talk about what you're going for, what your budget looks like, and give you honest recommendations. Not whatever's trending this week.",
  },
  {
    q: "How is Tone Tutoring different from the free build consultation?",
    a: "The free consult is a 30-minute chat for people thinking about a custom build. Tone Tutoring is a full 60-minute hands-on coaching session where we actually dig into your rig and optimize what you've got. Way more detailed.",
  },
  {
    q: 'Can I book more than one session?',
    a: "Absolutely. A lot of players do a session, make the changes, play for a week, then come back. You get way more out of it that way. Just book another one when you're ready.",
  },
  {
    q: "What if I don't get anything out of it?",
    a: "Reach out and we'll make it right. We're not doing this to collect checks. If you didn't get value, that's on us.",
  },
];

function ToneTutoringFAQSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: toneTutoringFAQs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
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

export default function ToneTutoringLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToneTutoringFAQSchema />
      {children}
    </>
  );
}
