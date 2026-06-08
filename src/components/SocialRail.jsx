import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { SiLeetcode } from 'react-icons/si'
import { socials, profile } from '../data/info'

const items = [
  { icon: FiGithub, href: socials.github, label: 'GitHub' },
  { icon: FiLinkedin, href: socials.linkedin, label: 'LinkedIn' },
  { icon: SiLeetcode, href: socials.leetcode, label: 'LeetCode' },
  { icon: FiMail, href: socials.email, label: 'Email' },
]

// Fixed vertical social rail (desktop) on the left, plus a vertical
// "RESUME" tab on the right   both hidden on small screens.
export default function SocialRail() {
  return (
    <>
      <div className="fixed bottom-0 left-5 z-40 hidden flex-col items-center gap-5 md:flex xl:left-8">
        {items.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel="noreferrer"
            aria-label={label}
            className="text-slate-400 transition-all hover:-translate-y-0.5 hover:text-accent"
          >
            <Icon className="text-xl" />
          </a>
        ))}
        <span className="h-24 w-px bg-gradient-to-b from-accent/60 to-transparent" />
      </div>

      <a
        href={profile.resume}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-0 right-6 z-40 hidden items-center gap-3 md:flex xl:right-9"
        style={{ writingMode: 'vertical-rl' }}
      >
        <span className="font-mono text-xs uppercase tracking-[0.35em] text-slate-400 transition-colors hover:text-accent">
          Résumé
        </span>
        <span className="h-24 w-px bg-gradient-to-b from-transparent to-accent/60" />
      </a>
    </>
  )
}
