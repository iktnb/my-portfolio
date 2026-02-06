import { IconProjects } from './icons'
import { SectionReveal } from './shared/SectionReveal'

export function Projects() {
  return (
    <section id="projects" className="px-4 py-16 sm:px-6 sm:py-20 md:py-28">
      <SectionReveal className="mx-auto max-w-6xl">
        <h2 className="font-heading flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-2xl font-bold text-primary sm:text-3xl md:text-4xl md:text-center">
          <IconProjects size={28} className="neon-icon-cyan shrink-0 text-accent-cyan sm:w-8 sm:h-8" />
          Featured projects
        </h2>
        <div className="mt-10 flex items-center justify-center rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 py-16 sm:py-20">
          <p className="text-lg font-medium text-primary/70 sm:text-xl">Coming soon</p>
        </div>
      </SectionReveal>
    </section>
  )
}
