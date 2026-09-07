/**
 * Archived classes.
 *
 * Nothing in here is on the site. Archived entries produce no card on the
 * classes hub and no page at /classes/<slug>, because `classes` in
 * ./classes.ts is the only list either of those reads.
 *
 * The copy is kept because it is finished work, not because it is retired.
 *
 * TO BRING ONE BACK: cut its object out of `archivedClasses` below and paste
 * it into the `classes` array in ./classes.ts. Nothing else needs changing.
 * The slug, and therefore the URL, comes back exactly as it was.
 */

import type { ClassOffering } from './classes'

export const archivedClasses: ClassOffering[] = [
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
]
