import type { Messages } from './messages'

export type Translate = (key: string) => string

function getByPath(source: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((value, segment) => {
    if (!value || typeof value !== 'object') return undefined
    return (value as Record<string, unknown>)[segment]
  }, source)
}

export function createTranslator(messages: Messages): Translate {
  return (key: string) => {
    const value = getByPath(messages, key)
    return typeof value === 'string' ? value : key
  }
}
