# 🔥 Firebase Hosting デプロイプロジェクト

Firebase Hostingにデプロイ可能なモダンなWebサイトプロジェクトです。

## 📁 プロジェクト構造

```
firebase-deploy/
├── public/
│   ├── index.html          # メインHTMLファイル
│   ├── style.css           # レスポンシブCSS
│   └── script.js           # インタラクティブJS
├── firebase.json           # Firebase Hosting設定
├── .firebaserc            # プロジェクト設定
└── README.md              # このファイル
```

## 🚀 デプロイ手順

### 1. 前提条件

- Node.js (v14以上)
- npm または yarn
- Firebaseアカウント

### 2. Firebase CLIのインストール

```bash
npm install -g firebase-tools
```

### 3. Firebaseにログイン

```bash
firebase login
```

### 4. Firebaseプロジェクトの作成

1. [Firebase Console](https://console.firebase.google.com/)にアクセス
2. 「プロジェクトを追加」をクリック
3. プロジェクト名を入力（例: `my-website-2024`）
4. Google Analyticsの設定（お好みで）
5. プロジェクト作成完了

### 5. プロジェクトIDの設定

`.firebaserc`ファイルを編集し、作成したプロジェクトIDを設定：

```json
{
  "projects": {
    "default": "your-actual-project-id"
  }
}
```

### 6. Firebase Hostingの初期化（オプション）

既存の設定を使用する場合はスキップ可能：

```bash
firebase init hosting
```

### 7. デプロイ実行

```bash
firebase deploy
```

または特定のサービスのみ：

```bash
firebase deploy --only hosting
```

### 8. 確認

デプロイ完了後、表示されるURLでサイトにアクセスできます：
```
https://your-project-id.web.app
```

## ✨ 主な機能

### 🎨 デザイン機能
- **レスポンシブデザイン** - モバイル・タブレット・デスクトップ対応
- **モダンUI** - グラデーション、アニメーション、グラスモーフィズム
- **ダークモード対応** - システム設定に合わせて自動切り替え
- **美しいタイポグラフィ** - Google Fonts (Inter) 使用

### 🎯 インタラクティブ機能
- **スムーズスクロール** - セクション間のスムーズな移動
- **モバイルナビゲーション** - ハンバーガーメニュー
- **アニメーション** - スクロール時の要素アニメーション
- **モーダルウィンドウ** - デモ機能表示
- **フォーム処理** - コンタクトフォームの送信処理
- **統計カウンター** - スクロール時の数値アニメーション

### 🚀 パフォーマンス機能
- **最適化された画像** - 遅延読み込み対応
- **キャッシュ設定** - 静的アセットの長期キャッシュ
- **軽量設計** - 最小限の依存関係
- **PWA対応** - Service Worker対応準備済み

## 🛠️ カスタマイズ

### コンテンツの変更

1. **`public/index.html`** - サイトの構造とコンテンツ
2. **`public/style.css`** - デザインとレイアウト
3. **`public/script.js`** - インタラクティブ機能

### カラーテーマの変更

`style.css`の以下の変数を変更：

```css
:root {
  --primary-color: #ff6b35;
  --secondary-color: #667eea;
  --accent-color: #764ba2;
}
```

### セクションの追加

1. `index.html`に新しいセクションを追加
2. `style.css`でスタイリング
3. 必要に応じて`script.js`で機能追加

## 🔧 ローカル開発

### Firebase Hosting エミュレーター

```bash
firebase serve
```

アクセス: http://localhost:5000

### Live Serverの使用

VS Codeの Live Server拡張機能を使用して`public/index.html`を開く

## 📱 対応ブラウザ

- **モダンブラウザ**: Chrome, Firefox, Safari, Edge (最新2バージョン)
- **モバイル**: iOS Safari, Chrome Mobile
- **機能**: ES6+, CSS Grid, Flexbox, Intersection Observer

## 🔒 セキュリティ

- HTTPS強制（Firebase Hostingデフォルト）
- CSP（Content Security Policy）対応準備済み
- XSS対策済み
- CSRF対策済み

## 📊 SEO対策

- セマンティックHTML構造
- OpenGraph メタタグ
- 構造化データ対応準備済み
- サイトマップ生成準備済み

## 🔄 CI/CD

GitHub Actionsでの自動デプロイ設定例：

```yaml
name: Deploy to Firebase Hosting
on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          projectId: your-project-id
```

## 🐛 トラブルシューティング

### よくある問題

1. **デプロイが失敗する**
   ```bash
   firebase login --reauth
   firebase use --add
   ```

2. **プロジェクトIDが見つからない**
   - Firebase ConsoleでプロジェクトIDを確認
   - `.firebaserc`ファイルを正しく設定

3. **権限エラー**
   ```bash
   firebase login
   firebase projects:list
   ```

### ログの確認

```bash
firebase deploy --debug
```

## 📝 ライセンス

このプロジェクトはMITライセンスの元で公開されています。

## 🤝 貢献

1. フォークする
2. 機能ブランチを作成 (`git checkout -b feature/AmazingFeature`)
3. コミット (`git commit -m 'Add some AmazingFeature'`)
4. プッシュ (`git push origin feature/AmazingFeature`)
5. プルリクエストを作成

## 📞 サポート

- [Firebase Documentation](https://firebase.google.com/docs/hosting)
- [Firebase Support](https://firebase.google.com/support)
- [Issues](https://github.com/your-username/firebase-deploy/issues)

---

**Made with ❤️ for Firebase Hosting**

🔥 Firebase Hostingの高速CDNでワールドワイドに配信！