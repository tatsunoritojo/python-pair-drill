# Python ペアドリル

Python3エンジニア認定基礎試験向け、4択クイズ形式の静的スマホアプリ。

## 技術スタック

- 純粋な静的サイト（HTML / CSS / JavaScript）
- ビルド工程なし
- GitHub Pages でホスティング
- localStorage で履歴・統計を端末保存
- PWA 対応（`manifest.json`）

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
manifest.json     PWA マニフェスト
robots.txt / .nojekyll
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
