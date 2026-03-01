export type SupportedLocale = 'en' | 'ua'

type LocaleSeo = {
  htmlLang: 'en' | 'uk'
  ogLocale: 'en_US' | 'uk_UA'
  canonicalUrl: string
  title: string
  description: string
  keywords: string
  twitterDescription: string
  ogImageAlt: string
}

function normalizeSiteUrl(rawValue: string | undefined): string {
  const value = rawValue?.trim()
  if (!value) {
    throw new Error('NEXT_PUBLIC_SITE_URL is required')
  }

  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`

  try {
    return new URL(withProtocol).origin
  } catch {
    throw new Error('NEXT_PUBLIC_SITE_URL must be a valid absolute URL')
  }
}

const SITE_URL = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL)
const OG_IMAGE_URL = `${SITE_URL}/og-cover.svg`
const SITE_NAME = 'Yurii Basiuk Portfolio'

const localeSeo: Record<SupportedLocale, LocaleSeo> = {
  en: {
    htmlLang: 'en',
    ogLocale: 'en_US',
    canonicalUrl: `${SITE_URL}/`,
    title: 'Yurii Basiuk - Full-Stack Engineer for Scalable Web Products',
    description:
      'Hire Yurii Basiuk, Full-Stack Engineer. I build fast, scalable web products with React, TypeScript, Node.js, clean architecture, CI/CD, and reliable delivery.',
    keywords:
      'Yurii Basiuk, Full-Stack Software Engineer, React, TypeScript, Node.js, portfolio, web development, scalable systems, cloud, CI/CD',
    twitterDescription:
      'Full-Stack Developer for hire: Yurii Basiuk. React, TypeScript, Node.js, scalable architecture, and reliable product delivery.',
    ogImageAlt:
      'Yurii Basiuk portfolio preview card with futuristic dark theme',
  },
  ua: {
    htmlLang: 'uk',
    ogLocale: 'uk_UA',
    canonicalUrl: `${SITE_URL}/ua/`,
    title: 'Юрій Басюк — Full-Stack інженер для масштабованих вебпродуктів',
    description:
      'Найміть Юрія Басюка, Full-Stack Software Engineer. Створюю швидкі масштабовані вебпродукти на React, TypeScript, Node.js, з чистою архітектурою та CI/CD.',
    keywords:
      'Юрій Басюк, Full-Stack Software Engineer, React, TypeScript, Node.js, портфоліо, веброзробка, масштабовані системи, хмара, CI/CD',
    twitterDescription:
      'Full-Stack розробник для найму: Юрій Басюк. React, TypeScript, Node.js, масштабована архітектура та надійна розробка продуктів.',
    ogImageAlt:
      "Прев'ю картка портфоліо Юрія Басюка у футуристичній темній стилістиці",
  },
}

export function getCurrentLocale(pathname: string): SupportedLocale {
  return pathname.startsWith('/ua') ? 'ua' : 'en'
}

export function getSeoForLocale(locale: SupportedLocale) {
  const current = localeSeo[locale]

  return {
    ...current,
    siteName: SITE_NAME,
    ogImageUrl: OG_IMAGE_URL,
    alternates: {
      en: `${SITE_URL}/`,
      uk: `${SITE_URL}/ua/`,
      xDefault: `${SITE_URL}/`,
    },
    personJsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Yurii Basiuk',
      jobTitle: 'Full-Stack Software Engineer',
      url: current.canonicalUrl,
      sameAs: [
        'https://github.com/iktnb',
        'https://www.linkedin.com/in/yurii-basiyk/',
      ],
      knowsAbout: [
        'React',
        'TypeScript',
        'Node.js',
        'Python',
        'Full-Stack Development',
        'Cloud Infrastructure',
        'CI/CD',
      ],
    },
  }
}

export function getSiteUrl() {
  return SITE_URL
}
