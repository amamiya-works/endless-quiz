"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/Card"
import { Lock, Loader2 } from "lucide-react"
import { supabase } from "@/lib/supabase" // Step 1で作ったクライアント
import Link from "next/link"

export default function AdminLogin() {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMsg, setErrorMsg] = useState("")

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setErrorMsg("")

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (error) {
                setErrorMsg("ログインに失敗しました。パスワードを確認してください。")
                setLoading(false)
                return
            }

            if (data?.session) {
                // 成功！クッキーが保存されるのを待ってから、強制リロードでダッシュボードへ
                setLoading(false)
                window.location.href = "/admin/dashboard"
            }
        // 【改善内容】受け取ったerrをconsole.errorで出力するように変更
        // 【改善理由】catchで受け取ったerrを使わないとTypeScriptの警告が出る。
        //             console.errorに出力することで、開発時のデバッグ情報を
        //             残しつつ警告を解消する。
        } catch (err) {
            console.error("Login error:", err)
            setErrorMsg("エラーが発生しました。")
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">
            <Card className="w-full max-w-sm shadow-xl">
                <CardHeader className="text-center">
                    <div className="mx-auto bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-2 text-primary">
                        <Lock className="w-8 h-8" />
                    </div>
                    <CardTitle className="text-2xl font-bold">管理者ログイン</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        {errorMsg && <div className="text-xs text-red-500 bg-red-50 p-2 rounded text-center">{errorMsg}</div>}
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded" placeholder="Email" required />
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded" placeholder="Password" required />
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "ログイン"}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="justify-center">
                    <Link href="/" className="text-sm text-subtle hover:underline">← アプリに戻る</Link>
                </CardFooter>
            </Card>
        </div>
    )
}