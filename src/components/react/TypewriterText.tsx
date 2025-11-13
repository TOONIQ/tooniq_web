/**
 * タイプライターテキストコンポーネント - TOONIQウェブサイト
 *
 * タイプライター風のテキストアニメーション
 * 複数のテキストを順番に表示し、自動的に削除・切り替え
 */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// ============================================
// 型定義
// ============================================

interface TypewriterTextProps {
  /** 表示するテキストの配列 */
  texts: string[];
  /** 追加のCSSクラス */
  className?: string;
  /** 1文字あたりのタイピング速度（ミリ秒） */
  speed?: number;
  /** テキスト表示完了後の待機時間（ミリ秒） */
  delay?: number;
}

// ============================================
// コンポーネント
// ============================================

/**
 * タイプライターエフェクト付きテキスト
 *
 * 動作:
 * 1. テキストを1文字ずつ表示
 * 2. 表示完了後、指定時間待機
 * 3. テキストを1文字ずつ削除
 * 4. 次のテキストに切り替えて繰り返し
 */
export default function TypewriterText({
  texts,
  className = '',
  speed = 100,
  delay = 2000
}: TypewriterTextProps) {
  // ============================================
  // 状態管理
  // ============================================

  /** 現在表示しているテキストのインデックス */
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  /** 現在表示されているテキスト */
  const [currentText, setCurrentText] = useState('');
  /** 削除モードかどうか */
  const [isDeleting, setIsDeleting] = useState(false);

  // ============================================
  // タイピングエフェクトのロジック
  // ============================================

  useEffect(() => {
    const fullText = texts[currentTextIndex];

    /**
     * タイピングまたは削除を処理
     */
    const handleTyping = () => {
      if (!isDeleting) {
        // タイピングモード: 文字を追加
        if (currentText.length < fullText.length) {
          setCurrentText(fullText.slice(0, currentText.length + 1));
        } else {
          // テキスト表示完了: 削除モードに切り替え
          setTimeout(() => setIsDeleting(true), delay);
        }
      } else {
        // 削除モード: 文字を削除
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          // 削除完了: 次のテキストに切り替え
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    };

    // タイピング速度に応じてタイムアウトを設定
    // 削除時は表示時の半分の速度
    const timeout = setTimeout(
      handleTyping,
      isDeleting ? speed / 2 : speed
    );

    return () => clearTimeout(timeout);
  }, [currentText, currentTextIndex, isDeleting, texts, speed, delay]);

  // ============================================
  // レンダリング
  // ============================================

  return (
    <div className={`relative inline-block ${className}`}>
      <span className="text-4xl sm:text-5xl lg:text-6xl font-bold">
        {currentText}
        {/* カーソルアニメーション */}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-1 h-12 sm:h-14 lg:h-16 ml-1 bg-gradient-to-b from-anime-purple to-anime-cyan"
          aria-hidden="true"
        />
      </span>
    </div>
  );
}
