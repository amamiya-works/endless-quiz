"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Trophy, RefreshCw, Home } from "lucide-react"
import { Suspense } from "react"

function ResultContent() {
    const searchParams = useSearchParams()
    const correct = Number(searchParams.get("correct") || "0")
    const total = Number(searchParams.get("total") || "0")

    const percentage = total > 0 ? Math.round((correct / total) * 100) : 0

    let message = "お疲れ様でした！"
    let color = "text-foreground"

    if (percentage === 100 && total > 0) {
        message = "完璧です！素晴らしい！"
        color = "text-yellow-500"
    } else if (percentage >= 80) {
        message = "素晴らしい成績です！"
        color = "text-primary"
    } else if (percentage >= 60) {
        message = "良い調子です！"
        color = "text-accent"
    } else {
        message = "次はもっと行けるはず！"
        color = "text-subtle"
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <Card className="text-center border-none shadow-2xl">
                    <CardHeader className="pt-12">
                        <motion.div
                            initial={{ rotate: -180, scale: 0 }}
                            animate={{ rotate: 0, scale: 1 }}
                            transition={{ delay: 0.3, type: "spring" }}
                            className="mx-auto bg-primary/10 p-6 rounded-full inline-flex mb-4"
                        >
                            <Trophy className="w-16 h-16 text-yellow-500" />
                        </motion.div>
                        <CardTitle className="text-3xl font-bold">結果発表</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-8 pb-12">
                        <div>
                            <p className="text-sm text-subtle uppercase tracking-wider mb-2">SCORE</p>
                            <div className="flex justify-center items-end gap-2 text-foreground">
                                <span className="text-6xl font-black tracking-tighter">
                                    {percentage}
                                </span>
                                <span className="text-2xl font-bold mb-2">%</span>
                            </div>
                            <p className="text-subtle mt-2 font-medium">
                                {total}問中 {correct}問正解
                            </p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className={`text-xl font-bold ${color}`}
                        >
                            {message}
                        </motion.div>

                        <div className="flex flex-col gap-3">
                            <Link href="/quiz" className="w-full">
                                <Button size="lg" className="w-full h-14 text-lg">
                                    <RefreshCw className="mr-2 w-5 h-5" />
                                    もう一度挑戦
                                </Button>
                            </Link>
                            <Link href="/" className="w-full">
                                <Button variant="ghost" size="lg" className="w-full">
                                    <Home className="mr-2 w-5 h-5" />
                                    トップに戻る
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}

export default function ResultPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <ResultContent />
        </Suspense>
    )
}
