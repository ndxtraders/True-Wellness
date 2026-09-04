import type { Pillar } from './types'

/**
 * The five approach pillars.
 *
 * These are a cross-cutting content layer, not the navigation. Three of them —
 * Somatic Movement, Mindful Meditation, Health Meals — are practice areas, the
 * kind of thing you do in a room. The other two are philosophy. Nobody searches
 * for "whole-person thinking near me," so navigation runs on audience instead
 * and these cross-link into it.
 *
 * `definitionConfirmed: false` marks the two whose names and framing were
 * inferred from Boclaire's philosophy rather than stated by her. They are
 * faithful to it, but they are still inferences and she has not signed off.
 */
export const pillars: Pillar[] = [
  {
    key: 'returning-to-balance',
    name: 'Returning to Balance',
    summary: 'Balance is something a body already knows how to find. Mostly we are removing interference.',
    definition: [
      'Balance is not a state you achieve and then hold onto. It is something a body already knows how to find, and mostly what gets in the way is noise.',
      'Children come with built-in signals for movement, rest, exploration, and connection. Adults still have those signals. Life just gets loud enough that we stop hearing them. So the work here is less about adding a fix and more about turning down the interference and paying attention again.',
    ],
    inPractice: [
      'Gentle movement and breath',
      'Acupressure, in the traditional sense',
      'Therapeutic sound',
      'Time outdoors, unhurried',
    ],
    doesNotClaim:
      'Acupressure may be supportive, and practitioners have used it this way for a long time. That is not the same as saying a point works the same way for every person, or that a session removes a symptom. Traditional Chinese Medicine is a tradition worth respecting on its own terms — it is not a description of modern anatomy, and we do not present it as one.',
    definitionConfirmed: false,
  },
  {
    key: 'whole-person-thinking',
    name: 'Whole-Person Thinking',
    summary: 'Look at the whole system before naming one cause.',
    definition: [
      'A tired child, a stiff shoulder, a hard week — each one makes more sense in context. Sleep, food, light, movement, stress, and relationships are all on the table before anyone reaches for a single lever.',
      'With children this is developmental thinking. Behavior can communicate a need, a skill gap, fatigue, hunger, overwhelm, or emotion. Children are developing skills, not miniature adults. With adults and elders it is the same move applied to a longer history.',
    ],
    inPractice: [
      'Asking what else is going on',
      'Reading behavior in context',
      'Connection before correction',
      'Taking big claims apart one piece at a time',
    ],
    doesNotClaim:
      'This is not a diagnosis, and it is not a claim that the right combination of habits replaces medical care. It also does not mean every behavior should be allowed — noticing the whole picture is not an excuse for skipping the specific thing in front of you.',
    definitionConfirmed: false,
  },
  {
    key: 'somatic-movement',
    name: 'Somatic Movement',
    summary: 'Movement studied from the inside.',
    definition: [
      'Let us think about walking, the most basic movement humans do. The legs move. The arms and torso counterbalance. The whole body coordinates as one thing. Movement is not isolated muscle training, and it never really was.',
      'The practice is learning to feel that coordination in your own body rather than being told about it. For children it is cultivation, not training — body awareness, confidence, coordination, curiosity, self-trust. Not a program for producing small athletes.',
    ],
    inPractice: [
      'Gentle movement and yoga',
      'Breath',
      'Playful brain-and-body games',
      'Walking, outdoors, at a real pace',
    ],
    doesNotClaim:
      'The verbs here are deliberate. Notice, explore, feel, observe, learn — not fix, correct, or force. What you get is your own experience of your own body, described honestly, rather than a promised outcome.',
    definitionConfirmed: true,
  },
  {
    key: 'mindful-meditation',
    name: 'Mindful Meditation',
    summary: 'Noticing what is happening before reacting to it.',
    definition: [
      'For a parent that looks like pausing, noticing, breathing, connecting, understanding, guiding, repairing, and trying again. For a child it is simple breathing and attention practices outdoors — a chance to slow down, move, explore, and practice.',
      'It travels well. It happens on a slow walk. It happens in the twenty minutes of closing practice at the end of a class. And where someone wants it, it happens in prayer, breath, and gentle movement together.',
    ],
    inPractice: [
      'Simple breathing practices',
      'Slow walks with attention',
      'Closing practice at the end of every class',
      'Body prayer, for those who want it',
    ],
    doesNotClaim:
      'Mindfulness is not a requirement to be calm. A mom does not have to be perfectly calm, and mindful parenting is not about becoming a robot who never gets frustrated. Where a practice is a spiritual one, we keep it in that register — it is never offered as a guarantee of medical healing.',
    definitionConfirmed: true,
  },
  {
    key: 'health-meals',
    name: 'Health Meals',
    summary: 'The food side, and it is deliberately relaxed.',
    definition: [
      'Boclaire cooks intuitively. A little of this, a little of that. She does not much enjoy measuring, so the approach here is flexible, substitution-friendly, and built for people cooking at the end of a long day rather than people optimizing a macro sheet.',
      'It covers mindful eating as an everyday practice, herbs and the garden, and honest reading of food claims — where tradition, mechanism, and evidence get named separately instead of blended into one promise.',
    ],
    inPractice: [
      'Mindful eating, as a habit not a rule',
      'Herbs and the garden',
      'Cooking without measuring',
      'Reading food claims honestly',
    ],
    doesNotClaim:
      'No detox language. No elimination rules. No claim that a food heals a condition. And nothing that shades into restrictive dieting or body fear — particularly on anything a teenager might read.',
    definitionConfirmed: true,
  },
]

export const pillarByKey = Object.fromEntries(pillars.map((p) => [p.key, p])) as Record<
  Pillar['key'],
  Pillar
>
