/**
 * Blog data layer
 * Posts stored as structured data with MDX-like content sections.
 * Easily migrateable to a headless CMS later.
 */

import { seoPosts } from './blog-posts-seo';
import { costPost } from './blog-post-cost';
import { seoPostDateOverrides } from './blog-seo-dates';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  readTime: string;
  category: string;
  tags: string[];
  heroImage?: string;
  heroAlt?: string;
  sections: {
    heading?: string;
    headingLevel?: 2 | 3;
    content: string; // HTML string
  }[];
  cta?: {
    text: string;
    href: string;
    label: string;
  };
  faqs?: {
    question: string;
    answer: string;
  }[];
}

export const blogPosts: BlogPost[] = [
  costPost,
  {
    slug: 'how-to-build-a-pedalboard',
    title: 'How to Build a Pedalboard: The Complete Guide',
    description:
      'Everything you need to know about building a pedalboard from scratch — board selection, signal chain order, cable management, power, and pro tips from 200+ builds.',
    publishedAt: '2026-05-05',
    updatedAt: '2026-09-24',
    author: 'Jacob Charendoff, Founder of The Rig Doctor',
    readTime: '12 min read',
    category: 'Guides',
    tags: ['pedalboard', 'signal chain', 'cable management', 'build guide'],
    heroImage:
      'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Jacob_S.jpg',
    heroAlt:
      'Overhead view of a custom pedalboard build by The Rig Doctor with Mogami cables',
    faqs: [
      {
        question: 'What is the best signal chain order for a pedalboard?',
        answer: 'The standard signal chain that works for most setups is: Guitar, Tuner, Filters/Wah, Compressor, Overdrive/Distortion, Modulation, Delay, Reverb, Amp. Each pedal processes the signal from the one before it, so putting effects in this order keeps your tone clean and defined. Time-based effects like delay and reverb typically go in your amp\'s effects loop if you have one.',
      },
      {
        question: 'How many pedals can fit on a pedalboard?',
        answer: 'It depends on the board size and your pedal dimensions. A small board like a Pedaltrain Nano fits 4-5 mini pedals. A Pedaltrain Classic Jr handles 6-8 standard pedals. A full-size board like the Pedaltrain Classic 2 fits 12-16 pedals. Always size up one tier from what you think you need. You will fill it.',
      },
      {
        question: 'Should I use soldered or solderless patch cables?',
        answer: 'For a gigging board, soldered cables are more reliable. Soldered connections create a permanent molecular bond that does not loosen over time. Solderless cables use mechanical pressure that can fail with vibration and temperature changes. For a bedroom board that stays in one place, solderless works fine.',
      },
      {
        question: 'Do I need an isolated power supply for my pedalboard?',
        answer: 'If you are running more than 3-4 pedals and care about noise, yes. An isolated power supply gives each pedal its own power output with no shared ground, which eliminates ground loop hum. Daisy-chaining pedals off one adapter is the number one cause of pedalboard noise.',
      },
      {
        question: 'How much does it cost to build a pedalboard yourself?',
        answer: 'A DIY build with quality components for an 8-pedal board typically costs $445 to $745 for the board, power supply, cables, and mounting hardware. That does not include the pedals themselves. If you have never soldered before, add $40-$80 for a soldering station. Our guide to custom pedalboard costs breaks down every line item.',
      },
    ],
    sections: [
      {
        content: `<p>You've got a pile of pedals on the floor, a tangle of cables that would make an electrician cry, and a tone you know could be better. Sound familiar? Building a pedalboard isn't just about bolting pedals to a board — it's about designing a system that makes your rig sound better, set up faster, and survive the road.</p>
<p>I've built over 200 pedalboards in the last 17 years — for weekend players, touring professionals, and everyone in between. This guide covers everything I've learned about building a board that actually works.</p>`,
      },
      {
        heading: 'Step 1: Choose the right pedalboard',
        headingLevel: 2,
        content: `<p>The board itself matters more than most people think. You need something that fits your pedal count, your gig bag or case, and your playing situation.</p>
<p><strong>Size it right.</strong> Count your pedals, then add room for one more — you'll fill it. A board that's too small means cramming pedals together, which creates noise and makes it impossible to hit one switch without stomping another. A board that's too big means extra weight you're hauling to every gig.</p>
<p><strong>Material matters.</strong> Aluminum boards (like Pedaltrain) are light and work well with most mounting solutions. Steel boards are heavier but more rigid. Wood boards look great but can warp with humidity changes — not ideal if you're gigging in different climates.</p>
<p><strong>Angled vs. flat.</strong> Angled boards (with a rise from front to back) make it easier to reach pedals in the back row. If you're running more than one row of pedals, go angled. Your feet will thank you mid-set.</p>`,
      },
      {
        heading: 'Step 2: Plan your signal chain order',
        headingLevel: 2,
        content: `<p>This is where most DIY builds go wrong. Pedal order isn't arbitrary — it changes your tone dramatically. Here's the general signal chain that works for 90% of setups:</p>
<p><strong>Guitar → Tuner → Filters/Wah → Compressor → Overdrive/Distortion → Modulation → Delay → Reverb → Amp</strong></p>
<p>Why this order? Each pedal processes the signal that comes before it. Put your delay before your overdrive and you're distorting the repeats — which sounds like mush. Put your compressor after your drive and you're squashing your dynamics instead of evening them out before the gain stage.</p>
<p>That said, rules are made to be broken. Some players run reverb into fuzz for shoegaze textures. Some put the compressor after drive for sustain. The "right" order is whatever sounds good to you — but start with the conventional chain and experiment from there.</p>
<p>If you're running an effects loop, your time-based effects (delay, reverb) usually go in the loop, while your gain and filter pedals stay in front of the amp. For a deeper breakdown, check out our <a href="/blog/effects-loop-vs-front-of-amp">effects loop vs. front of amp guide</a>.</p>`,
      },
      {
        heading: 'Step 3: Get your cables right',
        headingLevel: 2,
        content: `<p>Cables are the circulatory system of your board. Bad cables mean noise, signal loss, and reliability problems that'll ruin a gig. This is the single biggest mistake I see on DIY boards — cheap cables that introduce hum, crackle, or just eat your high end.</p>
<p><strong>Patch cables</strong> connect pedal to pedal. You want low-capacitance cable with quality connectors — soldered, not crimped. I use <a href="/shop">Mogami 2314</a> on every build because the signal quality is measurably better than generic patch cables, and they're built to last decades. We go deeper on this in our <a href="/blog/best-patch-cables-for-pedalboard">patch cable guide</a>.</p>
<p><strong>Cable length matters.</strong> Shorter patch cables mean less signal loss and less noise pickup. Measure your actual distances and cut to fit rather than using whatever length came in the bag. A 6-inch cable run doesn't need a 12-inch patch cable flopping around underneath.</p>
<p><strong>Instrument cables</strong> (guitar to board, board to amp) are just as important. A 20-foot run of cheap cable can roll off enough high end to make your rig sound dull. Invest in quality here — <a href="/shop">Mogami 2524</a> is what we use and recommend.</p>`,
      },
      {
        heading: "Step 4: Power supply — don't cheap out",
        headingLevel: 2,
        content: `<p>A proper isolated power supply eliminates ground loops and the hum that comes with them. Daisy-chaining pedals off a single adapter is the number one cause of noise on pedalboards. Each pedal gets its own isolated output — no shared ground, no noise. Our <a href="/blog/pedalboard-power-supply-guide">power supply guide</a> covers everything you need to know about choosing and wiring one.</p>
<p><strong>Check your current draw.</strong> Every pedal has a current requirement (measured in milliamps). Add them up and make sure your power supply can handle the total with headroom to spare. Digital pedals (Strymon, Boss DD-500, etc.) draw significantly more than analog pedals.</p>
<p><strong>Voltage matters too.</strong> Most pedals run on 9V, but some need 12V or 18V. Running a 9V pedal on 18V can damage it. Running an 18V pedal on 9V means it won't perform properly. Check every pedal's specs before wiring power.</p>
<p><strong>Mount it underneath.</strong> The power supply goes under the board, not on top. It frees up real estate for pedals and keeps the power cables separated from your audio cables — which reduces noise.</p>`,
      },
      {
        heading: 'Step 5: Cable management and routing',
        headingLevel: 2,
        content: `<p>This is what separates a pro build from a mess. Clean cable management isn't just cosmetic — it reduces noise, makes troubleshooting easier, and prevents cables from getting snagged or damaged.</p>
<p><strong>Route audio and power separately.</strong> Run your audio cables on one side of the board and power cables on the other. When audio and power cables cross, do it at 90-degree angles to minimize electromagnetic interference.</p>
<p><strong>Use cable ties, not tape.</strong> Gaffer tape leaves residue and loosens over time. Reusable cable ties (with a bit of slack for servicing) keep everything locked down without the mess.</p>
<p><strong>Label your cables.</strong> When something goes wrong at 11 PM during a gig, you don't want to trace every cable. A piece of tape with a number on each end of every cable saves you in those moments.</p>
<p><strong>Leave service loops.</strong> Don't pull cables drum-tight. Leave a small loop at each connection point so you can remove a pedal for servicing without rewiring the entire board.</p>`,
      },
      {
        heading: 'Step 6: Secure your pedals',
        headingLevel: 2,
        content: `<p><strong>Professional-grade mounting tape</strong> is the standard for a reason. It holds pedals firmly but lets you rearrange when you want to swap something out. Apply it to the bottom of each pedal and to the board surface.</p>
<p>Clean both surfaces with rubbing alcohol before applying. Dirt and oil are why mounting tape "stops working" — it's not the tape, it's the prep.</p>
<p>For heavier pedals (large multi-effects, wahs), consider using additional securing methods through the board rails. A heavy pedal with just mounting tape can shift over time, especially in a road case getting bounced around in a trailer.</p>`,
      },
      {
        heading: 'Step 7: Test everything before you close it up',
        headingLevel: 2,
        content: `<p>Before you lock everything down and call it done, test the full signal chain. Turn on every pedal one at a time and listen for:</p>
<ul>
<li><strong>Hum or buzz</strong> — usually a power issue or a ground loop. Our <a href="/blog/pedalboard-hum-noise-fix">pedalboard noise troubleshooting guide</a> walks through every common cause and fix.</li>
<li><strong>Signal loss</strong> — check cable connections, especially at the jacks</li>
<li><strong>Tone suck</strong> — too many buffered bypasses in a row can change your clean tone</li>
<li><strong>Switching noise</strong> — pops when engaging/disengaging pedals usually mean a cable issue</li>
</ul>
<p>Play through the board for at least 15 minutes with your actual amp and guitar. Issues that don't show up in the first 30 seconds will reveal themselves over a longer session — intermittent connections, thermal noise from power supplies warming up, etc.</p>`,
      },
      {
        heading: 'When to call a pro',
        headingLevel: 2,
        content: `<p>Building your own board is rewarding, but there's a point where the complexity outweighs the DIY savings. If you're running more than 8-10 pedals, using an effects loop switcher, or need your board road-ready for touring — that's when a professional build pays for itself. Our <a href="/blog/custom-pedalboard-build-vs-diy">custom build vs. DIY comparison</a> breaks down exactly where that line is.</p>
<p>A pro build means hand-soldered cables cut to exact length, proper power distribution, noise-free cable routing, and a board that won't let you down three songs into a set. It's the difference between a board you built and a board you can trust.</p>
<p>We've built over 300 rigs at The Rig Doctor, and every build comes with lifetime support and free repairs. If you're thinking about a custom build, <a href="/book">book a free consultation</a> and let's talk about your rig.</p>`,
      },
      {
        heading: 'Frequently asked questions about building a pedalboard',
        headingLevel: 2,
        content: `<h3>What is the best signal chain order for a pedalboard?</h3>
<p>The standard signal chain that works for most setups is: Guitar, Tuner, Filters/Wah, Compressor, Overdrive/Distortion, Modulation, Delay, Reverb, Amp. Each pedal processes the signal from the one before it, so putting effects in this order keeps your tone clean and defined. Time-based effects like delay and reverb typically go in your amp's effects loop if you have one.</p>
<h3>How many pedals can fit on a pedalboard?</h3>
<p>It depends on the board size and your pedal dimensions. A small board like a Pedaltrain Nano fits 4-5 mini pedals. A Pedaltrain Classic Jr handles 6-8 standard pedals. A full-size board like the Pedaltrain Classic 2 fits 12-16 pedals. Always size up one tier from what you think you need. You will fill it.</p>
<h3>Should I use soldered or solderless patch cables?</h3>
<p>For a gigging board, soldered cables are more reliable. Soldered connections create a permanent molecular bond that does not loosen over time. Solderless cables use mechanical pressure that can fail with vibration and temperature changes. For a bedroom board that stays in one place, solderless works fine.</p>
<h3>Do I need an isolated power supply for my pedalboard?</h3>
<p>If you are running more than 3-4 pedals and care about noise, yes. An isolated power supply gives each pedal its own power output with no shared ground, which eliminates ground loop hum. Daisy-chaining pedals off one adapter is the number one cause of pedalboard noise.</p>
<h3>How much does it cost to build a pedalboard yourself?</h3>
<p>A DIY build with quality components for an 8-pedal board typically costs $445 to $745 for the board, power supply, cables, and mounting hardware. That does not include the pedals themselves. If you have never soldered before, add $40-$80 for a soldering station. Our <a href="/blog/custom-pedalboard-cost">guide to custom pedalboard costs</a> breaks down every line item.</p>`,
      },
    ],
    cta: {
      text: 'Ready to build your dream rig?',
      href: '/book',
      label: 'Book a Free Consultation',
    },
  },
  {
    slug: 'best-patch-cables-for-pedalboard',
    title: 'Best Patch Cables for Your Pedalboard: Why Cable Quality Matters',
    description:
      'A deep dive into why patch cable quality makes an audible difference on your pedalboard, and what to look for when choosing cables for your rig.',
    publishedAt: '2026-05-05',
    updatedAt: '2026-09-24',
    author: 'Jacob Charendoff, Founder of The Rig Doctor',
    readTime: '8 min read',
    category: 'Gear',
    tags: ['patch cables', 'Mogami', 'signal quality', 'pedalboard'],
    faqs: [
      {
        question: 'What are the best patch cables for a pedalboard?',
        answer: 'Mogami 2314 is the industry standard for professional pedalboard builds. It has extremely low capacitance (12.2 pF/ft) which preserves your high end across multiple pedal connections. The oxygen-free copper conductor and quality shielding reject noise better than generic cables. We use Mogami on every build at The Rig Doctor.',
      },
      {
        question: 'Do patch cables really affect guitar tone?',
        answer: 'Yes. Every foot of cable adds capacitance, which rolls off high frequencies. With passive pickups this effect is more pronounced. A single cheap cable may not be noticeable, but multiply it across 8-12 patch connections on a pedalboard and the cumulative tone loss is significant. Lower capacitance cable preserves more high-end clarity.',
      },
      {
        question: 'Are solderless patch cables reliable?',
        answer: 'Solderless cables work fine for bedroom boards that stay in one place. For gigging boards, soldered cables are significantly more reliable. Solderless connections rely on mechanical pressure that can loosen with vibration and temperature changes. Hand-soldered connections create a permanent molecular bond that does not degrade over time.',
      },
      {
        question: 'How long should pedalboard patch cables be?',
        answer: 'As short as possible while still reaching comfortably. Every extra inch of cable adds capacitance and potential noise pickup. Custom-length cables cut to the exact distance between your pedals are ideal. A 4-inch connection does not need a 12-inch cable coiled underneath. Multiply the excess across 10+ connections and the difference in clarity is audible.',
      },
    ],
    sections: [
      {
        content: `<p>Most guitarists will spend hours debating which overdrive pedal to buy, then connect it with a $3 patch cable from a bin at the music store. That cable is quietly eating your tone — and you might not even realize it.</p>
<p>After 200+ professional pedalboard builds, cable quality is the single most impactful upgrade most players overlook. Here's what you need to know.</p>`,
      },
      {
        heading: 'What makes a cable "good"?',
        headingLevel: 2,
        content: `<p>Three things: conductor material, shielding, and connectors. Cheap cables cut corners on all three.</p>
<p><strong>Conductor:</strong> Oxygen-free copper (OFC) carries signal with less resistance and less high-frequency roll-off than standard copper. The difference is subtle on a single cable, but multiply it across 8-12 patch connections on a pedalboard and it adds up fast.</p>
<p><strong>Shielding:</strong> Good shielding rejects electromagnetic interference — the hum from power supplies, stage lighting, and other gear. Braided shield is better than spiral wrap. Double shielding is better than single. If hum is already a problem on your board, our <a href="/blog/pedalboard-hum-noise-fix">noise troubleshooting guide</a> covers all the common causes.</p>
<p><strong>Connectors:</strong> Soldered connections outlast crimped ones by years. Gold-plated contacts resist corrosion. Low-profile right-angle connectors save space on crowded boards.</p>`,
      },
      {
        heading: 'Why we use Mogami on every build',
        headingLevel: 2,
        content: `<p>We've tested cables from a dozen manufacturers across hundreds of builds. <a href="/shop">Mogami</a> consistently delivers the lowest noise floor, the flattest frequency response, and the best long-term reliability.</p>
<p>Specifically, we use <a href="/shop">Mogami 2314</a> for patch cables and <a href="/shop">Mogami 2524</a> for instrument cables. The 2314 has extremely low capacitance (12.2 pF/ft), which means your high end stays intact even across multiple pedal connections. The 2524 uses the same Neglex OFC conductor technology in a format designed for longer runs.</p>
<p>Are they more expensive than the bin cables? Yes. Do they cost more than a single mid-range pedal? No. And they'll make every pedal on your board sound better.</p>`,
      },
      {
        heading: 'Soldered vs. solderless: the real trade-off',
        headingLevel: 2,
        content: `<p>Solderless patch cable kits are popular because they're fast to assemble and you can cut custom lengths without a soldering iron. But there's a reliability trade-off.</p>
<p>Solderless connections rely on mechanical pressure — a small screw or clamp holding the wire against the connector. Over time, vibration, temperature changes, and normal wear can loosen that connection. We see it constantly on boards that come in for repair: a solderless cable that was fine for six months suddenly introduces crackling or cuts out.</p>
<p>Hand-soldered cables create a permanent molecular bond between wire and connector. They don't loosen. They don't crackle. They either work or they're visibly damaged — there's no mystery intermittent failure mode.</p>
<p>For a board that lives in your bedroom, solderless is fine. For a board that goes to gigs, gets loaded in and out of vehicles, and needs to be bulletproof — solder every time.</p>`,
      },
      {
        heading: 'How cable length affects your tone',
        headingLevel: 2,
        content: `<p>Every foot of cable adds capacitance to your signal path. Capacitance acts as a low-pass filter — it rolls off high frequencies. With passive pickups (no buffer or active electronics between your guitar and the first pedal), this effect is even more pronounced.</p>
<p>This is why custom-length cables matter. A patch cable cut to exactly the 4 inches you need between two pedals adds less capacitance than a 12-inch cable coiled up underneath. Multiply that across 10+ pedal connections on a pedalboard and you're looking at a significant difference in high-end clarity.</p>
<p>Every cable we build at The Rig Doctor is cut to the exact length needed — no excess, no coils, no wasted signal path. If you're building your own board, our <a href="/blog/how-to-build-a-pedalboard">complete pedalboard build guide</a> covers cable routing and management in detail.</p>`,
      },
      {
        heading: 'Frequently asked questions about patch cables',
        headingLevel: 2,
        content: `<h3>What are the best patch cables for a pedalboard?</h3>
<p>Mogami 2314 is the industry standard for professional pedalboard builds. It has extremely low capacitance (12.2 pF/ft) which preserves your high end across multiple pedal connections. The oxygen-free copper conductor and quality shielding reject noise better than generic cables. We use Mogami on every build at The Rig Doctor.</p>
<h3>Do patch cables really affect guitar tone?</h3>
<p>Yes. Every foot of cable adds capacitance, which rolls off high frequencies. With passive pickups this effect is more pronounced. A single cheap cable may not be noticeable, but multiply it across 8-12 patch connections on a pedalboard and the cumulative tone loss is significant. Lower capacitance cable preserves more high-end clarity.</p>
<h3>Are solderless patch cables reliable?</h3>
<p>Solderless cables work fine for bedroom boards that stay in one place. For gigging boards, soldered cables are significantly more reliable. Solderless connections rely on mechanical pressure that can loosen with vibration and temperature changes. Hand-soldered connections create a permanent molecular bond that does not degrade over time.</p>
<h3>How long should pedalboard patch cables be?</h3>
<p>As short as possible while still reaching comfortably. Every extra inch of cable adds capacitance and potential noise pickup. Custom-length cables cut to the exact distance between your pedals are ideal. A 4-inch connection does not need a 12-inch cable coiled underneath. Multiply the excess across 10+ connections and the difference in clarity is audible.</p>`,
      },
    ],
    cta: {
      text: 'Want cables that actually make a difference?',
      href: '/shop',
      label: 'Shop Mogami Cables',
    },
  },
  ...seoPosts.map((post) => ({
    ...post,
    publishedAt: seoPostDateOverrides[post.slug] || post.publishedAt,
  })),
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAllPosts(): BlogPost[] {
  return blogPosts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getRelatedPosts(
  currentSlug: string,
  limit = 2
): BlogPost[] {
  const current = getPostBySlug(currentSlug);
  if (!current) return [];
  return blogPosts
    .filter((p) => p.slug !== currentSlug)
    .filter(
      (p) =>
        p.category === current.category ||
        p.tags.some((t) => current.tags.includes(t))
    )
    .slice(0, limit);
}
