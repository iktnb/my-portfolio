import { techCategories } from '../data/tech'
import { IconTech } from './icons'
import { Card } from './shared/Card'
import { SectionReveal } from './shared/SectionReveal'

const accentColors = [
  'text-accent-cyan',
  'text-accent-violet',
  'text-accent-cyan',
  'text-accent-violet',
  'text-accent-cyan',
  'text-accent-violet',
] as const

const SKILLICONS_URL = 'https://skillicons.dev/icons'

export function TechStack() {
  return (
    <section id="tech" className="px-4 py-16 sm:px-6 sm:py-20 md:py-28">
      <SectionReveal className="mx-auto max-w-6xl">
        <h2 className="font-heading flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-2xl font-bold text-primary sm:text-3xl md:text-4xl md:text-center">
          <IconTech size={28} className="neon-icon-violet shrink-0 text-accent-violet sm:w-8 sm:h-8" />
          Tech I work with
        </h2>
        <div className="mt-10 grid gap-4 sm:mt-12 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {techCategories.map((category, i) => (
            <Card key={category.title} className="p-4 sm:p-6">
              <h3 className={`font-heading text-base font-semibold sm:text-lg ${accentColors[i]}`}>
                {category.title}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2">
                {category.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs sm:gap-2 sm:px-3 sm:text-sm text-primary/90"
                  >
                    <img
                      src={`${SKILLICONS_URL}?i=${item.icon}&theme=dark`}
                      alt=""
                      className="h-4 w-4 shrink-0 object-contain sm:h-5 sm:w-5"
                    />
                    {item.name}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </SectionReveal>
    </section>
  )
}
