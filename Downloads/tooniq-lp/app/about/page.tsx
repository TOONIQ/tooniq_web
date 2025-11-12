'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Calendar, MapPin, Users, Zap, Target, Award, BookOpen, Rocket } from 'lucide-react'

export default function About() {
  const timeline = [
    {
      year: '2025年',
      title: '合同会社TOONIQ設立',
      description: '東京理科大学の公認サークル「動画研究同好会」で技術開発を行っていた2名が起業',
      icon: Rocket,
    },
    {
      year: '2025年',
      title: 'AnimaTime開発開始',
      description: 'クラウド型制作進行管理システムの開発を本格スタート',
      icon: Zap,
    },
    {
      year: '2025年',
      title: '大学間連携プロジェクト',
      description: '全国10大学のアニメ制作サークルと連携し、技術支援を実施',
      icon: Users,
    },
  ]

  const team = [
    {
      name: '大木天翔',
      role: 'CEO / COO',
      description: '東京理科大学理学部第一部物理学科在学。理化学研究所で量子技術研究に従事。東京大学松尾・岩澤研究室でインターンシップ経験。',
      skills: ['経営戦略', '量子技術', 'AI研究', 'プロジェクト管理'],
    },
    {
      name: '山口優斗',
      role: 'CTO / AIエンジニア',
      description: '東京理科大学在学。最先端のAI技術をアニメ制作に応用する技術開発をリード。',
      skills: ['AI開発', 'システム設計', 'クラウド技術', 'フルスタック開発'],
    },
  ]

  const values = [
    {
      icon: Target,
      title: '革新',
      description: 'AIとテクノロジーでアニメ制作の常識を覆す',
    },
    {
      icon: Users,
      title: '共創',
      description: 'クリエイターと技術者が協力して未来を創る',
    },
    {
      icon: Award,
      title: '品質',
      description: '妥協のない品質とユーザー体験の追求',
    },
    {
      icon: BookOpen,
      title: '継承',
      description: '技術とノウハウを次世代へつなぐ',
    },
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 -z-20">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000"
            alt="Team collaboration"
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
              <span className="gradient-text">会社概要</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              テクノロジーでアニメ制作の未来を切り拓く
            </p>
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-effect">
              <Calendar className="w-5 h-5 text-anime-purple" />
              <span className="text-sm font-medium">設立: 2025年</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-50 dark:bg-dark-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">
              私たちの<span className="gradient-text">ミッション</span>
            </h2>
            <div className="glass-effect p-8 rounded-2xl">
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6">
                AIで「作業」から「人」を解放し、人間にしかできない「感動」を生み出すために、アニメ制作の構造を根本から変える。
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                私たちTOONIQは、最新のAI技術とクラウドソリューションを活用して、アニメ制作現場が抱える人材不足、
                技術の属人化、制作管理の非効率といった課題を解決します。クリエイターが創作活動に専念できる環境を実現し、
                より質の高いアニメ作品を世界に届けることを目指しています。
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white dark:bg-dark-bg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-12 text-center">
              <span className="gradient-text">リーダーシップチーム</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="glass-effect rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full relative overflow-hidden">
                      <Image
                        src={index === 0
                          ? "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200"
                          : "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200"}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-bold">{member.name}</h3>
                      <p className="text-anime-purple dark:text-anime-cyan">{member.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {member.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1 bg-anime-purple/10 dark:bg-anime-cyan/10 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50 dark:bg-dark-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-12 text-center">
              私たちの<span className="gradient-text">価値観</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-anime-purple to-anime-blue mb-4">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white dark:bg-dark-bg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-12 text-center">
              <span className="gradient-text">企業沿革</span>
            </h2>
            <div className="max-w-4xl mx-auto">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex items-start mb-8 last:mb-0"
                >
                  <div className="flex-shrink-0 w-32 text-right pr-4">
                    <span className="text-sm font-semibold text-anime-purple dark:text-anime-cyan">
                      {item.year}
                    </span>
                  </div>
                  <div className="flex-shrink-0 relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-anime-purple to-anime-blue flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    {index !== timeline.length - 1 && (
                      <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-0.5 h-20 bg-gradient-to-b from-anime-purple to-transparent" />
                    )}
                  </div>
                  <div className="flex-grow pl-4">
                    <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Future Vision */}
      <section className="py-20 bg-gradient-to-r from-anime-purple to-anime-blue relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              今後の展望
            </h2>
            <div className="space-y-4 text-white/90">
              <p>
                制作会社と提携して独自のAIモデルを開発し、自動中割りや仕上げ、
                背景や3D素材の生成など、制作プロセスの更なる効率化を実現します。
              </p>
              <p>
                将来的には自社でアニメスタジオを設立し、IPを所有することで、
                質の高いアニメ作品の学習データを作成し、業界全体の発展に貢献します。
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}