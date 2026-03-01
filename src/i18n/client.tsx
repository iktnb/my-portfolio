'use client'

import { createContext, useContext, useMemo, type ReactNode } from 'react'
import type { Messages } from './messages'
import { createTranslator, type Translate } from './translator'

const TranslationContext = createContext<Translate | null>(null)

interface TranslationProviderProps {
  messages: Messages
  children: ReactNode
}

export function TranslationProvider({ messages, children }: TranslationProviderProps) {
  const t = useMemo(() => createTranslator(messages), [messages])
  return <TranslationContext.Provider value={t}>{children}</TranslationContext.Provider>
}

export function useT(): Translate {
  const context = useContext(TranslationContext)
  if (!context) {
    throw new Error('useT must be used inside TranslationProvider')
  }
  return context
}
