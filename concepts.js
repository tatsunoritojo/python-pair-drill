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
  'int-mode-trigger':  { difficulty: 'easy',   concepts: ['pair-confusion'] },
  'int-argv-zero':     { difficulty: 'medium', concepts: ['implicit-rule', 'boundary'] },
  'int-argv-zero-special':{ difficulty: 'hard',concepts: ['boundary', 'pair-confusion'] },

  // 例外
  'exc-order':         { difficulty: 'easy',   concepts: ['word-order'] },
  'exc-flow':          { difficulty: 'medium', concepts: ['implicit-rule'] },
  'exc-multiple':      { difficulty: 'medium', concepts: ['implicit-rule'] },
  'exc-raise':         { difficulty: 'easy',   concepts: ['word-order', 'guess'] },
  'exc-finally':       { difficulty: 'medium', concepts: ['implicit-rule'] },
  'exc-raise-skips':   { difficulty: 'hard',   concepts: ['boundary'] },
  'exc-args-tuple':    { difficulty: 'medium', concepts: ['implicit-rule'] },

  // 模4ベースの追加問題
  'ctrl-continue-break': { difficulty: 'easy',   concepts: ['pair-confusion'] },
  'syn-docstring-firstline': { difficulty: 'medium', concepts: ['implicit-rule'] },
  'tuple-unpack':      { difficulty: 'medium', concepts: ['boundary'] },
  'dict-key-error':    { difficulty: 'easy',   concepts: ['implicit-rule'] },
  'exc-syntax-caret':  { difficulty: 'easy',   concepts: ['nonexistent'] },
  'exc-multiple-firstmatch': { difficulty: 'medium', concepts: ['implicit-rule'] },
  'cls-isinstance':    { difficulty: 'medium', concepts: ['pair-confusion'] },
  'cls-issubclass':    { difficulty: 'medium', concepts: ['pair-confusion'] },
  'regex-or':          { difficulty: 'easy',   concepts: ['string-regex', 'guess'] },
  'lib-bisect':        { difficulty: 'medium', concepts: ['pair-confusion'] },
  'pkg-list':          { difficulty: 'easy',   concepts: ['guess', 'pair-confusion'] },

  // 自己チェックで追加（模1-4の不正解論点の漏れ補完）
  'tuple-args-count':         { difficulty: 'medium', concepts: ['guess', 'implicit-rule'] },
  'mod-import-call-style':    { difficulty: 'medium', concepts: ['implicit-rule'] },
  'func-basic-call':          { difficulty: 'easy',   concepts: ['boundary'] },
  'py-indent':                { difficulty: 'easy',   concepts: ['guess'] },
  'iter-zip-transpose':       { difficulty: 'hard',   concepts: ['implicit-rule'] },
  'iter-comp-zip':            { difficulty: 'medium', concepts: ['word-order', 'implicit-rule'] },
  'type-collection-order':    { difficulty: 'medium', concepts: ['pair-confusion'] },
  'comment-mid-line':         { difficulty: 'easy',   concepts: ['implicit-rule'] },
  'str-immutable-assign':     { difficulty: 'medium', concepts: ['implicit-rule', 'boundary'] },
  'lib-dir-arg':              { difficulty: 'easy',   concepts: ['guess'] },
  'exc-name-error':           { difficulty: 'easy',   concepts: ['guess', 'pair-confusion'] },
  'cls-nested-scope':         { difficulty: 'hard',   concepts: ['boundary', 'implicit-rule'] },
  'lib-date-today':           { difficulty: 'medium', concepts: ['guess', 'pair-confusion'] },
  'lib-math-ceil-floor':      { difficulty: 'easy',   concepts: ['guess', 'pair-confusion'] },
  'lib-math-log':             { difficulty: 'medium', concepts: ['guess'] },
  'exc-raise-handler-flow':   { difficulty: 'medium', concepts: ['boundary', 'implicit-rule'] },
  'list-shallow-copy-inloop': { difficulty: 'hard',   concepts: ['boundary'] },

  // 試験本番で出た論点（次回受験向け）
  'str-zfill':         { difficulty: 'medium', concepts: ['implicit-rule', 'boundary'] },
  'str-zfill-int':     { difficulty: 'easy',   concepts: ['implicit-rule', 'pair-confusion'] },
  'lib-freeze-tool':   { difficulty: 'hard',   concepts: ['guess', 'pair-confusion'] },
  'ctrl-elif-else-diff': { difficulty: 'easy', concepts: ['pair-confusion'] },
  'ctrl-else-position':  { difficulty: 'easy', concepts: ['word-order'] },

  // 試験本番で出たクラス・urllib論点
  'cls-instance-isolation': { difficulty: 'hard', concepts: ['implicit-rule', 'boundary'] },
  'cls-class-var-shared':   { difficulty: 'hard', concepts: ['implicit-rule', 'pair-confusion'] },
  'cls-instance-vs-class-var': { difficulty: 'medium', concepts: ['pair-confusion'] },
  'lib-urllib-modules':     { difficulty: 'medium', concepts: ['pair-confusion', 'guess'] },
  'lib-urllib-parse':       { difficulty: 'medium', concepts: ['pair-confusion'] },

  // print の end 引数 / タプル形成（試験本番で出た基本概念）
  'print-end-arg':       { difficulty: 'easy',   concepts: ['guess', 'implicit-rule'] },
  'print-end-default':   { difficulty: 'easy',   concepts: ['implicit-rule'] },
  'print-end-loop':      { difficulty: 'medium', concepts: ['boundary'] },
  'tuple-no-comma':      { difficulty: 'easy',   concepts: ['implicit-rule'] },
  'tuple-single-paren':  { difficulty: 'medium', concepts: ['implicit-rule'] },

  // セクション4-9 50%台の補強
  // 4. 制御構造ツール
  'func-no-return':        { difficulty: 'easy',   concepts: ['implicit-rule'] },
  'syn-pass':              { difficulty: 'easy',   concepts: ['pair-confusion'] },
  'anno-storage':          { difficulty: 'medium', concepts: ['guess'] },
  'syn-lambda-limit':      { difficulty: 'medium', concepts: ['implicit-rule'] },
  'arg-positional-only':   { difficulty: 'hard',   concepts: ['implicit-rule', 'word-order'] },
  // 6. モジュール
  'mod-init-py':           { difficulty: 'easy',   concepts: ['implicit-rule'] },
  'mod-package-vs-module': { difficulty: 'easy',   concepts: ['pair-confusion'] },
  'mod-dotted-import':     { difficulty: 'medium', concepts: ['implicit-rule'] },
  'mod-all-attribute':     { difficulty: 'medium', concepts: ['guess'] },
  'mod-relative-import':   { difficulty: 'medium', concepts: ['guess'] },
  // 8. エラーと例外
  'exc-tryexceptelse-flow':{ difficulty: 'medium', concepts: ['word-order', 'implicit-rule'] },
  'exc-raise-from':        { difficulty: 'hard',   concepts: ['guess'] },
  'exc-custom-class':      { difficulty: 'medium', concepts: ['pair-confusion'] },
  'exc-assert':            { difficulty: 'medium', concepts: ['implicit-rule'] },
  'exc-finally-return':    { difficulty: 'hard',   concepts: ['implicit-rule', 'boundary'] },
  // 9. クラス
  'cls-init-purpose':      { difficulty: 'easy',   concepts: ['implicit-rule'] },
  'cls-classmethod':       { difficulty: 'medium', concepts: ['pair-confusion'] },
  'cls-staticmethod':      { difficulty: 'medium', concepts: ['pair-confusion'] },
  'cls-name-mangling':     { difficulty: 'hard',   concepts: ['implicit-rule'] },
  'cls-str-vs-repr':       { difficulty: 'medium', concepts: ['pair-confusion'] },
  'cls-mro':               { difficulty: 'hard',   concepts: ['guess'] },

  // セクション12: 仮想環境とパッケージ 充実
  'pkg-venv-purpose':      { difficulty: 'easy',   concepts: ['guess'] },
  'pkg-venv-activate-unix':{ difficulty: 'medium', concepts: ['guess'] },
  'pkg-venv-activate-win': { difficulty: 'medium', concepts: ['guess', 'pair-confusion'] },
  'pkg-venv-deactivate':   { difficulty: 'easy',   concepts: ['guess'] },
  'pkg-pip-version-spec':  { difficulty: 'medium', concepts: ['implicit-rule'] },
  'pkg-pip-uninstall':     { difficulty: 'easy',   concepts: ['guess', 'pair-confusion'] },
  'pkg-pip-show':          { difficulty: 'easy',   concepts: ['guess'] },
  'pkg-pip-list-vs-freeze':{ difficulty: 'medium', concepts: ['pair-confusion'] },
  'pkg-requirements-content':{ difficulty: 'easy', concepts: ['implicit-rule'] },
  'pkg-requirements-install':{ difficulty: 'easy', concepts: ['guess'] },
  'pkg-pypi-purpose':      { difficulty: 'easy',   concepts: ['guess'] },
  'pkg-pip-multiple':      { difficulty: 'easy',   concepts: ['implicit-rule'] },
  'pkg-venv-isolated':     { difficulty: 'medium', concepts: ['implicit-rule'] },

  // セクション11: 標準ライブラリ Part II 充実
  'lib-reprlib-purpose':   { difficulty: 'medium', concepts: ['guess'] },
  'lib-pprint-purpose':    { difficulty: 'easy',   concepts: ['guess'] },
  'lib-textwrap-fill':     { difficulty: 'medium', concepts: ['guess'] },
  'lib-locale-purpose':    { difficulty: 'easy',   concepts: ['guess'] },
  'lib-template-substitute':{ difficulty: 'medium', concepts: ['pair-confusion'] },
  'lib-struct-pack-format':{ difficulty: 'medium', concepts: ['implicit-rule'] },
  'lib-threading-class':   { difficulty: 'easy',   concepts: ['guess', 'pair-confusion'] },
  'lib-threading-purpose': { difficulty: 'medium', concepts: ['pair-confusion'] },
  'lib-logging-levels':    { difficulty: 'medium', concepts: ['word-order'] },
  'lib-logging-basicconfig':{ difficulty: 'medium', concepts: ['guess'] },
  'lib-weakref-purpose':   { difficulty: 'hard',   concepts: ['guess'] },
  'lib-array-purpose':     { difficulty: 'medium', concepts: ['pair-confusion'] },
  'lib-deque-purpose':     { difficulty: 'medium', concepts: ['guess'] },
  'lib-deque-methods':     { difficulty: 'easy',   concepts: ['pair-confusion'] },
  'lib-bisect-insort':     { difficulty: 'medium', concepts: ['guess'] },
  'lib-heapq-purpose':     { difficulty: 'medium', concepts: ['guess'] },
  'lib-heapq-heappop':     { difficulty: 'easy',   concepts: ['implicit-rule'] },
  'lib-decimal-purpose':   { difficulty: 'medium', concepts: ['guess'] },
  'lib-decimal-vs-float':  { difficulty: 'medium', concepts: ['implicit-rule'] },

  // 第3章 公式チュートリアル基礎論点
  'op-truediv-float':      { difficulty: 'easy',   concepts: ['pair-confusion'] },
  'op-floordiv-mod-relation':{ difficulty: 'medium', concepts: ['pair-confusion', 'boundary'] },
  'op-power-precedence':   { difficulty: 'hard',   concepts: ['implicit-rule', 'boundary'] },
  'str-quote-equiv':       { difficulty: 'easy',   concepts: ['guess'] },
  'io-print-vs-repr':      { difficulty: 'medium', concepts: ['pair-confusion', 'string-regex'] },
  'str-raw-prefix':        { difficulty: 'medium', concepts: ['string-regex'] },
  'str-slice-end-exclusive':{ difficulty: 'easy', concepts: ['boundary'] },
  'list-shared-ref':       { difficulty: 'hard',   concepts: ['implicit-rule', 'pair-confusion'] },
  'list-slice-assign':     { difficulty: 'hard',   concepts: ['boundary', 'implicit-rule'] },
  'syn-while-truthy':      { difficulty: 'medium', concepts: ['implicit-rule'] },
  'syn-multi-assign-rhs':  { difficulty: 'hard',   concepts: ['boundary'] },

  // 第4章 制御フロー・関数引数
  'iter-for-iterable':     { difficulty: 'easy',   concepts: ['pair-confusion'] },
  'iter-mutate-during':    { difficulty: 'medium', concepts: ['implicit-rule'] },
  'iter-range-end-exclusive':{ difficulty: 'easy', concepts: ['boundary'] },
  'iter-range-not-list':   { difficulty: 'medium', concepts: ['pair-confusion', 'implicit-rule'] },
  'ctrl-break-innermost':  { difficulty: 'medium', concepts: ['boundary'] },
  'ctrl-loop-else':        { difficulty: 'hard',   concepts: ['pair-confusion', 'boundary'] },
  'match-first-only':      { difficulty: 'medium', concepts: ['pair-confusion'] },
  'match-or-pattern':      { difficulty: 'medium', concepts: ['pair-confusion'] },
  'arg-keyword-duplicate': { difficulty: 'medium', concepts: ['pair-confusion', 'boundary'] },
  'arg-keyword-only':      { difficulty: 'hard',   concepts: ['word-order', 'pair-confusion'] },
  'arg-call-double-star':  { difficulty: 'medium', concepts: ['pair-confusion'] },
  'syn-lambda-single-expr':{ difficulty: 'medium', concepts: ['implicit-rule'] },
  'syn-lambda-closure':    { difficulty: 'medium', concepts: ['implicit-rule'] },
  'pep-style-basics':      { difficulty: 'easy',   concepts: ['nonexistent'] },

  // 第5章 データ構造
  'list-remove-first':     { difficulty: 'medium', concepts: ['boundary'] },
  'list-pop-returns':      { difficulty: 'easy',   concepts: ['pair-confusion'] },
  'list-as-stack':         { difficulty: 'easy',   concepts: ['pair-confusion'] },
  'iter-comp-list':        { difficulty: 'easy',   concepts: ['guess'] },
  'iter-comp-order':       { difficulty: 'hard',   concepts: ['word-order', 'boundary'] },
  'iter-comp-tuple-paren': { difficulty: 'medium', concepts: ['word-order', 'nonexistent'] },
  'syn-del-no-return':     { difficulty: 'medium', concepts: ['pair-confusion'] },
  'syn-del-name':          { difficulty: 'medium', concepts: ['boundary'] },
  'tuple-unpack-count':    { difficulty: 'medium', concepts: ['boundary'] },
  'set-no-order-no-dup':   { difficulty: 'easy',   concepts: ['pair-confusion'] },
  'set-operators':         { difficulty: 'medium', concepts: ['pair-confusion'] },
  'dict-get-default':      { difficulty: 'easy',   concepts: ['pair-confusion'] },
  'dict-list-keys':        { difficulty: 'medium', concepts: ['pair-confusion'] },
  'iter-sorted-set':       { difficulty: 'medium', concepts: ['pair-confusion'] },
  'syn-membership':        { difficulty: 'easy',   concepts: ['pair-confusion'] },
  'syn-is-identity':       { difficulty: 'hard',   concepts: ['pair-confusion'] },
  'syn-chained-compare':   { difficulty: 'medium', concepts: ['word-order'] },
  'syn-short-circuit':     { difficulty: 'medium', concepts: ['boundary', 'implicit-rule'] },
  'type-seq-lex-compare':  { difficulty: 'hard',   concepts: ['boundary'] },

  // 第6章 モジュール
  'mod-from-import-name':  { difficulty: 'easy',   concepts: ['pair-confusion'] },
  'mod-from-star-underscore':{ difficulty: 'medium', concepts: ['implicit-rule', 'pair-confusion'] },
  'mod-import-as':         { difficulty: 'easy',   concepts: ['pair-confusion'] },
  'mod-init-once':         { difficulty: 'medium', concepts: ['boundary', 'implicit-rule'] },
  'mod-namespace':         { difficulty: 'medium', concepts: ['implicit-rule'] },
  'mod-name-attribute':    { difficulty: 'medium', concepts: ['pair-confusion'] },
  'mod-shadow-stdlib':     { difficulty: 'hard',   concepts: ['boundary', 'implicit-rule'] },
  'mod-pyc-pycache':       { difficulty: 'medium', concepts: ['implicit-rule'] },
  'mod-sys-builtin':       { difficulty: 'easy',   concepts: ['guess'] },
  'mod-dir-module':        { difficulty: 'easy',   concepts: ['pair-confusion'] },
  'mod-builtins':          { difficulty: 'medium', concepts: ['implicit-rule'] },
  'mod-import-vs-from':    { difficulty: 'medium', concepts: ['pair-confusion'] },
  'mod-from-specific':     { difficulty: 'medium', concepts: ['guess'] },
  'mod-all-no-auto':       { difficulty: 'hard',   concepts: ['implicit-rule', 'boundary'] },
  'mod-abs-rel-both':      { difficulty: 'medium', concepts: ['pair-confusion'] },
  'mod-rel-main':          { difficulty: 'hard',   concepts: ['boundary'] },

  // 第7章 入力と出力
  'str-vs-repr-fns':       { difficulty: 'medium', concepts: ['pair-confusion'] },
  'fmt-fstring-expr':      { difficulty: 'easy',   concepts: ['implicit-rule'] },
  'fmt-fstring-spec':      { difficulty: 'medium', concepts: ['pair-confusion'] },
  'fmt-fstring-bang':      { difficulty: 'medium', concepts: ['pair-confusion'] },
  'fmt-fstring-eq':        { difficulty: 'medium', concepts: ['implicit-rule'] },
  'fmt-format-pos-kw':     { difficulty: 'easy',   concepts: ['pair-confusion'] },
  'fmt-format-dict-unpack':{ difficulty: 'medium', concepts: ['pair-confusion'] },
  'fmt-just-no-truncate':  { difficulty: 'medium', concepts: ['implicit-rule'] },
  'fmt-percent-style':     { difficulty: 'easy',   concepts: ['guess'] },
  'io-open-default-r':     { difficulty: 'easy',   concepts: ['nonexistent'] },
  'io-open-modes':         { difficulty: 'easy',   concepts: ['pair-confusion'] },
  'io-text-encoding':      { difficulty: 'medium', concepts: ['implicit-rule'] },
  'io-binary-no-encoding': { difficulty: 'medium', concepts: ['pair-confusion'] },
  'io-with-auto-close':    { difficulty: 'easy',   concepts: ['implicit-rule'] },
  'io-write-without-close':{ difficulty: 'medium', concepts: ['implicit-rule', 'boundary'] },
  'io-closed-file-error':  { difficulty: 'easy',   concepts: ['pair-confusion'] },
  'io-read-eof-empty':     { difficulty: 'easy',   concepts: ['boundary'] },
  'io-readline-newline':   { difficulty: 'medium', concepts: ['boundary'] },
  'io-iter-file':          { difficulty: 'easy',   concepts: ['guess'] },
  'io-write-returns-count':{ difficulty: 'easy',   concepts: ['pair-confusion'] },
  'io-write-types':        { difficulty: 'medium', concepts: ['pair-confusion'] },
  'io-tell-position':      { difficulty: 'medium', concepts: ['implicit-rule'] },
  'io-seek-whence':        { difficulty: 'medium', concepts: ['boundary'] },
  'io-seek-text-limited':  { difficulty: 'hard',   concepts: ['boundary', 'implicit-rule'] },
  'json-dumps-string':     { difficulty: 'easy',   concepts: ['pair-confusion'] },
  'json-dump-file':        { difficulty: 'easy',   concepts: ['pair-confusion'] },
  'json-load-file':        { difficulty: 'easy',   concepts: ['pair-confusion'] },
  'json-utf8-recommended': { difficulty: 'medium', concepts: ['implicit-rule'] },
  'json-pickle-unsafe':    { difficulty: 'hard',   concepts: ['pair-confusion', 'implicit-rule'] },

  // 第8章 エラーと例外
  'exc-syntax-vs-runtime': { difficulty: 'easy',   concepts: ['pair-confusion'] },
  'exc-runtime-defs':      { difficulty: 'easy',   concepts: ['pair-confusion'] },
  'exc-derived-match':     { difficulty: 'medium', concepts: ['pair-confusion'] },
  'exc-as-instance':       { difficulty: 'easy',   concepts: ['implicit-rule'] },
  'exc-base-vs-exception': { difficulty: 'hard',   concepts: ['pair-confusion', 'implicit-rule'] },
  'exc-broad-exception':   { difficulty: 'medium', concepts: ['implicit-rule'] },
  'exc-raise-class-or-inst':{ difficulty: 'medium', concepts: ['pair-confusion'] },
  'exc-bare-raise':        { difficulty: 'easy',   concepts: ['boundary'] },
  'exc-from-none':         { difficulty: 'hard',   concepts: ['implicit-rule'] },
  'exc-finally-control-warn':{ difficulty: 'hard', concepts: ['boundary', 'implicit-rule'] },
  'exc-group-basic':       { difficulty: 'hard',   concepts: ['pair-confusion'] },
  'exc-star':              { difficulty: 'hard',   concepts: ['pair-confusion', 'boundary'] },
  'exc-group-instances':   { difficulty: 'medium', concepts: ['pair-confusion'] },
  'exc-add-note':          { difficulty: 'medium', concepts: ['implicit-rule'] },

  // 第9章 クラス
  'cls-legb':              { difficulty: 'medium', concepts: ['implicit-rule'] },
  'cls-class-namespace':   { difficulty: 'medium', concepts: ['implicit-rule'] },
  'cls-instance-attr-create':{difficulty: 'easy',  concepts: ['implicit-rule'] },
  'cls-method-equiv':      { difficulty: 'medium', concepts: ['pair-confusion'] },
  'cls-bound-method-save': { difficulty: 'medium', concepts: ['implicit-rule'] },
  'cls-inherit-attr-search':{ difficulty: 'easy',  concepts: ['pair-confusion'] },
  'cls-virtual-method':    { difficulty: 'medium', concepts: ['implicit-rule'] },
  'cls-isinstance-derived':{ difficulty: 'easy',   concepts: ['pair-confusion'] },
  'cls-mro-role':          { difficulty: 'hard',   concepts: ['implicit-rule', 'boundary'] },
  'cls-private-vs-mangling':{difficulty: 'medium', concepts: ['pair-confusion'] },
  'cls-dataclass':         { difficulty: 'medium', concepts: ['guess'] },
  'cls-for-iter-next':     { difficulty: 'medium', concepts: ['implicit-rule'] },
  'cls-iter-protocol':     { difficulty: 'medium', concepts: ['pair-confusion'] },
  'cls-next-stopiteration':{ difficulty: 'easy',   concepts: ['boundary'] },
  'cls-yield-generator':   { difficulty: 'easy',   concepts: ['pair-confusion'] },
  'cls-generator-state':   { difficulty: 'medium', concepts: ['implicit-rule'] },
  'cls-genexp-memory':     { difficulty: 'medium', concepts: ['pair-confusion'] },

  // 第10章 標準ライブラリめぐり
  'lib-os-import-star-bad':{ difficulty: 'medium', concepts: ['implicit-rule', 'pair-confusion'] },
  'lib-shutil-highlevel':  { difficulty: 'easy',   concepts: ['pair-confusion'] },
  'lib-glob-wildcard':     { difficulty: 'easy',   concepts: ['guess'] },
  'lib-argparse':          { difficulty: 'medium', concepts: ['pair-confusion'] },
  'lib-stderr-purpose':    { difficulty: 'easy',   concepts: ['pair-confusion'] },
  'lib-re-use-case':       { difficulty: 'medium', concepts: ['string-regex', 'pair-confusion'] },
  'lib-math-purpose':      { difficulty: 'easy',   concepts: ['guess'] },
  'lib-rand-choice-vs-sample':{ difficulty: 'medium', concepts: ['pair-confusion'] },
  'lib-statistics-features':{ difficulty: 'easy', concepts: ['guess'] },
  'lib-urlopen-bytes':     { difficulty: 'medium', concepts: ['pair-confusion'] },
  'lib-smtplib-localhost': { difficulty: 'medium', concepts: ['implicit-rule'] },
  'lib-date-diff':         { difficulty: 'easy',   concepts: ['guess'] },
  'lib-strftime':          { difficulty: 'medium', concepts: ['word-order'] },
  'lib-zlib-purpose':      { difficulty: 'medium', concepts: ['pair-confusion'] },
  'lib-timeit-scope':      { difficulty: 'medium', concepts: ['pair-confusion'] },
  'lib-doctest-purpose':   { difficulty: 'easy',   concepts: ['guess'] },
  'lib-unittest-purpose':  { difficulty: 'medium', concepts: ['pair-confusion'] },
  'lib-batteries-included':{ difficulty: 'easy',   concepts: ['guess'] },

  // 第11章 標準ライブラリミニツアー その2
  'lib-textwrap-fill-vs-wrap':{ difficulty: 'medium', concepts: ['pair-confusion'] },
  'lib-template-dollar-syntax':{ difficulty: 'easy', concepts: ['pair-confusion'] },
  'lib-template-delimiter-custom':{ difficulty: 'medium', concepts: ['implicit-rule'] },
  'lib-struct-byte-order': { difficulty: 'hard',   concepts: ['pair-confusion'] },
  'lib-thread-queue-coordination':{ difficulty: 'medium', concepts: ['implicit-rule'] },
  'lib-logging-default-level':{ difficulty: 'medium', concepts: ['boundary'] },
  'lib-weakvaluedict-auto-remove':{ difficulty: 'hard', concepts: ['boundary', 'implicit-rule'] },
  'lib-decimal-float-rounding':{ difficulty: 'hard', concepts: ['boundary', 'pair-confusion'] },

  // 第12章 仮想環境とパッケージ
  'pkg-venv-isolated-tree':{ difficulty: 'medium', concepts: ['implicit-rule'] },
  'pkg-venv-base-python':  { difficulty: 'medium', concepts: ['boundary'] },
  'pkg-venv-activate-effect':{ difficulty: 'easy', concepts: ['pair-confusion'] },
  'pkg-venv-no-activate-fullpath':{ difficulty: 'medium', concepts: ['implicit-rule'] },
  'pkg-pip-purpose':       { difficulty: 'easy',   concepts: ['guess'] },

  // 第13章 さあ何を？（学習案内）
  'doc-tutorial-13-purpose':{ difficulty: 'easy', concepts: ['guess'] },
  'doc-stdlib-reference':  { difficulty: 'easy',   concepts: ['pair-confusion'] },
  'doc-installing-modules':{ difficulty: 'easy',   concepts: ['pair-confusion'] },
  'doc-language-reference':{ difficulty: 'easy',   concepts: ['pair-confusion'] },
  'doc-docs-python-org':   { difficulty: 'easy',   concepts: ['guess'] },
  'doc-cookbook':          { difficulty: 'medium', concepts: ['guess'] },
  'doc-pyvideo':           { difficulty: 'medium', concepts: ['guess'] },
  'doc-scipy':             { difficulty: 'medium', concepts: ['guess'] },
  'doc-faq-first':         { difficulty: 'easy',   concepts: ['implicit-rule'] },

  // 第14章 対話入力編集と履歴置換
  'int-readline-edit':     { difficulty: 'medium', concepts: ['guess'] },
  'int-attr-completion':   { difficulty: 'medium', concepts: ['pair-confusion'] },
  'int-completion-getattr':{ difficulty: 'hard',   concepts: ['implicit-rule'] },
  'int-repl-alternatives': { difficulty: 'easy',   concepts: ['guess'] },

  // 第15章 浮動小数点演算、その問題と制限
  'flt-binary-cant-represent':{ difficulty: 'easy', concepts: ['implicit-rule'] },
  'flt-display-vs-internal':{ difficulty: 'medium', concepts: ['pair-confusion'] },
  'flt-round-not-fix':     { difficulty: 'medium', concepts: ['pair-confusion'] },
  'flt-isclose':           { difficulty: 'easy',   concepts: ['pair-confusion'] },
  'flt-format-display':    { difficulty: 'easy',   concepts: ['pair-confusion'] },
  'flt-repr-roundtrip':    { difficulty: 'medium', concepts: ['implicit-rule'] },
  'flt-fractions-rational':{ difficulty: 'medium', concepts: ['pair-confusion'] },
  'flt-as-integer-ratio':  { difficulty: 'medium', concepts: ['implicit-rule'] },
  'flt-hex-roundtrip':     { difficulty: 'medium', concepts: ['pair-confusion'] },
  'flt-sum-precision':     { difficulty: 'medium', concepts: ['implicit-rule'] },
  'flt-fsum-high-precision':{ difficulty: 'hard',  concepts: ['pair-confusion', 'boundary'] },
  'flt-practical':         { difficulty: 'medium', concepts: ['guess'] },
  'flt-binary-not-python-bug':{ difficulty: 'easy', concepts: ['guess'] },
};

// デフォルト値（meta が無い問題用）
function getMeta(qid) {
  return QUESTION_META[qid] || { difficulty: 'medium', concepts: [] };
}
