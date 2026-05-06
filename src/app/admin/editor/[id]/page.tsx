"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/Card"
import { ArrowLeft, Save, Trash2, Loader2 } from "lucide-react"
import { supabase } from "@/lib/supabase" // Supabaseクライアントをインポート
import type { Database } from "@/types/supabase"

type Quiz = Database['public']['Tables']['quizzes']['Row']

export default function QuizEditor() {
    const router = useRouter()
    const params = useParams()
    const id = params.id as string
    const isNew = id === "new"

    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(!isNew)
    const [formData, setFormData] = useState<Partial<Quiz>>({
        question_text: "",
        choice_1: "",
        choice_2: "",
        choice_3: "",
        choice_4: "",
        explanation: "",
        is_published: true
    })

    // 既存データの読み込み
    useEffect(() => {
        if (!isNew) {
            const fetchQuiz = async () => {
                const { data, error } = await supabase
                    .from('quizzes')
                    .select('*')
                    .eq('id', id)
                    .single()
                
                if (data) {
                    setFormData(data)
                }
                setFetching(false)
            }
            fetchQuiz()
        }
    }, [id, isNew])

    // 保存処理 (Insert or Update)
    const handleSave = async (e: React.FormEvent) => {
            e.preventDefault()
            setLoading(true)

            try {
                // 保存するデータを明示的に作成（型エラーを防ぐため）
                const saveData: any = {
                    question_text: formData.question_text,
                    choice_1: formData.choice_1,
                    choice_2: formData.choice_2,
                    choice_3: formData.choice_3,
                    choice_4: formData.choice_4,
                    explanation: formData.explanation,
                    is_published: formData.is_published,
                }

                // 既存編集の場合はIDを含める
                if (!isNew) {
                    saveData.id = id
                }

                const { error } = await supabase
                    .from('quizzes')
                    .upsert(saveData) // まとめたデータを渡す

                if (error) throw error

                alert(isNew ? "クイズを作成しました！" : "クイズを更新しました！")
                router.push("/admin/dashboard")
                router.refresh()
            } catch (error) {
                console.error("Save error:", error)
                alert("保存に失敗しました。詳細はコンソールを確認してください。")
            } finally {
                setLoading(false)
            }
        }

    if (fetching) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background p-4 md:p-8 pb-24">
            <div className="max-w-2xl mx-auto space-y-6">
                <div className="flex items-center gap-4 bg-card p-4 rounded-2xl shadow-sm border border-subtle/10 sticky top-4 z-10 backdrop-blur-md bg-card/80">
                    <Button variant="ghost" size="sm" onClick={() => router.back()} className="h-9 w-9 p-0 rounded-full">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <h1 className="text-xl font-bold">{isNew ? "新規作成" : "問題の編集"}</h1>
                </div>

                <form onSubmit={handleSave}>
                    <Card className="border-none shadow-md">
                        <CardContent className="space-y-6 pt-6">

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-foreground">
                                    問題文 <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    className="flex min-h-[120px] w-full rounded-md border border-subtle/20 bg-background px-3 py-2 text-base ring-offset-background placeholder:text-subtle/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 resize-y"
                                    placeholder="ここに問題を入力..."
                                    value={formData.question_text || ""}
                                    onChange={e => setFormData({ ...formData, question_text: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="space-y-4">
                                <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                                    <label className="text-sm font-bold text-primary flex items-center gap-2 mb-2">
                                        正解の選択肢 <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full">必須</span>
                                    </label>
                                    <input
                                        className="flex h-12 w-full rounded-md border border-primary/20 bg-background px-3 py-2 text-base shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="正解を入力"
                                        value={formData.choice_1 || ""}
                                        onChange={e => setFormData({ ...formData, choice_1: e.target.value })}
                                        required
                                    />
                                    <p className="text-xs text-subtle mt-1">※実際のクイズ画面ではランダムに配置されます</p>
                                </div>

                                {["choice_2", "choice_3", "choice_4"].map((key, index) => (
                                    <div key={key} className="space-y-2">
                                        <label className="text-sm font-medium text-foreground">
                                            誤答の選択肢 {index + 1}
                                        </label>
                                        <input
                                            className="flex h-12 w-full rounded-md border border-subtle/20 bg-background px-3 py-2 text-base shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                                            placeholder={`間違いの選択肢 ${index + 1}`}
                                            value={(formData as any)[key] || ""}
                                            onChange={e => setFormData({ ...formData, [key]: e.target.value })}
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-2 pt-4 border-t border-subtle/10">
                                <label className="text-sm font-bold text-foreground">
                                    解説
                                </label>
                                <textarea
                                    className="flex min-h-[100px] w-full rounded-md border border-subtle/20 bg-background px-3 py-2 text-base ring-offset-background placeholder:text-subtle/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 resize-y"
                                    placeholder="回答後の解説を入力..."
                                    value={formData.explanation || ""}
                                    onChange={e => setFormData({ ...formData, explanation: e.target.value })}
                                />
                            </div>

                        </CardContent>
                        <CardFooter className="flex gap-3 pt-2 pb-6 px-6">
                            <Button type="submit" size="lg" className="flex-1 h-12 text-lg shadow-lg shadow-primary/20" disabled={loading}>
                                <Save className="w-5 h-5 mr-2" />
                                {loading ? "保存中..." : "保存する"}
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </div>
    )
}