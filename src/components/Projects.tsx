import { projects } from '../data/projects'
import { IconProjects } from './icons'
import { Card } from './shared/Card'
import { SectionReveal } from './shared/SectionReveal'

export function Projects() {
  return (
    <section id="projects" className="px-6 py-20 md:py-28">
      <SectionReveal className="mx-auto max-w-6xl">
        <h2 className="font-heading flex items-center justify-center gap-3 text-3xl font-bold text-primary sm:text-4xl md:text-center">
          <IconProjects size={32} className="text-accent-cyan shrink-0" />
          Featured projects
        </h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {projects.map((project) => (
            <Card key={project.title} className="p-6">
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-heading text-xl font-semibold text-primary">
                    {project.title}
                  </h3>
                  <span className="rounded-full bg-accent-cyan/20 px-3 py-1 text-xs font-medium text-accent-cyan">
                    {project.outcome}
                  </span>
                </div>
                <p className="text-primary/85 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-primary/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  className="mt-2 inline-flex items-center text-sm font-semibold text-accent-cyan transition-all duration-300 hover:underline focus:outline-none focus:ring-2 focus:ring-accent-cyan focus:ring-offset-2 focus:ring-offset-background"
                >
                  {project.linkLabel ?? 'View project'} →
                </a>
              </div>
            </Card>
          ))}
        </div>
      </SectionReveal>
    </section>
  )
}
