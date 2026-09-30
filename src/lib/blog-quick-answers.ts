/**
 * Two-sentence direct answers shown at the top of a post, above the fold.
 * Search engines and AI answer engines tend to quote the first clear answer on a page,
 * so each one restates the post's own conclusion in plain words. Keep them in sync with the post.
 */
export const quickAnswers: Record<string, string> = {
  'pedalboard-hum-noise-fix':
    'Most pedalboard hum is a ground loop from daisy-chained power, and switching to an isolated power supply fixes it in most cases. If the hum stays, look for cables running alongside power leads, then test each pedal on its own to find the noisy one.',
  'best-patch-cables-for-pedalboard':
    'We use Mogami 2314 on every build. Its low capacitance (12.2 pF per foot) keeps your high end intact across 8 to 12 patch connections. Use soldered cables on any board that leaves the house, and cut each one to the shortest length that reaches.',
  'effects-loop-vs-front-of-amp':
    'Tuners, wah, compressors, overdrive, distortion, fuzz and boosts go in front of the amp. Delay and reverb go in the effects loop so they stay clean at high gain. Modulation works in either spot: put it in the loop if you play with a lot of gain, in front if you play mostly clean.',
  'midi-pedalboard-switching-guide':
    'MIDI switching lets one button press change presets on several pedals and turn audio loops on and off at the same time. It usually pays off once you are past 8 to 10 pedals, or earlier if you rely on preset-heavy pedals like a Strymon Timeline or Eventide H9.',
  'pedalboard-power-supply-guide':
    'An isolated power supply gives every pedal its own output and ground, which removes the ground loops behind most pedalboard hum. A daisy chain shares one ground across all your pedals and gets noisier as you add more, so once you are past 3 or 4 pedals, go isolated.',
  'custom-pedalboard-cost':
    'Not counting pedals, a basic DIY board runs about $150 to $350 and a serious DIY board $400 to $800. Professional builds run about $800 to $1,500, switching rigs $1,500 to $3,000 or more, and full touring rigs $2,500 to $5,000 or more.',
  'how-to-build-a-pedalboard':
    'Choose a board with room for one more pedal, plan your signal chain order, use quality patch cables cut to length, and power everything from an isolated supply. Then route and tie down your cables, mount the pedals securely, and test every connection before you close it up.',
};
