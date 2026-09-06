import type { Pillar } from './types'

/**
 * The five approach pillars.
 *
 * These are a cross-cutting content layer, not the navigation. Three of them,
 * Somatic Movement, Mindful Meditation and Healthy Meals, are practice areas: the
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
    key: 'whole-person-thinking',
    name: 'Whole-Person Thinking',
    summary: 'Look at the whole system before naming one cause.',
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
    summary: 'Movement studied from the inside.',
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
    name: 'Mindful Meditation',
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
  {
    key: 'healthy-meals',
    name: 'Healthy Meals',
    summary: 'The food side, and it\u2019s deliberately relaxed.',
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

export const pillarByKey = Object.fromEntries(pillars.map((p) => [p.key, p])) as Record<
  Pillar['key'],
  Pillar
>
