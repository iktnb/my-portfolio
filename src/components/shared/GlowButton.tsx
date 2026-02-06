import { type ReactNode } from 'react'

interface GlowButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'cyan' | 'violet'
  className?: string
}

export function GlowButton({
  children,
  href,
  onClick,
  variant = 'cyan',
  className = '',
}: GlowButtonProps) {
  const base =
    'inline-flex items-center justify-center rounded-lg px-6 py-3 font-semibold transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background'
  const cyan =
    'bg-accent-cyan text-background hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] focus:ring-accent-cyan'
  const violet =
    'bg-accent-violet text-background hover:shadow-[0_0_20px_rgba(167,139,250,0.4)] focus:ring-accent-violet'

  const styles = `${base} ${variant === 'cyan' ? cyan : violet} ${className}`

  if (href) {
    return (
      <a href={href} className={styles}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} className={styles}>
      {children}
    </button>
  )
}
