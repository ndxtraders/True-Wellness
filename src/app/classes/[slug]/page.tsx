import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { classes, classBySlug } from '@/content/classes'
import { pillarByKey } from '@/content/pillars'
import { WaitlistButton } from '@/components/waitlist-button'
import { disclosures } from '@/lib/site'

export function generateStaticParams() {
  return classes.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const c = classBySlug[slug]
  if (!c) return {}
  return { title: c.name, description: c.summary }
}

export default async function ClassPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const c = classBySlug[slug]
  if (!c) notFound()

  return (
    <>
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-5 py-[--spacing-section]">
          <Link
            href="/classes"
            className="text-small font-medium text-ink-muted transition-colors hover:text-plum"
          >
            ← All classes
          </Link>

          <div className="mt-8 grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-start">
            <div>
              <p className="font-sans text-caption font-medium tracking-[0.06em] text-ink-muted uppercase">
                {c.audienceLabel}
                {c.faithBased ? ' · Faith-based' : ''}
              </p>
              <h1 className="mt-4 text-h1 text-ink">{c.name}</h1>
              <div className="mt-6 max-w-xl space-y-5 text-body-lg text-ink-muted">
                {c.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>

            <aside className="rounded-[--radius-card] border border-line bg-surface p-8">
              <p className="flex items-baseline gap-2">
                <span className="font-display text-h2 font-semibold text-plum">${c.price}</span>
                <span className="text-small text-ink-muted">per {c.priceUnit}</span>
              </p>
              {!c.priceConfirmed && (
                <p className="mt-3 text-caption text-ink-muted">
                  Placeholder pricing while the schedule is being set. The real number will be
                  confirmed before anyone is asked to pay anything.
                </p>
              )}
              <WaitlistButton className="mt-7" name={c.name} />
              <p className="mt-5 text-caption text-ink-muted">
                Joining the waitlist does not book or charge you.
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-[--spacing-section] md:grid-cols-2">
          <div>
            <h2 className="text-h3 text-ink">What happens</h2>
            <ul className="mt-6 space-y-3">
              {c.whatHappens.map((w) => (
                <li key={w} className="flex gap-3 text-ink-muted">
                  <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-h3 text-ink">Worth being clear about</h2>
            <p className="mt-6 text-ink-muted">{c.honestNote}</p>

            <h3 className="mt-10 font-sans text-caption font-medium tracking-[0.06em] text-ink-muted uppercase">
              Part of
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {c.pillars.map((k) => (
                <li key={k}>
                  <Link
                    href={`/approach/${k}`}
                    className="inline-block rounded-pill border border-line-strong px-4 py-1.5 text-small text-ink-muted transition-colors hover:border-plum hover:text-plum"
                  >
                    {pillarByKey[k].name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-5 py-[--spacing-section]">
          <p className="max-w-2xl text-caption leading-relaxed text-ink-muted">
            {disclosures.services}
          </p>
        </div>
      </section>
    </>
  )
}
