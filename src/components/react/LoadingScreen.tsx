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

            {/* 究極のエレガントスピナー - ホログラフィック量子リング */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-8 relative w-64 h-64"
            >
              {/* ホログラフィックグリッチ効果レイヤー */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  opacity: [0, 0.05, 0],
                  x: [0, 2, -2, 0],
                }}
                transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 3 }}
              >
                <div className="absolute inset-0 rounded-full border border-cyan-400/50 blur-sm" />
                <div className="absolute inset-0 rounded-full border border-pink-400/50 blur-sm translate-x-1" />
              </motion.div>

              {/* エネルギーパルス波（外側に拡散） */}
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={`pulse-${i}`}
                  className="absolute inset-0 rounded-full border-2"
                  style={{
                    borderColor: 'rgba(59, 130, 246, 0.3)',
                  }}
                  animate={{
                    scale: [1, 1.8],
                    opacity: [0.6, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 1,
                    ease: 'easeOut',
                  }}
                />
              ))}

              {/* 3D多層回転リング - 外層 */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  border: '2px solid transparent',
                  borderTopColor: 'rgba(96, 165, 250, 0.8)',
                  borderRightColor: 'rgba(59, 130, 246, 0.4)',
                  boxShadow: '0 0 30px rgba(59, 130, 246, 0.4), inset 0 0 20px rgba(59, 130, 246, 0.1)',
                  transform: 'rotateX(60deg)',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />

              {/* 3D多層回転リング - 中層（逆回転） */}
              <motion.div
                className="absolute inset-8 rounded-full"
                style={{
                  border: '2px solid transparent',
                  borderBottomColor: 'rgba(45, 169, 216, 0.9)',
                  borderLeftColor: 'rgba(96, 165, 250, 0.5)',
                  boxShadow: '0 0 25px rgba(45, 169, 216, 0.5), inset 0 0 15px rgba(45, 169, 216, 0.2)',
                  transform: 'rotateX(60deg)',
                }}
                animate={{ rotate: -360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              />

              {/* 光のトレイル - 軌道パス1 */}
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
              >
                <motion.div
                  className="absolute top-0 left-1/2 w-3 h-3 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(45, 169, 216, 1) 0%, rgba(59, 130, 246, 0.5) 50%, transparent 100%)',
                    boxShadow: '0 0 20px rgba(45, 169, 216, 1), 0 0 40px rgba(59, 130, 246, 0.6)',
                    filter: 'blur(1px)',
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.7, 1],
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </motion.div>

              {/* 光のトレイル - 軌道パス2（逆方向） */}
              <motion.div
                className="absolute inset-12"
                animate={{ rotate: -360 }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
              >
                <motion.div
                  className="absolute top-0 left-1/2 w-2 h-2 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(96, 165, 250, 1) 0%, rgba(147, 197, 253, 0.6) 50%, transparent 100%)',
                    boxShadow: '0 0 15px rgba(96, 165, 250, 1), 0 0 30px rgba(147, 197, 253, 0.5)',
                    filter: 'blur(0.5px)',
                  }}
                  animate={{
                    scale: [1, 1.3, 1],
                  }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                />
              </motion.div>

              {/* クリスタルプリズム効果 - 六角形リング */}
              {[0, 60, 120, 180, 240, 300].map((rotation, i) => (
                <motion.div
                  key={`crystal-${i}`}
                  className="absolute inset-16"
                  style={{ transform: `rotate(${rotation}deg)` }}
                  animate={{
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.15,
                  }}
                >
                  <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-8"
                    style={{
                      background: 'linear-gradient(180deg, rgba(147, 197, 253, 0.9) 0%, rgba(59, 130, 246, 0.3) 100%)',
                      boxShadow: '0 0 10px rgba(147, 197, 253, 0.8)',
                      filter: 'blur(0.5px)',
                    }}
                  />
                </motion.div>
              ))}

              {/* エネルギーコアリング */}
              <motion.div
                className="absolute inset-20 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(45, 169, 216, 0.15) 0%, rgba(59, 130, 246, 0.05) 50%, transparent 100%)',
                  border: '1px solid rgba(96, 165, 250, 0.3)',
                  boxShadow: '0 0 20px rgba(45, 169, 216, 0.3), inset 0 0 20px rgba(59, 130, 246, 0.2)',
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* レーダースキャンライン（改良版） */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                <div
                  className="absolute w-full h-1"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(45, 169, 216, 0) 20%, rgba(45, 169, 216, 0.9) 50%, rgba(59, 130, 246, 0.3) 70%, transparent 100%)',
                    boxShadow: '0 0 20px rgba(45, 169, 216, 0.8)',
                    filter: 'blur(1px)',
                  }}
                />
              </motion.div>

              {/* ホログラフィックコーナーブラケット（8方向） */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((rotation, i) => (
                <motion.div
                  key={`bracket-${i}`}
                  className="absolute inset-0"
                  style={{ transform: `rotate(${rotation}deg)` }}
                  animate={{
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.15,
                  }}
                >
                  <div
                    className="absolute top-0 left-1/2 -translate-x-1/2"
                    style={{
                      width: '3px',
                      height: '16px',
                      background: 'linear-gradient(180deg, rgba(45, 169, 216, 1) 0%, rgba(59, 130, 246, 0.4) 100%)',
                      boxShadow: '0 0 12px rgba(45, 169, 216, 1)',
                      borderRadius: '1px',
                    }}
                  />
                  <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 rotate-90"
                    style={{
                      width: '3px',
                      height: '16px',
                      background: 'linear-gradient(180deg, rgba(45, 169, 216, 1) 0%, rgba(59, 130, 246, 0.4) 100%)',
                      boxShadow: '0 0 12px rgba(45, 169, 216, 1)',
                      borderRadius: '1px',
                    }}
                  />
                </motion.div>
              ))}

              {/* 中心のロゴシンボル（改良版 - ホログラフィック効果） */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                  scale: [1, 1.08, 1],
                  opacity: [0.95, 1, 0.95],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <motion.div
                  className="w-24 h-24 flex items-center justify-center"
                  animate={{
                    rotateY: [0, 360],
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                >
                  <svg
                    width="80"
                    height="80"
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      filter: 'drop-shadow(0 0 20px rgba(45, 169, 216, 1)) drop-shadow(0 0 35px rgba(59, 130, 246, 0.8)) drop-shadow(0 0 50px rgba(96, 165, 250, 0.4))',
                    }}
                  >
                    <circle cx="32" cy="32" r="3" fill="#2DA9D8"/>
                    <line x1="32" y1="32" x2="20" y2="20" stroke="#2DA9D8" strokeWidth="2.5" strokeLinecap="round"/>
                    <circle cx="20" cy="20" r="3" fill="#2DA9D8"/>
                    <line x1="20" y1="20" x2="12" y2="16" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="12" cy="16" r="2.5" fill="#60A5FA"/>
                    <line x1="32" y1="32" x2="44" y2="20" stroke="#2DA9D8" strokeWidth="2.5" strokeLinecap="round"/>
                    <circle cx="44" cy="20" r="3" fill="#2DA9D8"/>
                    <line x1="44" y1="20" x2="52" y2="12" stroke="#2DA9D8" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="52" cy="12" r="2.5" fill="#2DA9D8"/>
                    <line x1="32" y1="32" x2="20" y2="44" stroke="#2DA9D8" strokeWidth="2.5" strokeLinecap="round"/>
                    <circle cx="20" cy="44" r="3" fill="#2DA9D8"/>
                    <line x1="20" y1="44" x2="16" y2="52" stroke="#2DA9D8" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="16" cy="52" r="2.5" fill="#2DA9D8"/>
                    <line x1="32" y1="32" x2="44" y2="44" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round"/>
                    <circle cx="44" cy="44" r="3" fill="#60A5FA"/>
                    <line x1="44" y1="44" x2="48" y2="52" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="48" cy="52" r="2.5" fill="#60A5FA"/>
                    <line x1="32" y1="32" x2="24" y2="32" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="24" cy="32" r="2.5" fill="#93C5FD"/>
                    <line x1="32" y1="32" x2="40" y2="32" stroke="#2DA9D8" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="40" cy="32" r="2.5" fill="#2DA9D8"/>
                    <line x1="32" y1="32" x2="32" y2="24" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="32" cy="24" r="2.5" fill="#60A5FA"/>
                  </svg>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* データストリームパーティクル（量子的な流れ） */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
              {/* 上昇する光のストリーム */}
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={`stream-${i}`}
                  className="absolute"
                  style={{
                    left: `${5 + i * 4.5}%`,
                    bottom: '-10%',
                  }}
                  animate={{
                    y: [0, -1200],
                    opacity: [0, 0.8, 1, 0.8, 0],
                  }}
                  transition={{
                    duration: 4 + (i % 4),
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: 'linear',
                  }}
                >
                  {/* データストリームライン */}
                  <div
                    style={{
                      width: '2px',
                      height: `${60 + (i % 3) * 20}px`,
                      background: `linear-gradient(180deg, transparent 0%, rgba(${i % 2 === 0 ? '45, 169, 216' : '96, 165, 250'}, 0.9) 50%, transparent 100%)`,
                      boxShadow: `0 0 8px rgba(${i % 2 === 0 ? '45, 169, 216' : '96, 165, 250'}, 0.8)`,
                      filter: 'blur(0.5px)',
                    }}
                  />
                </motion.div>
              ))}

              {/* 浮遊する量子パーティクル */}
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute rounded-full"
                  style={{
                    width: `${1 + (i % 4)}px`,
                    height: `${1 + (i % 4)}px`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    background: `radial-gradient(circle, rgba(${i % 3 === 0 ? '45, 169, 216' : i % 3 === 1 ? '96, 165, 250' : '147, 197, 253'}, ${0.9 - (i % 5) * 0.15}) 0%, transparent 70%)`,
                    boxShadow: `0 0 ${6 + (i % 3) * 4}px rgba(${i % 3 === 0 ? '45, 169, 216' : i % 3 === 1 ? '96, 165, 250' : '147, 197, 253'}, 0.7)`,
                  }}
                  animate={{
                    y: [0, -50 - (i % 4) * 20, 0],
                    x: [0, (i % 2 ? 30 : -30), 0],
                    opacity: [0.3, 1, 0.3],
                    scale: [0.8, 1.5, 0.8],
                  }}
                  transition={{
                    duration: 3 + (i % 5),
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: 'easeInOut',
                  }}
                />
              ))}

              {/* 螺旋状の光の軌跡 */}
              {[0, 1, 2].map((spiralIndex) => (
                <motion.div
                  key={`spiral-${spiralIndex}`}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 8 + spiralIndex * 2,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: spiralIndex * 0.5,
                  }}
                >
                  {[...Array(8)].map((_, dotIndex) => {
                    const angle = (dotIndex / 8) * Math.PI * 2
                    const radius = 100 + spiralIndex * 30
                    return (
                      <motion.div
                        key={`dot-${dotIndex}`}
                        className="absolute rounded-full"
                        style={{
                          width: '3px',
                          height: '3px',
                          left: `calc(50% + ${Math.cos(angle) * radius}px)`,
                          top: `calc(50% + ${Math.sin(angle) * radius}px)`,
                          background: 'radial-gradient(circle, rgba(147, 197, 253, 1) 0%, transparent 70%)',
                          boxShadow: '0 0 10px rgba(147, 197, 253, 1)',
                        }}
                        animate={{
                          opacity: [0.3, 1, 0.3],
                          scale: [0.8, 1.5, 0.8],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: dotIndex * 0.15,
                        }}
                      />
                    )
                  })}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
