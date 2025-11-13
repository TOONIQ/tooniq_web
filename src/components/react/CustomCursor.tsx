'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isMobile, setIsMobile] = useState(true)

  const springConfig = { damping: 25, stiffness: 400 }
  const cursorX = useSpring(0, springConfig)
  const cursorY = useSpring(0, springConfig)

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)

    if (isMobile) return

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.getAttribute('role') === 'button' ||
        target.onclick !== null ||
        target.closest('button') ||
        target.closest('a')
      ) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = () => {
      setIsHovering(false)
    }

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    // Hide default cursor
    document.body.style.cursor = 'none'

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      document.body.style.cursor = 'auto'
      window.removeEventListener('resize', checkMobile)
    }
  }, [cursorX, cursorY, isMobile])

  if (isMobile) return null

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        <motion.div
          animate={{
            scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
          }}
          transition={{ duration: 0.15 }}
          className="relative"
        >
          <div className="w-8 h-8 bg-white rounded-full opacity-90" />
        </motion.div>
      </motion.div>

      {/* Trailing effect */}
      <div
        className="fixed pointer-events-none z-[9998]"
        style={{
          left: mousePosition.x - 20,
          top: mousePosition.y - 20,
        }}
      >
        <motion.div
          animate={{
            scale: isClicking ? 1.5 : isHovering ? 2 : 1,
            opacity: isClicking ? 0.3 : isHovering ? 0.2 : 0.1,
          }}
          transition={{ duration: 0.3 }}
          className="w-10 h-10 border-2 border-anime-purple rounded-full"
        />
      </div>

      {/* Glow effect on click */}
      {isClicking && (
        <motion.div
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed pointer-events-none z-[9997]"
          style={{
            left: mousePosition.x - 30,
            top: mousePosition.y - 30,
          }}
        >
          <div className="w-15 h-15 bg-anime-purple rounded-full blur-xl" />
        </motion.div>
      )}
    </>
  )
}
