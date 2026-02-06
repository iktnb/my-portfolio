import { contact } from '../data/content'
import { IconContact, IconEmail, IconGithub, IconLinkedIn } from './icons'
import { GlowButton } from './shared/GlowButton'
import { SectionReveal } from './shared/SectionReveal'

export function Contact() {
  return (
    <section id="contact" className="px-6 py-20 md:py-28">
      <SectionReveal className="mx-auto max-w-2xl text-center">
        <h2 className="font-heading flex items-center justify-center gap-3 text-3xl font-bold text-primary sm:text-4xl">
          <IconContact size={32} className="text-accent-violet shrink-0" />
          Get in touch
        </h2>
        <p className="mt-6 text-lg text-primary/90">
          {contact.cta}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <GlowButton href={contact.email} variant="cyan" className="gap-2">
            <IconEmail size={20} className="shrink-0" />
            Email
          </GlowButton>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-accent-violet/50 px-6 py-3 font-semibold text-accent-violet transition-all duration-300 hover:shadow-[0_0_20px_rgba(167,139,250,0.3)] focus:outline-none focus:ring-2 focus:ring-accent-violet focus:ring-offset-2 focus:ring-offset-background"
          >
            <IconLinkedIn size={20} className="shrink-0" />
            LinkedIn
          </a>
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-accent-violet/50 px-6 py-3 font-semibold text-accent-violet transition-all duration-300 hover:shadow-[0_0_20px_rgba(167,139,250,0.3)] focus:outline-none focus:ring-2 focus:ring-accent-violet focus:ring-offset-2 focus:ring-offset-background"
          >
            <IconGithub size={20} className="shrink-0" />
            GitHub
          </a>
        </div>
      </SectionReveal>
    </section>
  )
}
