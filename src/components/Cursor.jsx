import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useMediaQuery } from '../lib/hooks'

// A glowing dot that tracks the pointer exactly, plus a larger ring that
// lags behind via a spring and grows when hovering interactive elements.
export default function Cursor() {
  const finePointer = useMediaQuery('(pointer: fine)')
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 320, damping: 26, mass: 0.5 })
  const ringY = useSpring(y, { stiffness: 320, damping: 26, mass: 0.5 })
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    if (!finePointer) return
    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    const over = (e) => {
      setHovering(!!e.target.closest('a, button, [data-cursor="hover"]'))
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
    }
  }, [finePointer, x, y])

  if (!finePointer) return null

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100]"
        style={{ x, y }}
      >
        <div className="h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_12px_rgb(var(--accent-rgb))]" />
      </motion.div>

      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100]"
        style={{ x: ringX, y: ringY }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/60"
          animate={{
            width: hovering ? 56 : 30,
            height: hovering ? 56 : 30,
            opacity: hovering ? 1 : 0.65,
            backgroundColor: hovering
              ? 'rgb(var(--accent-rgb) / 0.10)'
              : 'rgba(0,0,0,0)',
          }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        />
      </motion.div>
    </>
  )
}
