export type ContactId = 'email' | 'telegram' | 'linkedin' | 'github'
export type ContactTone = 'cyan' | 'violet'
export type ContactIcon = 'email' | 'telegram' | 'linkedin' | 'github'

export interface ContactItem {
  id: ContactId
  labelKey: 'contact.buttons.email' | 'contact.buttons.telegram' | 'contact.buttons.linkedIn' | 'contact.buttons.gitHub'
  href: string
  displayValue: string
  copyValue: string
  external?: boolean
  tone: ContactTone
  icon: ContactIcon
}

export const contacts: ContactItem[] = [
  {
    id: 'email',
    labelKey: 'contact.buttons.email',
    href: 'mailto:iknowthatinobody@gmail.com',
    displayValue: 'iknowthatinobody@gmail.com',
    copyValue: 'iknowthatinobody@gmail.com',
    tone: 'cyan',
    icon: 'email',
  },
  {
    id: 'telegram',
    labelKey: 'contact.buttons.telegram',
    href: 'https://t.me/iktnb',
    displayValue: 't.me/iktnb',
    copyValue: '@iktnb',
    external: true,
    tone: 'violet',
    icon: 'telegram',
  },
  {
    id: 'linkedin',
    labelKey: 'contact.buttons.linkedIn',
    href: 'https://www.linkedin.com/in/yurii-basiyk/',
    displayValue: 'linkedin.com/in/yurii-basiyk',
    copyValue: 'https://www.linkedin.com/in/yurii-basiyk/',
    external: true,
    tone: 'violet',
    icon: 'linkedin',
  },
  {
    id: 'github',
    labelKey: 'contact.buttons.gitHub',
    href: 'https://github.com/iktnb',
    displayValue: 'github.com/iktnb',
    copyValue: 'https://github.com/iktnb',
    external: true,
    tone: 'violet',
    icon: 'github',
  },
]
