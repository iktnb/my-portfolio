import { useT } from '../i18n/client'
import { IconProjects } from './icons'
import { SectionReveal } from './shared/SectionReveal'

export function Projects() {
  const t = useT()

  const handleContactClick = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="projects" className="px-4 py-16 sm:px-6 sm:py-20 md:py-28">
      <SectionReveal className="mx-auto max-w-6xl">
        <h2 className="font-heading flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-2xl font-bold text-primary sm:text-3xl md:text-4xl md:text-center">
          <IconProjects size={28} className="neon-icon-cyan shrink-0 text-accent-cyan sm:w-8 sm:h-8" />
          {t('projects.title')}
        </h2>
        <div className="mt-10 sm:mt-12">
          {/* Временно скрыли карточки проектов
          <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <Card key={project.id} className="overflow-hidden">
                ...
              </Card>
            ))}
          </div>
          */}
          <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-white/5 px-6 py-10 text-center backdrop-blur-sm">
            <p className="font-heading text-3xl font-bold tracking-wide text-primary sm:text-4xl">
              {t('projects.comingSoonTitle')}
            </p>
            <p className="mt-4 text-sm text-primary/80 sm:text-base">
              {t('projects.comingSoonCta')}
            </p>
            <button
              type="button"
              onClick={handleContactClick}
              className="mt-6 inline-flex items-center justify-center rounded-lg border border-accent-cyan/40 bg-card/70 px-4 py-2 text-sm font-semibold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-cyan/70 hover:shadow-[0_0_20px_rgba(56,189,248,0.2)]"
            >
              {t('projects.comingSoonButton')}
            </button>
          </div>
        </div>
      </SectionReveal>
    </section>
  )
}
