import type { Pillar } from './types'

/**
 * The three approach pillars: Whole-Person Approach, Somatic Movement and
 * Mindful Living.
 *
 * These are a cross-cutting content layer, not the navigation. Navigation runs
 * on audience, and these cross-link into it from the homepage band, the Our
 * Approach page and the "Part of" chips on class pages.
 *
 * Keys and URLs predate two renames and are kept on purpose, so existing links
 * still work: whole-person-thinking is Whole-Person Approach, and
 * mindful-meditation is Mindful Living. Returning to Balance and Healthy Meals
 * are archived in ./pillars-archive.ts.
 */
export const pillars: Pillar[] = [
  {
    key: 'whole-person-thinking',
    name: 'Whole-Person Approach',
    summary: 'We look at what may be shaping a person’s experience.',
    definition: [
      'When something feels off, one detail may not tell the whole story. Sleep, food, movement, stress, relationships, and our surroundings may all matter.',
      'With children, behavior may be a clue. A child could be tired, hungry, overwhelmed, learning a new skill, or trying to express a feeling. Looking at the full picture may help us respond with more care.',
    ],
    inPractice: [
      'Ask what else may be going on',
      'Notice patterns in daily life',
      'Consider age, needs, and surroundings',
      'Choose a simple next step',
    ],
    doesNotClaim:
      'This approach does not diagnose a condition or replace medical care. It is a way to slow down, gather more information, and respond with care.',
    definitionConfirmed: false,
  },
  {
    key: 'somatic-movement',
    name: 'Somatic Movement',
    summary: 'Gentle movement with attention to how your body feels.',
    definition: [
      'Somatic movement brings your attention to what you feel while you move. You may notice your breath, balance, tension, ease, or the way different parts of your body move together.',
      'Walking is one example. Your arms, legs, and upper body move together with each step. The practice is to move slowly enough to notice.',
      'Children may explore this through yoga, walking, play, and simple movement games. They are encouraged to move with curiosity and at their own pace.',
    ],
    inPractice: [
      'Gentle movement and yoga',
      'Simple breathing',
      'Playful movement games',
      'Walking outdoors',
      'Time to pause and rest',
    ],
    doesNotClaim:
      'Somatic movement is not medical treatment. Each person may notice something different, and no result is promised.',
    definitionConfirmed: true,
  },
  {
    key: 'mindful-meditation',
    name: 'Mindful Living',
    summary: 'Paying attention to what is happening right now.',
    definition: [
      'Mindful living starts with paying attention. You might notice your breath, your body, your feelings, or what is happening around you.',
      'For parents, this may mean pausing before responding, listening, and trying again after a hard moment. For children, it may include simple breathing, quiet attention, movement, or time outdoors.',
      'Mindfulness can be part of a walk, a class, a meal, or a few quiet minutes at home.',
    ],
    inPractice: [
      'Brief breathing practices',
      'Slow walks with attention',
      'A pause before responding',
      'Paying attention while eating or moving',
      'Prayer when it is part of a faith-based class',
    ],
    doesNotClaim:
      'People do not need to feel calm all the time to practice mindfulness. The practice may create a small pause before the next choice. It does not replace medical or mental health care.',
    definitionConfirmed: true,
  },
]

export const pillarByKey = Object.fromEntries(pillars.map((p) => [p.key, p])) as Record<
  Pillar['key'],
  Pillar
>
