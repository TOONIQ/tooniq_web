/**
 * ヘッダーコンポーネント - TOONIQウェブサイト
 *
 * ナビゲーション、テーマ切り替え、モバイルメニューを含む
 * クライアントサイドの状態管理が必要なため、Reactコンポーネントとして実装
 */

import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeProvider';

/**
 * ナビゲーションアイテムの型定義
 */
interface NavItem {
  href?: string;
  label: string;
  isDropdown?: boolean;
  items?: { href: string; label: string }[];
  external?: boolean;
}

/**
 * ナビゲーションアイテムのリスト
 * サービスページは複数のサブページを持つため、ドロップダウンメニューとして実装
 */
const NAV_ITEMS: NavItem[] = [
  { href: '/', label: 'ホーム' },
  { href: '/about', label: '会社概要' },
  {
    label: 'サービス',
    isDropdown: true,
    items: [
      { href: '/services#animatime', label: 'AnimaTime' },
      { href: '/services#consulting', label: '技術コンサルタント' },
      { href: '/services#chatbot', label: 'ChatBot作成' },
      { href: '/services#minutes', label: '議事録ツール' },
      { href: '/services#custom', label: 'カスタム開発' },
      { href: '/services#website', label: 'Webサイト制作' },
    ]
  },
  { href: '/works', label: '実績' },
  { href: 'https://tooniq.co.jp/recruit', label: '採用情報', external: true },
  { href: '/contact', label: 'お問い合わせ' },
];

export default function Header() {
  // ============================================
  // 状態管理
  // ============================================
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  // ============================================
  // エフェクト: 初回マウント検出
  // ============================================
  useEffect(() => {
    setMounted(true);
  }, []);

  // ============================================
  // エフェクト: スクロール位置の監視
  // ============================================
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ============================================
  // メニュークローズハンドラー
  // ============================================
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-effect shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* ============================================
              ロゴ
              ============================================ */}
          <a href="/" className="flex items-center space-x-2 group">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-2xl sm:text-3xl font-bold gradient-text">
                TOONIQ
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-anime-purple/20 to-anime-cyan/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          </a>

          {/* ============================================
              デスクトップナビゲーション
              ============================================ */}
          <div className="hidden lg:flex items-center space-x-8">
            {NAV_ITEMS.map((item, index) => (
              item.isDropdown ? (
                <div key={index} className="relative">
                  <button
                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                    onMouseEnter={() => setIsServicesOpen(true)}
                    className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-anime-purple dark:hover:text-anime-cyan transition-colors duration-200"
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isServicesOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isServicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-56 rounded-xl glass-effect shadow-xl overflow-hidden"
                        onMouseLeave={() => setIsServicesOpen(false)}
                      >
                        {item.items?.map((subItem, subIndex) => (
                          <a
                            key={subIndex}
                            href={subItem.href}
                            className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-anime-purple/10 dark:hover:bg-anime-cyan/10 transition-colors duration-200"
                          >
                            {subItem.label}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <a
                  key={index}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  className="text-gray-700 dark:text-gray-300 hover:text-anime-purple dark:hover:text-anime-cyan transition-colors duration-200"
                >
                  {item.label}
                </a>
              )
            ))}

            {/* テーマ切り替えボタン */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg glass-effect hover:bg-anime-purple/10 dark:hover:bg-anime-cyan/10 transition-colors duration-200"
                aria-label="テーマを切り替え"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-purple-600" />
                )}
              </button>
            )}
          </div>

          {/* ============================================
              モバイルメニューボタン
              ============================================ */}
          <div className="lg:hidden flex items-center space-x-2">
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg glass-effect"
                aria-label="テーマを切り替え"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-purple-600" />
                )}
              </button>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg glass-effect"
              aria-label="メニューを開閉"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* ============================================
            モバイルナビゲーション
            ============================================ */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {NAV_ITEMS.map((item, index) => (
                  item.isDropdown ? (
                    <div key={index} className="space-y-2">
                      <button
                        onClick={() => setIsServicesOpen(!isServicesOpen)}
                        className="w-full text-left px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-anime-purple/10 dark:hover:bg-anime-cyan/10 transition-colors duration-200 flex items-center justify-between"
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isServicesOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {isServicesOpen && (
                        <div className="pl-8 space-y-1">
                          {item.items?.map((subItem, subIndex) => (
                            <a
                              key={subIndex}
                              href={subItem.href}
                              className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-anime-purple dark:hover:text-anime-cyan transition-colors duration-200"
                              onClick={closeMenu}
                            >
                              {subItem.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <a
                      key={index}
                      href={item.href}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                      className="block px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-anime-purple/10 dark:hover:bg-anime-cyan/10 transition-colors duration-200"
                      onClick={closeMenu}
                    >
                      {item.label}
                    </a>
                  )
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
