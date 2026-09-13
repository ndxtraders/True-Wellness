/**
 * The class catalogue.
 *
 * Where Boclaire has written a flyer for a class (source: 'boclaire-flyer'),
 * the page uses her words: her subtitle, her description, her list labels and
 * bullets, her closing line. Edits are limited to trimming, and to softening a
 * line where master context 9 or 15 does not allow the claim on a public page.
 * Each such edit is recorded in that entry's verifyNote.
 *
 * Person follows the flyer: where she writes "I" or "my", the page says "I"
 * or "my"; where she writes "we" or "our", so does the page.
 *
 * Classes with no flyer still carry copy adapted from the old website. Leave
 * them alone until she writes one.
 *
 * Only confirmed prices are published. Nothing here has a checkout; every class
 * routes to a waitlist or to the contact form.
 */

import type { AudienceKey, OfferingStatus, PillarKey } from './types'

/** Which illustration heads the card and the detail page. */
export type ArtKey =
  | 'seated'
  | 'pair'
  | 'walking'
  | 'tree'
  | 'trail'
  | 'elder'
  | 'bee'
  | 'sprig'
  | 'hands'

export interface ClassSection {
  /** Her own list label from the flyer: "Each class blends", "Topics include". */
  heading: string
  /** Optional one-sentence lead-in, above the bullets. */
  intro?: string
  bullets: string[]
}

export interface ClassOffering {
  slug: string
  name: string
  /** Fixed Korean name, where one exists. Never substituted. Master context 29. */
  nameKo?: string
  audience: AudienceKey
  audienceLabel: string
  pillars: PillarKey[]
  /** Her flyer subtitle. Shown under the title and on the card. */
  tagline?: string
  /** One sentence. Card text when there is no tagline, and the meta description. */
  summary: string
  /** The short description at the top of the page. One to three short paragraphs. */
  body: string[]
  /**
   * One or two labelled lists. Headings use her own labels rather than one
   * fixed "What happens", so pages feel related without being identical.
   */
  sections: ClassSection[]
  /** Her closing or goal line, set large. Omitted when the flyer has none. */
  closing?: string
  /** Her own call to action, where the flyer has one ("Support our work"). Shown after the closing line. */
  callToAction?: { heading: string; text: string[]; label: string; href: string }
  /**
   * A limit specific to this class. Optional: the site-wide footer already says
   * these are not medical care, therapy, or treatment, so repeating that here is
   * duplication, not honesty.
   */
  honestNote?: string
  /** Short facts for the details card. The first one is also shown on the hub card. */
  details?: { label: string; value: string }[]
  /** Omitted where no price exists yet. An invented price is worse than none. */
  price?: number
  priceUnit?: 'session' | 'month' | 'hour'
  /** Renders the headline price as "From $25", where it is an entry point rather than the price. */
  priceFrom?: boolean
  /**
   * Commitment levels, where a class is sold by the number of days a week
   * rather than at one number. Rendered on the detail page only; the card keeps
   * the single headline figure so the cards stay comparable.
   */
  priceTiers?: { label: string; amount: number; unit: 'week' | 'month' }[]
  /** True only where the number is confirmed. */
  priceConfirmed?: boolean
  /** Faith-based sessions are labeled so families opt in knowingly. */
  faithBased?: boolean
  /** Defaults to 'waitlist'. Nothing on this site is bookable yet. */
  status?: OfferingStatus
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
    slug: 'nature-based-sensory-experience',
    art: 'sprig',
    name: 'Nature-Based Sensory Experience',
    audience: 'children',
    audienceLabel: 'Children',
    pillars: ['whole-person-thinking'],
    source: 'boclaire-flyer',
    tagline: 'One of our signature wellness programs',
    summary: 'A playful outdoor journey where children explore nature using all their senses.',
    details: [{ label: 'Where', value: 'Outdoor wellness center in Jamestown (in development)' }],
    body: [
      'This is a playful outdoor journey where children explore nature using all their senses, touching, smelling, listening, and connecting with themselves and natural elements, including hands-on time in our herbal garden.',
      'I am currently developing an outdoor wellness center in Jamestown that includes an herbal garden and focuses on supporting children’s emotional, physical, and nervous system health through nature-based practices.',
    ],
    sections: [
      {
        heading: 'Through herbs, plants, and natural environments, children:',
        bullets: ['Awaken their senses', 'Calm their nervous system', 'Experience a natural reset'],
      },
    ],
    closing:
      'Our goal is to provide free wellness classes to children in Tuolumne County. We believe every child deserves access to wellness tools and resources that support emotional balance, focus, resilience, and joy.',
    callToAction: {
      heading: 'Support our work',
      text: [
        'Would you like to support children’s emotional and mental health in our community?',
        'Please consider becoming a sponsor today!',
      ],
      label: 'Become a sponsor',
      href: '/childrens-center/sponsor',
    },
    verifyNote:
      'Renamed from Nature’s Sensory Gym (an old-site name) to the name on Boclaire’s flyer, “1. Nature Based Sensory Experience AKA signature program”, updated 2026-09-12. Copy is hers. Left off the page: “These experiences also support neuroplasticity, helping the brain build stronger pathways for learning, emotional balance, focus, and adaptability.” That is a brain-development claim master context 15 and 27 require evidence for. Also from the flyer (2026-09-13, Rev approved): the tagline (her “One of our signature wellness program”, made plural), her first-person center sentence (“nature based” hyphenated), the mission line, and her Support Our Work ask, linked to the sponsor page. The “Where” detail is condensed from her center sentence. Still not on this page: her bio, and the seven “Other wellness classes”, which the flyer labels as other classes. Her flyer ends “All classes are designed based on individual needs and may include:” with no list after it.',
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
    sections: [
      {
        heading: 'What happens',
        bullets: [
          'Walking slowly, outdoors',
          'Simple breathing practices',
          'Light acupressure, in the traditional sense',
          'Noticing rather than achieving',
        ],
      },
    ],
    honestNote:
      'Practitioners have long used acupressure points to help people settle. That is not the same as saying a point works the same way for everyone.',
  },
  {
    slug: 'mindful-movement-workout',
    art: 'tree',
    name: 'Mindful Movement Workout',
    audience: 'adults',
    audienceLabel: 'Adults',
    pillars: ['somatic-movement'],
    summary: 'A gentle full-body session outdoors.',
    body: [
      'Walking, breath, and gentle full-body movement, outside. It’s a workout in the sense that you’ll use your body, and not in the sense that anyone is counting reps at you.',
      'The focus is on feeling how the body coordinates as one thing, legs and arms and torso all together, rather than working parts in isolation.',
    ],
    sections: [
      {
        heading: 'What happens',
        bullets: [
          'Walking and gentle strength work',
          'Breath paired with movement',
          'Attention to how the whole body coordinates',
          'Outdoors, weather permitting',
        ],
      },
    ],
    honestNote:
      'Come as you are. If something hurts, we work around it.',
  },
  {
    slug: 'body-prayer-session',
    art: 'seated',
    name: 'Body Prayer Session',
    /* Grouped with the faith-based classes rather than under adults. It was
     * already flagged faithBased, which only labelled the card; the grouping is
     * what actually lets someone choose it on purpose. */
    audience: 'spiritual',
    audienceLabel: 'Adults',
    pillars: ['mindful-meditation', 'somatic-movement'],
    summary: 'A faith-based practice blending prayer, breath, and gentle movement.',
    body: [
      'Prayer, breathwork, and gentle movement together, held as a spiritual practice rather than a fitness class.',
      'It’s openly Christian in framing. If that’s what you’re looking for, this is that. If it isn’t, the other sessions don’t include it.',
    ],
    sections: [
      {
        heading: 'What happens',
        bullets: [
          'Prayer',
          'Breathwork',
          'Gentle movement and stillness',
          'Body awareness',
          'Mindfulness',
          'Quiet, unhurried pacing',
        ],
      },
    ],
    honestNote:
      'This is a spiritual practice and we keep it in that register. It is not offered as a treatment, and it is not a promise of physical healing.',
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
    sections: [
      {
        heading: 'What happens',
        bullets: [
          'A guided hike suited to the age group',
          'Games and exploring along the way',
          'A quiet moment before heading back',
          'Celebrating, outdoors',
        ],
      },
    ],
    honestNote:
      'Group size, route, and timing get set with you beforehand. Bring your own cake.',
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
    sections: [
      {
        heading: 'What happens',
        bullets: [
          'A guided walk at a conversational pace',
          'Space for reflection, if the group wants it',
          'Simple breathing practice',
          'Somewhere worth looking at',
        ],
      },
    ],
    honestNote: 'Route and length are set with you. Bring water and decent shoes.',
  },
  {
    slug: 'rv-wellness-retreat',
    art: 'sprig',
    name: 'RV Wellness Retreat',
    audience: 'events',
    audienceLabel: 'Adults · Retreat',
    pillars: ['whole-person-thinking'],
    summary: 'Stay in your own RV. Rest, and take what you want.',
    body: [
      'Guests stay in their own RV. Rest is the main event. Wellness sessions are available and entirely optional.',
      'Nobody is going to knock on your door at six in the morning to get you to a sunrise practice. If you want to sleep, sleep.',
    ],
    sections: [
      {
        heading: 'What happens',
        bullets: [
          'Your own RV, your own schedule',
          'Optional movement and meditation sessions',
          'Time outdoors',
          'Rest, mostly',
        ],
      },
    ],
    honestNote:
      'Dates, site details and what’s included are still being worked out. Join the waitlist and we’ll tell you as soon as there’s something real to say.',
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
    sections: [
      {
        heading: 'What happens',
        bullets: [
          'Reading and talking through stories',
          'Discussion suited to the age group',
          'Simple quiet practice',
          'Time together',
        ],
      },
    ],
    honestNote: 'This is an explicitly faith-based group, so you know what you are signing up for.',
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
    sections: [
      {
        heading: 'What happens',
        bullets: [
          'Reading and open discussion',
          'Outdoors where the weather allows',
          'Room to talk, and room not to',
          'A regular time that is theirs',
        ],
      },
    ],
    honestNote:
      'Openly faith-based. Nothing here touches dieting, body rules or appearance.',
    faithBased: true,
  },
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
    tagline: 'Personalized Support At Your Pace',
    summary:
      'Individual sessions designed to support memory, focus, confidence, and brain wellness for overall well-being.',
    details: [
      { label: 'Length', value: '40 minutes' },
      { label: 'Where', value: 'Travel to your location available' },
    ],
    body: [
      'Individual sessions designed to support memory, focus, confidence, and brain wellness for overall well-being.',
    ],
    sections: [
      {
        heading: 'Exercises include',
        bullets: [
          'Neuro exercises',
          'Mindfulness practice for mental clarity',
          'Breathwork & acupressure points for stress reduction',
          'Gentle movement for brain and body connection',
          'Personalized cognitive exercise based on your needs',
          'Eye exercises for vision and brain health',
          'Practices to develop a more positive outlook on life',
        ],
      },
      {
        heading: 'Benefits',
        bullets: ['Build confidence', 'Stay mentally active', 'Support healthy aging'],
      },
    ],
    honestNote:
      'These sessions are not treatment for dementia, Alzheimer’s disease, or any neurological condition.',
    verifyNote:
      'Copy is Boclaire’s flyer “5. Elder care”. Edits, each because master context 9 forbids promising outcomes for elders: “Eye exercises for improving vision and brain health” loses “improving”; the Benefits list keeps only Build confidence, Stay mentally active, and Support healthy aging, and leaves off “Improve memory and concentration and reduce brain fog” and “Navigate Life Stress with Ease and Turn Stress into Strength”. The honest note is the one sentence section 9 requires. Master context 9 notes there has previously been only one spot. PRICE: none published.',
  },
  {
    slug: 'mindful-teen-circle',
    name: 'Mindful Teen Circle',
    audience: 'teens',
    audienceLabel: 'Teens',
    pillars: ['whole-person-thinking', 'somatic-movement'],
    status: 'in-development',
    art: 'seated',
    source: 'boclaire-flyer',
    summary:
      'A supportive and welcoming group designed to help teens build a healthy relationship with their bodies, food, and emotional well-being.',
    body: [
      'A supportive and welcoming group designed to help teens build a healthy relationship with their bodies, food, and emotional well-being. Through mindfulness, open discussion, gentle movement, and practical life skills and wellness tools, participants will learn to care for themselves with confidence, kindness, and respect.',
    ],
    sections: [
      {
        heading: 'Topics include',
        bullets: [
          'Developing a positive body image and healthy self-esteem',
          'Mindful eating and listening to the body’s natural hunger and fullness cues',
          'Healthy nutrition without dieting or body shame',
          'Mindful self-care during the menstrual cycle',
          'Safe acupressure points that may help relieve common menstrual discomforts',
          'Gentle yoga, stretching, and movement',
          'Stress management, emotional resilience, and mindfulness practices',
          'Breathing exercises, relaxation techniques, and guided meditation',
          'Building confidence, healthy friendships, emotional intelligence, and self-compassion',
          'Journaling, creative activities, and meaningful group discussions',
        ],
      },
    ],
    closing:
      'The goal of the Mindful Teen Circle is to empower teens with practical, lifelong tools that support physical health, emotional balance, body awareness, and confidence as they navigate the exciting and sometimes challenging journey of adolescence.',
    honestNote:
      'All wellness practices are educational in nature and are intended to encourage healthy habits and self-care. There is no dieting, no calorie counting, and no body standards, and nothing here is treatment for an eating disorder or any menstrual condition.',
    verifyNote:
      'Copy is Boclaire’s flyer “7. Mindful Teen Circle”. Bullets are her ten topics with lead-in verbs and the two longest tails trimmed; her full wording is in the flyer. The second sentence of the honest note is not hers and is kept deliberately: a class about body image and food with teenagers is where that limit matters (master context 47). No schedule, age range, or group size is established.',
  },
  {
    slug: 'private-somatic-flow',
    name: 'Private Somatic Flow',
    audience: 'adults',
    audienceLabel: 'Adults',
    pillars: ['somatic-movement'],
    status: 'by-request',
    art: 'seated',
    source: 'boclaire-flyer',
    tagline: 'A Conversation with Your Mind + Body',
    summary:
      'A personalized movement experience where you learn to slow down, notice what your body is communicating, and respond with intention.',
    details: [
      { label: 'Booking', value: 'By appointment' },
      { label: 'Pace', value: 'Come as you are. Move at your own pace.' },
    ],
    body: [
      'What if movement wasn’t about telling your body what to do? What if it was a conversation?',
      'Private Somatic Flow is a personalized movement experience where you learn to slow down, notice what your body is communicating, and respond with intention.',
    ],
    sections: [
      {
        heading: 'The goal is empowerment',
        intro: 'You will learn how to notice what is happening in your body and choose how to respond.',
        bullets: [
          'Sometimes your body may need movement',
          'Sometimes it may need breath',
          'Sometimes it may benefit from an acupressure point',
          'Sometimes it may simply need you to pause and listen',
        ],
      },
      {
        heading: 'You may begin to notice',
        intro:
          'We explore gentle movement, mindful breathing, body awareness, and acupressure to help you develop a deeper connection with yourself.',
        bullets: [
          'Where you hold tension',
          'How your breathing changes',
          'What movements bring ease',
          'What your body is asking for',
          'How different acupressure points affect your awareness',
          'When to move, when to pause, and when to rest',
        ],
      },
    ],
    closing: 'Notice. Attend. Respond. Become your own guide.',
    honestNote:
      'There is no perfect pose. No pushing through. No one-size-fits-all formula. We listen first. Then we respond.',
    verifyNote:
      'Copy is Boclaire’s flyer “PRIVATE SOMATIC FLOW WITH BOCLAIRE”, verbatim apart from trimming. Left off: the “My role is…” lines, which are about her rather than the class, and the leftover AI comment in that file (“I especially love…”), which is not flyer copy. “4. Somatic flow” may describe a separate group class; not built until Rev confirms. PRICE: none published. Master context 37 lists $75 for a single session historically.',
  },
  {
    slug: 'one-to-one-mindfulness-enrichment',
    name: '1:1 Mindfulness Enrichment Program',
    audience: 'children',
    audienceLabel: 'Children',
    pillars: ['whole-person-thinking', 'somatic-movement', 'mindful-meditation'],
    art: 'pair',
    source: 'boclaire-flyer',
    tagline: 'A personalized mindful childhood experience',
    summary:
      'A nurturing one-on-one experience designed around your child’s unique needs, personality, interests, natural rhythm, and curiosity.',
    details: [
      { label: 'Format', value: 'One-on-one' },
      { label: 'Enrollment', value: 'Weekly and monthly enrollment options available' },
    ],
    body: [
      'A nurturing one-on-one experience designed around your child’s unique needs, personality, interests, natural rhythm, and curiosity.',
      'This program blends mindful care with meaningful enrichment through movement, nature, creativity, cultural exploration, and child-led learning.',
      'Your child is supported in developing confidence, emotional awareness, creativity, independence, and a deeper connection with themselves, nature, and the world around them.',
    ],
    sections: [
      {
        heading: 'Your child’s experience includes',
        bullets: [
          'Children’s yoga, brain exercise, and creative movement',
          'Mindfulness, breathing, and body awareness',
          'Outdoor nature exploration and gardening',
          'Exploration of different cultures, traditions, foods, and ways of life',
          'Child-led creative exploration: art, music, storytelling, and creative projects guided by your child’s interests and imagination',
          'Age-appropriate learning activities',
          'Healthy homemade meals, snacks provided (organic whenever possible) and mindful eating practice',
        ],
      },
    ],
    closing:
      'Your child is receiving my full attention and my unique wellness-based approach to daily care. Perfect for busy parents who want a holistic experience for their child.',
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
      'Copy and every price come from Boclaire’s flyer “2. One-on-One Care”. Edits: the bullet “Personalized attention and care” is dropped because the closing line says it; her second “Includes” list is left off because it repeats the first. Rev confirmed this is regular childcare that teaches mindful living. He also says no license is required for in-home care under a certain number of children. That number is not recorded anywhere, so the site makes NO licensing claim in either direction.',
  },
  {
    slug: 'wellness-walk',
    name: 'Wellness Walk',
    audience: 'children',
    audienceLabel: 'Children',
    pillars: ['somatic-movement', 'mindful-meditation'],
    art: 'trail',
    summary:
      'A mindful nature walk that combines gentle somatic movement, body awareness, and breathwork.',
    body: [
      'A mindful nature walk that combines gentle somatic movement, body awareness, and breathwork. You’ll explore natural movement while walking, helping you reconnect with your body and become more aware of how you feel in the moment.',
    ],
    sections: [
      {
        heading: 'Benefits',
        bullets: [
          'Supports body awareness and mindful movement',
          'Encourages relaxed, natural movement',
          'Helps release everyday tension',
          'Supports calm, steady breathing',
          'Invites a deeper connection with nature',
        ],
      },
    ],
    verifyNote:
      'Copy from Rev (2026-09-13), verbatim. Placed in the children group on his instruction, but the copy is written to “you” and reads as an adult or family walk: confirm with Boclaire who it is for. No schedule, group size, or price established. Not the same class as Guided Mindful Walk (homeschool PE) or Meditative Wellness Walk (adults), and it has its own illustration, FigureTrail, so the three walks do not share a picture.',
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
    tagline: 'PE and Social Enrichment Class',
    summary:
      'Each class includes a Guided Mindful Walk, where students practice being fully present by observing their surroundings, listening to nature, and connecting their breath with movement.',
    details: [
      { label: 'When', value: 'Fridays: Limited spots available' },
      { label: 'For', value: 'Homeschool students' },
    ],
    body: [
      'This class helps students build healthy bodies and calm, focused minds through movement in nature. Each class includes a Guided Mindful Walk, where students practice being fully present by observing their surroundings, listening to nature, and connecting their breath with movement.',
    ],
    sections: [
      {
        heading: 'During each class',
        intro:
          'Activities are adapted to each student’s age, developmental level, and the outdoor environment.',
        bullets: [
          'Guided mindful walking',
          'Age-appropriate movement',
          'Breathing',
          'Brain exercises',
          'Simple acupressure techniques',
        ],
      },
      {
        heading: 'Students will develop',
        bullets: [
          'Balance, coordination, flexibility, strength, posture, and endurance',
          'Mindfulness and healthy movement habits',
          'Curiosity, observation of the natural world, teamwork, self-confidence, and respect for others',
        ],
      },
    ],
    closing:
      'This program provides a safe, engaging, and supportive environment where students can improve their physical fitness while developing lifelong wellness skills through purposeful movement and time outdoors.',
    verifyNote:
      'Copy is Boclaire’s flyer “6. Homeschoolers”. Edits: her opening subject “The Wellness Walk helps students” becomes “This class” so the page carries one name; her second paragraph becomes the “During each class” bullets; “while practicing mindfulness and learning healthy movement habits” becomes the bullet “Mindfulness and healthy movement habits”. Her About Your Teacher block is not published, including the Granite Peak vendor line, which master context 21 forbids without current confirmation. PRICE: none published.',
  },
  {
    slug: 'zenflow',
    name: 'ZenFlow™ with Boclaire',
    audience: 'business-retreats',
    audienceLabel: 'Businesses, schools, events, and retreats',
    pillars: ['somatic-movement', 'mindful-meditation'],
    status: 'by-request',
    art: 'hands',
    source: 'boclaire-flyer',
    tagline: 'Bring Wellness to Your Workplace',
    summary:
      'Support the health and well-being of your team with a calming, restorative wellness experience.',
    details: [
      { label: 'Who it suits', value: 'Accessible to all ages and fitness levels' },
      { label: 'Booking', value: 'Workplace wellness classes or event bookings' },
    ],
    body: [
      'Support the health and well-being of your team with a calming, restorative wellness experience designed to reduce stress, improve focus, and leave you feeling refreshed and energized.',
    ],
    sections: [
      {
        heading: 'Each class blends',
        bullets: [
          'Gentle somatic movement to release tension and improve mobility',
          'Guided breathwork to calm the nervous system and increase mental clarity',
          'Mindful Living Practice',
          'Acupressure techniques to promote relaxation, ease stress, and support overall wellness',
        ],
      },
    ],
    closing: 'Perfect for businesses, schools, wellness events, retreats, and community organizations.',
    verifyNote:
      'Copy is Boclaire’s flyer “7. Bring Wellness to Your Workplace”, verbatim. “Accessible to all ages and fitness levels” comes from the flyer’s About block but describes the classes, not her. The rest of that block is not published: three of its claims appear nowhere in the master context (the “Children’s Meditation Stories” authorship, Sierra Yoga Center, Mindful Mom). The ™ is hers; nobody has checked whether the mark is registered. PRICE: none published; quoted per booking.',
  }

]

export const classBySlug = Object.fromEntries(classes.map((c) => [c.slug, c]))
