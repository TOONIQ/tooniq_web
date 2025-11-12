'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface GlowingTextProps {
  children: ReactNode
  className?: string
  delay?: number
}

export default function GlowingText({ children, className = '', delay = 0 }: GlowingTextProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8 }}
    >
      {/* Glow effect layers */}
      <div className="absolute inset-0 animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-r from-anime-purple via-anime-blue to-anime-cyan blur-3xl opacity-30" />
      </div>

      {/* Text with gradient and animation */}
      <motion.div
        className="relative"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          backgroundSize: '200% 200%',
        }}
      >
        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-white via-anime-purple to-anime-cyan bg-clip-text text-transparent">
          {children}
        </h1>
      </motion.div>

      {/* Particle effects */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -100],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}