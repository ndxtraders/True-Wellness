import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { classes, classBySlug, statusOf, type ClassSection } from '@/content/classes'
import { pillarByKey } from '@/content/pillars'
import { WaitlistButton } from '@/components/waitlist-button'
import { ClassArt } from '@/components/art/for-class'
import { statusLabels } from '@/content/types'
import { contact, disclosures } from '@/lib/site'

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

/**
 * One labelled list, in the shape of Boclaire's flyers: her label, an optional
 * lead-in sentence, then bullets. A lone long list splits into two columns so a
 * ten-topic list does not run down the page; two lists side by side do not.
 */
function Section({ s, wide }: { s: ClassSection; wide: boolean }) {
  const split = wide && s.bullets.length > 6
  return (
    <div>
      <h2 className="text-h3 text-ink">{s.heading}</h2>
      {s.intro && <p className="mt-4 max-w-2xl text-ink-muted">{s.intro}</p>}
      <ul className={`mt-6 ${split ? 'gap-x-10 sm:columns-2' : ''}`}>
        {s.bullets.map((b) => (
          <li key={b} className="mb-3 flex break-inside-avoid gap-3 text-ink-muted">
            <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default async function ClassPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const c = classBySlug[slug]
  if (!c) notFound()

  const paired = c.sections.length > 1
  const hasPrice = typeof c.price === 'number'
  // A forty-word goal statement at h3 size reads as a wall; it drops a step.
  const closingSize = c.closing && c.closing.length > 120 ? 'text-h4' : 'text-h3'

  return (
    <>
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-5 py-(--spacing-section)">
          <Link
            href="/classes"
            className="text-small font-medium text-ink-muted transition-colors hover:text-plum"
          >
            ← All classes
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start lg:gap-12">
            <div>
              <p className="text-caption font-medium text-ink-muted">
                {c.audienceLabel}
                {c.faithBased ? ', faith-based' : ''}
              </p>
              <h1 className="mt-4 text-h1 text-ink">{c.name}</h1>
              {c.nameKo && <p className="mt-2 text-body-lg text-ink-muted">{c.nameKo}</p>}
              {c.tagline && (
                <p className="mt-3 font-display text-h4 leading-snug text-ink-muted">{c.tagline}</p>
              )}
              <p className="mt-5 inline-block rounded-pill border border-line-strong px-4 py-1.5 text-caption font-medium text-ink-muted">
                {statusLabels[statusOf(c)]}
              </p>
              <div className="mt-6 max-w-xl space-y-5 text-body-lg text-ink-muted">
                {c.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>

            {/* Details card. It stacks straight under the description on mobile,
                so the buttons never end up below the lists. */}
            <aside className="rounded-(--radius-card) border border-line bg-surface p-8">
              <ClassArt art={c.art} className="mx-auto mb-6 h-36 w-auto lg:h-48" />
              {hasPrice && (
                <p className="flex items-baseline gap-2">
                  {c.priceFrom && <span className="text-small text-ink-muted">From</span>}
                  <span className="font-display text-h2 font-semibold text-plum">${c.price}</span>
                  <span className="text-small text-ink-muted">per {c.priceUnit}</span>
                </p>
              )}
              {c.details && c.details.length > 0 && (
                <dl
                  className={`space-y-3 text-small ${hasPrice ? 'mt-5 border-t border-line pt-5' : ''}`}
                >
                  {c.details.map((d) => (
                    <div key={d.label} className="flex gap-4">
                      <dt className="w-24 shrink-0 text-ink-muted">{d.label}</dt>
                      <dd className="font-medium text-ink">{d.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
              <div className="mt-7 flex flex-wrap items-center gap-3">
                {c.primaryAction === 'contact' ? (
                  <Link
                    href="/contact"
                    className="rounded-pill bg-plum px-5 py-2.5 text-small font-semibold text-bg transition-opacity duration-200 hover:opacity-90"
                  >
                    Contact Boclaire
                  </Link>
                ) : (
                  <>
                    <WaitlistButton name={c.name} compact />
                    <Link
                      href="/contact"
                      className="rounded-pill border border-line-strong px-5 py-2.5 text-small font-semibold text-ink transition-colors duration-200 hover:border-plum hover:text-plum"
                    >
                      Contact Boclaire
                    </Link>
                  </>
                )}
              </div>
              {c.primaryAction !== 'contact' && (
                <p className="mt-5 text-caption text-ink-muted">
                  Joining the waitlist does not book or charge you.
                </p>
              )}
            </aside>
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div
          className={`mx-auto grid max-w-6xl gap-12 px-5 py-(--spacing-section) ${paired ? 'md:grid-cols-2' : ''}`}
        >
          {c.sections.map((s) => (
            <Section key={s.heading} s={s} wide={!paired} />
          ))}
        </div>
      </section>

      {/* Her closing line, set as the page's statement. Sage is the homepage's
          pillar band; ink on sage is 8.42:1. */}
      {c.closing && (
        <section className="border-b border-line bg-sage">
          <div className="mx-auto max-w-6xl px-5 py-(--spacing-section)">
            <p className={`max-w-3xl font-display ${closingSize} leading-snug text-ink`}>
              {c.closing}
            </p>
          </div>
        </section>
      )}

      {/* Her own call to action, only where the flyer makes one. */}
      {c.callToAction && (
        <section className="border-b border-line bg-surface">
          <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-5 py-(--spacing-section) md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-h3 text-ink">{c.callToAction.heading}</h2>
              {c.callToAction.text.map((t) => (
                <p key={t} className="mt-3 text-body-lg text-ink-muted">
                  {t}
                </p>
              ))}
            </div>
            <Link
              href={c.callToAction.href}
              className="shrink-0 rounded-pill bg-plum px-7 py-3.5 font-semibold text-bg transition-opacity duration-200 hover:opacity-90"
            >
              {c.callToAction.label}
            </Link>
          </div>
        </section>
      )}

      {/* Enrollment tiers. Only a class sold by days-per-week has these, so the
          section is absent rather than empty for the others. */}
      {c.priceTiers && c.priceTiers.length > 0 && (
        <section className="border-b border-line bg-surface">
          <div className="mx-auto max-w-6xl px-5 py-(--spacing-section)">
            <h2 className="text-h3 text-ink">Enrollment options</h2>
            <p className="mt-4 max-w-xl text-ink-muted">
              Weekly and monthly enrollment options are available.
            </p>
            <dl className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {c.priceTiers.map((t) => (
                <div
                  key={`${t.unit}-${t.label}`}
                  className="flex flex-col-reverse border-t border-line pt-5"
                >
                  <dt className="mt-2 text-small text-ink-muted">
                    {t.label}, per {t.unit}
                  </dt>
                  <dd className="font-display text-h3 font-semibold text-plum">
                    ${t.amount.toLocaleString('en-US')}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-10 max-w-xl text-ink-muted">
              Contact Boclaire for details, at{' '}
              <a
                href={`mailto:${contact.email}`}
                className="font-medium text-plum underline decoration-amber decoration-2 underline-offset-4"
              >
                {contact.email}
              </a>{' '}
              or{' '}
              <Link
                href="/contact"
                className="font-medium text-plum underline decoration-amber decoration-2 underline-offset-4"
              >
                send her a message
              </Link>
              .
            </p>
          </div>
        </section>
      )}

      {/* The limit, only when this class has one of its own. The footer below
          already covers "not medical care, therapy, or treatment". */}
      <section className="border-b border-line">
        <div
          className={`mx-auto grid max-w-6xl gap-12 px-5 py-(--spacing-section) ${c.honestNote ? 'md:grid-cols-2' : ''}`}
        >
          {c.honestNote && (
            <div>
              <h2 className="text-h4 font-semibold text-ink">Worth being clear about</h2>
              <p className="mt-4 text-ink-muted">{c.honestNote}</p>
            </div>
          )}
          <div>
            <h2 className="text-caption font-medium text-ink-muted">Part of</h2>
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
        <div className="mx-auto max-w-6xl px-5 py-(--spacing-section)">
          <p className="max-w-2xl text-caption leading-relaxed text-ink-muted">
            {disclosures.services}
          </p>
        </div>
      </section>
    </>
  )
}
