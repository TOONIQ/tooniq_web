/**
 * 3Dカードコンポーネント - TOONIQウェブサイト
 *
 * マウスの動きに追従する3D傾斜エフェクト付きカード
 * ホログラフィックエフェクトとグローエフェクトを含む
 */

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

// ============================================
// 型定義
// ============================================

interface Card3DProps {
  /** カードの内容 */
  children: React.ReactNode;
  /** 追加のCSSクラス */
  className?: string;
}

// ============================================
// コンポーネント
// ============================================

/**
 * 3Dエフェクト付きカードコンポーネント
 *
 * 機能:
 * - マウスの位置に応じてカードが傾く
 * - ホバー時にスケールアップ
 * - ホログラフィックオーバーレイ
 * - グローエフェクト
 */
export default function Card3D({ children, className = '' }: Card3DProps) {
  // ============================================
  // 状態とRef
  // ============================================

  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // ============================================
  // イベントハンドラー
  // ============================================

  /**
   * マウス移動時の3D回転計算
   */
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    // カードの中心点を計算
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // マウス位置からの相対距離を計算
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // 回転角度を計算（最大±10度）
    const rotateXValue = (mouseY / (rect.height / 2)) * -10;
    const rotateYValue = (mouseX / (rect.width / 2)) * 10;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  /**
   * マウスが離れた時の処理
   */
  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  /**
   * マウスが乗った時の処理
   */
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // ============================================
  // レンダリング
  // ============================================

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
      animate={{
        scale: isHovered ? 1.05 : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 30,
      }}
      className={`relative transition-transform duration-200 ease-out ${className}`}
    >
      {/* ============================================
          ホログラフィックエフェクトオーバーレイ
          ============================================ */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `linear-gradient(105deg,
            transparent 40%,
            rgba(139, 92, 246, 0.4) 45%,
            rgba(59, 130, 246, 0.3) 50%,
            rgba(236, 72, 153, 0.4) 55%,
            transparent 60%)`,
          transform: 'translateZ(2px)',
        }}
        aria-hidden="true"
      />

      {/* ============================================
          グローエフェクト
          ============================================ */}
      <div
        className="absolute -inset-1 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 blur-xl"
        style={{
          background: 'linear-gradient(to right, #8B5CF6, #3B82F6, #EC4899)',
          transform: 'translateZ(-1px)',
        }}
        aria-hidden="true"
      />

      {/* ============================================
          カードコンテンツ
          ============================================ */}
      <div
        className="relative bg-white dark:bg-dark-card rounded-2xl border border-gray-200 dark:border-dark-border overflow-hidden"
        style={{
          transform: 'translateZ(0)',
          boxShadow: isHovered
            ? '0 20px 40px rgba(139, 92, 246, 0.3), 0 15px 12px rgba(139, 92, 246, 0.1)'
            : '0 10px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}
