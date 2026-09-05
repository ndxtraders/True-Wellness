'use client'

import { useState } from 'react'
import { contact } from '@/lib/site'

/**
 * Placeholder waitlist control.
 *
 * There is no signup endpoint yet — Boclaire is building the MailerLite
 * waitlist forms. Until then this deliberately does NOT collect an email
 * address: capturing addresses with nowhere to put them loses them, and it
 * promises a list membership that does not exist. It opens a pre-addressed
 * email instead, which actually reaches her.
 *
 * Swap `href` for the MailerLite form when it exists. Nothing else changes.
 */
export function WaitlistButton({
  className: cls = '',
  name,
  compact = false,
}: {
  className?: string
  name: string
  /** Card context: smaller control, no secondary copy-email action. */
  compact?: boolean
}) {
  const [copied, setCopied] = useState(false)
  const subject = encodeURIComponent(`Waitlist: ${name}`)
  const body = encodeURIComponent(
    `Hi Boclaire,\n\nI'd like to join the waitlist for ${name}.\n\nName:\nPhone:\nWho it's for:\n\nThank you.`
  )

  return (
    <div className={`flex flex-wrap items-center gap-3 ${cls}`}>
      <a
        href={`mailto:${contact.email}?subject=${subject}&body=${body}`}
        className={`rounded-pill bg-plum font-semibold text-bg transition-opacity duration-200 hover:opacity-90 ${
          compact ? 'px-5 py-2.5 text-small' : 'px-7 py-3.5'
        }`}
      >
        Join the waitlist
      </a>
      {!compact && (
      <button
        type="button"
        onClick={() => {
          navigator.clipboard?.writeText(contact.email).then(
            () => {
              setCopied(true)
              setTimeout(() => setCopied(false), 2000)
            },
            () => setCopied(false)
          )
        }}
        className="text-small font-medium text-ink-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-plum"
      >
        {copied ? 'Email address copied' : 'Or copy her email address'}
      </button>
      )}
    </div>
  )
}
