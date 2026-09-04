import type { Metadata } from 'next'
import Link from 'next/link'
import { pillars } from '@/content/pillars'

export const metadata: Metadata = {
  title: 'Our Approach',
  description:
    'The five ideas underneath every True Wellness Movement class — and a plain statement of what each one does not claim to do.',
}

export default function ApproachPage() {
  return (
    <>
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-5 py-[--spacing-section]">
          <h1 className="max-w-3xl text-h1 text-ink">How we think about this</h1>
          <p className="mt-6 max-w-2xl text-body-lg text-ink-muted">
            Five ideas run underneath every class. Each one comes with a plain statement of what it
            does not claim, because that is the part most wellness writing leaves out.
          </p>
        </div>
      </section>

      <section className="border-b border-line bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-[--spacing-section]">
          <h2 className="text-h3 text-ink">How we talk about wellness claims</h2>
          <div className="mt-6 max-w-2xl space-y-5 text-ink-muted">
            <p>
              A lot of wellness marketing works by making you feel broken first. We would rather
              not. You do not have to be frightened into taking care of yourself.
            </p>
            <p>
              So: we say what a session actually involves rather than what it will do to you. Where
              something comes from tradition, we call it tradition. Where evidence is thin or mixed,
              we say that too. And we never make a promise just because the promise would sell
              better.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-5 py-[--spacing-section]">
          <ul className="grid gap-4 md:grid-cols-2">
            {pillars.map((p) => (
              <li key={p.key}>
                <Link
                  href={`/approach/${p.key}`}
                  className="group flex h-full flex-col rounded-[--radius-card] border border-line bg-surface p-8 transition-colors duration-200 hover:border-plum"
                >
                  <span className="font-display text-h4 font-semibold text-ink transition-colors group-hover:text-plum">
                    {p.name}
                  </span>
                  <span className="mt-3 text-ink-muted">{p.summary}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
