import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/types/supabase'

// 【改善内容】環境変数の存在チェックを明示的に追加
// 【改善理由】!アサーションのみでは環境変数が未設定の場合に
//             「Cannot read properties of undefined」という
//             原因の分かりにくいエラーが発生する。
//             明示的なチェックを入れることで、.env.localの設定漏れを
//             即座に発見できるようにし、調査コストを削減する。
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
        '環境変数エラー: NEXT_PUBLIC_SUPABASE_URL または NEXT_PUBLIC_SUPABASE_ANON_KEY が未設定です。' +
        '.env.local を確認してください。'
    )
}

// ブラウザ（クライアント）側でクイズを読み書きするためのクライアント
export const supabase = createBrowserClient<Database>(supabaseUrl, supabaseAnonKey)