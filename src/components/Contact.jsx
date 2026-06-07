import { motion } from 'framer-motion'
import { FiMail, FiPhone, FiMapPin, FiArrowUpRight, FiDownload } from 'react-icons/fi'
import { profile } from '../data/info'
import Reveal from './Reveal'

const details = [
  { Icon: FiMail, label: profile.email, href: `mailto:${profile.email}` },
  { Icon: FiPhone, label: profile.phone, href: `tel:${profile.phone.replace(/\s+/g, '')}` },
  { Icon: FiMapPin, label: profile.location, href: null },
]

export default function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden py-24 md:py-32">
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 -z-0 -translate-x-1/2 select-none whitespace-nowrap text-[18vw] font-bold leading-none text-white/[0.02]"
      >
        {profile.name.toUpperCase()}
      </span>

      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <Reveal>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.35em] text-accent">
            06 — Contact
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
            Let's build something <span className="text-gradient text-glow">great</span> together
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-xl text-base text-slate-400 md:text-lg">
            I'm open to internships, full-time roles, and freelance projects. Have an
            idea or an opportunity? My inbox is always open.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-semibold text-[var(--bg)] transition-all hover:shadow-[0_0_36px_-6px_rgb(var(--accent-rgb))]"
            >
              Hire Me
              <FiArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 font-semibold text-slate-200 transition-colors hover:border-accent/50 hover:text-accent"
            >
              <FiDownload /> Résumé
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
            {details.map(({ Icon, label, href }) => {
              const content = (
                <span className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-accent">
                  <Icon className="text-accent" /> {label}
                </span>
              )
              return href ? (
                <motion.a key={label} href={href} whileHover={{ y: -2 }}>
                  {content}
                </motion.a>
              ) : (
                <span key={label}>{content}</span>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
