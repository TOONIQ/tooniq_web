'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import {
  Mail,
  Phone,
  MapPin,
  Send,
  User,
  Building,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Calendar,
  Clock
} from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    category: 'general',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const categories = [
    { value: 'general', label: '一般的なお問い合わせ' },
    { value: 'animatime', label: 'AnimaTimeについて' },
    { value: 'consulting', label: '技術コンサルティングについて' },
    { value: 'development', label: '開発案件について' },
    { value: 'partnership', label: '業務提携について' },
    { value: 'other', label: 'その他' }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        category: 'general',
        message: ''
      })

      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000)
    }, 2000)
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'メールアドレス',
      content: 'contact@tooniq.co.jp',
      href: 'mailto:contact@tooniq.co.jp'
    },
    {
      icon: MapPin,
      title: '所在地',
      content: '東京都',
      href: null
    },
    {
      icon: Calendar,
      title: '設立',
      content: '2025年',
      href: null
    },
    {
      icon: Clock,
      title: '営業時間',
      content: '平日 10:00 - 18:00',
      href: null
    }
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 -z-20">
          <Image
            src="/images/contact-bg.jpg"
            alt="Contact and communication"
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
              <span className="gradient-text">お問い合わせ</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              お気軽にお問い合わせください
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-20 bg-white dark:bg-dark-bg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <h2 className="text-2xl font-bold mb-6">連絡先情報</h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-anime-purple to-anime-blue flex items-center justify-center">
                        <info.icon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{info.title}</h3>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-gray-600 dark:text-gray-400 hover:text-anime-purple dark:hover:text-anime-cyan transition-colors"
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-gray-600 dark:text-gray-400">
                          {info.content}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Quick Response Note */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                viewport={{ once: true }}
                className="mt-8 p-6 rounded-xl glass-effect"
              >
                <h3 className="font-semibold mb-2 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2 text-anime-purple" />
                  お問い合わせについて
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  通常、1〜2営業日以内にご返信いたします。
                  お急ぎの場合は、メールの件名に「【緊急】」とご記載ください。
                </p>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="glass-effect rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-6">お問い合わせフォーム</h2>

                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-center"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    <span className="text-green-700 dark:text-green-400">
                      お問い合わせを受け付けました。近日中にご連絡いたします。
                    </span>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        お名前 <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 pl-10 rounded-lg bg-gray-50 dark:bg-dark-card border border-gray-200 dark:border-dark-border focus:border-anime-purple dark:focus:border-anime-cyan focus:outline-none transition-colors"
                        />
                        <User className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-medium mb-2">
                        会社名
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 pl-10 rounded-lg bg-gray-50 dark:bg-dark-card border border-gray-200 dark:border-dark-border focus:border-anime-purple dark:focus:border-anime-cyan focus:outline-none transition-colors"
                        />
                        <Building className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        メールアドレス <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 pl-10 rounded-lg bg-gray-50 dark:bg-dark-card border border-gray-200 dark:border-dark-border focus:border-anime-purple dark:focus:border-anime-cyan focus:outline-none transition-colors"
                        />
                        <Mail className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">
                        電話番号
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 pl-10 rounded-lg bg-gray-50 dark:bg-dark-card border border-gray-200 dark:border-dark-border focus:border-anime-purple dark:focus:border-anime-cyan focus:outline-none transition-colors"
                        />
                        <Phone className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-sm font-medium mb-2">
                      お問い合わせ種別 <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-dark-card border border-gray-200 dark:border-dark-border focus:border-anime-purple dark:focus:border-anime-cyan focus:outline-none transition-colors"
                    >
                      {categories.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      お問い合わせ内容 <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 pl-10 rounded-lg bg-gray-50 dark:bg-dark-card border border-gray-200 dark:border-dark-border focus:border-anime-purple dark:focus:border-anime-cyan focus:outline-none transition-colors resize-none"
                      />
                      <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="text-red-500">*</span> は必須項目です
                    </p>
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`inline-flex items-center px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                        isSubmitting
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-anime-purple to-anime-blue text-white hover:shadow-xl'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                          送信中...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          送信する
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50 dark:bg-dark-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-12 text-center">
              よくある<span className="gradient-text">ご質問</span>
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: '見積もりは無料ですか？',
                  a: 'はい、お見積もりは無料です。お気軽にご相談ください。'
                },
                {
                  q: 'AnimaTimeの導入期間はどのくらいですか？',
                  a: '規模にもよりますが、通常1〜2週間程度で導入可能です。'
                },
                {
                  q: 'リモートでのサポートは可能ですか？',
                  a: 'はい、オンラインでのサポートも対応しております。'
                },
                {
                  q: '小規模な制作会社でも導入できますか？',
                  a: '規模に関わらず導入可能です。お客様に合わせたプランをご提案します。'
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="glass-effect rounded-xl p-6"
                >
                  <h3 className="font-semibold mb-2">{faq.q}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}