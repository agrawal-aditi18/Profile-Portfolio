import { motion } from 'framer-motion'
import { FiCode, FiServer, FiLayers, FiCloud } from 'react-icons/fi'
import { services } from '../data/info'
import SectionHeading from './SectionHeading'

const iconMap = { code: FiCode, server: FiServer, layers: FiLayers, cloud: FiCloud }

export default function WhatIDo() {
  return (
    <section id="services" className="relative overflow-hidden py-24 md:py-28">
      {/* giant background word, like the reference */}
      <span
        aria-hidden
        className="pointer-events-none absolute -left-4 top-10 select-none text-[22vw] font-bold leading-none text-white/[0.025] md:top-4"
      >
        WHAT I DO
      </span>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading kicker="02 — Services" align="center">
          What I <span className="text-gradient">Do</span>
        </SectionHeading>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || FiCode
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:bg-white/[0.05]"
              >
                {/* corner brackets */}
                <span className="absolute left-3 top-3 h-3 w-3 border-l border-t border-accent/0 transition-colors duration-300 group-hover:border-accent/60" />
                <span className="absolute bottom-3 right-3 h-3 w-3 border-b border-r border-accent/0 transition-colors duration-300 group-hover:border-accent/60" />

                <div className="grid h-12 w-12 place-items-center rounded-xl border border-accent/30 bg-accent/10 text-2xl text-accent transition-transform duration-300 group-hover:scale-110">
                  <Icon />
                </div>

                <h3 className="mt-5 text-lg font-semibold text-slate-100">{service.title}</h3>
                <p className="mt-1 font-mono text-xs uppercase tracking-wide text-accent/80">
                  {service.subtitle}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{service.desc}</p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {service.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-white/5 px-2 py-0.5 font-mono text-[11px] text-slate-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
