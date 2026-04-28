// 1対1対応に絞った問題集
// correct は choices 配列の正解インデックス（実行時にランダムシャッフルされる）
const QUESTIONS = [
  // ====== 辞書 ======
  {
    id: 'dict-keys', category: '辞書',
    question: '辞書からキーの一覧を取得するメソッドは？',
    choices: ['keys()', 'values()', 'items()', 'get()'],
    correct: 0,
    explanation: '辞書には「キーだけ」「値だけ」「両方」を取り出す3つの窓口がある。keys() がキー、values() が値、items() が (キー, 値) のタプル。get(キー) は単一のキーを引いて値を返すメソッドで、対象が違う。3つの窓口は dict_keys / dict_values / dict_items というビューオブジェクトを返し、辞書の変更がリアルタイムに反映される。リストではない点に注意。',
  },
  {
    id: 'dict-values', category: '辞書',
    question: '辞書から値の一覧を取得するメソッドは？',
    choices: ['values()', 'keys()', 'items()', 'pop()'],
    correct: 0,
    explanation: '値だけ欲しいときは values()。試験でよく出る引っかけは「値の存在チェックを keys() でやろうとする」パターン。「100 という値が辞書にあるか」を調べたいなら 100 in d.values() が正解で、100 in d.keys() (= 100 in d) ではキーを探してしまう。「キーは入口、値は中身」と覚えると区別しやすい。',
  },
  {
    id: 'dict-items', category: '辞書',
    question: '辞書から (キー, 値) のタプル一覧を取得するメソッドは？',
    choices: ['items()', 'pairs()', 'entries()', 'tuples()'],
    correct: 0,
    explanation: 'items() が (キー, 値) のタプルを順に返す。「for k, v in d.items():」がループの定番形。pairs / entries は他言語の辞書系メソッド名（JavaScript の Object.entries など）と混同しやすいが、Python では items() のみ。タプルアンパックが効くので k, v に直接受けられるのが便利。',
  },
  {
    id: 'dict-key-type', category: '辞書',
    question: '辞書のキーとして使えないのはどれ？',
    choices: ['list', 'tuple', 'str', 'int'],
    correct: 0,
    explanation: '辞書はハッシュテーブルなので、キーには「ハッシュ値が変わらないオブジェクト」しか使えない。これを hashable と呼び、実用上は immutable（変更不可）であることとほぼ同じ。list は要素を後から書き換えられるのでハッシュ値が崩れる可能性があり、キーに使えない。tuple は中身を変えられないので OK。frozenset は使えるが set は使えない、というのも同じ理屈。',
  },
  {
    id: 'dict-empty', category: '辞書',
    question: '空の集合 (set) を作る正しい記法は？',
    choices: ['set()', '{}', '[]', '()'],
    correct: 0,
    explanation: '{} は空の辞書になる。これは Python が辞書のリテラル {} を先に持っていて、後から集合を導入したときに記号が空いていなかったため。中身があれば {1, 2, 3} は集合、{1: "a"} は辞書と区別がつくが、空の {} は辞書側に取られている。だから空の集合は set() でしか作れない。リテラルの優先順位の歴史が残った形。',
  },

  // ====== イテレーション ======
  {
    id: 'iter-zip', category: 'イテレーション',
    question: '2つのリストから同じ位置の要素をペアにする関数は？',
    choices: ['zip()', 'enumerate()', 'map()', 'pair()'],
    correct: 0,
    explanation: 'zip(a, b) は (a[0], b[0]), (a[1], b[1]) ... のようにファスナー（ジッパー）の歯のように噛み合わせる。名前の由来そのもの。長さが違うシーケンスを渡すと短い方に揃う点に注意（itertools.zip_longest だと長い方に揃う）。enumerate は番号付け用で役割が違う。「2系列の結合 = zip、番号付け = enumerate」の対比を覚える。',
  },
  {
    id: 'iter-enum', category: 'イテレーション',
    question: 'リストの各要素に (インデックス, 要素) を付けて返す関数は？',
    choices: ['enumerate()', 'zip()', 'index()', 'list()'],
    correct: 0,
    explanation: 'enumerate(seq) は (0, seq[0]), (1, seq[1]) ... を返す。「for i, x in enumerate(items):」が頻出パターン。range(len(items)) で回してから items[i] するより読みやすく、エラーも起きにくい。第2引数で開始番号を変えられる（enumerate(items, 1) で 1 始まり）のは地味に便利。zip と機能が違うので役割で覚える。',
  },
  {
    id: 'iter-zip-list', category: 'イテレーション',
    question: 'zip オブジェクトをリストに変換するには？',
    choices: ['list(zip(...))', 'zip(...).list()', 'tolist(zip(...))', 'zip.list(...)'],
    correct: 0,
    explanation: 'zip はイテレータ（遅延評価される反復子）を返すので、print() しても <zip object at 0x...> のような表示になる。中身を見たり添字でアクセスしたいときは list() で実体化する。Python 3 で zip / map / range などが軒並み遅延評価に変わった経緯があり、メモリ節約のため。「使うときに具現化」という設計思想を理解しておくと例外的な動きも納得できる。',
  },
  {
    id: 'iter-unpack', category: 'イテレーション',
    question: 'リストの各要素を関数の位置引数として展開する記法は？',
    choices: ['func(*list)', 'func(**list)', 'func(list...)', 'func(...list)'],
    correct: 0,
    explanation: '* で位置引数アンパック、** で辞書をキーワード引数アンパック。print(*[1, 2, 3]) は print(1, 2, 3) と同等。これは「関数定義側の *args / **kwargs」と表裏一体の概念で、定義側で集約・呼び出し側で展開と対称になっている。引数を可変リストで組み立てて関数に流し込みたい場面で頻出。JS のスプレッド構文 (...) と似た役割を Python では * が担う。',
  },

  // ====== 関数引数 ======
  {
    id: 'arg-args', category: '関数引数',
    question: '任意個の位置引数を受け取る記法は？',
    choices: ['*args', '**kwargs', 'args[]', '...args'],
    correct: 0,
    explanation: '*args は位置引数を「タプル」として受け取る。args という名前は慣習で、*things でも *xs でも動く（PEP8 的に args 推奨）。「いくつ渡されるか分からない」関数を書くときの定番。例えば print() 自身が *args の代表例で、print("a", "b", "c") のような可変引数を実現している。ポインタとは無関係で、Python の * は純粋にアンパック・パック演算子。',
  },
  {
    id: 'arg-kwargs', category: '関数引数',
    question: '任意個のキーワード引数を受け取る記法は？',
    choices: ['**kwargs', '*args', 'kwargs={}', '@kwargs'],
    correct: 0,
    explanation: '**kwargs は「辞書」として受け取る。keyword arguments の略。dict(**kwargs) のような転送パターンや、デコレータで関数のシグネチャを保ったままラップする用途で重宝する。*args (タプル) と対をなし、定義時の順序は固定（後述）。「任意個 + キーで識別」という性質上、自然と辞書になる。',
  },
  {
    id: 'arg-order', category: '関数引数',
    question: '関数定義で *args と **kwargs を併用するとき、正しい順序は？',
    choices: ['*args が先', '**kwargs が先', 'どちらでも良い', '同時には書けない'],
    correct: 0,
    explanation: '位置引数 → *args → デフォルト引数 → **kwargs の順。これは関数呼び出し側のルール「位置引数はキーワード引数より前」と整合する。**kwargs を先に書けばキーワード引数が位置引数を吸い込んでしまい区別がつかなくなるので、文法的に SyntaxError。「位置 → キーワード」の流れは Python 全体で一貫した大原則として覚えておくと、引数まわりの問題はだいたい解ける。',
  },
  {
    id: 'arg-default', category: '関数引数',
    question: '関数のデフォルト引数値が評価されるタイミングは？',
    choices: ['関数定義時に1回だけ', '呼び出しごとに毎回', 'モジュールロード時', 'インタープリタ起動時'],
    correct: 0,
    explanation: 'デフォルト値は def 文を実行した時に1回だけ評価され、関数オブジェクトに紐づいて保持される。これが原因で「def f(x=[]): x.append(1); return x」のような関数を複数回呼ぶと同じリストが共有されてバグになる、というのが Python の有名な落とし穴。回避策は def f(x=None): if x is None: x = [] のパターン。「定義時1回」というルールから演繹される現象として理解しておく。',
  },

  // ====== 標準ライブラリ ======
  {
    id: 'lib-dir', category: '標準ライブラリ',
    question: 'オブジェクトの属性・メソッド一覧を返す関数は？',
    choices: ['dir()', 'help()', 'list()', 'attrs()'],
    correct: 0,
    explanation: 'dir(obj) は名前のリストを返す。「何ができるか調べたい」ときの最初の一手。何も渡さず dir() だけ呼ぶと現在のスコープにある名前一覧が返るのも便利。一方 help() は対話的にドキュメントを表示する別の機能。「dir = directory listing（一覧）、help = ヘルプ表示」と役割で覚える。中身がよく分からない API を触るとき dir() で当たりをつけて help() で詳細を見る、という流れが定番。',
  },
  {
    id: 'lib-help', category: '標準ライブラリ',
    question: 'オブジェクトのドキュメントを表示する関数は？',
    choices: ['help()', 'dir()', 'doc()', 'info()'],
    correct: 0,
    explanation: 'help(obj) でドキュメンテーション文字列（docstring）を整形表示する。help() を引数なしで呼ぶと対話ヘルプモードに入る（quit で抜ける）。docstring は関数やクラスの先頭に書くトリプルクォート文字列で、help() / __doc__ 属性 / IDE の補完表示の元ネタになる。「dir で名前を、help で説明を」という分業。',
  },
  {
    id: 'lib-exit', category: '標準ライブラリ',
    question: 'プログラムを途中で終了させる関数は？',
    choices: ['sys.exit()', 'sys.quit()', 'sys.end()', 'sys.close()'],
    correct: 0,
    explanation: 'sys.exit() のみ正しい。実装上は SystemExit 例外を投げているので、try で捕まえることもできる（普通はしない）。引数に整数を渡すと終了コードになり、シェルから $? で受け取れる。なお対話モード専用の quit() / exit() は別物（site モジュールが提供する補助）で、スクリプトでは sys.exit() を使うのが作法。close は file オブジェクト等のメソッドであって sys にはない。',
  },
  {
    id: 'lib-argv', category: '標準ライブラリ',
    question: 'コマンドライン引数を取得するリストは？',
    choices: ['sys.argv', 'sys.args', 'sys.argument', 'sys.cmdline'],
    correct: 0,
    explanation: 'sys.argv が正解で、argv は C 言語の慣習（argument vector の略）から来ている。argv[0] はスクリプト名、argv[1:] が実際の引数。args / argument / cmdline は紛らわしいだけで存在しない。本格的に引数を扱うなら argparse モジュールが定番だが、試験範囲では生の sys.argv が出る。歴史的経緯で名前が短いのが特徴。',
  },
  {
    id: 'lib-smtplib', category: '標準ライブラリ',
    question: 'メールを送信する標準モジュールは？',
    choices: ['smtplib', 'poplib', 'imaplib', 'mailto'],
    correct: 0,
    explanation: 'smtplib は SMTP（Simple Mail Transfer Protocol）プロトコルでメールを送る。SMTP は送信専用のプロトコルで、受信は別。受信は poplib（POP3）か imaplib（IMAP）。「smtp = send、pop / imap = receive」と覚える。プロトコル名がモジュール名にそのまま入っているので、ネットワーク用語を知っていると暗記が要らない。',
  },
  {
    id: 'lib-poplib', category: '標準ライブラリ',
    question: 'POP3 でメールを受信する標準モジュールは？',
    choices: ['poplib', 'smtplib', 'recvmail', 'mailbox'],
    correct: 0,
    explanation: 'poplib は POP3 プロトコルでメールを受信する。POP3 は「ダウンロードしてサーバから消す」古典的な方式。最近主流の IMAP（サーバに残してフォルダ管理）は imaplib モジュール。送信は smtplib。mailbox はメールボックスファイル（mbox 形式等）を読み書きする別系統のモジュールで、ネットワーク経由の送受信には使わない。',
  },
  {
    id: 'lib-pack', category: '標準ライブラリ',
    question: 'struct モジュールで Python の値をバイナリに変換する関数は？',
    choices: ['pack()', 'unpack()', 'encode()', 'binary()'],
    correct: 0,
    explanation: 'pack は「詰め込む」イメージで、Python の値をバイナリ列に変換する。バイナリファイルやネットワークプロトコル、C 言語と連携するときに使う。pack(">i", 100) のようにフォーマット文字列で型と並びを指定する。逆方向 unpack と必ずペアで覚える。「pack = 出荷（Python → バイナリ）、unpack = 開梱（バイナリ → Python）」という荷物の比喩で覚えると向きを間違えない。',
  },
  {
    id: 'lib-unpack', category: '標準ライブラリ',
    question: 'struct モジュールでバイナリを Python の値に戻す関数は？',
    choices: ['unpack()', 'pack()', 'decode()', 'parse()'],
    correct: 0,
    explanation: 'unpack はバイナリ列を Python のタプルに戻す。受信したバイナリプロトコルや既存のバイナリファイル形式を解釈するときに使う。フォーマット文字列は pack と共通で、">i" なら big-endian の int 4 バイト。試験では pack / unpack の向きを入れ替えた選択肢が定番の引っかけなので、「開梱 = unpack」と荷物の比喩で固定する。',
  },
  {
    id: 'lib-rand-choice', category: '標準ライブラリ',
    question: 'random モジュールでシーケンスから1つランダムに選ぶ関数は？',
    choices: ['random.choice()', 'random.sample()', 'random.pick()', 'random.random()'],
    correct: 0,
    explanation: 'choice(seq) は1つだけ選ぶ。たくさんある random 系関数の中で頻出の3つは「choice = 1個」「sample = n 個重複なし」「random = 0〜1 の小数」。pick という名前は他言語にあるが Python では使わない。「単数形 = 1つ、sample = サンプリング = 複数を抜き取り」というように、英単語の意味から逆引きできるようにしておく。',
  },
  {
    id: 'lib-rand-sample', category: '標準ライブラリ',
    question: 'random モジュールでシーケンスから重複なく複数選ぶ関数は？',
    choices: ['random.sample()', 'random.choice()', 'random.choices()', 'random.multi()'],
    correct: 0,
    explanation: 'sample(seq, n) は重複なしで n 個取り出す。よく似た choices(seq, k=n) は複数選ぶが重複ありで、s が付いているかで挙動が逆転するので注意。たとえばカフェのおすすめメニューを 3 つランダムに紹介するときは sample（同じメニューが2回出ない）、サイコロを5回振るシミュレーションは choices（同じ目が出てよい）。試験では sample と choices と choice の使い分けがよく問われる。',
  },
  {
    id: 'lib-rand-random', category: '標準ライブラリ',
    question: 'random.random() の戻り値の範囲は？',
    choices: ['0.0以上1.0未満の浮動小数', '-1.0以上1.0以下の浮動小数', '0以上1以下の整数', '0以上指定値未満の整数'],
    correct: 0,
    explanation: '半開区間 [0.0, 1.0) の浮動小数点数。1.0 はちょうど含まれないのが地味に重要で、確率計算でバグの温床になる境界値。整数が欲しいなら randrange(stop) や randint(a, b)、範囲を変えたい小数なら uniform(a, b) を使う。「シードなし random = 0〜1 の素の小数」が出発点で、他の関数はこれを加工しているイメージ。',
  },
  {
    id: 'lib-logging', category: '標準ライブラリ',
    question: 'logging モジュールのログレベルを深刻度の低い順に並べたものは？',
    choices: [
      'DEBUG → INFO → WARNING → ERROR → CRITICAL',
      'INFO → DEBUG → WARNING → ERROR → CRITICAL',
      'DEBUG → WARNING → INFO → ERROR → CRITICAL',
      'INFO → WARNING → DEBUG → ERROR → CRITICAL',
    ],
    correct: 0,
    explanation: 'DEBUG（開発時の詳細ログ）→ INFO（通常の情報）→ WARNING（警告だが動作は継続）→ ERROR（機能の一部が動かない）→ CRITICAL（プログラム全体が継続不能）。深刻度に応じて閾値を設定すると、本番では WARNING 以上だけ出力、といった制御ができる。「DI WEC」の頭文字でも覚えられる。試験でも実務でも頻出の階層なので順序を体に入れる。',
  },
  {
    id: 'lib-timeit', category: '標準ライブラリ',
    question: 'コードの実行時間を計測するモジュールは？',
    choices: ['timeit', 'doctest', 'unittest', 'time.clock'],
    correct: 0,
    explanation: 'timeit は短いコード片を何回も実行して平均時間を出す、ベンチマーク専用モジュール。GC（ガベージコレクション）を止めて測るなど工夫が入っているので、自前で time.time() を引き算するより信頼できる。doctest は docstring 内のテスト、unittest はユニットテストフレームワーク、time.clock は廃止済み（Python 3.8 で削除）。「測る系」の似た名前モジュールが多いので役割で区別する。',
  },

  // ====== パッケージ管理 ======
  {
    id: 'pkg-freeze', category: 'パッケージ',
    question: 'インストール済みパッケージを requirements.txt に出力するコマンドは？',
    choices: [
      'pip freeze > requirements.txt',
      'pip export > requirements.txt',
      'pip dump > requirements.txt',
      'pip save > requirements.txt',
    ],
    correct: 0,
    explanation: 'freeze の名前は「現在のバージョンを凍結する」イメージ。出力は「name==version」形式で、pip install -r requirements.txt で再現できる。export / dump / save は他のパッケージマネージャ（npm export 等）と混同しがちな引っかけで、pip には存在しない。なお pip list は表形式の人間向け出力で、機械的な再現には向かない。「凍らせて他環境にも持っていける」と覚える。',
  },
  {
    id: 'pkg-upgrade', category: 'パッケージ',
    question: 'インストール済みパッケージを最新版に更新するコマンドは？',
    choices: [
      'pip install --upgrade パッケージ名',
      'pip install パッケージ名',
      'pip update パッケージ名',
      'pip refresh パッケージ名',
    ],
    correct: 0,
    explanation: 'pip install は「無ければ入れる」が原則で、既に入っていれば何もしない（冪等性）。最新化したい場合は明示的に --upgrade（または -U）を付ける。これは依存パッケージを意図せず壊さないための安全設計。pip update は他言語の慣用で、pip にはない。「pip = install のみ、更新は明示」というルールで覚える。',
  },
  {
    id: 'pkg-install-r', category: 'パッケージ',
    question: 'requirements.txt から一括インストールするコマンドは？',
    choices: [
      'pip install -r requirements.txt',
      'pip install requirements.txt',
      'pip restore requirements.txt',
      'pip freeze < requirements.txt',
    ],
    correct: 0,
    explanation: '-r は --requirement の略で、ファイルから依存リストを読み込むフラグ。-r を付けないと「requirements.txt」というパッケージ名でインストールしようとして失敗する。restore は他のツールの言い方（dotnet restore など）で pip にはない。pip freeze と pip install -r の組み合わせが「環境を凍結 → 別環境で復元」の Python 流儀の基本パターン。',
  },

  // ====== 構文 / モジュール ======
  {
    id: 'syn-fromimport', category: '構文',
    question: 'モジュール内の関数を全てインポートする正しい構文は？',
    choices: [
      'from モジュール import *',
      'import モジュール from *',
      'import * from モジュール',
      'include モジュール',
    ],
    correct: 0,
    explanation: 'Python のインポート文は必ず「from X import Y」の語順。SQL の SELECT col FROM table と語順が逆なので混同しやすいが、これは Python が「どこから取るか → 何を取るか」の順を採用しているため。* で全部インポートできるが「_」で始まる名前は対象外（プライベート扱い）、また __all__ が定義されていればその名前のみ。実務では名前空間の汚染を避けるため * インポートは推奨されない。',
  },
  {
    id: 'syn-self', category: '構文',
    question: 'メソッド定義の第1引数として慣習的に使う名前は？',
    choices: ['self', 'this', 'cls', 'me'],
    correct: 0,
    explanation: 'self はインスタンス自身を指す引数。Java や JavaScript の this のように暗黙では渡されず、必ず明示的に書くのが Python の流儀。これは「明示は暗黙より良い（Explicit is better than implicit）」という Zen of Python の信条の表れ。第1引数を書き忘れると、インスタンス経由の呼び出しでエラーになる（Python が暗黙にインスタンスを第1引数に渡そうとして引数が1つ多くなるため）。クラスメソッドでは慣習的に cls を使う。',
  },
  {
    id: 'syn-tuple1', category: '構文',
    question: '1要素のタプルを作るのに必須なのは？',
    choices: ['末尾のカンマ ("a",)', '丸括弧で囲む ("a")', '型注釈', 'バッククォート'],
    correct: 0,
    explanation: 'タプルを作っているのは丸括弧ではなくカンマ。実は a, b = 1, 2 のような多重代入もカンマでタプルを作って分解しているだけ。だから 1要素タプルでは ("a",) のようにカンマが必須で、("a") は単なる文字列を括弧で囲んだものになる。出力したときに ("a",) と末尾カンマ付きで表示されるのも、これがタプルだと示すための表記。「タプルの本体はカンマ」と覚えるとブレない。',
  },
  {
    id: 'syn-triple', category: '構文',
    question: '改行を含む文字列リテラルを作るには？',
    choices: [
      'トリプルクォート """ または \'\'\'',
      'シングルクォートで複数行',
      'バックスラッシュで継続',
      'バッククォート',
    ],
    correct: 0,
    explanation: '"""..."""  または \'\'\'...\'\'\' で改行を含む文字列が書ける。クォートを3つ重ねるのは「中で1個や2個出てきても閉じない」ようにするための工夫。普通のクォートで素直に改行すると SyntaxError になる（\\n エスケープは別の話）。docstring もトリプルクォートで書く慣習。なおバッククォートは Python 2 まで repr() のショートハンドだったが Python 3 で廃止された。',
  },
  {
    id: 'syn-implicit', category: '構文',
    question: '隣接する文字列リテラル ("a" "b") の結果は？',
    choices: ['"ab" に連結される', '"a b" になる', 'タプル ("a", "b")', 'SyntaxError'],
    correct: 0,
    explanation: '空白で隣接した文字列リテラルは + なしで連結される。これはコンパイル時に処理されるので、変数同士では機能しない（s1 s2 はエラー）。長い文字列を行をまたいで書くときに便利で、( "短い" "もっと短い" ) のように書ける。一方 + 演算子なら変数も連結できるが、リテラル同士なら隣接記法のほうがコンパイル時最適化が効く。地味だが試験で出るとハマる仕様。',
  },
  {
    id: 'syn-nonlocal', category: '構文',
    question: 'ネストした関数で、1つ外側のローカル変数を書き換える宣言は？',
    choices: ['nonlocal', 'global', 'outer', 'parent'],
    correct: 0,
    explanation: 'nonlocal は「local でも global でもなく、外側の関数のローカル」を指すための宣言。クロージャを書きたいときに使う。global はモジュールレベル（最外）の変数を指す全く別物。Python では関数内で代入すると自動的にローカル変数扱いになるので、外側のものを書き換えたいときは明示的に nonlocal / global と宣言する必要がある。「読むだけなら宣言不要、書くなら宣言必要」が原則。',
  },
  {
    id: 'syn-lambda', category: '構文',
    question: 'リスト内のタプル要素の2番目で並べ替えるラムダ式は？',
    choices: [
      'key=lambda x: x[1]',
      'key=lambda x: x[0]',
      'key=lambda x: x.second',
      'key=x[1]',
    ],
    correct: 0,
    explanation: 'sort や sorted の key 引数には「要素を受け取って比較値を返す関数」を渡す。lambda x: x[1] は要素 x のインデックス 1 の値で比較する、という意味。リスト [(価格, 商品), ...] を商品名で並べたいなら lambda x: x[1]。実務では operator.itemgetter(1) でも同じことができ、こちらの方が高速。試験では lambda 形式が定番なので「key=lambda x: x[何番目か]」のイディオムを丸暗記する。',
  },

  // ====== データ型 ======
  {
    id: 'type-mutable', category: 'データ型',
    question: 'mutable（変更可能）なデータ型はどれ？',
    choices: ['list', 'tuple', 'str', 'int'],
    correct: 0,
    explanation: 'mutable と immutable の区別は Python 全体を理解する鍵。mutable は list / dict / set、immutable は tuple / str / int / float / bool / frozenset / bytes。immutable なものは辞書のキーや集合の要素になれる（ハッシュが安定するから）。文字列を s[0] = "x" のように書き換えられないのも immutable だから。「変えたければ新しいものを作る」のが Python の immutable オブジェクトの流儀。',
  },
  {
    id: 'type-append', category: 'データ型',
    question: 'リスト末尾に1要素を追加するメソッドは？',
    choices: ['append()', 'extend()', 'add()', 'insert()'],
    correct: 0,
    explanation: 'append(x) は引数を「1つの要素」として末尾に追加する。リストを渡してもリストごと1要素になる（[1,2].append([3,4]) → [1,2,[3,4]]）。これが extend と混同しやすいポイント。add() は集合 (set) のメソッドで、リストにはない。insert(i, x) は任意位置への挿入。「append = 末尾にぽんと置く」「extend = 結合する」と動きの違いを動詞で覚える。',
  },
  {
    id: 'type-extend', category: 'データ型',
    question: 'リストに別シーケンスの全要素を追加するメソッドは？',
    choices: ['extend()', 'append()', 'concat()', 'merge()'],
    correct: 0,
    explanation: 'extend([1,2]) は要素を1つずつ末尾に追加するので、[1,2].extend([3,4]) → [1,2,3,4]。+= 演算子と同じ効果で、a += b は a.extend(b) に近い。append([3,4]) と動きが違う点が試験で頻出。concat / merge は他言語の名前で、Python のリストにはない。「extend = 伸ばす」のイメージで、別のシーケンスを取り込んで自分を長くする。',
  },
  {
    id: 'type-sort', category: 'データ型',
    question: 'リスト自身をソートし、None を返すメソッドは？',
    choices: ['list.sort()', 'sorted(list)', 'list.order()', 'list.arrange()'],
    correct: 0,
    explanation: 'sort() は破壊的にリストを並べ替えて None を返す。result = lst.sort() と書くと result は None になるので注意。これは「破壊的メソッドは元オブジェクトを返さない」という Python の慣例で、reverse() や remove() も同じ。新しいリストが欲しければ sorted() を使う。「sort はリストの自己改造、sorted は新規作成」と対比で覚える。',
  },
  {
    id: 'type-sorted', category: 'データ型',
    question: '元のリストを変更せず、ソート済みの新しいリストを返すのは？',
    choices: ['sorted(list)', 'list.sort()', 'list.sorted()', 'sort(list)'],
    correct: 0,
    explanation: 'sorted() は組み込み関数で、新しいリストを返し元は変更しない。sort() メソッドはリスト専用だが、sorted() はタプルや文字列など任意のイテラブルを受け付ける（戻り値はリスト）。関数型プログラミングの「副作用なし」を志向するなら sorted() のほうが扱いやすい。「動詞 + ed = 完了形 = 新しい結果を返す」という英文法の感覚と一致する。',
  },

  // ====== 正規表現 ======
  {
    id: 'regex-star', category: '正規表現',
    question: '正規表現で「直前の文字を 0 回以上繰り返す」を表す記号は？',
    choices: ['*', '+', '?', '#'],
    correct: 0,
    explanation: '* は 0 回以上（無くてもマッチ）。「ab*」は a, ab, abb, abbb 全てにマッチする（a の後に b が無くても OK）。「1回以上」と直感で勘違いしやすいが、* は「あってもなくてもいい」を含む点が鍵。+ が「1回以上」、? が「0 か 1 回」。3 つの量化子の境界（0 を含むか 1 を含むか）が試験の定番ポイント。グロブパターン（シェルの *）と意味が違うので混乱しやすい。',
  },
  {
    id: 'regex-plus', category: '正規表現',
    question: '正規表現で「直前の文字を 1 回以上繰り返す」を表す記号は？',
    choices: ['+', '*', '?', '!'],
    correct: 0,
    explanation: '+ は 1 回以上（必ず1回はある）。「ab+」は ab, abb, abbb にマッチするが、a 単独にはマッチしない。* との違いは「0 回を含むかどうか」。実務では電話番号や ID のように「最低1文字は必要」な場面で + を使う。「+ はプラス＝必ず最低1つ」と記号の意味からも覚えやすい。',
  },
  {
    id: 'regex-question', category: '正規表現',
    question: '正規表現で「直前の文字が 0 回または 1 回」を表す記号は？',
    choices: ['?', '*', '+', '@'],
    correct: 0,
    explanation: '? は 0 か 1 回。「colou?r」は color と colour の両方にマッチする、というのが定番例。オプショナルな文字を表現するときに使う。なお「?」は別の文脈では量化子の最短マッチ修飾子としても使われる（.*? のように）。複数の意味を持つ記号なので、文脈で判断する必要がある。「? は問いかけ＝あってもなくても」。',
  },
  {
    id: 'regex-boundary', category: '正規表現',
    question: '正規表現で「単語境界」を表すのは？',
    choices: ['\\b', '\\w', '\\s', '\\B'],
    correct: 0,
    explanation: '\\b は word boundary（単語境界）を表すゼロ幅マッチ。「\\bcat\\b」は cat という独立した単語だけにマッチし、catalog や concatenate の中の cat にはマッチしない。\\B はその逆で、単語境界以外の位置。\\w は英数字とアンダースコア、\\s は空白文字。バックスラッシュ系のエスケープは大文字が「否定」になっているのが規則的（\\d / \\D、\\w / \\W、\\s / \\S）。',
  },
  {
    id: 'regex-digit', category: '正規表現',
    question: '正規表現で「数字 1 文字」を表すのは？',
    choices: ['\\d', '\\w', '\\D', '\\s'],
    correct: 0,
    explanation: '\\d は digit（数字）の略で 0-9 の1文字にマッチ。\\D が逆で「数字以外」。\\w は英数字 + アンダースコアで、数字も含む点が紛らわしい。電話番号や ID の数字部分を抽出するときの基本パーツ。Unicode モードでは全角数字もマッチするが、re モジュールはデフォルトで Unicode 対応。「d = digit」「w = word character」「s = space」と頭文字で覚える。',
  },

  // ====== PEP8 ======
  {
    id: 'pep-class', category: 'PEP8',
    question: 'PEP8 でクラス名に推奨される命名規則は？',
    choices: ['UpperCamelCase', 'lower_case_with_underscores', 'lowerCamelCase', 'UPPER_CASE'],
    correct: 0,
    explanation: 'クラスは UpperCamelCase（先頭大文字、単語ごとに大文字、PascalCase とも呼ぶ）。CustomerOrder のような形。これは標準ライブラリの慣例（list, dict, str なども実は組み込みクラスで例外的に小文字）と一貫している。一方、関数・変数は lower_case_with_underscores（snake_case）、定数は UPPER_CASE_WITH_UNDERSCORES。「目で見てクラスかどうか分かる」ことを重視した規約。',
  },
  {
    id: 'pep-func', category: 'PEP8',
    question: 'PEP8 で関数名・変数名に推奨される命名規則は？',
    choices: ['lower_case_with_underscores', 'UpperCamelCase', 'lowerCamelCase', 'UPPER_CASE'],
    correct: 0,
    explanation: 'snake_case（lower_case_with_underscores）。Python は読みやすさ最優先の言語で、アンダースコア区切りは英文の単語境界に近く目に優しい、という思想。Java の lowerCamelCase（getUserName）とは流儀が違う。なお「メソッドの第1引数 self」「プライベートには _ プレフィックス」「強プライベートには __」など、命名以外の慣例も PEP8 に書かれている。',
  },

  // ====== インタープリタ ======
  {
    id: 'int-interp', category: 'インタープリタ',
    question: 'インタープリタ言語の特徴として正しいのは？',
    choices: [
      '1行ずつ翻訳しながら実行',
      'プログラム全体を一括で機械語に翻訳してから実行',
      '実行に exe 化が必須',
      'OS ごとにコンパイルが必要',
    ],
    correct: 0,
    explanation: 'インタープリタは1行ずつ翻訳しながら実行するので、コンパイルなしで即実行できる代わりに実行速度が遅い。コンパイラは事前にまとめて機械語に変換するので速いが、変更のたびにビルドが必要。Python は厳密にはバイトコードにコンパイルしてから VM で実行する「ハイブリッド型」だが、ユーザから見れば 1 行ずつ動くインタープリタ言語。試験では純粋なインタープリタ vs コンパイラの対比で出る。',
  },
  {
    id: 'int-history', category: 'インタープリタ',
    question: '対話モードのヒストリ（履歴）が保存されるデフォルトファイルは？',
    choices: ['.python_history', '__history__.py', 'history.log', '.bash_history'],
    correct: 0,
    explanation: 'ホームディレクトリ直下の .python_history（先頭ドット = 隠しファイル）に保存される。bash の .bash_history と同じ命名規則。これにより前回の対話モードで打ったコマンドを上下キーで呼び戻せる。__history__.py は引っかけで、こんなファイルは存在しない。Python が REPL で何気なく便利に動いてくれる裏側の仕組み。',
  },
  {
    id: 'int-tab', category: 'インタープリタ',
    question: '対話モードで補完機能を呼び出すキーは？',
    choices: ['Tab', 'Tab+C', 'Ctrl+Space', 'Enter'],
    correct: 0,
    explanation: '[Tab] キー単独で補完が呼び出される。複数候補があるときは再度 [Tab] で候補を順送り、または2回押しで一覧表示（環境による）。これは GNU readline の機能を Python が利用しているため、bash や zsh と同じ感覚で使える。Ctrl+Space は IDE の補完ショートカットだが対話モードでは効かない。「Tab を押せば何か出る」と覚えておくと、ライブラリ探索が劇的に速くなる。',
  },
  {
    id: 'int-operator', category: 'インタープリタ',
    question: '演算子そのもの（+, -, * など）の呼称は？',
    choices: ['オペレーター', 'オペランド', 'オペレーション', 'パラメータ'],
    correct: 0,
    explanation: 'オペレーター（operator）は演算子そのもの。「+ や - などの記号」を指す。一方、演算対象（a + b の a, b）はオペランド（operand）。「er = する人 / 主体、and = される側」という英語の語尾の規則性で見分けられる。エンジニアリング全般で使う用語なので、紛らわしいときは「演算する側 = operator、される側 = operand」と動作主体で考える。',
  },
  {
    id: 'int-operand', category: 'インタープリタ',
    question: '演算対象の値や変数（a + b の a, b）の呼称は？',
    choices: ['オペランド', 'オペレーター', 'パラメータ', 'アーギュメント'],
    correct: 0,
    explanation: 'オペランド（operand）は演算の対象になる値。一方、演算子そのものはオペレーター。パラメータは関数定義側の引数の名前、アーギュメントは関数呼び出し側の実際の値、と用語の住み分けがある。これら4語は文脈ごとに微妙に違うが、よく混同される。「オペランドは演算の被害者、オペレーターは加害者」という覚え方をする人もいる。',
  },
  {
    id: 'int-c-option', category: 'インタープリタ',
    question: 'コマンドラインから直接 Python コードを実行するオプションは？',
    choices: ['python -c "code"', 'python -e "code"', 'python --run "code"', 'python -x "code"'],
    correct: 0,
    explanation: '-c は command の略で、引数の文字列を Python コードとして実行する。シェルスクリプトの中で1行だけ Python を呼びたいときに便利（python -c "import sys; print(sys.version)" など）。なお似た -i オプションは「スクリプトを実行した後に対話モードへ突入」する別物。-e は他言語（Perl など）の慣例で、Python では使わない。',
  },

  // ====== 例外 ======
  {
    id: 'exc-order', category: '例外',
    question: 'try-except-else-finally の正しい順序は？',
    choices: [
      'try → except → else → finally',
      'try → else → except → finally',
      'try → finally → except → else',
      'try → except → finally → else',
    ],
    correct: 0,
    explanation: 'try が試す本体、except が捕まえる側、else は「例外が起きなかったとき」、finally は「何があっても最後に必ず実行」。else が except の後にあるのが意外に感じるが、「except で捕まらなかった = 正常終了 = else」という流れになる。else は try 節の末尾に書きそうになるが、構文的に except の後ろが正しい位置。「成功時の後処理だけは else、必ず実行は finally」と役割を整理すると順序も自然に出る。',
  },
  {
    id: 'exc-flow', category: '例外',
    question: '例外がキャッチされたとき、try 節の残りの処理はどうなる？',
    choices: [
      '実行されず except へジャンプ',
      '例外を投げた行以外は全て実行される',
      '例外発生後も try 節は最後まで実行される',
      'プログラム全体が終了する',
    ],
    correct: 0,
    explanation: '例外が発生した時点で try の残りはスキップされ、対応する except へジャンプする。これは「異常状態のまま続行しない」という安全設計。except 節での処理が終われば、try 文全体を抜けて後続のコードが実行される（プログラム自体は止まらない）。「例外で処理が断ち切られ、別ルートに合流する」というイメージ。except でキャッチされなければスタックを遡り、最後まで誰も捕まえなければプログラムが終了する。',
  },
  {
    id: 'exc-multiple', category: '例外',
    question: '単一の except 節で複数の例外をキャッチする正しい書き方は？',
    choices: [
      'except (TypeError, ValueError):',
      'except TypeError, ValueError:',
      'except TypeError | ValueError:',
      'except [TypeError, ValueError]:',
    ],
    correct: 0,
    explanation: 'タプルで指定: except (A, B):。Python 2 ではカンマ区切りもサポートされていたが、これは「except A as B」と意味が衝突する（A という例外を B という変数で受ける）ため、Python 3 では廃止された。リスト [A, B] は不可、| 演算子も不可（型ヒントの Union 構文と混同しやすい引っかけ）。「複数なら必ず丸括弧でタプル」が定型。',
  },
  {
    id: 'exc-raise', category: '例外',
    question: '意図的に例外を発生させる文は？',
    choices: [
      'raise ValueError("msg")',
      'throw ValueError("msg")',
      'except ValueError',
      'error ValueError',
    ],
    correct: 0,
    explanation: 'Python は raise（throw ではない）を使う。Java / JavaScript / C++ は throw、Python / Ruby は raise、と言語ごとに方言が分かれる。raise 例外クラス(メッセージ) または raise 例外クラス、もしくは引数なしの raise（現在処理中の例外を再送出）も使える。バリデーション失敗を呼び出し元に伝えたい場面で頻出。「Python は raise」と言語の流儀として覚える。',
  },
  {
    id: 'exc-finally', category: '例外',
    question: 'finally 節が実行されるのはいつ？',
    choices: [
      '例外発生の有無にかかわらず必ず最後に実行',
      '例外が発生したときだけ',
      '例外が発生しなかったときだけ',
      'except 節がない場合のみ',
    ],
    correct: 0,
    explanation: 'finally は「何が起きても必ず実行」が約束されている節。ファイルを閉じる、ネットワーク接続を解放するなど、リソース解放に使う。例外が発生して except で捕まえようが、return / break / continue で抜けようが、finally は実行される。なお finally の中で return すると、try / else 側の return より優先されてしまう（戻り値が上書き）ので、finally に return を書くのは要注意パターン。文脈マネージャ（with 文）が使える場面ではそちらが優先される。',
  },

  // ====== モジュール（誤答癖②③：語順・存在しない値）======
  {
    id: 'mod-name-main', category: 'モジュール',
    question: 'スクリプトを `python script.py` で直接実行したとき、`__name__` の値は？',
    choices: ['"__main__"', '"__module__"', 'スクリプトのファイル名', 'モジュール名'],
    correct: 0,
    explanation: '__name__ に入る値は2種類だけ。直接実行 → "__main__"、import された → そのモジュール名。"__module__" や "__file__" のようないかにもありそうな値は引っかけ、実際には登場しない。「__name__ は2値だけ」と固定して覚えると `if __name__ == "__main__":` のガードを書く場面で迷わない。「ありそうな単語」を選ぶ癖が出る人ほど、ここは即答できるよう叩き込む。',
  },
  {
    id: 'mod-search-path', category: 'モジュール',
    question: 'Python が import 文でモジュールを探す場所は？',
    choices: ['sys.path に並んだディレクトリ', 'シンボリックリンクを置いたディレクトリ', 'PATH 環境変数のディレクトリ', '/usr/lib のみ'],
    correct: 0,
    explanation: 'import の検索先は sys.path に書かれたディレクトリだけ。sys.path にはビルトイン → カレントスクリプトのディレクトリ → PYTHONPATH → site-packages の順で要素が並んでいる。「シンボリックリンクのディレクトリ」のような言葉は試験で頻出のひっかけ — シンボリックリンクは「別名」の仕組みで、検索パスの議論には登場しない。「import が見るのは sys.path だけ」と1語で覚える。',
  },

  // ====== 関数注釈（誤答癖③⑥：存在しない記号・暗黙ルール）======
  {
    id: 'anno-arrow', category: '構文',
    question: '関数の戻り値の型を注釈する記号は？',
    choices: ['->', '=>', '::', ':'],
    correct: 0,
    explanation: '戻り値注釈は -> （ハイフン+不等号で矢印）。引数注釈は引数名の後ろに :型 をつける。`def f(x: int) -> str:` の形。=> は JavaScript のアロー関数の記号で Python では使わない、:: は Ruby/C++ のスコープ演算子。「ありそうな記号」が並ぶと推測で選びがちだが、Python の戻り値注釈は -> ただ1つだけと固定する。',
  },
  {
    id: 'anno-no-check', category: '構文',
    question: '関数注釈（型ヒント）の効果として正しいのは？',
    choices: [
      '情報として __annotations__ に保持されるだけで実行時の型強制はない',
      '実行時に自動で型チェックされる',
      '型が違うと自動でキャストされる',
      'デフォルト値として使われる',
    ],
    correct: 0,
    explanation: '注釈は __annotations__ 属性に辞書として格納されるだけで、実行時には何もしない。違う型を渡してもエラーにならない（mypy などの外部ツールが静的解析する）。「注釈があるのだから型チェックされるはず」という直感が外れるパターン。「Python の注釈は実行時には飾り」と覚える。',
  },

  // ====== 辞書（誤答癖⑥：暗黙ルール）======
  {
    id: 'dict-loop-key', category: '辞書',
    question: '`for x in d:` （d は辞書）でループすると x に入るのは？',
    choices: ['キー', '値', '(キー, 値) のタプル', 'キーと値が交互に'],
    correct: 0,
    explanation: '辞書を直接ループするとキーが取れる。`for x in d` は `for x in d.keys()` と同義。値が欲しければ d.values()、両方なら `for k, v in d.items()`。`for kw in kwargs: print(kw, kwargs[kw])` のようなパターンで「kw は値」と勘違いすると出力が「値:キー」の順になって誤答する。',
  },
  {
    id: 'dict-comp', category: '辞書',
    question: '辞書内包表記の正しい構文は？',
    choices: [
      '{k: v for x in iterable}',
      '[k: v for x in iterable]',
      '{k = v for x in iterable}',
      '(k: v for x in iterable)',
    ],
    correct: 0,
    explanation: '波括弧 + キー: 値 + for 句。`{x: x*2 for x in [1,2,3]}` → {1:2, 2:4, 3:6}。括弧の種類で生成物が決まる: [] はリスト内包、{ : } は辞書内包、{ } は集合内包、( ) はジェネレータ式。「辞書だから波括弧、キーと値だから :」と要素から逆算する。',
  },

  // ====== データ型（誤答癖⑥：暗黙ルール）======
  {
    id: 'tuple-inner-mutable', category: 'データ型',
    question: '`t = ([1, 2], 3)` の後、`t[0].append(4)` を実行するとどうなる？',
    choices: [
      't は ([1, 2, 4], 3) になる',
      'TypeError が発生する',
      't は変わらない',
      'タプル全体が新しいオブジェクトに置き換わる',
    ],
    correct: 0,
    explanation: 'タプル自体はイミュータブル（要素の差し替えはできない）が、要素として入っているリストの中身は変更可能。`t[0] = [9]` はエラーだが `t[0].append(4)` はリストへの操作なので OK。「タプルは完全にイミュータブル」と単純化すると外す典型。「差し替えはダメ、中身の操作は OK」と分けて覚える。',
  },
  {
    id: 'list-count-quote', category: 'データ型',
    question: '`colors = ["red", "blue", "red"]` で "red" の出現数を数えるには？',
    choices: [
      'colors.count("red")',
      'colors.count(red)',
      'count("red", colors)',
      'count(colors, "red")',
    ],
    correct: 0,
    explanation: 'count はリストのメソッド形式 `obj.count(x)`。引数の "red" はクォート必須 — クォートを外すと `red` という変数として扱われ NameError。組み込み関数 count() は Python に存在しない。「メソッドは obj.method()、文字列はクォートで囲む」の二段チェックを習慣にする。',
  },
  {
    id: 'func-default-shared', category: '関数引数',
    question: '`def add(a, lst=[]): lst.append(a); print(lst)` を順に `add(1); add(2); add(3)` で呼ぶと、3回目の出力は？',
    choices: ['[1, 2, 3]', '[3]', '[1]', 'TypeError'],
    correct: 0,
    explanation: 'デフォルト引数のリストは関数定義時に1度だけ作られ、呼び出し間で共有される。1回目 [1] → 2回目 [1, 2] → 3回目 [1, 2, 3] と蓄積。「毎回新しいリストになりそう」という直感を裏切る Python の有名な落とし穴。回避策は `def add(a, lst=None): if lst is None: lst = []`。',
  },

  // ====== 入出力（誤答癖①：推測しがち）======
  {
    id: 'io-open', category: '入出力',
    question: 'with 文でファイルを読み込み用に開く正しい書き方は？',
    choices: [
      'with open("f.txt", "r") as f:',
      'with fileopen("f.txt", "r") as f:',
      'with file.open("f.txt", "r") as f:',
      'with Open("f.txt", "r") as f:',
    ],
    correct: 0,
    explanation: 'ファイルを開く組み込み関数は open()（fileopen でも file.open でも Open でもない）。「fileopen」のような複合語っぽい名前は実在しないが「ありそう」に見える引っかけ。「ファイル操作は素の open()」と固定。as の後の名前が以降の参照名になる（`as f` なら f.read()）。',
  },

  // ====== 標準ライブラリ（誤答癖①⑤：名前推測・対の取り違え）======
  {
    id: 'lib-stat-mean', category: '標準ライブラリ',
    question: 'statistics モジュールで平均値を求める関数は？',
    choices: ['statistics.mean', 'statistics.average', 'statistics.avg', 'statistics.midpoint'],
    correct: 0,
    explanation: '平均は mean。average ではない（英語的には average の方が自然なので推測で外しやすい）。中央値は median、分散は variance、標準偏差は stdev。「ありそうな名前」と「実際の API 名」がずれる典型 — 推測ではなく丸暗記する。「statistics は mean / median / variance」のセットで唱える。',
  },
  {
    id: 'lib-urlopen', category: '標準ライブラリ',
    question: 'URL のリソースを取得する関数は？',
    choices: [
      'urllib.request.urlopen',
      'urllib.request.open',
      'urllib.request.geturl',
      'urllib.request.read',
    ],
    correct: 0,
    explanation: 'urlopen が正解（open ではない）。url + open を1単語にした urlopen。ファイル用の組み込み open() と紛れないよう独自の名前にしている。geturl はレスポンスオブジェクトのメソッドで取得用ではない。「URL を開く = urlopen」とまとめて覚える。',
  },
  {
    id: 'lib-datetime-now', category: '標準ライブラリ',
    question: '現在の日時オブジェクトを取得する一般的な書き方は？',
    choices: [
      'from datetime import datetime; datetime.now()',
      'from datetime import date; date.today()',
      'from datetime; datetime.today()',
      'from datetime import now; now()',
    ],
    correct: 0,
    explanation: 'datetime モジュールから datetime クラスを取り出して now()。datetime はモジュール名でもありその中のクラス名でもあるので二重に書くのが紛らわしい。date.today() は時刻なし日付のみで別物。`now` という関数は単独では存在しない。',
  },
  {
    id: 'lib-template-sub', category: '標準ライブラリ',
    question: 'string.Template の substitute に値を渡す書き方は？',
    choices: [
      't.substitute(name="Alice")',
      't.substitute("Alice")',
      't.substitute(["Alice"])',
      't.substitute(name, "Alice")',
    ],
    correct: 0,
    explanation: 'substitute はキーワード引数で渡す（位置引数は不可）。テンプレート内の $name に Alice を埋めたいなら name="Alice"。テンプレートが何の変数を参照しているか名前で結び付くので必然的にキーワード形式。なお safe_substitute は変数が未定義でも残すだけでエラーを起こさない別関数。',
  },

  // ====== パッケージ（誤答癖①：推測）======
  {
    id: 'pkg-venv', category: 'パッケージ',
    question: '仮想環境 myenv を作成するコマンドは？',
    choices: [
      'python -m venv myenv',
      'venv myenv',
      'python venv myenv',
      'python --venv myenv',
    ],
    correct: 0,
    explanation: '-m はモジュールをスクリプトとして実行するオプション。venv モジュールに myenv という引数を渡して仮想環境ディレクトリを作る。`venv` 単独のコマンドは存在しない。`python venv` は python が venv というファイルを探して失敗する。「-m が必須」と覚える。',
  },

  // ====== クラス（誤答癖①⑥：継承構文・暗黙ルール）======
  {
    id: 'cls-super', category: 'クラス',
    question: '派生クラスから基底クラスのメソッドを呼ぶ正しい書き方は？',
    choices: [
      'super().method(arg)',
      'super.method(arg)',
      'super().method(self, arg)',
      'self.super.method(arg)',
    ],
    correct: 0,
    explanation: 'super() を呼び出してメソッドアクセス。self は自動的に渡されるので明示しない。括弧抜きの super はクラスオブジェクト自体で別物。クラス名を直接呼ぶ別流儀（ClassName.method(self, arg)）では self を渡すが、super() 形式では不要。「super() なら self なし、ClassName 形式なら self あり」と対比で覚える。',
  },
  {
    id: 'cls-self-vs-local', category: 'クラス',
    question: 'メソッド内で `num = 1` と書いた場合、これはインスタンス属性になる？',
    choices: [
      'ならない（ローカル変数として扱われる、属性にするには self.num = 1 が必要）',
      'なる（self.num = 1 と同じ）',
      'なる（ただし読み取り専用）',
      'なる（クラス変数として）',
    ],
    correct: 0,
    explanation: '`num = 1` はメソッド内のローカル変数を作るだけで、インスタンスに何も残らない。インスタンス属性にするには必ず `self.num = 1`。出題コードで `num` と `self.num` が混在している場合は別物として追跡する。両者を混同すると、出力が `4,3,1,2` のような順になる挙動を「同じ変数なのに変な出力」と誤読してしまう。',
  },

  // ====== 例外（誤答癖④⑤：制御フロー追跡・対の取り違え）======
  {
    id: 'exc-raise-skips', category: '例外',
    question: '関数内で raise した後、同じ関数内のその後の行は？',
    choices: [
      '実行されず即座に呼び出し元へ送出される',
      '実行されてから例外が伝わる',
      'finally 節として扱われる',
      'return 文として扱われる',
    ],
    correct: 0,
    explanation: 'raise はその時点で関数を抜ける（return と同じ流れ）。`raise X; print("never")` の print は絶対に実行されない。コード追跡で「raise の後の print も実行される」と読むと出力が1行多くなる誤答に直結する。「raise を見たらその関数の以降の行は捨てる」と機械的に処理。',
  },
  {
    id: 'exc-args-tuple', category: '例外',
    question: '`except E as e:` のとき、e.args の型は？',
    choices: ['tuple', 'list', 'dict', 'str'],
    correct: 0,
    explanation: 'args は raise 時に渡された引数を入れた tuple。`raise E("a", "b")` の e.args は ("a", "b")。dict や list ではない。Python では「複数引数が並んだら tuple」というパターンが一貫している（*args も tuple）。「複数引数 = tuple」のルールで全体を統合する。',
  },

  // ====== インタープリタ追加（章を網羅）======
  {
    id: 'int-repl-start', category: 'インタープリタ',
    question: '対話モード（REPL）を起動するためにシェルで打つコマンドは？',
    choices: ['python', 'python -i', 'python --interactive', 'python repl'],
    correct: 0,
    explanation: 'シェルから `python` と打つだけで対話モードが起動し、`>>>` プロンプトが現れる。-i は「スクリプト実行後に対話モードに入る」別オプションで、最初から起動するときには不要。--interactive や repl のような長い名前は他言語の流儀で、Python にはない。「python と打つだけ」と最短を覚えておく。',
  },
  {
    id: 'int-quit', category: 'インタープリタ',
    question: '対話モードを正常に終了させる関数は？',
    choices: ['quit() または exit()', 'close()', 'stop()', 'sys.terminate()'],
    correct: 0,
    explanation: 'quit() / exit() のどちらでも終了できる。両方とも site モジュールが提供する補助関数で、対話モード専用。スクリプト内で正式に終了させたい場合は sys.exit() を使う。close() は file オブジェクト等のメソッドで対話モードと無関係 — 「終了っぽい単語を選びがち」な癖が出ると外す引っかけ。',
  },
  {
    id: 'int-eof-unix', category: 'インタープリタ',
    question: 'Unix系（Linux/macOS）で対話モードを終了させるショートカットキー（EOF入力）は？',
    choices: ['Ctrl+D', 'Ctrl+Z', 'Ctrl+C', 'Esc'],
    correct: 0,
    explanation: 'Unix系では Ctrl+D で EOF（ファイル終端文字）を送って終了。Windows は Ctrl+Z + Enter なので OS で記号が違う。Ctrl+C は実行中の処理を中断する別物（KeyboardInterrupt 例外を発生させる）。「Unix=D、Win=Z」とOSと文字をペアで暗記。',
  },
  {
    id: 'int-eof-windows', category: 'インタープリタ',
    question: 'Windows で対話モードを終了させるショートカットキー（EOF入力）は？',
    choices: ['Ctrl+Z + Enter', 'Ctrl+D', 'Ctrl+X', 'Alt+F4'],
    correct: 0,
    explanation: 'Windows では Ctrl+Z で ^Z 文字を入力し、Enter で確定して EOF を送る。これは MS-DOS 時代から続く慣習で、Unix の Ctrl+D とは別の文字を使う。Alt+F4 はOS側のウィンドウクローズで Python の終了処理ではない。',
  },
  {
    id: 'int-i-option', category: 'インタープリタ',
    question: 'スクリプトを実行した「後に」対話モードに入るオプションは？',
    choices: ['python -i script.py', 'python -c script.py', 'python --interactive script.py', 'python -m script.py'],
    correct: 0,
    explanation: '-i は interactive の i。スクリプトの全変数・関数が定義済みの状態で対話モードに入れるので、デバッグや動作確認に便利。-c はコード文字列を実行する別オプション、-m はモジュール実行で別役割。「組み合わせる対象」によってオプションが変わる: スクリプトに -i、文字列に -c、モジュールに -m。',
  },
  {
    id: 'int-m-option', category: 'インタープリタ',
    question: 'モジュールをスクリプトとして実行するオプションは？（例: venv モジュールで仮想環境作成）',
    choices: ['python -m venv', 'python -c venv', 'python -i venv', 'python --module venv'],
    correct: 0,
    explanation: '-m は「module を script として run する」オプション。`python -m venv myenv` で venv モジュールを直接実行、`python -m pip install ...` のように pip も呼べる。「-m モジュール名」のパターンを覚える。venv 単独のコマンドは存在しないので、-m が必須。',
  },
  {
    id: 'int-prompt-primary', category: 'インタープリタ',
    question: '対話モードの一次プロンプト（プライマリプロンプト）の記号は？',
    choices: ['>>>', '>', '=>', '$'],
    correct: 0,
    explanation: '一次プロンプトは `>>>`（不等号3つ）。通常のコマンド入力待ちで表示される。試験では `=>` や `>` のような「ありそうな記号」が並ぶが、Python は `>>>` 一択。「>>>＝3本の矢」と形で覚えておくと、見慣れない記号に惑わされない。',
  },
  {
    id: 'int-prompt-secondary', category: 'インタープリタ',
    question: '対話モードで複数行入力中に表示される二次プロンプト（セカンダリプロンプト）の記号は？',
    choices: ['...', '>>>', '|', '>'],
    correct: 0,
    explanation: '二次プロンプトは `...`（ピリオド3つ）。for / if / def など、複数行にわたる文を入力中に表示される。`>>>` は一次プロンプトで役割が別。「3つの矢=一次、3つのドット=二次」と対比でセットで覚える。',
  },
  {
    id: 'int-prompt-meaning', category: 'インタープリタ',
    question: '「プロンプト」という用語の意味は？',
    choices: [
      'ユーザーに対してコマンドの入力を促すために表示される文字列',
      'プログラムが終了したことを示す文字',
      'エラーメッセージの一種',
      'パッケージのバージョン番号',
    ],
    correct: 0,
    explanation: 'prompt は英語で「促す」の意味。コンピュータがユーザーに「次の入力をどうぞ」と促す印として表示される文字列。Python では `>>>` と `...` がプロンプト。bash の `$` や Windows の `C:\\>` も同じ役割でプロンプトと呼ばれる。',
  },
  {
    id: 'int-encoding-default', category: 'インタープリタ',
    question: 'Python 3 のソースコードのデフォルトエンコーディングは？',
    choices: ['UTF-8', 'ASCII', 'Shift_JIS', 'Latin-1'],
    correct: 0,
    explanation: 'Python 3 ではデフォルトで UTF-8 として扱う。日本語コメント・日本語文字列をそのまま書ける。Python 2 はデフォルト ASCII で UTF-8 にするには宣言が必要だったが、3 で統一された。「3 は UTF-8」と一語で覚える。',
  },
  {
    id: 'int-encoding-position', category: 'インタープリタ',
    question: 'デフォルト以外のエンコーディングを使う場合、エンコーディング宣言を書く位置は？',
    choices: [
      '1行目（shebang行があれば2行目）',
      '必ず1行目',
      'ファイル末尾',
      'どこでも良い',
    ],
    correct: 0,
    explanation: '通常は1行目に `# -*- coding: shift_jis -*-` のように書く。ただし Unix系で shebang行（`#!/usr/bin/env python`）を1行目に書く必要がある場合は、エンコーディング宣言は2行目になる。「必ず1行目」と単純化すると、shebang ありの場合に外す。',
  },
  {
    id: 'int-underscore', category: 'インタープリタ',
    question: '対話モードで「直前の式の結果」を参照する変数は？',
    choices: ['_', '__', 'last', 'prev'],
    correct: 0,
    explanation: '対話モード限定で `_`（アンダースコア1つ）が直前の式の値を保持する。`>>> 2+3` の後に `>>> _` と打つと 5 が出る、`>>> _ * 2` で 10 が出る、というように電卓代わりに使える。スクリプト内では機能せず、対話モード専用のおまけ機能。',
  },
  {
    id: 'int-jupyter-kernel', category: 'インタープリタ',
    question: 'Jupyter Notebook のカーネルとして使われている対話環境は？',
    choices: ['IPython', 'bpython', 'CPython', 'Anaconda'],
    correct: 0,
    explanation: 'Jupyter のカーネル（コードを実行する裏のエンジン）は IPython。元々 IPython 自体がノートブック機能を持っていたのが、言語非依存に汎用化されて Jupyter として独立した。CPython は Python 言語の標準実装そのもの、Anaconda は Python ディストリビューション（パッケージ詰め合わせ）で別カテゴリ。',
  },
  {
    id: 'int-bpython', category: 'インタープリタ',
    question: '拡張対話環境 bpython の特徴として正しいのは？',
    choices: [
      'シンタックスハイライト・自動インデント・補完を強化した対話環境',
      'Python の本体実装',
      'Webブラウザ上で動く統合開発環境',
      'モバイル端末用のPython実装',
    ],
    correct: 0,
    explanation: 'bpython は標準の対話モードを拡張した CLI ツール。色付き表示、関数シグネチャ表示、自動補完が強化されている。`pip install bpython` でインストール、`bpython` で起動。Webブラウザで動くノートブックは Jupyter、Python 本体実装は CPython と別カテゴリ。',
  },

  // ====== イテレーション（誤答癖④：境界の追跡）======
  {
    id: 'ctrl-loop-index-err', category: 'イテレーション',
    question: '次のコードの最終的な挙動は？\n\n```\nlst = ["a", "b", "c", "d"]\nfor i in range(len(lst)):\n    i = i + 1\n    print(lst[i])\n```',
    choices: [
      'IndexError が発生する',
      '"a" "b" "c" "d" を順に出力',
      '"b" "c" "d" を出力した後に終了',
      '何も出力しない',
    ],
    correct: 0,
    explanation: 'i は 0,1,2,3 と回るが i+=1 で 1,2,3,4 になる。最初の3周は lst[1]="b", lst[2]="c", lst[3]="d" と正常に出力されるが、最後の周回で lst[4] にアクセスして IndexError。中盤の正常出力につられて選択肢の「b c d 出力後終了」を選ぶと外す。「ループは必ず最終周回まで指で追う」を癖にする。',
  },
];
