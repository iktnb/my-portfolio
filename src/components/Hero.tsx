import { useLenis } from 'lenis/react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { hero } from '../data/content'
import { GlowButton } from './shared/GlowButton'

const HERO_SCROLL_RANGE = 900

export function Hero() {
  const lenis = useLenis()
  const shouldReduceMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, HERO_SCROLL_RANGE], [0, -140])
  const heroOpacity = useTransform(scrollY, [0, HERO_SCROLL_RANGE * 0.6], [1, 0.25])
  const heroScale = useTransform(scrollY, [0, HERO_SCROLL_RANGE], [1, 0.88])

  const scrollToProjects = () => {
    if (lenis) {
      lenis.scrollTo('#projects', { offset: 0, duration: 1.2 })
    } else {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.section
      style={{
        y: shouldReduceMotion ? 0 : heroY,
        opacity: shouldReduceMotion ? 1 : heroOpacity,
        scale: shouldReduceMotion ? 1 : heroScale,
      }}
      className="relative flex min-h-[80vh] sm:min-h-[85vh] flex-col items-center justify-center px-4 py-16 sm:px-6 sm:py-24 md:py-28 text-center will-change-transform"
    >
      <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
        {hero.name}
      </h1>
      <p className="mt-3 text-lg font-semibold text-accent-cyan sm:mt-4 sm:text-xl md:text-2xl">
        {hero.role}
      </p>
      <p className="mt-4 max-w-xl text-base text-primary/90 sm:mt-6 sm:text-lg md:text-xl">
        <span className="bg-gradient-to-r from-accent-cyan to-accent-violet bg-clip-text font-medium text-transparent">
          {hero.tagline}
        </span>
      </p>
      <div className="mt-8 sm:mt-10">
        <GlowButton onClick={scrollToProjects} variant="cyan">
          View my work
        </GlowButton>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce text-primary/50 sm:bottom-8">
        <span className="text-xl sm:text-2xl" aria-hidden>↓</span>
      </div>
    </motion.section>
  )
}
