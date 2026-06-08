import { useState, useEffect } from 'react'
import { FiHeart } from 'react-icons/fi'
import { motion } from 'framer-motion'

export default function LikeButton() {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [showMessage, setShowMessage] = useState(true)

  // Initialize like state from localStorage on mount
  useEffect(() => {
    const hasLiked = localStorage.getItem('portfolio_liked') === 'true'
    const count = parseInt(localStorage.getItem('portfolio_likes') || '0', 10)
    setLiked(hasLiked)
    setLikeCount(count)
  }, [])

  const handleLike = () => {
    if (!liked) {
      const newCount = likeCount + 1
      setLiked(true)
      setLikeCount(newCount)
      localStorage.setItem('portfolio_liked', 'true')
      localStorage.setItem('portfolio_likes', String(newCount))
      setShowMessage(false)
    }
  }

  return (
    <div className="flex flex-col items-center gap-3">
      {!liked && showMessage && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-slate-400 text-center"
        >
          Did you like my work? Give it a 💖
        </motion.p>
      )}
      <motion.button
        onClick={handleLike}
        disabled={liked}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className={`group flex items-center gap-2 rounded-full px-4 py-2 transition-all duration-300 ${
          liked
            ? 'bg-rose-500/20 border border-rose-500/40 cursor-default'
            : 'border border-white/15 hover:border-rose-500/60 hover:bg-rose-500/10 cursor-pointer'
        }`}
        title={liked ? 'You already liked this portfolio!' : 'Like this portfolio'}
      >
        <motion.div
          animate={liked ? { scale: [1, 1.3, 1] } : {}}
          transition={{ duration: 0.4 }}
        >
          <FiHeart
            className={`text-lg transition-colors ${
              liked ? 'fill-rose-500 text-rose-500' : 'text-slate-400 group-hover:text-rose-500'
            }`}
          />
        </motion.div>
        <span className={`font-mono text-sm font-semibold ${liked ? 'text-rose-400' : 'text-slate-400'}`}>
          {likeCount}
        </span>
      </motion.button>
      {liked && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-rose-400 text-center"
        >
          Thank you for the love! ✨
        </motion.p>
      )}
    </div>
  )
}
