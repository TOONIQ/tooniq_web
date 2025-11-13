'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // SSRチェック
    if (typeof window === 'undefined') return

    // 初回訪問チェック
    const hasVisited = sessionStorage.getItem('tooniq-has-visited')

    if (hasVisited) {
      // 2回目以降の訪問 - すぐに非表示
      setIsLoading(false)
      return
    }

    // 初回訪問 - ローディング画面を表示
    sessionStorage.setItem('tooniq-has-visited', 'true')

    // オーバーフローを無効化
    document.documentElement.style.overflow = 'hidden'

    // フェイルセーフ: 最大3秒後に強制的に終了
    const failsafe = setTimeout(() => {
      setIsLoading(false)
      document.documentElement.style.overflow = ''
    }, 3000)

    // プログレスバーのアニメーション
    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += Math.random() * 15 + 10

      if (currentProgress >= 100) {
        currentProgress = 100
        setProgress(100)
        clearInterval(interval)
        clearTimeout(failsafe)

        // ローディング完了後にフェードアウト
        setTimeout(() => {
          setIsLoading(false)
          document.documentElement.style.overflow = ''
        }, 500)
      } else {
        setProgress(currentProgress)
      }
    }, 200)

    // クリーンアップ
    return () => {
      clearInterval(interval)
      clearTimeout(failsafe)
      document.documentElement.style.overflow = ''
    }
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[10000] bg-gradient-to-br from-slate-900 via-blue-800 to-slate-900 flex items-center justify-center"
        >
          <div className="relative">
            {/* Animated logo */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-blue-700 bg-clip-text text-transparent mb-8 text-center"
            >
              TOONIQ
            </motion.div>

            {/* Progress bar */}
            <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-600 to-blue-700"
                initial={{ width: "0%" }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Loading text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center mt-4 text-gray-400"
            >
              限界を超える準備中...
            </motion.p>

            {/* Floating particles */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-blue-500 rounded-full"
                initial={{
                  x: Math.random() * 200 - 100,
                  y: Math.random() * 200 - 100,
                  opacity: 0
                }}
                animate={{
                  x: Math.random() * 400 - 200,
                  y: Math.random() * 400 - 200,
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
