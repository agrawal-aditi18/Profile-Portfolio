import { useEffect, useState } from 'react'

// Types and deletes through a list of words, looping forever.
export default function Typewriter({ words, className = '' }) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[index % words.length]
    let timeout

    if (!deleting && text === word) {
      timeout = setTimeout(() => setDeleting(true), 1500)
    } else if (deleting && text === '') {
      setDeleting(false)
      setIndex((i) => (i + 1) % words.length)
    } else {
      timeout = setTimeout(
        () => {
          setText((prev) =>
            deleting ? word.slice(0, prev.length - 1) : word.slice(0, prev.length + 1),
          )
        },
        deleting ? 45 : 95,
      )
    }

    return () => clearTimeout(timeout)
  }, [text, deleting, index, words])

  return (
    <span className={className}>
      {text}
      <span className="ml-0.5 inline-block w-[2px] animate-pulse bg-accent align-middle" style={{ height: '1em' }} />
    </span>
  )
}
