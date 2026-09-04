import type { Metadata } from 'next'
import { contact, disclosures, site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact',
  description: `Get in touch with Boclaire about classes, school programs, or one-to-one sessions in ${site.county}, California.`,
}

export default function ContactPage() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-5 py-[--spacing-section]">
        <h1 className="max-w-3xl text-h1 text-ink">Get in touch</h1>
        <p className="mt-6 max-w-2xl text-body-lg text-ink-muted">
          Email is the surest way to reach Boclaire. Tell her who the class is for and roughly what
          you are hoping for, and she will tell you honestly whether it is something she does.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:max-w-3xl">
          <a
            href={`mailto:${contact.email}`}
            className="rounded-[--radius-card] border border-line bg-surface p-7 transition-colors hover:border-plum"
          >
            <span className="font-sans text-caption font-medium tracking-[0.06em] text-ink-muted uppercase">
              Email
            </span>
            <span className="mt-3 block break-words font-medium text-plum">{contact.email}</span>
          </a>
          <a
            href={contact.phoneHref}
            className="rounded-[--radius-card] border border-line bg-surface p-7 transition-colors hover:border-plum"
          >
            <span className="font-sans text-caption font-medium tracking-[0.06em] text-ink-muted uppercase">
              Phone
            </span>
            <span className="mt-3 block font-medium text-plum">{contact.phoneDisplay}</span>
          </a>
        </div>

        <p className="mt-8 text-ink-muted">
          {site.locality} · {site.county}, {site.regionName}. Classes can also be run at your
          location.
        </p>

        <p className="mt-12 max-w-2xl text-caption leading-relaxed text-ink-muted">
          {disclosures.services}
        </p>
      </div>
    </section>
  )
}
