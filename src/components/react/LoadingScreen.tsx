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

  // コンポーネントマウント直後に状態を確認
  useEffect(() => {
    if (typeof window === 'undefined') return

    // スプラッシュが表示されない場合は即座にクラスを削除
    if (!isLoading) {
      document.body.classList.remove('splash-active')
    }
  }, [])

  useEffect(() => {
    // SSRチェック
    if (typeof window === 'undefined') return

    // 既に訪問済みの場合は何もしない
    if (sessionStorage.getItem('tooniq-has-visited')) {
      // 念のため、クラスを削除
      document.body.classList.remove('splash-active')
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
          // splash-activeクラスを削除してコンテンツを表示
          document.body.classList.remove('splash-active')
        }, 500)
      } else {
        setProgress(currentProgress)
      }
    }, 150) // 高速化（2秒で100%に到達）

    // クリーンアップ
    return () => {
      clearInterval(interval)
      document.documentElement.style.overflow = ''
      document.body.classList.remove('splash-active')
    }
  }, [])

  // 2回目以降の訪問時に即座にsplash-activeクラスを削除
  useEffect(() => {
    if (!isLoading) {
      document.body.classList.remove('splash-active')
    }
  }, [isLoading])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden"
          style={{
            background: 'radial-gradient(ellipse at center, #1e3a8a 0%, #0f172a 50%, #020617 100%)'
          }}
        >
          {/* 動的な背景グラデーション */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                'radial-gradient(ellipse at 20% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)',
                'radial-gradient(ellipse at 80% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)',
                'radial-gradient(ellipse at 20% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)',
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* グローイングオーブ（左上） */}
          <motion.div
            className="absolute w-96 h-96 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
            animate={{
              x: [-100, -50, -100],
              y: [-100, -50, -100],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* グローイングオーブ（右下） */}
          <motion.div
            className="absolute w-96 h-96 rounded-full right-0 bottom-0"
            style={{
              background: 'radial-gradient(circle, rgba(96, 165, 250, 0.25) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
            animate={{
              x: [100, 50, 100],
              y: [100, 50, 100],
              scale: [1, 1.3, 1],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
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

            {/* モダンなローディングスピナー（ロゴ統合版） */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-8 relative w-24 h-24"
            >
              {/* 外側の回転リング */}
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-blue-500/30 border-t-blue-500"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              />

              {/* 内側の回転リング（逆回転） */}
              <motion.div
                className="absolute inset-3 rounded-full border-4 border-blue-400/20 border-t-blue-400"
                animate={{ rotate: -360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />

              {/* 中心のロゴシンボル */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.9, 1, 0.9]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="w-12 h-12 flex items-center justify-center">
                  <img
                    src="/images/tooniq-logo-symbol.svg"
                    alt="TOONIQ"
                    className="w-10 h-10 object-contain"
                    style={{
                      filter: 'drop-shadow(0 0 10px rgba(45, 169, 216, 0.8))'
                    }}
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* プログレスバーとパーセンテージ */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="mt-6 w-64 space-y-2"
            >
              {/* パーセンテージ表示 */}
              <div className="flex justify-between items-center text-xs text-blue-300/80 font-medium">
                <span>Loading...</span>
                <span>{Math.min(Math.round(progress), 100)}%</span>
              </div>

              {/* プログレスバー */}
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-full shadow-lg shadow-blue-500/50"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                  initial={{ width: '0%' }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              </div>
            </motion.div>

            {/* 装飾的なパーティクル（改善版） */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: `${2 + (i % 3)}px`,
                    height: `${2 + (i % 3)}px`,
                    left: `${10 + i * 7}%`,
                    top: `${20 + (i % 4) * 15}%`,
                    background: `radial-gradient(circle, rgba(59, 130, 246, ${0.6 - i * 0.05}) 0%, transparent 70%)`,
                    boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)',
                  }}
                  animate={{
                    y: [-30, -80, -30],
                    x: [0, (i % 2 ? 20 : -20), 0],
                    opacity: [0, 1, 0],
                    scale: [0.5, 1.5, 0.5],
                  }}
                  transition={{
                    duration: 3 + (i % 3),
                    repeat: Infinity,
                    delay: i * 0.2,
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
