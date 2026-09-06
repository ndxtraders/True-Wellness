import type { Metadata } from 'next'
import { Fraunces, Hanken_Grotesk } from 'next/font/google'
import Script from 'next/script'
import { integrations, site } from '@/lib/site'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ArtDefs } from '@/components/art/defs'
import './globals.css'

/**
 * Fraunces carries the SOFT and WONK axes, which is the whole reason it's here:
 * dialed up on display sizes it reads hand-touched rather than templated. The
 * axes are set per-element in globals.css.
 */
const fraunces = Fraunces({
  subsets: ['latin'],
  // Variable font: the weight range ships automatically, and declaring `axes`
  // requires that `weight` be left off entirely.
  axes: ['SOFT', 'WONK', 'opsz'],
  display: 'swap',
  variable: '--font-fraunces',
})

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-hanken',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name}: Children's and Family Wellness in ${site.county}`,
    template: `%s · ${site.name}`,
  },
  description:
    'Yoga, somatic movement, mindfulness, and time outdoors for children, families, caregivers, and elders in Tuolumne County, California.',
  openGraph: {
    type: 'website',
    siteName: site.name,
    locale: 'en_US',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${hanken.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-plum focus:px-4 focus:py-2 focus:text-bg"
        >
          Skip to content
        </a>
        <ArtDefs />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />

        {/* GA4. Carries the site's entire measurement history. Do not change the id. */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${integrations.ga4MeasurementId}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${integrations.ga4MeasurementId}');`}
        </Script>
      </body>
    </html>
  )
}
