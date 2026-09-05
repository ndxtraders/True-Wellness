import Link from 'next/link'
import { pillars } from '@/content/pillars'
import { contact, disclosures, integrations, site } from '@/lib/site'
import {
  ArcBand,
  BeeBloom,
  FigureElder,
  FigurePair,
  FigureSeated,
  FigureTree,
  FigureWalking,
  HillsSun,
  SeedHead,
} from '@/components/art/illustrations'

/**
 * The homepage routes five different people to five different places without
 * making any of them read first. The audience cards are the mechanism: they sit
 * high, they are phrased the way someone would describe themselves rather than
 * the way a practice would categorise them, and each one now carries an
 * illustration, because a labelled beige box is not a card.
 *
 * They deep-link into the grouped sections of the classes hub rather than
 * dumping everyone at the top of /classes, which was the previous stopgap.
 */
const audiences = [
  {
    href: '/classes#group-children',
    label: 'My child',
    note: 'Yoga, movement, and mindfulness for kids, mostly outdoors.',
    Art: FigureTree,
  },
  {
    href: '/classes#group-teens',
    label: 'My teenager',
    note: 'Small circles for teens, built to be a place rather than a lecture.',
    Art: FigureSeated,
  },
  {
    href: '/classes#group-adults',
    label: 'Myself',
    note: 'One-to-one somatic movement, acupressure, and quiet walks.',
    Art: FigureWalking,
  },
  {
    href: '/classes#group-caregivers-elders',
    label: 'Someone I care for',
    note: 'Sessions for elders and the people looking after them.',
    Art: FigureElder,
  },
  {
    href: '/classes#group-schools',
    label: 'My school or group',
    note: 'Enrichment classes, homeschool co-ops, and custom programs.',
    Art: FigurePair,
  },
]

export default function HomePage() {
  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* 1. Hero. Landscape at full bleed, headline sitting in the sky.    */}
      {/*    Sized to clear the fold on a 13" MacBook Air (812px of viewport */}
      {/*    after browser chrome), so the hero does not use the standard    */}
      {/*    section rhythm and the landscape runs in its compact crop.      */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-5 pt-10 pb-8">
          {/*
            Single column. The painting was tried here and pulled: a realistic
            oil portrait sitting beside a flat vector illustration system reads
            as two different sites. It still does its job on /about, where it is
            the subject rather than an accent.
          */}
          <p className="font-sans text-caption font-medium tracking-[0.06em] text-ink-muted uppercase">
            {site.locality} · {site.county}, {site.regionName}
          </p>
          <h1 className="mt-4 max-w-3xl text-display text-ink">Move, breathe, and be outside.</h1>
          <p className="mt-5 max-w-xl text-body-lg text-ink-muted">
            Yoga, somatic movement, and mindfulness for children, families, caregivers, and elders.
            Small groups, mostly outdoors, at a pace that suits the person in front of us.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/classes"
              className="rounded-pill bg-plum px-7 py-3.5 font-semibold text-bg transition-opacity duration-200 hover:opacity-90"
            >
              See the classes
            </Link>
            <Link
              href="/about"
              className="rounded-pill border border-line-strong px-7 py-3.5 font-semibold text-ink transition-colors duration-200 hover:border-plum hover:text-plum"
            >
              Meet Boclaire
            </Link>
          </div>
        </div>
        <HillsSun compact className="-mt-8 block w-full sm:-mt-20 lg:-mt-32" />
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 2. Orientation. Narrow measure, conversational register.          */}
      {/*    Master context 12 favours an opening that makes you pause.     */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-5 py-(--spacing-section)">
          <div className="mx-auto flex max-w-3xl items-start gap-8">
            <SeedHead className="mt-2 hidden h-16 w-16 shrink-0 sm:block" />
            <div>
              <p className="font-display text-h4 leading-snug text-ink">
                Have you noticed how much of children&rsquo;s wellness is really about getting them
                to sit still?
              </p>
              <p className="mt-5 text-body-lg text-ink-muted">
                This is the other thing. Children already have good signals for movement, rest,
                curiosity and play, and most of what we do is make room for those rather than
                override them. Same for the adults, and the elders, and the people doing the
                caring.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 3. Audience routing. The most important module on the page.       */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-b border-line" aria-labelledby="who">
        <div className="mx-auto max-w-6xl px-5 py-(--spacing-section)">
          <h2 id="who" className="text-h2 text-ink">
            Who are you here for?
          </h2>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {audiences.map(({ href, label, note, Art }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="group flex h-full flex-col overflow-hidden rounded-(--radius-card) border border-line bg-surface transition-colors duration-200 hover:border-plum"
                >
                  <span className="flex justify-center bg-bg pt-8">
                    <Art className="h-36 w-auto" />
                  </span>
                  <span className="flex flex-1 flex-col border-t border-line p-8">
                    <span className="font-display text-h4 font-semibold text-ink transition-colors group-hover:text-plum">
                      {label}
                    </span>
                    <span className="mt-3 text-small text-ink-muted">{note}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 4. Pillars, on the sage field. First saturated colour on the page.*/}
      {/*    Ink is 8.42:1 here and plum 5.53:1, so both clear AA for body.  */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-sage" aria-labelledby="approach">
        <div className="mx-auto max-w-6xl px-5 pt-(--spacing-section) pb-16">
          <div className="max-w-2xl">
            <h2 id="approach" className="text-h2 text-ink">
              How we think about this
            </h2>
            <p className="mt-5 text-body-lg text-ink">
              Five ideas run underneath every class. They are also where we say plainly what a
              practice does not claim to do.
            </p>
          </div>
          <ul className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p) => (
              <li key={p.key} className="border-t border-ink/25 pt-6">
                <h3 className="text-h4">
                  <Link
                    href={`/approach/${p.key}`}
                    className="font-semibold text-plum underline decoration-plum/40 decoration-2 underline-offset-4 transition-colors hover:decoration-plum"
                  >
                    {p.name}
                  </Link>
                </h3>
                <p className="mt-3 text-small text-ink/85">{p.summary}</p>
              </li>
            ))}
          </ul>
        </div>
        {/* Curved close, so the coloured band does not end as a hard rectangle. */}
        <ArcBand className="-mb-px block w-full" />
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 5. The human moment. Where the page stops being a brochure.       */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-(--spacing-section) lg:grid-cols-[1fr_1.1fr]">
          <FigurePair className="mx-auto w-full max-w-md" />
          <figure>
            <blockquote className="font-display text-h3 leading-tight text-ink">
              &ldquo;The goal is not perfection or performance, but resilience, confidence, and
              joy.&rdquo;
            </blockquote>
            <figcaption className="mt-6 text-small font-medium text-ink-muted">
              &mdash; Boclaire
            </figcaption>
            <p className="mt-8 max-w-md text-ink-muted">
              She is not trying to produce small athletes. The work is cultivation: body awareness,
              coordination, emotional awareness, and enough self-trust that a child knows what their
              own body is telling them.
            </p>
            <Link
              href="/about"
              className="mt-7 inline-block font-medium text-plum underline decoration-clay decoration-2 underline-offset-4"
            >
              More about Boclaire
            </Link>
          </figure>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 6. Children's Centre. The only currently wired revenue path.      */}
      {/*    Carries the concrete programme numbers from master context 5;  */}
      {/*    twelve children and a 3:1 ratio persuade harder than adjectives*/}
      {/* ---------------------------------------------------------------- */}
      <section className="border-b border-line bg-surface" aria-labelledby="center">
        <div className="mx-auto max-w-6xl px-5 py-(--spacing-section)">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
            <div className="max-w-2xl">
              <h2 id="center" className="text-h2 text-ink">
                The Children&rsquo;s Wellness Center
              </h2>
              <p className="mt-5 text-body-lg text-ink-muted">
                We are building an outdoor wellness space and herb garden in Tuolumne County, so
                local kids have somewhere to move, plant things, and be outside every week.
              </p>
              <dl className="mt-9 grid gap-6 sm:grid-cols-3">
                {[
                  ['12', 'children a month'],
                  ['16', 'hours each, monthly'],
                  ['3:1', 'children to instructor'],
                ].map(([n, label]) => (
                  <div key={label} className="border-t border-line pt-4">
                    <dt className="sr-only">{label}</dt>
                    <dd>
                      <span className="block font-display text-h2 font-semibold text-plum">{n}</span>
                      <span className="mt-1 block text-small text-ink-muted">{label}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <BeeBloom className="mx-auto w-full max-w-xs" />
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            <div className="flex flex-col rounded-(--radius-card) border border-line bg-bg p-8">
              <h3 className="text-h4 font-semibold text-ink">Make a donation</h3>
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

            <div className="flex flex-col rounded-(--radius-card) border border-line bg-bg p-8">
              <h3 className="text-h4 font-semibold text-ink">Sponsor a child</h3>
              <p className="mt-3 flex-1 text-small text-ink-muted">
                A monthly sponsorship puts a Tuolumne County child in nature-based wellness classes.
                Small groups, outdoors, every week. Four levels, from one child to the whole
                programme.
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

      {/* ---------------------------------------------------------------- */}
      {/* 7. Contact.                                                       */}
      {/* ---------------------------------------------------------------- */}
      <section aria-labelledby="contact">
        <div className="mx-auto max-w-6xl px-5 py-(--spacing-section)">
          <div className="max-w-2xl">
            <h2 id="contact" className="text-h2 text-ink">
              Questions about a class?
            </h2>
            <p className="mt-5 text-body-lg text-ink-muted">
              Classes can also be run at your location. Email Boclaire directly and she will tell
              you honestly whether what you need is something she does.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
              <a
                href={`mailto:${contact.email}`}
                className="font-medium text-plum underline decoration-clay decoration-2 underline-offset-4"
              >
                {contact.email}
              </a>
              <a href={contact.phoneHref} className="font-medium text-ink-muted hover:text-plum">
                {contact.phoneDisplay}
              </a>
            </div>
            <p className="mt-10 max-w-xl text-caption leading-relaxed text-ink-muted">
              {disclosures.services}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
