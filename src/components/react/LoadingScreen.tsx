/**
 * スプラッシュスクリーンコンポーネント - TOONIQウェブサイト
 *
 * 初回訪問時に2秒間表示されるブランドスプラッシュスクリーン
 * - sessionStorageで初回訪問を判定
 * - 段階的なフェードインアニメーション
 * - スムーズなフェードアウト（700ms）
 * - ブランド名とタグライン表示
 */

'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen() {
  // 初期状態を賢く設定：既に訪問済みの場合は最初からfalse
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window === 'undefined') return false
    // sessionStorageを同期的にチェック
    return !sessionStorage.getItem('tooniq-has-visited')
  })

  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // SSRチェック
    if (typeof window === 'undefined') return

    // 既に訪問済みの場合は何もしない
    if (sessionStorage.getItem('tooniq-has-visited')) {
      return
    }

    // 初回訪問 - スプラッシュスクリーンを表示
    sessionStorage.setItem('tooniq-has-visited', 'true')

    // オーバーフローを無効化
    document.documentElement.style.overflow = 'hidden'

    // プログレスバーのアニメーション
    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += Math.random() * 15 + 10

      if (currentProgress >= 100) {
        currentProgress = 100
        setProgress(100)
        clearInterval(interval)

        // ローディング完了後にフェードアウト（2秒表示 + 0.5秒バッファ）
        setTimeout(() => {
          setIsLoading(false)
          document.documentElement.style.overflow = ''
        }, 500)
      } else {
        setProgress(currentProgress)
      }
    }, 150) // 高速化（2秒で100%に到達）

    // クリーンアップ
    return () => {
      clearInterval(interval)
      document.documentElement.style.overflow = ''
    }
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="fixed inset-0 z-[10000] bg-gradient-to-br from-slate-900 via-blue-900 to-slate-950 flex items-center justify-center overflow-hidden"
        >
          <div className="relative flex flex-col items-center justify-center gap-4 text-center px-4">
            {/* サブタイトル: Crafting Anime Tech */}
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-xs sm:text-sm uppercase tracking-[0.4em] text-blue-300 font-medium"
            >
              Crafting Anime Tech
            </motion.span>

            {/* メインブランド名: 合同会社TOONIQ */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white"
            >
              合同会社TOONIQ
            </motion.h1>

            {/* タグライン */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-sm sm:text-base text-slate-200/80 max-w-md"
            >
              The future of Anime, today.
            </motion.p>

            {/* プログレスバー */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-6 w-32 h-1 bg-white/20 rounded-full overflow-hidden"
            >
              <motion.div
                className="h-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-full"
                style={{ width: `${Math.min(progress, 100)}%` }}
                initial={{ width: '0%' }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </motion.div>

            {/* 装飾的なパーティクル */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-blue-400/60 rounded-full"
                  style={{
                    left: `${20 + i * 10}%`,
                    top: `${30 + (i % 3) * 20}%`,
                  }}
                  animate={{
                    y: [-20, -60, -20],
                    opacity: [0, 0.8, 0],
                    scale: [0.5, 1.5, 0.5],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
