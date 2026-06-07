import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { timeline } from '../data/info'
import SectionHeading from './SectionHeading'

export default function Experience() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end center'],
  })
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 26, restDelta: 0.001 })

  return (
    <section id="experience" className="relative mx-auto max-w-7xl scroll-mt-24 px-5 py-24 sm:px-8 md:py-32">
      <SectionHeading kicker="03 — Journey" align="center">
        My career &amp; <span className="text-gradient">experience</span>
      </SectionHeading>

      <div ref={ref} className="relative mx-auto mt-16 max-w-5xl">
        {/* static track */}
        <div className="absolute left-4 top-0 h-full w-px -translate-x-1/2 bg-white/10 md:left-1/2" />
        {/* animated fill */}
        <motion.div
          style={{ scaleY }}
          className="absolute left-4 top-0 h-full w-px -translate-x-1/2 origin-top bg-gradient-to-b from-accent via-accent to-accent-2 md:left-1/2"
        />

        <div className="space-y-12 md:space-y-4">
          {timeline.map((entry, i) => {
            const leftSide = i % 2 === 0
            return (
              <div key={entry.title} className="relative md:grid md:grid-cols-2 md:items-center md:gap-x-12">
                {/* node */}
                <span className="absolute left-4 top-1.5 z-10 -translate-x-1/2 md:left-1/2">
                  <span className="relative flex h-4 w-4">
                    <motion.span
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ type: 'spring', stiffness: 260, damping: 16 }}
                      className="absolute inline-flex h-full w-full rounded-full bg-accent shadow-[0_0_18px_2px_rgb(var(--accent-rgb))]"
                    />
                    <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-[var(--bg)] bg-accent" />
                  </span>
                </span>

                <motion.div
                  initial={{ opacity: 0, x: leftSide ? -30 : 30, y: 10 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className={`ml-12 md:ml-0 ${
                    leftSide
                      ? 'md:col-start-1 md:pr-12 md:text-right'
                      : 'md:col-start-2 md:row-start-1 md:pl-12'
                  }`}
                >
                  <span className="font-mono text-3xl font-bold text-white/15 md:text-4xl">
                    {entry.period}
                  </span>
                  <h3 className="mt-1 text-xl font-semibold text-slate-100">{entry.title}</h3>
                  <p className="mt-0.5 text-sm font-medium text-accent">{entry.org}</p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{entry.desc}</p>
                </motion.div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
