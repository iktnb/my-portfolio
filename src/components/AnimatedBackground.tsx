import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { useMousePositionRef } from '../hooks/useMousePosition'

const ORB_COUNT = 4
const LERP = 0.02
const MOUSE_INFLUENCE = 0.15
const PARALLAX_OFFSET_PX = 280
const ORB_START_POSITIONS = [
  { x: 0.18, y: 0.22 },
  { x: 0.8, y: 0.2 },
  { x: 0.24, y: 0.78 },
  { x: 0.76, y: 0.72 },
]

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function getCssVar(name: string): string {
  if (typeof document === 'undefined') return '#0B0F19'
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || '#0B0F19'
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useMousePositionRef()
  const sizeRef = useRef({ w: 0, h: 0 })
  const hasAnimatedRef = useRef(false)
  const canvasReadyRef = useRef(false)
  const [isCanvasReady, setIsCanvasReady] = useState(false)
  const orbsRef = useRef(
    Array.from({ length: ORB_COUNT }, (_, i) => {
      const start = ORB_START_POSITIONS[i % ORB_START_POSITIONS.length]
      return {
        x: start.x,
        y: start.y,
        vx: 0.3 * Math.cos((i * Math.PI * 2) / ORB_COUNT),
        vy: 0.2 * Math.sin((i * Math.PI * 2) / ORB_COUNT),
        radius: 0.25 + (i % 3) * 0.15,
        hueOffset: i * 0.25,
        currentX: start.x,
        currentY: start.y,
      }
    })
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let rafId: number

    const setSize = () => {
      const w = window.innerWidth
      const h = window.innerHeight + PARALLAX_OFFSET_PX
      const dpr = Math.min(window.devicePixelRatio ?? 1, 2)
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      sizeRef.current = { w: window.innerWidth, h }
    }

    const draw = () => {
      const { w, h } = sizeRef.current
      const mx = mouseRef.current.x / w
      const my = mouseRef.current.y / h
      const bg = getCssVar('--color-background')
      const cyan = getCssVar('--color-accent-cyan')
      const violet = getCssVar('--color-accent-violet')
      const colors = [cyan, violet, cyan, violet]

      ctx.fillStyle = bg
      ctx.fillRect(0, 0, w, h)

      const orbs = orbsRef.current
      const hasAnimated = hasAnimatedRef.current

      for (let i = 0; i < orbs.length; i++) {
        const o = orbs[i]
        if (hasAnimated) {
          o.x += o.vx * 0.002
          o.y += o.vy * 0.002
          if (o.x < 0 || o.x > 1) o.vx *= -1
          if (o.y < 0 || o.y > 1) o.vy *= -1
        }

        const dx = mx - o.x
        const dy = my - o.y
        const dist = Math.hypot(dx, dy) || 0.001
        const force = Math.min(1, 0.3 / dist) * MOUSE_INFLUENCE
        const targetX = o.x + dx * force
        const targetY = o.y + dy * force

        o.currentX = lerp(o.currentX, targetX, LERP)
        o.currentY = lerp(o.currentY, targetY, LERP)

        const px = o.currentX * w
        const py = o.currentY * h
        const r = Math.max(w, h) * o.radius

        const gradient = ctx.createRadialGradient(px, py, 0, px, py, r)
        const color = colors[i]
        gradient.addColorStop(0, color + '40')
        gradient.addColorStop(0.4, color + '18')
        gradient.addColorStop(0.7, color + '08')
        gradient.addColorStop(1, 'transparent')

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(px, py, r, 0, Math.PI * 2)
        ctx.fill()
      }

      if (!canvasReadyRef.current) {
        canvasReadyRef.current = true
        setIsCanvasReady(true)
      }
      hasAnimatedRef.current = true

      rafId = requestAnimationFrame(draw)
    }

    setSize()
    draw()

    const onResize = () => {
      setSize()
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
    }
  }, [mouseRef])

  const shouldReduceMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const parallaxY = useTransform(scrollY, [0, 900], [0, -PARALLAX_OFFSET_PX])

  return (
    <motion.div
      className="fixed left-0 top-0 -z-10 w-full pointer-events-none"
      style={{
        height: `calc(100vh + ${PARALLAX_OFFSET_PX}px)`,
        background: 'var(--color-background)',
        y: shouldReduceMotion ? 0 : parallaxY,
      }}
    >
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background:
            'radial-gradient(46rem 46rem at 18% 22%, rgba(56,189,248,0.18), transparent 70%), radial-gradient(42rem 42rem at 80% 20%, rgba(167,139,250,0.17), transparent 70%), radial-gradient(44rem 44rem at 24% 78%, rgba(56,189,248,0.14), transparent 70%), radial-gradient(40rem 40rem at 76% 72%, rgba(167,139,250,0.12), transparent 70%), var(--color-background)',
          opacity: isCanvasReady ? 0 : 1,
        }}
        aria-hidden
      />
      <canvas
        ref={canvasRef}
        className="block w-full shrink-0 transition-opacity duration-200"
        style={{
          height: `calc(100vh + ${PARALLAX_OFFSET_PX}px)`,
          background: 'var(--color-background)',
          opacity: isCanvasReady ? 1 : 0,
        }}
        aria-hidden
      />
    </motion.div>
  )
}
