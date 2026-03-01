import type { Metadata } from 'next'
import { getSeoForLocale, type SupportedLocale } from '../src/seo/siteSeo'

export function buildLocaleMetadata(locale: SupportedLocale): Metadata {
  const seo = getSeoForLocale(locale)

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    authors: [{ name: 'Yurii Basiuk' }],
    metadataBase: new URL(seo.alternates.xDefault),
    alternates: {
      canonical: seo.canonicalUrl,
      languages: {
        en: seo.alternates.en,
        uk: seo.alternates.uk,
        'x-default': seo.alternates.xDefault,
      },
    },
    openGraph: {
      type: 'website',
      locale: seo.ogLocale,
      siteName: seo.siteName,
      title: seo.title,
      description: seo.description,
      url: seo.canonicalUrl,
      images: [{ url: seo.ogImageUrl, alt: seo.ogImageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.twitterDescription,
      images: [seo.ogImageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
      },
    },
    other: {
      'theme-color': '#0B0F19',
    },
  }
}
