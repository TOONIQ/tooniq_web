/**
 * お問い合わせAPIエンドポイント - TOONIQウェブサイト
 *
 * Resendを使用してお問い合わせメールを送信する
 */

import type { APIRoute } from 'astro';
import { Resend } from 'resend';

// このエンドポイントはサーバーでのみレンダリング（静的プリレンダリングしない）
export const prerender = false;

// 開発環境でAPIキーがない場合のモックモード判定
const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;
const IS_MOCK_MODE = !RESEND_API_KEY;

// Resendクライアントの初期化（APIキーがある場合のみ）
const resend = IS_MOCK_MODE ? null : new Resend(RESEND_API_KEY);

// ============================================
// 型定義
// ============================================

interface ContactFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  category: string;
  message: string;
}

// ============================================
// APIエンドポイント
// ============================================

export const POST: APIRoute = async ({ request }) => {
  try {
    // リクエストボディの取得
    const formData: ContactFormData = await request.json();

    // 入力バリデーション
    if (!formData.name || !formData.email || !formData.message) {
      return new Response(
        JSON.stringify({
          success: false,
          error: '必須項目が入力されていません'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    // メールアドレスの簡易バリデーション
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'メールアドレスの形式が正しくありません'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    // カテゴリーラベルのマッピング
    const categoryLabels: Record<string, string> = {
      general: '一般的なお問い合わせ',
      animatime: 'AnimaTimeについて',
      consulting: '技術コンサルティングについて',
      development: '開発案件について',
      partnership: '業務提携について',
      other: 'その他'
    };

    let data;

    // モックモード: APIキーがない場合はコンソールにログ出力のみ
    if (IS_MOCK_MODE) {
      console.log('========================================');
      console.log('🧪 モックモード: メール送信シミュレーション');
      console.log('========================================');
      console.log('📧 送信先:', 'contact@tooniq.co.jp');
      console.log('📝 件名:', `【お問い合わせ】${categoryLabels[formData.category] || formData.category}`);
      console.log('----------------------------------------');
      console.log('送信者情報:');
      console.log('  お名前:', formData.name);
      if (formData.company) console.log('  会社名:', formData.company);
      console.log('  メールアドレス:', formData.email);
      if (formData.phone) console.log('  電話番号:', formData.phone);
      console.log('  お問い合わせ種別:', categoryLabels[formData.category] || formData.category);
      console.log('----------------------------------------');
      console.log('お問い合わせ内容:');
      console.log(formData.message);
      console.log('========================================');
      console.log('✅ メール送信シミュレーション完了');
      console.log('💡 実際にメールを送信するには、.envファイルにRESEND_API_KEYを設定してください');
      console.log('========================================');

      data = {
        id: 'mock_' + Date.now(),
        message: 'モックモード: メール送信をシミュレーションしました'
      };
    } else {
      // 実際のメール送信
      data = await resend!.emails.send({
        from: 'お問い合わせフォーム <onboarding@resend.dev>', // ※本番環境では独自ドメインに変更
        to: ['contact@tooniq.co.jp'], // 受信先メールアドレス
        replyTo: formData.email, // 返信先として送信者のメールアドレスを設定
        subject: `【お問い合わせ】${categoryLabels[formData.category] || formData.category}`,
        html: `
          <!DOCTYPE html>
          <html lang="ja">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>お問い合わせ</title>
          </head>
          <body style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 24px;">新しいお問い合わせ</h1>
            </div>

            <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb;">
              <div style="margin-bottom: 20px;">
                <h2 style="color: #667eea; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #667eea; padding-bottom: 5px;">
                  送信者情報
                </h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; width: 120px; color: #4b5563;">お名前:</td>
                    <td style="padding: 8px 0;">${formData.name}</td>
                  </tr>
                  ${formData.company ? `
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">会社名:</td>
                    <td style="padding: 8px 0;">${formData.company}</td>
                  </tr>
                  ` : ''}
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">メールアドレス:</td>
                    <td style="padding: 8px 0;"><a href="mailto:${formData.email}" style="color: #667eea; text-decoration: none;">${formData.email}</a></td>
                  </tr>
                  ${formData.phone ? `
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">電話番号:</td>
                    <td style="padding: 8px 0;">${formData.phone}</td>
                  </tr>
                  ` : ''}
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">お問い合わせ種別:</td>
                    <td style="padding: 8px 0;">${categoryLabels[formData.category] || formData.category}</td>
                  </tr>
                </table>
              </div>

              <div>
                <h2 style="color: #667eea; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #667eea; padding-bottom: 5px;">
                  お問い合わせ内容
                </h2>
                <div style="background: white; padding: 15px; border-radius: 5px; border: 1px solid #e5e7eb; white-space: pre-wrap;">
${formData.message}
                </div>
              </div>
            </div>

            <div style="margin-top: 20px; padding: 15px; background: #f3f4f6; border-radius: 5px; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #6b7280;">
                このメールは TOONIQウェブサイトのお問い合わせフォームから送信されました
              </p>
            </div>
          </body>
          </html>
        `
      });
    }

    // 送信成功
    return new Response(
      JSON.stringify({
        success: true,
        data
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('メール送信エラー:', error);

    return new Response(
      JSON.stringify({
        success: false,
        error: 'メールの送信に失敗しました。しばらく時間をおいて再度お試しください。'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
};
