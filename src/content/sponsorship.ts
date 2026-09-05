/**
 * Sponsorship tiers, carried over from the live site's `sponsors.html`.
 *
 * Named for healing plants of the Sierra foothills. That naming is Boclaire's
 * and it is one of the better pieces of brand work on the old site, so it is
 * preserved exactly. Master context 6: do not casually rename a program.
 *
 * THE ARITHMETIC IS COHERENT, AND WORTH KNOWING.
 *
 *   $500  / 3 children  / 16 hrs = $10.42 per child-hour
 *   $1000 / 6 children  / 16 hrs = $10.42
 *   $2000 / 12 children / 16 hrs = $10.42
 *   $167  / 1 child     / 16 hrs = $10.44   (rounding only)
 *
 * So $167 is not an arbitrary number: it is one child's share of the $2,000
 * monthly program described in master context 5 (12 children, 16 hours each,
 * roughly 3:1). It is a SPONSORSHIP rate, not a class price. Those are
 * different things and conflating them would mean charging a parent what it
 * costs a donor to fund a child.
 *
 * HOW A SPONSOR IS ACTUALLY CHARGED IS STILL UNCONFIRMED.
 *
 * On the live site every tier button points at an on-page email form, not at a
 * payment. There is exactly one DonorBox URL on the whole site, with no per-tier
 * deep links, no amount parameters and no recurring-interval parameters. So the
 * sponsorship program does not connect to DonorBox at all today. Until Boclaire
 * confirms whether recurring plans exist, these CTAs open an email rather than
 * implying a checkout that is not there.
 *
 * Every benefit below is a promise to a paying sponsor. They are reproduced from
 * her live site rather than invented, but they should be reviewed before launch:
 * a homepage sponsor bar and a named garden bed are commitments to build things.
 */

export interface SponsorTier {
  slug: string
  /** Sierra foothills plant name. Never renamed. */
  name: string
  label: string
  amount: number
  children: number
  /** children x 16 hours. */
  hours: number
  benefits: string[]
  /** The $2,000 tier is the full program described in master context 5. */
  featured?: boolean
}

export const sponsorTiers: SponsorTier[] = [
  {
    slug: 'california-poppy',
    name: 'California Poppy',
    label: 'Entry level',
    amount: 167,
    children: 1,
    hours: 16,
    benefits: [
      'Name listed on the sponsors page',
      'Annual thank-you post on social media',
      'Quarterly impact email update',
    ],
  },
  {
    slug: 'yerba-santa',
    name: 'Yerba Santa',
    label: 'Community level',
    amount: 500,
    children: 3,
    hours: 48,
    benefits: [
      'Logo and website link on the sponsors page',
      'Monthly social media mention',
      'Quarterly impact email update',
      'Printable Community Sponsor certificate',
    ],
  },
  {
    slug: 'elderberry',
    name: 'Elderberry',
    label: 'Sustaining level',
    amount: 1000,
    children: 6,
    hours: 96,
    benefits: [
      'Logo on the homepage sponsor bar',
      'Named in every email newsletter',
      'Monthly social media mention',
      'Quarterly impact email update',
      'Printable Community Sponsor certificate',
      'Invitation to observe a class session',
    ],
  },
  {
    slug: 'oak',
    name: 'Oak',
    label: 'Founding level',
    amount: 2000,
    children: 12,
    hours: 192,
    featured: true,
    benefits: [
      'Everything in Elderberry',
      'Featured sponsor spotlight: your story and why you give',
      'Printable Founding Sponsor certificate',
      'A named garden bed when the physical garden is built',
      'A quarterly personal update call from Boclaire',
      'First right of renewal each year',
    ],
  },
]
