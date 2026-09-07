/**
 * The class catalogue.
 *
 * Copy is adapted from the current site, with mechanism and outcome claims
 * rewritten to describe what actually happens in a session. The rule Boclaire
 * set: say what people will do, not what it will do to them.
 *
 * Pricing is a PLACEHOLDER at $167 across the board pending real numbers,
 * except acupressure, which is confirmed at $135. Nothing here has a checkout;
 * every class routes to a waitlist until the MailerLite forms exist.
 */

import type { AudienceKey, OfferingStatus, PillarKey } from './types'

/** Which illustration heads the card and the detail page. */
export type ArtKey =
  | 'seated'
  | 'pair'
  | 'walking'
  | 'tree'
  | 'elder'
  | 'bee'
  | 'sprig'
  | 'hands'

export interface ClassOffering {
  slug: string
  name: string
  /** Fixed Korean name, where one exists. Never substituted. Master context 29. */
  nameKo?: string
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
  /** Omitted where no price exists yet. An invented price is worse than none. */
  price?: number
  priceUnit?: 'session' | 'month' | 'hour'
  /** Renders the headline price as "From $25", where it is an entry point rather than the price. */
  priceFrom?: boolean
  /**
   * Commitment levels, where a class is sold by the number of days a week
   * rather than at one number. Rendered on the detail page only; the card keeps
   * the single headline figure so fourteen cards stay comparable.
   */
  priceTiers?: { label: string; amount: number; unit: 'week' | 'month' }[]
  /** True only where the number is confirmed. Drives the placeholder notice. */
  priceConfirmed?: boolean
  /** Faith-based sessions are labeled so families opt in knowingly. */
  faithBased?: boolean
  /** Defaults to 'waitlist'. Nothing on this site is bookable yet. */
  status?: OfferingStatus
  /** How it runs: cadence, group size, where. */
  format?: string
  duration?: string
  /** Which illustration represents it. */
  art?: ArtKey
  /**
   * Where the copy came from. Session one built the catalogue from the old
   * website and missed nine programs Boclaire has actually named, so provenance
   * is now tracked rather than assumed.
   */
  source?: 'old-site' | 'boclaire-flyer' | 'master-context'
  /** Internal only. Never rendered. */
  verifyNote?: string
}

/** Nothing is bookable yet, so an unset status means waitlist. */
export function statusOf(c: ClassOffering): OfferingStatus {
  return c.status ?? 'waitlist'
}

export const classes: ClassOffering[] = [
  {
    slug: 'natures-sensory-gym',
    art: 'sprig',
    name: "Nature's Sensory Gym",
    audience: 'children',
    audienceLabel: 'Children',
    pillars: ['whole-person-thinking', 'healthy-meals'],
    summary: 'Hands in the dirt, in the herb garden.',
    body: [
      'Children dig, plant, crush leaves between their fingers, and smell what grows here. They learn which plant is which, and what it likes.',
      'It’s hands-on, it’s outside, and most kids get absorbed in it in a way a worksheet never manages. Children come away knowing a few plants by name, which is a small thing that tends to stick.',
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
    art: 'walking',
    name: 'Meditative Wellness Walk',
    audience: 'adults',
    audienceLabel: 'Adults',
    pillars: ['mindful-meditation', 'somatic-movement'],
    summary: 'A slow walk outdoors, with attention.',
    body: [
      'A deliberately slow walk in nature. We pay attention to breath, to the ground, and to what the body is already doing while it walks.',
      'Acupressure points come into it where they’re useful. Mostly it’s walking, unhurried, with someone pointing out what to notice.',
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
    art: 'tree',
    name: 'Mindful Movement Workout',
    audience: 'adults',
    audienceLabel: 'Adults',
    pillars: ['somatic-movement', 'returning-to-balance'],
    summary: 'A gentle full-body session outdoors.',
    body: [
      'Walking, breath, and gentle full-body movement, outside. It’s a workout in the sense that you’ll use your body, and not in the sense that anyone is counting reps at you.',
      'The focus is on feeling how the body coordinates as one thing, legs and arms and torso all together, rather than working parts in isolation.',
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
    art: 'seated',
    name: 'Body Prayer Session',
    audience: 'adults',
    audienceLabel: 'Adults',
    pillars: ['mindful-meditation', 'somatic-movement'],
    summary: 'A faith-based practice blending prayer, breath, and gentle movement.',
    body: [
      'Prayer, breathwork, and gentle movement together, held as a spiritual practice rather than a fitness class.',
      'It’s openly Christian in framing. If that’s what you’re looking for, this is that. If it isn’t, the other sessions don’t include it.',
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
    art: 'walking',
    name: "Kids' Birthday Hike Party",
    audience: 'events',
    audienceLabel: 'Children · Events',
    pillars: ['somatic-movement', 'mindful-meditation'],
    summary: 'A birthday spent outside, exploring.',
    body: [
      'A birthday celebration on the trail. Kids walk, explore, play, look at things, and eat cake at the end like anybody else.',
      'It’s an easy first outing for a family who hasn’t taken a class here before. Low commitment, and everybody already knows how a birthday party works.',
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
    art: 'bee',
    name: 'Adult Birthday Hike Party',
    audience: 'events',
    audienceLabel: 'Adults · Events',
    pillars: ['mindful-meditation', 'somatic-movement'],
    summary: 'A reflective hike for a birthday or a turning point.',
    body: [
      'A hike built around a milestone: a birthday, a transition, the start of something. Walking, talking, and some quiet.',
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
    art: 'sprig',
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
      'Dates, site details and what’s included are still being worked out. Join the waitlist and we’ll tell you as soon as there’s something real to say.',
    price: 167,
    priceUnit: 'session',
    priceConfirmed: false,
  },
  {
    slug: 'childrens-bible-study',
    art: 'pair',
    name: "Children's Bible Study",
    audience: 'spiritual',
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
    art: 'seated',
    name: 'Teen Girls Bible Circle',
    audience: 'spiritual',
    audienceLabel: 'Teen girls',
    pillars: ['mindful-meditation', 'whole-person-thinking'],
    summary: 'An outdoor space for teen girls to gather and talk.',
    body: [
      'Teen girls gather outdoors to read, listen, talk, and work out what living it out actually looks like. Mostly what they get is a regular hour that belongs to them.',
      'It’s a place more than a lecture, and the reading just gives the conversation somewhere to start.',
    ],
    whatHappens: [
      'Reading and open discussion',
      'Outdoors where the weather allows',
      'Room to talk, and room not to',
      'A regular time that is theirs',
    ],
    honestNote:
      'Openly faith-based. Nothing here touches dieting, body rules or appearance. That’s a firm line in every teen session Boclaire runs.',
    price: 167,
    priceUnit: 'month',
    priceConfirmed: false,
    faithBased: true,
  },
  {
    slug: 'acupressure-therapy',
    art: 'hands',
    name: 'Acupressure Therapy',
    audience: 'adults',
    audienceLabel: 'Adults · One-to-one',
    pillars: ['returning-to-balance', 'whole-person-thinking'],
    summary: 'A one-to-one acupressure session.',
    body: [
      'A private session using acupressure, a traditional practice of applying gentle pressure at specific points on the body.',
      'Boclaire is a Certified Acupressure Teacher. She works within Traditional Chinese Medicine as a tradition, one worth respecting on its own terms, and not as a description of modern anatomy.',
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
  /* ----------------------------------------------------------------------
   * The four below come from Boclaire's own class-description documents
   * (Desktop/True Wellness Movement/Class descriptions). They are programs she
   * has written up herself, and none of them existed on this site before.
   *
   * Her flyer copy states outcomes directly ("Improve memory and
   * concentration", "reduce brain fog"). Master context 15, 44 and 9 do not
   * permit that on a published page, and they are her own standards. The
   * activity lists below are hers verbatim; the outcome language is reframed
   * as what a session is built to support, with the limit stated. Nothing was
   * dropped, only re-registered.
   * -------------------------------------------------------------------- */
  {
    slug: 'brain-wellness-for-elders',
    name: 'Brain Wellness Support for Elders',
    nameKo: '두뇌 건강 지원 세션',
    audience: 'caregivers-elders',
    audienceLabel: 'Elders and caregivers',
    pillars: ['whole-person-thinking', 'mindful-meditation'],
    status: 'by-request',
    art: 'elder',
    source: 'boclaire-flyer',
    duration: '40 minutes',
    format: 'One to one. Travel to your location is available.',
    summary: 'Individual sessions at your own pace, built around memory, focus, and staying mentally active.',
    body: [
      'A personalized forty-minute session, one to one. Boclaire travels to you where that makes it easier, which for a lot of families is the difference between this happening and not happening.',
      'Each session is put together around the person in front of her rather than a fixed curriculum. Some of it is gentle movement, some of it is breath and acupressure, and some of it is straightforward cognitive exercise.',
    ],
    whatHappens: [
      'Neuro exercises',
      'Mindfulness practice for mental clarity',
      'Breathwork and acupressure points for stress',
      'Gentle movement, connecting brain and body',
      'Cognitive exercises chosen for you rather than off a list',
      'Simple eye exercises',
      'Practices for building a more positive outlook',
    ],
    price: 167,
    priceUnit: 'session',
    priceConfirmed: false,
    honestNote:
      'These sessions are wellness education. They are built to support memory, focus, confidence and staying mentally active, and whether they do that for any particular person varies. They are not treatment for dementia, Alzheimer\u2019s disease, or any neurological condition, and nothing here is offered as prevention or cure.',
    verifyNote:
      'Master context section 9 notes there has previously been only one spot available. Confirm capacity. PRICE: $167 is Rev standing placeholder; master context 37 sets no price at all for a forty-minute elder session.',
  },
  {
    slug: 'mindful-teen-circle',
    name: 'Mindful Teen Circle',
    audience: 'teens',
    audienceLabel: 'Teens',
    pillars: ['whole-person-thinking', 'somatic-movement', 'healthy-meals'],
    status: 'in-development',
    art: 'seated',
    source: 'boclaire-flyer',
    format: 'Small group',
    summary: 'A group for teens on body image, mindful eating, cycle care, and the practical side of looking after yourself.',
    body: [
      'A supportive group for teens working out a healthy relationship with their bodies, with food, and with their own emotional weather.',
      'It runs on mindfulness, open discussion, gentle movement and practical tools. The point is that a teenager leaves with things she can actually use, and with the sense that her body is hers to look after rather than something to fix.',
    ],
    whatHappens: [
      'Body image and self-esteem, without shame',
      'Mindful eating, and listening to hunger and fullness',
      'Nutrition without dieting',
      'Menstrual-cycle self-care: body changes, hygiene, rest, managing PMS naturally',
      'Acupressure points traditionally used for cramps, bloating, stress, headaches, back pain and low mood',
      'Gentle yoga, stretching and movement',
      'Breathing, relaxation and guided meditation',
      'Stress, emotional resilience and mindfulness',
      'Confidence, friendships, emotional intelligence and self-compassion',
      'Journaling, creative work and group discussion',
    ],
    price: 167,
    priceUnit: 'month',
    priceConfirmed: false,
    honestNote:
      'All of this is educational. It encourages healthy habits and self-care, and it is not medical advice, nutritional therapy, or treatment for an eating disorder or any menstrual condition. There is no dieting, no calorie counting, and no body standards in this room.',
    verifyNote: 'No schedule, age range or group size established. Confirm all three. PRICE: $167/month is Rev standing placeholder, unverified.',
  },
  {
    slug: 'private-somatic-flow',
    name: 'Private Somatic Flow',
    audience: 'adults',
    audienceLabel: 'Adults',
    pillars: ['somatic-movement', 'returning-to-balance'],
    status: 'by-request',
    art: 'seated',
    source: 'boclaire-flyer',
    format: 'One to one, by appointment',
    summary: 'Notice. Attend. Respond. A personalized session where you learn to read what your body is telling you, and answer it.',
    body: [
      'What if movement wasn’t about telling your body what to do? What if it was a conversation?',
      'Private Somatic Flow is a personalized session where you slow down, notice what your body is communicating, and respond on purpose. Sometimes that means moving. Sometimes it means breath. Sometimes an acupressure point. Sometimes it means stopping and listening.',
      'Notice. Attend. Respond. Become your own guide. That’s the whole shape of it, and it’s the part Boclaire cares most about. Her job isn\u2019t to tell you what works for everyone. It\u2019s to help you become a better observer of your own body, so that eventually you don\u2019t need somebody standing next to you telling you what to feel.',
    ],
    whatHappens: [
      'Noticing where you hold tension',
      'Watching how your breathing changes',
      'Finding which movements bring ease',
      'Hearing what your body is actually asking for',
      'Working with acupressure points and how they land for you',
      'Learning when to move, when to pause, and when to rest',
    ],
    price: 167,
    priceUnit: 'session',
    priceConfirmed: false,
    honestNote:
      'There is no perfect pose here, no pushing through, and no one-size-fits-all formula. This is wellness education and body awareness work, not physiotherapy, not treatment for an injury, and not a substitute for care you’re already receiving.',
    verifyNote: 'PRICE: $167 is Rev standing placeholder. Master context 37 lists a $75 single session historically, which is the likelier real number. Confirm.',
  },
  {
    slug: 'one-to-one-mindfulness-enrichment',
    name: '1:1 Mindfulness Enrichment Program',
    audience: 'children',
    audienceLabel: 'Children',
    pillars: ['whole-person-thinking', 'somatic-movement', 'mindful-meditation', 'healthy-meals'],
    art: 'pair',
    source: 'boclaire-flyer',
    format: 'One to one. By the hour, or two, three, or five days a week.',
    summary: 'A personalized mindful childhood experience.',
    body: [
      'A nurturing one-on-one experience designed around your child\u2019s unique needs, personality, interests, natural rhythm, and curiosity.',
      'This program blends mindful care with meaningful enrichment through movement, nature, creativity, cultural exploration, and child-led learning.',
      'Your child is supported in developing confidence, emotional awareness, creativity, independence, and a deeper connection with themselves, nature, and the world around them.',
      'Your child receives Boclaire\u2019s full attention and her wellness-based approach to daily care. Made for busy parents who want a holistic experience for their child.',
    ],
    whatHappens: [
      'Personalized attention and care',
      'Children\u2019s yoga, brain exercise, and creative movement',
      'Mindfulness, breathing, and body awareness',
      'Outdoor nature exploration and gardening',
      'Exploration of different cultures, traditions, foods, and ways of life',
      'Child-led creative exploration: art, music, storytelling, and creative projects guided by your child\u2019s interests and imagination',
      'Age-appropriate learning activities',
      'Healthy homemade meals and snacks provided, organic whenever possible, and mindful eating practice',
    ],
    honestNote: 'This is childcare that teaches mindful living, rather than a class.',
    price: 25,
    priceUnit: 'hour',
    priceFrom: true,
    priceConfirmed: true,
    priceTiers: [
      { label: '2 days a week', amount: 325, unit: 'week' },
      { label: '3 days a week', amount: 475, unit: 'week' },
      { label: '5 days a week', amount: 750, unit: 'week' },
      { label: '2 days a week', amount: 1200, unit: 'month' },
      { label: '3 days a week', amount: 1800, unit: 'month' },
      { label: '5 days a week', amount: 2800, unit: 'month' },
    ],
    verifyNote:
      'Copy and every price come from Boclaire directly (2026-09). Rev confirmed this is regular childcare that teaches mindful living, so the page says childcare rather than dressing it as a class, and her credentials are deliberately not recited here. He also says no license is required for in-home care under a certain number of children. That number is not recorded anywhere in the source material and the site therefore makes NO licensing claim in either direction. If it is ever stated publicly, get the exemption in writing first.',
  },
  {
    slug: 'guided-mindful-walk',
    name: 'Guided Mindful Walk',
    audience: 'schools',
    audienceLabel: 'Schools and homeschool co-ops',
    pillars: ['somatic-movement', 'mindful-meditation'],
    status: 'by-request',
    art: 'walking',
    source: 'boclaire-flyer',
    format: 'Fridays. PE and social enrichment for homeschool students. Limited spots.',
    summary:
      'A PE and social enrichment class for homeschool students, built around a guided mindful walk in nature.',
    body: [
      'This class helps students build healthy bodies and calm, focused minds through movement in nature. Each class includes a Guided Mindful Walk, where students practice being fully present by observing their surroundings, listening to nature, and connecting their breath with movement.',
      'During each class, students will participate in guided mindful walking, age-appropriate movement, breathing, brain exercises, and simple acupressure techniques that support nervous system regulation, body awareness, and emotional well-being.',
      'Activities are adapted to each student\u2019s age, developmental level, and the outdoor environment. Students will develop balance, coordination, flexibility, strength, posture, and endurance while practicing mindfulness and learning healthy movement habits. Classes also encourage curiosity, observation of the natural world, teamwork, self-confidence, and respect for others.',
      'This program provides a safe, engaging, and supportive environment where students can improve their physical fitness while developing lifelong wellness skills through purposeful movement and time outdoors.',
    ],
    whatHappens: [
      'Guided mindful walking',
      'Age-appropriate movement',
      'Breathing and brain exercises',
      'Simple acupressure techniques',
      'Observation of the natural world',
    ],
    price: 167,
    priceUnit: 'session',
    priceConfirmed: false,
    honestNote:
      'This is physical education and wellness education. It supports nervous-system regulation, body awareness and emotional well-being in the ordinary sense that moving outdoors and paying attention tend to help. It is not therapy and it is not treatment.',
    verifyNote:
      'Renamed from Wellness Walk on Rev\u2019s instruction (2026-09). Body copy is Boclaire\u2019s current flyer, near verbatim; the only edit is her opening subject, \u201cThe Wellness Walk helps students\u201d, changed to \u201cThis class\u201d so the page does not carry both names. Her flyer\u2019s About Your Teacher block is deliberately not published: Rev asked that her credentials not be recited on each class page, and one line of it claims approved Granite Peak Charter School vendor status, which master context 21 forbids publishing without current confirmation. SCHEDULE: the flyer says Fridays with limited spots, so Fridays is published and no grade bands or spot counts are. PRICE: $167/session is Rev\u2019s standing placeholder and the least likely of the four to be right; a school enrichment class is normally billed per term or per student to the school, not per session to a parent.',
  }

]

export const classBySlug = Object.fromEntries(classes.map((c) => [c.slug, c]))
