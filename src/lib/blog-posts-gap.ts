import type { BlogPost } from './blog';

const CDN = 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files';

export const gapPosts: BlogPost[] = [
  // ─────────────────────────────────────────────
  // 1. Guitar Signal Chain Order
  // ─────────────────────────────────────────────
  {
    slug: 'guitar-signal-chain-order',
    title: 'Guitar Signal Chain Order: The Complete Guide',
    description:
      'The standard pedal order every guitarist should know, plus the spots where the rules bend: fuzz and buffers, where a boost goes, EQ before or after drive, and when to use your effects loop.',
    publishedAt: '2026-09-28',
    updatedAt: '2026-09-28',
    author: 'Jacob Charendoff, Founder of The Rig Doctor',
    readTime: '10 min read',
    category: 'Guides',
    tags: ['signal chain', 'pedal order', 'pedalboard', 'effects loop', 'buffers'],
    heroImage: `${CDN}/Signal_Routing.png`,
    heroAlt:
      'Signal routing on a Rig Doctor custom pedalboard, with hand-soldered patch cables linking each pedal in chain order',
    sections: [
      {
        heading: 'The short answer',
        headingLevel: 2,
        content: `<p>The standard guitar signal chain order is tuner, wah and filters, compressor, overdrive and distortion, modulation, delay, reverb, then volume pedal. Pedals that shape your raw note go first. Pedals that shape the finished sound go last. With a high-gain amp, move modulation, delay and reverb into the effects loop.</p>`,
      },
      {
        heading: 'Why pedal order changes your sound',
        headingLevel: 2,
        content: `<p>Every pedal processes whatever the pedal before it hands over. That is the whole idea. A wah sweeping your clean guitar sounds vocal and expressive. A wah sweeping a signal that is already squashed by a compressor and clipped by a Big Muff sounds like someone turning a tone knob. Same pedal. Different input.</p>
<p>So when people argue about pedal order, they are arguing about one question: what do you want each pedal to hear? Once you think about it that way, most of the "rules" stop being rules and start making sense.</p>
<p>We plan the signal chain on every build we do, and it is the first thing we look at in a <a href="/tone-tutoring">Tone Tutoring session</a>. After 17 years and 300+ rigs, the pattern is clear. Most tone problems players blame on a pedal are order problems.</p>`,
      },
      {
        heading: 'The standard pedal order, step by step',
        headingLevel: 2,
        content: `<p>Here is the starting template. It works for most players with most amps. Learn it first, then break it on purpose.</p>
<table>
<thead>
<tr><th>Slot</th><th>Pedal type</th><th>Examples</th><th>Why it sits here</th></tr>
</thead>
<tbody>
<tr><td>1</td><td>Tuner</td><td>Boss TU-3, TC Electronic PolyTune, Peterson StroboStomp</td><td>Needs the cleanest signal to track accurately. Mutes silently.</td></tr>
<tr><td>2</td><td>Wah and filters</td><td>Dunlop Cry Baby, Vox V847, EHX Q-Tron</td><td>Reacts to your pick attack. Needs dynamics that have not been squashed yet.</td></tr>
<tr><td>3</td><td>Compressor</td><td>Keeley Compressor Plus, Wampler Ego, Origin Cali76</td><td>Evens out dynamics before gain. Adds sustain without amplifying drive noise.</td></tr>
<tr><td>4</td><td>Overdrive, distortion, fuzz</td><td>Ibanez Tube Screamer, Boss BD-2, ProCo RAT, Big Muff</td><td>Builds your core tone. Lower gain pedals usually go before higher gain ones.</td></tr>
<tr><td>5</td><td>Modulation</td><td>Boss CE-2, MXR Phase 90, Strymon Mobius</td><td>Colors the finished dirty or clean tone.</td></tr>
<tr><td>6</td><td>Delay</td><td>MXR Carbon Copy, Boss DD-8, Strymon TimeLine</td><td>Repeats the finished tone so every echo sounds like the note you played.</td></tr>
<tr><td>7</td><td>Reverb</td><td>Strymon BigSky, EHX Holy Grail, Walrus Slo</td><td>Puts the whole sound in a room. Last in line is the natural spot.</td></tr>
<tr><td>8</td><td>Volume pedal</td><td>Ernie Ball VP Jr, Dunlop DVP</td><td>At the end it acts as a master volume that does not change your gain.</td></tr>
</tbody>
</table>
<h3>Tuner first</h3>
<p>Your tuner wants a clean, strong signal with nothing coloring it. Put it first. One exception is covered below: if you run a vintage-style fuzz, the fuzz may need to go before a buffered tuner.</p>
<p>Many players run the tuner off the tuner output of a volume pedal instead. That way you can roll the volume pedal down and tune silently between songs. Both setups work.</p>
<h3>Wah and filters next</h3>
<p>A wah is a sweeping band-pass filter. An envelope filter like a Mu-Tron or Q-Tron opens up based on how hard you pick. Both need your natural dynamics to sound alive. Put them before compression and gain.</p>
<h3>Compressor before drive</h3>
<p>A compressor before your drives gives you smooth, even sustain and a clean attack. A compressor after your drives squeezes the whole distorted signal, including the hiss, so the noise floor jumps every time you stop playing. Some players do run a light compressor at the end of the chain as a leveler. That is a valid choice. Just know the tradeoff.</p>
<h3>Drives from low gain to high gain</h3>
<p>The usual rule is to stack from least gain to most gain. A low gain overdrive into a higher gain distortion acts like a boost, tightening the low end and adding push. Flip it and the high gain pedal flattens everything after it, so the second pedal adds volume and not much else.</p>
<p>That said, stacking order is one of the most personal choices on the board. Plenty of players prefer a Tube Screamer after a RAT for a mid push on solos. Try both.</p>
<h3>Modulation after drive</h3>
<p>Chorus, flanger, phaser, vibrato and tremolo usually go after gain. They sound clearer when they are coloring a finished tone instead of getting chewed up by distortion. The classic exception is a phaser before drive, which gives you that swirling, vowel-like crunch heard on a lot of late 70s rock records.</p>
<p>Tremolo is worth a note. Put it after your drives so it chops the full sound. Put it before delay if you want the repeats to stay smooth, or after delay if you want the repeats to pulse too.</p>
<h3>Delay, then reverb</h3>
<p>Delay before reverb sounds like a player in a room. Reverb before delay sounds like repeats of a washy cloud, which can be cool in ambient music but gets muddy fast. For most players, delay then reverb.</p>
<h3>Volume pedal at the end</h3>
<p>Where your volume pedal sits changes what it does. At the start of the chain it works like your guitar's volume knob. Rolling it back cleans up your drives. At the end it works like a master volume. Your gain stays the same and only the level changes, which is what you want for swells and for fading delay trails naturally.</p>`,
      },
      {
        heading: 'Going deeper: where the rules bend',
        headingLevel: 2,
        content: `<p>The template gets you 80 percent of the way there. The last 20 percent is knowing the handful of situations where the template is wrong for your rig.</p>
<h3>Fuzz before buffers</h3>
<p>Vintage-style fuzz circuits like the Fuzz Face and Tone Bender have a very low input impedance. They were designed to plug straight into a guitar pickup, and they interact with it. That interaction is why rolling your guitar volume back on a germanium Fuzz Face cleans it up so nicely.</p>
<p>Put a buffer in front of that fuzz and the interaction is gone. The fuzz can turn thin, harsh or fizzy, and the volume knob cleanup stops working. Buffers hide in more places than people think. Most Boss pedals are buffered bypass, including the TU-3 tuner. Many wahs are too.</p>
<p>The fix is to put vintage-style fuzz first, before the tuner and before any buffer. If you must run a wah before it, look for a wah designed or modded to play nicely with fuzz. Big Muffs, RATs and most modern fuzzes do not care much about this, so they can live anywhere in the drive section.</p>
<h3>Where a boost goes</h3>
<p>A clean boost does different jobs depending on where it sits.</p>
<ul>
<li><strong>Before your drives:</strong> it hits the drive pedal harder, so you get more gain and saturation. Great for thickening a lead tone.</li>
<li><strong>After your drives:</strong> it raises the volume of your dirty tone without adding more gain. This is the classic solo boost.</li>
<li><strong>At the end of the front-of-amp chain:</strong> it pushes the amp's preamp harder, so a tube amp breaks up more on its own.</li>
</ul>
<p>Some players run two boosts to get both jobs. That is fine. Decide which job you need first.</p>
<h3>EQ before or after drive</h3>
<p>This is one of the most useful and least understood placements on a board.</p>
<p><strong>EQ before drive</strong> changes what gets distorted. Cut some low end before a high gain pedal and the palm mutes tighten up. Add a mid bump and the drive sounds thicker and cuts through a mix. This is basically what a Tube Screamer does to a high gain amp.</p>
<p><strong>EQ after drive</strong> shapes the finished tone, the same way your amp's tone stack does. Use it to tame fizz, fix a pedal that is too bright for your amp, or set a solo tone with a mid boost and a volume bump.</p>
<p>Not sure where yours goes? Ask what you are trying to fix. If the problem is how the pedal distorts, put the EQ before it. If the problem is how the result sounds, put the EQ after it. An EQ in the effects loop acts as a post-preamp tone shaper for the whole amp.</p>
<h3>Time-based effects and the effects loop</h3>
<p>If your amp's preamp is doing the distortion, any delay or reverb in front of the amp gets distorted too. Every repeat gets clipped again. With light crunch that can sound fine. With real gain the repeats smear together into mush.</p>
<p>The fix is the effects loop. Your amp's send and return sits between the preamp and the power amp. Put modulation, delay and reverb there and they process the already-distorted signal cleanly, the same way a studio engineer adds effects after the amp. We break down every pedal type in our guide to <a href="/blog/effects-loop-vs-front-of-amp">effects loop vs front of amp</a>.</p>
<p>If you get all your gain from pedals into a clean amp, you do not need the loop. Everything can go in front, in the template order.</p>
<h3>Buffers: where they go and why most boards need one</h3>
<p>Every foot of cable adds capacitance, which rolls off treble. With an all true-bypass board, your pickups are driving the cable from your guitar, every patch cable, every switch and the cable to the amp. Add it up on a big board with a long run to the amp and you can easily be past 20 feet. That is where the high end starts to dull.</p>
<p>A buffer has a low output impedance, so it can drive long cable runs without that treble loss. The usual placements:</p>
<ul>
<li><strong>Near the start</strong>, after any vintage fuzz, to drive the rest of the board.</li>
<li><strong>Near the end</strong>, to drive the long cable to the amp.</li>
</ul>
<p>One good buffer is usually enough. Many boards already have one hiding in a tuner or delay. Stacking lots of cheap buffers can start to color your tone, so count what you have before you add more.</p>
<h3>Pitch, noise gates and loopers</h3>
<ul>
<li><strong>Pitch shifters and octave pedals</strong> like a DigiTech Whammy or EHX POG track best on a clean signal. Put them early, before drive.</li>
<li><strong>Noise gates</strong> go after your drives. A gate with a four-cable setup, like the ISP Decimator G-String, can sit before the amp and in the loop at the same time.</li>
<li><strong>Loopers</strong> go at the very end so they record your full sound, including delay and reverb.</li>
</ul>`,
      },
      {
        heading: 'Quick reference: the full chain with an effects loop',
        headingLevel: 2,
        content: `<p>Here is the order we use as a starting point on most <a href="/custom-builds">custom builds</a> for players with a gain-heavy amp:</p>
<ol>
<li>Vintage fuzz (if you have one)</li>
<li>Tuner</li>
<li>Wah or envelope filter</li>
<li>Pitch or octave</li>
<li>Compressor</li>
<li>EQ (if shaping what gets distorted)</li>
<li>Overdrive and distortion, low gain to high gain</li>
<li>Boost</li>
<li>Noise gate</li>
<li>Amp input</li>
<li>Effects loop send: modulation, delay, reverb, volume pedal</li>
<li>Effects loop return</li>
</ol>
<p>No loop? Take the loop section and put it after the boost and gate, in the same order, straight into the amp.</p>`,
      },
      {
        heading: 'How to test your own chain order',
        headingLevel: 2,
        content: `<p>You do not need to guess. A quick test tells you more than any forum thread.</p>
<ol>
<li><strong>Start with the template.</strong> Get everything in the standard order first so you have a baseline.</li>
<li><strong>Change one thing at a time.</strong> Swap two pedals, play the same riff, swap them back. If you move three pedals at once you will not know what changed.</li>
<li><strong>Test at gig volume.</strong> Things that sound fine at bedroom level can fall apart when the amp is working.</li>
<li><strong>Listen for the problem, not the pedal.</strong> Mushy repeats point to delay in front of a dirty amp. A thin fuzz points to a buffer before it. Dull highs point to too much cable and no buffer.</li>
<li><strong>Write down what you land on.</strong> Take a photo of the board. You will thank yourself when something breaks.</li>
</ol>
<p>If you are building a board from scratch, our <a href="/blog/how-to-build-a-pedalboard">pedalboard build guide</a> covers layout and cable routing once the order is set.</p>`,
      },
      {
        heading: 'Still stuck? Get a second set of ears',
        headingLevel: 2,
        content: `<p>Every rig is different. The same Strymon can sound great in one player's loop and strange in another's because the amps respond differently. If you have tried the template and something still sounds off, that is normal.</p>
<p>That is exactly what <a href="/tone-tutoring">Tone Tutoring</a> is for. It is a $99, 60-minute video session with The Rig Doctor team. You show us your board and amp, we listen, and we work through your chain order live. No purchase needed and no pressure to build anything. If you do decide you want the whole board done, every <a href="/custom-builds">custom build</a> starts with a <a href="/book">free 30-minute consultation</a> where we design the signal chain before anything gets soldered.</p>`,
      },
      {
        heading: 'Frequently asked questions about signal chain order',
        headingLevel: 2,
        content: `<h3>What is the correct order for guitar pedals?</h3>
<p>The standard order is tuner, wah and filters, compressor, overdrive and distortion, modulation, delay, reverb, then volume pedal. It is a starting point, not a law. Vintage fuzz often goes first, and time-based effects often move into the amp's effects loop with high-gain amps.</p>
<h3>Should delay go before or after reverb?</h3>
<p>For most players, delay goes before reverb. That way the repeats sit inside the reverb space, which sounds like a player in a room. Reverb before delay repeats a washy cloud, which can work for ambient music but tends to get muddy.</p>
<h3>Where should a fuzz pedal go in the signal chain?</h3>
<p>Vintage-style fuzz like a Fuzz Face or Tone Bender should go first, before the tuner and any buffered pedal, because it needs to see your guitar pickups directly. Modern fuzzes and Big Muff types are less picky and can sit anywhere in the drive section.</p>
<h3>Does a compressor go before or after overdrive?</h3>
<p>Usually before. A compressor before overdrive evens out your picking and adds sustain without raising the noise floor. After overdrive it squeezes the distorted signal and brings up hiss. Some players use a light compressor at the end of the chain as a leveler.</p>
<h3>Do I need a buffer on my pedalboard?</h3>
<p>If your board is mostly true-bypass and your total cable run is more than roughly 20 feet, a buffer helps keep your high end. Check first, though. Many boards already have one inside a tuner or delay pedal.</p>`,
      },
    ],
    cta: {
      text: 'Want us to look at your chain order with you?',
      href: '/tone-tutoring',
      label: 'Book Tone Tutoring for $99',
    },
    faqs: [
      {
        question: 'What is the correct order for guitar pedals?',
        answer:
          'The standard order is tuner, wah and filters, compressor, overdrive and distortion, modulation, delay, reverb, then volume pedal. It is a starting point, not a law. Vintage fuzz often goes first, and time-based effects often move into the amp\'s effects loop with high-gain amps.',
      },
      {
        question: 'Should delay go before or after reverb?',
        answer:
          'For most players, delay goes before reverb. That way the repeats sit inside the reverb space, which sounds like a player in a room. Reverb before delay repeats a washy cloud, which can work for ambient music but tends to get muddy.',
      },
      {
        question: 'Where should a fuzz pedal go in the signal chain?',
        answer:
          'Vintage-style fuzz like a Fuzz Face or Tone Bender should go first, before the tuner and any buffered pedal, because it needs to see your guitar pickups directly. Modern fuzzes and Big Muff types are less picky and can sit anywhere in the drive section.',
      },
      {
        question: 'Does a compressor go before or after overdrive?',
        answer:
          'Usually before. A compressor before overdrive evens out your picking and adds sustain without raising the noise floor. After overdrive it squeezes the distorted signal and brings up hiss. Some players use a light compressor at the end of the chain as a leveler.',
      },
      {
        question: 'Do I need a buffer on my pedalboard?',
        answer:
          'If your board is mostly true-bypass and your total cable run is more than roughly 20 feet, a buffer helps keep your high end. Check first, though. Many boards already have one inside a tuner or delay pedal.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 2. Pedalboard Mistakes
  // ─────────────────────────────────────────────
  {
    slug: 'pedalboard-mistakes',
    title: '7 Pedalboard Mistakes That Kill Your Tone (And How to Fix Them)',
    description:
      'The seven pedalboard mistakes we see most often, from wrong chain order and daisy-chained power to cheap solderless cables, and exactly how to fix each one.',
    publishedAt: '2026-09-28',
    updatedAt: '2026-09-28',
    author: 'Jacob Charendoff, Founder of The Rig Doctor',
    readTime: '8 min read',
    category: 'Guides',
    tags: ['pedalboard', 'pedalboard mistakes', 'power supply', 'hum', 'patch cables', 'signal chain'],
    heroImage: `${CDN}/Ben_Before.jpg`,
    heroAlt:
      'A customer pedalboard photographed before its Rig Doctor rebuild, showing the kind of wiring and power setup this guide fixes',
    sections: [
      {
        heading: 'The short answer',
        headingLevel: 2,
        content: `<p>The seven pedalboard mistakes that hurt tone most are wrong chain order, daisy-chained or underpowered power, no buffer on a long true-bypass chain, digital and analog pedals sharing dirty power, cheap solderless cables, cable spaghetti with no strain relief, and building only for today. Each one has a simple, inexpensive fix.</p>`,
      },
      {
        heading: 'Why good pedals end up sounding bad',
        headingLevel: 2,
        content: `<p>Most players who come to us with a tone problem do not have a pedal problem. They have a board problem. The pedals are great. The stuff connecting them is not.</p>
<p>After 300+ builds and a lot of rescued boards, the same seven mistakes show up again and again. None of them are exotic. All of them are fixable, and most fixes cost less than your next pedal. Here they are, roughly in the order we see them.</p>`,
      },
      {
        heading: '1. The pedals are in the wrong order',
        headingLevel: 2,
        content: `<p><strong>What it sounds like:</strong> delay repeats that turn to mush, a wah that sounds like a tone knob, a fuzz that went thin and fizzy the day you added a new tuner.</p>
<p><strong>Why it happens:</strong> each pedal processes whatever the last pedal handed it. Put a delay in front of a high-gain amp and every repeat gets distorted again. Put a compressor after your drives and it pumps up the hiss. Put a buffered tuner in front of a vintage Fuzz Face and the fuzz loses the pickup interaction it was designed around.</p>
<p><strong>The fix:</strong> start from the standard order. Tuner, wah and filters, compressor, drives, modulation, delay, reverb, volume. Move vintage fuzz to the very front. If your amp is doing the heavy lifting on gain, put modulation, delay and reverb in the effects loop. Our <a href="/blog/guitar-signal-chain-order">complete signal chain order guide</a> walks through every slot and the exceptions.</p>`,
      },
      {
        heading: '2. Daisy-chained or underpowered power',
        headingLevel: 2,
        content: `<p><strong>What it sounds like:</strong> a steady hum that gets louder as you add pedals, digital pedals that reboot or glitch when you stomp on a drive, drives that sound squashed or sputtery.</p>
<p><strong>Why it happens:</strong> a daisy chain runs every pedal off one adapter through a single cable with multiple plugs. Every pedal shares the same ground, so noise from one pedal can reach all the others. On top of that, one wall wart has a fixed current rating. A few analog drives might draw 10 to 20 mA each, but a single digital reverb or delay can pull several hundred milliamps. Add a couple of those to a daisy chain and you are asking the adapter for more than it can give. Voltage sags, pedals misbehave.</p>
<p><strong>The fix:</strong></p>
<ul>
<li>Add up the current draw of every pedal. It is printed on the pedal or in the manual, in mA.</li>
<li>Use a power supply with isolated outputs, and give each pedal an output that meets or exceeds its draw.</li>
<li>Match the voltage and polarity each pedal asks for. Most are 9V center negative, but not all.</li>
<li>Leave some headroom. Do not run the supply at its limit.</li>
</ul>
<p>We go much deeper on this in our <a href="/blog/pedalboard-power-supply-guide">pedalboard power supply guide</a>.</p>`,
      },
      {
        heading: '3. A long true-bypass chain with no buffer',
        headingLevel: 2,
        content: `<p><strong>What it sounds like:</strong> your guitar sounds brighter plugged straight into the amp than it does through your board with every pedal off.</p>
<p><strong>Why it happens:</strong> true bypass sounds like a win on paper. Nothing in the path when a pedal is off. But on a big board it means your passive pickups are driving the guitar cable, every patch cable, every switch and the long run to the amp. All that cable adds capacitance, and capacitance rolls off treble. Past roughly 20 feet total, most players can hear it.</p>
<p><strong>The fix:</strong> add one good buffer. Put it near the start of the chain, after any vintage fuzz, or near the end to drive the cable to the amp. Before you buy one, check what you already have. Boss pedals, many tuners and lots of digital delays already buffer the signal. One well-placed buffer is usually all you need.</p>`,
      },
      {
        heading: '4. Digital and analog pedals sharing dirty power',
        headingLevel: 2,
        content: `<p><strong>What it sounds like:</strong> a high-pitched whine, digital hash or a faint clicking that follows the clock of a digital pedal, often worse with the drives on.</p>
<p><strong>Why it happens:</strong> digital pedals run processors and clocks that put noise back onto their power supply. When a digital reverb and a high-gain distortion share a non-isolated supply, that noise can reach the distortion through the shared power and ground, and then the distortion amplifies it. The same thing happens with cheap supplies that are not well filtered.</p>
<p><strong>The fix:</strong> isolated power. Every output on a properly isolated supply has its own transformer winding or isolated circuit, so noise from one pedal stays with that pedal. This is why every build we do uses isolated power. If you are chasing a noise problem right now, our <a href="/blog/pedalboard-hum-noise-fix">pedalboard hum and noise troubleshooting guide</a> walks through how to find the source step by step.</p>`,
      },
      {
        heading: '5. Cheap solderless patch cables',
        headingLevel: 2,
        content: `<p><strong>What it sounds like:</strong> crackles when you step on a pedal, signal that cuts out for a second, a board that works at home and fails at the gig.</p>
<p><strong>Why it happens:</strong> solderless cables hold the conductor in place with a set screw or a pressure fit. That can work fine on a board that never moves. But a gigging board gets loaded, bumped, heated, cooled and stepped on. Over time the connection loosens. Then you get intermittent contact, which is the worst kind of problem because it never fails while you are testing it.</p>
<p><strong>The fix:</strong> for a board that leaves the house, use soldered patch cables with a quality, low-capacitance cable. A soldered joint does not loosen with vibration. We hand-solder every cable we build with Mogami, cut to the exact length needed. If you want the full rundown on cable types, see our guide to the <a href="/blog/best-patch-cables-for-pedalboard">best patch cables for a pedalboard</a>.</p>
<p>If you already own solderless cables and want to keep them, check every screw before each gig and carry spares. It is not glamorous, but it works.</p>`,
      },
      {
        heading: '6. Cable spaghetti with no strain relief',
        headingLevel: 2,
        content: `<p><strong>What it sounds like:</strong> hum that comes and goes depending on how the cables are sitting, a jack that crackles when the board is moved, and a 20-minute hunt for one dead cable at soundcheck.</p>
<p><strong>Why it happens:</strong> loose cables snag, pull and flex right at the plug. That stress goes straight into the solder joint and into the pedal's input jack. Over months, jacks loosen and joints crack. A messy loom also tends to run power cables right alongside audio cables for long stretches, which invites hum, and it makes troubleshooting slow because nobody can tell which cable goes where.</p>
<p><strong>The fix:</strong></p>
<ul>
<li>Secure cables to the board with ties and adhesive mounts so the plug is not carrying the weight.</li>
<li>Leave a small, gentle loop at each jack instead of a tight pull.</li>
<li>Run power and audio on separate paths. Where they have to meet, cross at 90 degrees.</li>
<li>Label both ends of anything that runs under the board.</li>
</ul>
<p>We dig into how much neatness matters for tone, and how much it does not, in <a href="/blog/pedalboard-wiring-clean-vs-messy">clean vs. messy pedalboard wiring</a>.</p>`,
      },
      {
        heading: '7. Building for today instead of tomorrow',
        headingLevel: 2,
        content: `<p><strong>What it sounds like:</strong> nothing, at first. Then you buy one new pedal and have to rebuild the whole board.</p>
<p><strong>Why it happens:</strong> most players size the board, the power supply and the cable runs for exactly the pedals they own today. Six months later there is a new delay that needs 300 mA and no spare output to give it. Or there is no room for an expression pedal. So the new pedal goes on a daisy chain, sits at a weird angle and gets a random cable. Mistakes 2, 5 and 6 all come back.</p>
<p><strong>The fix:</strong></p>
<ul>
<li>Leave open space on the board, around a pedal or two worth.</li>
<li>Pick a power supply with spare isolated outputs, including at least one higher-current output for a future digital pedal.</li>
<li>If you are heading toward a lot of pedals, think about a loop switcher or MIDI control now. Our <a href="/blog/midi-pedalboard-switching-guide">MIDI switching guide</a> covers when it makes sense.</li>
<li>If you tour, plan the case and transport too. Our <a href="/blog/touring-pedalboard-checklist">touring pedalboard checklist</a> covers the details.</li>
</ul>`,
      },
      {
        heading: 'Where to start if your board has several of these',
        headingLevel: 2,
        content: `<p>If you recognized your board in three or four of these, you are not alone. Plenty of boards we see have more than one. Start in this order, because each fix makes the next one easier to judge:</p>
<ol>
<li><strong>Power first.</strong> Isolated supply, correct current. It removes a whole category of noise.</li>
<li><strong>Chain order second.</strong> Free to fix and often the biggest tone change.</li>
<li><strong>Cables third.</strong> Replace the worst offenders and add strain relief.</li>
<li><strong>Buffer last.</strong> Once everything else is sorted, you can hear whether you need one.</li>
</ol>
<p>Want someone to go through it with you? <a href="/tone-tutoring">Tone Tutoring</a> is a $99, 60-minute video session where our team looks at your actual board, listens and walks you through the fixes in the right order. If you would rather have the whole thing rebuilt properly, our <a href="/custom-builds">custom builds</a> start at $1,999 with a free 30-minute consultation, hand-soldered Mogami cable, isolated power and lifetime support. Not sure which way to go? Our post on <a href="/blog/custom-pedalboard-build-vs-diy">custom build vs. DIY</a> lays out the tradeoffs.</p>`,
      },
      {
        heading: 'Frequently asked questions about pedalboard mistakes',
        headingLevel: 2,
        content: `<h3>Why does my pedalboard sound worse than plugging straight into my amp?</h3>
<p>The usual cause is treble loss from a long true-bypass chain with no buffer, or a low-quality pedal buffer coloring the sound. Too much total cable adds capacitance that rolls off highs. One good buffer near the start or end of the chain usually fixes it.</p>
<h3>Is it bad to daisy chain guitar pedals?</h3>
<p>For a small board of low-draw analog pedals, a daisy chain can work. As soon as you add digital pedals or more than a few pedals, it tends to cause hum and power problems because every pedal shares one ground and one current limit. An isolated supply fixes both.</p>
<h3>Are solderless patch cables bad for tone?</h3>
<p>They are not bad for tone when they work. The problem is reliability. The connection depends on a set screw or pressure fit that can loosen with vibration, causing crackles and dropouts. Soldered cables are more reliable for boards that travel.</p>
<h3>Can a bad power supply cause hum?</h3>
<p>Yes. Non-isolated or undersized supplies are among the most common causes of pedalboard hum and digital whine. Shared grounds let noise travel between pedals, and not enough current makes pedals misbehave. An isolated supply with enough current per output solves most of it.</p>`,
      },
    ],
    cta: {
      text: 'Want a builder to spot the mistakes on your board?',
      href: '/tone-tutoring',
      label: 'Book Tone Tutoring for $99',
    },
    faqs: [
      {
        question: 'Why does my pedalboard sound worse than plugging straight into my amp?',
        answer:
          'The usual cause is treble loss from a long true-bypass chain with no buffer, or a low-quality pedal buffer coloring the sound. Too much total cable adds capacitance that rolls off highs. One good buffer near the start or end of the chain usually fixes it.',
      },
      {
        question: 'Is it bad to daisy chain guitar pedals?',
        answer:
          'For a small board of low-draw analog pedals, a daisy chain can work. As soon as you add digital pedals or more than a few pedals, it tends to cause hum and power problems because every pedal shares one ground and one current limit. An isolated supply fixes both.',
      },
      {
        question: 'Are solderless patch cables bad for tone?',
        answer:
          'They are not bad for tone when they work. The problem is reliability. The connection depends on a set screw or pressure fit that can loosen with vibration, causing crackles and dropouts. Soldered cables are more reliable for boards that travel.',
      },
      {
        question: 'Can a bad power supply cause hum?',
        answer:
          'Yes. Non-isolated or undersized supplies are among the most common causes of pedalboard hum and digital whine. Shared grounds let noise travel between pedals, and not enough current makes pedals misbehave. An isolated supply with enough current per output solves most of it.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 3. Clean vs Messy Pedalboard Wiring
  // ─────────────────────────────────────────────
  {
    slug: 'pedalboard-wiring-clean-vs-messy',
    title: 'Clean vs. Messy Pedalboard Wiring: Does It Actually Matter?',
    description:
      'An honest look at pedalboard cable management. Neat routing does not change tone by itself, but cable length, power runs next to signal, strain relief and troubleshooting speed all do.',
    publishedAt: '2026-09-28',
    updatedAt: '2026-09-28',
    author: 'Jacob Charendoff, Founder of The Rig Doctor',
    readTime: '8 min read',
    category: 'Guides',
    tags: ['pedalboard wiring', 'cable management', 'hum', 'patch cables', 'pedalboard'],
    heroImage: `${CDN}/Cable_Work.png`,
    heroAlt:
      'Close-up of hand-soldered Mogami patch cable work on a Rig Doctor pedalboard, with cables cut to length and secured to the board',
    sections: [
      {
        heading: 'The short answer',
        headingLevel: 2,
        content: `<p>Neat pedalboard wiring does not change your tone by itself. Electrons do not care how pretty the loom looks. What does matter is what clean wiring usually comes with: shorter total cable length, power kept away from signal to avoid hum, strain relief that prevents failures, and a board you can troubleshoot in minutes at soundcheck.</p>`,
      },
      {
        heading: 'An honest take first',
        headingLevel: 2,
        content: `<p>Pedalboard photos online have turned cable management into an art form. Perfect right angles. Color-coded loops. Zero visible cable. And there is a whole side of the internet that insists all that effort is pointless because "a cable is a cable."</p>
<p>Both sides are partly right. A board that looks messy can sound great. A board that looks perfect can hum like a fridge. The look is not the point. The engineering underneath the look is.</p>
<p>So let's split it up. Here is what neatness on its own does not do, and the five things that often come along with clean wiring that do make a real difference.</p>`,
      },
      {
        heading: 'What neatness alone does not do',
        headingLevel: 2,
        content: `<p>If you take a board and re-route the exact same cables, same lengths, same types, same connections, into a tidier layout, your tone will not change. The signal does not know whether the cable is running in a straight line or making a lazy S-curve.</p>
<p>A few myths worth clearing up:</p>
<ul>
<li><strong>"Right angles sound better."</strong> They do not. Sharp bends can stress a cable over time, but the angle has no effect on sound.</li>
<li><strong>"Hidden cables sound better."</strong> Routing under the board is great for protection and looks. The audio is the same.</li>
<li><strong>"Matching colors means a better build."</strong> It means a tidier build. Nice, but not a tone upgrade.</li>
</ul>
<p>So if your board is a little messy but quiet, reliable and easy to work on, you do not need to tear it apart to make it pretty. Spend the money on something else.</p>`,
      },
      {
        heading: 'What does matter, part 1: total cable length',
        headingLevel: 2,
        content: `<p>This is where "messy" often costs you. Messy boards tend to use whatever patch cables were lying around. A 12-inch cable connecting two pedals 3 inches apart. Another one coiled under the board. Multiply that across 10 or 12 connections and you can add several feet of cable you do not need.</p>
<p>Every foot of cable adds capacitance, and capacitance rolls off treble. On a buffered board the effect is small, because the buffer can drive long runs. On an all true-bypass board, your passive pickups are driving every inch of it, and extra length dulls your high end.</p>
<p>That is why we cut every cable on a build to the exact length the connection needs. It is not about looks. It is about keeping the total run as short as it can be. More on that in our guide to the <a href="/blog/best-patch-cables-for-pedalboard">best patch cables for a pedalboard</a>.</p>`,
      },
      {
        heading: 'What does matter, part 2: power running next to signal',
        headingLevel: 2,
        content: `<p>This is the big one. Instrument-level signal is tiny, and it is easy for nearby electrical fields to leak into it. Two common sources on a pedalboard:</p>
<ul>
<li><strong>AC power and transformers.</strong> The mains cable into your power supply and the transformer inside it throw off a 60 Hz field in the US. Run an audio cable right alongside them and you can pick up hum.</li>
<li><strong>Switching supplies and digital pedals.</strong> These can radiate higher frequency noise that shows up as whine or hash.</li>
</ul>
<p>Messy boards very often run power cables and audio cables bundled together for long stretches because that is the easy path. Clean builds separate them.</p>
<p>The rules we follow:</p>
<ol>
<li>Keep audio and power on separate paths wherever possible.</li>
<li>When they have to meet, cross them at 90 degrees instead of running them side by side.</li>
<li>Keep audio cables away from the power supply's transformer and the AC inlet.</li>
<li>Use isolated power so a noisy pedal does not share its ground with everything else.</li>
</ol>
<p>If your board hums and you are not sure why, work through our <a href="/blog/pedalboard-hum-noise-fix">pedalboard hum and noise guide</a>. Cable routing is one of the first things to check.</p>`,
      },
      {
        heading: 'What does matter, part 3: strain relief',
        headingLevel: 2,
        content: `<p>Most cable failures happen at the plug. When a cable hangs loose, every bump, every stomp and every load-in puts stress right where the cable meets the connector. Eventually a solder joint cracks or a pedal's input jack works loose.</p>
<p>Good strain relief means the cable is held to the board close to the plug, with a gentle loop so the connector is not under tension. That is the part of "clean wiring" that has nothing to do with looks and everything to do with whether your board works on the night.</p>
<p>What to do:</p>
<ul>
<li>Use adhesive cable mounts and ties to anchor cables to the board.</li>
<li>Leave a small relaxed loop at each jack.</li>
<li>Avoid tight bends right at the connector.</li>
<li>Make sure nothing under the board can get pinched when it is set down or packed.</li>
</ul>`,
      },
      {
        heading: 'What does matter, part 4: troubleshooting speed at soundcheck',
        headingLevel: 2,
        content: `<p>Picture it. Soundcheck, 15 minutes before doors, and the board is silent. On a messy board you are pulling cables one by one, trying to figure out which one runs where. On a clean board you know the path. You can swap the suspect cable, bypass a pedal or jump around a section in a couple of minutes.</p>
<p>A board built for fast troubleshooting has:</p>
<ul>
<li>A signal path that flows in a logical direction you can trace by eye.</li>
<li>Labels on anything that runs under the board.</li>
<li>Power and audio clearly separated, so you can rule one out fast.</li>
<li>Spare room to reach every jack without removing pedals.</li>
</ul>
<p>This matters most for working players. If your board lives in a bedroom, you have time. If it lives on a stage, speed is everything. Our <a href="/blog/touring-pedalboard-checklist">touring pedalboard checklist</a> covers the rest of what a road board needs.</p>`,
      },
      {
        heading: 'What does matter, part 5: long-term reliability',
        headingLevel: 2,
        content: `<p>Put it all together and this is the real payoff. Cables that are the right length, anchored properly, kept away from power and soldered instead of held with a set screw tend to keep working for years. Messy boards tend to develop intermittent problems that show up one gig at a time.</p>
<p>That is why we build every board with hand-soldered Mogami cable, isolated power and cables cut to length. It is also why we can offer lifetime support and free repairs on our builds. A board that is built right does not come back very often.</p>`,
      },
      {
        heading: 'A weekend cleanup you can do yourself',
        headingLevel: 2,
        content: `<p>You do not need a full rebuild to get most of the benefit. Pick a free afternoon and work through this list:</p>
<ol>
<li><strong>Take a photo first.</strong> Top and underneath. If something goes wrong, you can put it back.</li>
<li><strong>Swap the longest offenders.</strong> Any patch cable that is coiled or looped to take up slack gets replaced with one closer to the right length.</li>
<li><strong>Pull power away from audio.</strong> Re-route DC cables along one edge of the board and audio along another, crossing only where you have to.</li>
<li><strong>Move the supply's AC cable.</strong> Keep it away from your input and output jacks and from the first few pedals in the chain, where the signal is weakest.</li>
<li><strong>Anchor everything.</strong> Add cable mounts and ties so no plug is hanging by its own weight.</li>
<li><strong>Label the hidden runs.</strong> A small tag on each end of anything under the board.</li>
</ol>
<p>Then play it at volume and listen. If the hum is gone and nothing crackles when you tap the cables, you are done.</p>`,
      },
      {
        heading: 'So should you rewire your board?',
        headingLevel: 2,
        content: `<p>Ask yourself these questions:</p>
<ul>
<li>Is the board quiet, with no hum or whine you can trace to cable routing?</li>
<li>Has it been reliable, with no crackles or dropouts?</li>
<li>Could you find a dead cable in under five minutes?</li>
<li>Are your patch cables close to the length they need to be?</li>
</ul>
<p>If you answered yes to all four, leave it alone. Your board is fine, whatever it looks like. If you answered no to one or more, a rewire is probably worth it. Not for the photos. For the sound and the peace of mind.</p>
<p>Want to see what a clean build looks like in practice? Browse our <a href="/gallery">gallery</a>. If you are thinking about a full build, every <a href="/custom-builds">custom build</a> starts with a <a href="/book">free 30-minute consultation</a>, where we plan the signal chain, the power and the routing before a single cable is cut. Builds start at $1,999 and usually take 4 to 8 weeks. And if you just want a second opinion on your current board, <a href="/tone-tutoring">Tone Tutoring</a> is $99 for a 60-minute video session.</p>`,
      },
      {
        heading: 'Frequently asked questions about pedalboard wiring',
        headingLevel: 2,
        content: `<h3>Does cable management affect guitar tone?</h3>
<p>Routing neatness alone does not affect tone. What affects tone is total cable length, which adds capacitance and rolls off treble, and power cables running alongside audio cables, which can add hum. Clean builds usually fix both, which is why they often sound better.</p>
<h3>Should power and audio cables be separated on a pedalboard?</h3>
<p>Yes. Keep power and audio on separate paths whenever you can. When they have to meet, cross them at 90 degrees instead of running them side by side. Also keep audio cables away from the power supply transformer and the AC inlet.</p>
<h3>How long should pedalboard patch cables be?</h3>
<p>As short as the connection allows while still leaving a small relaxed loop at each jack. Extra length adds capacitance and clutter. Custom cables cut to length are ideal for boards you plan to keep for a while.</p>
<h3>Is it worth paying someone to rewire my pedalboard?</h3>
<p>If your board hums, crackles, drops out or takes forever to troubleshoot, a proper rewire usually pays for itself in reliability. If your board is quiet and reliable, it is probably not worth rewiring just for looks.</p>`,
      },
    ],
    cta: {
      text: 'Want a board that is quiet, reliable and easy to fix?',
      href: '/book',
      label: 'Book a free 30-minute consultation',
    },
    faqs: [
      {
        question: 'Does cable management affect guitar tone?',
        answer:
          'Routing neatness alone does not affect tone. What affects tone is total cable length, which adds capacitance and rolls off treble, and power cables running alongside audio cables, which can add hum. Clean builds usually fix both, which is why they often sound better.',
      },
      {
        question: 'Should power and audio cables be separated on a pedalboard?',
        answer:
          'Yes. Keep power and audio on separate paths whenever you can. When they have to meet, cross them at 90 degrees instead of running them side by side. Also keep audio cables away from the power supply transformer and the AC inlet.',
      },
      {
        question: 'How long should pedalboard patch cables be?',
        answer:
          'As short as the connection allows while still leaving a small relaxed loop at each jack. Extra length adds capacitance and clutter. Custom cables cut to length are ideal for boards you plan to keep for a while.',
      },
      {
        question: 'Is it worth paying someone to rewire my pedalboard?',
        answer:
          'If your board hums, crackles, drops out or takes forever to troubleshoot, a proper rewire usually pays for itself in reliability. If your board is quiet and reliable, it is probably not worth rewiring just for looks.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 4. Best Custom Pedalboard Builders
  // ─────────────────────────────────────────────
  {
    slug: 'best-custom-pedalboard-builders',
    title: 'The Best Custom Pedalboard Builders in the US (2026)',
    description:
      'An honest roundup of US custom pedalboard builders, what each one does well and who it suits, plus the questions to ask before you hire any builder.',
    publishedAt: '2026-09-28',
    updatedAt: '2026-09-28',
    author: 'Jacob Charendoff, Founder of The Rig Doctor',
    readTime: '8 min read',
    category: 'Guides',
    tags: ['custom pedalboard', 'pedalboard builders', 'custom pedalboard builder', 'buying guide'],
    heroImage: `${CDN}/RD_Pretty_Board_Pic.png`,
    heroAlt:
      'A finished custom pedalboard built by The Rig Doctor in Houston, Texas, with pedals mounted and wired',
    sections: [
      {
        heading: 'The short answer',
        headingLevel: 2,
        content: `<p>Well-regarded US custom pedalboard builders include West Coast Pedal Board in California, Pedal Pad in Pennsylvania, Helweg Design in Nashville, Interstellar Audio Machines in Florida, Best-Tronics in Illinois and The Rig Doctor in Houston. The best one for you depends on whether you need a board, a case, full wiring or signal-chain design.</p>`,
      },
      {
        heading: 'How we put this list together',
        headingLevel: 2,
        content: `<p>Yes, we are a pedalboard builder writing a list of pedalboard builders. We know how that looks. So here are the rules we held ourselves to:</p>
<ul>
<li>Every fact about another builder comes from that builder's own website, and we link to it.</li>
<li>We do not list prices or lead times for anyone else. Those change, and the builder is the only reliable source.</li>
<li>We do not rank anyone. Different shops are built for different players.</li>
<li>Nothing negative. Every shop here does good work, and the pedalboard world is better with more of them.</li>
</ul>
<p>One more thing to know up front. "Custom pedalboard builder" covers a few different jobs. Some shops mainly build the board itself, the wood or metal platform and case. Some mainly do the wiring, taking your pedals and turning them into a finished rig. Some do both. Knowing which one you need saves everyone time.</p>`,
      },
      {
        heading: 'West Coast Pedal Board (Northern California)',
        headingLevel: 2,
        content: `<p><a href="https://westcoastpedalboard.com/" target="_blank" rel="noopener noreferrer">West Coast Pedal Board</a> has been hand building gear in Northern California since early 2012, according to its <a href="https://westcoastpedalboard.com/info/" target="_blank" rel="noopener noreferrer">about page</a>. The shop says it started as a custom shop building one-off boards and later added a standard line based on the most requested custom features.</p>
<p><strong>What stands out:</strong> a wide menu of board styles. Their <a href="https://westcoastpedalboard.com/custom-pedalboard/" target="_blank" rel="noopener noreferrer">Custom Shop page</a> lists angled and flat boards in tolex, tweed and hardwood, with hardwood options like walnut, sapele, zebra, flame maple and padouk, and custom sizes available. They also hand make cables in house using Mogami, GnH and Switchcraft components, sell cases from soft bags to road cases, and run a big DIY parts section for players who want to build their own.</p>
<p><strong>Good fit for:</strong> players who want a good-looking board built to a specific size or finish, and DIY builders who want quality parts and a board to build on.</p>`,
      },
      {
        heading: 'Pedal Pad (Coatesville, Pennsylvania)',
        headingLevel: 2,
        content: `<p><a href="https://pedalpad.com/" target="_blank" rel="noopener noreferrer">Pedal Pad</a> builds its boards by hand from Baltic birch in Coatesville, Pennsylvania, according to its website.</p>
<p><strong>What stands out:</strong> the design. A Pedal Pad combines the pedalboard and its protective case into one unit. Remove the lid and you are ready to play. The pedal deck is hinged and opens to a compartment underneath for power supplies and cables. They list more than 60 Tolex and Tweed finishes, plus custom audio and power connector options using jacks from brands like Neutrik and Switchcraft. The site says they ship across the US, the UK and Europe.</p>
<p><strong>Good fit for:</strong> gigging players who want a board and case in one, with fast setup and teardown and easy access to the power and wiring underneath.</p>`,
      },
      {
        heading: 'Helweg Design (Nashville, Tennessee)',
        headingLevel: 2,
        content: `<p><a href="https://www.helwegdesign.com/" target="_blank" rel="noopener noreferrer">Helweg Design</a> is based in Nashville and says it has been handcrafting in the USA since 2010. According to their <a href="https://www.helwegdesign.com/pages/custom-openwing-pedalboards" target="_blank" rel="noopener noreferrer">custom pedalboard page</a>, every board and case is handcrafted by Michael Helweg in their Nashville shop.</p>
<p><strong>What stands out:</strong> the OpenWing flat pedalboard, a patented design with aluminum side wings and a solid wood back brace that form a protective cradle around the pedals. The site lists a Baltic birch main deck, a built-in IEC power connector, optional riser tiers, and custom patchbays. Helweg also offers cases, custom patch cables, pedal mounting and setup services, and a "Pedalboard with Consulting" option on its custom shop menu.</p>
<p><strong>Good fit for:</strong> players who like a flat, minimalist board with thoughtful hardware, and anyone who needs a custom patchbay to tame a complex rig.</p>`,
      },
      {
        heading: 'Interstellar Audio Machines (Tallahassee, Florida)',
        headingLevel: 2,
        content: `<p><a href="https://interstellaraudiomachines.com/" target="_blank" rel="noopener noreferrer">Interstellar Audio Machines</a> is a Florida company that makes its own effects pedals and also offers <a href="https://interstellaraudiomachines.com/pages/custom-pedalboards" target="_blank" rel="noopener noreferrer">custom pedalboard services</a>.</p>
<p><strong>What stands out:</strong> a full-service approach. Their site lists pedalboard builds on flat or angled boards, in series or with switching systems, plus rack builds, custom junction boxes and patch bays with optional input and output buffers, MIDI programming, custom-length DC power cables using KobiConn connectors, and custom-length patch cables using Mogami cable.</p>
<p><strong>Good fit for:</strong> players who want one shop to handle the build, the switching and the MIDI programming, including rack-based rigs.</p>`,
      },
      {
        heading: 'Best-Tronics (Tinley Park, Illinois)',
        headingLevel: 2,
        content: `<p><a href="https://btpa.com/" target="_blank" rel="noopener noreferrer">Best-Tronics</a> is a cable manufacturer in Tinley Park, Illinois, with a <a href="https://btpa.com/Rig-Building/Pedalboard-Building/" target="_blank" rel="noopener noreferrer">pedalboard building service</a> built on its own US-made cables.</p>
<p><strong>What stands out:</strong> three clear options. Turnkey pedalboards, where you pick the pedals and board and they wire it, including consulting on wiring design. Re-wires for existing boards, with consultation, wiring diagrams, looming options and interface panels. And DIY kits, since they sell their cable, connectors and hardware in bulk.</p>
<p><strong>Good fit for:</strong> players who want a cable-focused shop, need an existing board rewired, or want pro-grade parts to wire a board themselves.</p>`,
      },
      {
        heading: 'The Rig Doctor (Houston, Texas)',
        headingLevel: 2,
        content: `<p>That is us. Here is the plain version.</p>
<p>The Rig Doctor is based in Houston and ships nationwide. The shop has 300+ rigs built and 17 years of experience behind it. Our builders are Mason Marangella and Vince DiGioia.</p>
<p><strong>What stands out:</strong> we start with the sound, not the board. Every build begins with a free 30-minute consultation where we talk through your music, your amp and your pedals, then design the signal chain before anything gets mounted or soldered. From there, every build uses hand-soldered Mogami cable cut to length and isolated power, and comes with lifetime support and free repairs. <a href="/custom-builds">Custom builds</a> start at $1,999, and a typical build takes 4 to 8 weeks.</p>
<p>We also offer <a href="/tone-tutoring">Tone Tutoring</a>. It is a $99, 60-minute video session for players who are not ready for a full build but want help with chain order, gain staging or noise on the board they already own.</p>
<p><strong>Good fit for:</strong> players who want the whole rig designed and built around their sound, and players who want expert help with their current board first. You can see finished builds in our <a href="/gallery">gallery</a>.</p>`,
      },
      {
        heading: 'How to choose a custom pedalboard builder',
        headingLevel: 2,
        content: `<p>Whoever you hire, these are the questions that separate a board you love from one you tolerate.</p>
<h3>1. Do they build boards, wire rigs, or both?</h3>
<p>If you only need a platform or a case, a board maker is perfect. If you want your pedals turned into a finished, wired rig, make sure the shop does wiring and setup. Some do both.</p>
<h3>2. Do they plan the signal chain with you?</h3>
<p>A beautiful board with the wrong pedal order still sounds wrong. Ask whether the builder talks through your amp, your gain structure and your effects before building. A good builder asks you a lot of questions. If you want to walk in prepared, read our <a href="/blog/guitar-signal-chain-order">signal chain order guide</a> first.</p>
<h3>3. How do they handle power?</h3>
<p>Ask what supply they use and whether the outputs are isolated. Ask how they route power relative to audio. Power is one of the most common sources of noise on a board. Our <a href="/blog/pedalboard-power-supply-guide">power supply guide</a> explains what to look for.</p>
<h3>4. What cable and connectors do they use?</h3>
<p>Ask what cable brand they use, and whether the connections are soldered or solderless. For a board that travels, soldered connections with low-capacitance cable are the reliable choice.</p>
<h3>5. What happens after delivery?</h3>
<p>Things break on the road. Ask about warranty, support and repairs, and how you reach the builder if something goes wrong at 5 p.m. before a show.</p>
<h3>6. Do you ship your pedals to them, or do they supply them?</h3>
<p>Some shops work only with pedals you send in. Some can source pedals. Some build the board for you to finish at home. Know which one you are signing up for.</p>
<h3>7. Can you see their work?</h3>
<p>Look at photos of finished boards, top and underneath. The underside tells you more about a builder than the top does.</p>`,
      },
      {
        heading: 'Custom build, DIY or somewhere in between?',
        headingLevel: 2,
        content: `<p>Not everybody needs a custom builder. If you like working with a soldering iron and have the time, a DIY board with quality parts can sound great. Several of the shops above sell the parts to do it. Our post on <a href="/blog/custom-pedalboard-build-vs-diy">custom build vs. DIY</a> helps you decide, and our <a href="/blog/custom-pedalboard-cost">custom pedalboard cost breakdown</a> shows where the money goes.</p>
<p>If you want to talk it through with someone who does this every day, <a href="/book">book a free 30-minute consultation</a>. No obligation. Even if we are not the right fit, you will leave with a clearer plan for your rig.</p>`,
      },
      {
        heading: 'Frequently asked questions about custom pedalboard builders',
        headingLevel: 2,
        content: `<h3>What does a custom pedalboard builder do?</h3>
<p>It depends on the shop. Some build the physical board and case to your size and finish. Others take your pedals and wire them into a finished rig with power, cables and switching. Some do both, and some also plan the signal chain with you before building.</p>
<h3>How do I choose a custom pedalboard builder?</h3>
<p>Ask whether they plan the signal chain with you, what power supply they use and whether outputs are isolated, what cable and connectors they use, what support they offer after delivery, and whether you can see photos of finished boards, including the underside.</p>
<h3>Do I have to live near a custom pedalboard builder?</h3>
<p>No. Many builders ship their work. The Rig Doctor is based in Houston and ships nationwide, so location is rarely a deal breaker.</p>
<h3>How much does a custom pedalboard cost?</h3>
<p>It varies widely by builder and by rig. At The Rig Doctor, custom builds start at $1,999. For other builders, check their websites or ask for a quote. Our custom pedalboard cost guide breaks down what drives the price.</p>
<h3>What if I am not ready for a full custom build?</h3>
<p>You have options. Many builders sell parts for DIY boards, and some offer rewires of existing boards. The Rig Doctor offers Tone Tutoring, a $99, 60-minute video session to help you improve the board you already have.</p>`,
      },
    ],
    cta: {
      text: 'Want your rig designed around your sound?',
      href: '/book',
      label: 'Book a free 30-minute consultation',
    },
    faqs: [
      {
        question: 'What does a custom pedalboard builder do?',
        answer:
          'It depends on the shop. Some build the physical board and case to your size and finish. Others take your pedals and wire them into a finished rig with power, cables and switching. Some do both, and some also plan the signal chain with you before building.',
      },
      {
        question: 'How do I choose a custom pedalboard builder?',
        answer:
          'Ask whether they plan the signal chain with you, what power supply they use and whether outputs are isolated, what cable and connectors they use, what support they offer after delivery, and whether you can see photos of finished boards, including the underside.',
      },
      {
        question: 'Do I have to live near a custom pedalboard builder?',
        answer:
          'No. Many builders ship their work. The Rig Doctor is based in Houston and ships nationwide, so location is rarely a deal breaker.',
      },
      {
        question: 'How much does a custom pedalboard cost?',
        answer:
          'It varies widely by builder and by rig. At The Rig Doctor, custom builds start at $1,999. For other builders, check their websites or ask for a quote. Our custom pedalboard cost guide breaks down what drives the price.',
      },
      {
        question: 'What if I am not ready for a full custom build?',
        answer:
          'You have options. Many builders sell parts for DIY boards, and some offer rewires of existing boards. The Rig Doctor offers Tone Tutoring, a $99, 60-minute video session to help you improve the board you already have.',
      },
    ],
  },
];
