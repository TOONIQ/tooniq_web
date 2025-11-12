import Link from 'next/link'
import { Mail, MapPin, Calendar } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    サービス: [
      { href: '/services#animatime', label: 'AnimaTime' },
      { href: '/services#consulting', label: '技術コンサルタント' },
      { href: '/services#chatbot', label: 'ChatBot作成' },
      { href: '/services#minutes', label: '議事録ツール' },
      { href: '/services#custom', label: 'カスタム開発' },
      { href: '/services#website', label: 'Webサイト制作' },
    ],
    企業情報: [
      { href: '/about', label: '会社概要' },
      { href: '/works', label: '実績紹介' },
      { href: 'https://tooniq.co.jp/recruit', label: '採用情報', external: true },
      { href: '/contact', label: 'お問い合わせ' },
    ],
  }

  return (
    <footer className="bg-gray-50 dark:bg-dark-card border-t border-gray-200 dark:border-dark-border mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-2">
            <div className="mb-4">
              <h3 className="text-2xl font-bold gradient-text mb-2">
                合同会社TOONIQ
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                "The future of Anime, today."
              </p>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md">
              AIで「作業」から「人」を解放し、人間にしかできない「感動」を生み出すために、
              アニメ制作の構造を根本から変える
            </p>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-anime-purple" />
                <span>設立: 2025年</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-anime-purple" />
                <span>東京都</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-anime-purple" />
                <a
                  href="mailto:contact@tooniq.co.jp"
                  className="hover:text-anime-purple dark:hover:text-anime-cyan transition-colors"
                >
                  contact@tooniq.co.jp
                </a>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                {category}
              </h4>
              <ul className="space-y-2">
                {links.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-anime-purple dark:hover:text-anime-cyan transition-colors duration-200"
                    >
                      {link.label}
                      {link.external && ' ↗'}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-dark-border">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {currentYear} 合同会社TOONIQ. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-anime-purple dark:hover:text-anime-cyan transition-colors"
              >
                プライバシーポリシー
              </Link>
              <Link
                href="/terms"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-anime-purple dark:hover:text-anime-cyan transition-colors"
              >
                利用規約
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Element */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-anime-purple to-transparent opacity-50" />
      </div>
    </footer>
  )
}