/**
 * テーマプロバイダー - TOONIQウェブサイト
 *
 * ライト/ダークモードの切り替えを管理
 * ローカルストレージに設定を保存し、ページをリロードしても設定を保持
 */

import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

// ============================================
// 型定義
// ============================================

/** テーマの種類 */
type Theme = 'light' | 'dark';

/** テーマコンテキストの型 */
interface ThemeContextType {
  /** 現在のテーマ */
  theme: Theme;
  /** テーマを切り替える関数 */
  toggleTheme: () => void;
}

// ============================================
// コンテキストの作成
// ============================================

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// ============================================
// カスタムフック: useTheme
// ============================================

/**
 * テーマコンテキストを使用するためのカスタムフック
 *
 * @returns テーマとテーマ切り替え関数
 * @throws コンテキストプロバイダー外で使用された場合
 */
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);

  if (!context) {
    // SSR時またはプロバイダーがマウントされる前のデフォルト値を返す
    return {
      theme: 'dark' as Theme,
      toggleTheme: () => {},
    };
  }

  return context;
}

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
 * アプリケーション全体のテーマ状態を管理
 * ローカルストレージからテーマを読み込み、変更時に保存
 */
export default function ThemeProvider({ children }: ThemeProviderProps) {
  // ============================================
  // 状態管理
  // ============================================

  const [theme, setTheme] = useState<Theme>('dark'); // デフォルトはダークテーマ
  const [mounted, setMounted] = useState(false);

  // ============================================
  // エフェクト: 初回マウント時にローカルストレージからテーマを読み込み
  // ============================================

  useEffect(() => {
    setMounted(true);

    // ローカルストレージからテーマを取得
    const storedTheme = localStorage.getItem('theme') as Theme | null;

    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      // アニメ/テック系のサイトに合わせてダークテーマをデフォルトに
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
    }
  }, []);

  // ============================================
  // エフェクト: テーマ変更時にHTMLクラスを更新
  // ============================================

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme, mounted]);

  // ============================================
  // テーマ切り替え関数
  // ============================================

  /**
   * テーマを切り替えてローカルストレージに保存
   */
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // ============================================
  // マウント前は子要素のみをレンダリング（ハイドレーションミス回避）
  // ============================================

  if (!mounted) {
    return <>{children}</>;
  }

  // ============================================
  // コンテキストプロバイダーをレンダリング
  // ============================================

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
