import { about } from '../data/content'
import { IconAbout } from './icons'
import { SectionReveal } from './shared/SectionReveal'

export function About() {
  return (
    <section id="about" className="px-4 py-16 sm:px-6 sm:py-20 md:py-28">
      <SectionReveal className="mx-auto max-w-2xl text-center">
        <h2 className="font-heading flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-2xl font-bold text-primary sm:text-3xl md:text-4xl">
          <IconAbout size={28} className="neon-icon-cyan shrink-0 text-accent-cyan sm:w-8 sm:h-8" />
          About
        </h2>
        <p className="mt-5 text-base leading-relaxed text-primary/90 sm:mt-6 sm:text-lg md:text-lg">
          {about.paragraph}
        </p>
      </SectionReveal>
    </section>
  )
}
