import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../lib/hooks'

// Fixed, full-screen ambient layer behind all content:
//  - radial accent glows in the corners
//  - a faint dotted grid
//  - a drifting particle network rendered on canvas
export default function Background() {
  const canvasRef = useRef(null)
  const reduceMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (reduceMotion) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let particles = []
    let raf = 0

    const accent = () => {
      const v = getComputedStyle(document.documentElement)
        .getPropertyValue('--accent-rgb')
        .trim()
      return v || '34 211 238'
    }
    let rgb = accent()

    const resize = () => {
      width = canvas.clientWidth
      height = canvas.clientHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.min(90, Math.floor((width * height) / 18000))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.6,
      }))
      rgb = accent()
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgb(${rgb} / 0.55)`
        ctx.fill()
      }

      // connect nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist < 130) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgb(${rgb} / ${0.12 * (1 - dist / 130)})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      raf = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [reduceMotion])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* base + grid */}
      <div className="absolute inset-0 bg-[var(--bg)]" />
      <div className="absolute inset-0 bg-grid opacity-60" />

      {/* ambient accent glows */}
      <div className="absolute -left-40 -top-40 h-[480px] w-[480px] rounded-full bg-accent/20 blur-[140px]" />
      <div className="absolute -bottom-52 -right-32 h-[520px] w-[520px] rounded-full bg-accent-2/20 blur-[150px]" />
      <div className="absolute left-1/2 top-1/3 h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-accent/10 blur-[160px]" />

      {/* particle network */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* subtle vignette so content stays readable */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,var(--bg)_100%)]" />
    </div>
  )
}
