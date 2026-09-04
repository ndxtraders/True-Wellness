import Link from 'next/link'
import { pillars } from '@/content/pillars'
import { contact, disclosures, integrations, site } from '@/lib/site'

/**
 * The homepage does one job: route five different people to five different
 * places without making any of them read first. The audience cards are the
 * mechanism — they sit high, and they are phrased the way someone would
 * describe themselves, not the way a practice would categorize them.
 */
const audiences = [
  {
    href: '/programs/children',
    label: 'My child',
    note: 'Yoga, movement, and mindfulness for kids, mostly outdoors.',
  },
  {
    href: '/programs/teens',
    label: 'My teenager',
    note: 'Small circles for teens, built to be a place rather than a lecture.',
  },
  {
    href: '/programs/adults',
    label: 'Myself',
    note: 'One-to-one somatic movement, acupressure, and quiet walks.',
  },
  {
    href: '/programs/caregivers-elders',
    label: 'Someone I care for',
    note: 'Sessions for elders and the people looking after them.',
  },
  {
    href: '/programs/schools',
    label: 'My school or group',
    note: 'Enrichment classes, homeschool co-ops, and custom programs.',
  },
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-[--spacing-section] lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <div>
            <p className="font-sans text-caption font-medium tracking-[0.06em] text-ink-muted uppercase">
              {site.locality} · {site.county}, {site.regionName}
            </p>
            <h1 className="mt-5 text-h1 text-ink">Move, breathe, and be outside.</h1>
            <p className="mt-6 max-w-xl text-body-lg text-ink-muted">
              True Wellness Movement teaches yoga, somatic movement, and mindfulness to children,
              families, caregivers, and elders. Small groups, mostly outdoors, at a pace that suits
              the person in front of us.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/programs"
                className="rounded-pill bg-plum px-7 py-3.5 font-semibold text-bg transition-opacity duration-200 hover:opacity-90"
              >
                Find a program
              </Link>
              <Link
                href="/about"
                className="rounded-pill border border-line-strong px-7 py-3.5 font-semibold text-ink transition-colors duration-200 hover:border-plum hover:text-plum"
              >
                Meet Boclaire
              </Link>
            </div>
          </div>

          <figure className="rounded-[--radius-card] border border-line bg-surface p-8 sm:p-10">
            <blockquote className="font-display text-h4 leading-snug text-ink">
              “The goal is not perfection or performance, but resilience, confidence, and joy.”
            </blockquote>
            <figcaption className="mt-5 text-small font-medium text-ink-muted">— Boclaire</figcaption>
          </figure>
        </div>
      </section>

      {/* Audience routing — the most important module on the page */}
      <section className="border-b border-line" aria-labelledby="who">
        <div className="mx-auto max-w-6xl px-5 py-[--spacing-section]">
          <h2 id="who" className="text-h2 text-ink">
            Who are you here for?
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {audiences.map((a) => (
              <li key={a.href}>
                <Link
                  href={a.href}
                  className="group flex h-full flex-col rounded-[--radius-card] border border-line bg-surface p-7 transition-colors duration-200 hover:border-plum"
                >
                  <span className="font-display text-h4 font-semibold text-ink transition-colors group-hover:text-plum">
                    {a.label}
                  </span>
                  <span className="mt-3 text-small text-ink-muted">{a.note}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Pillars */}
      <section className="border-b border-line" aria-labelledby="approach">
        <div className="mx-auto max-w-6xl px-5 py-[--spacing-section]">
          <div className="max-w-2xl">
            <h2 id="approach" className="text-h2 text-ink">
              How we think about this
            </h2>
            <p className="mt-5 text-body-lg text-ink-muted">
              Five ideas run underneath every class. They are also where we say plainly what a
              practice does not claim to do.
            </p>
          </div>
          <ul className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p) => (
              <li key={p.key} className="border-t border-line pt-6">
                <h3 className="text-h4">
                  <Link
                    href={`/approach/${p.key}`}
                    className="font-semibold text-ink transition-colors hover:text-plum"
                  >
                    {p.name}
                  </Link>
                </h3>
                <p className="mt-3 text-small text-ink-muted">{p.summary}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Children's Center — the only currently wired revenue path */}
      <section className="border-b border-line bg-surface" aria-labelledby="center">
        <div className="mx-auto max-w-6xl px-5 py-[--spacing-section]">
          <div className="max-w-2xl">
            <h2 id="center" className="text-h2 text-ink">
              The Children&rsquo;s Wellness Center
            </h2>
            <p className="mt-5 text-body-lg text-ink-muted">
              We are building an outdoor wellness space and herb garden in Tuolumne County, so local
              kids have somewhere to move, plant things, and be outside every week.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <div className="flex flex-col rounded-[--radius-card] border border-line bg-bg p-8">
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

            <div className="flex flex-col rounded-[--radius-card] border border-line bg-bg p-8">
              <h3 className="text-h4 font-semibold text-ink">Sponsor a child</h3>
              <p className="mt-3 flex-1 text-small text-ink-muted">
                A monthly sponsorship puts a Tuolumne County child in nature-based wellness classes.
                Small groups, outdoors, every week.
              </p>
              <Link
                href="/childrens-center/sponsor"
                className="mt-6 self-start rounded-pill border border-line-strong px-6 py-3 font-semibold text-ink transition-colors duration-200 hover:border-plum hover:text-plum"
              >
                See sponsorship levels
              </Link>
            </div>
          </div>

          <p className="mt-6 text-caption text-ink-muted">{disclosures.donation}</p>
        </div>
      </section>

      {/* Contact */}
      <section aria-labelledby="contact">
        <div className="mx-auto max-w-6xl px-5 py-[--spacing-section]">
          <div className="max-w-2xl">
            <h2 id="contact" className="text-h2 text-ink">
              Questions about a class?
            </h2>
            <p className="mt-5 text-body-lg text-ink-muted">
              Classes can also be run at your location. Email Boclaire directly and she will tell you
              honestly whether what you need is something she does.
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
