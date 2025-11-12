'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import {
  Users,
  Film,
  Award,
  Calendar,
  MapPin,
  Briefcase,
  FileCheck,
  Lightbulb,
  Target,
  Sparkles
} from 'lucide-react'

export default function Works() {
  const works = [
    {
      title: '全国大学アニメ制作連携プロジェクト',
      category: 'プロジェクト管理',
      period: '2025年',
      client: '全国10大学アニメ制作サークル',
      description: '全国10の大学アニメ制作サークルが集まり、プロの作画監督指導のもと一つのアニメ作品を制作',
      achievements: [
        '制作進行システムの構築と運用',
        '進行管理の効率化により納期を2週間短縮',
        'Webサイト構築による情報共有の円滑化',
        '10大学間のコミュニケーション基盤確立'
      ],
      technologies: ['AnimaTime', 'Web開発', 'プロジェクト管理'],
      impact: {
        participants: '200名以上',
        deliveryTime: '予定より2週間早く完成',
        satisfaction: '参加者満足度95%'
      },
      icon: Users,
      gradient: 'from-anime-purple to-anime-blue',
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2000'
    },
    {
      title: 'レトロアニメ制作企画',
      category: '企画・技術支援',
      period: '2025年',
      client: '大学学園祭実行委員会',
      description: '現代のテレビアニメを昔のアニメ制作の手法で再現する企画を実施',
      achievements: [
        'サークルと他企業との間で企画進行を担当',
        'NDA等の契約書作成と交渉',
        '制作工程の技術的アドバイス',
        '発注管理と予算調整'
      ],
      technologies: ['契約管理', '企画進行', '技術コンサルティング'],
      impact: {
        visitors: '5,000名以上が来場',
        mediaAttention: '複数メディアで紹介',
        collaboration: '3社との協業実現'
      },
      icon: Film,
      gradient: 'from-anime-blue to-anime-cyan',
      image: 'https://images.unsplash.com/photo-1536104968055-4d61aa56f46a?q=80&w=2000'
    },
    {
      title: '制作管理システム開発',
      category: 'システム開発',
      period: '2025年〜',
      client: '複数のアニメ制作会社',
      description: '各社の既存システムと連携する制作管理システムのカスタム開発',
      achievements: [
        '既存Excel運用から脱却',
        'クラウド化による在宅勤務対応',
        'リアルタイム進捗共有の実現',
        '自動レポート生成機能の実装'
      ],
      technologies: ['クラウド開発', 'API連携', 'データ分析'],
      impact: {
        efficiency: '作業効率40%向上',
        errorReduction: 'ヒューマンエラー80%削減',
        timeReduction: 'レポート作成時間90%削減'
      },
      icon: Briefcase,
      gradient: 'from-anime-cyan to-anime-purple',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2000'
    }
  ]

  const stats = [
    { label: 'プロジェクト完了', value: '15+', icon: Award },
    { label: '協力企業・団体', value: '20+', icon: Users },
    { label: '参加クリエイター', value: '500+', icon: Sparkles },
    { label: '効率化達成率', value: '40%', icon: Target }
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-anime-purple/10 via-anime-blue/5 to-anime-cyan/10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl font-bold mb-6">
              <span className="gradient-text">実績紹介</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              TOONIQが手がけたプロジェクトと成果
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50 dark:bg-dark-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-anime-purple to-anime-blue mb-3">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold gradient-text mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Works Section */}
      <section className="py-20 bg-white dark:bg-dark-bg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {works.map((work, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="max-w-6xl mx-auto"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Work Header */}
                  <div className="lg:col-span-1">
                    <div className="relative h-48 mb-4 rounded-xl overflow-hidden">
                      <Image
                        src={work.image}
                        alt={work.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className={`absolute bottom-4 left-4 inline-flex p-3 rounded-xl bg-gradient-to-r ${work.gradient}`}>
                        <work.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{work.title}</h3>
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center space-x-2">
                        <Briefcase className="w-4 h-4" />
                        <span>{work.category}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{work.period}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4" />
                        <span>{work.client}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {work.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-anime-purple/10 dark:bg-anime-cyan/10 rounded-full text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Work Details */}
                  <div className="lg:col-span-2 space-y-6">
                    <div className="glass-effect rounded-xl p-6">
                      <h4 className="font-semibold mb-3 flex items-center">
                        <Lightbulb className="w-5 h-5 mr-2 text-anime-purple" />
                        プロジェクト概要
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        {work.description}
                      </p>
                    </div>

                    <div className="glass-effect rounded-xl p-6">
                      <h4 className="font-semibold mb-3 flex items-center">
                        <FileCheck className="w-5 h-5 mr-2 text-anime-purple" />
                        主な実績
                      </h4>
                      <ul className="space-y-2">
                        {work.achievements.map((achievement, achievementIndex) => (
                          <li key={achievementIndex} className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span className="text-gray-600 dark:text-gray-400">
                              {achievement}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="glass-effect rounded-xl p-6">
                      <h4 className="font-semibold mb-3 flex items-center">
                        <Target className="w-5 h-5 mr-2 text-anime-purple" />
                        成果とインパクト
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {Object.entries(work.impact).map(([key, value], impactIndex) => (
                          <div key={impactIndex} className="text-center">
                            <div className="text-xl font-bold text-anime-purple dark:text-anime-cyan">
                              {value}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-gray-50 dark:bg-dark-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-12">
              <span className="gradient-text">パートナーの声</span>
            </h2>
            <div className="glass-effect rounded-2xl p-8">
              <blockquote className="text-lg italic text-gray-700 dark:text-gray-300 mb-4">
                "TOONIQのシステムのおかげで、制作進行の効率が劇的に改善しました。
                特にAnimaTimeは直感的で使いやすく、チーム全体のコミュニケーションが円滑になりました。"
              </blockquote>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                - 大学アニメ制作サークル代表
              </p>
            </div>
          </motion.div>
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
            <h2 className="text-3xl font-bold text-white mb-4">
              あなたのプロジェクトもサポートします
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              アニメ制作の課題を一緒に解決しましょう
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-4 rounded-full bg-white text-anime-purple font-semibold hover:shadow-xl transition-all duration-300"
            >
              プロジェクトについて相談する
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}