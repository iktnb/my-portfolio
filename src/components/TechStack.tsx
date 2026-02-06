import { techCategories } from '../data/tech'
import { IconTech } from './icons'
import { Card } from './shared/Card'
import { SectionReveal } from './shared/SectionReveal'

const accentColors = ['text-accent-cyan', 'text-accent-violet', 'text-accent-cyan'] as const

export function TechStack() {
  return (
    <section id="tech" className="px-6 py-20 md:py-28">
      <SectionReveal className="mx-auto max-w-6xl">
        <h2 className="font-heading flex flex-row items-center justify-center gap-3 text-3xl font-bold text-primary sm:text-4xl md:text-center">
          <IconTech size={32} className="text-accent-violet shrink-0" />
          Tech I work with
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {techCategories.map((category, i) => (
            <Card key={category.title} className="p-6">
              <h3 className={`font-heading text-lg font-semibold ${accentColors[i]}`}>
                {category.title}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-primary/90"
                  >
                    {item}
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
