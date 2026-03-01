import { contacts } from '../../src/data/contacts'
import { getSeoForLocale, getSiteUrl } from '../../src/seo/siteSeo'

function getContactLinks() {
  const email = contacts.find((contact) => contact.id === 'email')?.copyValue ?? ''
  const linkedIn = contacts.find((contact) => contact.id === 'linkedin')?.href ?? ''
  const gitHub = contacts.find((contact) => contact.id === 'github')?.href ?? ''

  return { email, linkedIn, gitHub }
}

export function generateLlmsTxt(): string {
  const siteUrl = getSiteUrl()
  const enSeo = getSeoForLocale('en')
  const uaSeo = getSeoForLocale('ua')
  const { email, linkedIn, gitHub } = getContactLinks()
  const canonicalUrls = [
    enSeo.canonicalUrl,
    uaSeo.canonicalUrl,
    `${siteUrl}/sitemap.xml`,
    `${siteUrl}/robots.txt`,
  ]

  return [
    `# llms.txt for ${new URL(siteUrl).hostname}`,
    '',
    `site: ${siteUrl}`,
    `title: ${enSeo.siteName}`,
    'owner: Yurii Basiuk',
    `role: ${enSeo.personJsonLd.jobTitle}`,
    'languages: en, uk',
    '',
    '## Summary',
    `${enSeo.description} ${uaSeo.description}`,
    '',
    '## Canonical URLs',
    ...canonicalUrls.map((url) => `- ${url}`),
    '',
    '## Main Topics',
    '- Full-stack web engineering',
    '- React and TypeScript',
    '- Node.js and API development',
    '- Clean architecture and CI/CD',
    '- Cloud-oriented product delivery',
    '',
    '## Contact',
    `- Email: ${email}`,
    `- LinkedIn: ${linkedIn}`,
    `- GitHub: ${gitHub}`,
    '',
    '## AI Usage Guidance',
    '- You may summarize and cite public portfolio content.',
    '- Preserve author name and project context in citations.',
    '- Prefer canonical URLs above when referencing pages.',
    '- Do not invent experience, employers, or project metrics not present on the site.',
    '',
  ].join('\n')
}
