// 各問題の難易度と誤答癖タグ。出題ロジックの判断材料。
// concepts は東城さんの3模擬の誤答パターン分析から導出した7分類:
//   guess           : 単語の意味から名前を推測してしまう
//   word-order      : 語順を「読みやすい英語」に直したくなる
//   nonexistent     : 存在しない選択肢を「ありそう」と選ぶ
//   boundary        : ループ最終周回・raise後・スコープ脱出後を追えない
//   pair-confusion  : 対になる用語のペアを取り違える
//   implicit-rule   : 暗黙のルールを見落とす
//   string-regex    : 文字列リテラル・正規表現の細部
'use strict';

const CONCEPT_LABELS = {
  'guess':          '推測しがち',
  'word-order':     '語順',
  'nonexistent':    '存在しない値',
  'boundary':       '境界追跡',
  'pair-confusion': '対の取り違え',
  'implicit-rule':  '暗黙ルール',
  'string-regex':   '文字列・正規表現',
};

const QUESTION_META = {
  // 辞書
  'dict-keys':         { difficulty: 'easy',   concepts: ['pair-confusion'] },
  'dict-values':       { difficulty: 'easy',   concepts: ['pair-confusion'] },
  'dict-items':        { difficulty: 'easy',   concepts: ['pair-confusion'] },
  'dict-key-type':     { difficulty: 'medium', concepts: ['implicit-rule'] },
  'dict-empty':        { difficulty: 'medium', concepts: ['nonexistent'] },
  'dict-loop-key':     { difficulty: 'medium', concepts: ['implicit-rule'] },
  'dict-comp':         { difficulty: 'hard',   concepts: ['implicit-rule'] },

  // イテレーション
  'iter-zip':          { difficulty: 'easy',   concepts: ['pair-confusion'] },
  'iter-enum':         { difficulty: 'easy',   concepts: ['pair-confusion'] },
  'iter-zip-list':     { difficulty: 'medium', concepts: ['implicit-rule'] },
  'iter-unpack':       { difficulty: 'medium', concepts: ['implicit-rule'] },
  'ctrl-loop-index-err':{ difficulty: 'hard',  concepts: ['boundary'] },

  // 関数引数
  'arg-args':          { difficulty: 'easy',   concepts: ['pair-confusion'] },
  'arg-kwargs':        { difficulty: 'easy',   concepts: ['pair-confusion'] },
  'arg-order':         { difficulty: 'medium', concepts: ['word-order'] },
  'arg-default':       { difficulty: 'hard',   concepts: ['implicit-rule'] },
  'func-default-shared':{ difficulty: 'hard',  concepts: ['implicit-rule', 'boundary'] },

  // 標準ライブラリ
  'lib-dir':           { difficulty: 'medium', concepts: ['pair-confusion'] },
  'lib-help':          { difficulty: 'medium', concepts: ['pair-confusion'] },
  'lib-exit':          { difficulty: 'medium', concepts: ['guess'] },
  'lib-argv':          { difficulty: 'medium', concepts: ['guess'] },
  'lib-smtplib':       { difficulty: 'medium', concepts: ['pair-confusion'] },
  'lib-poplib':        { difficulty: 'medium', concepts: ['pair-confusion'] },
  'lib-pack':          { difficulty: 'medium', concepts: ['pair-confusion'] },
  'lib-unpack':        { difficulty: 'medium', concepts: ['pair-confusion'] },
  'lib-rand-choice':   { difficulty: 'medium', concepts: ['pair-confusion'] },
  'lib-rand-sample':   { difficulty: 'medium', concepts: ['pair-confusion'] },
  'lib-rand-random':   { difficulty: 'medium', concepts: ['implicit-rule'] },
  'lib-logging':       { difficulty: 'medium', concepts: ['implicit-rule'] },
  'lib-timeit':        { difficulty: 'medium', concepts: ['pair-confusion'] },
  'lib-stat-mean':     { difficulty: 'medium', concepts: ['guess', 'pair-confusion'] },
  'lib-urlopen':       { difficulty: 'medium', concepts: ['guess'] },
  'lib-datetime-now':  { difficulty: 'medium', concepts: ['guess'] },
  'lib-template-sub':  { difficulty: 'hard',   concepts: ['implicit-rule'] },

  // パッケージ・仮想環境
  'pkg-freeze':        { difficulty: 'easy',   concepts: ['guess'] },
  'pkg-upgrade':       { difficulty: 'medium', concepts: ['implicit-rule'] },
  'pkg-install-r':     { difficulty: 'easy',   concepts: ['guess'] },
  'pkg-venv':          { difficulty: 'medium', concepts: ['guess'] },

  // モジュール
  'mod-name-main':     { difficulty: 'medium', concepts: ['nonexistent'] },
  'mod-search-path':   { difficulty: 'medium', concepts: ['nonexistent'] },
  'syn-fromimport':    { difficulty: 'easy',   concepts: ['word-order'] },

  // 構文
  'syn-self':          { difficulty: 'medium', concepts: ['implicit-rule'] },
  'syn-tuple1':        { difficulty: 'medium', concepts: ['implicit-rule'] },
  'syn-triple':        { difficulty: 'easy',   concepts: ['implicit-rule'] },
  'syn-implicit':      { difficulty: 'hard',   concepts: ['implicit-rule', 'string-regex'] },
  'syn-nonlocal':      { difficulty: 'medium', concepts: ['pair-confusion'] },
  'syn-lambda':        { difficulty: 'hard',   concepts: ['implicit-rule'] },
  'anno-arrow':        { difficulty: 'easy',   concepts: ['nonexistent'] },
  'anno-no-check':     { difficulty: 'medium', concepts: ['implicit-rule'] },

  // データ型
  'type-mutable':      { difficulty: 'medium', concepts: ['pair-confusion'] },
  'type-append':       { difficulty: 'easy',   concepts: ['pair-confusion'] },
  'type-extend':       { difficulty: 'easy',   concepts: ['pair-confusion'] },
  'type-sort':         { difficulty: 'medium', concepts: ['pair-confusion'] },
  'type-sorted':       { difficulty: 'medium', concepts: ['pair-confusion'] },
  'tuple-inner-mutable':{ difficulty: 'hard',  concepts: ['implicit-rule'] },
  'list-count-quote':  { difficulty: 'medium', concepts: ['implicit-rule'] },

  // 入出力
  'io-open':           { difficulty: 'easy',   concepts: ['guess'] },

  // クラス
  'cls-super':         { difficulty: 'hard',   concepts: ['pair-confusion', 'implicit-rule'] },
  'cls-self-vs-local': { difficulty: 'hard',   concepts: ['implicit-rule', 'boundary'] },

  // 正規表現
  'regex-star':        { difficulty: 'medium', concepts: ['string-regex'] },
  'regex-plus':        { difficulty: 'medium', concepts: ['string-regex'] },
  'regex-question':    { difficulty: 'medium', concepts: ['string-regex'] },
  'regex-boundary':    { difficulty: 'medium', concepts: ['string-regex'] },
  'regex-digit':       { difficulty: 'medium', concepts: ['string-regex'] },

  // PEP8
  'pep-class':         { difficulty: 'easy',   concepts: ['guess', 'pair-confusion'] },
  'pep-func':          { difficulty: 'easy',   concepts: ['guess', 'pair-confusion'] },

  // インタープリタ
  'int-interp':        { difficulty: 'easy',   concepts: ['pair-confusion'] },
  'int-history':       { difficulty: 'medium', concepts: ['nonexistent'] },
  'int-tab':           { difficulty: 'easy',   concepts: ['nonexistent'] },
  'int-operator':      { difficulty: 'medium', concepts: ['pair-confusion'] },
  'int-operand':       { difficulty: 'medium', concepts: ['pair-confusion'] },
  'int-c-option':      { difficulty: 'medium', concepts: ['guess'] },
  'int-repl-start':    { difficulty: 'easy',   concepts: ['guess'] },
  'int-quit':          { difficulty: 'easy',   concepts: ['guess', 'pair-confusion'] },
  'int-eof-unix':      { difficulty: 'easy',   concepts: ['guess'] },
  'int-eof-windows':   { difficulty: 'easy',   concepts: ['guess'] },
  'int-i-option':      { difficulty: 'medium', concepts: ['guess'] },
  'int-m-option':      { difficulty: 'medium', concepts: ['guess'] },
  'int-prompt-primary':{ difficulty: 'easy',   concepts: ['nonexistent'] },
  'int-prompt-secondary':{ difficulty: 'easy', concepts: ['nonexistent'] },
  'int-prompt-meaning':{ difficulty: 'easy',   concepts: ['implicit-rule'] },
  'int-encoding-default':{ difficulty: 'easy', concepts: ['guess'] },
  'int-encoding-position':{ difficulty: 'medium', concepts: ['implicit-rule'] },
  'int-underscore':    { difficulty: 'medium', concepts: ['implicit-rule'] },
  'int-jupyter-kernel':{ difficulty: 'medium', concepts: ['pair-confusion'] },
  'int-bpython':       { difficulty: 'medium', concepts: ['pair-confusion'] },

  // 例外
  'exc-order':         { difficulty: 'easy',   concepts: ['word-order'] },
  'exc-flow':          { difficulty: 'medium', concepts: ['implicit-rule'] },
  'exc-multiple':      { difficulty: 'medium', concepts: ['implicit-rule'] },
  'exc-raise':         { difficulty: 'easy',   concepts: ['word-order', 'guess'] },
  'exc-finally':       { difficulty: 'medium', concepts: ['implicit-rule'] },
  'exc-raise-skips':   { difficulty: 'hard',   concepts: ['boundary'] },
  'exc-args-tuple':    { difficulty: 'medium', concepts: ['implicit-rule'] },
};

// デフォルト値（meta が無い問題用）
function getMeta(qid) {
  return QUESTION_META[qid] || { difficulty: 'medium', concepts: [] };
}
