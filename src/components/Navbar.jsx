import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiMenu, FiX, FiDownload } from 'react-icons/fi'
import { profile, navLinks } from '../data/info'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled
            ? 'border-b border-white/5 bg-[var(--bg)]/70 backdrop-blur-xl'
            : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="#top" className="group flex items-center gap-2" aria-label="Home">
            <span className="grid h-9 w-9 place-items-center rounded-lg border border-accent/40 bg-accent/10 font-bold text-accent transition-colors group-hover:bg-accent/20">
              {profile.initials}
            </span>
          </a>

          <a
            href={`mailto:${profile.email}`}
            className="hidden font-mono text-sm text-slate-400 transition-colors hover:text-accent lg:block"
          >
            {profile.email}
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium uppercase tracking-wide text-slate-300 transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            ))}
            <a
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent transition-all hover:bg-accent/20 hover:shadow-[0_0_24px_-6px_rgb(var(--accent-rgb))]"
            >
              <FiDownload className="text-base" /> Résumé
            </a>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="text-2xl text-slate-200 md:hidden"
            aria-label="Open menu"
          >
            <FiMenu />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[var(--bg)]/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex h-16 items-center justify-between px-5">
              <span className="grid h-9 w-9 place-items-center rounded-lg border border-accent/40 bg-accent/10 font-bold text-accent">
                {profile.initials}
              </span>
              <button
                onClick={() => setOpen(false)}
                className="text-2xl text-slate-200"
                aria-label="Close menu"
              >
                <FiX />
              </button>
            </div>
            <motion.ul
              className="mt-10 flex flex-col items-center gap-8"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.08 } } }}
            >
              {navLinks.map((link) => (
                <motion.li
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 },
                  }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-3xl font-semibold text-slate-100 hover:text-accent"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              >
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-6 py-3 text-lg font-semibold text-accent"
                >
                  <FiDownload /> Résumé
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
