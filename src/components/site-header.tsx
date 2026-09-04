'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Logo } from './logo'
import { integrations } from '@/lib/site'

/**
 * Deliberately short nav. The homepage's audience cards are the real routing
 * mechanism — a dropdown costs a click to open, a card does not — so the header
 * only has to carry the five destinations someone might want from any page.
 */
const links = [
  { href: '/programs', label: 'Programs' },
  { href: '/approach', label: 'Our Approach' },
  { href: '/childrens-center', label: "Children's Center" },
  { href: '/about', label: 'About' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between gap-6 px-5">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3 text-plum"
          onClick={() => setOpen(false)}
        >
          <Logo variant="roundel" className="h-11 w-11" />
          <span className="font-display text-[1.0625rem] leading-[1.15] font-semibold tracking-tight text-ink">
            True Wellness
            <br />
            Movement
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-2 text-small font-medium text-ink-muted transition-colors duration-200 hover:bg-surface hover:text-plum"
            >
              {l.label}
            </Link>
          ))}
          <a
            href={integrations.donorbox.campaignUrl}
            target="_blank"
            rel="noreferrer"
            className="ml-2 rounded-pill bg-plum px-5 py-2.5 text-small font-semibold text-bg transition-opacity duration-200 hover:opacity-90"
          >
            Donate
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="rounded-md border border-line-strong px-3 py-2 text-small font-medium md:hidden"
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      <div id="mobile-nav" hidden={!open} className="border-t border-line md:hidden">
        <nav aria-label="Main" className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-3 font-medium text-ink transition-colors hover:bg-surface hover:text-plum"
            >
              {l.label}
            </Link>
          ))}
          <a
            href={integrations.donorbox.campaignUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-2 rounded-pill bg-plum px-5 py-3 text-center font-semibold text-bg"
          >
            Donate
          </a>
        </nav>
      </div>
    </header>
  )
}
