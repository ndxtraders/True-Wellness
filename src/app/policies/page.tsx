import type { Metadata } from 'next'
import Link from 'next/link'
import { contact, disclosures, integrations, site } from '@/lib/site'
import { HillsSun, Sprig } from '@/components/art/illustrations'

/**
 * Policies.
 *
 * Written to state only what is true of this website today. Both forms collect
 * personal details and GA4 runs once the site is live, so a page describing
 * that is not optional at launch.
 *
 * DELIBERATELY NOT HERE: a cancellation policy and a photo release for minors.
 * Neither exists yet, and inventing either one on a public page would be a
 * claim about how the practice operates that Boclaire has not made. They are
 * business decisions, not website copy. See LAUNCH-PUNCHLIST.md.
 */
export const metadata: Metadata = {
  title: 'Policies',
  description: `How True Wellness Movement handles your information, what these classes are, and how to reach Boclaire in ${site.county}, California.`,
}

function Section({ id, heading, children }: { id: string; heading: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="max-w-2xl scroll-mt-[88px]">
      <h2 id={id} className="text-h3 text-ink">
        {heading}
      </h2>
      <div className="mt-4 space-y-4 text-ink-muted">{children}</div>
    </section>
  )
}

const linkStyles =
  'font-medium text-plum underline decoration-amber decoration-2 underline-offset-4'

export default function PoliciesPage() {
  return (
    <>
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-5 pt-(--spacing-section) pb-10">
          <div className="max-w-2xl">
            <h1 className="text-display text-ink">Policies</h1>
            <p className="mt-6 text-body-lg text-ink-muted">
              What these classes are, what this website collects, and what happens to it.
            </p>
          </div>
        </div>
        <HillsSun compact className="-mt-10 block w-full sm:-mt-20 lg:-mt-28" />
      </section>

      <section className="border-b border-line bg-surface">
        <div className="mx-auto max-w-6xl space-y-14 px-5 py-(--spacing-section)">
          <Section id="what-these-are" heading="What these classes are">
            <p>{disclosures.services}</p>
            <p>
              Boclaire teaches movement, mindfulness, and time outdoors. She does not diagnose
              conditions, prescribe anything, or provide therapy or medical care. Nothing on this
              site is a substitute for talking to your doctor, and nothing here should be used to
              delay doing that.
            </p>
          </Section>

          <Section id="your-information" heading="What this site collects">
            <p>
              The contact form asks for your name, your email address, an optional phone number, an
              optional subject, and your message. It is delivered by Web3Forms, a form service, to
              Boclaire&rsquo;s email inbox. Nothing is stored on this website and there is no
              account to create.
            </p>
            <p>
              The waitlist buttons do not collect anything. They open a pre-addressed email in your
              own mail program, which you send, or do not send, yourself.
            </p>
            <p>
              What you send is used to answer you. It is not sold, and it is not passed to anyone
              else. If you want your message and details deleted, ask at{' '}
              <a href={`mailto:${contact.email}`} className={linkStyles}>
                {contact.email}
              </a>{' '}
              and they will be.
            </p>
          </Section>

          <Section id="analytics" heading="Analytics and cookies">
            <p>
              This site uses Google Analytics 4 to count visits and see which pages people read. It
              records things like the pages you visit, roughly where in the world you are, and what
              kind of device you are on. It sets cookies in your browser to do that.
            </p>
            <p>
              It is not used to identify you personally, and no advertising is run from it. You can
              stop it entirely with Google&rsquo;s{' '}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noreferrer"
                className={linkStyles}
              >
                opt-out add-on
              </a>{' '}
              or by blocking cookies in your browser. Nothing on this site stops working if you do.
            </p>
          </Section>

          <Section id="donations" heading="Donations and sponsorship">
            <p>{disclosures.donation}</p>
            <p>
              Donations and sponsorships are handled by{' '}
              <a
                href={integrations.donorbox.campaignUrl}
                target="_blank"
                rel="noreferrer"
                className={linkStyles}
              >
                DonorBox
              </a>
              , which takes the payment on its own pages under its own terms. Card details are never
              entered on this website and are never seen by True Wellness Movement.
            </p>
          </Section>

          <Section id="children" heading="Children">
            <p>
              Most of these classes are for children, but this website is written for the adults who
              arrange them. It is not built for children to use, and the forms are meant to be
              filled in by a parent, guardian, or caregiver.
            </p>
            <p>
              Nothing on this site asks for a child&rsquo;s name, birthday, or any other detail about
              them. If you choose to mention your child in a message, that sits in Boclaire&rsquo;s
              inbox exactly like the rest of the message does.
            </p>
          </Section>

          <Section id="photographs" heading="Photographs">
            <p>
              This website does not collect photographs, and it does not ask you to upload anything.
              The photographs on these pages are Boclaire&rsquo;s own.
            </p>
            <p>
              If a photograph is ever taken during a class, that is arranged with you at the time and
              is not covered by this page.
            </p>
          </Section>

          <Section id="reaching-us" heading="Questions, or something that looks wrong">
            <p>
              Email{' '}
              <a href={`mailto:${contact.email}`} className={linkStyles}>
                {contact.email}
              </a>{' '}
              or use the{' '}
              <Link href="/contact" className={linkStyles}>
                contact form
              </Link>
              . Boclaire reads these herself.
            </p>
          </Section>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-5 py-(--spacing-section)">
          <div className="flex max-w-3xl items-start gap-6">
            <Sprig className="hidden h-24 w-auto shrink-0 sm:block" />
            <p className="text-ink-muted">
              This page describes how the website works today. If something here stops being
              accurate, it gets changed here first.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
