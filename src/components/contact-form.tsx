'use client'

import { useState } from 'react'
import { classes } from '@/content/classes'
import { contact, integrations } from '@/lib/site'

/**
 * The contact form, mirroring the sponsorship form on the previous site
 * (ndxtraders/TrueWellnessMovement, sponsors.html).
 *
 * Same delivery path, same shape: a Web3Forms POST with the account's access
 * key, a hidden honeypot for bots, and a fetch submit so the page swaps to a
 * thank-you rather than navigating away to Web3Forms' own confirmation.
 *
 * WHY WEB3FORMS AND NOT FORMSPREE. The access key in `src/lib/site.ts` is live
 * and already delivering to Boclaire's inbox. Adding a second provider would
 * mean a second account to keep and a second place for mail to go missing.
 *
 * The email address stays visible next to the form. A form that fails silently
 * is worse than no form, and this one has no server-side log.
 */

type State = 'idle' | 'sending' | 'sent'

const fieldStyles =
  'mt-2 w-full rounded-(--radius-card) border border-line bg-bg px-4 py-3 text-ink placeholder:text-ink-muted/70 focus:border-plum focus:outline-none'

export function ContactForm() {
  const [state, setState] = useState<State>('idle')
  const [error, setError] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('sending')
    setError('')

    try {
      const res = await fetch(integrations.web3forms.endpoint, {
        method: 'POST',
        body: new FormData(e.currentTarget),
      })
      const data = await res.json()
      if (data.success) {
        setState('sent')
      } else {
        setState('idle')
        setError(data.message || 'Something went wrong. Please try again.')
      }
    } catch {
      setState('idle')
      setError('That did not send. Please try again, or email Boclaire directly.')
    }
  }

  if (state === 'sent') {
    return (
      <div className="rounded-(--radius-card) border border-line bg-bg p-10">
        <h3 className="text-h3 text-ink">Thank you, that reached her.</h3>
        <p className="mt-4 text-ink-muted">
          Boclaire reads these herself and will get back to you. If it is quicker for you, her
          email is{' '}
          <a
            href={`mailto:${contact.email}`}
            className="font-medium text-plum underline decoration-amber decoration-2 underline-offset-4"
          >
            {contact.email}
          </a>
          .
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="rounded-(--radius-card) border border-line bg-bg p-8">
      <input type="hidden" name="access_key" value={integrations.web3forms.accessKey} />
      <input type="hidden" name="subject" value="New message from truewellnessmovement.com" />
      <input type="hidden" name="from_name" value="True Wellness Movement website" />
      {/* Honeypot. Bots fill it, people never see it. */}
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-small font-medium text-ink">
            Your name
          </label>
          <input id="name" name="name" type="text" required className={fieldStyles} />
        </div>
        <div>
          <label htmlFor="email" className="text-small font-medium text-ink">
            Email
          </label>
          <input id="email" name="email" type="email" required className={fieldStyles} />
        </div>
        <div>
          <label htmlFor="phone" className="text-small font-medium text-ink">
            Phone <span className="text-ink-muted">(optional)</span>
          </label>
          <input id="phone" name="phone" type="tel" className={fieldStyles} />
        </div>
        <div>
          <label htmlFor="about" className="text-small font-medium text-ink">
            What is this about?
          </label>
          <select id="about" name="about" defaultValue="" className={fieldStyles}>
            <option value="">Not sure yet, or something else</option>
            {classes.map((c) => (
              <option key={c.slug} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor="message" className="text-small font-medium text-ink">
          Anything she should know?
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Who the class is for, their age, and roughly what you are hoping for."
          className={fieldStyles}
        />
      </div>

      {error && (
        <p
          role="alert"
          className="mt-6 rounded-(--radius-card) border border-line-strong bg-surface px-4 py-3 text-small text-ink"
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={state === 'sending'}
        className="mt-7 rounded-pill bg-plum px-7 py-3.5 font-semibold text-bg transition-opacity duration-200 hover:opacity-90 disabled:opacity-60"
      >
        {state === 'sending' ? 'Sending…' : 'Send to Boclaire'}
      </button>
      <p className="mt-4 text-caption text-ink-muted">
        This sends an email. It does not book or charge you for anything.
      </p>
    </form>
  )
}
