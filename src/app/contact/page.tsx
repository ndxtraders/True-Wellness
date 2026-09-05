import type { Metadata } from 'next'
import Link from 'next/link'
import { contact, disclosures, site } from '@/lib/site'
import { FigurePair, HillsSun, Sprig } from '@/components/art/illustrations'

export const metadata: Metadata = {
  title: 'Contact',
  description: `Get in touch with Boclaire about classes, school programs, or one-to-one sessions in ${site.county}, California.`,
}

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-5 pt-(--spacing-section) pb-10">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <h1 className="text-display text-ink">Get in touch</h1>
              <p className="mt-6 max-w-xl text-body-lg text-ink-muted">
                Email is the surest way to reach Boclaire. Tell her who the class is for and roughly
                what you are hoping for, and she will tell you honestly whether it is something she
                does.
              </p>
            </div>
            <FigurePair className="mx-auto w-full max-w-sm" />
          </div>
        </div>
        <HillsSun compact className="-mt-10 block w-full sm:-mt-20 lg:-mt-28" />
      </section>

      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-5 py-(--spacing-section)">
          {/*
            Ruled entries, not boxes. Two contact details do not need the same
            card treatment as a class you are choosing between; reusing one card
            shape for every kind of content is what makes a page read as a kit.
          */}
          <dl className="max-w-2xl">
            <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1 border-t border-line py-6">
              <dt className="w-20 shrink-0 text-small text-ink-muted">Email</dt>
              <dd>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-body-lg font-medium text-plum underline decoration-amber decoration-2 underline-offset-4"
                >
                  {contact.email}
                </a>
              </dd>
            </div>
            <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1 border-y border-line py-6">
              <dt className="w-20 shrink-0 text-small text-ink-muted">Phone</dt>
              <dd>
                <a
                  href={contact.phoneHref}
                  className="text-body-lg font-medium text-plum underline decoration-amber decoration-2 underline-offset-4"
                >
                  {contact.phoneDisplay}
                </a>
              </dd>
            </div>
          </dl>

          <p className="mt-8 text-ink-muted">
            {site.locality}, in {site.county}. Classes can also be run at your location.
          </p>
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-(--spacing-section)">
          <div className="flex max-w-3xl items-start gap-6">
            <Sprig className="hidden h-24 w-auto shrink-0 sm:block" />
            <div>
              <h2 className="text-h3 text-ink">Looking for a particular class?</h2>
              <p className="mt-4 text-ink-muted">
                Everything is running on a waitlist while the schedule is set. Joining one does not
                book or charge you.
              </p>
              <Link
                href="/classes"
                className="mt-6 inline-block rounded-pill bg-plum px-7 py-3.5 font-semibold text-bg transition-opacity duration-200 hover:opacity-90"
              >
                See the classes
              </Link>
            </div>
          </div>

          <p className="mt-12 max-w-2xl text-caption leading-relaxed text-ink-muted">
            {disclosures.services}
          </p>
        </div>
      </section>
    </>
  )
}
