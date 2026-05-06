# Endless Quiz

サーバーレス・フルスタック・クイズプラットフォーム。
運用コストゼロで「一生続く」体験を実現する。

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Database%2FAuth-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel)](https://vercel.com/)

**Live Demo:** https://endless-quiz-portfolio.vercel.app

| ロール | メールアドレス | パスワード |
| :--- | :--- | :--- |
| 管理者 | demo@example.com | demo1234 |

---

## 概要

無料枠の「サーバー休止」という技術的制約を逆手に取り、
利用者が自ら復旧できる仕組みを導入した。

「開発者の運用コストをゼロにしつつ、ユーザー体験を損なわない」という、
実用性とホスピタリティの両立を目指したプロジェクト。

---

## 主要機能

### プレイヤー機能

- **非重複ランダム出題:** 全問解き終わるまで同じ問題を出さない高度なフィルタリング。
- **動的リザルト計算:** 正解率をリアルタイム算出し、URLパラメータ経由で結果画面へ引き継ぎ。
- **Trophy UI:** 全問クリア時のみ現れる特別な達成感演出。

### 管理者機能

- **セキュア・ダッシュボード:** GUIによるクイズのCRUD操作。
- **下書き(Draft)機能:** 公開フラグ制御による、安全なコンテンツ管理。

---

## 技術スタック

| 区分 | 技術 | 選定理由 |
| :--- | :--- | :--- |
| Frontend | Next.js 16 (App Router) | RSCによる初期表示の高速化 |
| Database | Supabase (PostgreSQL) | RLSによる堅牢なアクセス制御とスケーラビリティ |
| Auth | Supabase Auth / SSR | Cookieベースのセキュアな認証。SSR側との完全同期 |
| Styling | Tailwind CSS v4 | 最新エンジンの高速ビルドとCSS-firstな柔軟な設計 |
| Animation | Framer Motion | 状態変化に合わせた心地よいUI演出の実装 |
| Infra | Vercel / GitHub | 環境変数による本番・展示用の完全分離運用 |

---

## 技術的な課題と解決

### 認証とミドルウェアの完全同期

一般的な実装ではサーバー側の認証検知にラグが生じ、不要なローディングが発生しがちという課題があった。
`@supabase/ssr` を導入しCookie管理を徹底。`getUser()` による毎回のサーバー問い合わせで、
セッション改ざん・なりすましに対して堅牢な認証基盤を構築した。

### サーバー休止検知 & オンデマンド起動

無料プランによる「1週間でのDB停止」は、一般ユーザーには「故障」に見えてしまうという課題があった。
通信エラーを詳細に解析しサーバーの休止状態を特定するロジックを実装。
利用者を困惑させない「サーバーを起こす」ボタン（コーヒーアイコン）を提供し、
Vercel側から秘密のトークンを用いてSupabase Management APIを叩くことで、
ユーザー操作のみで安全にサーバーを再起動させる仕組みを実装した。

### 1ソース・2データベースの環境分離設計

実運用している環境をポートフォリオ公開用に壊したくないという課題があった。
1つのリポジトリを保ちつつ、Vercelの環境変数を切り替えることで「実運用機」と「展示用機」を完全分離。
プロの開発現場と同じ「環境分離」の概念を個人開発に持ち込んだ。

---

## コード品質の改善

本番運用前にコードレビューを実施し、以下の問題を特定・修正した。

**セキュリティ修正**

| 対象 | 修正内容 |
| :--- | :--- |
| `api/wake/route.ts` | Wake APIに `CRON_SECRET` による簡易認証を追加。第三者によるSupabase Management API無制限呼び出しを防止 |
| `middleware.ts` | 認証確認を `getSession()` から `getUser()` に変更。エッジ環境でのセッション改ざん・なりすましに対して堅牢化 |
| `lib/supabase.ts` | 環境変数の未設定時に原因が明確なエラーを出す明示的チェックを追加 |

**コード整理**

| 対象 | 修正内容 |
| :--- | :--- |
| `lib/mockData.ts` | デッドコードを削除。誤用・情報漏洩リスクを排除 |
| `app/quiz/page.tsx` | エラー判定ロジックの条件を整理し、サーバー休止の誤検知を低減 |
| `next.config.ts` | `poweredByHeader: false` を追加。使用技術の不要な外部開示を防止 |

---

## AI活用について

設計・開発フェーズで LLM（主に Claude）を以下の用途で使用した。

| 用途 | 具体的な内容 |
| :--- | :--- |
| 設計レビュー | 認証とMiddlewareの同期ロジックにおけるエッジケースの洗い出し |
| コードレビュー | セキュリティ問題・未使用コードの洗い出しと修正方針の確認 |
| 高速プロトタイピング | ランダム出題アルゴリズムの初案生成と最適化 |

コードの自動生成には留まらず、意思決定の高速化と見落としの防止が主な活用目的。
実装・デバッグ・本番確認はすべて自分で実施している。

---

## ローカル起動

```bash
git clone https://github.com/amamiya-works/endless-quiz.git
cd endless-quiz
npm install
cp .env.example .env.local
npm run dev
```

### 必要な環境変数

| 変数名 | 説明 |
| :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | SupabaseプロジェクトのURL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabaseの公開キー |
| `SUPABASE_PROJECT_REF` | SupabaseプロジェクトのRef ID |
| `SUPABASE_ACCESS_TOKEN` | Supabase Management APIトークン |
| `CRON_SECRET` | Wake APIの簡易認証トークン |
| `NEXT_PUBLIC_CRON_SECRET` | フロントエンドからWake APIを叩くためのトークン |
