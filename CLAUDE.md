# Python ペアドリル

Python3エンジニア認定基礎試験向け、4択クイズ形式の静的スマホアプリ。

## 次セッション着手用
- 現在地: README ポートフォリオ刷新・スクショ6枚(スマホ枠)・APIキー管理堅牢化・PWA強化(SW+ホーム追加導線) を完了し main にマージ・デプロイ済み
- 次アクション: PWA の UX フィードバック反映（バナー文言/表示タイミング/再表示頻度、iOS手順のアイコン化、「更新あり」通知の要否）
- 参照ファイル: `pwa.js`（ホーム追加導線）/ `sw.js`（network-first キャッシュ）/ `style.css` の `.a2hs-banner` / `scripts/frame_screenshots.py`（スクショ再生成）
- 未解決 / 別扱い: PWA UX 調整は実機評価待ち。既存ユーザーは初回のみハード更新が要る場合あり（以後 SW が更新を吸収）
- 最終更新: 2026-05-30

## 技術スタック

- 純粋な静的サイト（HTML / CSS / JavaScript）
- ビルド工程なし
- GitHub Pages でホスティング
- localStorage で履歴・統計を端末保存
- PWA 対応（`manifest.json` + Service Worker `sw.js` で network-first オフライン対応、`pwa.js` でホーム画面追加の導線）

## 主要エントリポイント

- `index.html` — トップ画面（カテゴリ選択・出題開始）
- `app.js` — メインのクイズロジック
- `questions.js` — 問題データ（`QUESTIONS` 配列）

## 開発コマンド

ビルド不要。`index.html` をブラウザで直接開くだけ。

詳細は `README.md` を参照。

## ディレクトリ構造

```
index.html        メイン画面
exam.html         模擬試験モード
logic.html        論理問題モード
assistant.html    AI アシスタント
style.css
app.js / exam.js / logic.js / assistant.js
questions.js / logic-questions.js / concepts.js  問題データ
mock-exams/       模擬試験データ (JSON)
sw.js             Service Worker（network-first・オフライン対応）
pwa.js            SW登録 + ホーム画面追加の導線
manifest.json     PWA マニフェスト
robots.txt / .nojekyll
scripts/          ツール（frame_screenshots.py: スクショにスマホ枠を焼き込み）
docs/screenshots/ README用スクリーンショット（raw/ が素材、正本はフレーム済み）
```

## このプロジェクト固有の作業ルール

- 問題追加・編集は `questions.js` の `QUESTIONS` 配列に対して行う
- 問題の `id` は localStorage の統計キーになるため、**重複不可・既存IDは変更禁止**（既存ユーザーの統計が壊れる）
- 模擬試験データは `mock-exams/*.json` を編集する。個人の回答記録は含めない（直近コミット `dde650b` で除去済み）
- 動作確認はブラウザで `index.html` を直接開いて行う。dev サーバなし
- 問題データの `correct` は実行時にシャッフルされるため、配列の何番目に正解を置いても問題ない

## 関連ドキュメント

- 概要: `docs/01-overview.md`
- 設計判断（ADR）: `docs/decisions/`
- 利用者向け説明: `README.md`
