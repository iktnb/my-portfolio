import { useCallback, useRef, useState } from 'react'
import { ReactLenis } from 'lenis/react'
import { AnimatedBackground } from './components/AnimatedBackground'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Hero } from './components/Hero'
import { Projects } from './components/Projects'
import { TechStack } from './components/TechStack'

const lenisOptions = {
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical' as const,
  gestureOrientation: 'vertical' as const,
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
  anchors: true,
}

const SPOTLIGHT_OFF = { x: -9999, y: -9999 }

function App() {
  const mainRef = useRef<HTMLElement>(null)
  const [spotlight, setSpotlight] = useState(SPOTLIGHT_OFF)

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
    <ReactLenis root options={lenisOptions}>
      <main
        ref={mainRef}
        className="relative min-h-screen"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <AnimatedBackground />
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
        <TechStack />
        <Projects />
        <About />
        <Contact />
      </main>
    </ReactLenis>
  )
}

export default App
