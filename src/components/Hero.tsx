import { hero } from '../data/content'
import { GlowButton } from './shared/GlowButton'

export function Hero() {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative flex min-h-[85vh] flex-col items-center justify-center px-6 py-24 text-center">
      <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl">
        {hero.name}
      </h1>
      <p className="mt-4 text-xl font-semibold text-accent-cyan sm:text-2xl">
        {hero.role}
      </p>
      <p className="mt-6 max-w-xl text-lg text-primary/90 sm:text-xl">
        <span className="bg-gradient-to-r from-accent-cyan to-accent-violet bg-clip-text font-medium text-transparent">
          {hero.tagline}
        </span>
      </p>
      <div className="mt-10">
        <GlowButton onClick={scrollToProjects} variant="cyan">
          View my work
        </GlowButton>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-primary/50">
        <span className="text-2xl">↓</span>
      </div>
    </section>
  )
}
