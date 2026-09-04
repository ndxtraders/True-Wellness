/**
 * The class catalogue.
 *
 * Copy is adapted from the current site, with mechanism and outcome claims
 * rewritten to describe what actually happens in a session. The rule Boclaire
 * set: say what people will do, not what it will do to them.
 *
 * Pricing is a PLACEHOLDER at $167 across the board pending real numbers —
 * except acupressure, which is confirmed at $135. Nothing here has a checkout;
 * every class routes to a waitlist until the MailerLite forms exist.
 */

import type { AudienceKey, PillarKey } from './types'

export interface ClassOffering {
  slug: string
  name: string
  audience: AudienceKey
  audienceLabel: string
  pillars: PillarKey[]
  /** One sentence. Activity, not outcome. */
  summary: string
  /** Detail-page body. */
  body: string[]
  /** Concrete, observable things a participant does. */
  whatHappens: string[]
  /** Stated limits. Published, not buried. */
  honestNote: string
  price: number
  priceUnit: 'session' | 'month'
  /** True only where the number is confirmed. Drives the placeholder notice. */
  priceConfirmed: boolean
  /** Faith-based sessions are labeled so families opt in knowingly. */
  faithBased?: boolean
}

export const classes: ClassOffering[] = [
  {
    slug: 'natures-sensory-gym',
    name: "Nature's Sensory Gym",
    audience: 'children',
    audienceLabel: 'Children',
    pillars: ['whole-person-thinking', 'health-meals'],
    summary: 'Hands in the dirt, in the herb garden.',
    body: [
      'Children dig, plant, crush leaves between their fingers, and smell what grows here. They learn which plant is which, and what it likes.',
      'It is hands-on, it is outside, and most kids find it absorbing in a way a worksheet never is. That is most of the point.',
    ],
    whatHappens: [
      'Planting and tending herbs in the garden',
      'Touching, smelling, and naming plants',
      'Simple garden jobs suited to the age',
      'Time outside, at a child’s pace',
    ],
    honestNote:
      'This is a garden session for children, not a therapy or a treatment. We are not going to tell you what it does to a child’s brain chemistry.',
    price: 167,
    priceUnit: 'month',
    priceConfirmed: false,
  },
  {
    slug: 'meditative-wellness-walk',
    name: 'Meditative Wellness Walk',
    audience: 'adults',
    audienceLabel: 'Adults',
    pillars: ['mindful-meditation', 'somatic-movement'],
    summary: 'A slow walk outdoors, with attention.',
    body: [
      'A deliberately slow walk in nature. We pay attention to breath, to the ground, and to what the body is already doing while it walks.',
      'Acupressure points come into it where they are useful. Mostly it is walking, unhurried, with someone pointing out what to notice.',
    ],
    whatHappens: [
      'Walking slowly, outdoors',
      'Simple breathing practices',
      'Light acupressure, in the traditional sense',
      'Noticing rather than achieving',
    ],
    honestNote:
      'Practitioners have long used acupressure points to help people settle. That is not the same as saying a point works the same way for everyone.',
    price: 167,
    priceUnit: 'month',
    priceConfirmed: false,
  },
  {
    slug: 'mindful-movement-workout',
    name: 'Mindful Movement Workout',
    audience: 'adults',
    audienceLabel: 'Adults',
    pillars: ['somatic-movement', 'returning-to-balance'],
    summary: 'A gentle full-body session outdoors.',
    body: [
      'Walking, breath, and gentle full-body movement, outside. It is a workout in the sense that you will use your body, and not in the sense that anyone is counting reps at you.',
      'The focus is on feeling how the body coordinates as one thing — legs, arms, torso, all of it — rather than working parts in isolation.',
    ],
    whatHappens: [
      'Walking and gentle strength work',
      'Breath paired with movement',
      'Attention to how the whole body coordinates',
      'Outdoors, weather permitting',
    ],
    honestNote:
      'Come as you are. If something hurts, we work around it. This is wellness education, not physical therapy.',
    price: 167,
    priceUnit: 'month',
    priceConfirmed: false,
  },
  {
    slug: 'body-prayer-session',
    name: 'Body Prayer Session',
    audience: 'adults',
    audienceLabel: 'Adults',
    pillars: ['mindful-meditation', 'somatic-movement'],
    summary: 'A faith-based practice blending prayer, breath, and gentle movement.',
    body: [
      'Prayer, breathwork, and gentle movement together, held as a spiritual practice rather than a fitness class.',
      'It is openly Christian in framing. If that is what you are looking for, this is that. If it is not, the other sessions do not include it.',
    ],
    whatHappens: [
      'Prayer',
      'Breathwork',
      'Gentle movement and stillness',
      'Quiet, unhurried pacing',
    ],
    honestNote:
      'This is a spiritual practice and we keep it in that register. It is not offered as a treatment, and it is not a promise of physical healing.',
    price: 167,
    priceUnit: 'month',
    priceConfirmed: false,
    faithBased: true,
  },
  {
    slug: 'kids-birthday-hike-party',
    name: "Kids' Birthday Hike Party",
    audience: 'events',
    audienceLabel: 'Children · Events',
    pillars: ['somatic-movement', 'mindful-meditation'],
    summary: 'A birthday spent outside, exploring.',
    body: [
      'A birthday celebration on the trail. Kids walk, explore, play, look at things, and eat cake at the end like anybody else.',
      'It is an easy first experience for a family that has never taken a class here — low commitment, and everybody already knows how a birthday party works.',
    ],
    whatHappens: [
      'A guided hike suited to the age group',
      'Games and exploring along the way',
      'A quiet moment before heading back',
      'Celebrating, outdoors',
    ],
    honestNote:
      'Group size, route, and timing get set with you beforehand. Bring your own cake.',
    price: 167,
    priceUnit: 'session',
    priceConfirmed: false,
  },
  {
    slug: 'adult-birthday-hike-party',
    name: 'Adult Birthday Hike Party',
    audience: 'events',
    audienceLabel: 'Adults · Events',
    pillars: ['mindful-meditation', 'somatic-movement'],
    summary: 'A reflective hike for a birthday or a turning point.',
    body: [
      'A hike built around a milestone — a birthday, a transition, the start of something. Walking, talking, and some quiet.',
      'Less a party than a good long walk with intention behind it, for people who would rather mark an occasion outdoors than in a restaurant.',
    ],
    whatHappens: [
      'A guided walk at a conversational pace',
      'Space for reflection, if the group wants it',
      'Simple breathing practice',
      'Somewhere worth looking at',
    ],
    honestNote: 'Route and length are set with you. Bring water and decent shoes.',
    price: 167,
    priceUnit: 'session',
    priceConfirmed: false,
  },
  {
    slug: 'rv-wellness-retreat',
    name: 'RV Wellness Retreat',
    audience: 'events',
    audienceLabel: 'Adults · Retreat',
    pillars: ['returning-to-balance', 'whole-person-thinking'],
    summary: 'Stay in your own RV. Rest, and take what you want.',
    body: [
      'Guests stay in their own RV. Rest is the main event. Wellness sessions are available and entirely optional.',
      'Nobody is going to knock on your door at six in the morning to get you to a sunrise practice. If you want to sleep, sleep.',
    ],
    whatHappens: [
      'Your own RV, your own schedule',
      'Optional movement and meditation sessions',
      'Time outdoors',
      'Rest, mostly',
    ],
    honestNote:
      'Dates, site details, and what is included are still being worked out. Join the waitlist and we will tell you when it is real.',
    price: 167,
    priceUnit: 'session',
    priceConfirmed: false,
  },
  {
    slug: 'childrens-bible-study',
    name: "Children's Bible Study",
    audience: 'children',
    audienceLabel: 'Children',
    pillars: ['mindful-meditation'],
    summary: 'Stories and values from the Bible, for kids.',
    body: [
      'A study group for children focused on love, kindness, forgiveness, and the other values that come up again and again in the Bible.',
      'Age-appropriate, discussion-led, and openly Christian.',
    ],
    whatHappens: [
      'Reading and talking through stories',
      'Discussion suited to the age group',
      'Simple quiet practice',
      'Time together',
    ],
    honestNote: 'This is an explicitly faith-based group, so you know what you are signing up for.',
    price: 167,
    priceUnit: 'month',
    priceConfirmed: false,
    faithBased: true,
  },
  {
    slug: 'teen-girls-bible-circle',
    name: 'Teen Girls Bible Circle',
    audience: 'teens',
    audienceLabel: 'Teen girls',
    pillars: ['mindful-meditation', 'whole-person-thinking'],
    summary: 'An outdoor space for teen girls to gather and talk.',
    body: [
      'Teen girls gather outdoors to read, listen, share, and work out what living it out actually looks like.',
      'It is a place more than a lecture. The reading gives the conversation somewhere to start.',
    ],
    whatHappens: [
      'Reading and open discussion',
      'Outdoors where the weather allows',
      'Room to talk, and room not to',
      'A regular time that is theirs',
    ],
    honestNote:
      'Openly faith-based. Nothing here touches dieting, body rules, or appearance — that is a firm line in every teen session.',
    price: 167,
    priceUnit: 'month',
    priceConfirmed: false,
    faithBased: true,
  },
  {
    slug: 'acupressure-therapy',
    name: 'Acupressure Therapy',
    audience: 'adults',
    audienceLabel: 'Adults · One-to-one',
    pillars: ['returning-to-balance', 'whole-person-thinking'],
    summary: 'A one-to-one acupressure session.',
    body: [
      'A private session using acupressure, a traditional practice of applying gentle pressure at specific points on the body.',
      'Boclaire is a Certified Acupressure Teacher and works within Traditional Chinese Medicine as a tradition — one worth respecting on its own terms, and not a description of modern anatomy.',
    ],
    whatHappens: [
      'A conversation about what is going on',
      'Gentle pressure at specific points',
      'Breath and rest',
      'Notes on anything worth trying at home',
    ],
    honestNote:
      'Acupressure may be supportive. People and situations are not one-size-fits-all, and this is not medical treatment. If something needs a doctor, please see one.',
    price: 135,
    priceUnit: 'session',
    priceConfirmed: true,
  },
]

export const classBySlug = Object.fromEntries(classes.map((c) => [c.slug, c]))
