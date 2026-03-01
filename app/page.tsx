import type { Metadata } from 'next'
import App from '../src/App'
import { buildLocaleMetadata } from './metadata'
import { getSeoForLocale } from '../src/seo/siteSeo'

export const metadata: Metadata = buildLocaleMetadata('en')

export default function HomePage() {
  const seo = getSeoForLocale('en')

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.personJsonLd) }}
      />
      <App locale="en" />
    </>
  )
}
