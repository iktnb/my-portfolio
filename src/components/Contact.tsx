import { useState } from 'react'
import { IconContact, IconEmail, IconGithub, IconLinkedIn, IconTelegram } from './icons'
import { SectionReveal } from './shared/SectionReveal'
import { contacts, type ContactTone } from '../data/contacts'
import { useT } from '../i18n/client'

const iconByName = {
  email: IconEmail,
  telegram: IconTelegram,
  linkedin: IconLinkedIn,
  github: IconGithub,
} as const

const toneStyles: Record<
  ContactTone,
  {
    container: string
    icon: string
    link: string
    button: string
  }
> = {
  cyan: {
    container:
      'border-accent-cyan/30 bg-accent-cyan/5 hover:border-accent-cyan/60 hover:bg-accent-cyan/10',
    icon: 'text-accent-cyan',
    link: 'group-hover:text-accent-cyan',
    button:
      'border-accent-cyan/40 text-accent-cyan hover:border-accent-cyan hover:bg-accent-cyan/10',
  },
  violet: {
    container:
      'border-accent-violet/30 bg-accent-violet/5 hover:border-accent-violet/60 hover:bg-accent-violet/10',
    icon: 'text-accent-violet',
    link: 'group-hover:text-accent-violet',
    button:
      'border-accent-violet/40 text-accent-violet hover:border-accent-violet hover:bg-accent-violet/10',
  },
}

export function Contact() {
  const t = useT()
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const copyContact = async (key: string, value: string) => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value)
      } else if (typeof document !== 'undefined') {
        const textArea = document.createElement('textarea')
        textArea.value = value
        textArea.style.position = 'fixed'
        textArea.style.opacity = '0'
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
      }

      setCopiedKey(key)
      window.setTimeout(() => {
        setCopiedKey((current) => (current === key ? null : current))
      }, 1800)
    } catch {
      // no-op: keep UI responsive even if clipboard access is blocked
    }
  }

  return (
    <section id="contact" className="px-4 py-16 sm:px-6 sm:py-20 md:py-28">
      <SectionReveal className="mx-auto max-w-2xl text-center">
        <h2 className="font-heading flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-2xl font-bold text-primary sm:text-3xl md:text-4xl">
          <IconContact size={28} className="neon-icon-violet shrink-0 text-accent-violet sm:w-8 sm:h-8" />
          {t('contact.title')}
        </h2>
        <p className="mt-5 text-base text-primary/90 sm:mt-6 sm:text-lg">
          {t('contact.cta')}
        </p>
        <div className="mt-8 grid gap-3 text-left sm:mt-10">
          {contacts.map((contact) => {
            const Icon = iconByName[contact.icon]
            const styles = toneStyles[contact.tone]

            return (
              <div
                key={contact.id}
                className={`group flex items-center gap-3 rounded-xl border p-3 transition-all duration-300 ${styles.container}`}
              >
                <Icon size={20} className={`shrink-0 ${styles.icon}`} />
                <div className="min-w-0 flex-1">
                  <p className="text-xs uppercase tracking-wide text-primary/60">{t(contact.labelKey)}</p>
                  <a
                    href={contact.href}
                    {...(contact.external && {
                      target: '_blank',
                      rel: 'noopener noreferrer',
                    })}
                    className={`select-text break-all text-sm text-primary transition-colors sm:text-base ${styles.link}`}
                  >
                    {contact.displayValue}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => copyContact(contact.id, contact.copyValue)}
                  className={`min-w-[84px] rounded-md border px-3 py-2 text-xs font-medium transition-all ${styles.button}`}
                >
                  {copiedKey === contact.id ? 'Copied ✓' : 'Copy'}
                </button>
              </div>
            )
          })}
        </div>
      </SectionReveal>
    </section>
  )
}
