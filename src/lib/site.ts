/**
 * Canonical site constants.
 *
 * The integration identifiers below are carried over verbatim from the previous
 * site (ndxtraders/TrueWellnessMovement). They are live and wired to real
 * accounts: GA4 history, an existing subscriber list, and the only donation
 * path that currently works. Changing a value here silently breaks a revenue or
 * measurement path, so treat them as fixed unless Boclaire re-issues them.
 */

export const site = {
  name: 'True Wellness Movement',
  tagline: 'Movement, mindfulness and time outside, for children, families and the people who care for them.',
  locality: 'Jamestown',
  region: 'CA',
  regionName: 'California',
  county: 'Tuolumne County',
  url: 'https://truewellnessmovement.com',
} as const

export const contact = {
  email: 'truewellnessmovement@gmail.com',
  /** Digits only. Format at the render site so the footer bug on the old site cannot recur. */
  phoneDigits: '4085084309',
  phoneDisplay: '(408) 508-4309',
  phoneHref: 'tel:+14085084309',
} as const

export const integrations = {
  /** Google Analytics 4. Carries the site's entire measurement history. */
  ga4MeasurementId: 'G-CBXJ1LM80R',

  /** MailerLite universal script account + the embedded signup form id. */
  mailerlite: {
    accountId: '53138',
    formId: '4tjIUv',
    scriptSrc: 'https://assets.mailerlite.com/js/universal.js',
  },

  /** Web3Forms. Serverless form delivery, no backend required. */
  web3forms: {
    accessKey: '44e85080-7afb-4ca2-8c9f-4c7485323760',
    endpoint: 'https://api.web3forms.com/submit',
  },

  /**
   * DonorBox. The only wired payment path, and it does more than the old site
   * used it for.
   *
   * The live campaign is "True Wellness Movement Kids' Wellness Garden", slug
   * `true-wellness`. It offers One-time and Monthly (`plan_duration` = "1 M"),
   * with $10 / $50 / $100 presets and a custom amount field.
   *
   * MONTHLY RECURRING ALREADY WORKS. The old site never used it: all four
   * sponsorship tiers pointed at an on-page email form, and the three donate
   * buttons used the bare campaign URL with no parameters. So four priced tiers
   * were described in detail and none of them could be paid for.
   *
   * Both deep-link parameters are verified working on the public campaign URL
   * (not just the embed): `default_interval=m` preselects Monthly, and
   * `amount=<n>` prefills `donation[custom_amount]`.
   */
  donorbox: {
    slug: 'true-wellness',
    campaignUrl: 'https://donorbox.org/true-wellness',
    /** Embed target, for the day this becomes an on-page iframe. */
    embedUrl: 'https://donorbox.org/embed/true-wellness',
    /** DonorBox's widget script, if the form is ever embedded rather than linked. */
    widgetScript: 'https://donorbox.org/widgets.js',
  },

  linktree: 'https://linktr.ee/truewellnessmovement',

  /** Podcast episode embedded on the old homepage. */
  spotifyEpisodeId: '1gTuKRVYZlKgkISZ52EeEW',
} as const

/**
 * Builds a DonorBox link.
 *
 * `monthly` preselects the recurring interval; `amount` prefills the custom
 * amount box. Passing a sponsorship tier's amount turns a tier card into a real
 * recurring checkout rather than a description of one.
 */
export function donorboxUrl({ amount, monthly }: { amount?: number; monthly?: boolean } = {}) {
  const q = new URLSearchParams()
  if (monthly) q.set('default_interval', 'm')
  if (amount) q.set('amount', String(amount))
  const s = q.toString()
  return s ? `${integrations.donorbox.campaignUrl}?${s}` : integrations.donorbox.campaignUrl
}

export const spotifyEmbedUrl = `https://open.spotify.com/embed/episode/${integrations.spotifyEpisodeId}`

/**
 * Standing disclosures.
 *
 * Required by Boclaire's own claim standards, not by a lawyer. Every page that
 * describes a class or session renders `servicesDisclosure`; every page with a
 * donation or sponsorship control renders `donationDisclosure`. These are meant
 * to be readable at body size, not buried in gray 8px legal type.
 */
export const disclosures = {
  services:
    'These classes are wellness education. They are not medical care, therapy, or treatment for any condition. If something is going on with your health, or your child’s, please talk to a doctor.',
  donation:
    'True Wellness Movement is currently pursuing 501(c)(3) charitable status. Donations are not tax-deductible at this time.',
} as const
