import type { BlogPost } from './blog';

export const seoPosts: BlogPost[] = [
  // ─────────────────────────────────────────────
  // 1. Effects Loop vs Front of Amp
  // ─────────────────────────────────────────────
  {
    slug: 'effects-loop-vs-front-of-amp',
    title: 'Effects Loop vs Front of Amp: Where Every Pedal Goes',
    description:
      'A no-BS guide to which pedals belong in front of your amp and which ones sound better in the effects loop. Learn the signal chain basics that separate a muddy mess from a great-sounding rig.',
    publishedAt: '2026-06-04',
    author: 'Jacob Charendoff',
    readTime: '8 min read',
    category: 'Guides',
    tags: ['effects loop', 'signal chain', 'amp', 'pedal order'],
    sections: [
      {
        heading: 'Why Pedal Placement Matters More Than the Pedals Themselves',
        headingLevel: 2,
        content: `<p>Here's something I tell almost every player who sits down for a <a href="/tone-tutoring">Tone Tutoring session</a>: you can own the most expensive pedals on the planet and still sound like garbage if they're in the wrong spot in your chain. Pedal placement isn't some esoteric secret — it's basic physics. Where a pedal sits relative to your amp's preamp stage changes what that pedal is actually processing, and that changes everything about how it sounds.</p>
<p>Your amp has two main gain stages: the preamp (where your tone gets shaped and distorted) and the power amp (where it gets loud). The effects loop sits between those two stages. That's the whole game. Pedals in front of the amp hit the preamp's input. Pedals in the loop hit the power amp's input after the preamp has already done its thing. Same pedal, completely different results depending on where you plug it in.</p>
<p>I've built over 200 rigs for touring musicians and home players, and signal chain order is the single most impactful thing we dial in during every build. Let's break down where every type of pedal belongs and why.</p>`,
      },
      {
        heading: 'What the Effects Loop Actually Is',
        headingLevel: 2,
        content: `<p>Most tube amps — and plenty of solid-state amps — have a pair of jacks on the back panel labeled "Send" and "Return" (sometimes "Preamp Out" and "Power Amp In"). The Send jack takes the signal after it leaves the preamp. The Return jack feeds it back into the power amp. Anything you patch between those two jacks sits in the effects loop.</p>
<p>There are two types of effects loops you'll encounter:</p>
<ul>
<li><strong>Series loop:</strong> 100% of your signal passes through whatever's in the loop. Most common. Found on amps like the Mesa Rectifier, Marshall DSL, and Fender Hot Rod Deluxe.</li>
<li><strong>Parallel loop:</strong> Your dry signal continues to the power amp while a copy gets processed through the loop, then blended back in. Found on some Mesa, Bogner, and Soldano amps. Great for maintaining pick attack, but can cause phase issues with certain effects.</li>
</ul>
<p>If your amp doesn't have a loop at all — like a Fender Princeton, Vox AC15, or most vintage-style amps — then everything goes in front. You can still get great sounds, but you'll need to be more deliberate about gain staging and pedal choice. A good overdrive pedal becomes your "preamp," and your time-based effects need to play nice with whatever the amp's preamp is doing to the signal.</p>`,
      },
      {
        heading: 'Pedals That Belong in Front of the Amp',
        headingLevel: 2,
        content: `<p>The general rule: anything that shapes the fundamental character of your note — its pitch, its dynamics, its dirt — goes in front of the amp. These pedals want to interact with your guitar's raw signal and with the amp's preamp.</p>
<h3>Tuners</h3>
<p>Always first. Your tuner needs the cleanest, most unprocessed signal possible to track accurately. A Boss TU-3, TC Electronic Polytune, or Peterson StroboStomp — whatever you use, put it at the very front. If you're running a buffer or a volume pedal first for some reason, just make sure nothing is coloring the signal before the tuner gets it.</p>
<h3>Wah and Filter Pedals</h3>
<p>Wah pedals (Dunlop Cry Baby, Vox V847, RMC) and envelope filters (MXR Envelope Filter, EHX Q-Tron) need to react to your picking dynamics. They're frequency-selective — they boost a resonant peak and sweep it up and down. If you put a compressor or overdrive before the wah, you're feeding it a squashed, clipped signal. The wah can't "feel" your pick attack anymore, and it just sounds like a tone knob being wiggled. Wah before dirt. Always.</p>
<h3>Compressors</h3>
<p>After the wah, before the drives. A Keeley Compressor Plus, Wampler Ego, or Origin Effects Cali76 wants to see your guitar's natural dynamics (or the wah-shaped dynamics) and even them out before anything else gets hold of the signal. Compression before overdrive gives you that smooth, sustained lead tone. Compression after overdrive sounds harsh and brings up all the noise.</p>
<h3>Overdrive, Distortion, and Fuzz</h3>
<p>All your gain pedals — your Tube Screamer, Klon Centaur, Boss BD-2, ProCo Rat, Big Muff — go in front of the amp. They're designed to push the amp's preamp input, and that interaction is where the magic happens. A Tube Screamer into a cooking Marshall is a completely different animal than a Tube Screamer in the effects loop of that same Marshall. In the loop, it sounds thin and fizzy because it's not interacting with the preamp tubes.</p>
<p>One classic exception: fuzz pedals. Most vintage-style fuzzes (Fuzz Face, Tone Bender) are extremely sensitive to input impedance. They want to see your guitar pickups directly — no buffers, no other pedals between them and your guitar. If your fuzz sounds thin or splattery, try moving it to the very front of your chain, before even the tuner.</p>`,
      },
      {
        heading: 'Pedals That Belong in the Effects Loop',
        headingLevel: 2,
        content: `<p>The loop rule is equally simple: anything that processes the overall character of your sound — its placement in space, its volume, its time-based repetitions — sounds better after the preamp has already shaped the tone.</p>
<h3>Delay</h3>
<p>This is the big one. Put a delay pedal in front of a high-gain amp and each repeat gets re-distorted by the preamp. The first repeat is crunchy, the second is muddier, the third is a wall of fizz. It sounds terrible with anything more than edge-of-breakup gain. Put that same delay — a Strymon Timeline, Boss DD-500, or even a simple MXR Carbon Copy — in the effects loop, and each repeat stays clean and defined because it's hitting the power amp directly, bypassing all that preamp distortion.</p>
<p>If you play clean, delay in front of the amp is fine. David Gilmour ran delays in front for decades. But the moment you're stacking gain, move it to the loop.</p>
<h3>Reverb</h3>
<p>Same logic as delay. Reverb creates a wash of ambient sound, and you don't want that wash getting chewed up by preamp distortion. A Strymon BigSky or Source Audio Ventris in the effects loop sounds spacious and three-dimensional. In front of a dirty amp, it sounds like you're playing inside a dumpster. Spring reverb built into the amp is a different story — that's part of the amp's design and sits exactly where it needs to.</p>
<h3>Modulation (Sometimes)</h3>
<p>Chorus, flanger, phaser, tremolo — these are the pedals where you actually have a choice and it's a legitimate taste call. A chorus in front of a clean amp sounds amazing (think Andy Summers). A phaser in front of a dirty amp can sound incredible (think Eddie Van Halen's MXR Phase 90). But if you're running heavy gain, modulation in the loop usually sounds more defined and less muddy.</p>
<p>My general recommendation: if you play with medium to high gain most of the time, put modulation in the loop. If you're mostly clean with occasional crunch, front of amp is great.</p>
<h3>Volume Pedals (for swells)</h3>
<p>If you use a volume pedal for swells — like an Ernie Ball VP Jr — it can go in the loop to control your overall volume without changing how hard you're hitting the preamp. In front of the amp, a volume pedal acts more like your guitar's volume knob, which can be useful too. It depends on what you're using it for.</p>`,
      },
      {
        heading: 'The Standard Signal Chain Template',
        headingLevel: 2,
        content: `<p>Here's the order we use as a starting point for almost every <a href="/book">custom build</a> at The Rig Doctor. It's not the only way, but it works for 90% of players:</p>
<p><strong>Front of amp:</strong></p>
<ol>
<li>Tuner</li>
<li>Wah / envelope filter</li>
<li>Compressor</li>
<li>Overdrive / distortion (low gain to high gain, stacked)</li>
<li>Fuzz (or first in chain if vintage-style)</li>
<li>Pitch effects (Whammy, POG — some players prefer these earlier)</li>
</ol>
<p><strong>Effects loop:</strong></p>
<ol>
<li>Modulation (chorus, flanger, phaser, tremolo)</li>
<li>Delay</li>
<li>Reverb</li>
</ol>
<p>This template gives you the cleanest foundation. From there, you can experiment — swap the compressor and the wah if you want a more consistent sweep, move a phaser before your drives for that Van Halen thing, put a clean boost at the end of your front-of-amp chain to push the preamp harder. The "rules" are really just guidelines for what sounds good most of the time.</p>`,
      },
      {
        heading: 'Common Mistakes That Wreck Your Tone',
        headingLevel: 2,
        content: `<p>After 17 years of building rigs, I've seen the same mistakes over and over. Here are the ones that come up in almost every <a href="/tone-tutoring">Tone Tutoring session</a>:</p>
<ul>
<li><strong>Delay before heavy gain:</strong> Already covered this, but it bears repeating. If your delays sound like mush, this is almost certainly the problem.</li>
<li><strong>Reverb before dirt:</strong> Same idea. You're distorting the reverb tails. It sounds awful.</li>
<li><strong>Buffer-sensitive fuzz in the wrong spot:</strong> That germanium Fuzz Face sounds amazing when it sees your guitar pickups directly. Put a Boss tuner (which has a buffer) in front of it and it loses all its grit and character. Either move the fuzz to the front or get a true-bypass tuner.</li>
<li><strong>Ignoring impedance mismatches:</strong> Some effects loops are designed for line-level signals, and some pedals output instrument-level. If your loop has a level switch, use it. If your pedals sound too quiet or too harsh in the loop, this is probably why.</li>
<li><strong>Running too many pedals in a series loop:</strong> Every pedal in the loop adds a tiny bit of signal loss. If you've got 6 pedals in the loop and your tone sounds dull, consider a loop switcher or trimming down what's in there.</li>
</ul>`,
      },
      {
        heading: 'What About Amp Modelers and Multi-Effects?',
        headingLevel: 2,
        content: `<p>If you're running a Kemper, Axe-FX, Helix, or Quad Cortex, the effects loop question doesn't apply the same way — those units let you place effects anywhere in a virtual signal chain. But the same principles hold: put your gain blocks before your delay and reverb blocks. Put your wah before your drives. The physics of sound processing doesn't change just because the processing is digital.</p>
<p>Where it gets interesting is when you use a modeler as the hub of a hybrid rig — running real pedals into the modeler's loops alongside amp models. We've built a bunch of rigs like this, and the routing gets complex fast. That's exactly the kind of build where having someone who's done it 200+ times makes a real difference.</p>`,
      },
      {
        heading: 'Still Not Sure Where Something Goes?',
        headingLevel: 2,
        content: `<p>Look — if you've read this far and you're still second-guessing where your specific pedals should go, that's totally normal. Every rig is different. The "right" answer depends on your amp, your gain level, your playing style, and the specific pedals you own. A Strymon Mobius might sound perfect in your loop but weird in mine because our amps respond differently.</p>
<p>That's what we're here for. Whether you want someone to <a href="/book">build the whole rig from scratch</a> or you just want a 60-minute session where we walk through your specific setup and get everything dialed, we've got you covered.</p>`,
      },
    ],
    cta: {
      text: 'Book a Consultation',
      href: '/book',
      label: 'Book a free consultation to get your signal chain sorted',
    },
  },

  // ─────────────────────────────────────────────
  // 2. Why Your Pedalboard Hums
  // ─────────────────────────────────────────────
  {
    slug: 'pedalboard-hum-noise-fix',
    title: 'Why Your Pedalboard Hums (And How to Fix It)',
    description:
      'Tracking down pedalboard hum, buzz, and noise. Learn how to diagnose ground loops, power supply issues, and cable problems — and fix them without replacing everything.',
    publishedAt: '2026-06-04',
    author: 'Jacob Charendoff',
    readTime: '9 min read',
    category: 'Troubleshooting',
    tags: ['noise', 'hum', 'ground loop', 'power supply', 'troubleshooting'],
    sections: [
      {
        heading: 'Every Noise Tells a Story',
        headingLevel: 2,
        content: `<p>Before you rip your pedalboard apart and start swapping cables at random, stop. Listen to the noise. I mean actually listen to it. Because different noises have different causes, and if you can identify the type of noise, you can skip straight to the fix instead of burning an entire Saturday playing process of elimination.</p>
<p>There are really only four categories of unwanted noise on a pedalboard: <strong>60-cycle hum</strong> (a low, steady buzz that follows the AC power frequency), <strong>high-frequency whine</strong> (a thin, piercing noise that changes pitch when you tap on pedals or adjust knobs), <strong>hiss</strong> (a constant "shhhh" that gets louder as you add gain), and <strong>intermittent crackle or pop</strong> (random noise that comes and goes, often when you move cables or stomp). Each one points to a specific problem, and each one has a specific fix.</p>
<p>I've debugged noise on hundreds of pedalboards — from bedroom rigs with three pedals to touring rigs with 20+ and full MIDI switching. The causes are almost always the same handful of culprits. Let's go through them.</p>`,
      },
      {
        heading: '60-Cycle Hum: The Ground Loop Problem',
        headingLevel: 2,
        content: `<p>That low, constant "mmmmmmm" at 60Hz (or 50Hz if you're in Europe/UK) is almost always a ground loop. A ground loop happens when two or more pieces of gear are grounded through different paths, creating a loop in the ground wiring that acts like an antenna for electromagnetic interference.</p>
<p>The most common scenario: your amp is plugged into one outlet and your pedalboard's power supply is plugged into another outlet on a different circuit. Those two circuits have slightly different ground potentials, and that difference creates current flow through your audio cables' ground shields. That current gets induced into the signal, and you hear it as hum.</p>
<p><strong>Fix #1 — Same outlet.</strong> Plug your amp and your pedalboard power supply into the same power strip or the same outlet. This is free, takes 10 seconds, and fixes ground loops about 60% of the time.</p>
<p><strong>Fix #2 — Isolated power supply.</strong> If you're running a daisy chain or a non-isolated power supply, each pedal that shares a ground connection is a potential ground loop path. An isolated supply like a CIOKS DC7, Strymon Zuma, or Voodoo Lab Pedal Power 3 Plus gives each output its own isolated ground. This eliminates pedal-to-pedal ground loops entirely. We use CIOKS on almost every <a href="/book">custom build</a> for exactly this reason.</p>
<p><strong>Fix #3 — Ground lift.</strong> Some pedals (especially those with stereo I/O or digital connections) have a ground lift switch. Try it. If it kills the hum, you found your loop. If you don't have a ground lift switch, an audio isolation transformer like the Ebtech Hum Eliminator can break the loop without cutting ground safety.</p>
<p><strong>What NOT to do:</strong> Never use a ground lift adapter (the three-prong to two-prong cheater plug) on your amp. That removes the safety ground, and if something goes wrong inside the amp, the chassis can become live at 120 volts. People have been electrocuted on stage doing this. Don't.</p>`,
      },
      {
        heading: 'High-Frequency Whine: Digital Noise Bleed',
        headingLevel: 2,
        content: `<p>A thin, high-pitched whine — sometimes described as "mosquito buzz" or "digital hash" — usually comes from digital pedals bleeding clock noise into the power rail. Every digital pedal has an internal clock that runs at a specific frequency (typically in the MHz range), and if the power supply doesn't properly isolate that pedal, the clock noise rides the DC power into your analog pedals, which then amplify it.</p>
<p>The worst offenders tend to be older digital delays and multi-effects that draw significant current — things like the Line 6 DL4 (the original, not the MkII), some TC Electronic pedals, and cheap digital reverbs. Modern pedals are generally better about power filtering, but the problem hasn't gone away entirely.</p>
<p><strong>Fix #1 — Isolate the noisy pedal.</strong> Move the digital pedal to its own isolated output on your power supply. If you're on a daisy chain, this is your sign to upgrade. One digital pedal on a shared daisy chain can inject noise into every other pedal on that chain.</p>
<p><strong>Fix #2 — Check current draw.</strong> If a digital pedal isn't getting enough current, its internal voltage regulators can oscillate and produce whine. Check the pedal's specs — if it draws 300mA and you've got it on a 100mA output, that's your problem. The Strymon pedals (Timeline, BigSky, Mobius) each draw 300mA and need a 9V output that can supply at least that. Underpowering them creates noise.</p>
<p><strong>Fix #3 — Add a filter.</strong> A small ferrite choke on the power cable to the noisy pedal can attenuate high-frequency noise. You can buy clip-on ferrite beads for a couple bucks. It won't eliminate the problem entirely, but it can knock the whine down to an acceptable level.</p>`,
      },
      {
        heading: 'Hiss: The Gain Staging Problem',
        headingLevel: 2,
        content: `<p>Hiss is different from hum. Hiss is broadband noise — it covers the whole frequency spectrum and sounds like white noise or an untuned TV. Some hiss is unavoidable in any analog system. But if your rig hisses more than it should, the problem is almost always gain staging.</p>
<p>Every pedal in your chain adds a tiny bit of noise floor. When you stack gain — running a boost into an overdrive into a dirty amp — you're amplifying each pedal's noise floor along with your guitar signal. If one pedal in the chain has its output cranked but the next pedal has its input padded down, you're amplifying noise just to throw it away. That's bad gain staging.</p>
<p><strong>Fix #1 — Unity gain through the chain.</strong> Turn off all your pedals, play through your clean amp, and note the volume. Now turn on each pedal one at a time and adjust its level so the volume stays roughly the same when engaged. You want each pedal to be at unity gain (same volume on and off) unless you're deliberately using it as a boost.</p>
<p><strong>Fix #2 — Reduce gain, increase volume.</strong> A lot of players crank the gain knob on their overdrive and turn the volume down. Flip that. Lower gain and higher volume gives you the same perceived distortion with way less noise. The gain knob on a Tube Screamer or a Klon doesn't just add distortion — it adds noise. Use only as much gain as you actually need.</p>
<p><strong>Fix #3 — Noise gate.</strong> If you've optimized your gain staging and it's still too hissy (which happens with very high-gain tones), a noise gate like the ISP Decimator II or Boss NS-2 can clean things up. Put it after your last drive pedal, before your modulation and time effects. Set the threshold just high enough to kill the noise when you're not playing, but low enough that it doesn't chop off your sustain. The Decimator II is particularly good because it uses a downward expander rather than a hard gate, so it sounds natural.</p>`,
      },
      {
        heading: 'Crackle and Pop: Cable and Connection Issues',
        headingLevel: 2,
        content: `<p>Intermittent noise — pops, crackles, and scratchy sounds that come and go — is almost always a physical connection problem. A cold solder joint in a patch cable, a dirty jack on a pedal, a loose power connector, or a cable with a broken shield that only makes contact when it's in a certain position.</p>
<p><strong>The wiggle test:</strong> With your rig on and at moderate volume, gently wiggle each cable at each connection point. Start at the guitar and work your way through every patch cable, every power cable, every connection. When you hear a crackle, you've found the problem cable or jack.</p>
<p><strong>Fix #1 — Replace cheap patch cables.</strong> Bargain patch cables are the number one cause of intermittent noise on pedalboards. The solder joints fail, the connectors corrode, and the shielding breaks down. This is why we hand-solder <a href="/shop">Mogami cables</a> with Squareplug connectors on every build. Mogami's OFC (oxygen-free copper) shielding provides 95%+ coverage, and a proper solder joint doesn't fail.</p>
<p><strong>Fix #2 — Clean your jacks.</strong> A can of DeoxIT D5 and a pipe cleaner will fix most scratchy connections. Spray a tiny amount onto the pipe cleaner (not directly into the jack), insert it, twist it a few times, and let it dry. Do this to every input and output jack on every pedal once a year.</p>
<p><strong>Fix #3 — Check power connectors.</strong> Those barrel connectors on your DC power cables can work loose over time, especially on a gigging board that gets bumped around. A loose power connection causes intermittent power drops, which sound like random pops and volume dips. Make sure every barrel connector is seated firmly. If they're loose, a tiny wrap of electrical tape can add enough friction to keep them in place — or better yet, use right-angle connectors that lock in more securely.</p>`,
      },
      {
        heading: 'The Isolation Test: Finding the Culprit',
        headingLevel: 2,
        content: `<p>If you've listened to your noise and you're still not sure what's causing it, here's the systematic approach I use in the shop:</p>
<ol>
<li><strong>Guitar straight into amp.</strong> Is there noise? If yes, the problem is the guitar (pickups, wiring, output jack) or the amp. Fix that first before touching the pedalboard.</li>
<li><strong>Add one pedal at a time.</strong> Guitar → pedal → amp. Engage the pedal. Listen. Is the noise there? If not, bypass it and add the next pedal in the chain. Keep going until the noise appears.</li>
<li><strong>Swap the power.</strong> When you find the noisy pedal, try powering it with a battery (if it takes one) or a different power supply output. If the noise goes away, it's a power issue. If it stays, the pedal itself has a problem.</li>
<li><strong>Swap the cables.</strong> If the noise persists, swap the patch cables going in and out of the suspect pedal. If the noise goes away, the cable was the problem.</li>
</ol>
<p>This process takes 20-30 minutes for a typical board. It's boring. It's tedious. But it works every single time. If you want to skip the detective work, that's literally what our <a href="/tone-tutoring">Tone Tutoring sessions</a> are for — we'll walk through it together over video and find the problem in real time.</p>`,
      },
      {
        heading: 'Prevention: Building a Quiet Board from Day One',
        headingLevel: 2,
        content: `<p>The best noise fix is never having noise in the first place. Here's what we do on every build at The Rig Doctor to keep things silent:</p>
<ul>
<li><strong>Isolated power supply (CIOKS DC7 or Strymon Zuma)</strong> — eliminates ground loops between pedals entirely.</li>
<li><strong>Hand-soldered Mogami cables</strong> — 95%+ shield coverage, reliable solder joints, zero intermittent connections.</li>
<li><strong>Proper cable routing</strong> — audio cables and power cables run in separate paths on the board, never crossed or bundled together. Parallel runs of signal and power cables can induce noise through electromagnetic coupling.</li>
<li><strong>Correct current ratings</strong> — every pedal gets a power output that matches or exceeds its current draw. No underpowering, no shared outputs for high-draw pedals.</li>
<li><strong>Cable length management</strong> — cables are cut to the exact length needed. No excess cable coiled up under the board acting as an antenna.</li>
</ul>
<p>It's not glamorous work, but it's the difference between a board that hums and buzzes at every gig and one that's dead silent until you hit a string. If you're fighting noise and you're tired of chasing it, <a href="/book">let's talk about a proper build</a>.</p>`,
      },
    ],
    cta: {
      text: 'Book a Consultation',
      href: '/book',
      label: 'Book a free consultation to get your pedalboard noise sorted',
    },
  },

  // ─────────────────────────────────────────────
  // 3. MIDI Pedalboard Switching Guide
  // ─────────────────────────────────────────────
  {
    slug: 'midi-pedalboard-switching-guide',
    title: 'MIDI Pedalboard Switching: A Setup Guide for Guitarists',
    description:
      'Everything you need to know about MIDI switching on a pedalboard — from choosing a controller to programming presets. Real-world advice from 200+ rig builds.',
    publishedAt: '2026-06-04',
    author: 'Jacob Charendoff',
    readTime: '9 min read',
    category: 'Guides',
    tags: ['MIDI', 'switching', 'RJM', 'Boss ES-8', 'Morningstar', 'pedalboard'],
    sections: [
      {
        heading: 'MIDI Isn\'t Just for Keyboard Players',
        headingLevel: 2,
        content: `<p>MIDI on a pedalboard sounds intimidating until you understand what it actually does: it sends simple messages that tell your pedals what to do. That's it. A MIDI Program Change message says "switch to preset 47." A MIDI Control Change message says "turn this parameter to this value." It's not rocket science — it's a remote control for your gear.</p>
<p>The reason MIDI matters on a pedalboard is tap dancing. If you've ever played a gig where you had to stomp on three pedals simultaneously to go from your clean tone to your lead tone — and missed one — you know the problem. MIDI lets you hit one button and have every pedal on your board switch to exactly the right preset at exactly the same time. One stomp, done.</p>
<p>I've built MIDI-controlled rigs for touring artists who need to recall 80+ tones per set and for home players who just want four sounds they can switch between cleanly. The complexity scales to your needs. But the core concept is the same whether you have three MIDI pedals or fifteen.</p>`,
      },
      {
        heading: 'What You Need: The Core Components',
        headingLevel: 2,
        content: `<p>A MIDI pedalboard setup has three main components:</p>
<h3>1. MIDI Controller</h3>
<p>This is the brain — the foot controller that sends MIDI messages to everything else. Your main options:</p>
<ul>
<li><strong>Morningstar MC6 / MC8:</strong> The gold standard for guitarist-focused MIDI controllers. Small footprint, incredibly deep programming capabilities, and the community support is outstanding. The MC6 gives you 6 switches in a compact enclosure. The MC8 gives you 8 switches plus expression input. I put Morningstars on more rigs than anything else.</li>
<li><strong>RJM Mastermind PBC/6X:</strong> The PBC (Pedalboard Controller) is a combined MIDI controller and audio loop switcher in one unit. If you want MIDI control and true-bypass audio switching without separate units, RJM is the way to go. Expensive, but the integration is seamless.</li>
<li><strong>Boss ES-5 / ES-8:</strong> Boss's loop switchers with built-in MIDI output. The ES-8 gives you 8 audio loops plus MIDI, the ES-5 gives you 5 loops in a smaller footprint. Solid, reliable, very Boss — meaning it just works but the programming interface is menu-divey.</li>
</ul>
<h3>2. MIDI-Compatible Pedals</h3>
<p>Not every pedal speaks MIDI. You need pedals with a MIDI input — either a 5-pin DIN connector or a 3.5mm TRS jack (the newer standard). Pedals from Strymon, Boss (500 series), Source Audio, Empress, Meris, Chase Bliss, and many others accept MIDI. Each pedal needs to be set to its own MIDI channel (1-16) so the controller can talk to them individually.</p>
<h3>3. MIDI Cables</h3>
<p>Traditional 5-pin DIN cables or 3.5mm TRS cables, depending on your gear. Many modern pedals use the smaller TRS standard, and you can get DIN-to-TRS adapters. Cable runs should be as short as practical — MIDI is a serial protocol and long runs can cause timing issues, though in practice anything under 50 feet is fine for a pedalboard.</p>`,
      },
      {
        heading: 'MIDI Messages Explained (Without the Nerd Speak)',
        headingLevel: 2,
        content: `<p>You only need to understand two types of MIDI messages for pedalboard use:</p>
<p><strong>Program Change (PC):</strong> "Switch to this preset." You send PC #3 on Channel 1 to your Strymon Timeline, and it loads preset 3. You send PC #12 on Channel 2 to your BigSky, and it loads preset 12. Each pedal listens on its own channel and responds to the PC number by loading the corresponding preset. Most MIDI-capable pedals store 100+ presets.</p>
<p><strong>Control Change (CC):</strong> "Set this parameter to this value." CC messages are more granular — they can turn a pedal on/off, set a specific knob position, tap a tempo, toggle a function. For example, CC #102 with a value of 127 on Channel 1 might engage the Timeline, while CC #102 with value 0 bypasses it. CC #93 with value 64 might set the mix knob to 50%. The specific CC numbers and their functions vary by pedal manufacturer — you'll need to check each pedal's MIDI implementation chart.</p>
<p>A typical preset on your MIDI controller sends a batch of messages all at once: PC #5 on Ch 1 (Timeline loads a dotted-eighth delay), PC #22 on Ch 2 (BigSky loads a plate reverb), CC #102 value 127 on Ch 3 (Mobius chorus engaged), CC #102 value 0 on Ch 4 (Empress Tremolo bypassed). One stomp, four pedals do exactly what you need.</p>`,
      },
      {
        heading: 'Setting Up Your First MIDI Rig: Step by Step',
        headingLevel: 2,
        content: `<p>Let's walk through a practical setup with a Morningstar MC6 controlling a Strymon Timeline, BigSky, and Boss MD-500:</p>
<p><strong>Step 1: Assign MIDI channels.</strong> On the Timeline, go to the MIDI settings and set it to Channel 1. BigSky gets Channel 2. MD-500 gets Channel 3. Every pedal must be on a unique channel.</p>
<p><strong>Step 2: Connect the MIDI chain.</strong> MIDI Out from the MC6 goes to MIDI In on the first pedal. MIDI Thru (or MIDI Out, if the pedal has one) on that pedal goes to MIDI In on the next pedal. Daisy-chain them all. If you have more than 4-5 pedals in a MIDI chain, consider a MIDI thru box (like the MIDI Solutions Quadra Thru) to avoid signal degradation.</p>
<p><strong>Step 3: Program presets on each pedal.</strong> Before you touch the MIDI controller, set up your sounds on each pedal and save them to preset slots. Timeline preset 1 = your main delay. Timeline preset 2 = your slapback. BigSky preset 1 = your ambient wash. Etc. Write it down. You'll need to know which preset number corresponds to which sound.</p>
<p><strong>Step 4: Program the MC6.</strong> Using the Morningstar editor (web-based, beautifully designed), program each switch on the MC6. Switch A = your clean tone. In the editor, add messages to Switch A: PC #0 Ch 1 (Timeline to preset 0 — off), PC #0 Ch 2 (BigSky to a subtle room reverb), CC #102 value 0 Ch 3 (MD-500 bypassed). Switch B = your rhythm tone. Different PC and CC messages. And so on.</p>
<p><strong>Step 5: Test everything.</strong> Step on each switch and verify every pedal responds correctly. If a pedal doesn't respond, check the MIDI channel assignment, check the cable, and make sure the pedal's MIDI implementation actually supports the message type you're sending.</p>`,
      },
      {
        heading: 'MIDI + Audio Loop Switching: The Pro Setup',
        headingLevel: 2,
        content: `<p>Here's where things get powerful. A MIDI controller can control your MIDI pedals, but what about your non-MIDI pedals? That $300 Analogman King of Tone doesn't have MIDI. Neither does your vintage MXR Phase 90 or your Fulltone OCD.</p>
<p>The answer is an audio loop switcher — a device like the Boss ES-8, RJM PBC, GigRig G3, or even the simpler Joyo PXL series. These put each non-MIDI pedal in its own audio loop that can be switched on and off via MIDI (or built-in presets). So your MIDI controller sends a message to the loop switcher saying "engage loops 1, 3, and 5" — and suddenly your King of Tone, Phase 90, and delay are all on, while everything else is bypassed.</p>
<p>This is the setup we build most often at The Rig Doctor. A Morningstar MC6 or MC8 controlling a mix of MIDI pedals directly and non-MIDI pedals through a loop switcher. It gives you total control of your entire board — MIDI and non-MIDI — from one foot controller. One stomp, every pedal on the board does exactly what you need.</p>
<p>The wiring gets complex — you've got MIDI cables, audio send/return cables for each loop, power for everything, and it all needs to be routed cleanly. This is honestly the biggest reason players come to us for <a href="/book">custom builds</a>. The physical layout and cable management of a MIDI rig is a puzzle, and getting it wrong means noise, ground loops, and cables that pull loose.</p>`,
      },
      {
        heading: 'Expression Pedals and MIDI: Real-Time Control',
        headingLevel: 2,
        content: `<p>MIDI isn't just about preset recall — it's also about real-time control via expression pedals. Most MIDI controllers have expression pedal inputs that convert the sweep of an expression pedal into continuous CC messages. This means you can use one expression pedal to control any parameter on any MIDI pedal on your board.</p>
<p>Want your expression pedal to control the mix on your reverb? Map it to the reverb's mix CC. Want the same expression pedal to simultaneously control the feedback on your delay and the rate on your chorus? Map it to multiple CCs on multiple channels. The Morningstar controllers make this incredibly easy — you can have different expression mappings per preset, so your expression pedal does different things depending on which sound you're on.</p>
<p>This is the kind of thing that sounds complicated on paper but feels completely natural once it's set up. You just move your foot and the sound morphs exactly the way you want. No tap dancing, no reaching down to twist knobs, no breaking the flow of the performance.</p>`,
      },
      {
        heading: 'Common MIDI Pitfalls (And How to Avoid Them)',
        headingLevel: 2,
        content: `<p>After wiring up hundreds of MIDI rigs, here are the mistakes I see most often:</p>
<ul>
<li><strong>Duplicate MIDI channels:</strong> Two pedals on the same channel means both respond to every message. Always double-check that each pedal has a unique channel.</li>
<li><strong>Wrong cable type:</strong> Some pedals use "Type A" TRS MIDI wiring, others use "Type B." They're not compatible without an adapter. Strymon, Boss, and Empress use Type A. Make and Chase Bliss use Type B. Check before you buy cables.</li>
<li><strong>Not saving presets properly:</strong> You program a great sound on your delay, set up the MIDI, test it, it works. Then the next day it's gone because you forgot to save the preset on the pedal itself. Always save twice — once on the pedal, once in the MIDI controller.</li>
<li><strong>MIDI timing issues:</strong> If you notice that one pedal switches slightly later than the others, it might be at the end of a long MIDI chain. A MIDI thru box or using the controller's multiple MIDI outputs (if it has them) can solve this.</li>
<li><strong>Over-engineering:</strong> Not every rig needs MIDI. If you have 5 pedals and you only switch between clean and dirty, a simple true-bypass loop switcher without MIDI is simpler and cheaper. MIDI shines when you need 4+ distinct tones with multiple pedal changes per song.</li>
</ul>`,
      },
      {
        heading: 'Is MIDI Right for Your Rig?',
        headingLevel: 2,
        content: `<p>MIDI makes sense if you hit more than two pedals between songs (or within songs), if you play sets with a lot of tonal variety, or if you're tired of tap dancing and occasionally missing a stomp. It doesn't make sense if you turn on your drive pedal at the start of the set and leave it on all night.</p>
<p>If you're curious but not sure where to start, a <a href="/tone-tutoring">Tone Tutoring session</a> is a great way to figure out whether MIDI is right for your rig and, if so, what components you'd need. We'll look at your current setup, talk about what you're trying to achieve, and map out a plan — no pressure, no upsell, just honest advice from someone who's built this stuff for 17 years.</p>
<p>And if you already know you want a MIDI rig and you don't want to spend three weekends wiring it yourself, <a href="/book">that's what we do</a>. We'll build it, program it, test it, and hand it to you ready to gig.</p>`,
      },
    ],
    cta: {
      text: 'Book a Consultation',
      href: '/book',
      label: 'Book a consultation to plan your MIDI pedalboard setup',
    },
  },

  // ─────────────────────────────────────────────
  // 4. Custom Pedalboard Build vs DIY
  // ─────────────────────────────────────────────
  {
    slug: 'custom-pedalboard-build-vs-diy',
    title: 'Custom Pedalboard Build vs DIY: When Does It Make Sense to Hire a Pro?',
    description:
      'An honest look at what you get from a professional pedalboard build that you can\'t easily replicate yourself — and when DIY is the smarter move.',
    publishedAt: '2026-06-04',
    author: 'Jacob Charendoff',
    readTime: '8 min read',
    category: 'Insights',
    tags: ['custom build', 'DIY', 'professional', 'pedalboard wiring'],
    sections: [
      {
        heading: 'I\'m Not Going to Tell You That DIY Is Bad',
        headingLevel: 2,
        content: `<p>Let's get this out of the way: I built pedalboards for a living, and I'm still going to be honest with you. If you have four pedals, a One Spot daisy chain, and a Pedaltrain Nano — you don't need a professional build. Strap your pedals down, run some patch cables, plug in, and go play. Spend the money on a lesson or a better overdrive.</p>
<p>DIY makes total sense for simple setups. It's fun, it's educational, and the stakes are low. If you wire something wrong, the worst that happens is some noise or a dead signal that you can troubleshoot in 10 minutes. There's real value in understanding your own rig, and the best way to learn is to build one.</p>
<p>But there's a point where DIY stops being fun and starts being a time-sucking, tone-killing headache. That point is different for everyone, but after building 200+ rigs, I've gotten pretty good at identifying it. Let me tell you what I see when a player brings in a board they've been fighting with for months.</p>`,
      },
      {
        heading: 'Where DIY Starts Falling Apart',
        headingLevel: 2,
        content: `<p>The complexity curve on pedalboard builds isn't linear — it's exponential. Going from 4 pedals to 8 pedals doesn't double the complexity; it quadruples it. Here's why:</p>
<ul>
<li><strong>Cable management:</strong> 4 pedals need 3 patch cables. 8 pedals need 7 patch cables plus power cables for each one. That's 15 cables on a board that's maybe 24 inches wide. If those cables are all different lengths and they're running wherever they fit, you've got a rat's nest that induces noise, catches on things, and makes it impossible to troubleshoot anything.</li>
<li><strong>Power requirements:</strong> Your One Spot handled four analog pedals fine. Now you've added a Strymon Timeline (300mA at 9V), a Source Audio Ventris (250mA at 9V), and a Boss MD-500 (200mA at 9V). The One Spot is maxed out, the digital pedals are sharing ground with your analog drives, and suddenly you've got hum, whine, and intermittent noise that you can't track down. You need an isolated power supply, and you need to calculate current draw for every output.</li>
<li><strong>Signal routing:</strong> Once you add an effects loop, a loop switcher, MIDI, stereo pedals, or any combination of those, the signal routing becomes a genuine engineering problem. "Where does this cable go?" becomes "What is the impedance of this effects loop, and will my pedal's output buffer drive it properly?"</li>
</ul>
<p>I'm not saying you can't figure this stuff out yourself. You absolutely can. But it takes time — a lot of time. The average player who emails us has already spent 20-40 hours on a build that still has problems. At some point, your time has value too.</p>`,
      },
      {
        heading: 'What a Professional Build Actually Includes',
        headingLevel: 2,
        content: `<p>When you hire someone to build your board, you're not just paying for assembly. Here's what goes into every build at The Rig Doctor, starting at $999.99:</p>
<p><strong>Consultation and planning.</strong> We talk through your playing style, your gig requirements, your pedals, your amp, and your budget. We design the layout before we touch a soldering iron. This includes signal chain order, power supply sizing, cable routing, and ergonomic pedal placement (the stuff you stomp the most goes where your foot naturally falls).</p>
<p><strong>Custom cables.</strong> Every patch cable is hand-soldered with Mogami wire and Squareplug or Switchcraft connectors, cut to the exact length needed. No excess cable, no strain on connectors, no signal degradation from cheap copper. A custom cable that's exactly 6 inches sounds better and lasts longer than a generic 12-inch cable with excess stuffed under the board.</p>
<p><strong>Clean power design.</strong> We calculate the current draw of every pedal and match it to the right power supply outputs. High-draw digital pedals get isolated, high-current outputs. Analog pedals get clean, filtered power. We use CIOKS and Strymon Zuma power supplies because they actually deliver what they spec — no sag, no noise, no voltage drop under load.</p>
<p><strong>Cable routing and management.</strong> Audio and power cables are separated and routed in clean channels under the board. Nothing crosses. Nothing bundles. Every cable is secured with proper strain relief so nothing pulls loose when you pick up the board or throw it in a road case.</p>
<p><strong>Testing.</strong> Every build gets tested for signal integrity, noise floor, power stability, and switching reliability before it leaves the shop. We measure the noise floor with an audio analyzer, not just our ears. If it's not silent, it's not done.</p>`,
      },
      {
        heading: 'The Cost Comparison Nobody Does Honestly',
        headingLevel: 2,
        content: `<p>Let's do some real math on a mid-complexity board — 10 pedals with an isolated power supply, MIDI switching, and effects loop integration.</p>
<p><strong>DIY costs:</strong></p>
<ul>
<li>Pedalboard frame (Pedaltrain Classic 2): ~$200</li>
<li>Patch cables (10 pre-made, decent quality): ~$120-150</li>
<li>Power supply (CIOKS DC7): ~$300</li>
<li>Power cables and adapters: ~$50-80</li>
<li>MIDI cables: ~$40-60</li>
<li>Mounting supplies, cable management: ~$30-50</li>
<li>Your time: 20-40 hours (conservatively)</li>
</ul>
<p>You're looking at $740-840 in parts alone, plus your time. And if you buy cheap patch cables that fail, you'll end up replacing them anyway.</p>
<p><strong>Professional build costs:</strong></p>
<ul>
<li>Our builds start at $999.99 and typically land between $1,200-1,800 for a board this size, including all custom cables, cable management, power distribution, and testing.</li>
</ul>
<p>The difference isn't as dramatic as people assume — maybe $400-800 on top of what you'd spend anyway, except you get hand-soldered Mogami cables instead of pre-made generics, professional power distribution instead of "I think this is right," and a rig that's tested and guaranteed to be quiet. Plus those 20-40 hours back.</p>
<p>If your time is worth $20/hour (and if you're a working musician, it's worth more than that), the math basically breaks even.</p>`,
      },
      {
        heading: 'The Stuff You Can\'t See: What Goes Wrong in DIY Builds',
        headingLevel: 2,
        content: `<p>When someone brings a DIY board to us because "something isn't right," the problems are almost never obvious. They're the invisible stuff — the things you don't know to check because you've never built 200 boards before.</p>
<p><strong>Impedance mismatches:</strong> Running a pedal designed for instrument-level signal into an amp's effects loop that expects line-level (or vice versa). The volumes are wrong, the EQ response changes, and the noise floor goes up. Most players don't even know their effects loop has a level setting.</p>
<p><strong>Phase issues:</strong> Running stereo effects or parallel signal paths without checking phase alignment. Your dry signal and wet signal arrive at the amp slightly out of phase, causing comb filtering — a thin, hollow tone that sounds like your guitar is in a tin can. We check phase on every stereo build with a reference signal and an oscilloscope. That's not a tool most players have in their garage.</p>
<p><strong>Thermal design:</strong> Mounting a power supply directly under a heat-generating digital pedal, or packing pedals so tightly that there's no airflow. At home this might be fine. On a hot outdoor stage in August, components start to drift, regulators start to struggle, and you get intermittent failures that only happen at gigs — the worst kind of problem to diagnose.</p>
<p><strong>Connector stress:</strong> Patch cables routed with sharp bends, power cables under tension, jacks that are being pushed sideways by tight cable runs. These connections work perfectly for weeks or months, then fail at the worst possible moment because metal fatigue finally cracked a solder joint. We route everything with gentle curves and service loops specifically to prevent this.</p>
<p>None of these are things you'd find in a YouTube tutorial. They're the kind of knowledge that only comes from building board after board and seeing what fails six months later.</p>`,
      },
      {
        heading: 'When DIY Is the Right Call',
        headingLevel: 2,
        content: `<p>I'll be straight with you — here's when you should absolutely build it yourself:</p>
<ul>
<li><strong>Simple setups (1-5 pedals):</strong> A tuner, two drives, a delay, and a reverb on a small board. This takes 30 minutes and there's not much to get wrong.</li>
<li><strong>You're learning:</strong> If you want to understand signal flow, soldering, and troubleshooting, building your own board is the best education. Just accept that the first one won't be perfect.</li>
<li><strong>You change your board constantly:</strong> If you're swapping pedals every other week, a professional build doesn't make as much sense because those custom-length cables won't fit the new layout. Better to use adjustable patch cables and a simple setup you can modify easily.</li>
<li><strong>Budget is extremely tight:</strong> If a professional build means you can't afford the pedals you need, prioritize the pedals. You can always get the board built later when the budget allows.</li>
</ul>`,
      },
      {
        heading: 'When You Should Hire a Pro',
        headingLevel: 2,
        content: `<p>And here's when DIY becomes more trouble than it's worth:</p>
<ul>
<li><strong>More than 8 pedals:</strong> The complexity is real. Cable management alone becomes a significant challenge.</li>
<li><strong>MIDI integration:</strong> If you're running a MIDI controller with a loop switcher and multiple MIDI-capable pedals, the routing and programming can eat entire weekends.</li>
<li><strong>Stereo rigs:</strong> Running stereo doubles your cable count and adds phase considerations that are easy to get wrong.</li>
<li><strong>Gigging/touring reliability:</strong> If your rig needs to work every single night without fail, a professionally built and tested board is insurance. A cable that fails at practice is an annoyance. A cable that fails at a paid gig is a disaster.</li>
<li><strong>You've tried and you're stuck:</strong> No shame in this. If your board has noise you can't find, switching issues you can't solve, or a layout that just doesn't work — that's exactly what we're here for.</li>
</ul>
<p>If any of those sound like you, <a href="/book">reach out and let's talk about a build</a>. We'll look at what you've got, figure out what you need, and give you an honest quote. If we think you can handle it yourself, we'll tell you that too.</p>`,
      },
    ],
    cta: {
      text: 'Start a Build',
      href: '/book',
      label: 'Get started on a custom pedalboard build',
    },
  },

  // ─────────────────────────────────────────────
  // 5. The Touring Musician's Pedalboard Checklist
  // ─────────────────────────────────────────────
  {
    slug: 'touring-pedalboard-checklist',
    title: "The Touring Musician's Pedalboard Checklist",
    description:
      'Everything your pedalboard needs to survive the road — from cable reliability to backup plans. A practical checklist from 17 years of building touring rigs.',
    publishedAt: '2026-06-04',
    author: 'Jacob Charendoff',
    readTime: '8 min read',
    category: 'Guides',
    tags: ['touring', 'gigging', 'reliability', 'road-ready', 'checklist'],
    sections: [
      {
        heading: 'Your Board Has to Work Every Night, Period',
        headingLevel: 2,
        content: `<p>There's a fundamental difference between a bedroom pedalboard and a touring pedalboard, and it's not about how many pedals you have or how much they cost. It's about reliability. When you're playing in your room and something cuts out, you troubleshoot it. When you're playing a show in front of 500 people and something cuts out, you have about 3 seconds before it becomes a problem that everyone in the room notices.</p>
<p>I've built rigs for touring artists who play 200+ shows a year. Their boards get thrown in vans, bounced on trailers, set up in venues with terrible power, played in 100-degree heat and freezing cold, and they have to sound perfect every single night. That's a different engineering challenge than "sounds good in my practice room."</p>
<p>This checklist covers everything I think about when building a road-ready rig. Use it whether you're about to go on a national tour or you just play local bar gigs every weekend. A reliable rig is a reliable rig.</p>`,
      },
      {
        heading: 'Power: The Foundation of Everything',
        headingLevel: 2,
        content: `<p>More rigs fail on the road because of power than any other single cause. Venue power is unpredictable — voltage sags, ground issues, circuits shared with lighting rigs, outlets that are barely code-legal. Your power setup needs to handle all of it.</p>
<ul>
<li><strong>Isolated power supply:</strong> Non-negotiable for touring. A CIOKS DC7, Strymon Zuma, or Voodoo Lab Pedal Power 3 Plus. Not a daisy chain, not a cheap multi-output that says "isolated" but isn't actually isolated (looking at you, every sub-$100 Amazon "isolated" supply).</li>
<li><strong>Correct voltage and current for every pedal:</strong> Check every output. That Strymon pedal needs 300mA at 9V. That vintage fuzz might need center-positive instead of center-negative. That digital multi-effect might need 12V. Mismatched power won't just cause noise — it can damage pedals.</li>
<li><strong>Surge protector or power conditioner:</strong> A Furman SS-6B power strip at minimum. Venue power spikes can fry pedals and power supplies. Twenty bucks for a Furman is cheap insurance compared to replacing a $400 delay pedal.</li>
<li><strong>Spare power supply:</strong> If you're on a real tour (multi-week, multi-city), bring a backup power supply. Even if it's a cheaper one that just gets you through a gig in an emergency. If your main supply dies on a Tuesday in Tulsa, Guitar Center might not have a CIOKS on the shelf.</li>
</ul>`,
      },
      {
        heading: 'Cables: Where Most Failures Happen',
        headingLevel: 2,
        content: `<p>A cable is a cable until it's not. The single most common point of failure on a touring pedalboard is a patch cable — a cold solder joint that worked fine for six months finally cracks from vibration, and suddenly your signal is gone or intermittent.</p>
<ul>
<li><strong>Quality patch cables:</strong> Hand-soldered Mogami or Evidence Audio cables with good connectors (Squareplug, Switchcraft, Neutrik). Pre-made cables from the big brands can be fine, but the solder joints are machine-done and the quality control isn't always there. We hand-solder every cable on our <a href="/book">builds</a> specifically because we can guarantee the joint quality.</li>
<li><strong>Strain relief on every connection:</strong> Cables should have a service loop — a little bit of slack at each connector so the cable isn't pulling directly on the solder joint. If a cable is so tight that it's putting tension on the connector, it will fail. It's just a matter of when.</li>
<li><strong>Spare cables in your gig bag:</strong> At minimum, carry two spare patch cables (the most common length on your board), one spare instrument cable, and one spare speaker cable if you're running a tube amp. Label them and know where they are so you can swap one in 30 seconds, not 5 minutes.</li>
<li><strong>Right-angle connectors:</strong> Flat-profile right-angle plugs (Squareplug SP400 or SP500) take up less space, sit lower on the board, and put less lateral stress on pedal jacks than straight plugs. This matters more than you think on a board that gets jostled constantly.</li>
</ul>`,
      },
      {
        heading: 'Physical Durability: Will It Survive the Van?',
        headingLevel: 2,
        content: `<p>Your pedalboard gets picked up, set down, stacked under gear, slid across stages, and occasionally dropped. The physical construction has to handle that.</p>
<ul>
<li><strong>Road case or padded bag:</strong> A Pedaltrain soft case is fine for local gigs. For touring, get a hard case — ATA-rated if possible. A good road case from Pedaltrain, SKB, or a custom builder protects against drops, stacking weight, and weather. It's the difference between "my board fell off the trailer and it's fine" and "my board fell off the trailer and three pedals are broken."</li>
<li><strong>Secure pedal mounting:</strong> Use professional-grade mounting that holds strong under road conditions. Your pedals should not come off unless you deliberately pull them. Cheap mounting solutions loosen over time, especially in heat.</li>
<li><strong>No loose components:</strong> Every cable, every power cable, every adapter should be secured to the board or routed through channels. Nothing should move when you pick up the board and shake it. If anything rattles or swings, it's going to pull loose eventually.</li>
<li><strong>Accessible battery compartments:</strong> If any pedals run on batteries as a backup power option, make sure you can access the battery compartment without removing the pedal from the board. This sounds obvious, but I've seen boards where the only way to change a 9V battery is to rip the pedal off and unplug everything.</li>
</ul>`,
      },
      {
        heading: 'Signal Chain and Switching Reliability',
        headingLevel: 2,
        content: `<p>Your signal chain is only as reliable as its weakest link. Here's how to bulletproof it:</p>
<ul>
<li><strong>Buffer at the start (and maybe the end):</strong> If you have a long cable run from your guitar to the board (wireless receivers count as a buffer), or a lot of true-bypass pedals in series, a buffer at the beginning and/or end of your chain preserves high-frequency clarity. A Boss TU-3 tuner has a solid buffer built in. So does a Strymon or Empress pedal at the end of the chain. If your tone sounds dull when all your pedals are off, you have a buffer problem.</li>
<li><strong>True bypass vs. buffered bypass:</strong> True bypass is great in theory (no tone coloring when off), but a chain of 8+ true-bypass pedals with no buffers is a long, undriven cable run that kills your highs. A couple of buffered pedals in the chain (or a dedicated buffer) solves this completely.</li>
<li><strong>Test every preset before the show:</strong> If you're running MIDI, cycle through every preset during soundcheck. Don't assume they're all still there. Firmware updates, power glitches, and accidental button presses can corrupt presets. It takes 5 minutes to check and it can save a show.</li>
<li><strong>Backup signal path:</strong> The ultimate safety net: an A/B box or a tuner with a bypass output that lets you go straight to the amp if your entire board goes down. Run a spare cable from the box to your amp input. If everything fails, you stomp one pedal and you've got a clean, direct signal. Not your ideal tone, but you're still playing.</li>
</ul>`,
      },
      {
        heading: 'The Gig Bag Essentials',
        headingLevel: 2,
        content: `<p>Beyond the board itself, here's what should be in your gig bag for every show. I'm not listing obvious stuff like picks and strings — this is specifically pedalboard-related:</p>
<ul>
<li><strong>Spare patch cables (2-3):</strong> Most common lengths on your board.</li>
<li><strong>Spare instrument cable:</strong> Good quality, tested.</li>
<li><strong>Spare power cables:</strong> At least one DC cable with the right barrel size for your pedals.</li>
<li><strong>9V batteries (2-3):</strong> Emergency power for critical pedals.</li>
<li><strong>Multi-tool or small screwdriver set:</strong> For tightening jacks, opening battery compartments, adjusting trimpots.</li>
<li><strong>Flashlight or headlamp:</strong> Stage floors are dark. You will need to see under your board at some point.</li>
<li><strong>Gaffer tape:</strong> The universal fix for everything — securing cables to a stage floor, taping down a power strip, marking your board position. Not duct tape. Gaffer tape. It doesn't leave residue.</li>
<li><strong>DeoxIT D5:</strong> Contact cleaner for scratchy jacks. A tiny spray bottle lasts years and fixes problems in seconds.</li>
<li><strong>Power strip / extension cord:</strong> Never assume the venue has an outlet where you need one.</li>
<li><strong>DI box:</strong> If you ever go direct to front-of-house, a Radial JDI or J48 is worth its weight in gold. Don't rely on the venue's DI.</li>
</ul>`,
      },
      {
        heading: 'Environment and Venue Prep',
        headingLevel: 2,
        content: `<p>Your pedalboard doesn't exist in a vacuum — the venue affects it more than you'd think, and a little prep goes a long way.</p>
<p><strong>Temperature and humidity:</strong> Extreme heat is the enemy of electronics. If your board sits in a black road case in a trailer in July, the internal temperature can hit 140+ degrees before you even open it. Capacitors, solder joints, and adhesives all hate sustained heat. Try to load in as late as possible and keep the case out of direct sun. In cold weather, let the board come to room temperature before powering on — condensation inside digital pedals can cause short circuits.</p>
<p><strong>Venue power:</strong> Old clubs with bad wiring are everywhere. Before you plug in, check whether the outlet is grounded properly. A $10 outlet tester from a hardware store tells you instantly. If the ground is bad, your noise floor is going to be terrible regardless of how good your power supply is. If possible, get on the same circuit as the rest of the backline — different circuits mean different ground potentials, which means hum.</p>
<p><strong>Stage layout:</strong> Think about where your board is going relative to your amp, the PA speakers, and any lighting dimmers. Fluorescent lights and SCR dimmers dump noise into the power grid like crazy. If you're getting weird buzzing that only happens at certain venues, it's almost always the venue's lighting system polluting the power. Not much you can do about it except use a good power conditioner and keep your board as far from the dimmer rack as possible.</p>`,
      },
      {
        heading: 'Pre-Tour and Pre-Gig Checks',
        headingLevel: 2,
        content: `<p>Run through this before every tour and (abbreviated version) before every gig:</p>
<p><strong>Before the tour:</strong></p>
<ol>
<li>Test every pedal individually — engage, bypass, check all presets.</li>
<li>Test the full signal chain — play through it at gig volume for at least 15 minutes.</li>
<li>Check every cable connection — wiggle test for crackle.</li>
<li>Verify power supply output voltages with a multimeter.</li>
<li>Update firmware on digital pedals (and test after updating).</li>
<li>Back up all MIDI controller presets to a computer.</li>
<li>Check case latches, zippers, handles.</li>
<li>Pack spare cables and gig bag essentials.</li>
</ol>
<p><strong>Before each gig:</strong></p>
<ol>
<li>Visual inspection — nothing loose, nothing unplugged.</li>
<li>Power up and cycle through your main presets/sounds.</li>
<li>Check tuner calibration.</li>
<li>Test expression pedals if you use them.</li>
<li>Confirm backup signal path works.</li>
</ol>
<p>This takes 10 minutes and prevents 90% of on-stage disasters. If you want a rig that's built road-ready from the start — with the cables, the power, the reliability, and the backup options baked in — <a href="/book">that's exactly what we build</a>.</p>`,
      },
    ],
    cta: {
      text: 'Start a Build',
      href: '/book',
      label: 'Get a road-ready custom pedalboard build',
    },
  },

  // ─────────────────────────────────────────────
  // 6. Better Guitar Tone Without Buying More Gear
  // ─────────────────────────────────────────────
  {
    slug: 'better-guitar-tone-without-new-gear',
    title: 'How to Get Better Guitar Tone Without Buying More Gear',
    description:
      'You don\'t need another pedal. Here are practical, free ways to improve your guitar tone right now — from pick technique to amp settings to signal chain basics.',
    publishedAt: '2026-06-04',
    author: 'Jacob Charendoff',
    readTime: '8 min read',
    category: 'Tone',
    tags: ['tone', 'signal chain', 'amp settings', 'technique', 'guitar tone'],
    sections: [
      {
        heading: 'The Gear Treadmill Is Real',
        headingLevel: 2,
        content: `<p>I sell custom pedalboard builds for a living, and I'm about to tell you to stop buying gear. At least for a minute.</p>
<p>Here's what I've learned from building 200+ rigs and doing hundreds of <a href="/tone-tutoring">Tone Tutoring sessions</a>: the players with the best tone aren't the ones with the most pedals. They're the ones who understand what they already have. I've heard incredible tones from a Telecaster through a Blues Junior with zero pedals, and I've heard terrible tones from $10,000 rigs with 15 boutique pedals and a custom amp. The difference is almost never the gear — it's the player's understanding of how to use it.</p>
<p>Before you buy another pedal, read through this. Every tip here is free, and any one of them might make a bigger difference than that $300 boutique overdrive you've been eyeing.</p>`,
      },
      {
        heading: 'Your Pick Matters More Than Your Pickups',
        headingLevel: 2,
        content: `<p>This is the single biggest tone upgrade that costs nothing: pay attention to how you hold your pick and how it strikes the string.</p>
<p><strong>Pick angle:</strong> When the pick strikes the string perfectly flat (parallel to the string), you get a bright, snappy attack. When you angle the pick slightly so it slides across the string, you get a warmer, smoother attack. Most players with "harsh" tone are striking the string dead flat with a thin pick. Try angling it 10-15 degrees and see what happens.</p>
<p><strong>Pick thickness:</strong> Thin picks (0.46-0.60mm) flex on attack, which softens the transient and reduces dynamic range. They're great for strumming but tend to sound weak and flappy for single notes. Heavier picks (0.88-1.5mm) don't flex, so they transfer more energy to the string with a more defined attack. If your tone feels weak or undefined, try a thicker pick before blaming your amp. Jazz III picks (the small Dunlop ones, about 1.38mm) are a great place to start — they're small, stiff, and they force you to be precise with your picking.</p>
<p><strong>Picking position:</strong> Pick near the bridge and you get a bright, cutting tone with lots of harmonic content. Pick near the neck and you get a warm, round, fundamental-heavy tone. You have an entire spectrum of tone available just by moving your picking hand an inch or two. Most players find their sweet spot and never leave it. Experiment.</p>
<p><strong>Picking dynamics:</strong> This is the big one. How hard you pick is the primary volume and tone control on your guitar. Light picking through a dirty amp cleans up and gets chimey. Dig in and it saturates and compresses. Players like Stevie Ray Vaughan and John Mayer live in this dynamic range — they're not stepping on pedals, they're controlling the amp with their right hand. If you pick at the same intensity all the time, you're leaving your most powerful tone tool on the table.</p>`,
      },
      {
        heading: 'Your Volume and Tone Knobs Aren\'t Decoration',
        headingLevel: 2,
        content: `<p>I'd estimate that 70% of the players I work with in Tone Tutoring sessions have their guitar volume and tone knobs on 10 and never touch them. That's like driving a car and only using one gear.</p>
<p><strong>Volume knob:</strong> Rolling your guitar volume down from 10 to 7 or 8 doesn't just make you quieter — it changes the character of the signal hitting your pedals and amp. With a dirty amp or an overdrive pedal, backing off the volume cleans up the tone without losing body. This is how players in the 60s and 70s got their clean and dirty sounds from a single amp with no pedals — volume on 10 for crunch, volume on 6-7 for clean. If your overdrive pedal only sounds good at one volume, you're missing half its potential.</p>
<p><strong>Tone knob:</strong> Most guitar tone knobs are a simple low-pass filter — they roll off high frequencies. At 10, you get the full brightness of your pickups. At 5-7, you get a warmer, smoother tone that can actually sit better in a band mix. A lot of players avoid the tone knob because they tried it once at 0 (which sounds muffled and dead) and wrote it off. Try it at 6 or 7. The difference is subtle and often beautiful — it tames harshness without killing clarity. Clapton plays with his tone rolled back. So does B.B. King. There's a reason.</p>
<p><strong>The volume-tone interaction:</strong> Here's a trick — roll your volume down to 7 and your tone down to 6 with a cranked amp. You get a warm, slightly dirty rhythm tone that responds beautifully to picking dynamics. Now crank both knobs to 10 for your solo — you get a volume boost, a brightness boost, and more saturation from the amp all at once. That's a free channel switch that lives in your guitar.</p>`,
      },
      {
        heading: 'Amp Settings: Stop Scooping Your Mids',
        headingLevel: 2,
        content: `<p>The most common amp EQ mistake is the "scooped mids" setting — bass on 7-8, mids on 2-3, treble on 7-8. It sounds huge when you're playing alone in a room. It completely disappears the moment a bass player and drummer join in, because you've carved out exactly the frequencies that make a guitar audible in a mix.</p>
<p>Mids are where your guitar lives in a band. Here's a starting point that works for almost every amp:</p>
<ul>
<li><strong>Bass:</strong> 4-5 (less than you think you need)</li>
<li><strong>Mids:</strong> 6-7 (more than you think you need)</li>
<li><strong>Treble:</strong> 5-6 (enough for clarity, not so much that it's harsh)</li>
</ul>
<p>This will sound thin and nasal in your bedroom. That's fine. Your bedroom isn't a full band mix. Those mids you're adding are what let your guitar punch through drums, bass, keys, and vocals without turning up so loud that the sound engineer wants to kill you.</p>
<p><strong>Gain:</strong> Use less than you think you need. High gain feels great in isolation — it's compressed, it sustains forever, it's easy to play. But it covers up your pick dynamics, your volume knob technique, and all the tonal nuance in your playing. Try dialing your gain back by 30% and compensating with slightly higher volume. Your tone will open up and your playing will sound more alive.</p>
<p><strong>Presence/resonance:</strong> If your amp has these, they're often more useful than the main EQ for fine-tuning. Presence adds high-frequency sparkle after the power amp — it's different from treble. Resonance adds low-end thump. Small adjustments to these can solve problems that the bass/mid/treble controls can't.</p>`,
      },
      {
        heading: 'Signal Chain Optimization: Free Performance',
        headingLevel: 2,
        content: `<p>Without buying a single pedal, you can improve your tone by optimizing how your existing pedals are connected:</p>
<p><strong>Cable quality audit:</strong> Grab your cheapest patch cable and replace it with the best one you have. Play through the rig. If you hear a difference, that cheap cable was degrading your signal. Now you know which cables to replace. You don't need $50 boutique cables — you need cables with good shielding and solid solder joints. Even a decent $10 cable is better than a terrible $3 cable.</p>
<p><strong>Pedal order:</strong> Rearranging your pedals costs nothing and can dramatically change how your rig sounds. Put your drives before your modulation and time effects. Put your wah before your drives. Put your tuner first. These aren't rules for the sake of rules — they're based on how each effect processes the signal, and getting them right makes everything sound cleaner and more defined.</p>
<p><strong>Remove what you don't use:</strong> That pedal you haven't turned on in 6 months? It's still in your signal chain, adding cable length, potentially adding noise, and maybe sucking tone if it's a bad buffer. Take it off the board. Simpler signal chains sound better. Every pedal between your guitar and your amp is an opportunity for signal degradation.</p>
<p><strong>Check your power:</strong> If you're running a daisy chain and you have any digital pedals on it, you might have noise you've gotten so used to that you don't even notice it anymore. Unplug everything except your guitar, one cable, and your amp. Play. Notice how quiet it is. That's your baseline. Now add pedals back one at a time. If any of them add noise, you've found a problem to fix.</p>`,
      },
      {
        heading: 'Room Acoustics and Speaker Position',
        headingLevel: 2,
        content: `<p>Your amp sounds different depending on where it is and where you are relative to it. This is basic acoustics, but most players never think about it.</p>
<p><strong>Amp on the floor:</strong> Maximum bass coupling. The floor reinforces low frequencies, making the amp sound boomier and darker. This is fine if you want that, but if your tone is muddy, getting the amp off the floor (even 6 inches on a stand or tilted back on an amp wedge) can clean up the low end dramatically.</p>
<p><strong>Amp aimed at your knees:</strong> Most combos and small cabs point straight forward, which means the speaker is aimed at your calves. You're hearing the sound reflecting off walls and the ceiling, not the direct sound from the speaker. That's why your amp sounds great out front but harsh and ice-picky on stage — you're standing above the beam pattern. An amp stand that tilts the speaker up toward your ears changes everything. You hear what the audience hears, and you can set your EQ accurately.</p>
<p><strong>Corner placement:</strong> Putting an amp in a corner reinforces bass frequencies even more than floor coupling alone. If your amp sounds boomy, move it away from the corner. If it sounds thin, put it in a corner. Free EQ.</p>`,
      },
      {
        heading: 'String Choice and Guitar Setup',
        headingLevel: 2,
        content: `<p>When was the last time you changed your strings? Dead strings sound dull, feel stiff, and don't intonate properly. If your tone feels "dead" or "lifeless," it might literally be dead strings. Fresh strings are the cheapest, most immediate tone upgrade available.</p>
<p><strong>String gauge:</strong> Heavier strings vibrate with more energy, producing a fuller, louder, more resonant tone. They're harder to bend and require more finger strength, but they sound bigger. Going from 9s to 10s (or 10s to 11s) is a free tone upgrade if your hands can handle it. SRV played 13s. Don't do that unless you have his hands, but the principle stands.</p>
<p><strong>Guitar setup:</strong> Action, intonation, pickup height, and truss rod adjustment all affect your tone. Pickups that are too close to the strings cause magnetic pull that deadens sustain and creates warbling intonation issues. Pickups that are too far from the strings sound weak. Getting a professional setup ($50-80 at most guitar shops) is probably the best value-for-money tone improvement you can make.</p>
<p><strong>Pickup height:</strong> This one's free and you can do it yourself with a screwdriver. Start with the manufacturer's recommended height (usually 3/32" on the bass side, 2/32" on the treble side, measured from the top of the pickup to the bottom of the string with the string fretted at the last fret). Then adjust by ear — lower for cleaner and more articulate, higher for hotter and more compressed.</p>`,
      },
      {
        heading: 'The Best Tone Upgrade Is Understanding',
        headingLevel: 2,
        content: `<p>All of these tips share a common thread: they're about understanding and optimizing what you already own, not replacing it with something more expensive. The players with the best tone aren't the ones who buy the most gear — they're the ones who get the most out of each piece of gear they have.</p>
<p>If you want to go deeper on any of this — if you want someone to listen to your rig, look at your signal chain, and tell you exactly where the weak points are — that's what <a href="/tone-tutoring">Tone Tutoring</a> is. It's a 60-minute video call where we go through your entire setup, find the easy wins, and get your tone where you want it. No gear sales pitch, no upsell — just honest advice from someone who's been doing this for 17 years. A lot of players leave those sessions realizing they don't need to buy anything at all. They just needed to use what they have differently.</p>`,
      },
    ],
    cta: {
      text: 'Book Tone Tutoring',
      href: '/tone-tutoring',
      label: 'Book a Tone Tutoring session to optimize your rig',
    },
  },

  // ─────────────────────────────────────────────
  // 7. Pedalboard Power Supply Guide
  // ─────────────────────────────────────────────
  {
    slug: 'pedalboard-power-supply-guide',
    title: 'Pedalboard Power Supply Guide: Isolated vs Daisy Chain',
    description:
      'Everything you need to know about powering your pedalboard — why isolation matters, which power supplies are actually worth it, and how to size your setup correctly.',
    publishedAt: '2026-06-04',
    author: 'Jacob Charendoff',
    readTime: '9 min read',
    category: 'Gear',
    tags: ['power supply', 'isolated', 'CIOKS', 'Strymon Zuma', 'Voodoo Lab'],
    sections: [
      {
        heading: 'Power Is the Least Sexy, Most Important Part of Your Board',
        headingLevel: 2,
        content: `<p>Nobody gets excited about a power supply. You get excited about a new delay pedal or a limited-edition fuzz, not a black box that lives under your board and delivers 9 volts of direct current. But here's the thing: a bad power supply will make your $2,000 pedalboard sound like a $200 pedalboard, and a good power supply will make a modest board sound professional-grade.</p>
<p>I've seen it hundreds of times. Someone comes to me with noise issues, and before I even listen to the board, I flip it over and look at the power. Daisy chain. Every time. I swap in an isolated supply and 90% of the noise disappears. It's not magic — it's basic electrical engineering. Let's talk about why.</p>`,
      },
      {
        heading: 'How a Daisy Chain Works (and Why It Causes Problems)',
        headingLevel: 2,
        content: `<p>A daisy chain takes one power output and splits it to multiple pedals using a cable with multiple barrel connectors. The classic example is the Visual Sound One Spot or the Truetone 1 Spot. One wall wart, one cable, power for everything. Simple, cheap, and it works — until it doesn't.</p>
<p>The problem is that all your pedals share the same ground path and the same power rail. When one pedal draws current, it creates small voltage fluctuations that every other pedal on the chain can "see." With all-analog pedals, this is usually fine — analog pedals are relatively tolerant of minor power noise, and the fluctuations are tiny.</p>
<p>But the moment you add a digital pedal to a daisy chain, everything changes. Digital pedals have internal clocks running at MHz frequencies, switching regulators that create high-frequency noise, and current draws that spike and dip rapidly. All that noise rides the shared power rail directly into your analog pedals. Your overdrive pedal doesn't know how to reject a 2MHz clock signal — it just amplifies it and passes it along. That's where the hiss, the whine, and the "mosquito buzz" come from.</p>
<p>There's also the ground loop issue. When pedals share a ground through the daisy chain AND through the audio cables connecting them, you can get ground loops between pedals. Add an amp connection and now you've got multiple ground paths between your board and the amp, which means 60Hz hum.</p>
<p><strong>Bottom line:</strong> If you run only analog pedals and you have 4 or fewer on a daisy chain, you might be perfectly fine. The moment you add digital, add more than 5-6 pedals, or start hearing noise, it's time to upgrade.</p>`,
      },
      {
        heading: 'What "Isolated" Actually Means',
        headingLevel: 2,
        content: `<p>An isolated power supply gives each output its own independent power circuit — its own transformer winding, its own voltage regulation, its own ground reference. Electrically, each output acts like a separate power supply. Noise from pedal A cannot travel through the power rail to pedal B because they don't share a power rail.</p>
<p>This is why isolation kills noise. There's no shared ground path between pedals through the power supply. No shared power rail for digital noise to ride. Each pedal gets clean, stable power regardless of what every other pedal is doing.</p>
<p><strong>Warning: "isolated" labeling.</strong> Some cheap power supplies claim to be isolated but aren't. They use a single transformer with multiple taps, which provides some separation but not true isolation. A truly isolated supply uses separate windings (or isolated DC-DC converters) for each output group. If a supply costs $60 and claims 10 isolated outputs, it's probably not isolated. Check independent reviews, not marketing claims.</p>
<p>You can test isolation yourself with a multimeter: set it to continuity mode and check between the ground sleeves of two different outputs. If you get continuity (a beep), those outputs share a ground and are NOT isolated from each other. Truly isolated outputs will show no continuity between grounds.</p>`,
      },
      {
        heading: 'The Power Supplies We Actually Use and Recommend',
        headingLevel: 2,
        content: `<p>After building 200+ boards, we've settled on a handful of power supplies that we trust. Here's what we use and why:</p>
<h3>CIOKS DC7</h3>
<p>This is our go-to for most builds. Seven isolated outputs, each delivering up to 660mA at 9V (or configurable to 12V/18V with jumpers on some outputs). It's compact, dead quiet, and incredibly well-built. The DC7 can power most 7-10 pedal boards by itself, and you can link two together for larger rigs. CIOKS also makes the DC4 (four outputs, even smaller) for compact boards.</p>
<p>What sets CIOKS apart is the flexibility. The outputs are grouped into sections that can be configured for different voltages, and the current capacity per output is generous enough to handle Strymon and Boss 500-series pedals without breaking a sweat. Around $300, and worth every cent.</p>
<h3>Strymon Zuma</h3>
<p>Nine isolated outputs at 500mA each, all 9V. If you need 18V, you can combine two outputs using a current-doubler cable. The Zuma is dead quiet, built like a tank, and designed to mount under a Pedaltrain board with their mounting brackets. You can expand it with the Strymon Ojai add-on units for additional outputs.</p>
<p>The Zuma is a fantastic choice if you're running mostly 9V pedals and you want a simple, no-configuration-needed supply. Around $330.</p>
<h3>Voodoo Lab Pedal Power 3 Plus</h3>
<p>Twelve isolated outputs with a mix of 9V and 12V options, plus adjustable sag on some outputs (great for vintage fuzz pedals that sound better with slightly starved voltage). Voodoo Lab has been making reliable power supplies for decades, and the PP3+ is their best yet. Around $280.</p>
<h3>Walrus Audio Phoenix</h3>
<p>Fifteen isolated outputs with a variety of voltage options (9V, 12V, 18V). If you have a big board with a lot of pedals that need different voltages, the Phoenix is a solid choice. Around $300.</p>
<p>Any of these will transform a noisy board into a quiet one. Check out our <a href="/shop">shop</a> for the supplies we stock.</p>`,
      },
      {
        heading: 'Sizing Your Power Supply: Getting the Math Right',
        headingLevel: 2,
        content: `<p>The most common power supply mistake (after daisy-chaining digital pedals) is undersizing. If a pedal needs 300mA and you put it on a 100mA output, one of three things happens: it doesn't work at all, it works but adds noise from the output's regulator being overloaded, or it works fine at home but cuts out under the stress of a hot venue where components are running warmer.</p>
<p>Here's how to size your power supply correctly:</p>
<p><strong>Step 1: List every pedal and its current draw.</strong> Check the manual, the manufacturer's website, or the label on the pedal itself. Common draws:</p>
<ul>
<li>Simple analog pedals (OD, fuzz, boost): 5-30mA</li>
<li>Analog with LED and switching: 20-50mA</li>
<li>Digital pedals (basic delay, chorus): 50-150mA</li>
<li>Complex digital (Strymon, Boss 500, Source Audio): 200-500mA</li>
<li>Multi-effects units: 300-800mA</li>
</ul>
<p><strong>Step 2: Check voltage requirements.</strong> Most pedals are 9V center-negative (the standard). But some need 12V (certain EHX pedals), 18V (some overdrives run at 18V for more headroom), or even center-positive (some older Moog pedals, certain germanium fuzzes). Plugging a 9V pedal into an 18V output can damage it. Always verify.</p>
<p><strong>Step 3: Match outputs to pedals.</strong> Assign each pedal to a power supply output that matches its voltage requirement and exceeds its current draw. Don't run a 300mA pedal on a 300mA output if you can put it on a 500mA output — the headroom prevents thermal stress and noise.</p>
<p><strong>Step 4: Add 20% headroom to total current.</strong> If your pedals draw a total of 1,200mA, get a supply rated for at least 1,440mA total. This accounts for startup inrush current and real-world variations.</p>`,
      },
      {
        heading: 'Voltage Sag: When Starving Your Pedal Sounds Good',
        headingLevel: 2,
        content: `<p>There's one scenario where "bad" power actually sounds better: vintage-style fuzz pedals. A germanium Fuzz Face or a silicon Tone Bender often sounds more organic and responsive when powered by a slightly depleted 9V battery — say, 7.5-8V instead of a full 9V. The lower voltage reduces the headroom and changes the clipping characteristics, making the fuzz softer and more touch-sensitive.</p>
<p>Some power supplies have a "sag" control that lets you dial down the voltage on specific outputs. The Voodoo Lab Pedal Power 3 Plus has this, and so does the Strymon Zuma (via an internal jumper for lower voltage). If you love the sound of a dying battery in your fuzz but don't want to actually run batteries, this feature is for you.</p>
<p><strong>Important:</strong> Sag is only for analog pedals that are designed to tolerate it. Never sag a digital pedal — it needs stable, full-voltage power to run its processor. Undervolting a digital pedal can cause glitches, data corruption, or total failure.</p>`,
      },
      {
        heading: 'Mounting and Cable Routing for Power',
        headingLevel: 2,
        content: `<p>Where and how you mount your power supply matters for noise and reliability:</p>
<ul>
<li><strong>Mount it under the board.</strong> Most modern power supplies are designed to mount underneath a Pedaltrain or similar board using brackets. This keeps the supply out of the way, protects it from stomping, and keeps the top of the board clear for pedals.</li>
<li><strong>Keep power cables away from audio cables.</strong> Run DC power cables on one side of the board and audio patch cables on the other. If they have to cross, cross them at 90-degree angles. Parallel runs of power and audio cables can couple interference — the longer the parallel run, the worse the noise.</li>
<li><strong>Use the right cable lengths.</strong> DC cables should be just long enough to reach from the supply output to the pedal's power input, with a small service loop. Excess cable coiled up under the board acts as an antenna for electromagnetic interference. Cut to length or use a set that matches your layout.</li>
<li><strong>Secure everything.</strong> Use cable ties, adhesive cable channels, or P-clips to secure power cables so they don't move. A loose DC barrel connector that makes intermittent contact will cause pops, volume drops, and general unreliability that's incredibly hard to diagnose.</li>
</ul>
<p>Power management isn't glamorous, but it's the foundation your entire rig is built on. Get it right and you'll never think about it again. Get it wrong and you'll be chasing noise and reliability issues forever. If you want it done right from day one, <a href="/book">let's talk about a build</a>.</p>`,
      },
    ],
    cta: {
      text: 'Shop Power Supplies',
      href: '/shop',
      label: 'Browse our recommended power supplies',
    },
  },

  // ─────────────────────────────────────────────
  // 8. What Is Tone Tutoring
  // ─────────────────────────────────────────────
  {
    slug: 'what-is-tone-tutoring',
    title: 'What Is Tone Tutoring? How One Session Can Fix Your Rig',
    description:
      'A look inside The Rig Doctor\'s Tone Tutoring service — what happens in a 60-minute session, what problems we solve, and why it might be all you need.',
    publishedAt: '2026-06-04',
    author: 'Jacob Charendoff',
    readTime: '7 min read',
    category: 'Services',
    tags: ['tone tutoring', 'signal chain', 'consultation', 'rig optimization'],
    sections: [
      {
        heading: 'Not Everyone Needs a Full Build',
        headingLevel: 2,
        content: `<p>I run a custom pedalboard build shop. Our builds start at $999.99 and go up from there. And honestly? About half the players who reach out to us don't need a build. They need 60 minutes with someone who's been doing this for 17 years to look at their rig, listen to it, and tell them what's wrong and how to fix it.</p>
<p>That's what Tone Tutoring is. It's a 60-minute video call — you, me, your rig, a camera pointed at your board, and an hour of focused troubleshooting and optimization. No scripts, no curriculum, no upsell. Just real-time problem-solving for whatever's going on with your tone.</p>
<p>I started offering it because I was getting emails from players all over the country who had tone problems but couldn't ship their board to us for a build. They just needed advice from someone who knows what they're looking at. A session costs $99.99, and most players walk away with their problems solved in that single hour.</p>`,
      },
      {
        heading: 'What Actually Happens in a Session',
        headingLevel: 2,
        content: `<p>Every session is different because every rig is different, but here's the general flow:</p>
<p><strong>First 10 minutes: Show me what you've got.</strong> You set up a camera (phone camera is fine) so I can see your board and hear your amp. You play through your main sounds. I listen and watch. I'm paying attention to things you might not even notice — how your gain stages interact, whether your effects loop is contributing noise, whether your cables are routing cleanly, whether your signal chain order makes sense for what you're playing.</p>
<p><strong>Next 10 minutes: Tell me what's bothering you.</strong> Maybe it's noise you can't track down. Maybe your tone feels "thin" or "muddy" and you can't figure out why. Maybe you just bought three new pedals and you can't get them to sound right together. Maybe you sound great at home but disappear in the band mix. Whatever it is, we define the problem clearly so we can solve it.</p>
<p><strong>Remaining 40 minutes: We fix it.</strong> This is where the work happens. I'll walk you through specific adjustments — re-ordering pedals, tweaking amp EQ, adjusting gain staging, moving effects between the front of the amp and the loop, changing power supply routing, dialing in specific pedal settings. You make the changes in real time while I listen to the results. We iterate until it sounds right.</p>
<p>By the end, you have a rig that sounds better than it did an hour ago, and you understand <em>why</em> it sounds better — so you can apply those principles to future changes yourself.</p>`,
      },
      {
        heading: 'The Most Common Problems We Solve',
        headingLevel: 2,
        content: `<p>After doing hundreds of these sessions, certain problems come up over and over. Here's the greatest hits:</p>
<h3>"My board hums and buzzes."</h3>
<p>This is probably the #1 reason people book a session. We do the systematic isolation test — guitar into amp alone, then add pedals one by one — and we almost always find the culprit within 15 minutes. It's usually a power supply issue (daisy chain with digital pedals), a ground loop (amp and board on different circuits), or a bad cable. Once you know the cause, the fix is straightforward.</p>
<h3>"My tone sounds thin/weak/lifeless."</h3>
<p>Usually a gain staging problem. The player's running too much gain on their overdrive and too little volume, or their amp EQ is scooped (low mids), or they've got a long chain of true-bypass pedals with no buffer and they're losing all their high end. We restructure the gain staging so each pedal is driving the next one properly, and suddenly the tone comes alive.</p>
<h3>"I can't get my delay/reverb to sound clean."</h3>
<p>Almost always a signal chain order issue. The time-based effects are in front of a dirty amp or a gain pedal, and the repeats/tails are getting distorted. We move them to the effects loop (or restructure the chain if there's no loop), and the problem disappears.</p>
<h3>"I sound great alone but disappear in the band."</h3>
<p>EQ and gain adjustment. Usually too much bass, not enough mids, too much gain (which actually compresses your signal and makes you smaller in a mix). We adjust the amp EQ for mix context, cut the bass, boost the mids, and reduce the gain slightly. The guitar suddenly cuts through without being louder.</p>
<h3>"I just bought a bunch of pedals and I don't know what to do with them."</h3>
<p>This is my favorite session. Clean slate, no problems to fix, just "help me put this together right." We map out the signal chain, figure out what goes where, set up initial presets, and dial in a set of core sounds. It's like a build consultation without the build.</p>`,
      },
      {
        heading: 'What You Need for a Session',
        headingLevel: 2,
        content: `<p>The setup is simple:</p>
<ul>
<li><strong>A camera angle that shows your pedalboard.</strong> A phone on a tripod or propped up on a book works great. I need to see your pedal layout, cable routing, and be able to read the knob settings on your pedals. If you can show the underside of the board (power supply routing) during the session, even better.</li>
<li><strong>A way for me to hear your amp.</strong> The phone mic is usually fine for this. I don't need studio-quality audio — I need to hear the character of your tone, the noise, the overall feel. If you have a separate mic you can point at your amp, great, but the phone mic works for most purposes.</li>
<li><strong>Your rig, set up and ready to play.</strong> Have everything plugged in, powered on, and ready to go when the session starts. We've only got 60 minutes and I don't want to spend 15 of them waiting for you to find a power cable.</li>
<li><strong>A willingness to try things.</strong> I'm going to ask you to move pedals, change settings, swap cables, and try things that might feel weird. Some of my suggestions will feel counterintuitive ("turn your drive gain DOWN?"). Trust the process. We can always put it back if you don't like it.</li>
</ul>`,
      },
      {
        heading: 'Who Tone Tutoring Is For',
        headingLevel: 2,
        content: `<p>Tone Tutoring works for any level of player, but it's particularly valuable for:</p>
<ul>
<li><strong>Players who've been at it a while and know something's off but can't identify what.</strong> You've been playing for years, you've accumulated gear, and something about your tone isn't quite right. An experienced set of ears can often spot the issue in minutes.</li>
<li><strong>Players who are new to pedals and don't want to learn everything the hard way.</strong> You just bought your first pedalboard setup and you don't want to spend six months fighting noise and tone problems. One session gets you started right.</li>
<li><strong>Players who can't ship their board for a build.</strong> Whether it's geography, budget, or just preference — you want to do the work yourself, but you want expert guidance. Tone Tutoring gives you the knowledge and the plan.</li>
<li><strong>Players considering a custom build who want to explore first.</strong> Not sure if you need a full build? A Tone Tutoring session can help you figure out whether your current rig can be optimized or whether it's time for a ground-up rebuild. If you end up booking a build with us, we'll credit the session cost toward the build price.</li>
</ul>`,
      },
      {
        heading: 'Real Results From Real Sessions',
        headingLevel: 2,
        content: `<p>To give you a sense of what a session actually produces, here are some real examples (details changed for privacy):</p>
<p>A country player in Nashville had a board with 12 pedals and constant high-frequency whine. In the session, we traced it to a digital delay that was sharing a daisy-chain power output with his analog drives. We moved the delay to an isolated output on his power supply — noise gone in 30 seconds. He'd been fighting that noise for four months.</p>
<p>A worship guitarist had a big ambient rig — Strymon Timeline, BigSky, Mobius, plus several drives. Everything was in front of the amp. His delays were getting distorted and his reverb trails sounded muddy. We moved the Strymon trio into the effects loop, re-ordered his drives from lowest to highest gain, and adjusted his amp's loop level. Completely different rig. He texted me after his next Sunday service and said his band leader asked what new gear he bought.</p>
<p>A bedroom player in Phoenix had a Fender Hot Rod Deluxe and a Tube Screamer. Two pieces of gear, and he couldn't get a tone he liked. The amp was set with bass on 8, mids on 3, treble on 8, and the Tube Screamer had the gain maxed. We dropped the bass to 4, pushed the mids to 7, cut the Tube Screamer gain to 9 o'clock, and turned the TS level knob up to 2 o'clock. Same two pieces of gear. He couldn't believe it was the same amp.</p>`,
      },
      {
        heading: 'What Tone Tutoring Is NOT',
        headingLevel: 2,
        content: `<p>To be clear about what this isn't:</p>
<ul>
<li><strong>It's not a guitar lesson.</strong> I'm not teaching you scales or songs. I'm optimizing your signal chain and tone. If you want to get better at playing, take a lesson. If you want your rig to sound better, book a Tone Tutoring session.</li>
<li><strong>It's not a sales pitch for a build.</strong> I'm not going to spend 60 minutes telling you your board is garbage and you need to pay us to rebuild it. If your rig can be fixed with a few adjustments, I'll tell you exactly how to fix it yourself. If it genuinely needs a rebuild, I'll be honest about that too — but I'll explain why and let you make the call.</li>
<li><strong>It's not recording or mixing advice.</strong> I can help you sound great through your amp in a room. If you need help with recording, mic placement, or mixing, you want a recording engineer, not a rig builder.</li>
</ul>`,
      },
      {
        heading: 'Book a Session',
        headingLevel: 2,
        content: `<p>Tone Tutoring is $99.99 for 60 minutes. <a href="/tone-tutoring">Book directly on our site</a> — pick a time that works for you, and we'll send you a video call link. That's it. No contracts, no commitments, no subscription.</p>
<p>One session. One hour. Your rig, but better. I've done this for over 200 rigs — whether it's a $500 bedroom board or a $5,000 touring rig, the approach is the same: listen, diagnose, fix. Your tone is in there. Sometimes you just need someone who knows where to find it.</p>`,
      },
    ],
    cta: {
      text: 'Book Tone Tutoring',
      href: '/tone-tutoring',
      label: 'Book a Tone Tutoring session',
    },
  },
];
