'use client'

import { useEffect, useMemo, useState } from 'react'
import { NeonProgressButton } from '@/design-system'
import { useT } from '../i18n/client'
import { IconAbout } from './icons'
import { SectionReveal } from './shared/SectionReveal'

const AUTO_ADVANCE_MS = 5000
const FULL_REVEAL_STEP = 5

function getEasedProgress(progress: number) {
  if (progress <= 0) return 0
  if (progress >= 1) return 1

  // Non-linear curve: soft start, faster middle, dramatic finish.
  if (progress < 0.6) {
    return Math.pow(progress / 0.6, 1.8) * 0.72
  }

  const tail = (progress - 0.6) / 0.4
  return 0.72 + (1 - Math.pow(1 - tail, 2.4)) * 0.28
}

function getHumanTypingDelay(text: string, nextIndex: number) {
  const prevChar = text[nextIndex - 1] ?? ''
  const progress = text.length ? nextIndex / text.length : 0

  // Base pace with natural hand jitter.
  let delay = 15 + Math.random() * 30

  // People usually accelerate in the middle and slow near edges.
  const edgeSlowdown = 1 + Math.pow(Math.abs(progress - 0.5) * 2, 1.35) * 0.45
  delay *= edgeSlowdown

  // Micro-pause after punctuation, like real thinking/breathing.
  if (/[.!?]/.test(prevChar)) delay += 120 + Math.random() * 120
  else if (/[,;:]/.test(prevChar)) delay += 55 + Math.random() * 85
  else if (prevChar === '\n') delay += 95 + Math.random() * 110
  else if (prevChar === ' ') delay *= 0.65

  // Rare hesitation.
  if (Math.random() < 0.06) delay += 40 + Math.random() * 75

  return Math.max(10, Math.min(delay, 320))
}

export function About() {
  const t = useT()
  const paragraph = t('about.paragraph')
  const paragraphs = useMemo(() => paragraph.split(/\n\n+/).filter(Boolean), [paragraph])
  const [step, setStep] = useState(0)
  const [showFullReveal, setShowFullReveal] = useState(false)
  const [typedChars, setTypedChars] = useState(0)
  const [autoElapsed, setAutoElapsed] = useState(0)
  const fullRevealIndex = Math.min(FULL_REVEAL_STEP, Math.max(paragraphs.length - 1, 0))
  const isLastStoryStep = paragraphs.length > 0 && step === fullRevealIndex
  const currentText = showFullReveal ? '' : (paragraphs[step] ?? '')
  const typedText = currentText.slice(0, typedChars)
  const isTyping = typedChars < currentText.length
  const autoProgressLinear = isTyping ? 0 : Math.min(autoElapsed / AUTO_ADVANCE_MS, 1)
  const autoProgress = showFullReveal ? 1 : getEasedProgress(autoProgressLinear)

  useEffect(() => {
    if (!currentText || typedChars >= currentText.length || showFullReveal) {
      return
    }
    const timer = window.setTimeout(() => {
      setTypedChars((prev) => Math.min(prev + 1, currentText.length))
    }, getHumanTypingDelay(currentText, typedChars))

    return () => window.clearTimeout(timer)
  }, [currentText, typedChars, showFullReveal])

  useEffect(() => {
    if (!paragraphs.length || isTyping || showFullReveal) {
      return
    }

    const reset = window.setTimeout(() => setAutoElapsed(0), 0)
    const startedAt = window.performance.now()
    const tick = window.setInterval(() => {
      setAutoElapsed(window.performance.now() - startedAt)
    }, 50)

    const autoNext = window.setTimeout(() => {
      if (isLastStoryStep) {
        setShowFullReveal(true)
      } else {
        setTypedChars(0)
        setStep((prev) => Math.min(prev + 1, fullRevealIndex))
      }
    }, AUTO_ADVANCE_MS)

    return () => {
      window.clearTimeout(reset)
      window.clearInterval(tick)
      window.clearTimeout(autoNext)
    }
  }, [isTyping, paragraphs.length, step, showFullReveal, isLastStoryStep, fullRevealIndex])

  function handleNextStep() {
    if (!paragraphs.length) return

    if (showFullReveal) {
      setShowFullReveal(false)
      setAutoElapsed(0)
      setTypedChars(0)
      setStep(0)
      return
    }

    if (isTyping) {
      setTypedChars(currentText.length)
      return
    }

    if (isLastStoryStep) {
      setShowFullReveal(true)
      return
    }

    setAutoElapsed(0)
    setTypedChars(0)
    setStep((prev) => Math.min(prev + 1, fullRevealIndex))
  }

  return (
    <section id="about" className="px-4 py-16 sm:px-6 sm:py-20 md:py-28">
      <SectionReveal className="mx-auto max-w-2xl text-center">
        <h2 className="font-heading neon-text-glow-cyan flex flex-wrap items-center justify-center gap-2 text-2xl font-bold text-primary sm:gap-3 sm:text-3xl md:text-4xl">
          <IconAbout size={28} className="neon-icon-cyan shrink-0 text-accent-cyan sm:w-8 sm:h-8" />
          {t('about.title')}
        </h2>

        <div className="sr-only" aria-hidden="true">
          {paragraphs.map((text, index) => (
            <p key={`seo-${index}`}>{text}</p>
          ))}
        </div>

        <div className="neon-glow-cyan mt-6 rounded-2xl border border-accent-cyan/35 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.14),rgba(17,24,39,0.88)_48%)] px-5 py-6 text-left shadow-[0_0_30px_rgba(56,189,248,0.2),inset_0_0_24px_rgba(56,189,248,0.08)] sm:mt-8 sm:px-6 sm:py-7">
          <div className="h-[13.5rem] overflow-hidden text-primary/90 text-[15px] leading-[1.75] sm:text-base sm:leading-[1.8]">
            {showFullReveal ? (
              <div className="h-full space-y-4 overflow-y-auto pr-1 sm:space-y-5">
                {paragraphs.map((text, index) => (
                  <p
                    key={index}
                    className="border-l border-accent-cyan/35 pl-3 text-primary/95 shadow-[inset_2px_0_10px_rgba(56,189,248,0.08)] sm:pl-4"
                  >
                    {text}
                  </p>
                ))}
              </div>
            ) : (
              <p>
                {typedText}
                {isTyping && (
                  <span className="ml-0.5 inline-block h-[1em] w-[2px] animate-pulse bg-accent-cyan align-[-0.1em] shadow-[0_0_10px_rgba(56,189,248,0.95)]" />
                )}
              </p>
            )}
          </div>

          <div className="mt-5 flex items-center justify-between">
            <div className="text-xs text-accent-cyan/85 sm:text-sm">
              {paragraphs.length > 0
                ? `${showFullReveal ? fullRevealIndex + 1 : Math.min(step + 1, fullRevealIndex + 1)} / ${fullRevealIndex + 1}`
                : '0 / 0'}
            </div>

            <NeonProgressButton
              progress={autoProgress}
              onClick={handleNextStep}
              ariaLabel={t('about.readMore')}
            >
                {showFullReveal ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_8px_rgba(56,189,248,0.95)]" aria-hidden>
                    <path d="M21 12a9 9 0 1 1-3-6.7" />
                    <path d="M21 3v6h-6" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_8px_rgba(56,189,248,0.95)]" aria-hidden>
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                )}
            </NeonProgressButton>
          </div>
        </div>
      </SectionReveal>
    </section>
  )
}
