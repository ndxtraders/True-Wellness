# Launch punch list

**Created:** 2026-09-19, from a full review of the repo against the deployed staging site.
**Status of HANDOFF.md:** knowingly out of date. Rev made a lot of changes. Clean it up after launch, not before.

---

## 1. Blockers. Fix before the site goes live.

### 1.1 The pre-launch gate exists only on Rev's machine

`main` and `origin/main` are identical. The gate is uncommitted work in the local checkout:

| File | State |
|---|---|
| `src/app/robots.ts` | untracked, never pushed |
| `src/lib/site.ts` | modified, adds `export const isLive = false` |
| `src/app/layout.tsx` | modified, gates the noindex meta tag and GA4 on `isLive` |
| `src/components/site-footer.tsx` | modified, `Jamestown · Tuolumne` becomes `Jamestown, Tuolumne` |

Verified on https://true-wellness-site.vercel.app on 2026-09-19:

- `/robots.txt` returns **404**
- the page serves `<meta name="robots" content="index, follow">`
- GA4 `G-CBXJ1LM80R` is loading and recording

So unconfirmed copy is crawlable right now, and internal review traffic is going into the
live GA4 property that carries the old site's whole measurement history.

**Fix:** commit and push these five files. Decide separately whether GA4 should stay off
until cutover or start recording now.

### 1.2 Delete the internal art page

`src/app/art-gallery/page.tsx` still builds and still ships. It is unlinked, but it is public.

### 1.3 No privacy page

`/policies` does not exist. The contact form collects name, email and phone, and GA4 runs
once `isLive` flips. Nothing on the site covers privacy, scope of practice, the photo
release for minors, or cancellation. There is no privacy link next to the form.

### 1.4 No sitemap

`src/app/sitemap.ts` does not exist. Add it, and in the same change add the `Sitemap:`
line to `robots.ts`. A `Sitemap:` pointing at a 404 is a reported error in Search Console,
which is why the line is left out today.

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
4. **Two typos went in verbatim**, because replacement copy is applied exactly as given:
   - Private Somatic Flow: "Each session **is is** designed for you and what you need right now."
   - For businesses and retreats: "Special classes **or** businesses, schools, wellness events..."
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
