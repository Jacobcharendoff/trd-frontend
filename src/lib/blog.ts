export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: 'Gear Guide' | 'Signal Chain' | 'Behind the Bench' | 'Tone Tips';
  content: string;
  featured?: boolean;
}

const posts: BlogPost[] = [
  {
    slug: 'signal-chain-order-guide',
    title: 'Signal Chain Order: The Complete Guide for 2026',
    excerpt:
      'Where your pedals go in the chain matters more than which pedals you buy. Here\'s the definitive guide to getting your signal chain right.',
    date: '2026-03-25',
    readTime: '8 min read',
    category: 'Signal Chain',
    featured: true,
    content: `
      <h2>Why Signal Chain Order Actually Matters</h2>
      <p>Here's the truth: you can own the most expensive, boutique pedals on the planet, but if they're in the wrong order, your rig will sound like a wet cardboard box. I've seen it a thousand times. Guitarist walks in with a $3,000 pedalboard, and the first thing we do is rearrange it. Suddenly, they're like, "Wait, this is what my rig is supposed to sound like?"</p>
      <p>The reason is physics. Every pedal does something to your signal — it colors it, compresses it, modulates it, delays it — and the order you stack these operations completely changes the result. Think of it like mixing a drink. If you pour vodka first then cranberry juice, you get something different than cranberry juice then vodka. Same ingredients, entirely different outcome.</p>

      <h2>The Standard Signal Chain Framework</h2>
      <p>We use this order at the bench, and it works. It's not dogma — you'll see variations — but this is the golden path that covers 95% of use cases.</p>

      <h3>Guitar → Tuner (Always First)</h3>
      <p>Your tuner is a bouncer. It doesn't care about anything else happening downstream. Put it right after your guitar. It's monitoring your raw signal, uncolored by anything else. A tuned guitar is the foundation of everything.</p>

      <h3>Filters & Wah (Before Drive)</h3>
      <p>Wah pedals and filters work best hitting a clean signal. If you put them after your drive, they're trying to modulate an already-compressed, already-saturated signal. You lose articulation. Get them in front of your drive.</p>

      <h3>Compressor (Subtle, Early)</h3>
      <p>A light compressor before drive helps your drive pedal see a more consistent signal, which means tighter sustain and more controlled dynamics. Don't crank it — just a touch. Most guitarists use compression wrong (too much), so dial back whatever you think is right.</p>

      <h3>Drive & Distortion (The Core)</h3>
      <p>This is your tone shaper. Overdrive first, then heavier distortion if you need it. Or just one. Or three. The point is, drive pedals should come before modulation and time-based effects, not after.</p>

      <h3>Modulation (Chorus, Phaser, Flanger)</h3>
      <p>After your drive, before time-based effects. Modulation on a clean signal sounds thin. Modulation on a saturated signal sounds fat and spacey. This is where it lives.</p>

      <h3>Delay & Reverb (The Ambience)</h3>
      <p>Last in the chain. These are spatial effects — they're creating space and dimension around everything else. If you put them earlier, other effects process the trails and repeats, which gets messy fast.</p>

      <h2>Common Mistakes (And How We Fix Them)</h2>
      <p>We see a few patterns that wreck rigs. Reverb before delay creates weird, non-musical trails. Distortion after modulation sounds thin and digital. Wah after overdrive loses its sweep. And the biggest one: cranking every pedal to 11 instead of dialing things in subtly so they layer together.</p>
      <p>Start with this framework. Once you understand the rules, you can break them on purpose. But understand them first. Your tone depends on it.</p>
    `,
  },
  {
    slug: '5-pedals-every-guitarist-needs',
    title: '5 Pedals Every Guitarist Needs on Their Board',
    excerpt:
      'Whether you\'re building your first board or rebuilding from scratch, these five categories are non-negotiable.',
    date: '2026-03-20',
    readTime: '6 min read',
    category: 'Gear Guide',
    content: `
      <h2>You Don't Need 47 Pedals</h2>
      <p>The gear industry wants you to believe that more is better. More pedals, more features, more options. But the truth? The best rigs are usually the leanest ones. A few tools, really understood, beat a rack of buttons you don't know how to use.</p>
      <p>So here's what actually moves the needle: five categories of pedals that serve a purpose in basically every playing style. If you nail these, your rig will do 90% of what you need. The other 10% is just flavor.</p>

      <h3>1. Tuner — Non-Negotiable</h3>
      <p>A solid tuner pedal sits at the start of your chain and keeps you locked in. Forget tuning between songs — a good tuner gets you concert-accurate and you move on. We typically recommend pedal tuners over headstock tuners because they're in the signal path and they let you mute the output while you're dialing in. Boss TU-3 is the classic. Lekato makes solid budget options. Whatever you pick, it needs to work reliably in a noisy venue.</p>

      <h3>2. Overdrive — Your Tone Voice</h3>
      <p>This is the pedal that makes you sound like you. Overdrive is different from distortion — it's more responsive, more touch-sensitive. A good overdrive reacts to how hard you hit the strings. It's transparent enough to let your amp's character shine but punchy enough to push it into sustain and bloom. Blues players, classic rockers, indie players — everyone uses this. Tubescreamer derivatives are the standard, but tube-driven overdrives like the Klon or Boss BD-2 offer something special if your budget allows.</p>

      <h3>3. Delay — The Spatial Tool</h3>
      <p>Delay is the effect that makes a rig feel three-dimensional. Even a tiny bit of slapback delay behind a dry signal creates depth and ambience. You don't need a fancy digital delay with 47 algorithms — a simple analog delay or a digital delay with a single, natural tone is enough. Boss DD-8, Earthquaker Devices Afterneath, or a classic MXR Carbon Copy. The key is finding one where the repeats stay musical at your volumes.</p>

      <h3>4. Reverb — The Room</h3>
      <p>Reverb is invisible when it's right and obvious when it's wrong. You need just enough to give your tone space without sounding like you're playing in a cathedral. Digital reverbs are fine — your amp probably has one anyway. But if you're running through a pedalboard, a dedicated reverb pedal gives you control. Spring reverbs are warm. Hall reverbs are lush. Room reverbs are subtle. Pick the character that fits your playing.</p>

      <h3>5. The Wildcard — Your Flavor</h3>
      <p>Compression, modulation (chorus/phaser), fuzz, octaver — whatever is missing that makes you sound like you. This is where personality lives. Some players need compression to lock in their playing. Others need chorus to add dimension. Others need fuzz to destroy a single-note solo. This is the one pedal that changes from player to player, and that's exactly right. You're not trying to copy someone else's board — you're building yours.</p>

      <h2>That's It</h2>
      <p>Five categories. Everything else is negotiable. You can build a pro rig with tuner, overdrive, delay, reverb, and one special thing. And that's exactly what most of the players we work with are running. Simple. Reliable. Inspiring.</p>
    `,
  },
  {
    slug: 'custom-vs-diy-pedalboard',
    title: 'Custom Build vs DIY: Which Is Right for You?',
    excerpt:
      'The honest answer isn\'t always "hire us." Here\'s how to decide if a custom build makes sense for your situation.',
    date: '2026-03-15',
    readTime: '5 min read',
    category: 'Behind the Bench',
    content: `
      <h2>Let's Be Honest: You Don't Always Need Us</h2>
      <p>We build boards. It's what we do. But I'm not going to tell you that every guitarist needs a custom pedalboard. That's not true. Some of you should absolutely DIY. And some of you should hand it to us and move on. Here's how to know which bucket you're in.</p>

      <h2>DIY Makes Sense If:</h2>
      <p><strong>You have 3-4 pedals and want to bolt them together.</strong> Seriously. If you've got a tuner, an overdrive, a delay, and reverb, all standalone units, and you just want them powered and neat — grab a pedalboard blank, some velcro, and a decent power supply. You'll spend $150-300 and be done in an afternoon. There's no mystery here. Velcro those pedals down, run the cables, plug in the power.</p>
      <p><strong>You like tinkering and have time to learn.</strong> Soldering, signal flow, impedance matching — it's learnable stuff. If you're the type who enjoys breaking things and putting them back together, a DIY build is a journey you'll enjoy. YouTube has everything you need.</p>
      <p><strong>Your setup is simple and stable.</strong> You've been playing the same four pedals for three years and you know they work. You're not constantly adding, removing, or rearranging. You just need them organized. DIY is perfect for this.</p>

      <h2>Custom Build Makes Sense If:</h2>
      <p><strong>You're constantly changing your setup and want it to evolve without rebuilding.</strong> This is the biggest one. If you're the type who adds a new pedal every few months, or you play in three different bands with different needs, or you're still figuring out your tone — a custom build gives you expansion room built in. Extra loops, extra power, extra space. You plug something new in and you're done.</p>
      <p><strong>You want it soldered, not velcroed, with no noise floor.</strong> Velcro is convenient but it's temporary. Soldered connections are permanent, bulletproof, and they don't introduce capacitance or noise. If you're gigging consistently and you need zero troubleshooting, soldering matters. A true hardwired, soldered board is also lighter and more compact than a velcro setup with the same functionality.</p>
      <p><strong>You want someone to design the signal flow with your specific needs in mind.</strong> This is the magic of a custom build. We don't just arrange your pedals — we design the whole thing around how you play, what you're chasing, your amp, your venue size, everything. We catch things you wouldn't catch. We suggest pedal swaps if something's not serving you. We think about future growth.</p>
      <p><strong>You play gigs and can't afford downtime.</strong> When you're on the road, you need reliability. Velcro can slip. Cables can fail in weird ways. A properly built, soldered, tested rig gets you through the tour without surprises. That's peace of mind.</p>

      <h2>The Real Cost</h2>
      <p>DIY costs less upfront — maybe $300-500 for a blank board, power, cables, and velcro. Custom builds run $500-2000+ depending on complexity. But if a DIY board fails during a gig, you've lost a set and you've lost the mental space to play. That cost adds up fast.</p>
      <p>Think of it this way: DIY is for people experimenting. Custom is for people committing. Neither is wrong. Know which camp you're in.</p>
    `,
  },
];

export function getAllPosts(): BlogPost[] {
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getFeaturedPost(): BlogPost | undefined {
  return posts.find((post) => post.featured);
}
