import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { pillars, pillarByKey } from '@/content/pillars'
import { classes } from '@/content/classes'
import type { PillarKey } from '@/content/types'
import { statusLabels } from '@/content/types'
import { statusOf } from '@/content/classes'
import { PillarArt } from '@/components/art/for-pillar'
import { ClassArt } from '@/components/art/for-class'
import { ArcBand } from '@/components/art/illustrations'

export function generateStaticParams() {
  return pillars.map((p) => ({ slug: p.key }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const p = pillarByKey[slug as PillarKey]
  if (!p) return {}
  return { title: p.name, description: p.summary }
}

export default async function PillarPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const p = pillarByKey[slug as PillarKey]
  if (!p) notFound()

  const related = classes.filter((c) => c.pillars.includes(p.key))

  return (
    <>
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-5 py-(--spacing-section)">
          <Link
            href="/approach"
            className="text-small font-medium text-ink-muted transition-colors hover:text-plum"
          >
            ← Our approach
          </Link>
          <div className="mt-8 grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-center">
            <div>
              <h1 className="max-w-2xl text-display text-ink">{p.name}</h1>
              <div className="mt-6 max-w-xl space-y-5 text-body-lg text-ink-muted">
                {p.definition.map((d) => (
                  <p key={d}>{d}</p>
                ))}
              </div>
            </div>
            <PillarArt pillar={p.key} className="mx-auto w-full max-w-xs" />
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-5 py-(--spacing-section)">
          <div className="max-w-2xl">
            <h2 className="text-h3 text-ink">In practice</h2>
            <ul className="mt-6 space-y-3">
              {p.inPractice.map((i) => (
                <li key={i} className="flex gap-3 text-ink-muted">
                  <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-sage">
        <div className="mx-auto max-w-6xl px-5 pt-(--spacing-section) pb-16">
          <div className="max-w-2xl">
            <h2 className="text-h2 text-ink">What this does not claim</h2>
            <p className="mt-5 text-body-lg text-ink">{p.doesNotClaim}</p>
          </div>
        </div>
        <ArcBand className="-mb-px block w-full" />
      </section>

      {related.length > 0 && (
        <section>
          <div className="mx-auto max-w-6xl px-5 py-(--spacing-section)">
            <h2 className="text-h3 text-ink">Classes that use it</h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/classes/${c.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-(--radius-card) border border-line bg-surface transition-colors duration-200 hover:border-plum"
                  >
                    <span className="flex justify-center bg-bg pt-8">
                      <ClassArt art={c.art} className="h-32 w-auto" />
                    </span>
                    <span className="flex flex-1 flex-col border-t border-line p-8">
                      <span className="text-caption font-medium text-ink-muted">
                        {statusLabels[statusOf(c)]}
                      </span>
                      <span className="mt-2 font-display text-h4 font-semibold text-ink transition-colors group-hover:text-plum">
                        {c.name}
                      </span>
                      <span className="mt-3 text-small text-ink-muted">{c.summary}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  )
}
