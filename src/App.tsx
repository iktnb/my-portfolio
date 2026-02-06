import { AnimatedBackground } from './components/AnimatedBackground'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Hero } from './components/Hero'
import { Projects } from './components/Projects'
import { TechStack } from './components/TechStack'

function App() {
  return (
    <main className="relative min-h-screen">
      <AnimatedBackground />
      <Hero />
      <TechStack />
      <Projects />
      <About />
      <Contact />
    </main>
  )
}

export default App
