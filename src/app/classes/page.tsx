import type { Metadata } from 'next'
import Link from 'next/link'
import { classes, statusOf, type ClassOffering } from '@/content/classes'
import type { AudienceKey } from '@/content/types'
import { statusLabels } from '@/content/types'
import { ClassArt } from '@/components/art/for-class'
import { HillsSun, Sprig } from '@/components/art/illustrations'
import { WaitlistButton } from '@/components/waitlist-button'
import { disclosures } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Classes',
  description:
    'Yoga, somatic movement, mindfulness, walking, garden sessions, and one-to-one acupressure for children, teens, adults, elders, and schools in Tuolumne County.',
}

/**
 * The hub groups by who a class is for, because that is the question people
 * actually arrive with. A flat alphabetical grid makes a parent read fourteen
 * cards to find the two that concern them.
 *
 * Order is deliberate: children first, since that is the practice's center of
 * gravity, and schools last, since that audience arrives knowing what it wants.
 */
const groups: { key: AudienceKey; heading: string; blurb: string }[] = [
  {
    key: 'children',
    heading: 'For children',
    blurb: 'Movement, mindfulness, and time outdoors, at your child’s pace.',
  },
  {
    key: 'teens',
    heading: 'For teens',
    blurb: 'Small circles built to be a place rather than a lecture.',
  },
  {
    key: 'adults',
    heading: 'For adults',
    blurb: 'One-to-one work: somatic movement, acupressure, and walking with attention.',
  },
  {
    key: 'caregivers-elders',
    heading: 'For elders and the people caring for them',
    blurb: 'Personalized sessions, at your pace, with travel to you where that helps.',
  },
  {
    key: 'families-parents',
    heading: 'For families',
    blurb: 'Sessions where the grown-up and the child are both in the room.',
  },
  {
    key: 'schools',
    heading: 'For schools and homeschool co-ops',
    blurb: 'Enrichment and PE classes that can run at your location.',
  },
  {
    key: 'events',
    heading: 'Celebrations',
    blurb: 'Birthdays and gatherings, outdoors.',
  },
  {
    key: 'spiritual',
    heading: 'Faith-based classes',
    blurb:
      'Openly Christian, and grouped here so you can choose them on purpose rather than come across them in a list.',
  },
]

const statusStyles: Record<string, string> = {
  enrolling: 'border-moss text-moss',
  waitlist: 'border-line-strong text-ink-muted',
  'by-request': 'border-amber text-amber',
  'in-development': 'border-line-strong text-ink-muted',
}

function ClassCard({ c }: { c: ClassOffering }) {
  const status = statusOf(c)
  return (
    <li className="flex flex-col overflow-hidden rounded-(--radius-card) border border-line bg-surface">
      {/* The illustration is the card, not an accessory to it. */}
      <div className="flex items-end justify-center bg-bg pt-8">
        <ClassArt art={c.art} className="h-44 w-auto" />
      </div>

      <div className="flex flex-1 flex-col border-t border-line p-8">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span
            className={`inline-block rounded-pill border px-3 py-1 text-caption font-medium ${statusStyles[status]}`}
          >
            {statusLabels[status]}
          </span>
          {c.faithBased && (
            <span className="text-caption font-medium text-ink-muted">Faith-based</span>
          )}
        </div>

        <h3 className="mt-4 text-h4">
          <Link
            href={`/classes/${c.slug}`}
            className="font-semibold text-ink transition-colors hover:text-plum"
          >
            {c.name}
          </Link>
        </h3>
        {c.nameKo && <p className="mt-1 text-small text-ink-muted">{c.nameKo}</p>}

        <p className="mt-3 flex-1 text-small text-ink-muted">{c.summary}</p>

        {(c.format || c.duration) && (
          <p className="mt-4 text-caption text-ink-muted">
            {[c.duration, c.format].filter(Boolean).join('. ')}
          </p>
        )}

        <div className="mt-6 border-t border-line pt-5">
          {typeof c.price === 'number' ? (
            <p className="flex items-baseline gap-2">
              <span className="font-display text-h4 font-semibold text-plum">${c.price}</span>
              <span className="text-caption text-ink-muted">
                per {c.priceUnit}
                {c.priceConfirmed ? '' : ', placeholder'}
              </span>
            </p>
          ) : (
            <p className="text-caption text-ink-muted">Price to be confirmed.</p>
          )}

          <WaitlistButton className="mt-5" name={c.name} compact />
          <p className="mt-3 text-caption text-ink-muted">
            Placeholder. Joining does not book or charge you.
          </p>
          <Link
            href={`/classes/${c.slug}`}
            className="mt-4 inline-block text-small font-medium text-plum underline decoration-amber decoration-2 underline-offset-4"
          >
            Read about this class
          </Link>
        </div>
      </div>
    </li>
  )
}

export default function ClassesPage() {
  const populated = groups
    .map((g) => ({ ...g, items: classes.filter((c) => c.audience === g.key) }))
    .filter((g) => g.items.length > 0)

  return (
    <>
      {/* Hero. Full-bleed landscape rather than a text block in a box. */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-5 pt-(--spacing-section) pb-12">
          <div className="max-w-2xl">
            <h1 className="text-display text-ink">
              True Wellness Classes For Everyone
            </h1>
            <p className="mt-6 max-w-xl text-body-lg text-ink-muted">
              Small groups, mostly outdoors, built around people's actual abilities.
            </p>
          </div>
        </div>
        {/* Pulled up so the headline sits in the sky rather than above a gap. */}
        <HillsSun compact className="-mt-20 block w-full sm:-mt-32 lg:-mt-44" />
      </section>

      {/* Standing note about the waitlist. Stated once, not on every card. */}
      <section className="border-b border-line bg-surface">
        <div className="mx-auto flex max-w-6xl items-start gap-6 px-5 py-10">
          <Sprig className="hidden h-24 w-auto shrink-0 sm:block" />
          <div className="max-w-2xl">
            <h2 className="text-h4 font-semibold text-ink">Class Schedule Changes Frequently</h2>
            <p className="mt-3 text-ink-muted">
              Don't see what you are looking for? Combe back often or contact me for more information.
            </p>
          </div>
        </div>
      </section>

      {/* Groups. Alternating ground so fourteen cards do not read as one slab. */}
      {populated.map((g, i) => (
        <section
          key={g.key}
          className={`border-b border-line ${i % 2 === 1 ? 'bg-surface' : ''}`}
          aria-labelledby={`group-${g.key}`}
        >
          <div className="mx-auto max-w-6xl px-5 py-(--spacing-section)">
            <div className="max-w-2xl">
              <h2 id={`group-${g.key}`} className="text-h2 text-ink">
                {g.heading}
              </h2>
              <p className="mt-4 text-body-lg text-ink-muted">{g.blurb}</p>
            </div>
            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {g.items.map((c) => (
                <ClassCard key={c.slug} c={c} />
              ))}
            </ul>
          </div>
        </section>
      ))}

      <section>
        <div className="mx-auto max-w-6xl px-5 py-(--spacing-section)">
          <p className="max-w-2xl text-caption leading-relaxed text-ink-muted">
            {disclosures.services}
          </p>
        </div>
      </section>
    </>
  )
}
