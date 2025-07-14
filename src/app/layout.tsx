import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '2025年今期アニメ一覧',
  description: '現在放送中のアニメ作品を検索・フィルタリングできるWebアプリケーション。ジャンル、形態、放送曜日で絞り込み可能。',
  keywords: 'アニメ, 今期アニメ, アニメ一覧, 検索, フィルター, 2025年',
  authors: [{ name: 'hikari-kato' }],
  openGraph: {
    title: '2025年今期アニメ一覧',
    description: '現在放送中のアニメ作品を検索・フィルタリングできるWebアプリケーション',
    url: 'https://anime-list-7jfs.vercel.app/',
    siteName: '今期アニメ一覧',
    images: [
      {
        url: '/og_image.png',
        width: 1200,
        height: 630,
        alt: '2025年今期アニメ一覧 - アニメ検索・フィルタリングアプリ',
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '2025年今期アニメ一覧',
    description: '現在放送中のアニメ作品を検索・フィルタリングできるWebアプリケーション',
    images: ['/og_image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#3b82f6',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>{children}</body>
    </html>
  )
}