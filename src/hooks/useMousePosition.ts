import { useEffect, useRef } from 'react'

/** Current mouse position (clientX, clientY). Updated in a ref to avoid re-renders. */
export function useMousePositionRef() {
  const ref = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      ref.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('pointermove', handleMove)
    return () => window.removeEventListener('pointermove', handleMove)
  }, [])

  return ref
}
