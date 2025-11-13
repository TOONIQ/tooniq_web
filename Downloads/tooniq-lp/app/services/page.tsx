'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import {
  Cloud,
  Briefcase,
  Bot,
  FileText,
  Code,
  Globe,
  CheckCircle,
  Clock,
  Users,
  Zap,
  Shield,
  LineChart,
  Mail,
  Calendar,
  Gauge,
  Lock,
  RefreshCw,
  Layers
} from 'lucide-react'

export default function Services() {
  const services = [
    {
      id: 'animatime',
      icon: Cloud,
      title: 'AnimaTime',
      subtitle: 'クラウド制作進行ソフト',
      description: 'スプレッドシートやエクセルに代わる、直感的なUIでアニメ特化のオールインワンSaaS',
      features: [
        {
          icon: Calendar,
          title: 'スケジュール自動最適化',
          description: 'AIが最適な制作スケジュールを自動で生成・調整'
        },
        {
          icon: Users,
          title: '人材管理システム',
          description: '制作進行のコネによらない効率的な人材アサイン'
        },
        {
          icon: Mail,
          title: '一斉メール機能',
          description: '関係者への連絡を効率化する自動配信システム'
        },
        {
          icon: LineChart,
          title: '進捗データ集約',
          description: 'リアルタイムで制作状況を可視化・分析'
        }
      ],
      benefits: [
        '制作進行業務を最大70%削減',
        'スケジュール遅延を事前に検知',
        'クラウドで場所を選ばない作業環境',
        '直感的なUIで学習コスト最小化'
      ],
      gradient: 'from-anime-purple to-anime-blue'
    },
    {
      id: 'consulting',
      icon: Briefcase,
      title: '技術コンサルタント・顧問',
      subtitle: '最新技術導入のパートナー',
      description: '最新技術のヒアリングから適切なソフトウェアの選定・導入まで完全サポート',
      features: [
        {
          icon: Zap,
          title: '技術選定サポート',
          description: '御社に最適なソフトウェアと使用方法を提案'
        },
        {
          icon: Users,
          title: '導入講習会',
          description: '設定から使い方まで丁寧な講習を開催'
        },
        {
          icon: Shield,
          title: '顧問制度',
          description: '導入前からトラブル対応まで継続的にサポート'
        },
        {
          icon: RefreshCw,
          title: '継続的改善',
          description: '定期的な見直しと最適化提案'
        }
      ],
      benefits: [
        '技術選定の失敗リスクを最小化',
        '社内の技術力を段階的に向上',
        '最新技術トレンドをいち早くキャッチ',
        '導入後のトラブルを迅速に解決'
      ],
      gradient: 'from-anime-blue to-anime-cyan'
    },
    {
      id: 'chatbot',
      icon: Bot,
      title: 'ChatBot作成',
      subtitle: '企業専用AIアシスタント',
      description: 'NDAを結び、会社の文書や新人用オンボーディング資料を学習した独自のAI',
      features: [
        {
          icon: Lock,
          title: '完全セキュア',
          description: 'ChatGPTのように学習に使用されることはありません'
        },
        {
          icon: Users,
          title: '新人教育支援',
          description: 'オンボーディング資料を学習し新人をサポート'
        },
        {
          icon: FileText,
          title: '社内文書学習',
          description: '社内の規定や手順書を学習し即座に回答'
        },
        {
          icon: Layers,
          title: 'カスタマイズ可能',
          description: '御社の業務に特化した回答を生成'
        }
      ],
      benefits: [
        '社内問い合わせ対応時間を80%削減',
        '24時間365日対応可能',
        '機密情報の外部漏洩リスクゼロ',
        '新人の早期戦力化を実現'
      ],
      gradient: 'from-anime-cyan to-anime-purple'
    },
    {
      id: 'minutes',
      icon: FileText,
      title: '議事録ツール',
      subtitle: '自動文字起こし＆要約',
      description: 'オンライン会議にBotが同席して自動で議事録を作成',
      features: [
        {
          icon: Clock,
          title: '自動録音・書き起こし',
          description: '会議の音声を自動で文字起こし'
        },
        {
          icon: Zap,
          title: 'AI要約機能',
          description: '重要ポイントとTODOを自動抽出'
        },
        {
          icon: Users,
          title: 'アニメ業界特化',
          description: '業界用語に対応したfinetuning'
        },
        {
          icon: Cloud,
          title: 'AnimaTime連携',
          description: 'タスク管理システムと自動連携'
        }
      ],
      benefits: [
        '議事録作成時間を90%削減',
        '会議の要点を確実に記録',
        '決定事項とTODOの抜け漏れ防止',
        'AnimaTimeとの連携で即座にタスク化'
      ],
      gradient: 'from-anime-purple to-anime-pink'
    },
    {
      id: 'custom',
      icon: Code,
      title: 'カスタム開発',
      subtitle: 'オーダーメイドシステム',
      description: '既存のシステムと上手く合う形で新システムを開発',
      features: [
        {
          icon: Layers,
          title: '既存システム連携',
          description: '現行システムとシームレスに統合'
        },
        {
          icon: Code,
          title: 'プラグイン開発',
          description: 'ソフトウェアの拡張機能を開発'
        },
        {
          icon: Gauge,
          title: 'パフォーマンス最適化',
          description: '処理速度とユーザビリティを改善'
        },
        {
          icon: Shield,
          title: '保守サポート',
          description: '開発後の継続的なメンテナンス'
        }
      ],
      benefits: [
        '業務効率を最大50%向上',
        '既存資産を活かした段階的な改善',
        '開発コストを30%削減',
        '長期的なサポート体制'
      ],
      gradient: 'from-anime-pink to-anime-blue'
    },
    {
      id: 'website',
      icon: Globe,
      title: 'Webサイト作成・運用代行',
      subtitle: 'プロフェッショナルなWeb制作',
      description: '会社のHPや作品ごとの特設ページの作成・管理',
      features: [
        {
          icon: Globe,
          title: '企業サイト制作',
          description: 'ブランディングに沿った企業サイト'
        },
        {
          icon: Zap,
          title: '特設ページ制作',
          description: '作品ごとの魅力的な特設サイト'
        },
        {
          icon: LineChart,
          title: 'アクセス解析',
          description: '月次レポートで効果を可視化'
        },
        {
          icon: RefreshCw,
          title: '継続的な運用',
          description: 'コンテンツ更新と保守を代行'
        }
      ],
      benefits: [
        'プロフェッショナルなデザイン',
        'SEO対策による集客力向上',
        '運用負担をゼロに',
        'データに基づく改善提案'
      ],
      gradient: 'from-anime-blue to-anime-purple'
    }
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 -z-20">
          <Image
            src="/images/services-bg.jpg"
            alt="Technology and innovation"
            fill
            className="object-cover opacity-10"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-anime-purple/10 via-anime-blue/5 to-anime-cyan/10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl font-bold mb-6">
              <span className="gradient-text">サービス一覧</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              アニメ制作を革新する6つのソリューション
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Detail */}
      {services.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className={`py-20 ${index % 2 === 0 ? 'bg-white dark:bg-dark-bg' : 'bg-gray-50 dark:bg-dark-card'}`}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-6xl mx-auto"
            >
              {/* Service Header */}
              <div className="flex flex-col lg:flex-row items-center gap-8 mb-12">
                <div className={`p-6 rounded-2xl bg-gradient-to-r ${service.gradient}`}>
                  <service.icon className="w-16 h-16 text-white" />
                </div>
                <div className="text-center lg:text-left">
                  <h2 className="text-3xl font-bold mb-2">{service.title}</h2>
                  <p className="text-xl text-anime-purple dark:text-anime-cyan mb-4">
                    {service.subtitle}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {service.features.map((feature, featureIndex) => (
                  <motion.div
                    key={featureIndex}
                    initial={{ opacity: 0, x: featureIndex % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: featureIndex * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4 p-6 rounded-xl glass-effect"
                  >
                    <div className="flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-anime-purple dark:text-anime-cyan" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Benefits */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-gradient-to-r from-anime-purple/5 to-anime-cyan/5 border border-anime-purple/20"
              >
                <h3 className="text-xl font-semibold mb-4">導入メリット</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {service.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      ))}

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
              サービスに関するお問い合わせ
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              各サービスの詳細や料金については、お気軽にお問い合わせください
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-4 rounded-full bg-white text-anime-purple font-semibold hover:shadow-xl transition-all duration-300"
            >
              無料相談はこちら
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}