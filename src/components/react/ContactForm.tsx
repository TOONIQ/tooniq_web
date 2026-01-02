/**
 * お問い合わせフォームコンポーネント - TOONIQウェブサイト
 *
 * お問い合わせフォームのReactコンポーネント
 * フォームバリデーション、送信状態管理、アニメーションを含む
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Send,
  User,
  Building,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

// ============================================
// 型定義
// ============================================

interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  category: string;
  message: string;
}

type SubmitStatus = 'idle' | 'success' | 'error';

// ============================================
// データ定義: お問い合わせカテゴリー
// ============================================

const categories = [
  { value: 'general', label: '一般的なお問い合わせ' },
  { value: 'animatime', label: 'AnimaTimeについて' },
  { value: 'consulting', label: '技術コンサルティングについて' },
  { value: 'development', label: '開発案件について' },
  { value: 'partnership', label: '業務提携について' },
  { value: 'other', label: 'その他' }
];

// ============================================
// コンポーネント
// ============================================

/**
 * お問い合わせフォーム
 *
 * 機能:
 * - フォーム入力の状態管理
 * - バリデーション
 * - 送信処理のシミュレーション
 * - 送信成功/エラーのフィードバック
 */
export default function ContactForm() {
  // ============================================
  // 状態管理
  // ============================================

  const [formData, setFormData] = useState<FormData>({
    name: '',
    company: '',
    email: '',
    phone: '',
    category: 'general',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');

  // ============================================
  // イベントハンドラー
  // ============================================

  /**
   * 入力フィールド変更時の処理
   */
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  /**
   * フォーム送信処理
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setSubmitStatus('idle');

    try {
      // Web3Forms API を使用してフォームデータを送信（静的サイト対応）
      const web3formsData = {
        access_key: import.meta.env.PUBLIC_WEB3FORMS_ACCESS_KEY || '',
        to: 'contact@tooniq.co.jp', // 送信先メールアドレスを明示的に指定
        subject: `お問い合わせ: ${formData.category}`,
        from_name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        category: formData.category,
        message: formData.message,
      };

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(web3formsData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // 送信成功
        setSubmitStatus('success');

        // フォームをリセット
        setFormData({
          name: '',
          company: '',
          email: '',
          phone: '',
          category: 'general',
          message: ''
        });

        // 5秒後にステータスをリセット
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 5000);
      } else {
        // エラーレスポンス
        setSubmitStatus('error');
        console.error('送信エラー:', result.message);
      }
    } catch (error) {
      // ネットワークエラーなど
      setSubmitStatus('error');
      console.error('送信エラー:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ============================================
  // レンダリング
  // ============================================

  return (
    <div className="glass-effect rounded-2xl p-8">
      {/* フォームタイトル */}
      <h2 className="text-2xl font-bold mb-6">お問い合わせフォーム</h2>

      {/* 送信成功メッセージ */}
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

      {/* 送信エラーメッセージ */}
      {submitStatus === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg flex items-center"
        >
          <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
          <span className="text-red-700 dark:text-red-400">
            送信に失敗しました。しばらく時間をおいて再度お試しください。
          </span>
        </motion.div>
      )}

      {/* フォーム本体 */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* お名前と会社名 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* お名前 */}
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
                className="w-full px-4 py-3 pl-10 rounded-lg bg-gray-50 dark:bg-slate-900 border border-neutral-200 dark:border-slate-700 focus:border-blue-600 dark:focus:border-blue-500 focus:outline-none transition-colors"
              />
              <User className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* 会社名 */}
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
                className="w-full px-4 py-3 pl-10 rounded-lg bg-gray-50 dark:bg-slate-900 border border-neutral-200 dark:border-slate-700 focus:border-blue-600 dark:focus:border-blue-500 focus:outline-none transition-colors"
              />
              <Building className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>

        {/* メールアドレスと電話番号 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* メールアドレス */}
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
                className="w-full px-4 py-3 pl-10 rounded-lg bg-gray-50 dark:bg-slate-900 border border-neutral-200 dark:border-slate-700 focus:border-blue-600 dark:focus:border-blue-500 focus:outline-none transition-colors"
              />
              <Mail className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* 電話番号 */}
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
                className="w-full px-4 py-3 pl-10 rounded-lg bg-gray-50 dark:bg-slate-900 border border-neutral-200 dark:border-slate-700 focus:border-blue-600 dark:focus:border-blue-500 focus:outline-none transition-colors"
              />
              <Phone className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>

        {/* お問い合わせ種別 */}
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
            className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-slate-900 border border-neutral-200 dark:border-slate-700 focus:border-blue-600 dark:focus:border-blue-500 focus:outline-none transition-colors"
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* お問い合わせ内容 */}
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
              className="w-full px-4 py-3 pl-10 rounded-lg bg-gray-50 dark:bg-slate-900 border border-neutral-200 dark:border-slate-700 focus:border-blue-600 dark:focus:border-blue-500 focus:outline-none transition-colors resize-none"
            />
            <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* 送信ボタン */}
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
                : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-xl'
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
  );
}
