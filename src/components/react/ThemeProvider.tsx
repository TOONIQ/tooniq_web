/**
 * テーマプロバイダー - TOONIQウェブサイト
 *
 * ライト/ダークモードの自動切り替えを管理
 * ブラウザ/システムの設定（prefers-color-scheme）に従って自動的にテーマを適用
 */

import { useEffect } from 'react';
import type { ReactNode } from 'react';

// ============================================
// テーマプロバイダーコンポーネント
// ============================================

interface ThemeProviderProps {
  /** 子要素 */
  children: ReactNode;
}

/**
 * テーマプロバイダーコンポーネント
 *
 * システムの設定（prefers-color-scheme）を監視し、
 * 自動的にダーク/ライトモードを切り替える
 */
export default function ThemeProvider({ children }: ThemeProviderProps) {
  // ============================================
  // エフェクト: システムのテーマ設定を監視
  // ============================================

  useEffect(() => {
    // システムのダークモード設定をチェックする関数
    const checkSystemTheme = () => {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    // 初回チェック
    checkSystemTheme();

    // システムのテーマ設定が変更された時のリスナー
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    // リスナーを登録
    mediaQuery.addEventListener('change', handleChange);

    // クリーンアップ
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  // ============================================
  // 子要素をレンダリング
  // ============================================

  return <>{children}</>;
}

// ============================================
// 互換性のためのダミーフック
// ============================================

/**
 * 互換性のためのダミーフック
 * 既存のコードでuseThemeが使われている場合のエラーを防ぐ
 */
export function useTheme() {
  return {
    theme: 'light' as 'light' | 'dark',
    toggleTheme: () => {},
  };
}
