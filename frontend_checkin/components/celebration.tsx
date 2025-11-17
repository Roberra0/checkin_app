"use client"

import { useEffect, useState } from "react"

type Emoji = {
  id: number
  emoji: string
  left: number
  delay: number
  duration: number
  xOffset: number
  rotation: number
}

export function Celebration({ onComplete }: { onComplete?: () => void }) {
  const [emojis, setEmojis] = useState<Emoji[]>([])

  useEffect(() => {
    // Generate random emojis with varied properties for dynamic effect
    const celebrationEmojis = ["🎉", "✨", "🎊", "⭐", "🌟", "💫", "🎈", "🥳", "🎆", "✨"]
    const newEmojis: Emoji[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      emoji: celebrationEmojis[Math.floor(Math.random() * celebrationEmojis.length)],
      left: 20 + Math.random() * 60, // More centered distribution
      delay: Math.random() * 0.5,
      duration: 3.0 + Math.random() * 1.0, // Longer duration (3-4 seconds)
      xOffset: (Math.random() - 0.5) * 200, // Spread left/right
      rotation: Math.random() * 360,
    }))
    
    setEmojis(newEmojis)

    // Clean up after animation
    const timer = setTimeout(() => {
      setEmojis([])
      onComplete?.()
    }, 4500) // Longer cleanup time

    return () => clearTimeout(timer)
  }, [onComplete])

  if (emojis.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {emojis.map((emoji) => (
        <div
          key={emoji.id}
          className="absolute bottom-0 text-6xl md:text-7xl animate-float-up"
          style={{
            left: `${emoji.left}%`,
            animationDelay: `${emoji.delay}s`,
            animationDuration: `${emoji.duration}s`,
            '--float-x': `${emoji.xOffset}px`,
            '--rotation-start': `${emoji.rotation}deg`,
          } as React.CSSProperties & { '--float-x': string; '--rotation-start': string }}
        >
          {emoji.emoji}
        </div>
      ))}
    </div>
  )
}

