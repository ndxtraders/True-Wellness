# Launch punch list

**Created:** 2026-09-19, from a full review of the repo against the deployed staging site.
**Status of HANDOFF.md:** knowingly out of date. Rev made a lot of changes. Clean it up after launch, not before.

---

## 1. Launch. What is done and what is left.

### 1.1 Done

- **Pre-launch gate shipped.** `isLive` in `src/lib/site.ts` drives `/robots.txt`, the
  `robots` meta tag and the GA4 tag together. Verified in both directions: with the flag
  off, robots.txt reads `Disallow: /`, the meta tag reads `noindex, nofollow, nocache` and
  no GA4 script renders; with it on, robots.txt reads `Allow: /` plus a `Sitemap:` line,
  the meta tag reads `index, follow` and GA4 renders. The flag is **off**.
- **`/art-gallery` deleted.** The internal illustration review page is gone from the build.
- **`/policies` added.** Scope of practice, what the contact form collects and where it
  goes, GA4 and cookies with an opt-out, DonorBox handling payments, children, and
  photographs. Linked from the footer.
- **`/sitemap.xml` added.** 27 URLs, generated from `classes.ts` and `pillars.ts` so a class
  added on github.com appears without anyone remembering. `robots.ts` points at it, but only
  on the live branch.
- **Canonical host set to `www`.** `site.url` was the apex. The live domain has always
  served `www` and 307s the apex to it, so every canonical, OG URL and sitemap entry would
  have pointed at a redirect. Now they point at `www`.
- **Footer copyright** reads the current year instead of a hardcoded 2026.

### 1.2 The cutover

The domain is already on Vercel. Namecheap is registrar and nameserver only: apex A record
to `216.198.79.1`, `www` CNAME to the apex. **Those records are already correct and do not
change.**

What changes is which Vercel project answers for the domain.

| | |
|---|---|
| New site | `true-wellness-site`, team **Raul Vaughn's projects** (Pro) |
| Old site, live copy | free account `dans-projects-b454f17d`, holds `truewellnessmovement.com` today |
| Old site, rollback copy | `truewellnessmovement` in the Pro team, serving `truewellnessmovement-two.vercel.app` |

Because the rollback copy is in the same Pro team as the new site, rolling back after
cutover is a domain swap between two projects in one account. Instant, no verification.

**Order matters: add the domain first, flip `isLive` second.** Flipping the flag while
`true-wellness-site.vercel.app` is the only host invites Google to index the staging
hostname, which is the exact problem the gate was built to prevent.

1. Add `truewellnessmovement.com` and `www.truewellnessmovement.com` to `true-wellness-site`.
   The domain currently belongs to a different Vercel account, so Vercel issues a `_vercel`
   TXT challenge.
2. Add that TXT at Namecheap, Advanced DNS. Host is exactly `_vercel`, not
   `_vercel.truewellnessmovement.com`. Namecheap appends the domain itself.
3. Wait for Vercel to verify. It then detaches the domain from the free account.
4. Set `www` as the primary domain so the apex redirects to it, matching today's behavior
   and matching `site.url`.
5. Flip `isLive` to `true` in `src/lib/site.ts`. Push.
6. Verify **on the real domain**, not locally: `/robots.txt` reads `Allow: /` with the
   `Sitemap:` line, the meta tag reads `index, follow`, GA4 fires, `/sitemap.xml` returns
   27 URLs, and the contact form and DonorBox links work.
7. Remove the TXT record. Submit `https://www.truewellnessmovement.com` in Search Console.

Leave MX records alone if any mail runs on the domain.

### 1.3 Still open before launch

- **Pricing.** No class on the site carries a price. See section 3.
- **Cancellation policy.** Deliberately not written into `/policies`. Inventing one would be
  a claim about how the practice runs that Boclaire has not made. Needs her decision, then a
  section on that page.
- ~~**Photo release for minors.**~~ Resolved 2026-09-20: Boclaire has signed release forms
  on file and does not want this on the site. `/policies` correctly says only that the
  website itself collects no photographs. Nothing further to add.
- **The copy questions in section 3**, including two typos now live.

---

## 2. Real bugs. Fix when convenient.

### 2.1 The `verified` honesty gate is dead code

`src/content/types.ts` defines `Offering`, `publicOfferings()`, `pendingVerification()`,
`offeringsByAudience()` and `offeringsByPillar()`. None of them are imported anywhere.
`ClassOffering` in `classes.ts` has no `verified` field at all. Only `statusLabels` and the
key types are actually used.

HANDOFF says an unconfirmed fact "cannot ship by accident." Nothing enforces that today.
Either wire the filter back up or delete the dead exports so the next person is not
trusting a control that is not there.

### 2.2 Anchor jumps land under the sticky header

The homepage audience cards link to `/classes#group-children`, `#group-teens` and so on.
Only `#special-programs` carries `scroll-mt-[72px]`. The group heading at
`src/app/classes/page.tsx:182` has none, so the 72px sticky header covers the heading a
visitor just jumped to.

### 2.3 Orphan pillar keys

`PillarKey` still carries `returning-to-balance` and `healthy-meals`. There are three
pillars now, not five, and nothing backs those two keys.

### 2.4 Unused assets

`public/images/hero.jpg` and `public/images/mountain-bottom.jpg` are referenced by nothing.

### 2.5 Minor accessibility

The About dropdown button in `src/components/site-header.tsx` has `aria-expanded` but no
`aria-haspopup` or `aria-controls`.

---

## 3. Open copy questions for Rev

1. **"Special classes or businesses..."** The new "For businesses and retreats" blurb reads
   "Special classes **or** businesses, schools, wellness events...". Applied verbatim as
   given. Confirm whether that should be "for".
2. **Kid's Bible Stories.** The name and the card summary are changed. Two things were left
   alone deliberately:
   - the slug is still `/classes/childrens-bible-study`, because changing a slug breaks any
     existing link
   - the first body paragraph on the detail page still opens "Children's Bible Study focuses
     on love, kindness, forgiveness..."
3. ~~**Meditative Walk moved.**~~ Done. `/classes/meditative-wellness-walk` now 308s to
   `/classes/meditative-walk`, alongside the legacy old-site redirects in `next.config.ts`.
4. ~~**Two typos went in verbatim.**~~ Fixed 2026-09-20 on Rev's instruction: the doubled
   "is" deleted, and "or" becomes "for".
5. **Sensory page CTA repeats itself.** "Our ultimate goal is to provide **free wellness
   classes** to children in Tuolumne County. Help us bring **free wellness classes** to local
   children." Same phrase twice in two sentences.
6. **Two claim-strength changes worth a second look**, given master context 15 and 44:
   - Sensory page: "These activities **may** help children" became "**can** help children".
   - Private Somatic Flow: the honest-note slot used to hold the limit ("no perfect pose, no
     need to push through"). It now holds a definition of somatic movement that ends
     "...to retrain your brain and nervous system." The limit is gone from that page and the
     slot now carries a physiological claim. The site-wide footer disclosure still runs.
7. **No class on the site has a price.** Every price field in `classes.ts` is empty pending
   Boclaire's confirmation. Confirm that shipping with zero published prices is the intent.
