import type { MetadataRoute } from 'next'
import { getSiteUrl } from '../src/seo/siteSeo'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl()
  const lastModified = new Date()

  return [
    {
      url: `${siteUrl}/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteUrl}/ua/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}
