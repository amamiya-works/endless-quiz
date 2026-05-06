"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/Card"
import { Plus, Edit2, Trash2, LogOut, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import type { Database } from "@/types/supabase"

type Quiz = Database['public']['Tables']['quizzes']['Row']

export default function AdminDashboard() {
    const router = useRouter()
    const [quizzes, setQuizzes] = useState<Quiz[]>([])
    const [loading, setLoading] = useState(true)

    // クイズ一覧を取得する関数
    const fetchQuizzes = useCallback(async () => {
        setLoading(true)
        try {
            // 作成日時が新しい順に全件取得
            const { data, error } = await supabase
                .from('quizzes')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error
            setQuizzes(data || [])
        } catch (error) {
            console.error("Error fetching quizzes:", error)
            alert("データの取得に失敗しました")
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchQuizzes()
    }, [fetchQuizzes])

    // クイズを削除する関数
    const handleDelete = async (id: string) => {
        if (!confirm("本当にこの問題を削除しますか？")) return

        try {
            const { error } = await supabase
                .from('quizzes')
                .delete()
                .eq('id', id)

            if (error) throw error
            
            // 削除に成功したら一覧を更新
            setQuizzes(prev => prev.filter(q => q.id !== id))
            alert("削除しました")
        } catch (error) {
            console.error("Error deleting quiz:", error)
            alert("削除に失敗しました")
        }
    }

    return (
        <div className="min-h-screen bg-background p-4 md:p-8 pb-24">
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex justify-between items-center bg-card p-4 rounded-2xl shadow-sm border border-subtle/10 sticky top-4 z-10 backdrop-blur-md bg-card/80">
                    <h1 className="text-xl font-bold">問題管理 ({quizzes.length}問)</h1>
                    <Button variant="ghost" size="sm" onClick={() => router.push("/")} className="text-subtle">
                        <LogOut className="w-4 h-4" />
                    </Button>
                </div>

                {loading ? (
                    <div className="flex justify-center py-12">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {quizzes.map((quiz) => (
                            <Card key={quiz.id} className="border-l-4 border-l-primary shadow-sm hover:shadow-md transition-shadow">
                                <CardContent className="p-4 flex items-center justify-between gap-4">
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-foreground truncate">
                                            {quiz.question_text}
                                        </p>
                                        <div className="flex gap-2 mt-1">
                                            <span className="text-xs text-subtle truncate">
                                                正解: {quiz.choice_1}
                                            </span>
                                            {!quiz.is_published && (
                                                <span className="text-[10px] bg-subtle/10 text-subtle px-1.5 rounded uppercase font-bold">
                                                    Draft
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Link href={`/admin/editor/${quiz.id}`}>
                                            <Button variant="outline" size="sm" className="h-9 w-9 p-0 rounded-full">
                                                <Edit2 className="w-4 h-4" />
                                            </Button>
                                        </Link>
                                        <Button 
                                            variant="ghost" 
                                            size="sm" 
                                            onClick={() => handleDelete(quiz.id)}
                                            className="h-9 w-9 p-0 rounded-full text-red-600 hover:bg-red-50 hover:text-red-700"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Floating Action Button */}
                <Link href="/admin/editor/new">
                    <Button
                        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg shadow-primary/40 p-0"
                        size="xl"
                    >
                        <Plus className="w-8 h-8" />
                    </Button>
                </Link>
            </div>
        </div>
    )
}