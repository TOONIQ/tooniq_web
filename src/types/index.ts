/**
 * 型定義ファイル - TOONIQウェブサイト
 *
 * プロジェクト全体で使用される型定義を集約
 * リーダブルコードの原則に従い、明確で理解しやすい命名を使用
 */

// ============================================
// ナビゲーション関連の型
// ============================================

/**
 * ナビゲーションリンクアイテム
 */
export interface NavigationLink {
  /** 表示名 */
  label: string;
  /** リンク先のパス */
  href: string;
  /** 外部リンクかどうか */
  isExternal?: boolean;
}

// ============================================
// サービス関連の型
// ============================================

/**
 * サービスの特徴
 */
export interface ServiceFeature {
  /** アイコンコンポーネント */
  icon: any;
  /** 特徴のタイトル */
  title: string;
  /** 詳細説明 */
  description: string;
}

/**
 * サービス情報
 */
export interface Service {
  /** サービスID（URLのアンカーとして使用） */
  id: string;
  /** アイコンコンポーネント */
  icon: any;
  /** サービス名 */
  title: string;
  /** サブタイトル */
  subtitle: string;
  /** 説明文 */
  description: string;
  /** サービスの特徴リスト */
  features: ServiceFeature[];
  /** 導入メリット */
  benefits: string[];
  /** グラデーションカラークラス */
  gradient: string;
}

// ============================================
// チーム関連の型
// ============================================

/**
 * チームメンバー情報
 */
export interface TeamMember {
  /** 名前 */
  name: string;
  /** 役職 */
  role: string;
  /** 自己紹介・経歴 */
  description: string;
  /** スキルセット */
  skills: string[];
  /** アバター画像のパス */
  avatar?: string;
}

// ============================================
// タイムライン関連の型
// ============================================

/**
 * 企業沿革・タイムラインアイテム
 */
export interface TimelineItem {
  /** 年 */
  year: string;
  /** タイトル */
  title: string;
  /** 説明 */
  description: string;
  /** アイコンコンポーネント */
  icon: any;
}

// ============================================
// コンタクトフォーム関連の型
// ============================================

/**
 * お問い合わせフォームのデータ
 */
export interface ContactFormData {
  /** 名前 */
  name: string;
  /** 会社名 */
  company: string;
  /** メールアドレス */
  email: string;
  /** 電話番号 */
  phone: string;
  /** お問い合わせカテゴリ */
  category: string;
  /** お問い合わせ内容 */
  message: string;
}

/**
 * お問い合わせカテゴリ
 */
export interface ContactCategory {
  /** カテゴリの値 */
  value: string;
  /** カテゴリの表示名 */
  label: string;
}

/**
 * お問い合わせ情報
 */
export interface ContactInfo {
  /** アイコンコンポーネント */
  icon: any;
  /** タイトル */
  title: string;
  /** 内容 */
  content: string;
  /** リンク先（オプション） */
  href: string | null;
}

// ============================================
// よくある質問（FAQ）関連の型
// ============================================

/**
 * FAQ項目
 */
export interface FAQItem {
  /** 質問 */
  question: string;
  /** 回答 */
  answer: string;
}

// ============================================
// 共通UI関連の型
// ============================================

/**
 * アニメーションバリアント
 */
export type AnimationVariant = 'fade' | 'slide' | 'scale' | 'rotate';

/**
 * テーマモード
 */
export type ThemeMode = 'light' | 'dark';

/**
 * レスポンシブブレイクポイント
 */
export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
