import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { techCategories } from '../data/tech'
import { IconTech } from './icons'
import { SectionReveal } from './shared/SectionReveal'

const SKILLICONS_URL = 'https://skillicons.dev/icons'
const PROGRESS_DURATION_MS = 5000
const PROGRESS_TICK_MS = 50
const FREEZE_AFTER_CLICK_MS = 30_000

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.05 },
  },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35 },
  },
}

export function TechStack() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const freezeUntilRef = useRef(0)

  // Auto-advance: progress fills, then switch to next category in array order (0→1→2→…→last→0)
  useEffect(() => {
    const step = PROGRESS_TICK_MS / PROGRESS_DURATION_MS
    const count = techCategories.length
    const id = setInterval(() => {
      if (Date.now() < freezeUntilRef.current) return
      setProgress((p) => {
        const next = p + step
        if (next >= 1) {
          setActiveIndex((i) => (i + 1) % count) // strictly next in order
          return 0
        }
        return next
      })
    }, PROGRESS_TICK_MS)
    return () => clearInterval(id)
  }, [])

  const category = techCategories[activeIndex]

  return (
    <section
      id="tech"
      className="relative px-4 py-20 sm:px-6 sm:py-24 md:py-32"
    >
      <SectionReveal className="relative mx-auto max-w-6xl">
        <h2 className="font-heading flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-3xl font-bold text-primary sm:text-4xl md:text-5xl md:text-center">
          <IconTech
            size={36}
            className="neon-icon-violet shrink-0 text-accent-violet sm:w-10 sm:h-10 md:w-12 md:h-12"
          />
          Tech I work with
        </h2>
        <p className="mt-4 text-center text-lg text-primary/80 sm:text-xl max-w-2xl mx-auto">
          Stacks and tools I use in production
        </p>

        {/* Category tabs */}
        <div className="mt-10 flex flex-wrap justify-center gap-2 sm:mt-12 sm:gap-3">
          {techCategories.map((cat, i) => (
            <button
              key={cat.title}
              type="button"
              onClick={() => {
                setActiveIndex(i)
                setProgress(0)
                freezeUntilRef.current = Date.now() + FREEZE_AFTER_CLICK_MS
              }}
              className={`relative overflow-hidden rounded-xl border-2 px-4 py-2.5 font-heading text-sm font-semibold transition-all duration-300 sm:px-5 sm:py-3 sm:text-base ${
                activeIndex === i
                  ? 'border-accent-cyan bg-accent-cyan/15 text-accent-cyan shadow-[0_0_24px_rgba(56,189,248,0.25)]'
                  : 'border-white/15 bg-white/5 text-primary/80 hover:border-white/30 hover:bg-white/10 hover:text-primary'
              }`}
            >
              {/* Water-style progress fill from bottom to top (active tab only) */}
              {activeIndex === i && (
                <div
                  className="absolute inset-0 transition-none"
                  style={{ clipPath: 'inset(0 round 10px)' }}
                  aria-hidden
                >
                  <svg
                    className="absolute inset-0 h-full w-full"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                  >
                    {/* Water level y: 100 = empty, 0 = full. Top edge is wavy. */}
                    <path
                      fill="rgba(56,189,248,0.35)"
                      d={`M 0,100 L 100,100 L 100,${100 - progress * 100} 
                          Q 87.5,${100 - progress * 100 - 6} 75,${100 - progress * 100} 
                          Q 62.5,${100 - progress * 100 + 6} 50,${100 - progress * 100} 
                          Q 37.5,${100 - progress * 100 - 6} 25,${100 - progress * 100} 
                          Q 12.5,${100 - progress * 100 + 6} 0,${100 - progress * 100} Z`}
                    />
                    {/* Subtle highlight on wave crest for water look */}
                    <path
                      d={`M 0,${100 - progress * 100} 
                          Q 12.5,${100 - progress * 100 + 6} 25,${100 - progress * 100} 
                          Q 37.5,${100 - progress * 100 - 6} 50,${100 - progress * 100} 
                          Q 62.5,${100 - progress * 100 + 6} 75,${100 - progress * 100} 
                          Q 87.5,${100 - progress * 100 - 6} 100,${100 - progress * 100}`}
                      fill="none"
                      stroke="rgba(255,255,255,0.35)"
                      strokeWidth="0.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              )}
              <span className="relative z-10">{cat.title}</span>
            </button>
          ))}
        </div>

        {/* Skills grid with stagger on tab change */}
        <div className="mt-8 flex flex-wrap justify-center gap-3 sm:mt-10 sm:gap-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={category.title}
              className="flex flex-wrap justify-center gap-3 sm:gap-4"
              variants={container}
              initial="hidden"
              animate="visible"
            >
              {category.items.map((skill) => (
                <motion.div
                  key={`${category.title}-${skill.name}`}
                  variants={item}
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex cursor-default items-center gap-2.5 rounded-xl border-2 border-white/10 bg-card/80 px-4 py-3 backdrop-blur-sm transition-colors duration-200 hover:border-accent-cyan/50 hover:bg-accent-cyan/10 hover:shadow-[0_0_28px_rgba(56,189,248,0.2)] sm:gap-3 sm:px-5 sm:py-3.5"
                >
                  <span className="flex shrink-0 opacity-90 transition-transform duration-200 group-hover:scale-110 [filter:drop-shadow(0_0_6px_var(--color-accent-cyan))]">
                    <img
                      src={`${SKILLICONS_URL}?i=${skill.icon}&theme=dark`}
                      alt=""
                      className="h-7 w-7 object-contain sm:h-8 sm:w-8"
                    />
                  </span>
                  <span className="text-sm font-semibold text-primary/95 sm:text-base">
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </SectionReveal>
    </section>
  )
}
