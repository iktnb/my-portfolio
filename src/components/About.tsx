import { about } from '../data/content'
import { IconAbout } from './icons'
import { SectionReveal } from './shared/SectionReveal'

export function About() {
  return (
    <section id="about" className="px-6 py-20 md:py-28">
      <SectionReveal className="mx-auto max-w-2xl text-center">
        <h2 className="font-heading flex items-center justify-center gap-3 text-3xl font-bold text-primary sm:text-4xl">
          <IconAbout size={32} className="text-accent-cyan" />
          About
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-primary/90">
          {about.paragraph}
        </p>
      </SectionReveal>
    </section>
  )
}
