import type { MetadataRoute } from 'next'
import { isLive } from '@/lib/site'

/**
 * Serves `/robots.txt`.
 *
 * This is a Next metadata route, not a static file in `public/`. It is written
 * in TypeScript so that it reads the same `isLive` constant as the noindex meta
 * tag and the GA4 tag, which means going live is one edit in one file instead of
 * three edits in three places. A hand-written `public/robots.txt` would be the
 * fourth thing to remember, and the one most likely to be forgotten.
 *
 * WHILE PRE-LAUNCH: `Disallow: /` for everyone.
 *
 * The deployment at `true-wellness-site.vercel.app` is publicly reachable with
 * no login. It carries placeholder pricing, unverified credentials, and statuses
 * that are still being set. Left crawlable, Google can index the staging host,
 * and those URLs then compete with the real domain after cutover.
 *
 * Belt and braces on purpose: `Disallow` blocks crawling, and the `noindex` meta
 * tag in layout.tsx blocks indexing of a URL discovered some other way. Those two
 * normally conflict, because a crawler that obeys `Disallow` never reads the
 * `noindex`. That conflict does not matter here: nothing is indexed yet, so there
 * is no existing entry that needs the `noindex` to be seen in order to be removed.
 * If a staging URL ever DOES show up in Google, invert this: allow crawling so the
 * `noindex` can be read, wait for it to drop out, then re-block.
 *
 * WHEN LIVE: open, with no `Sitemap:` line. There is no sitemap route yet. A
 * `Sitemap:` pointing at a 404 is a reported error in Search Console. Add the
 * line here in the same change that adds `src/app/sitemap.ts`.
 */
export default function robots(): MetadataRoute.Robots {
  if (!isLive) {
    return {
      rules: { userAgent: '*', disallow: '/' },
    }
  }

  return {
    rules: { userAgent: '*', allow: '/' },
  }
}
