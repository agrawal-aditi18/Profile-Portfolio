import Reveal from './Reveal'

// Consistent section header: a mono kicker + a large title.
// Pass plain text plus an optional <span className="text-gradient"> via children.
export default function SectionHeading({ kicker, children, align = 'left', className = '' }) {
  return (
    <Reveal className={`${align === 'center' ? 'text-center' : ''} ${className}`}>
      {kicker && (
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.35em] text-accent">
          {kicker}
        </p>
      )}
      <h2 className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
        {children}
      </h2>
    </Reveal>
  )
}
