import type { Metadata } from 'next'
import Link from 'next/link'
import { disclosures, site } from '@/lib/site'
import { FigurePair, HillsSun, Sprig } from '@/components/art/illustrations'
import { ContactForm } from '@/components/contact-form'

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
              <h1 className="text-display text-ink">Let&rsquo;s Connect</h1>
              <p className="mt-6 max-w-xl text-body-lg text-ink-muted">
                Use the contact form below to ask questions or tell me what you are looking for.
              </p>
            </div>
            <FigurePair className="mx-auto w-full max-w-sm" />
          </div>
        </div>
        <HillsSun compact className="-mt-10 block w-full sm:-mt-20 lg:-mt-28" />
      </section>

      {/* The form. Same Web3Forms delivery the sponsors page on the old site
          used, so mail lands where Boclaire already looks for it. */}
      <section className="border-b border-line bg-surface" aria-labelledby="message">
        <div className="mx-auto max-w-6xl px-5 py-(--spacing-section)">
          <div className="max-w-2xl">
            <h2 id="message" className="text-h2 text-ink">
              Send me a message here
            </h2>
            <p className="mt-4 text-body-lg text-ink-muted">
              It goes straight to my inbox. I answer these myself, so it may take a day to get back
              to you.
            </p>
          </div>
          <div className="mt-10 max-w-3xl">
            <ContactForm />
          </div>
        </div>
      </section>

      <section>
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
