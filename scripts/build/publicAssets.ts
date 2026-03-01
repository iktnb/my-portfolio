import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import { basename, resolve } from 'node:path'
import { PHASE_PRODUCTION_BUILD } from 'next/constants'
import { getSiteUrl } from '../../src/seo/siteSeo'
import { generateLlmsTxt } from './llms'

const PUBLIC_DIR = resolve(process.cwd(), 'public')
const SKILLS_ICONS_DIR = resolve(PUBLIC_DIR, 'icons', 'skills')
const SKILLS_SPRITE_NAME = 'sprite.svg'

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
  await Promise.all([writeLlmsFile(), writeSkillsSpriteFile()])

  if (phase !== PHASE_PRODUCTION_BUILD) return

  await Promise.all([writeCnameFile(), writeNoJekyllFile()])
}
