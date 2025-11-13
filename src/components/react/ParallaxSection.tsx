/**
 * パララックスセクションコンポーネント - TOONIQウェブサイト
 *
 * スクロール位置に応じてパララックス効果を適用
 * Y軸移動、透明度、スケールをスクロールに同期
 */

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// ============================================
// 型定義
// ============================================

interface ParallaxSectionProps {
  /** セクションの内容 */
  children: React.ReactNode;
  /** パララックスのオフセット量（ピクセル） */
  offset?: number;
  /** 追加のCSSクラス */
  className?: string;
}

// ============================================
// コンポーネント
// ============================================

/**
 * パララックスエフェクト付きセクション
 *
 * スクロールに応じて以下のエフェクトを適用:
 * - Y軸の移動（パララックス効果）
 * - 透明度の変化（フェードイン/アウト）
 * - スケールの変化（拡大/縮小）
 *
 * @param offset - パララックスの移動量（デフォルト: 50px）
 */
export default function ParallaxSection({
  children,
  offset = 50,
  className = ''
}: ParallaxSectionProps) {
  // ============================================
  // スクロール追跡の設定
  // ============================================

  const ref = useRef(null);

  // セクションのスクロール進行度を追跡
  // "start end": セクションの開始がビューポートの終端に達したとき
  // "end start": セクションの終端がビューポートの開始に達したとき
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // ============================================
  // スクロールベースのアニメーション値を計算
  // ============================================

  // Y軸の移動: -offset から +offset までスムーズに移動
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [-offset, offset]
  );

  // 透明度: セクションの中央で最も明るく、両端で暗くなる
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.4, 1, 1, 0.4]
  );

  // スケール: セクションの中央で等倍、両端で少し縮小
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.95, 1, 0.95]
  );

  // ============================================
  // レンダリング
  // ============================================

  return (
    <motion.div
      ref={ref}
      style={{
        y,
        opacity,
        scale,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
