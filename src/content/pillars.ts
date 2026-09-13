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
    summary: 'Look at the whole picture and not just one part.',
    definition: [
      'A tired child, a stiff shoulder, a hard week. Each one makes more sense in context. Sleep, food, light, movement, stress and relationships are all worth looking at before anyone settles on a single cause.',
      'With children, this is developmental thinking. Behavior can be telling you about a need, a missing skill, tiredness, hunger, overwhelm or feeling. Children are developing skills, not miniature adults. With grown-ups and elders it\u2019s the same approach, applied to a longer history.',
    ],
    inPractice: [
      'Asking what else is going on',
      'Reading behavior in context',
      'Connection before correction',
      'Taking big claims apart one piece at a time',
    ],
    doesNotClaim:
      'This isn’t a diagnosis, and it isn’t a claim that the right combination of habits replaces medical care. It also doesn’t mean every behavior should be allowed. Seeing the whole picture is not an excuse for skipping the specific thing in front of you.',
    definitionConfirmed: false,
  },
  {
    key: 'somatic-movement',
    name: 'Somatic Movement',
    summary: 'Gentle movement to retrain the brain-to-muscle connection and build internal body awareness.',
    definition: [
      'Let\u2019s think about walking, the most basic movement humans do. The legs move. The arms and torso counterbalance. The whole body coordinates as one thing. Movement was never really isolated muscle training.',
      'The practice is learning to feel that coordination in your own body, rather than being told about it. For children it’s cultivation rather than training: body awareness, confidence, coordination, curiosity and self-trust. We are not trying to produce small athletes.',
    ],
    inPractice: [
      'Gentle movement and yoga',
      'Breath',
      'Playful brain-and-body games',
      'Walking outdoors, unhurried',
    ],
    doesNotClaim:
      'The verbs here are deliberate: notice, explore, feel, observe, learn. Not fix, correct or force. What you take away is your own experience of your own body, described honestly, rather than an outcome we promised you in advance.',
    definitionConfirmed: true,
  },
  {
    key: 'mindful-meditation',
    name: 'Mindful Living',
    summary: 'Noticing what is happening before reacting to it.',
    definition: [
      'For a parent, that looks like pausing, noticing, breathing, connecting, understanding, guiding, repairing and trying again. For a child it’s simple breathing and attention practices outdoors: a chance to slow down, move, explore and practice paying attention.',
      'It fits almost anywhere. It happens on a slow walk. It happens in the twenty minutes of closing practice at the end of a class. And where someone wants it, it happens in prayer, breath and gentle movement together.',
    ],
    inPractice: [
      'Simple breathing practices',
      'Slow walks with attention',
      'Closing practice at the end of every class',
      'Body prayer, for those who want it',
    ],
    doesNotClaim:
      'Mindfulness isn’t an instruction to be calm. A mom doesn’t have to be perfectly calm, and mindful parenting isn’t about becoming a robot who never gets frustrated. Where a practice is a spiritual one, we keep it spiritual. It is never offered as a guarantee of physical healing.',
    definitionConfirmed: true,
  },
]

export const pillarByKey = Object.fromEntries(pillars.map((p) => [p.key, p])) as Record<
  Pillar['key'],
  Pillar
>
