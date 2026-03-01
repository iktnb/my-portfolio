import type { Locale } from '../i18n/messages'

interface LanguageSwitcherProps {
  locale: Locale
}

export function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const targetLocale: Locale = locale === 'en' ? 'ua' : 'en'
  const targetPath = targetLocale === 'en' ? '/' : '/ua/'
  const buttonLabel = locale === 'en' ? 'Проглянути українською' : 'See in English'
  const buttonAria = locale === 'en' ? 'Перемкнути мову на українську' : 'Switch language to English'

  return (
    <div className="absolute right-4 top-4 z-50">
      <button
        type="button"
        onClick={() => {
          const suffix = `${window.location.search}${window.location.hash}`
          window.location.assign(`${targetPath}${suffix}`)
        }}
        className="group relative isolate overflow-hidden rounded-lg border border-accent-cyan/35 bg-card/80 px-3 py-1.5 text-xs font-semibold text-primary/95 shadow-[0_0_0_rgba(56,189,248,0)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-cyan/60 hover:shadow-[0_0_24px_rgba(56,189,248,0.25)] active:translate-y-0 active:scale-[0.98] sm:text-sm"
        aria-label={buttonAria}
      >
        <span
          className="pointer-events-none absolute -left-1/2 -top-2 h-[180%] w-1/3 rotate-12 bg-white/20 blur-sm motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:translate-x-[260%]"
          aria-hidden
        />
        <span className="relative z-10 inline-flex items-center gap-1.5">
          {buttonLabel}
          <span
            className="motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:translate-x-0.5"
            aria-hidden
          >
            →
          </span>
        </span>
      </button>
    </div>
  )
}
