import { en } from './locales/en'
import { ua } from './locales/ua'

export const messagesByLocale = {
  en,
  ua,
} as const

export type Locale = keyof typeof messagesByLocale
export type Messages = (typeof messagesByLocale)[Locale]

export function getMessages(locale: Locale): Messages {
  return messagesByLocale[locale]
}
