import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FiGithub, FiExternalLink, FiArrowRight } from 'react-icons/fi'
import { projects, socials } from '../data/info'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import { useMediaQuery } from '../lib/hooks'

// A stylised "screenshot" placeholder — a browser frame with the project
// name on its gradient. Swap for a real <img> by editing this component.
function Preview({ project }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[var(--bg-soft)]">
      <div className="flex items-center gap-1.5 border-b border-white/5 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
        <span className="ml-2 truncate font-mono text-[10px] text-slate-500">
          {project.name.toLowerCase().replace(/\s+/g, '-')}.app
        </span>
      </div>
      <div className={`relative grid aspect-[16/10] place-items-center bg-gradient-to-br ${project.gradient}`}>
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="relative text-center">
          <div className="text-3xl font-bold tracking-tight text-white/90 sm:text-4xl">
            {project.name}
          </div>
          <div className="mt-1 font-mono text-xs uppercase tracking-[0.25em] text-white/50">
            {project.category}
          </div>
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ project }) {
  return (
    <div className="group flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-accent/40 sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <span className="font-mono text-5xl font-bold text-white/10 transition-colors group-hover:text-accent/30">
          {project.id}
        </span>
        <div className="text-right">
          <h3 className="text-2xl font-bold text-slate-100">{project.name}</h3>
          <p className="font-mono text-xs uppercase tracking-wide text-accent">{project.category}</p>
        </div>
      </div>

      <div className="mt-6">
        <Preview project={project} />
      </div>

      <p className="mt-6 text-sm leading-relaxed text-slate-400">{project.desc}</p>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <span key={t} className="rounded-md bg-white/5 px-2 py-1 font-mono text-[11px] text-slate-300">
            {t}
          </span>
        ))}
      </div>

      <div className="mt-auto flex gap-3 pt-6">
        <a
          href={project.links.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-slate-200 transition-colors hover:border-accent/50 hover:text-accent"
        >
          <FiGithub /> Code
        </a>
        {project.links.live && project.links.live !== '#' && (
          <a
            href={project.links.live}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent/20"
          >
            <FiExternalLink /> Live Demo
          </a>
        )}
      </div>
    </div>
  )
}

function MoreCard() {
  return (
    <div className="flex h-full flex-col items-center justify-center rounded-3xl border border-dashed border-white/15 bg-white/[0.02] p-10 text-center">
      <h3 className="text-2xl font-bold text-slate-100">
        Want to see <span className="text-gradient">more?</span>
      </h3>
      <p className="mt-3 max-w-xs text-sm text-slate-400">
        Explore all of my projects, experiments, and open-source work on GitHub.
      </p>
      <a
        href={socials.github}
        target="_blank"
        rel="noreferrer"
        className="group mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-[var(--bg)] transition-all hover:shadow-[0_0_30px_-4px_rgb(var(--accent-rgb))]"
      >
        See All Works
        <FiArrowRight className="transition-transform group-hover:translate-x-1" />
      </a>
    </div>
  )
}

// Desktop: vertical scroll drives a pinned horizontal track.
function HorizontalGallery() {
  const targetRef = useRef(null)
  const trackRef = useRef(null)
  const [distance, setDistance] = useState(0)

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return
      setDistance(Math.max(0, trackRef.current.scrollWidth - window.innerWidth))
    }
    measure()
    const id = setTimeout(measure, 300) // re-measure after fonts/layout settle
    window.addEventListener('resize', measure)
    return () => {
      clearTimeout(id)
      window.removeEventListener('resize', measure)
    }
  }, [])

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  })
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance])

  return (
    <section
      id="work"
      ref={targetRef}
      className="relative scroll-mt-24"
      style={{ height: `calc(100vh + ${distance}px)` }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-7xl px-8">
          <SectionHeading kicker="04 — Work">
            My <span className="text-gradient">Work</span>
          </SectionHeading>
        </div>

        <motion.div ref={trackRef} style={{ x }} className="mt-10 flex gap-6 px-8">
          {projects.map((p) => (
            <div key={p.id} className="w-[min(560px,80vw)] shrink-0">
              <ProjectCard project={p} />
            </div>
          ))}
          <div className="w-[min(420px,80vw)] shrink-0 pr-8">
            <MoreCard />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Mobile / tablet: simple vertical stack.
function StackedGallery() {
  return (
    <section id="work" className="mx-auto max-w-3xl scroll-mt-24 px-5 py-24 sm:px-8">
      <SectionHeading kicker="04 — Work">
        My <span className="text-gradient">Work</span>
      </SectionHeading>
      <div className="mt-10 space-y-6">
        {projects.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.05}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
        <Reveal>
          <MoreCard />
        </Reveal>
      </div>
    </section>
  )
}

export default function Projects() {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  return isDesktop ? <HorizontalGallery /> : <StackedGallery />
}
