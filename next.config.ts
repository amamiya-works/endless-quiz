import type { NextConfig } from "next";

// 【改善内容】poweredByHeaderをfalseに設定
// 【改善理由】デフォルトでは"X-Powered-By: Next.js"というヘッダーが
//             レスポンスに付与され、使用技術が外部に公開される。
//             無効化することでセキュリティ情報の不要な開示を防ぐ。
const nextConfig: NextConfig = {
    poweredByHeader: false,
};

export default nextConfig;