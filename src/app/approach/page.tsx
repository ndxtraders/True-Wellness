import type { Metadata } from 'next'
import Link from 'next/link'
import { pillars } from '@/content/pillars'
import { PillarArt } from '@/components/art/for-pillar'
import { HillsSun } from '@/components/art/illustrations'

export const metadata: Metadata = {
  title: 'Our Approach',
  description:
    'The five ideas that guide every True Wellness Movement class.',
}

export default function ApproachPage() {
  return (
    <>
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-5 pt-(--spacing-section) pb-10">
          <h1 className="max-w-3xl text-display text-ink">Our Approach</h1>
          <p className="mt-6 max-w-xl text-body-lg text-ink-muted">Five simple ideas guide every class. Pick one to learn more.</p>
        </div>
        <HillsSun compact className="-mt-16 block w-full sm:-mt-28 lg:-mt-40" />
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-5 py-(--spacing-section)">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p) => (
              <li key={p.key}>
                <Link
                  href={`/approach/${p.key}`}
                  className="group flex h-full flex-col overflow-hidden rounded-(--radius-card) border border-line bg-surface transition-colors duration-200 hover:border-plum"
                >
                  <span className="flex justify-center bg-bg pt-8">
                    <PillarArt pillar={p.key} className="h-36 w-auto" />
                  </span>
                  <span className="flex flex-1 flex-col border-t border-line p-8">
                    <span className="font-display text-h4 font-semibold text-ink transition-colors group-hover:text-plum">
                      {p.name}
                    </span>
                    <span className="mt-3 text-small text-ink-muted">{p.summary}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
