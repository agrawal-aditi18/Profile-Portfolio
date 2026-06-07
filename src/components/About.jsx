import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { FiAward } from 'react-icons/fi'
import { about, achievements } from '../data/info'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

// Counts up to a numeric target when scrolled into view. Keeps any
// trailing suffix like "+" and respects decimals (e.g. "9.6").
function StatNumber({ value }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [display, setDisplay] = useState('0')

  const match = String(value).match(/^([\d.]+)(.*)$/)
  const target = match ? parseFloat(match[1]) : 0
  const suffix = match ? match[2] : ''
  const decimals = match && match[1].includes('.') ? 1 : 0

  useEffect(() => {
    if (!inView) return
    let raf
    const start = performance.now()
    const duration = 1200
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay((target * eased).toFixed(decimals))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, target, decimals])

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl scroll-mt-24 px-5 py-24 sm:px-8 md:py-32">
      <div className="grid gap-12 md:grid-cols-[1.15fr_0.85fr] md:gap-16">
        <div>
          <SectionHeading kicker="01 — About">
            Turning ideas into <span className="text-gradient">working products</span>
          </SectionHeading>

          <Reveal delay={0.1}>
            <p className="mt-8 text-base leading-relaxed text-slate-300 md:text-lg">
              {about.paragraph}
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <ul className="mt-8 space-y-3">
              {achievements.map((a) => (
                <li key={a} className="flex items-start gap-3 text-slate-400">
                  <FiAward className="mt-1 shrink-0 text-accent" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-4 self-start sm:gap-5">
          {about.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-accent/40"
            >
              <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-accent/10 blur-2xl transition-opacity group-hover:opacity-100 sm:opacity-0" />
              <div className="text-4xl font-bold text-gradient sm:text-5xl">
                <StatNumber value={stat.value} />
              </div>
              <div className="mt-2 text-sm text-slate-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
