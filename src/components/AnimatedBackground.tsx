import { useEffect, useRef } from 'react'
import { useMousePositionRef } from '../hooks/useMousePosition'

const ORB_COUNT = 4
const LERP = 0.02
const MOUSE_INFLUENCE = 0.15

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
  const orbsRef = useRef(
    Array.from({ length: ORB_COUNT }, (_, i) => ({
      x: 0.5,
      y: 0.5,
      vx: 0.3 * Math.cos((i * Math.PI * 2) / ORB_COUNT),
      vy: 0.2 * Math.sin((i * Math.PI * 2) / ORB_COUNT),
      radius: 0.25 + (i % 3) * 0.15,
      hueOffset: i * 0.25,
      currentX: 0.5,
      currentY: 0.5,
    }))
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let rafId: number

    const setSize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      const dpr = Math.min(window.devicePixelRatio ?? 1, 2)
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      sizeRef.current = { w, h }
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

      for (let i = 0; i < orbs.length; i++) {
        const o = orbs[i]
        o.x += o.vx * 0.002
        o.y += o.vy * 0.002
        if (o.x < 0 || o.x > 1) o.vx *= -1
        if (o.y < 0 || o.y > 1) o.vy *= -1

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

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 h-full w-full pointer-events-none"
      style={{ background: 'var(--color-background)' }}
      aria-hidden
    />
  )
}
