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
  /** Defaults to waitlist. Use contact when the service starts with a conversation. */
  primaryAction?: 'waitlist' | 'contact'
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
    tagline: 'A playful outdoor experience for children',
    summary:
      'Children explore nature through touch, smell, sound, movement, and hands-on garden time.',
    status: 'in-development',
    details: [
      { label: 'Planned location', value: 'Outdoor wellness center and herbal garden in Jamestown' },
    ],
    body: [
      'Children learn through movement, play, and their senses. In this outdoor experience, they explore plants, herbs, sounds, textures, and movement. They are invited to slow down, notice what is around them, and connect with nature at their own pace.',
      'Nature-Based Sensory Experience is being developed for our outdoor wellness center and herbal garden in Jamestown.',
    ],
    sections: [
      {
        heading: 'What children explore',
        bullets: [
          'Touch and smell herbs and plants',
          'Listen to sounds in nature',
          'Move and play outdoors',
          'Spend hands-on time in our herbal garden',
          'Notice how their bodies feel',
        ],
      },
      {
        heading: 'What this may support',
        intro: 'These activities may help children:',
        bullets: ['Slow down and feel calmer', 'Pay attention to what is around them'],
      },
    ],
    closing:
      'Our goal is to provide free wellness classes to children in Tuolumne County. We believe every child deserves access to time outdoors, mindful movement, and simple wellness tools they can use in daily life.',
    callToAction: {
      heading: 'Support our work',
      text: ['Want to help us bring free wellness classes to local children?'],
      label: 'Become a sponsor',
      href: '/childrens-center/sponsor',
    },
    verifyNote:
      'Rewritten from Boclaire’s Nature-Based Sensory Experience flyer and approved by Rev on 2026-09-13. The page leads with the activities, uses one modest relative benefit claim after the activities, and keeps the Jamestown center, herbal garden, free-class mission, waitlist, and sponsorship path. Left off the page: the neuroplasticity claim, the stronger nervous-system and “natural reset” claims, Boclaire’s bio, the unrelated list of other classes, and the unfinished final sentence from the flyer.',
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
    tagline: 'Personal support at your pace',
    summary:
      'A gentle private session with movement, breathing, mindfulness, and simple activities for focus.',
    details: [
      { label: 'Length', value: '40 minutes' },
      { label: 'Where', value: "A visit to the person's home may be available" },
    ],
    body: [
      'This is a gentle 40-minute private session for an older adult. Boclaire may use movement, breathing, mindfulness, acupressure, and simple games for focus and coordination. She keeps the pace comfortable.',
    ],
    sections: [
      {
        heading: 'During a session',
        intro: "Activities are chosen for the person's needs and comfort. A session may include:",
        bullets: [
          'Gentle movement and coordination games',
          'Short memory and focus games',
          'Mindfulness and slow breathing',
          'Gentle acupressure points',
          'Simple eye movements',
          'Positive thoughts and conversation',
        ],
      },
      {
        heading: 'What this may support',
        bullets: [
          'Focus and keeping the mind active',
          'Feeling calm, confident, and engaged during the visit',
        ],
      },
    ],
    honestNote:
      "This is a wellness session. It is not treatment for dementia, Alzheimer's disease, vision problems, or other health conditions.",
    primaryAction: 'contact',
    verifyNote:
      'Rewritten from Boclaire’s “5. Elder care” flyer. The copy explains the activities in plain language and does not promise changes in memory, vision, brain fog, stress, or health. Confirm current availability, travel, and whether there is still only one spot. No price is published.',
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
    tagline: 'A welcoming space for self-care, confidence, and honest conversation',
    summary:
      'Teens move, create, talk, and learn practical ways to care for their bodies and emotions.',
    body: [
      'Mindful Teen Circle is a welcoming group where teens can talk, move, create, and learn everyday self-care. Sessions explore body image, food, stress, friendships, and menstrual care in a kind, non-shaming way. Teens are invited to ask questions and take part at their own comfort level.',
      'Boclaire may also teach simple acupressure points as a self-care practice. Some teens might find the practice relaxing or comforting when they have cramps, bloating, or other common menstrual discomfort.',
    ],
    sections: [
      {
        heading: 'What we explore',
        bullets: [
          'Body respect and healthy self-esteem',
          'Mindful eating and noticing hunger and fullness',
          'Basic nutrition without dieting or body shame',
          'Menstrual care, hygiene, rest, and nourishment',
          'Gentle yoga, stretching, breathing, and meditation',
          'Journaling, creative activities, friendships, and group discussion',
        ],
      },
    ],
    closing:
      'The goal is to give teens useful ways to notice what they need and care for themselves with more kindness. There are no diet rules, calorie counting, or body standards.',
    honestNote:
      'This is an educational wellness group. It is not treatment for an eating disorder, a menstrual condition, or a mental health condition.',
    verifyNote:
      'Rewritten from Boclaire’s “7. Mindful Teen Circle” flyer. Ten topics are grouped into six scan-friendly bullets. Confirm the age range, group size, location, schedule, current status, and whether all menstrual-care topics will be included. No price is published.',
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
    tagline: 'A conversation with your mind and body',
    summary:
      'A private, gentle movement session for listening to your body and choosing how to respond.',
    details: [
      { label: 'Booking', value: 'By appointment' },
      { label: 'Pace', value: 'Come as you are. Move at your own pace.' },
    ],
    body: [
      'What if movement were a conversation with your body?',
      'Private Somatic Flow is a one-on-one session that gives you space to slow down and notice how your body feels. I guide you through gentle movement, breathing, body awareness, and simple acupressure. You move at your own pace and choose what feels useful.',
    ],
    sections: [
      {
        heading: 'What happens in a session',
        intro: 'Each session is shaped around you. We may use:',
        bullets: [
          'Gentle movement based on how your body feels',
          'Simple breathing practices',
          'Time to notice tension, ease, and changes in your breath',
          'Optional acupressure points',
          'Pauses to listen and rest',
        ],
      },
    ],
    closing: 'Notice. Attend. Respond. Become your own guide.',
    honestNote:
      'I guide you as you notice your body’s signals and choose how to respond. There is no perfect pose and no need to push through. We listen first. Then we respond.',
    primaryAction: 'contact',
    verifyNote:
      'Rewritten from Boclaire’s “PRIVATE SOMATIC FLOW WITH BOCLAIRE” flyer. The conversation idea and Notice. Attend. Respond. line are preserved. No outcome claim or price is added. Confirm whether a separate group Somatic Flow class exists and whether the historical $75 single-session price is current.',
  },
  {
    slug: 'one-to-one-mindfulness-enrichment',
    name: '1:1 Mindfulness Enrichment Program',
    audience: 'children',
    audienceLabel: 'Children',
    pillars: ['whole-person-thinking', 'somatic-movement', 'mindful-meditation'],
    art: 'pair',
    source: 'boclaire-flyer',
    status: 'by-request',
    tagline: 'One-on-one care shaped around your child',
    summary:
      'Personal care and enrichment through movement, nature, creativity, and child-led learning.',
    details: [
      { label: 'Format', value: 'One-on-one' },
      { label: 'Availability', value: 'Contact Boclaire for current options' },
    ],
    body: [
      "This one-on-one program gives your child Boclaire's full attention. Each day follows your child's age, interests, needs, and natural pace. Your child may move, explore outside, make art, hear stories, learn about different cultures, and practice simple mindfulness.",
      'Depending on the care plan, Boclaire may provide healthy homemade meals and snacks, with organic food used when possible. Children may also practice eating slowly and paying attention to their food.',
      "Boclaire follows your child's interests and questions. Your child has room to move, make things, play outside, and learn at a comfortable pace.",
    ],
    sections: [
      {
        heading: "Your child's day may include",
        bullets: [
          'Yoga, movement, and coordination games',
          'Mindfulness, breathing, and body awareness',
          'Outdoor play, garden time, and wellness walks',
          'Art, music, storytelling, and child-led projects',
          'Foods, traditions, and ways of life from around the world',
          "Learning activities suited to your child's age",
        ],
      },
    ],
    primaryAction: 'contact',
    verifyNote:
      'Rewritten from Boclaire’s “2. One-on-One Care” flyer. Confirm current availability, care hours, age range, location, weekly and monthly options, meals, snacks, and every price. The historical $25 hourly rate and weekly and monthly tiers are held back until confirmed. The site makes no licensing claim in either direction.',
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
    tagline: 'Outdoor PE and social enrichment',
    summary:
      'An outdoor class where students walk, move, breathe, observe nature, and spend time together.',
    details: [
      { label: 'For', value: 'Homeschool students' },
      { label: 'Schedule', value: 'Contact Boclaire for current availability' },
    ],
    body: [
      'Guided Mindful Walk is an outdoor PE and social class for homeschool students. Children walk, move, breathe, and notice the world around them. The activities change with the age group, weather, and place.',
    ],
    sections: [
      {
        heading: 'During each class',
        bullets: [
          'A guided walk with time to notice sights and sounds',
          'Movement for balance and coordination',
          'Breathing and body-awareness practices',
          'Simple games that connect thought and movement',
          'Simple acupressure taught as a wellness practice',
          'Time to explore and work with others',
        ],
      },
    ],
    closing:
      'Students practice healthy ways to move while they spend time outdoors together. Walking, breathing, and paying attention may help them feel calm and focused during class.',
    primaryAction: 'contact',
    verifyNote:
      'Rewritten from Boclaire’s “6. Homeschoolers” flyer. The Friday schedule and limited-spots language are held back until confirmed. A second “Wellness Walk” file may describe a Granite Peak version or a separate offer. Confirm the public name, age or grade range, schedule, location, capacity, audience, and current status. Do not publish Granite Peak vendor status without current confirmation. No price is published.',
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
    tagline: 'Bring gentle movement and mindfulness to your group',
    summary:
      'A gentle group session with movement, breathing, mindfulness, and simple acupressure.',
    details: [
      { label: 'Booking', value: 'Offered by request' },
      { label: 'Pace', value: 'Participants move at their own pace' },
    ],
    body: [
      'ZenFlow™ with Boclaire brings a gentle wellness class to your workplace or event. Your group steps away from the usual routine for movement, breathing, mindfulness, and simple acupressure. Boclaire guides the class at an easy pace and invites each person to work within their comfort level.',
    ],
    sections: [
      {
        heading: 'Each class may include',
        bullets: [
          'Gentle somatic movement for the whole body',
          'Guided breathing',
          'A simple mindful living practice',
          'Optional acupressure points',
          'Quiet time to notice how the body feels',
        ],
      },
      {
        heading: 'Good settings for ZenFlow™',
        bullets: [
          'Workplaces and staff wellness days',
          'Schools and community organizations',
          'Wellness events and retreats',
        ],
      },
    ],
    closing:
      "Time for movement and breathing may help people feel less tense and return to their day with a clearer mind. Each person's experience may be different.",
    honestNote:
      'ZenFlow™ is a wellness and educational experience. It is not medical care or treatment.',
    primaryAction: 'contact',
    verifyNote:
      'Rewritten from Boclaire’s “7. Bring Wellness to Your Workplace” flyer. The session is explained before one modest possible benefit. Confirm the trademark symbol, booking status, length, group-size limits, location or travel area, pricing, and whether schools remain an intended audience. No price is published.',
  }

]

export const classBySlug = Object.fromEntries(classes.map((c) => [c.slug, c]))
