'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import GlowingText from '@/components/GlowingText'
import Card3D from '@/components/Card3D'
import ParallaxSection from '@/components/ParallaxSection'
import TypewriterText from '@/components/TypewriterText'
import {
  ArrowRight,
  Sparkles,
  Cpu,
  Users,
  Rocket,
  Cloud,
  Bot,
  FileText,
  Code,
  Globe,
  Briefcase,
  Target,
  Lightbulb,
  CheckCircle
} from 'lucide-react'

export default function Home() {
  const services = [
    {
      icon: Cloud,
      title: 'AnimaTime',
      description: 'クラウド制作進行ソフト',
      detail: 'スケジュールの自動最適化と進捗管理を一元化',
      color: 'from-anime-purple to-anime-blue',
      href: '/services#animatime'
    },
    {
      icon: Briefcase,
      title: '技術コンサルタント',
      description: '最新技術の導入支援',
      detail: '適切なソフトウェアの選定から導入まで完全サポート',
      color: 'from-anime-blue to-anime-cyan',
      href: '/services#consulting'
    },
    {
      icon: Bot,
      title: 'ChatBot作成',
      description: '企業専用AIアシスタント',
      detail: 'NDAに配慮した安全な社内専用AI',
      color: 'from-anime-cyan to-anime-purple',
      href: '/services#chatbot'
    },
    {
      icon: FileText,
      title: '議事録ツール',
      description: '自動文字起こし＆要約',
      detail: 'アニメ業界特化の音声認識と要約機能',
      color: 'from-anime-purple to-anime-pink',
      href: '/services#minutes'
    },
    {
      icon: Code,
      title: 'カスタム開発',
      description: 'オーダーメイドシステム',
      detail: '既存システムと完璧に調和する新機能開発',
      color: 'from-anime-pink to-anime-blue',
      href: '/services#custom'
    },
    {
      icon: Globe,
      title: 'Webサイト制作',
      description: 'プロフェッショナルなWeb制作',
      detail: '企業サイトから作品特設ページまで対応',
      color: 'from-anime-blue to-anime-purple',
      href: '/services#website'
    }
  ]

  const problems = [
    {
      icon: Users,
      title: '人材不足',
      description: '慢性的な人手不足と後進育成の課題'
    },
    {
      icon: Target,
      title: '作品過多',
      description: '制作リソースの奪い合いによる品質低下'
    },
    {
      icon: Lightbulb,
      title: '技術の属人化',
      description: 'ノウハウの非共有と車輪の再発明'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image */}
        <div className="absolute inset-0 -z-20">
          <Image
            src="https://images.unsplash.com/photo-1635322966219-b75ed372eb01?q=80&w=2000"
            alt="Digital creative workspace"
            fill
            className="object-cover opacity-20 dark:opacity-10"
            priority
          />
        </div>

        {/* Animated Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-anime-purple/20 via-anime-blue/10 to-anime-cyan/20 animate-gradient" />
          <div className="absolute top-20 left-20 w-72 h-72 bg-anime-purple/30 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-anime-cyan/30 rounded-full blur-3xl animate-float animation-delay-2000" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-effect mb-6"
            >
              <Sparkles className="w-5 h-5 text-anime-purple" />
              <span className="text-sm font-medium">The future of Anime, today.</span>
            </motion.div>

            <GlowingText className="mb-6">
              合同会社TOONIQ
            </GlowingText>

            <div className="mb-12 max-w-3xl mx-auto">
              <TypewriterText
                texts={[
                  "AIで作業から人を解放",
                  "人間にしかできない感動を",
                  "アニメ制作の未来を創る",
                  "技術で限界を超える"
                ]}
                className="text-gray-600 dark:text-gray-300"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/services"
                  className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-anime-purple to-anime-blue text-white font-semibold hover:shadow-xl transition-shadow duration-300"
                >
                  サービスを見る
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center px-8 py-4 rounded-full glass-effect font-semibold hover:bg-anime-purple/10 dark:hover:bg-anime-cyan/10 transition-colors duration-300"
                >
                  お問い合わせ
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-gray-50 dark:bg-dark-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              アニメ業界が抱える<span className="gradient-text">課題</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              TOONIQが解決する業界の根本的な問題
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {problems.map((problem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full glass-effect mb-4">
                  <problem.icon className="w-8 h-8 text-anime-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{problem.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {problem.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-16 p-8 rounded-2xl glass-effect"
          >
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4">
                  <span className="gradient-text">TOONIQの解決策</span>
                </h3>
                <ul className="space-y-3">
                  {[
                    '最新AI技術による制作業務の自動化',
                    'クラウドベースの統合制作管理システム',
                    'ノウハウの可視化と共有プラットフォーム',
                    '人材育成と技術継承の仕組み構築'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="relative w-96 h-64">
                  <Image
                    src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000"
                    alt="AI and technology"
                    fill
                    className="object-cover rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl" />
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="absolute -right-4 -bottom-4 w-24 h-24"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-anime-purple to-anime-cyan rounded-full opacity-60 blur-lg" />
                    <div className="absolute inset-2 bg-gradient-to-r from-anime-purple to-anime-cyan rounded-full" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Cpu className="w-12 h-12 text-white" />
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white dark:bg-dark-bg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="gradient-text">サービス</span>一覧
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              アニメ制作を革新する6つのソリューション
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ParallaxSection key={index} offset={30}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <Link href={service.href}>
                    <Card3D className="h-full">
                      <div className="p-6">
                        <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${service.color} mb-4`}>
                          <service.icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2 group-hover:gradient-text transition-all duration-300">
                          {service.title}
                        </h3>
                        <p className="text-sm text-anime-purple dark:text-anime-cyan mb-2">
                          {service.description}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          {service.detail}
                        </p>
                      </div>
                    </Card3D>
                  </Link>
                </motion.div>
              </ParallaxSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-anime-purple to-anime-blue relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              アニメ制作の未来を一緒に創りませんか？
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              TOONIQは最新技術でアニメ業界の課題を解決し、
              クリエイターが創作活動に専念できる環境を実現します
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 rounded-full bg-white text-anime-purple font-semibold hover:shadow-xl transition-all duration-300"
              >
                <Rocket className="mr-2 w-5 h-5" />
                お問い合わせはこちら
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}