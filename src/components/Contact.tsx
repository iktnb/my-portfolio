import { contact } from '../data/content'
import { IconContact, IconEmail, IconGithub, IconLinkedIn, IconTelegram } from './icons'
import { GlowButton } from './shared/GlowButton'
import { SectionReveal } from './shared/SectionReveal'

export function Contact() {
  return (
    <section id="contact" className="px-4 py-16 sm:px-6 sm:py-20 md:py-28">
      <SectionReveal className="mx-auto max-w-2xl text-center">
        <h2 className="font-heading flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-2xl font-bold text-primary sm:text-3xl md:text-4xl">
          <IconContact size={28} className="neon-icon-violet shrink-0 text-accent-violet sm:w-8 sm:h-8" />
          Get in touch
        </h2>
        <p className="mt-5 text-base text-primary/90 sm:mt-6 sm:text-lg">
          {contact.cta}
        </p>
        <div className="mt-8 flex flex-col flex-wrap items-stretch justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
          <GlowButton href={contact.email} variant="cyan" className="w-full sm:w-auto sm:min-w-0">
            <IconEmail size={20} className="shrink-0" />
            Email
          </GlowButton>
          <GlowButton href={contact.telegram} variant="violet" external className="w-full sm:w-auto sm:min-w-0">
            <IconTelegram size={20} className="shrink-0" />
            Telegram
          </GlowButton>
          <GlowButton href={contact.linkedin} variant="violet" external className="w-full sm:w-auto sm:min-w-0">
            <IconLinkedIn size={20} className="shrink-0" />
            LinkedIn
          </GlowButton>
          <GlowButton href={contact.github} variant="violet" external className="w-full sm:w-auto sm:min-w-0">
            <IconGithub size={20} className="shrink-0" />
            GitHub
          </GlowButton>
        </div>
      </SectionReveal>
    </section>
  )
}
