'use client'

import { useEffect } from 'react'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Skip on mobile devices
    if (window.innerWidth < 768 || 'ontouchstart' in window) return

    // Enhanced smooth scrolling with easing
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      const scrollAmount = e.deltaY
      const duration = 800
      const start = window.pageYOffset
      const startTime = performance.now()

      const easeInOutQuad = (t: number): number => {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
      }

      const scroll = (currentTime: number) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        const easeProgress = easeInOutQuad(progress)

        window.scrollTo(0, start + scrollAmount * easeProgress)

        if (progress < 1) {
          requestAnimationFrame(scroll)
        }
      }

      requestAnimationFrame(scroll)
    }

    // Add passive: false to allow preventDefault
    window.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      window.removeEventListener('wheel', handleWheel)
    }
  }, [])

  return <>{children}</>
}