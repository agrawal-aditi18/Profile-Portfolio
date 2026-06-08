import { useRef } from 'react'
import { motion } from 'framer-motion'
import {
  SiCplusplus,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiReact,
  SiRedux,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiFirebase,
  SiNginx,
  SiGit,
  SiGithub,
  SiPostman,
  SiNpm,
} from 'react-icons/si'
import { FaAws } from 'react-icons/fa'
import { skills } from '../data/info'
import SectionHeading from './SectionHeading'

const iconRegistry = {
  cpp: SiCplusplus,
  js: SiJavascript,
  html: SiHtml5,
  css: SiCss,
  react: SiReact,
  redux: SiRedux,
  tailwind: SiTailwindcss,
  node: SiNodedotjs,
  express: SiExpress,
  mongodb: SiMongodb,
  mysql: SiMysql,
  firebase: SiFirebase,
  aws: FaAws,
  nginx: SiNginx,
  git: SiGit,
  github: SiGithub,
  postman: SiPostman,
  npm: SiNpm,
}

export default function TechStack() {
  const ref = useRef(null)

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <section id="skills" className="relative mx-auto max-w-7xl scroll-mt-24 px-5 py-24 sm:px-8 md:py-32">
      <SectionHeading kicker="05   Toolbox" align="center">
        Tech <span className="text-gradient">Stack</span>
      </SectionHeading>

      <p className="mx-auto mt-4 max-w-md text-center text-sm text-slate-400">
        The languages, frameworks, and tools I reach for to ship full-stack products.
      </p>

      <div
        ref={ref}
        onMouseMove={onMove}
        className="group relative mx-auto mt-14 max-w-4xl rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8"
      >
        {/* cursor spotlight */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(240px circle at var(--mx) var(--my), rgb(var(--accent-rgb) / 0.14), transparent 70%)',
          }}
        />

        <div className="relative grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4 md:grid-cols-6">
          {skills.map((skill, i) => {
            const Icon = iconRegistry[skill.icon]
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: (i % 6) * 0.05 }}
                className="group/tile flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-2 text-center transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:bg-accent/5"
              >
                {Icon ? (
                  <Icon className="text-3xl text-slate-300 transition-colors duration-300 group-hover/tile:text-accent sm:text-4xl" />
                ) : (
                  <span className="text-2xl">{skill.name[0]}</span>
                )}
                <span className="font-mono text-[10px] text-slate-500 sm:text-[11px]">
                  {skill.name}
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
