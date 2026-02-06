import { IconProjects } from './icons'
import { SectionReveal } from './shared/SectionReveal'

export function Projects() {
  return (
    <section id="projects" className="px-6 py-20 md:py-28">
      <SectionReveal className="mx-auto max-w-6xl">
        <h2 className="font-heading flex items-center justify-center gap-3 text-3xl font-bold text-primary sm:text-4xl md:text-center">
          <IconProjects size={32} className="neon-icon-cyan shrink-0 text-accent-cyan" />
          Featured projects
        </h2>
        <div className="mt-12 flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 py-20">
          <p className="text-xl font-medium text-primary/70">Coming soon</p>
        </div>
      </SectionReveal>
    </section>
  )
}
