/**
 * グローイングテキストコンポーネント - TOONIQウェブサイト
 *
 * 発光エフェクトとパーティクルアニメーションを含む大見出し
 * ヒーローセクションなどで使用
 */

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

// ============================================
// 型定義
// ============================================

interface GlowingTextProps {
  /** 表示するテキスト */
  children: ReactNode;
  /** 追加のCSSクラス */
  className?: string;
  /** アニメーション開始までの遅延時間（秒） */
  delay?: number;
}

// ============================================
// コンポーネント
// ============================================

/**
 * グロー効果付きアニメーションテキスト
 *
 * 以下の効果を含む:
 * - グラデーションテキスト
 * - パルスグローエフェクト
 * - パーティクルアニメーション
 * - フェードインアニメーション
 */
export default function GlowingText({
  children,
  className = '',
  delay = 0
}: GlowingTextProps) {
  // パーティクルの数
  const PARTICLE_COUNT = 5;

  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8 }}
      style={{ zIndex: 1 }}
    >
      {/* ============================================
          テキスト表示（シンプル）
          ============================================ */}
      <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white">
        {children}
      </h1>

      {/* ============================================
          パーティクルエフェクト
          ============================================ */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
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
  );
}
