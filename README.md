# 2025年今期アニメ一覧

現在放送中のアニメ作品を検索・フィルタリングできるWebアプリケーションです。

## 🌐 デモサイト

**[https://anime-list-7jfs.vercel.app/](https://anime-list-7jfs.vercel.app/)**

実際のアプリケーションをお試しいただけます。

## 機能

### 📺 アニメ一覧表示
- 今期放送中のアニメを一覧表示
- レスポンシブデザイン対応
- アニメ画像、タイトル、基本情報を表示

### 🔍 検索・フィルタリング機能
- **タイトル検索**: アニメタイトルでの部分一致検索
- **ジャンル絞り込み**: アクション、コメディ、ドラマなど主要ジャンル
- **形態絞り込み**: TV、映画、スペシャル、オンライン
- **放送曜日絞り込み**: 月曜日〜日曜日での絞り込み
- **評価ソート**: 評価の高い順・低い順でソート

### 🌐 公式サイトリンク
- 各アニメの公式サイトへ直接アクセス可能
- ワンクリックで新しいタブで開く

### 🎨 UI/UX
- 日本語表記対応（曜日、ジャンル、形態）
- カードベースのモダンなデザイン
- 直感的な操作性

## 技術スタック

- **フレームワーク**: Next.js 15
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **API**: Jikan API (MyAnimeList非公式API)
- **デプロイ**: Vercel対応

## データソース

- **Jikan API**: MyAnimeListの非公式REST API
- OVA作品は除外
- レート制限: 30リクエスト/分、2リクエスト/秒
- キャッシュ機能により効率的なデータ取得

## 開発・実行方法

### 必要な環境
- Node.js 18以上
- npm または yarn

### セットアップ

```bash
# リポジトリをクローン
git clone https://github.com/hikari-kato/anime-list.git
cd anime-list

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

ブラウザで http://localhost:3000 を開いてアプリケーションにアクセスできます。

### ビルド

```bash
# プロダクション用ビルド
npm run build

# プロダクションサーバーを起動
npm start
```

## プロジェクト構成

```
src/
├── app/                 # Next.js App Router
│   ├── globals.css     # グローバルスタイル
│   ├── layout.tsx      # レイアウトコンポーネント
│   └── page.tsx        # メインページ
├── components/         # Reactコンポーネント
│   ├── AnimeCard.tsx   # アニメカード表示
│   └── SearchBar.tsx   # 検索・フィルター
├── lib/               # ユーティリティ
│   └── jikan-api.ts   # Jikan API関連
└── types/             # TypeScript型定義
    └── anime.ts       # アニメデータ型
```

## 特徴

### セキュリティ
- 環境変数やAPIキー不要（公開APIのみ使用）
- 適切な.gitignore設定
- セキュリティベストプラクティス準拠

### パフォーマンス
- Next.js SSG/SSR最適化
- APIレスポンスキャッシュ
- レスポンシブ画像最適化

### アクセシビリティ
- セマンティックHTML
- キーボードナビゲーション対応
- スクリーンリーダー対応

## API利用について

このプロジェクトは[Jikan API](https://jikan.moe/)を使用しています：
- 無料で利用可能
- 認証不要
- レート制限あり（30リクエスト/分）
- 商用・個人利用ともに可能

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 開発履歴

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

---

**作成者**: hikari-kato  
**GitHub**: https://github.com/hikari-kato/anime-list  
**Last Updated**: 2025年1月