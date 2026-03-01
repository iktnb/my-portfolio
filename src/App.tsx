'use client'

import { useCallback, useRef, useState } from 'react'
import { AnimatedBackground } from './components/AnimatedBackground'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Hero } from './components/Hero'
import { LanguageSwitcher } from './components/LanguageSwitcher'
import { Projects } from './components/Projects'
import { TechStack } from './components/TechStack'
import { TranslationProvider } from './i18n/client'
import { getMessages, type Locale } from './i18n/messages'

const SPOTLIGHT_OFF = { x: -9999, y: -9999 }

interface AppProps {
  locale: Locale
}

function App({ locale }: AppProps) {
  const mainRef = useRef<HTMLElement>(null)
  const [spotlight, setSpotlight] = useState(SPOTLIGHT_OFF)
  const messages = getMessages(locale)

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    const el = mainRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    setSpotlight({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }, [])

  const handlePointerLeave = useCallback(() => {
    setSpotlight(SPOTLIGHT_OFF)
  }, [])

  return (
    <TranslationProvider messages={messages}>
      <main
        ref={mainRef}
        className="relative min-h-screen"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <AnimatedBackground />
        <LanguageSwitcher locale={locale} />
        {/* Глобальный спотлайт за курсором на всей странице */}
        {spotlight.x > -9999 && (
          <div
            className="pointer-events-none absolute inset-0 z-0 opacity-60"
            style={{
              background: `radial-gradient(ellipse 280px 240px at ${spotlight.x}px ${spotlight.y}px, rgba(56,189,248,0.1) 0%, rgba(167,139,250,0.05) 35%, transparent 65%)`,
            }}
            aria-hidden
          />
        )}
        <Hero />
        <Projects />
        <TechStack />
        <About />
        <Contact />
      </main>
    </TranslationProvider>
  )
}

export default App
