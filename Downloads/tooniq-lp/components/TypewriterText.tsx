'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface TypewriterTextProps {
  texts: string[]
  className?: string
  speed?: number
  delay?: number
}

export default function TypewriterText({
  texts,
  className = '',
  speed = 100,
  delay = 2000
}: TypewriterTextProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const fullText = texts[currentTextIndex]

    const handleTyping = () => {
      if (!isDeleting) {
        if (currentText.length < fullText.length) {
          setCurrentText(fullText.slice(0, currentText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), delay)
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1))
        } else {
          setIsDeleting(false)
          setCurrentTextIndex((prev) => (prev + 1) % texts.length)
        }
      }
    }

    const timeout = setTimeout(handleTyping, isDeleting ? speed / 2 : speed)
    return () => clearTimeout(timeout)
  }, [currentText, currentTextIndex, isDeleting, texts, speed, delay])

  return (
    <div className={`relative inline-block ${className}`}>
      <span className="text-4xl sm:text-5xl lg:text-6xl font-bold">
        {currentText}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-1 h-12 sm:h-14 lg:h-16 ml-1 bg-gradient-to-b from-anime-purple to-anime-cyan"
        />
      </span>
    </div>
  )
}