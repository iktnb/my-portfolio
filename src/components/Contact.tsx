import { contact } from '../data/content'
import { IconContact, IconEmail, IconGithub, IconLinkedIn, IconTelegram } from './icons'
import { GlowButton } from './shared/GlowButton'
import { SectionReveal } from './shared/SectionReveal'

export function Contact() {
  return (
    <section id="contact" className="px-6 py-20 md:py-28">
      <SectionReveal className="mx-auto max-w-2xl text-center">
        <h2 className="font-heading flex items-center justify-center gap-3 text-3xl font-bold text-primary sm:text-4xl">
          <IconContact size={32} className="neon-icon-violet shrink-0 text-accent-violet" />
          Get in touch
        </h2>
        <p className="mt-6 text-lg text-primary/90">
          {contact.cta}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <GlowButton href={contact.email} variant="cyan">
            <IconEmail size={20} className="shrink-0" />
            Email
          </GlowButton>
          <GlowButton href={contact.telegram} variant="violet">
            <IconTelegram size={20} className="shrink-0" />
            Telegram
          </GlowButton>
          <GlowButton href={contact.linkedin} variant="violet" external>
            <IconLinkedIn size={20} className="shrink-0" />
            LinkedIn
          </GlowButton>
          <GlowButton href={contact.github} variant="violet" external>
            <IconGithub size={20} className="shrink-0" />
            GitHub
          </GlowButton>
        </div>
      </SectionReveal>
    </section>
  )
}
