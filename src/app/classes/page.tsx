import type { Metadata } from 'next'
import Link from 'next/link'
import { classes, statusOf, type ClassOffering } from '@/content/classes'
import type { AudienceKey } from '@/content/types'
import { statusLabels } from '@/content/types'
import { ClassArt } from '@/components/art/for-class'
import { ArcBand, HillsSun, Sprig } from '@/components/art/illustrations'
import { WaitlistButton } from '@/components/waitlist-button'
import { disclosures } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Classes',
  description:
    'Yoga, somatic movement, mindfulness, walking, garden sessions, and one-to-one care for children, teens, adults, elders, schools, and businesses in Tuolumne County.',
}

/**
 * The hub groups by who a class is for, because that is the question people
 * actually arrive with. A flat alphabetical grid makes a parent read fourteen
 * cards to find the two that concern them.
 *
 * Order is deliberate: children first, since that is the practice's center of
 * gravity, and schools last of the everyday groups, since that audience arrives
 * knowing what it wants. Special programs follow under their own heading.
 */
type Group = { key: AudienceKey; heading: string; blurb: string }

const groups: Group[] = [
  {
    key: 'children',
    heading: 'For children',
    blurb: 'Movement, mindfulness, and time outdoors, at your child’s pace.',
  },
  {
    key: 'teens',
    heading: 'For teens',
    blurb: 'A supportive and welcoming group for teens.',
  },
  {
    key: 'adults',
    heading: 'For adults',
    blurb: 'Somatic movement, acupressure, and walking with attention.',
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
    blurb: 'Classes now available for school enrichment programs and homeschool co-ops.',
  },
]

/**
 * Special programs: bookings that come from an organisation or an occasion
 * rather than one family. They sit under one "Special Programs" heading, which
 * the homepage card of the same name links to, in the order Rev set.
 */
const specialGroups: Group[] = [
  {
    key: 'business-retreats',
    heading: 'For businesses and retreats',
    blurb:
      'Special classes for businesses, schools, wellness events, retreats, and community organizations.',
  },
  {
    key: 'events',
    heading: 'Celebrations',
    blurb: 'Birthdays and gatherings, outdoors.',
  },
  {
    key: 'spiritual',
    heading: 'Faith-based classes',
    blurb: 'Christian classes and groups for children, teens, and adults.',
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

        <p className="mt-3 flex-1 text-small text-ink-muted">{c.tagline ?? c.summary}</p>

        {/* One key fact, the first from the details card: "40 minutes",
            "Fridays: Limited spots available". */}
        {c.details?.[0] && (
          <p className="mt-4 text-caption font-medium text-ink">{c.details[0].value}</p>
        )}

        <div className="mt-6 border-t border-line pt-5">
          {typeof c.price === 'number' && (
            <p className="mb-5 flex items-baseline gap-2">
              {c.priceFrom && <span className="text-caption text-ink-muted">From</span>}
              <span className="font-display text-h4 font-semibold text-plum">${c.price}</span>
              <span className="text-caption text-ink-muted">per {c.priceUnit}</span>
            </p>
          )}

          {c.primaryAction === 'contact' ? (
            <Link
              href="/contact"
              className="inline-block rounded-pill bg-plum px-5 py-2.5 text-small font-semibold text-bg transition-opacity duration-200 hover:opacity-90"
            >
              Contact Boclaire
            </Link>
          ) : (
            <WaitlistButton name={c.name} compact />
          )}
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

function GroupSection({
  group,
  items,
  shaded,
  headingLevel,
}: {
  group: Group
  items: ClassOffering[]
  shaded: boolean
  /** Special programs sit under their own h2, so their group headings step down a level. */
  headingLevel: 'h2' | 'h3'
}) {
  const Heading = headingLevel
  return (
    <section
      className={`border-b border-line ${shaded ? 'bg-surface' : ''}`}
      aria-labelledby={`group-${group.key}`}
    >
      <div className="mx-auto max-w-6xl px-5 py-(--spacing-section)">
        <div className="max-w-2xl">
          <Heading id={`group-${group.key}`} className="text-h2 text-ink">
            {group.heading}
          </Heading>
          <p className="mt-4 text-body-lg text-ink-muted">{group.blurb}</p>
        </div>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((c) => (
            <ClassCard key={c.slug} c={c} />
          ))}
        </ul>
      </div>
    </section>
  )
}

export default function ClassesPage() {
  const withItems = (list: Group[]) =>
    list
      .map((group) => ({ group, items: classes.filter((c) => c.audience === group.key) }))
      .filter((g) => g.items.length > 0)
  const core = withItems(groups)
  const special = withItems(specialGroups)

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
             All classes are designed based on your needs
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
              Don&rsquo;t see what you are looking for? Come back often, or{' '}
              <Link href="/contact" className="font-medium text-plum underline decoration-amber decoration-2 underline-offset-4">
                contact Boclaire
              </Link>{' '}
              for more information.
            </p>
          </div>
        </div>
      </section>

      {/* Groups. Alternating ground so fourteen cards do not read as one slab. */}
      {core.map(({ group, items }, i) => (
        <GroupSection key={group.key} group={group} items={items} shaded={i % 2 === 1} headingLevel="h2" />
      ))}

      {/* The Special Programs heading, on the sage field so it reads as a new
          part of the page rather than one more group. The homepage card links to
          #special-programs; scroll-mt clears the 72px sticky header. */}
      {special.length > 0 && (
        <section
          id="special-programs"
          className="scroll-mt-[72px] bg-sage"
          aria-labelledby="special-programs-heading"
        >
          <div className="mx-auto max-w-6xl px-5 pt-(--spacing-section) pb-16">
            <div className="max-w-2xl">
              <h2 id="special-programs-heading" className="text-h1 text-ink">
                Special Programs
              </h2>
              <p className="mt-5 text-body-lg text-ink">
                Special programs for businesses, events, celebrations and faith-based classes.
              </p>
            </div>
          </div>
          <ArcBand className="-mb-px block w-full" />
        </section>
      )}

      {special.map(({ group, items }, i) => (
        <GroupSection key={group.key} group={group} items={items} shaded={i % 2 === 1} headingLevel="h3" />
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
