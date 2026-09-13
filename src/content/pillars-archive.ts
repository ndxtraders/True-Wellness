/**
 * Archived approach pillars.
 *
 * Nothing in here is on the site. Archived pillars have no card on the homepage
 * or the Our Approach page, and no page at /approach/<key>, because `pillars` in
 * ./pillars.ts is the only list any of those read.
 *
 * TO BRING ONE BACK: cut its object out of `archivedPillars` and paste it into
 * `pillars` in ./pillars.ts, then add its key back to the `pillars` array of any
 * class in ./classes.ts that should show it under "Part of". The key, and so the
 * URL, comes back unchanged. Its illustration is still registered in
 * src/components/art/for-pillar.tsx.
 */

import type { Pillar } from './types'

export const archivedPillars: Pillar[] = [
  {
    key: 'returning-to-balance',
    name: 'Returning to Balance',
    summary: 'Your body already knows how to naturally return to balance. We are removing the blockages.',
    definition: [
      'Balance isn\u2019t a state you reach and then hold on to. It\u2019s something a body already knows how to find, and mostly what gets in the way is noise.',
      'Children come with built-in signals for movement, rest, exploration, and connection. Adults still have those signals too. Life just gets loud enough that we stop hearing them. So the work here isn\u2019t about adding a fix. It\u2019s about turning the noise down and listening again.',
    ],
    inPractice: [
      'Gentle movement and breath',
      'Acupressure, as it is traditionally practiced',
      'Therapeutic sound',
      'Unhurried time outdoors',
    ],
    doesNotClaim:
      'Acupressure may be supportive, and practitioners have used it this way for a very long time. That isn’t the same as saying a point works the same way for everyone, or that a session takes a symptom away. Traditional Chinese Medicine deserves respect on its own terms. It isn’t a description of modern anatomy, and we don’t present it as one.',
    definitionConfirmed: false,
  },
  {
    key: 'healthy-meals',
    name: 'Healthy Meals',
    summary: 'Mindful eating for better health.',
    definition: [
      'Boclaire cooks intuitively. A little of this, a little of that. She doesn\u2019t much enjoy measuring, so the approach here is relaxed and easy to substitute in, and it\u2019s built for someone cooking at the end of a long day rather than someone counting grams.',
      'It covers mindful eating as an everyday habit, herbs and the garden, and how to read a food claim honestly. That means saying plainly which part is tradition, which part is a plausible explanation, and which part actually has evidence behind it, instead of blending all three into one promise.',
    ],
    inPractice: [
      'Mindful eating, as a habit rather than a rule',
      'Herbs and the garden',
      'Cooking without measuring',
      'Reading food claims honestly',
    ],
    doesNotClaim:
      'No detox language. No elimination rules. No claim that a food heals a condition. And nothing that edges toward restrictive dieting or body fear, especially not on a page a teenager might read.',
    definitionConfirmed: true,
  },
]
