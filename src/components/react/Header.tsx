/**
 * ヘッダーコンポーネント - TOONIQウェブサイト
 *
 * ナビゲーション、モバイルメニューを含む
 * クライアントサイドの状態管理が必要なため、Reactコンポーネントとして実装
 */

import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
];

export default function Header() {
  // ============================================
  // 状態管理
  // ============================================
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

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
        isScrolled ? 'bg-white/95 dark:bg-dark-bg/95 backdrop-blur-lg shadow-lg' : 'bg-slate-900/60 backdrop-blur-md'
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
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-blue-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          </a>

          {/* ============================================
              デスクトップナビゲーション
              ============================================ */}
          <div className="hidden lg:flex items-center space-x-6">
            {NAV_ITEMS.map((item, index) => (
              item.isDropdown ? (
                <div key={index} className="relative">
                  <button
                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                    onMouseEnter={() => setIsServicesOpen(true)}
                    className={`flex items-center space-x-1 font-medium transition-colors duration-200 ${
                      isScrolled
                        ? 'text-neutral-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400'
                        : 'text-white hover:text-blue-300'
                    }`}
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
                        className="absolute top-full left-0 mt-2 w-56 rounded-xl shadow-xl overflow-hidden bg-white dark:bg-dark-card border border-neutral-200 dark:border-gray-700"
                        onMouseLeave={() => setIsServicesOpen(false)}
                      >
                        {item.items?.map((subItem, subIndex) => (
                          <a
                            key={subIndex}
                            href={subItem.href}
                            className="block px-4 py-3 text-sm text-neutral-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200"
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
                  className={`font-medium transition-colors duration-200 ${
                    isScrolled
                      ? 'text-neutral-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400'
                      : 'text-white hover:text-blue-300'
                  }`}
                >
                  {item.label}
                </a>
              )
            ))}

            {/* お問い合わせボタン（CTA） */}
            <a
              href="/contact"
              className={`px-6 py-2.5 font-semibold rounded-full transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 ${
                isScrolled
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-white text-blue-600 hover:bg-blue-50'
              }`}
            >
              お問い合わせ
            </a>
          </div>

          {/* ============================================
              モバイルメニューボタン
              ============================================ */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                isScrolled
                  ? 'bg-neutral-100 dark:bg-gray-800 hover:bg-neutral-200 dark:hover:bg-gray-700 text-neutral-700 dark:text-gray-200'
                  : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-md'
              }`}
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
              className="lg:hidden overflow-hidden bg-white/95 dark:bg-dark-card/95 backdrop-blur-lg"
            >
              <div className="py-4 space-y-2">
                {NAV_ITEMS.map((item, index) => (
                  item.isDropdown ? (
                    <div key={index} className="space-y-2">
                      <button
                        onClick={() => setIsServicesOpen(!isServicesOpen)}
                        className="w-full text-left px-4 py-2 rounded-lg text-neutral-800 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200 flex items-center justify-between font-medium"
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
                              className="block px-4 py-2 text-sm text-neutral-700 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
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
                      className="block px-4 py-2 rounded-lg text-neutral-800 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200 font-medium"
                      onClick={closeMenu}
                    >
                      {item.label}
                    </a>
                  )
                ))}

                {/* お問い合わせボタン（モバイル用） */}
                <a
                  href="/contact"
                  className="block mx-4 mt-4 px-6 py-3 bg-blue-600 text-white text-center font-semibold rounded-full hover:bg-blue-700 transition-all duration-200 shadow-md"
                  onClick={closeMenu}
                >
                  お問い合わせ
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
