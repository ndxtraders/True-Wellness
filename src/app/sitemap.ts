import type { MetadataRoute } from 'next'
import { classes } from '@/content/classes'
import { pillars } from '@/content/pillars'
import { site } from '@/lib/site'

/**
 * Serves `/sitemap.xml`.
 *
 * Built from the same content files the pages are built from, so a class added
 * to `classes.ts` appears here without anyone remembering to add it. A
 * hand-maintained list would drift the first time someone adds a class on
 * github.com, which is how content gets edited on this project.
 *
 * `/art-gallery` was the one route that had to be kept out of here. It is gone
 * now, deleted before launch, so there is nothing to exclude.
 *
 * `robots.ts` points at this route, but only while `isLive` is true. A
 * `Sitemap:` line pointing at a page Google cannot crawl is a reported error in
 * Search Console.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const built = new Date()
  const url = (path: string) => `${site.url}${path}`

  const staticPaths = [
    '/',
    '/classes',
    '/approach',
    '/childrens-center',
    '/childrens-center/sponsor',
    '/about',
    '/contact',
    '/policies',
  ]

  return [
    ...staticPaths.map((path) => ({
      url: url(path),
      lastModified: built,
      priority: path === '/' ? 1 : 0.8,
    })),
    ...classes.map((c) => ({
      url: url(`/classes/${c.slug}`),
      lastModified: built,
      priority: 0.7,
    })),
    ...pillars.map((p) => ({
      url: url(`/approach/${p.key}`),
      lastModified: built,
      priority: 0.6,
    })),
  ]
}
