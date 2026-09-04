import type { Metadata } from 'next'
import Link from 'next/link'
import { classes } from '@/content/classes'
import { disclosures } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Classes',
  description:
    'Yoga, somatic movement, mindfulness, garden sessions, and one-to-one acupressure for children, teens, adults, and families in Tuolumne County.',
}

export default function ClassesPage() {
  return (
    <>
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-5 py-[--spacing-section]">
          <h1 className="max-w-3xl text-h1 text-ink">Classes</h1>
          <p className="mt-6 max-w-2xl text-body-lg text-ink-muted">
            Every class runs about forty minutes, with twenty minutes of closing practice at the
            end. Small groups, mostly outdoors, and built around what the people in front of us can
            actually do that day.
          </p>
          <p className="mt-6 max-w-2xl rounded-[--radius-card] border border-line bg-surface px-6 py-5 text-small text-ink-muted">
            Classes are filling by waitlist while the schedule is set. Nothing is charged when you
            join one — Boclaire will be in touch with dates before anything is booked.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-5 py-[--spacing-section]">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {classes.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/classes/${c.slug}`}
                  className="group flex h-full flex-col rounded-[--radius-card] border border-line bg-surface p-7 transition-colors duration-200 hover:border-plum"
                >
                  <span className="font-sans text-caption font-medium tracking-[0.06em] text-ink-muted uppercase">
                    {c.audienceLabel}
                  </span>
                  <span className="mt-3 font-display text-h4 font-semibold text-ink transition-colors group-hover:text-plum">
                    {c.name}
                  </span>
                  <span className="mt-3 flex-1 text-small text-ink-muted">{c.summary}</span>
                  <span className="mt-6 flex items-baseline gap-2 border-t border-line pt-4">
                    <span className="font-display text-h4 font-semibold text-plum">${c.price}</span>
                    <span className="text-caption text-ink-muted">
                      per {c.priceUnit}
                      {c.priceConfirmed ? '' : ' · placeholder'}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-12 max-w-2xl text-caption leading-relaxed text-ink-muted">
            {disclosures.services}
          </p>
        </div>
      </section>
    </>
  )
}
