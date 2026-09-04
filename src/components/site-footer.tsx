import Link from 'next/link'
import { Logo } from './logo'
import { contact, disclosures, integrations, site } from '@/lib/site'

export function SiteFooter() {
  return (
    <footer className="mt-[--spacing-section] border-t border-line bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3 text-plum">
              <Logo variant="roundel" className="h-12 w-12" />
              <span className="font-display text-h4 font-semibold text-ink">{site.name}</span>
            </div>
            <p className="mt-4 max-w-sm text-small text-ink-muted">{site.tagline}</p>
            <p className="mt-4 text-small text-ink-muted">
              {site.locality} · {site.county}, {site.region}
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="font-sans text-caption font-medium tracking-[0.06em] text-ink-muted uppercase">
              Explore
            </h2>
            <ul className="mt-4 space-y-2.5 text-small">
              {[
                { href: '/classes', label: 'Classes' },
                { href: '/approach', label: 'Our Approach' },
                { href: '/childrens-center', label: "Children's Center" },
                { href: '/about', label: 'About Boclaire' },
                { href: '/contact', label: 'Contact' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-ink-muted transition-colors hover:text-plum">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-sans text-caption font-medium tracking-[0.06em] text-ink-muted uppercase">
              Get in touch
            </h2>
            <ul className="mt-4 space-y-2.5 text-small">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="break-words text-ink-muted transition-colors hover:text-plum"
                >
                  {contact.email}
                </a>
              </li>
              <li>
                <a
                  href={contact.phoneHref}
                  className="text-ink-muted transition-colors hover:text-plum"
                >
                  {contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={integrations.linktree}
                  target="_blank"
                  rel="noreferrer"
                  className="text-ink-muted transition-colors hover:text-plum"
                >
                  Follow along
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 space-y-3 border-t border-line pt-8 text-caption leading-relaxed text-ink-muted">
          <p>{disclosures.services}</p>
          <p>{disclosures.donation}</p>
          <p className="pt-2">
            © {2026} {site.name}
          </p>
        </div>
      </div>
    </footer>
  )
}
