import type { Metadata } from 'next'
import Link from 'next/link'
import { sponsorTiers } from '@/content/sponsorship'
import { contact, disclosures, donorboxUrl, integrations } from '@/lib/site'
import { ArcBand, BeeBloom, HillsSun, Sprig } from '@/components/art/illustrations'

/**
 * This page exists because `next.config.ts` 301s `/sponsors.html` here, and
 * until now that redirect landed on a 404. `sponsors.html` is indexed and is the
 * primary conversion path on the site that is live today, so this was the single
 * most costly defect in the build.
 */
export const metadata: Metadata = {
  title: 'Sponsor a child',
  description:
    'Monthly sponsorship puts a Tuolumne County child in nature-based wellness classes. Four levels, named for healing plants of the Sierra foothills.',
}

export default function SponsorPage() {
  return (
    <>
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-5 pt-(--spacing-section) pb-10">
          <Link
            href="/childrens-center"
            className="text-small font-medium text-ink-muted transition-colors hover:text-plum"
          >
            ← The Children&rsquo;s Wellness Center
          </Link>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
            <div>
              <h1 className="max-w-2xl text-display text-ink">
                Put a local child in wellness classes.
              </h1>
              <p className="mt-6 max-w-xl text-body-lg text-ink-muted">
                A monthly sponsorship covers a Tuolumne County child&rsquo;s place in the program:
                two classes a week, up to two hours each, outdoors, in groups of about three to one.
              </p>
            </div>
            <BeeBloom className="mx-auto w-full max-w-xs" />
          </div>
        </div>
        <HillsSun compact className="-mt-10 block w-full sm:-mt-20 lg:-mt-28" />
      </section>

      {/*
        Stated before the tiers, not after. On the live site every tier button
        opens an email form rather than a payment, and there is exactly one
        DonorBox link on the whole site with no per-tier or recurring parameters.
        Presenting four priced tiers as though they were checkout buttons would
        be the kind of small dishonesty this brand's own standards rule out.
      */}
      <section className="border-b border-line bg-surface">
        <div className="mx-auto flex max-w-6xl items-start gap-6 px-5 py-10">
          <Sprig className="hidden h-24 w-auto shrink-0 sm:block" />
          <div className="max-w-2xl">
            <h2 className="text-h4 font-semibold text-ink">How this works</h2>
            <p className="mt-3 text-ink-muted">
              Each level below opens a monthly donation set to that amount, through DonorBox. You
              can change the amount or cancel any time from your own DonorBox account.
            </p>
            <p className="mt-3 text-ink-muted">
              Email Boclaire as well, or instead, if you would rather talk it through first, or if
              your sponsorship needs an invoice, a business name on it, or a start date. The
              recognition that comes with a level is arranged by her directly.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-5 py-(--spacing-section)">
          <div className="max-w-2xl">
            <h2 className="text-h2 text-ink">The Healing Journey sponsorship levels</h2>
            <p className="mt-5 text-body-lg text-ink-muted">
              Each level is named for a healing plant of the Sierra foothills, the place where this
              program is taking root.
            </p>
          </div>

          <ul className="mt-12 grid gap-5 lg:grid-cols-3">
            {sponsorTiers
              .filter((t) => !t.featured)
              .map((t) => (
                <li
                  key={t.slug}
                  className="flex flex-col rounded-(--radius-card) border border-line bg-surface p-8"
                >
                  <span className="text-caption font-medium text-ink-muted">
                    {t.label}
                  </span>
                  <h3 className="mt-3 font-display text-h3 font-semibold text-ink">{t.name}</h3>
                  <p className="mt-4 flex items-baseline gap-2">
                    <span className="font-display text-h2 font-semibold text-plum">
                      ${t.amount.toLocaleString()}
                    </span>
                    <span className="text-small text-ink-muted">per month</span>
                  </p>
                  <p className="mt-5 border-y border-line py-6 text-small text-ink">
                    Sponsors {t.children} {t.children === 1 ? 'child' : 'children'}, {t.hours} hours
                    of wellness education a month.
                  </p>
                  <ul className="mt-5 flex-1 space-y-2.5">
                    {t.benefits.map((b) => (
                      <li key={b} className="flex gap-3 text-small text-ink-muted">
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber"
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7 flex flex-col items-start gap-3">
                    <a
                      href={donorboxUrl({ amount: t.amount, monthly: true })}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-pill bg-plum px-6 py-3 font-semibold text-bg transition-opacity duration-200 hover:opacity-90"
                    >
                      Sponsor ${t.amount.toLocaleString()}/month
                    </a>
                    <a
                      href={`mailto:${contact.email}?subject=${encodeURIComponent(
                        `Sponsorship: ${t.name} ($${t.amount}/month)`
                      )}&body=${encodeURIComponent(
                        `Hi Boclaire,\n\nI'd like to talk about sponsoring at the ${t.name} level ($${t.amount}/month, ${t.children} ${
                          t.children === 1 ? 'child' : 'children'
                        }).\n\nName:\nOrganisation (if any):\nPhone:\n\nThank you.`
                      )}`}
                      className="text-small font-medium text-ink-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-plum"
                    >
                      Or talk to Boclaire first
                    </a>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </section>

      {/* Oak. The full program from master context 5, so it gets the field. */}
      {sponsorTiers
        .filter((t) => t.featured)
        .map((t) => (
          <section key={t.slug} className="bg-sage">
            <div className="mx-auto max-w-6xl px-5 pt-(--spacing-section) pb-16">
              <div className="grid gap-10 md:grid-cols-2 md:items-start">
                <div>
                  <span className="inline-block rounded-pill border border-plum px-4 py-1.5 text-caption font-medium text-plum">
                    Most impactful
                  </span>
                  <span className="mt-5 block text-caption font-medium text-ink">
                    {t.label}
                  </span>
                  <h2 className="mt-3 font-display text-mega leading-none font-semibold text-ink">
                    {t.name}
                  </h2>
                  <p className="mt-5 flex items-baseline gap-2">
                    <span className="font-display text-h1 font-semibold text-plum">
                      ${t.amount.toLocaleString()}
                    </span>
                    <span className="text-small text-ink">per month</span>
                  </p>
                  <p className="mt-5 max-w-md text-body-lg text-ink">
                    Sponsors {t.children} children, {t.hours} hours of wellness education a month.
                    This is the whole program: mornings and afternoons, Monday through Thursday.
                  </p>
                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <a
                      href={donorboxUrl({ amount: t.amount, monthly: true })}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-pill bg-plum px-7 py-3.5 font-semibold text-bg transition-opacity duration-200 hover:opacity-90"
                    >
                      Sponsor ${t.amount.toLocaleString()}/month
                    </a>
                    <a
                      href={`mailto:${contact.email}?subject=${encodeURIComponent(
                        `Sponsorship: ${t.name} ($${t.amount}/month)`
                      )}&body=${encodeURIComponent(
                        `Hi Boclaire,\n\nI'd like to talk about sponsoring at the ${t.name} founding level ($${t.amount}/month, ${t.children} children).\n\nName:\nOrganisation (if any):\nPhone:\n\nThank you.`
                      )}`}
                      className="font-medium text-ink underline decoration-plum/50 decoration-2 underline-offset-4 transition-colors hover:text-plum"
                    >
                      Talk to Boclaire first
                    </a>
                  </div>
                </div>

                <ul className="space-y-3 md:pt-16">
                  {t.benefits.map((b) => (
                    <li key={b} className="flex gap-3 text-ink">
                      <span
                        aria-hidden="true"
                        className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-plum"
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <ArcBand className="-mb-px block w-full" />
          </section>
        ))}

      <section>
        <div className="mx-auto max-w-6xl px-5 py-(--spacing-section)">
          <div className="max-w-2xl">
            <h2 className="text-h3 text-ink">Rather give once?</h2>
            <p className="mt-5 text-ink-muted">
              A one-off donation of any size goes toward the garden build, class materials, and free
              classes for local kids. No commitment, no monthly plan.
            </p>
            <a
              href={integrations.donorbox.campaignUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-block rounded-pill bg-plum px-7 py-3.5 font-semibold text-bg transition-opacity duration-200 hover:opacity-90"
            >
              Donate
            </a>
            <p className="mt-8 text-caption leading-relaxed text-ink-muted">{disclosures.donation}</p>
          </div>
        </div>
      </section>
    </>
  )
}
