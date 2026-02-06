import { projects } from '../data/projects'
import { IconProjects } from './icons'
import { Card } from './shared/Card'
import { GlowButton } from './shared/GlowButton'
import { SectionReveal } from './shared/SectionReveal'

export function Projects() {
  return (
    <section id="projects" className="px-4 py-16 sm:px-6 sm:py-20 md:py-28">
      <SectionReveal className="mx-auto max-w-6xl">
        <h2 className="font-heading flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-2xl font-bold text-primary sm:text-3xl md:text-4xl md:text-center">
          <IconProjects size={28} className="neon-icon-cyan shrink-0 text-accent-cyan sm:w-8 sm:h-8" />
          Featured projects
        </h2>
        <div className="mt-10 grid gap-6 sm:mt-12 sm:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.title} className="overflow-hidden">
              <div className="aspect-[5/3] overflow-hidden">
                <img
                  src={project.image}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-5 sm:p-6">
                <h3 className="font-heading text-lg font-semibold text-primary sm:text-xl">
                  {project.title}
                </h3>
                <p className="mt-1 text-sm font-medium text-accent-cyan">{project.outcome}</p>
                <p className="mt-3 text-sm leading-relaxed text-primary/80 sm:text-base">
                  {project.description}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <li
                      key={t}
                      className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-primary/80 sm:text-sm"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="mt-5">
                  <GlowButton
                    href={project.link}
                    variant="cyan"
                    external={project.link.startsWith('http')}
                  >
                    {project.linkLabel ?? 'View project'}
                  </GlowButton>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </SectionReveal>
    </section>
  )
}
