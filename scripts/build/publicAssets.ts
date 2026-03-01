import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises'
import { basename, resolve } from 'node:path'
import { PHASE_PRODUCTION_BUILD } from 'next/constants'
import { favicons } from 'favicons'
import { getSiteUrl } from '../../src/seo/siteSeo'
import { generateLlmsTxt } from './llms'

const PUBLIC_DIR = resolve(process.cwd(), 'public')
const SKILLS_ICONS_DIR = resolve(PUBLIC_DIR, 'icons', 'skills')
const SKILLS_SPRITE_NAME = 'sprite.svg'
const FAVICON_SOURCE = resolve(PUBLIC_DIR, 'favicon.svg')
const FAVICONS_DIR = resolve(PUBLIC_DIR, 'favicons')

async function writeCnameFile() {
  const siteUrl = getSiteUrl()
  const siteDomain = new URL(siteUrl).hostname

  await mkdir(PUBLIC_DIR, { recursive: true })
  await writeFile(resolve(PUBLIC_DIR, 'CNAME'), `${siteDomain}\n`, 'utf8')
}

async function writeNoJekyllFile() {
  await mkdir(PUBLIC_DIR, { recursive: true })
  await writeFile(resolve(PUBLIC_DIR, '.nojekyll'), '', 'utf8')
}

async function writeLlmsFile() {
  await mkdir(PUBLIC_DIR, { recursive: true })
  await writeFile(resolve(PUBLIC_DIR, 'llms.txt'), generateLlmsTxt(), 'utf8')
}

async function writeFaviconsFiles() {
  let sourceExists = true

  try {
    await readFile(FAVICON_SOURCE, 'utf8')
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      sourceExists = false
    } else {
      throw error
    }
  }

  if (!sourceExists) return

  const siteDomain = new URL(getSiteUrl()).hostname
  const generated = await favicons(FAVICON_SOURCE, {
    path: '/favicons/',
    appName: 'Yurii Basiuk Portfolio',
    appShortName: 'Yurii Portfolio',
    appDescription: 'Full-Stack Software Engineer portfolio',
    lang: 'en-US',
    dir: 'auto',
    display: 'standalone',
    orientation: 'portrait',
    scope: '/',
    start_url: '/',
    theme_color: '#0B0F19',
    background: '#0B0F19',
    developerName: 'Yurii Basiuk',
    developerURL: `https://${siteDomain}/`,
    icons: {
      favicons: true,
      appleIcon: true,
      android: true,
      appleStartup: false,
      windows: true,
      yandex: false,
    },
  })

  await rm(FAVICONS_DIR, { recursive: true, force: true })
  await mkdir(FAVICONS_DIR, { recursive: true })

  await Promise.all([
    ...generated.images.map(({ name, contents }) =>
      writeFile(resolve(FAVICONS_DIR, name), contents)
    ),
    ...generated.files.map(({ name, contents }) =>
      writeFile(resolve(FAVICONS_DIR, name), contents, 'utf8')
    ),
  ])
}

function extractSvgParts(svgContent: string): { viewBox: string; body: string } {
  const content = svgContent
    .replace(/^\uFEFF/, '')
    .replace(/<\?xml[\s\S]*?\?>/g, '')
    .trim()
  const match = content.match(/<svg\b([^>]*)>([\s\S]*?)<\/svg>/i)

  if (!match) {
    throw new Error('Invalid SVG content: missing root <svg>...</svg>')
  }

  const attrs = match[1]
  const body = match[2].trim()
  const viewBox = attrs.match(/\bviewBox=(['"])(.*?)\1/i)?.[2] ?? '0 0 256 256'

  return { viewBox, body }
}

async function writeSkillsSpriteFile() {
  let entries: import('node:fs').Dirent[]
  try {
    entries = await readdir(SKILLS_ICONS_DIR, { withFileTypes: true })
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return
    throw error
  }

  const iconFiles = entries
    .filter(
      (entry) =>
        entry.isFile() &&
        entry.name.endsWith('.svg') &&
        entry.name !== SKILLS_SPRITE_NAME
    )
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b))

  const symbols: string[] = []

  for (const iconFile of iconFiles) {
    const iconPath = resolve(SKILLS_ICONS_DIR, iconFile)
    const iconId = basename(iconFile, '.svg')
    const rawSvg = await readFile(iconPath, 'utf8')
    const { viewBox, body } = extractSvgParts(rawSvg)

    symbols.push(`<symbol id="${iconId}" viewBox="${viewBox}">${body}</symbol>`)
  }

  const sprite = [
    '<svg xmlns="http://www.w3.org/2000/svg">',
    ...symbols,
    '</svg>',
    '',
  ].join('\n')

  await writeFile(resolve(SKILLS_ICONS_DIR, SKILLS_SPRITE_NAME), sprite, 'utf8')
}

export async function preparePublicAssets(phase: string) {
  await Promise.all([writeLlmsFile(), writeSkillsSpriteFile(), writeFaviconsFiles()])

  if (phase !== PHASE_PRODUCTION_BUILD) return

  await Promise.all([writeCnameFile(), writeNoJekyllFile()])
}
