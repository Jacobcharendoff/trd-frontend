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
  {
    slug: 'pedalboard-noise-hum-fix',
    title: 'Your Pedalboard Has a Noise Problem. Here\'s How to Fix It.',
    excerpt:
      'That hum, that buzz, that hiss between songs. It\'s not your amp. It\'s not your pickups. It\'s your board. Let\'s track it down.',
    date: '2026-03-30',
    readTime: '7 min read',
    category: 'Tone Tips',
    content: `
      <h2>The Three Types of Noise (and Where They Come From)</h2>
      <p>Not all noise is the same. Before you start ripping cables out, you need to know what you're dealing with. There's hum, there's buzz, and there's hiss. They sound different, they come from different places, and they have different fixes.</p>
      <p><strong>60-cycle hum</strong> is that low, constant drone. It's almost always a grounding issue or a power supply problem. If it gets louder when you touch your strings and quieter when you let go, your guitar's shielding might be part of it. But on a pedalboard, it's usually power-related.</p>
      <p><strong>Buzz</strong> is sharper and more aggressive. Think of it like a mosquito near your ear. This is typically caused by a ground loop, where two devices in your chain are grounded through different paths and the difference creates an audible loop. Common culprits: daisy-chained power supplies, pedals with different ground references, or cables running too close to power transformers.</p>
      <p><strong>Hiss</strong> is that white noise, like static on a TV. This is gain-related. Every gain stage in your chain adds a little noise floor. Stack three drive pedals and a boost, and suddenly you've got a noise floor you can hear from across the room. This one's about gain staging, not wiring.</p>

      <h2>Start With Power</h2>
      <p>If we had to point at one thing that causes the most noise on pedalboards, it's power. Specifically, daisy chains. Those little cables that run one power supply output to five or six pedals? They work. Until they don't. And when they don't, the noise is brutal.</p>
      <p>The issue is that daisy chains share a ground path between all the pedals they power. If one pedal has a slightly different ground reference, or if one pedal draws more current than expected, you get a ground loop. And ground loops hum.</p>
      <p>The fix is isolated power. A power supply where each output has its own transformer and its own ground. The Strymon Zuma, Cioks DC7, or Voodoo Lab Pedal Power series all do this. It's not cheap, but it's the single biggest noise reduction upgrade you can make. We put isolated power in every build we do. It's not optional for us.</p>

      <h2>Then Check Your Cables</h2>
      <p>Cheap patch cables are the second biggest noise source. And by cheap, I don't necessarily mean inexpensive. I mean poorly shielded. A patch cable with bad shielding acts like an antenna, picking up electromagnetic interference from your power supply, your amp transformer, the venue lighting, whatever's nearby.</p>
      <p>Good cables have braided or foil shielding that blocks interference. They cost a bit more. They're worth it. On a board with 8 pedals and 7 patch cables, even a small improvement per cable adds up across the whole chain.</p>
      <p>Also: cable length matters. Longer cables pick up more noise. Keep your patch cables as short as possible. Custom-cut cables that are exactly the length you need beat pre-made cables that leave 6 inches of slack every time.</p>

      <h2>Gain Staging Is the Part Most Players Skip</h2>
      <p>Here's where it gets less obvious. You've got clean power and good cables but the hiss is still there. That's your gain staging.</p>
      <p>Every pedal that adds gain also adds noise. An overdrive adds a little. A distortion adds more. A fuzz adds a lot. Stack them and the noise compounds. The fix isn't to stop using gain. It's to be intentional about how much gain each stage is adding and where that gain sits in the chain.</p>
      <p>A compressor before your drive can even out your signal so the drive doesn't have to work as hard. A noise gate after your drive section can clamp down on the hiss between notes. And turning your drive pedal's gain down from 7 to 5 while pushing the volume up often gives you the same perceived distortion with way less noise. Try it.</p>

      <h2>The Cable Routing Nobody Thinks About</h2>
      <p>This is the one that surprises people. How your cables are physically routed on the board matters. If your audio cables run parallel to your power cables, the power cables induce noise into the audio signal. Especially near transformers and wall-wart adapters.</p>
      <p>The fix: cross power and audio cables at 90-degree angles. Never run them parallel. Keep audio cables away from power supplies. Route power underneath the board and audio on top, or vice versa, with physical separation between them.</p>
      <p>This is one of the things we obsess over in custom builds. Cable routing isn't just about looking clean. It's about sounding clean.</p>

      <h2>When to Call a Professional</h2>
      <p>If you've tried isolated power, good cables, proper gain staging, and smart routing, and you still have noise, there might be something deeper going on. A bad solder joint somewhere, a pedal with an internal grounding issue, or a power supply that's failing. That's when it makes sense to talk to someone who does this every day.</p>
      <p>We run noise audits as part of every Tone Tutoring session. You get on a video call, show us your board, and we figure out where the noise is coming from. Usually takes about 15 minutes of the session to nail it. The rest of the hour we spend making your rig sound better.</p>
    `,
  },
  {
    slug: 'pedalboard-power-supply-guide',
    title: 'Pedalboard Power Supplies: Isolated vs Daisy Chain (And Why It Matters)',
    excerpt:
      'The power supply is the most boring part of your board. It\'s also the part that makes or breaks everything else.',
    date: '2026-03-28',
    readTime: '6 min read',
    category: 'Gear Guide',
    content: `
      <h2>Nobody Wants to Talk About Power</h2>
      <p>Power supplies aren't exciting. Nobody posts their Cioks on Instagram. Nobody demos a Voodoo Lab on YouTube and gets a million views. But I'll tell you what: the power supply is the foundation your entire rig sits on. Get it wrong and nothing else matters. Get it right and everything else works better than you expected.</p>
      <p>We've rebuilt boards where the only change was the power supply. Same pedals, same cables, same signal chain. Just clean, isolated power. The player's reaction is always the same: "Why does everything sound better?"</p>

      <h2>What "Isolated" Actually Means</h2>
      <p>An isolated power supply gives each output its own independent power path. Electrically, each pedal is on its own island. They share nothing. No common ground, no common transformer. If one pedal does something weird electrically, the others don't care.</p>
      <p>A non-isolated supply (daisy chain, or a multi-output supply that shares a transformer internally) connects all the pedals to the same ground path. This is fine if all your pedals play nice together. But the moment you add a digital pedal next to analog pedals, or a pedal that draws heavy current, or a pedal with a different voltage requirement, you introduce ground loops and noise.</p>
      <p>The difference isn't subtle. On a board with 6+ pedals mixing analog and digital, switching to isolated power drops the noise floor dramatically. We're talking "is my rig even on?" quiet.</p>

      <h2>How to Pick the Right Supply</h2>
      <p>First, count your pedals and check their current draw. Every pedal has a milliamp (mA) rating, usually printed on the bottom or in the manual. Add them up. That's your minimum total draw. You want a power supply that can handle at least 20% more than that total, so you have headroom.</p>
      <p>Second, check voltages. Most pedals run on 9V, but some run on 12V or 18V. Some power supplies have variable voltage outputs. If you've got a mix, you need a supply that accommodates all of them.</p>
      <p>Third, think about the future. If you're running 6 pedals now but you know you'll add two more this year, get a supply with 8 outputs today. It's cheaper than buying a new supply later.</p>

      <h3>Our Go-To Recommendations</h3>
      <p><strong>Budget (under $100):</strong> Truetone 1 Spot Pro CS6. Decent isolation, compact footprint, and enough outputs for a smaller board. It's not perfect but it's a massive step up from a daisy chain.</p>
      <p><strong>Mid-range ($150-250):</strong> Cioks DC7 or Strymon Ojai. Fully isolated, very low noise, and expandable. The Cioks is the one we use most in our builds. It's compact, reliable, and the outputs are properly isolated.</p>
      <p><strong>High-end ($300+):</strong> Strymon Zuma or Cioks DC10. If you're running 10+ pedals and you need serious headroom, these are what the pros use. Multiple voltage options, massive current capacity, dead silent.</p>

      <h2>The Daisy Chain Myth</h2>
      <p>People say daisy chains are fine if you're only running a few pedals. And honestly, sometimes that's true. Three analog pedals on a daisy chain might be perfectly quiet. But the problem is that it stops being true the moment you add a fourth pedal, or swap one for a digital unit, or play at a venue with dirty power. And then you're troubleshooting noise at soundcheck instead of warming up.</p>
      <p>Isolated power removes the variable. You stop thinking about power. It just works. And that's what you want from the boring part of your rig. You want it to be so boring that you never think about it.</p>

      <h2>Installation Matters Too</h2>
      <p>Even the best power supply can introduce noise if it's installed wrong. Mount it under the board with the cables running separately from your audio patch cables. Don't bundle power and audio cables together. Use the shortest power cables that reach. And make sure the supply itself is physically separated from any pedals with sensitive analog circuitry.</p>
      <p>This is the kind of detail that separates a quiet board from a noisy one. It's not hard, but it requires thinking about it during the build, not after.</p>
    `,
  },
  {
    slug: 'pedalboard-cable-management',
    title: 'Cable Management: The Difference Between a Rig and a Rat\'s Nest',
    excerpt:
      'Your cables are the circulatory system of your board. When they\'re a mess, everything suffers. When they\'re right, you forget they exist.',
    date: '2026-04-01',
    readTime: '5 min read',
    category: 'Behind the Bench',
    content: `
      <h2>Why Cables Get Ignored</h2>
      <p>Guitarists love pedals. Guitarists love amps. Guitarists love pickups. Nobody loves cables. Cables are the thing you grab at the guitar shop because you need one right now, and you pick the cheapest option that looks like it won't break immediately. Then you jam it onto your board and forget about it.</p>
      <p>Here's the problem with that approach: cables are carrying your signal. Everything you play passes through them. Every note, every dynamic, every harmonic. If those cables are cheap, poorly shielded, too long, or running through interference, your tone suffers. And you'll never know it because you've never heard your rig without that problem.</p>

      <h2>Patch Cables: Quality Over Quantity</h2>
      <p>On a board with 8 pedals, you've got 7 patch cables plus your input and output cables. That's 9 cables minimum. If each cable degrades your signal by even a tiny amount, across 9 cables, it adds up. High-frequency loss, added noise floor, intermittent connections. All from cables.</p>
      <p>Good patch cables have a few things in common: solid shielding (braided copper is best), low capacitance (so they don't roll off your highs), and reliable connectors (pancake jacks for tight spaces, standard jacks for everything else). The brand matters less than these specs.</p>
      <p>And length matters. A lot. Every extra inch of cable adds capacitance and potential noise pickup. A 6-inch patch cable where you only need 3 inches is doubling your exposure. This is why we cut custom-length cables for every build. Each cable is exactly as long as it needs to be. No more.</p>

      <h2>Routing: The Invisible Upgrade</h2>
      <p>How you run your cables through the board changes how the board sounds. This is the part most DIY builders miss because it's not intuitive. You can't see noise. You can't see interference. But it's there.</p>
      <p>The rules are simple but easy to break. Keep audio cables and power cables separated. If they have to cross, cross them at right angles. Run power underneath the board and audio on top, or run them on opposite sides. Never bundle them together with zip ties. Never run them parallel for more than a few inches.</p>
      <p>On a finished build from our bench, you can flip the board over and see exactly what's happening. Every cable is labeled. Every run makes sense. There's no guessing about what connects to what. That's not just for aesthetics. It's for the day you need to troubleshoot something. If your cables are a mess, troubleshooting takes hours. If they're organized, it takes minutes.</p>

      <h2>Soldered vs Solderless</h2>
      <p>Solderless patch cable kits are popular. You cut a cable to length, push the connector on, and you're done. No soldering iron needed. They work fine until they don't. The connection inside a solderless plug relies on pressure, not a permanent bond. Over time, with vibration from being in a gig bag, being thrown in a van, or just temperature changes, those connections can loosen. And a loose connection is intermittent noise, signal drops, and the kind of problem that's impossible to diagnose in a dark venue.</p>
      <p>Soldered connections are permanent. The wire is physically bonded to the connector. They don't loosen. They don't intermittently fail. They work until the cable itself physically breaks, which is rare with good cable.</p>
      <p>We solder every connection in every build. It takes longer. But we've never had a cable fail on a board we've built. That's not luck.</p>

      <h2>The Payoff</h2>
      <p>A well-cabled board is quieter, more reliable, and easier to maintain. You stop worrying about noise. You stop wondering if a cable is bad. You just plug in and play. That's the whole point. The gear should disappear so the music can show up.</p>
      <p>If you're looking at your board right now and it looks like a bowl of spaghetti, that's okay. Most boards do. The question is whether you want to keep working around it or fix it once and forget about it.</p>
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
