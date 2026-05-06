"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { BrainCircuit, Settings } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-background via-subtle/5 to-primary/5">

      {/* Admin Link */}
      <div className="absolute top-4 right-4">
        <Link href="/admin">
          <Button variant="ghost" size="sm" className="opacity-50 hover:opacity-100">
            <Settings className="w-4 h-4 mr-2" />
            管理者
          </Button>
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md border-none shadow-2xl bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4 pt-12 pb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="mx-auto bg-primary/10 p-4 rounded-full w-24 h-24 flex items-center justify-center text-primary"
            >
              <BrainCircuit className="w-12 h-12" />
            </motion.div>
            <CardTitle className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Endless Quiz
            </CardTitle>
            <p className="text-subtle text-lg">
              無限に広がる知識の旅へ
            </p>
          </CardHeader>

          <CardContent className="flex flex-col gap-4 pb-12 px-8">
            <Link href="/quiz" className="w-full">
              <Button size="xl" className="w-full text-xl shadow-primary/30 h-16 rounded-2xl">
                クイズを開始
              </Button>
            </Link>

            <p className="text-center text-sm text-subtle/60 mt-4">
              ログイン不要・完全無料
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
