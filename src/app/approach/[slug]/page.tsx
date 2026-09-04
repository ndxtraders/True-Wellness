import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { pillars, pillarByKey } from '@/content/pillars'
import { classes } from '@/content/classes'
import type { PillarKey } from '@/content/types'

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
        <div className="mx-auto max-w-6xl px-5 py-[--spacing-section]">
          <Link
            href="/approach"
            className="text-small font-medium text-ink-muted transition-colors hover:text-plum"
          >
            ← Our approach
          </Link>
          <h1 className="mt-8 max-w-3xl text-h1 text-ink">{p.name}</h1>
          <div className="mt-6 max-w-2xl space-y-5 text-body-lg text-ink-muted">
            {p.definition.map((d) => (
              <p key={d}>{d}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-[--spacing-section] md:grid-cols-2">
          <div>
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
          <div className="rounded-[--radius-card] border border-line bg-surface p-8">
            <h2 className="text-h4 font-semibold text-ink">What this does not claim</h2>
            <p className="mt-4 text-ink-muted">{p.doesNotClaim}</p>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section>
          <div className="mx-auto max-w-6xl px-5 py-[--spacing-section]">
            <h2 className="text-h3 text-ink">Classes that use it</h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/classes/${c.slug}`}
                    className="group flex h-full flex-col rounded-[--radius-card] border border-line bg-surface p-7 transition-colors duration-200 hover:border-plum"
                  >
                    <span className="font-display text-h4 font-semibold text-ink transition-colors group-hover:text-plum">
                      {c.name}
                    </span>
                    <span className="mt-3 text-small text-ink-muted">{c.summary}</span>
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
