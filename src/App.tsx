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

function App() {
  return (
    <ReactLenis root options={lenisOptions}>
      <main className="relative min-h-screen">
        <AnimatedBackground />
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
