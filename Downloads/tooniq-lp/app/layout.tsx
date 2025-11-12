import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ParticleBackground from '@/components/ParticleBackground'
import CustomCursor from '@/components/CustomCursor'
import SmoothScroll from '@/components/SmoothScroll'
import LoadingScreen from '@/components/LoadingScreen'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '合同会社TOONIQ - The future of Anime, today.',
  description: 'AIで「作業」から「人」を解放し、人間にしかできない「感動」を生み出すために、アニメ制作の構造を根本から変える',
  keywords: 'TOONIQ, アニメ制作, AI, AnimaTime, 制作進行, クラウド, 技術コンサルタント',
  openGraph: {
    title: '合同会社TOONIQ',
    description: 'The future of Anime, today.',
    url: 'https://tooniq.co.jp',
    siteName: 'TOONIQ',
    locale: 'ja_JP',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <LoadingScreen />
          <SmoothScroll>
            <ParticleBackground />
            <CustomCursor />
            <div className="min-h-screen flex flex-col relative">
              <Header />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  )
}