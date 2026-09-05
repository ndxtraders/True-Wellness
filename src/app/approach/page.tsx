import type { Metadata } from 'next'
import Link from 'next/link'
import { pillars } from '@/content/pillars'
import { PillarArt } from '@/components/art/for-pillar'
import { ArcBand, HillsSun, SeedHead } from '@/components/art/illustrations'

export const metadata: Metadata = {
  title: 'Our Approach',
  description:
    'The five ideas underneath every True Wellness Movement class, and a plain statement of what each one does not claim to do.',
}

export default function ApproachPage() {
  return (
    <>
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-5 pt-(--spacing-section) pb-10">
          <h1 className="max-w-3xl text-display text-ink">How we think about this</h1>
          <p className="mt-6 max-w-xl text-body-lg text-ink-muted">
            Five ideas run underneath every class. Each one comes with a plain statement of what it
            does not claim, because that is the part most wellness writing leaves out.
          </p>
        </div>
        <HillsSun compact className="-mt-16 block w-full sm:-mt-28 lg:-mt-40" />
      </section>

      {/*
        The claims section sits on the coloured field rather than in a grey box.
        It is the most distinctive thing the practice says, and burying it in a
        secondary surface was underselling the one idea a competitor cannot copy
        without changing how they sell.
      */}
      <section className="bg-sage">
        <div className="mx-auto max-w-6xl px-5 pt-(--spacing-section) pb-16">
          <div className="mx-auto flex max-w-3xl items-start gap-8">
            <SeedHead className="mt-2 hidden h-16 w-16 shrink-0 sm:block" />
            <div>
              <h2 className="text-h2 text-ink">How we talk about wellness claims</h2>
              <div className="mt-6 space-y-5 text-body-lg text-ink">
                <p>
                  A lot of wellness marketing works by making you feel broken first. We would rather
                  not. You do not have to be frightened into taking care of yourself.
                </p>
                <p>
                  So: we say what a session actually involves rather than what it will do to you.
                  Where something comes from tradition, we call it tradition. Where evidence is thin
                  or mixed, we say that too. And we never make a promise just because the promise
                  would sell better.
                </p>
              </div>
            </div>
          </div>
        </div>
        <ArcBand className="-mb-px block w-full" />
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
