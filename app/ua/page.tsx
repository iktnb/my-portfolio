import type { Metadata } from 'next'
import App from '../../src/App'
import { buildLocaleMetadata } from '../metadata'
import { getSeoForLocale } from '../../src/seo/siteSeo'

export const metadata: Metadata = buildLocaleMetadata('ua')

export default function UkrainianHomePage() {
  const seo = getSeoForLocale('ua')

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.personJsonLd) }}
      />
      <App locale="ua" />
    </>
  )
}
