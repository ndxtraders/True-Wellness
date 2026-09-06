import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { disclosures, integrations, site } from '@/lib/site'
import { Sprig } from '@/components/art/illustrations'

export const metadata: Metadata = {
  title: "Children's Wellness Center",
  description:
    'An outdoor wellness space and herb garden being built in Tuolumne County, so local children have somewhere to move, plant things, and be outside every week.',
}

export default function ChildrensCenterPage() {
  return (
    <>
      {/*
        Hero: the image alone. Per Rev the garden opens the page and the
        heading and copy follow underneath it, so you see the place before you
        read about it. The h1 is still the first heading in the document; only
        its visual position moved.

        Three things are true about this file and all three are deliberate:
        1. It is 9.1 MB and it is a PNG wearing a .jpg extension (2752x1536
           RGBA). Next's image optimiser re-encodes it for delivery, so the
           bytes that reach a visitor are far smaller, but the source is still
           the heaviest asset in the repo by two orders of magnitude.
        2. It carries a Google Gemini AI watermark baked into the pixels,
           bottom right. `object-cover` with the framing below keeps it out of
           the visible crop; it is not removed, only cropped away.
        3. Rev has said he will edit it. Until he does, treat this slot as
           holding a placeholder rather than a finished asset.

        `priority` here, unlike before: it is now the page's LCP element.
      */}
      <section className="border-b border-line">
        <figure className="relative aspect-[21/9] w-full overflow-hidden">
          <Image
            src="/images/heavenly-herb-garden.jpg"
            alt="An herb garden of the kind the Children's Wellness Center is being built around."
            fill
            sizes="100vw"
            className="object-cover object-[50%_38%]"
            priority
          />
        </figure>
        <figcaption className="mx-auto max-w-6xl px-5 py-6 text-caption text-ink-muted">
          The garden the center is being built around. Placeholder image while the space is under
          construction.
        </figcaption>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-5 py-(--spacing-section)">
          <h1 className="max-w-3xl text-display text-ink">The Children&rsquo;s Wellness Center</h1>
          <p className="mt-5 max-w-xl text-body-lg text-ink-muted">
            An outdoor wellness space and herb garden, being built in {site.locality},{' '}
            {site.county}.
          </p>
          <div className="mt-8 max-w-2xl space-y-5 text-body-lg text-ink-muted">
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
        <div className="mx-auto max-w-6xl px-5 py-(--spacing-section)">
          <div className="mb-12 flex max-w-3xl items-start gap-6">
            <Sprig className="hidden h-24 w-auto shrink-0 sm:block" />
            <div>
              <h2 className="text-h3 text-ink">What a sponsorship actually buys</h2>
              <p className="mt-4 text-ink-muted">
                A full monthly sponsorship runs the program for twelve children: two classes a
                week each, up to two hours a session, in groups of about three to one. Mornings and
                afternoons, Monday through Thursday.
              </p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col rounded-(--radius-card) border border-line bg-surface p-8">
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

            <div className="flex flex-col rounded-(--radius-card) border border-line bg-surface p-8">
              <h2 className="text-h4 font-semibold text-ink">Sponsor a child</h2>
              <p className="mt-3 flex-1 text-small text-ink-muted">
                A monthly sponsorship puts a Tuolumne County child in nature-based wellness
                classes. Small groups, outdoors, every week. Four levels, from one child to the
                whole program, set up as a recurring donation you control.
              </p>
              <Link
                href="/childrens-center/sponsor"
                className="mt-6 self-start rounded-pill border border-line-strong px-6 py-3 font-semibold text-ink transition-colors duration-200 hover:border-plum hover:text-plum"
              >
                Support the build
              </Link>
            </div>
          </div>

          <p className="mt-6 text-caption text-ink-muted">{disclosures.donation}</p>
        </div>
      </section>
    </>
  )
}
