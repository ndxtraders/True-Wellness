/**
 * Content types for programs, pillars, and offerings.
 *
 * Two ideas drive this shape:
 *
 * 1. `status` makes honesty structural. Boclaire's standards forbid presenting a
 *    concept as a running class. Rather than relying on whoever writes the copy
 *    to remember that, every offering carries a status that the UI renders as a
 *    visible chip. A concept can live on the site — labeled as one.
 *
 * 2. `verified` gates facts that no source confirms. Several claims on the old
 *    site (a magazine feature, two credentials, a county statistic) appear
 *    nowhere in the master context. Anything marked `false` is filtered out of
 *    the public build, so an unconfirmed claim cannot ship by accident.
 */

/** Which of the five approach pillars an offering expresses. */
export type PillarKey =
  | 'returning-to-balance'
  | 'whole-person-thinking'
  | 'somatic-movement'
  | 'mindful-meditation'
  | 'healthy-meals'

/** Who a program is built for. Drives the audience-first navigation. */
export type AudienceKey =
  | 'children'
  | 'teens'
  | 'adults'
  | 'caregivers-elders'
  | 'families-parents'
  | 'schools'
  | 'events'
  /* Faith-based offerings sit in their own category rather than under children
   * and teens. A parent choosing a children's yoga class and a parent choosing
   * a Bible study are making different decisions, and mixing them means the
   * children's list quietly asks people to opt out rather than opt in. */
  | 'spiritual'
  /* Paid group work bought by an organisation rather than by a parent. It is a
   * different buyer, a different budget, and it runs at their location. */
  | 'business-retreats'

/**
 * How real an offering is right now.
 *
 * - `enrolling`    — running and taking people
 * - `waitlist`     — running, currently full
 * - `by-request`   — happens when someone books it
 * - `in-development` — a real intention, not yet a scheduled thing
 */
export type OfferingStatus = 'enrolling' | 'waitlist' | 'by-request' | 'in-development'

export interface Pillar {
  key: PillarKey
  /** Display name. Never renamed without Boclaire's say-so. */
  name: string
  /** One line, for the homepage strip and nav. */
  summary: string
  /** The full definition, in her voice. */
  definition: string[]
  /** What this practice does in a room — concrete, observable. */
  inPractice: string[]
  /**
   * What this pillar explicitly does NOT claim.
   *
   * Rendered publicly. Stating the limit is the positioning: "we don't have to
   * scare people into taking care of themselves."
   */
  doesNotClaim: string
  /**
   * `true` where the master context defines the pillar directly.
   * `false` where the definition is a faithful proposal awaiting her sign-off.
   */
  definitionConfirmed: boolean
}

export interface Offering {
  slug: string
  /** Canonical name. Programs are never silently renamed. */
  name: string
  /** Korean name, where one is fixed (e.g. 두뇌 건강 지원 세션). */
  nameKo?: string
  audience: AudienceKey
  /** Cross-links. The first entry is the primary pillar. */
  pillars: PillarKey[]
  status: OfferingStatus
  /** One sentence describing what actually happens. Activity, not outcome. */
  summary: string
  body?: string[]
  format?: string
  duration?: string
  /**
   * Price in whole dollars, with the cadence.
   * Omitted entirely where the price is unconfirmed — an unverified price is
   * worse than no price.
   */
  price?: { amount: number; unit: 'session' | 'month' | 'program' }
  /**
   * False when a detail here (schedule, price, availability) traces only to a
   * historical note. Unverified offerings are excluded from the public build.
   */
  verified: boolean
  /** Internal note on exactly what needs confirming. Never rendered. */
  verifyNote?: string
}

/** Public build filter. Anything unconfirmed stays out until Boclaire signs off. */
export function publicOfferings(all: readonly Offering[]): Offering[] {
  return all.filter((o) => o.verified)
}

export function offeringsByAudience(all: readonly Offering[], audience: AudienceKey): Offering[] {
  return publicOfferings(all).filter((o) => o.audience === audience)
}

export function offeringsByPillar(all: readonly Offering[], pillar: PillarKey): Offering[] {
  return publicOfferings(all).filter((o) => o.pillars.includes(pillar))
}

/** Everything held back, so the open-questions list writes itself. */
export function pendingVerification(all: readonly Offering[]): Offering[] {
  return all.filter((o) => !o.verified)
}

export const statusLabels: Record<OfferingStatus, string> = {
  enrolling: 'Enrolling now',
  waitlist: 'Waitlist',
  'by-request': 'By request',
  'in-development': 'In development',
}
