/**
 * Canonical site constants.
 *
 * The integration identifiers below are carried over verbatim from the previous
 * site (ndxtraders/TrueWellnessMovement). They are live and wired to real
 * accounts — GA4 history, an existing subscriber list, and the only donation
 * path that currently works. Changing a value here silently breaks a revenue or
 * measurement path, so treat them as fixed unless Boclaire re-issues them.
 */

export const site = {
  name: 'True Wellness Movement',
  tagline: 'Movement, mindfulness, and time outside — for children, families, and the people who care for them.',
  locality: 'Jamestown',
  region: 'CA',
  regionName: 'California',
  county: 'Tuolumne County',
  url: 'https://truewellnessmovement.com',
} as const

export const contact = {
  email: 'truewellnessmovement@gmail.com',
  /** Digits only — format at the render site so the footer bug on the old site can't recur. */
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

  /** Web3Forms — serverless form delivery, no backend required. */
  web3forms: {
    accessKey: '44e85080-7afb-4ca2-8c9f-4c7485323760',
    endpoint: 'https://api.web3forms.com/submit',
  },

  /** DonorBox — the only currently-wired donation path. */
  donorbox: {
    campaignUrl: 'https://www.donorbox.org/true-wellness',
  },

  linktree: 'https://linktr.ee/truewellnessmovement',

  /** Podcast episode embedded on the old homepage. */
  spotifyEpisodeId: '1gTuKRVYZlKgkISZ52EeEW',
} as const

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
    'These classes are wellness education. They are not medical care, therapy, or treatment for any condition. If something is going on with your child’s health, please talk to your doctor.',
  donation:
    'True Wellness Movement is currently pursuing 501(c)(3) charitable status. Donations are not tax-deductible at this time.',
} as const
