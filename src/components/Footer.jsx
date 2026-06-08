import { FiArrowUpRight, FiArrowUp } from 'react-icons/fi'
import { profile, socials } from '../data/info'
import LikeButton from './LikeButton'

const socialLinks = [
  { label: 'GitHub', href: socials.github },
  { label: 'LinkedIn', href: socials.linkedin },
  { label: 'LeetCode', href: socials.leetcode },
  { label: 'Email', href: socials.email },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 px-5 py-12 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <a href="#top" className="text-3xl font-bold tracking-tight sm:text-4xl">
              {profile.name.split(' ')[0]}{' '}
              <span className="text-gradient">{profile.name.split(' ')[1]}</span>
            </a>
            <p className="mt-3 max-w-xs text-sm text-slate-500">
              Full-Stack (MERN) Developer crafting fast, scalable web experiences.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-10 gap-y-4">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="group inline-flex items-center gap-1 text-sm text-slate-300 transition-colors hover:text-accent"
              >
                {s.label}
                <FiArrowUpRight className="text-slate-500 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-6">
          <LikeButton />
          <div className="flex flex-col items-center justify-between gap-4 text-xs text-slate-500 sm:flex-row w-full">
            <p>
              © {new Date().getFullYear()} {profile.name}. Designed &amp; built with React,
              Tailwind &amp; Framer Motion.
            </p>
            <a href="#top" className="inline-flex items-center gap-1.5 transition-colors hover:text-accent">
              Back to top <FiArrowUp />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
