import type { Metadata } from 'next'
import { disclosures, integrations } from '@/lib/site'

export const metadata: Metadata = {
  title: "Children's Wellness Center",
  description:
    'An outdoor wellness space and herb garden being built in Tuolumne County, so local children have somewhere to move, plant things, and be outside every week.',
}

export default function ChildrensCenterPage() {
  return (
    <>
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-5 py-[--spacing-section]">
          <h1 className="max-w-3xl text-h1 text-ink">The Children&rsquo;s Wellness Center</h1>
          <div className="mt-6 max-w-2xl space-y-5 text-body-lg text-ink-muted">
            <p>
              We are building an outdoor wellness space and herb garden in Tuolumne County, so local
              kids have somewhere to move, plant things, and be outside every week.
            </p>
            <p>
              Kids move differently outside. They climb, wander, notice things, and get tired in a
              good way. Two hours a week outdoors is a reasonable thing to want for a child, and
              most kids around here do not get it.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-5 py-[--spacing-section]">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col rounded-[--radius-card] border border-line bg-surface p-8">
              <h2 className="text-h4 font-semibold text-ink">Make a donation</h2>
              <p className="mt-3 flex-1 text-small text-ink-muted">
                Donations go toward the garden build, class materials, and free classes for local
                kids.
              </p>
              <a
                href={integrations.donorbox.campaignUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 self-start rounded-pill bg-plum px-6 py-3 font-semibold text-bg transition-opacity duration-200 hover:opacity-90"
              >
                Donate
              </a>
            </div>

            <div className="flex flex-col rounded-[--radius-card] border border-line bg-surface p-8">
              <h2 className="text-h4 font-semibold text-ink">Sponsor a child</h2>
              <p className="mt-3 flex-1 text-small text-ink-muted">
                A monthly sponsorship puts a Tuolumne County child in nature-based wellness classes.
                Small groups, outdoors, every week. Sponsorship levels are being finalised — email
                to be first to hear.
              </p>
              <a
                href={integrations.donorbox.campaignUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 self-start rounded-pill border border-line-strong px-6 py-3 font-semibold text-ink transition-colors duration-200 hover:border-plum hover:text-plum"
              >
                Support the build
              </a>
            </div>
          </div>

          <p className="mt-6 text-caption text-ink-muted">{disclosures.donation}</p>
        </div>
      </section>
    </>
  )
}
