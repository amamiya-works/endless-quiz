import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return request.cookies.get(name)?.value
                },
                set(name: string, value: string, options: CookieOptions) {
                    request.cookies.set({ name, value, ...options })
                    response = NextResponse.next({
                        request: { headers: request.headers },
                    })
                    response.cookies.set({ name, value, ...options })
                },
                remove(name: string, options: CookieOptions) {
                    request.cookies.set({ name, value: '', ...options })
                    response = NextResponse.next({
                        request: { headers: request.headers },
                    })
                    response.cookies.set({ name, value: '', ...options })
                },
            },
        }
    )

    // 【改善内容】getSession() → getUser() に変更
    // 【改善理由】getSession() はクライアント側キャッシュを参照する場合があり、
    //             エッジ環境（Middleware）では信頼性が低い。
    //             getUser() はSupabaseサーバーに都度問い合わせるため、
    //             セッション改ざん・なりすましに対して堅牢。
    const { data: { user } } = await supabase.auth.getUser()

    // ガード：未ログインで /admin 内（ログイン画面以外）にアクセスしたらリダイレクト
    if (!user && request.nextUrl.pathname.startsWith('/admin') && request.nextUrl.pathname !== '/admin') {
        return NextResponse.redirect(new URL('/admin', request.url))
    }

    return response
}

export const config = {
    matcher: ['/admin/:path*'],
}