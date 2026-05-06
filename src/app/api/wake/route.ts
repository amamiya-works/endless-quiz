import { NextResponse } from 'next/server'

// 【改善内容】リクエストヘッダーのトークン検証を追加
// 【改善理由】認証なしでは誰でもSupabase Management APIを
//             呼び出せてしまい、レート制限超過のリスクがある。
//             CRON_SECRETによる簡易認証で無差別な呼び出しを防ぐ。
export async function POST(request: Request) {
    // トークン検証：ヘッダーの値と環境変数を照合
    const secret = request.headers.get('x-wake-secret')
    if (!secret || secret !== process.env.CRON_SECRET) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const projectRef = process.env.SUPABASE_PROJECT_REF
    const token = process.env.SUPABASE_ACCESS_TOKEN

    try {
        const res = await fetch(`https://api.supabase.com/v1/projects/${projectRef}/restore`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })

        if (!res.ok) throw new Error('Failed to wake up')
        return NextResponse.json({ message: 'Waking up...' })
    } catch (error) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 })
    }
}