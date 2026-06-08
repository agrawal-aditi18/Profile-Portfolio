import { useState, useEffect } from 'react'
import { FiHeart } from 'react-icons/fi'
import { motion } from 'framer-motion'

// Load from environment variables (Vite prefixes with VITE_)
const JSONBIN_ID = import.meta.env.VITE_JSONBIN_ID
const JSONBIN_API_KEY = import.meta.env.VITE_JSONBIN_API_KEY

export default function LikeButton() {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [showMessage, setShowMessage] = useState(true)
  const [loading, setLoading] = useState(true)
  const [lastFetchedCount, setLastFetchedCount] = useState(0)

  // Get unique user ID
  const getUserId = () => {
    let userId = localStorage.getItem('portfolio_user_id')
    if (!userId) {
      userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      localStorage.setItem('portfolio_user_id', userId)
    }
    return userId
  }

  const getLikersFromBin = async () => {
    try {
      if (!JSONBIN_ID) return []
      const response = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_ID}/latest`, {
        headers: {
          'X-Master-Key': JSONBIN_API_KEY || '',
        },
      })
      const data = await response.json()
      return data.record?.users || []
    } catch {
      return []
    }
  }

  // Fetch like count from JSONBin
  useEffect(() => {
    if (!JSONBIN_ID) {
      console.warn('⚠️ JSONBin ID not configured. Like counter may not work.')
      setLoading(false)
      return
    }

    const fetchLikes = async () => {
      try {
        const response = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_ID}/latest`, {
          headers: {
            'X-Master-Key': JSONBIN_API_KEY || '',
          },
        })
        if (!response.ok) throw new Error('Failed to fetch likes')
        
        const data = await response.json()
        const record = data.record || { likes: 0, users: [] }

        const userId = getUserId()
        const hasUserLiked = record.users?.includes(userId)
        const fetchedCount = record.likes || 0

        setLiked(hasUserLiked)
        setLikeCount(fetchedCount)
        setLastFetchedCount(fetchedCount)
        setLoading(false)
      } catch (error) {
        console.log('Could not fetch likes from JSONBin:', error)
        // Fallback to localStorage
        const localCount = parseInt(localStorage.getItem('portfolio_likes_global') || '0', 10)
        setLikeCount(localCount)
        setLastFetchedCount(localCount)
        setLoading(false)
      }
    }

    fetchLikes()

    // Poll for updates every 5 seconds - only update if count changed
    const interval = setInterval(() => {
      fetchLikes()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleLike = async () => {
    if (!liked && !loading && JSONBIN_ID) {
      const userId = getUserId()
      
      try {
        // First, fetch the latest count to avoid race conditions
        const response = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_ID}/latest`, {
          headers: {
            'X-Master-Key': JSONBIN_API_KEY || '',
          },
        })
        const data = await response.json()
        const latestRecord = data.record || { likes: 0, users: [] }
        const latestUsers = latestRecord.users || []
        
        // Increment based on latest count
        const newCount = (latestRecord.likes || 0) + 1

        // Update JSONBin with new like count
        await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_ID}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': JSONBIN_API_KEY || '',
          },
          body: JSON.stringify({
            likes: newCount,
            users: [...new Set([...latestUsers, userId])],
          }),
        })

        setLiked(true)
        setLikeCount(newCount)
        setLastFetchedCount(newCount)
        setShowMessage(false)

        // Fallback to localStorage
        localStorage.setItem(`portfolio_liked_${userId}`, 'true')
        localStorage.setItem('portfolio_likes_global', String(newCount))
      } catch (error) {
        console.log('Could not update likes:', error)
        // On error, at least update local state
        const newCount = likeCount + 1
        setLiked(true)
        setLikeCount(newCount)
        setShowMessage(false)
        localStorage.setItem(`portfolio_liked_${userId}`, 'true')
        localStorage.setItem('portfolio_likes_global', String(newCount))
      }
    }
  }

  const getLikersFromBin = async () => {
    try {
      if (!JSONBIN_ID) return []
      const response = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_ID}/latest`, {
        headers: {
          'X-Master-Key': JSONBIN_API_KEY || '',
        },
      })
      const data = await response.json()
      return data.record?.users || []
    } catch {
      return []
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
        disabled={liked || loading}
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
          {loading ? '...' : likeCount}
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
