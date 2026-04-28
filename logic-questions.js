// 模擬演習1〜4から抽出したコードトレース問題集
// 自動生成 (mock-exams/*.json から code フィールド付き問題のみ抽出)
const LOGIC_QUESTIONS = [
  {
    "id": "logic-mock-exam-1-attempt2-q1",
    "source": "模擬演習1（試行2） Q1",
    "domain": "エラーと例外",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "try:\n  print(5 / 0)\nexcept ZeroDivisionError:\n  print(\"ZeroDivisionError\")\nexcept NameError:\n  print(\"NameError\")\nexcept ValueError:\n  print(\"ValueError\")\nexcept Exception:\n  print(\"Exception\")",
    "choices": [
      "ZeroDivisionError",
      "NameError",
      "ValueError",
      "Exception"
    ],
    "correct": 0,
    "explanation": "5/0 で ZeroDivisionError が発生。複数 except 節は上から順に該当を探し、最初にマッチしたもののみ実行される。"
  },
  {
    "id": "logic-mock-exam-1-attempt2-q2",
    "source": "模擬演習1（試行2） Q2",
    "domain": "データ構造",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "number = [1, 2, 3, 4, 5, 6, 7]\ndel number[5]\nprint(number)\ndel number[1:3]\nprint(number)\ndel number[:]\nprint(number)",
    "choices": [
      "[1, 2, 3, 4, 6, 7] / [4, 5, 6, 7] / []",
      "[1, 2, 3, 4, 5, 7] / [1, 4, 5, 6, 7] / []",
      "[1, 2, 3, 4, 5, 7] / [1, 4, 5, 7] / []",
      "エラーが発生する"
    ],
    "correct": 2,
    "explanation": "del は要素やスライス範囲、リスト全体を削除可能。前の操作の結果が次に引き継がれる点に注意。"
  },
  {
    "id": "logic-mock-exam-1-attempt2-q4",
    "source": "模擬演習1（試行2） Q4",
    "domain": "データ構造",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "users = {'Yamada': 170, 'Suzuki': 165, 'Takayama': 172}\nfor k, v in users.items():\n  print(\"キー:\", k, \"値:\", v)",
    "choices": [
      "キー: Yamada 値: 170 / キー: Suzuki 値: 165 / キー: Takayama 値: 172",
      "キー: Takayama 値: 170 / キー: Suzuki 値: 165 / キー: Yamada 値: 172",
      "キー: 172 値: Takayama / キー: 165 値: Suzuki / キー: 170 値: Yamada",
      "エラーになる"
    ],
    "correct": 0,
    "explanation": "items() は (キー, 値) のタプルを返す。for k, v in d.items() でアンパックして取得。"
  },
  {
    "id": "logic-mock-exam-1-attempt2-q6",
    "source": "模擬演習1（試行2） Q6",
    "domain": "データ構造",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "scores = [1, 2, 3, 4, 5]\nnew_scores = []\nwhile scores:\n  score = scores.pop()\n  new_scores.append(score)\nprint(new_scores)",
    "choices": [
      "[]",
      "[1, 2, 3, 4]",
      "[5, 4, 3, 2, 1]",
      "[1, 2, 3, 4, 5]"
    ],
    "correct": 2,
    "explanation": "pop() はリスト末尾から取り出す。while は scores が空になるまで繰り返す。結果は逆順。"
  },
  {
    "id": "logic-mock-exam-1-attempt2-q9",
    "source": "模擬演習1（試行2） Q9",
    "domain": "入出力",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "score = 80\naverage = 59.3333\nprint(f'あなたの点数は{score:3d}点です')\nprint(f'平均点は{average:.2f}点です')\nprint(f'平均点は{average:10.2f}点です')",
    "choices": [
      "あなたの点数は80 点です / 平均点は59.33点です / 平均点は59.33     点です",
      "あなたの点数は80 点です / 平均点は59点です / 平均点は59.33     点です",
      "あなたの点数は 80点です / 平均点は59.33点です / 平均点は     59.33点です",
      "あなたの点数は 80点です / 平均点は59点です / 平均点は     59.33点です"
    ],
    "correct": 2,
    "explanation": "数値は右寄せで表示。{:3d} は幅3の整数、{:.2f} は小数点以下2桁、{:10.2f} は幅10で小数点以下2桁。"
  },
  {
    "id": "logic-mock-exam-1-attempt2-q11",
    "source": "模擬演習1（試行2） Q11",
    "domain": "エラーと例外",
    "question": "次のスクリプトを実行して「数値を入力してください：」に「a」を入力したとき、出力結果として適切な選択肢を選択してください。",
    "code": "try:\n  x = int(input(\"数値を入力してください：\"))\n  print(x)\nexcept ValueError:\n  print(\"数値以外が入力されました\")",
    "choices": [
      "構文エラーが発生する",
      "a",
      "数値以外が入力されました",
      "何も表示されない"
    ],
    "correct": 2,
    "explanation": "int('a') で ValueError 発生 → except 節で「数値以外が入力されました」が出力。"
  },
  {
    "id": "logic-mock-exam-1-attempt2-q12",
    "source": "模擬演習1（試行2） Q12",
    "domain": "エラーと例外",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "try:\n  raise ValueError('try')\nexcept NameError:\n  print('NameError')\nexcept ValueError:\n  print('ValueError')\nexcept:\n  print('Except')",
    "choices": [
      "try",
      "ValueError",
      "try / ValueError",
      "ValueError / Except"
    ],
    "correct": 1,
    "explanation": "ValueError を raise → ValueError except だけが実行され 'ValueError' のみ出力。複数 except が連続して走ることはない。"
  },
  {
    "id": "logic-mock-exam-1-attempt2-q14",
    "source": "模擬演習1（試行2） Q14",
    "domain": "クラス",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "class Test:\n  num = 10\n  def hello(self):\n    return \"Hello, Python\"\n\ntest = Test()\nprint(test.num)\nprint(test.hello())",
    "choices": [
      "10",
      "10 / Hello, Python",
      "何も表示されない",
      "「10」がプリントされ、エラーが表示される"
    ],
    "correct": 1,
    "explanation": "self を正しく定義しているので test.hello() は 'Hello, Python' を返す。"
  },
  {
    "id": "logic-mock-exam-1-attempt2-q15",
    "source": "模擬演習1（試行2） Q15",
    "domain": "クラス",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "class Animal:\n  legs = 4\n  def __init__(self, name):\n    self.name = name\n\ntama = Animal(\"Tama\")\npochi = Animal(\"Pochi\")\nprint(tama.legs, tama.name)\nprint(pochi.legs, pochi.name)",
    "choices": [
      "4 Tama / 4 Pochi",
      "4 tama / 4 pochi",
      "legs tama / legs pochi",
      "エラーが発生する"
    ],
    "correct": 0,
    "explanation": "クラス変数 legs=4 は全インスタンス共通。__init__ で各インスタンスに name を設定。"
  },
  {
    "id": "logic-mock-exam-1-attempt2-q19",
    "source": "模擬演習1（試行2） Q19",
    "domain": "データ構造",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "users = [\"Tanaka\", \"Suzuki\", \"Akayama\", \"Miyamoto\"]\ncopy_users = users.copy()\nusers.remove(\"Akayama\")\nprint(users)\nusers.clear()\nprint(users)\nprint(copy_users)",
    "choices": [
      "['Tanaka', 'Suzuki', 'Miyamoto'] / [] / [\"Tanaka\", \"Suzuki\", \"Akayama\", \"Miyamoto\"]",
      "[\"Tanaka\", \"Suzuki\", \"Akayama\", \"Miyamoto\"] / [] / []",
      "['Tanaka', 'Suzuki', 'Miyamoto'] / [] / ['Tanaka', 'Suzuki', 'Miyamoto']",
      "エラーになる"
    ],
    "correct": 0,
    "explanation": "copy() は浅いコピー。元の users が変更されても copy_users は影響を受けない。"
  },
  {
    "id": "logic-mock-exam-1-attempt2-q21",
    "source": "模擬演習1（試行2） Q21",
    "domain": "気楽な入門編",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "a = 7\nb = 2\nc = a / b\nd = a // b\ne = a % b\nprint(\"c:\", c, \"d:\", d, \"e:\", e)",
    "choices": [
      "c: 3 d: 1 e: 3",
      "c: 3 d: 3.5 e: 1",
      "c: 3.5 d: 1 e: 3.5",
      "c: 3.5 d: 3 e: 1"
    ],
    "correct": 3,
    "explanation": "/ は除算（小数）、// は整数除算（商）、% は剰余。7/2=3.5, 7//2=3, 7%2=1。"
  },
  {
    "id": "logic-mock-exam-1-attempt2-q22",
    "source": "模擬演習1（試行2） Q22",
    "domain": "気楽な入門編",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "a = 3\nb = 5\nc, d = a + 4, b - 3\nprint(\"c:\", c, \"d:\", d)",
    "choices": [
      "c: 7 d: 2",
      "c: 12 d: 5",
      "c: 9 d: 0",
      "エラーが発生する"
    ],
    "correct": 0,
    "explanation": "多重代入。c=a+4=7, d=b-3=2。"
  },
  {
    "id": "logic-mock-exam-1-attempt2-q23",
    "source": "模擬演習1（試行2） Q23",
    "domain": "気楽な入門編",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "print(\"python\\name\")\nprint(\"python\\\\name\")\nprint(r\"python\\name\")",
    "choices": [
      "python / ame / python\\name / python\\name",
      "python\\name / python\\name / python / ame",
      "python / ame / pytho\\name / python",
      "ame / python\\name / python / ame"
    ],
    "correct": 0,
    "explanation": "\\n は改行、\\\\ は \\ 1文字、r\"...\" は raw 文字列でエスケープ無効。"
  },
  {
    "id": "logic-mock-exam-1-attempt2-q24",
    "source": "模擬演習1（試行2） Q24",
    "domain": "気楽な入門編",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "str = 'apple,banana,orange'\nprint(str[0], str[8], str[-5], str[2:7])",
    "choices": [
      "e a r ple,b",
      "a a a pple,",
      "a n r ple,b",
      "a n r pple,"
    ],
    "correct": 2,
    "explanation": "[0]=a, [8]=n, [-5]=r（後ろから5番目）, [2:7]='ple,b'。"
  },
  {
    "id": "logic-mock-exam-1-attempt2-q25",
    "source": "模擬演習1（試行2） Q25",
    "domain": "気楽な入門編",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "num = [1, 3, 5, 7, 9]\nprint(num[1], num[-3])",
    "choices": [
      "1 9",
      "3 9",
      "3 5",
      "エラーが発生する"
    ],
    "correct": 2,
    "explanation": "num[1]=3、num[-3]=後ろから3番目=5。"
  },
  {
    "id": "logic-mock-exam-1-attempt2-q26",
    "source": "模擬演習1（試行2） Q26",
    "domain": "気楽な入門編",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "a, b = 1, 5\nwhile a < 30:\n  print(a, end=',')\n  a = a + b",
    "choices": [
      "1,6,11,16,21,26,",
      "1,6,11,16,21,26,31",
      "5,11,16,21,26,",
      "5,11,16,21,26,31"
    ],
    "correct": 0,
    "explanation": "a=1,6,11,16,21,26 まで while ループ。31 になる前に条件が False で抜ける。"
  },
  {
    "id": "logic-mock-exam-1-attempt2-q27",
    "source": "模擬演習1（試行2） Q27",
    "domain": "制御構文ツール",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "x = 8\nif x > 10:\n  print(\"xは10を超えた数です\")\nelif x == 10:\n  print(\"xは10です\")\nelse:\n  print(\"xは10未満です\")",
    "choices": [
      "xは10を超えた数です",
      "xは10です",
      "xは10未満です",
      "エラーが発生する"
    ],
    "correct": 2,
    "explanation": "x=8 は 10 未満なので else 節。"
  },
  {
    "id": "logic-mock-exam-1-attempt2-q28",
    "source": "模擬演習1（試行2） Q28",
    "domain": "制御構文ツール",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "for count in range(2):\n  print(count)",
    "choices": [
      "1",
      "1 / 2",
      "0 / 1",
      "0 / 1 / 2"
    ],
    "correct": 2,
    "explanation": "range(2) は 0, 1。stop は含まない。"
  },
  {
    "id": "logic-mock-exam-1-attempt2-q29",
    "source": "模擬演習1（試行2） Q29",
    "domain": "制御構文ツール",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "colors = [\"red\", \"black\", \"green\", \"blue\"]\nfor i in range(len(colors)):\n  i = i + 1\n  print(i, colors[i], end=\",\")",
    "choices": [
      "0 red,1 black,2 green",
      "0 red,1 black,2 green,3 blue,",
      "1 red,2 black,3 green,4 blue,",
      "エラーが発生する"
    ],
    "correct": 3,
    "explanation": "i=0,1,2,3 と回るが i+=1 で 1,2,3,4 になる。最後の i=4 で colors[4] にアクセスして IndexError。"
  },
  {
    "id": "logic-mock-exam-1-attempt2-q30",
    "source": "模擬演習1（試行2） Q30",
    "domain": "制御構文ツール",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "def greeting(message):\n  print(message)\n\ngreeting(\"おはよう\")",
    "choices": [
      "エラーが発生する",
      "何も表示されない",
      "greeting",
      "おはよう"
    ],
    "correct": 3,
    "explanation": "関数定義で message を受け取り print する。'おはよう' を渡せば 'おはよう' が出力される。"
  },
  {
    "id": "logic-mock-exam-1-attempt2-q31",
    "source": "模擬演習1（試行2） Q31",
    "domain": "制御構文ツール",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "def add(a, b=2):\n  return a + b\n\nprint(add(1))",
    "choices": [
      "None",
      "add(1, 2)",
      "3",
      "エラーになる"
    ],
    "correct": 2,
    "explanation": "デフォルト引数 b=2。add(1) は 1+2=3。"
  },
  {
    "id": "logic-mock-exam-1-attempt2-q32",
    "source": "模擬演習1（試行2） Q32",
    "domain": "制御構文ツール",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "number = 3\ndef add(a=5, b=number):\n  print(a + b)\n\nb = 2\nadd()",
    "choices": [
      "7",
      "8",
      "何も表示されない",
      "エラーになる"
    ],
    "correct": 1,
    "explanation": "デフォルト引数は定義時に評価。b=number=3 が固定。add() = 5+3 = 8。後の b=2 は無関係。"
  },
  {
    "id": "logic-mock-exam-1-attempt2-q36",
    "source": "模擬演習1（試行2） Q36",
    "domain": "データ構造",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "numbers = [5, 3, 5, 1, 3, 2, 4, 3, 4, 3]\nprint(numbers.index(3), end=\",\")\nprint(numbers.index(3, 2), end=\",\")\nprint(numbers.index(3, 5, 9), end=\",\")",
    "choices": [
      "1,4,7,",
      "2,5,8,",
      "1,4,",
      "2,5,"
    ],
    "correct": 0,
    "explanation": "index(x, start, end) は start から end-1 の範囲で最初の x を探す。1 → 4 → 7 と返る。"
  },
  {
    "id": "logic-mock-exam-1-attempt2-q37",
    "source": "模擬演習1（試行2） Q37",
    "domain": "標準ライブラリめぐり",
    "question": "次のコードを実行した結果、①〜④の行の出力として、不適切な選択肢を選択してください。",
    "code": "import re\ntext = \"Hello 2020 Python World Pytho\"\nprint(re.findall(r\"\\b\\w\", text))    # ①\nprint(re.findall(r\"\\b\\d.\", text))   # ②\nprint(re.findall(r\"\\bPython?\", text)) # ③\nprint(re.findall(r\"\\bHe..|W.\", text)) # ④",
    "choices": [
      "①['H', '2', 'P', 'W', 'P']",
      "②['2020']",
      "③['Python', 'Pytho']",
      "④['Hell', 'Wo']"
    ],
    "correct": 1,
    "explanation": "②は \\b\\d. = 単語先頭の数字+任意1文字。'2020' から '20' のみマッチ → ['20']。'2020' は不適切。"
  },
  {
    "id": "logic-mock-exam-2-q3",
    "source": "模擬演習2 Q3",
    "domain": "気楽な入門編",
    "question": "次のコードのうち、コメントとして扱われない選択肢を選択してください。",
    "code": "# a num = 1\n# b\ntext1 = 'Python' # c\ntext2 = 'PHP # d'",
    "choices": [
      "# a",
      "# b",
      "# c",
      "# d"
    ],
    "correct": 3,
    "explanation": "クォート内の # は文字として扱われ、コメントにならない。"
  },
  {
    "id": "logic-mock-exam-2-q5",
    "source": "模擬演習2 Q5",
    "domain": "気楽な入門編",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "fruits = (\n    \"orange\"\n    \"apple\"\n    \"lemon\"\n)\nprint(fruits)",
    "choices": [
      "orange, apple, lemon",
      "orangeapplelemon",
      "エラーになる",
      "orange apple lemon"
    ],
    "correct": 1,
    "explanation": "丸括弧内の文字列リテラルは + なしで連結される。orangeapplelemon。"
  },
  {
    "id": "logic-mock-exam-2-q6",
    "source": "模擬演習2 Q6",
    "domain": "気楽な入門編",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "fruits = \"\"\"orange\napple\nlemon\n\"\"\"\nprint(fruits)",
    "choices": [
      "orangeapplelemon",
      "orange, apple, lemon",
      "エラーが発生する",
      "orange / apple / lemon（各行表示）"
    ],
    "correct": 3,
    "explanation": "トリプルクォートは改行を含む複数行文字列をそのまま保持。"
  },
  {
    "id": "logic-mock-exam-2-q7",
    "source": "模擬演習2 Q7",
    "domain": "気楽な入門編",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "colors = [\"red\", \"blue\", \"white\", \"yellow\", \"black\"]\ncolors[1] = \"green\"\nprint(colors)\nprint(len(colors))",
    "choices": [
      "エラーになる",
      "[\"red\", \"blue\", \"white\", \"yellow\", \"black\"] / 5",
      "[\"green\", \"blue\", \"white\", \"yellow\", \"black\"] / 5",
      "[\"red\", \"green\", \"white\", \"yellow\", \"black\"] / 5"
    ],
    "correct": 3,
    "explanation": "colors[1] を 'green' に書き換え。要素数は 5 のまま。"
  },
  {
    "id": "logic-mock-exam-2-q8",
    "source": "模擬演習2 Q8",
    "domain": "気楽な入門編",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "number = [1, 2, 3, 4, 5]\nprint(len(number))",
    "choices": [
      "number",
      "4",
      "5",
      "6"
    ],
    "correct": 2,
    "explanation": "len() は要素数を返す。5 要素なので 5。"
  },
  {
    "id": "logic-mock-exam-2-q11",
    "source": "模擬演習2 Q11",
    "domain": "制御構文ツール",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "def add(a, b):\n  return a + b\n\nprint(add(1, 2))",
    "choices": [
      "None",
      "add(1, 2)",
      "3",
      "エラーになる"
    ],
    "correct": 2,
    "explanation": "1+2=3 が return される。"
  },
  {
    "id": "logic-mock-exam-2-q12",
    "source": "模擬演習2 Q12",
    "domain": "制御構文ツール",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "num = 1\n\ndef add(a, b=10):\n  num = 5\n  print(a + b)\n\nnum = 2\nadd(num)",
    "choices": [
      "11",
      "12",
      "15",
      "17"
    ],
    "correct": 1,
    "explanation": "関数内 num=5 はローカルでグローバルに影響しない。add(2) → 2+10=12。"
  },
  {
    "id": "logic-mock-exam-2-q13",
    "source": "模擬演習2 Q13",
    "domain": "制御構文ツール",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "def test(name, *args, **kwargs):\n  print(name)\n  print(args)\n  print(kwargs)\n\ntest(\"Yamada\", \"特技は水泳\", \"趣味は読書\", job=\"デザイナー\", age=18)",
    "choices": [
      "Yamada' / 特技は水泳', '趣味は読書' / job'='デザイナー', 'age'=18",
      "Yamada' / ['特技は水泳', '趣味は読書'] / ['job'='デザイナー', 'age'=18]",
      "Yamada / ('特技は水泳', '趣味は読書') / {'job': 'デザイナー', 'age': 18}",
      "Yamada / ('特技は水泳', '趣味は読書') / ('job': 'デザイナー', 'age': 18)"
    ],
    "correct": 2,
    "explanation": "*args は tuple、**kwargs は dict（{key: value}）形式で表示される。"
  },
  {
    "id": "logic-mock-exam-2-q14",
    "source": "模擬演習2 Q14",
    "domain": "制御構文ツール",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "list = [\"特技は水泳\", \"趣味は読書\"]\nprint(*list)",
    "choices": [
      "特技は水泳 趣味は読書",
      "特技は水泳', '趣味は読書'",
      "['特技は水泳', '趣味は読書']",
      "エラーが発生する"
    ],
    "correct": 0,
    "explanation": "*list で要素を展開して位置引数として渡す → スペース区切りで出力。"
  },
  {
    "id": "logic-mock-exam-2-q15",
    "source": "模擬演習2 Q15",
    "domain": "制御構文ツール",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "fun = lambda a, b: a + b\nprint(fun(5, 2))",
    "choices": [
      "7",
      "5, 2",
      "5 + 2",
      "エラーが発生する"
    ],
    "correct": 0,
    "explanation": "lambda a, b: a+b は a+b を返す関数。fun(5,2)=7。"
  },
  {
    "id": "logic-mock-exam-2-q18",
    "source": "模擬演習2 Q18",
    "domain": "データ構造",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "colors = [\"red\", \"black\", \"green\"]\nmore_colors = [\"yellow\", \"white\"]\ncolors.append(\"blue\")\nprint(colors)\ncolors.extend(more_colors)\nprint(colors)",
    "choices": [
      "['red', 'black', 'green', 'blue'] / ['red', 'black', 'green', 'blue']",
      "['red', 'black', 'green', 'blue'] / ['red', 'black', 'green', 'yellow', 'white']",
      "['red', 'black', 'green', 'blue'] / ['red', 'black', 'green', 'blue', 'yellow', 'white']",
      "エラーになる"
    ],
    "correct": 2,
    "explanation": "append は1要素追加、extend は別シーケンスを連結。"
  },
  {
    "id": "logic-mock-exam-2-q19",
    "source": "模擬演習2 Q19",
    "domain": "データ構造",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "colors = ['red', 'black', 'green', 'blue', 'yellow', 'white']\ncolors.sort()\nprint(colors)\ncolors.sort(key=len)\nprint(colors)",
    "choices": [
      "['black', 'blue', 'green', 'red', 'white', 'yellow'] / ['red', 'blue', 'black', 'green', 'white', 'yellow']",
      "['red', 'blue', 'black', 'green', 'white', 'yellow'] / ['black', 'blue', 'green', 'red', 'white', 'yellow']",
      "['yellow', 'white', 'green', 'black', 'blue', 'red'] / ['yellow', 'white', 'red', 'green', 'blue', 'black']",
      "['yellow', 'white', 'red', 'green', 'blue', 'black'] / ['yellow', 'white', 'green', 'black', 'blue', 'red']"
    ],
    "correct": 0,
    "explanation": "sort() はアルファベット順、sort(key=len) は文字列の長さ順。"
  },
  {
    "id": "logic-mock-exam-2-q20",
    "source": "模擬演習2 Q20",
    "domain": "データ構造",
    "question": "次のコードを実行した結果と同じ結果になるコードを、選択肢の中から選択してください。",
    "code": "matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]\nprint([tuple(row[i] for row in matrix) for i in range(3)])",
    "choices": [
      "print(zip(*matrix))",
      "print(list(zip(*matrix)))",
      "print([zip(*matrix)])",
      "print(zip(list(*matrix)))"
    ],
    "correct": 1,
    "explanation": "zip(*matrix) は転置を生成、list() で実体化。"
  },
  {
    "id": "logic-mock-exam-2-q21",
    "source": "模擬演習2 Q21",
    "domain": "データ構造",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "users = {'Yamada': 170, 'Suzuki': 165}\nusers['Takayama'] = 172\nprint(users['Yamada'], end=\",\")\nprint(users)",
    "choices": [
      "Yamada,['Yamada': 170, 'Suzuki': 165, 'Takayama': 172]",
      "Yamada,{'Yamada': 170, 'Suzuki': 165, 'Takayama': 172}",
      "170,['Yamada': 170, 'Suzuki': 165, 'Takayama': 172]",
      "170,{'Yamada': 170, 'Suzuki': 165, 'Takayama': 172}"
    ],
    "correct": 3,
    "explanation": "users['Yamada']=170、辞書は { } で表示。"
  },
  {
    "id": "logic-mock-exam-2-q22",
    "source": "模擬演習2 Q22",
    "domain": "データ構造",
    "question": "次のコードを実行した結果と同じ結果になるコードを、選択肢の中から選択してください。",
    "code": "en = [\"red\", \"white\", \"blue\"]\nja = [\"赤色\", \"白色\", \"青色\"]\nl = []\nfor e, j in zip(en, ja):\n  l.append((e, j))\nprint(l)",
    "choices": [
      "print([e, j for e, j in item(en, ja)])",
      "print([(e, j) for e, j in zip(en, ja)])",
      "print([(j, e) for e, j in list(en, ja)])",
      "print([(j, e) for e, j in enumerate(en, ja)])"
    ],
    "correct": 1,
    "explanation": "zip + リスト内包で (e, j) のタプルを生成。"
  },
  {
    "id": "logic-mock-exam-2-q27",
    "source": "模擬演習2 Q27",
    "domain": "入出力",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "score = 80\naverage = 59.3333\nprint('あなたの点数は{:3d}点です'.format(score))\nprint('平均点は{0:.2f}点です'.format(average))\nprint('平均点は{:10.2f}点です'.format(average))",
    "choices": [
      "あなたの点数は 80点です / 平均点は59.33点です / 平均点は     59.33点です",
      "あなたの点数は 80点です / 平均点は59点です / 平均点は     59.33点です",
      "あなたの点数は80 点です / 平均点は59.33点です / 平均点は59.33     点です",
      "あなたの点数は80 点です / 平均点は59点です / 平均点は59.33     点です"
    ],
    "correct": 0,
    "explanation": "{:3d}は幅3の整数、{:.2f}は小数点以下2桁、{:10.2f}は幅10で小数点以下2桁。"
  },
  {
    "id": "logic-mock-exam-2-q28",
    "source": "模擬演習2 Q28",
    "domain": "エラーと例外",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "try:\n  print(9 / 0)\nexcept ZeroDivisionError as e:\n  print(e)\n  print(type(e))\n  print(e.args)",
    "choices": [
      "division by zero / <class 'ZeroDivisionError'> / ('division by zero',)",
      "ZeroDivisionError / (def 'ZeroDivisionError') / 'division by zero'",
      "'division by zero' / 'ZeroDivisionError' / 'division by zero', 'ZeroDivisionError'",
      "ZeroDivisionError / <function 'division by zero'> / 'division by zero',"
    ],
    "correct": 0,
    "explanation": "print(e)はメッセージ、type(e)はクラス、e.argsはタプル形式。"
  },
  {
    "id": "logic-mock-exam-2-q29",
    "source": "模擬演習2 Q29",
    "domain": "エラーと例外",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "try:\n  print('try')\n  print(10 / 0)\nexcept:\n  print('except')\nelse:\n  print('else')\nfinally:\n  print('finally')",
    "choices": [
      "try / finally",
      "else / finally",
      "except / finally",
      "try / except / finally"
    ],
    "correct": 3,
    "explanation": "try で 'try' 出力、10/0 で例外 → except 実行、最後に finally。"
  },
  {
    "id": "logic-mock-exam-2-q30",
    "source": "模擬演習2 Q30",
    "domain": "エラーと例外",
    "question": "次のコードを実行した結果として、最も適切な選択肢を選択してください。",
    "code": "try:\n  raise TypeError(\"try\", \"ok\")\nexcept NameError:\n  print('NameError')",
    "choices": [
      "\"try\", \"ok\"",
      "NameError'",
      "エラーが発生し、エラーメッセージの最後の部分に「TypeError: ('try', 'ok')」が表示される",
      "エラーが発生し、エラーメッセージの最後の部分に「NameError: ('try', 'ok')」が表示される"
    ],
    "correct": 2,
    "explanation": "TypeError を NameError except では捕捉できず、未処理例外として表示される。"
  },
  {
    "id": "logic-mock-exam-2-q32",
    "source": "模擬演習2 Q32",
    "domain": "クラス",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "num = 1\n\ndef test1():\n  def test3():\n    nonlocal num\n    num = 3\n  num = 5\n  test3()\n  print(num, end=\",\")\n\ntest1()\nprint(num)",
    "choices": [
      "3,1",
      "1,1",
      "5,3",
      "3,3"
    ],
    "correct": 0,
    "explanation": "test3 内 nonlocal num=3 で test1 のローカル num を書き換え。グローバル num は1のまま。"
  },
  {
    "id": "logic-mock-exam-2-q33",
    "source": "模擬演習2 Q33",
    "domain": "クラス",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "class Test:\n  num = 10\n  def hello():\n    return \"Hello, Python\"\n\ntest = Test()\nprint(test.num)\nprint(test.hello())",
    "choices": [
      "10",
      "10 / Hello, Python",
      "何も表示されない",
      "「10」がプリントされ、エラーが表示される"
    ],
    "correct": 3,
    "explanation": "hello() に self が無いので test.hello() は引数1個多すぎで TypeError。10 出力後にエラー。"
  },
  {
    "id": "logic-mock-exam-2-q34",
    "source": "模擬演習2 Q34",
    "domain": "標準ライブラリめぐり",
    "question": "コードを説明した選択肢のうち、不適切な選択肢を選択してください。",
    "code": "import os\nos.chdir(\"test\")\nos.getcwd()\nos.system(\"mkdir today\")\ndir(os)",
    "choices": [
      "「os.chdir(\"test\")」はカレントディレクトリをカレントディレクトリ内の「test」ディレクトリに変更するコードである",
      "「os.getcwd()」はカレントディレクトリのパスを取得するコードである",
      "「os.system(\"mkdir today\")」はカレントディレクトリ内に「today」という名前のディレクトリを作成するコードである",
      "「dir(os)」はosモジュールの使い方や機能を説明するドキュメントを表示するコードである"
    ],
    "correct": 3,
    "explanation": "dir() は属性・メソッド一覧を返す。ドキュメント表示は help()。"
  },
  {
    "id": "logic-mock-exam-2-q35",
    "source": "模擬演習2 Q35",
    "domain": "標準ライブラリめぐり",
    "question": "コードを説明した選択肢のうち、不適切な選択肢を選択してください。",
    "code": "import random\nprint(random.sample([0, 1, 2, 3, 4, 5], 2))\nprint(random.choice([\"red\", \"blue\", \"white\"]))\nprint(random.random())\nprint(random.randrange(10))",
    "choices": [
      "「random.sample([0,1,2,3,4,5], 2)」: 0から5までの範囲内から重複のない2つのランダムな整数",
      "「random.choice([...])」: シーケンスからランダムな要素を出力する",
      "「random.random()」: -1以上1以下のランダムな浮動小数点数を出力する",
      "「random.randrange(10)」: 0から9までの整数の範囲からランダムな整数を出力する"
    ],
    "correct": 2,
    "explanation": "random.random() は 0以上1未満（[0.0, 1.0)）の浮動小数。"
  },
  {
    "id": "logic-mock-exam-3-q3",
    "source": "模擬演習3 Q3",
    "domain": "気楽な入門編",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "a = 3\nb = 2\nc = (a + b) * 2 - 3\nd = a ** b + 5\nprint(\"c:\", c, \"d:\", d)",
    "choices": [
      "c: -5 d: 14",
      "c: -5 d: 11",
      "c: 7 d: 14",
      "c: 7 d: 11"
    ],
    "correct": 2,
    "explanation": "演算子優先順位: () > ** > *,/,//,% > +,-。c=(3+2)*2-3=7, d=3**2+5=14。"
  },
  {
    "id": "logic-mock-exam-3-q4",
    "source": "模擬演習3 Q4",
    "domain": "気楽な入門編",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "print('It\\'s my \\'car\\' ')",
    "choices": [
      "It\\'s my \\'car\\'",
      "It's my \"car\"",
      "It's my 'car'",
      "エラーになる"
    ],
    "correct": 2,
    "explanation": "\\' でシングルクォート自体を文字として扱える。エスケープ後の出力は It's my 'car'。"
  },
  {
    "id": "logic-mock-exam-3-q6",
    "source": "模擬演習3 Q6",
    "domain": "気楽な入門編",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "name = 'asuka'\nprint(name + 'yayoi' + 'edo' 'heisei')",
    "choices": [
      "asukayayoiedoheisei",
      "asuka yayoi edo heisei",
      "asuka 'yayoi' 'edo' 'heisei'",
      "エラーになる"
    ],
    "correct": 0,
    "explanation": "文字列リテラル同士はスペース区切りで自動連結（'edo' 'heisei' → 'edoheisei'）。変数と文字列の連結には + が必須。"
  },
  {
    "id": "logic-mock-exam-3-q8",
    "source": "模擬演習3 Q8",
    "domain": "気楽な入門編",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "num = [1, 2, 3, 4, 5, 6, 7, 8, 9]\nnum[5:8] = [11, 12]\nprint(num)\n\nnum[0:2] = []\nprint(num)\n\nnum[:] = []\nprint(num)",
    "choices": [
      "[1, 2, 3, 4, 11, 12, 7, 8, 9] / [4, 5, 11, 12, 7, 8, 9] / []",
      "[1, 2, 3, 4, 5, 11, 12, 9] / [3, 4, 5, 11, 12, 9] / []",
      "[1, 2, 3, 4, 5, 11, 12, 8, 9] / [3, 4, 5, 6, 7, 8, 9] / []",
      "エラーになる"
    ],
    "correct": 1,
    "explanation": "スライス代入は範囲を別リストで置換できる（長さが違ってもOK）。num[5:8]=[11,12] で要素3つを2つに置換、num[:]=[] は中身を全消去（idは保持）。"
  },
  {
    "id": "logic-mock-exam-3-q9",
    "source": "模擬演習3 Q9",
    "domain": "気楽な入門編",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "num = [[1, 2], [3, 4], [5, 6], [7, 8, 9]]\nscore = [[6, 6, 4]]\n\nprint(len(num))\nprint(num[3][0], num[0][0])\nprint(len(score))",
    "choices": [
      "9 / 7 1 / 3",
      "2,2,2,3 / 5 1 / 1",
      "3 / 5 1 / 3",
      "4 / 7 1 / 1"
    ],
    "correct": 3,
    "explanation": "len() はトップレベルの要素数のみ数える（ネストの中身は数えない）。num は4要素、score は1要素。"
  },
  {
    "id": "logic-mock-exam-3-q10",
    "source": "模擬演習3 Q10",
    "domain": "制御構文ツール",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "for fruit in [\"orange\", \"apple\", \"lemon\"]:\n  print(fruit, end=\",\")",
    "choices": [
      "[\"orange\", \"apple\", \"lemon\"]",
      "[\"orange\"],[\"apple\"],[\"lemon\"]",
      "orange,apple,lemon,",
      "orange / apple / lemon"
    ],
    "correct": 2,
    "explanation": "end=\",\" は print の末尾を改行からカンマに変える。各反復でカンマが追加されるので末尾にもカンマが残る。"
  },
  {
    "id": "logic-mock-exam-3-q11",
    "source": "模擬演習3 Q11",
    "domain": "制御構文ツール",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "for i in range(-3, -13, -3):\n    print(i, end=\",\")",
    "choices": [
      "-6,-9,-12,",
      "-3,-6,-9,-12,",
      "何も表示されない",
      "エラーが発生する"
    ],
    "correct": 1,
    "explanation": "range(start, stop, step) は start を含み stop を含まない。range(-3, -13, -3) は -3, -6, -9, -12。"
  },
  {
    "id": "logic-mock-exam-3-q12",
    "source": "模擬演習3 Q12",
    "domain": "制御構文ツール",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "fruits = ['apple', 'orange']\ndrinks = ['water', 'coffee']\nfor fruit in fruits:\n  for drink in drinks:\n    print(fruit, drink)",
    "choices": [
      "apple water / orange coffee",
      "apple orange / water coffee",
      "apple water / orange water / apple coffee / orange coffee",
      "apple water / apple coffee / orange water / orange coffee"
    ],
    "correct": 3,
    "explanation": "ネストfor: 外側1反復ごとに内側が全反復。apple×{water,coffee} → orange×{water,coffee}。"
  },
  {
    "id": "logic-mock-exam-3-q13",
    "source": "模擬演習3 Q13",
    "domain": "制御構文ツール",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "def greeting(message):\n  pass\n\nprint(greeting(1))",
    "choices": [
      "エラーになる",
      "None",
      "greeting",
      "1"
    ],
    "correct": 1,
    "explanation": "return がない関数は None を返す。pass は何もしないだけ。print は None をそのまま出力する。"
  },
  {
    "id": "logic-mock-exam-3-q14",
    "source": "模擬演習3 Q14",
    "domain": "制御構文ツール",
    "question": "function(3) ① の出力として、適切な選択肢を選択してください。",
    "code": "def function(a, list=[]):\n  list.append(a)\n  print(list)\n\nfunction(1)\nfunction(2)\nfunction(3) # ①",
    "choices": [
      "1",
      "[1]",
      "[[1], [2, 3], [1, 2, 3]]",
      "[1, 2, 3]"
    ],
    "correct": 3,
    "explanation": "デフォルト引数の落とし穴: 既定値のリストは関数定義時に1度だけ作られ、呼び出し間で共有される。3回目までに [1,2,3] が蓄積される。"
  },
  {
    "id": "logic-mock-exam-3-q15",
    "source": "模擬演習3 Q15",
    "domain": "制御構文ツール",
    "question": "次のコードの説明として、不適切な選択肢を選択してください。",
    "code": "def test(a, b , /, c, *, d):\n  print(a, b, c, d)",
    "choices": [
      "aとbは位置引数として値を渡す必要がある",
      "/の後ろにあるcは、位置引数として渡す必要があり、キーワード引数として値を渡すことはできない",
      "dはキーワード引数として値を渡す必要がある",
      "aとbにキーワード引数として値を渡すとエラーが発生してしまう"
    ],
    "correct": 1,
    "explanation": "/ より前 = 位置のみ、* より後 = キーワードのみ、間 = どちらでもOK。c は両方可。"
  },
  {
    "id": "logic-mock-exam-3-q16",
    "source": "模擬演習3 Q16",
    "domain": "制御構文ツール",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "def test(**kwargs):\n  for kw in kwargs:\n    print(kw, \":\", kwargs[kw])\n\ntest(name=\"Yamada\", job=\"デザイナー\", age=18)",
    "choices": [
      "エラーになる",
      "{name:'Yamada', job:'デザイナー', age:18}",
      "Yamada : name / デザイナー : job / 18 : age",
      "name : Yamada / job : デザイナー / age : 18"
    ],
    "correct": 3,
    "explanation": "for kw in kwargs はキーを反復する（dict をループするとキーが出る）。kwargs[kw] が値。出力は「キー : 値」の順。"
  },
  {
    "id": "logic-mock-exam-3-q19",
    "source": "模擬演習3 Q19",
    "domain": "データ構造",
    "question": "リスト colors 内で 'red' の数を数えるコードを選択肢から選択してください。",
    "code": "colors = ['red', 'blue', 'black', 'red', 'green', 'white', 'red', 'yellow']",
    "choices": [
      "colors.count(red)",
      "colors.count('red')",
      "count('red', colors)",
      "count(colors, 'red')"
    ],
    "correct": 1,
    "explanation": "count はリストのメソッドなので obj.count(x) の形。x は文字列ならクォート必須（'red'）。クォートなしの red は変数扱いされて NameError。"
  },
  {
    "id": "logic-mock-exam-3-q20",
    "source": "模擬演習3 Q20",
    "domain": "データ構造",
    "question": "次のコードと同じ結果になるコードを選択してください。",
    "code": "numbers = []\nfor x in range(5):\n  numbers.append(x ** 2)",
    "choices": [
      "numbers = [x ** 2 range(5)]",
      "numbers = [x ** 2 in for x range(5)]",
      "numbers = [for x range(5) in x ** 2]",
      "numbers = [x ** 2 for x in range(5)]"
    ],
    "correct": 3,
    "explanation": "リスト内包表記の構文: [式 for 変数 in iterable]。"
  },
  {
    "id": "logic-mock-exam-3-q21",
    "source": "模擬演習3 Q21",
    "domain": "データ構造",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "colors = [\"red\", \"black\", \"green\", \"blue\"]\nfor color in colors[:]:\n  if len(color) > 4:\n    colors.pop()\n    colors.insert(0, color)\nprint(colors)",
    "choices": [
      "['green', 'black', 'red', 'black']",
      "['black', 'green', 'black', 'green']",
      "[\"red\", \"black\", \"green\", \"blue\"]",
      "[]"
    ],
    "correct": 0,
    "explanation": "colors[:] はコピーなのでループは元の4要素を最後まで回る。'black'(5字)で末尾blueを削除→先頭blackを挿入。'green'で末尾を削除→先頭greenを挿入。最終 ['green', 'black', 'red', 'black']。"
  },
  {
    "id": "logic-mock-exam-3-q22",
    "source": "模擬演習3 Q22",
    "domain": "データ構造",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "t_1 = ([4, 2], [1, 3])\nt_2 = (5, 2, 3)\n\nt_1[0][0] = \"ok\"\nprint(t_1)\n\nt_2[0] = 3\nprint(t_2)",
    "choices": [
      "(['ok', 2], [1, 3])が出力され、エラーになる",
      "(['ok', 2], [1, 3]) / (3, 2, 3)",
      "([4, 2], [1, 3]) / (5, 2, 3)",
      "(\"ok\", [2, 2], [1, 3]) / (3, 5, 2, 3)"
    ],
    "correct": 0,
    "explanation": "タプルはイミュータブル（要素を差し替えられない）が、タプル内のミュータブル要素（リスト）の中身は変更可能。t_1[0][0]=... はリスト内の操作なのでOK、t_2[0]=... はタプル要素の差し替えなので TypeError。"
  },
  {
    "id": "logic-mock-exam-3-q23",
    "source": "模擬演習3 Q23",
    "domain": "データ構造",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "colors_1 = {'red', 'black', 'green', 'white'}\ncolors_2 = {'green', 'black', \"orange\"}\n\nprint(colors_1 | colors_2)\nprint(colors_1 & colors_2)\nprint(colors_1 ^ colors_2)",
    "choices": [
      "{'green', 'black'} / {'orange', 'white', 'red'} / {'white', 'orange', 'green', 'black', 'red'}",
      "{'orange', 'white', 'red'} / {'green', 'black'} / {'white', 'orange', 'green', 'black', 'red'}",
      "{'white', 'orange', 'green', 'black', 'red'} / {'green', 'black'} / {'orange', 'white', 'red'}",
      "{'green', 'black'} / {'white', 'orange', 'green', 'black', 'red'} / {'orange', 'white', 'red'}"
    ],
    "correct": 2,
    "explanation": "集合演算: | 和集合、& 積集合、^ 対称差集合、- 差集合。"
  },
  {
    "id": "logic-mock-exam-3-q24",
    "source": "模擬演習3 Q24",
    "domain": "データ構造",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "d = {x: x*2 - 1 for x in [1, 2, 3]}\nprint(d)",
    "choices": [
      "エラーになる",
      "1: 1, 2: 3, 3: 5",
      "[(1, 1), (2, 3), (3, 5)]",
      "{1: 1, 2: 3, 3: 5}"
    ],
    "correct": 3,
    "explanation": "辞書内包表記の構文: {キー: 値 for 変数 in iterable}。x*2-1 で x=1→1, x=2→3, x=3→5。"
  },
  {
    "id": "logic-mock-exam-3-q25",
    "source": "模擬演習3 Q25",
    "domain": "データ構造",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "a = [1, 3, 5, 7, 9]\n\nif 2 not in a:\n  print(\"リストaに2はありません\")\n\nif 10 > 5 and not 5 > 7:\n  print(\"Trueです\")\nelse:\n  print(\"Falseです\")",
    "choices": [
      "リストaに2はありません / Trueです",
      "リストaに2はありません / Falseです",
      "Trueです",
      "Falseです"
    ],
    "correct": 0,
    "explanation": "2 not in a → True、10>5 and not 5>7 → True and not False → True and True → True。"
  },
  {
    "id": "logic-mock-exam-3-q27",
    "source": "模擬演習3 Q27",
    "domain": "モジュール",
    "question": "「python test.py」を実行したとき、出力が「python」となる場合、①に当てはまる選択肢を選択してください。",
    "code": "def test_print():\n  print('python')\n\n# ①",
    "choices": [
      "if __main__ == '__main__':\\n  test_print()",
      "if __main__ == '__module__':\\n  test_print()",
      "if __name__ == '__module__':\\n  test_print()",
      "if __name__ == '__main__':\\n  test_print()"
    ],
    "correct": 3,
    "explanation": "スクリプトを直接実行すると __name__ に '__main__' が入る。インポート時はモジュール名が入る。これでスクリプト実行時のみ走るブロックを書ける。"
  },
  {
    "id": "logic-mock-exam-3-q29",
    "source": "模擬演習3 Q29",
    "domain": "エラーと例外",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "numbers = [1, 2, 3, 4, 5]\n\ntry:\n  print(numbers[5])\nexcept (ZeroDivisionError, IndexError):\n  print('ZeroDivisionErrorまたはIndexErrorです')\nexcept NameError:\n  print('NameError')",
    "choices": [
      "5",
      "構文エラーが発生する",
      "ZeroDivisionErrorまたはIndexErrorです",
      "NameError"
    ],
    "correct": 2,
    "explanation": "numbers[5] は IndexError。except (A, B) はタプルで複数捕捉可能。"
  },
  {
    "id": "logic-mock-exam-3-q30",
    "source": "模擬演習3 Q30",
    "domain": "エラーと例外",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "def divide(a, b):\n  return a / b\n\ntry:\n  divide(5, 0)\nexcept Exception as e:\n  print(e)",
    "choices": [
      "Exception",
      "division by zero",
      "NameError",
      "ValueError"
    ],
    "correct": 1,
    "explanation": "0除算で ZeroDivisionError 発生。Exception で捕捉、e を print するとメッセージ 'division by zero' が出る。"
  },
  {
    "id": "logic-mock-exam-3-q31",
    "source": "模擬演習3 Q31",
    "domain": "エラーと例外",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "class TestError(Exception):\n  pass\n\ndef test1():\n  try:\n    test2()\n  except TestError:\n    print('php')\n\ndef test2():\n  print('python')\n  raise TestError\n  print('ruby')\n\ntest1()",
    "choices": [
      "python",
      "python / php",
      "python / ruby / php",
      "「python」とプリントされ、プログラムが終了する"
    ],
    "correct": 1,
    "explanation": "raise が走った時点でその関数の以降の行は実行されない（'ruby' は出ない）。例外は呼び出し元 test1 の except で捕捉され 'php' が出る。"
  },
  {
    "id": "logic-mock-exam-3-q33",
    "source": "模擬演習3 Q33",
    "domain": "クラス",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "class Test:\n  def __init__(self, num):\n    self.num = num\n\n  def test(self, num):\n    print(num, end=\",\")\n    print(self.num, end=\",\")\n    num = 1\n    self.num = 2\n    print(num, end=\",\")\n    print(self.num)\n\ntest = Test(3)\ntest.test(4)",
    "choices": [
      "1,2,3,4",
      "4,3,1,2",
      "4,4,2,2",
      "3,4,2,2"
    ],
    "correct": 1,
    "explanation": "num（引数=ローカル）と self.num（属性）は別物。最初は num=4, self.num=3。再代入後 num=1, self.num=2。出力順は 4,3,1,2。"
  },
  {
    "id": "logic-mock-exam-3-q34",
    "source": "模擬演習3 Q34",
    "domain": "クラス",
    "question": "派生クラスから基底クラスのadd_quantity()を呼び出したい。①に当てはまる選択肢を選択してください。",
    "code": "class Item:\n  def __init__(self, name, quantity):\n    self.name = name\n    self.quantity = quantity\n  def add_quantity(self, quantity):\n    self.quantity = self.quantity + quantity\n    print(f\"残り{self.quantity}個です。\")\n\nclass Drink(Item):\n  def buy(self, quantity):\n    print(f\"{self.name}を{quantity}本購入しました\")\n    # ①\n\ncola = Drink(\"コーラ\", 10)\ncola.buy(2)",
    "choices": [
      "super.add_quantity(quantity)",
      "super().add_quantity(self, quantity)",
      "Item.add_quantity(self, quantity)",
      "Item.add_quantity(quantity)"
    ],
    "correct": 2,
    "explanation": "基底クラスのメソッド呼び出しは super().method(args) または ClassName.method(self, args)。super は呼び出し付きで使う。super 形なら self を渡さない、クラス名形なら self を渡す。"
  },
  {
    "id": "logic-mock-exam-3-q35",
    "source": "模擬演習3 Q35",
    "domain": "標準ライブラリめぐり",
    "question": "次のコードを実行したとき結果として、適切な選択肢を選択してください。",
    "code": "import math\nprint(math.ceil(10.5))\nprint(math.floor(0.15))\nprint(math.pi)\nprint(math.log(16, 2))",
    "choices": [
      "11 / 0 / 3.141592653589793 / 4.0",
      "10 / 1 / 3.141592653589793 / 8.0",
      "10.5 / 0.5 / 3.141592653589793 / 4.0",
      "11 / 1 / 3.141592653589793 / 8.0"
    ],
    "correct": 0,
    "explanation": "ceil 切り上げ、floor 切り捨て、pi 円周率、log(x, base) は底指定の対数。log(16, 2) = 4.0。"
  },
  {
    "id": "logic-mock-exam-3-q36",
    "source": "模擬演習3 Q36",
    "domain": "標準ライブラリめぐり",
    "question": "statisticsモジュールで平均値・中央値・分散を求めるコードを①②③に入れてください。",
    "code": "import statistics\ndata = [1.5, 4, 7, 4.5, 6, 3.5, 8, 5]\nprint(\"平均値：\", ①)\nprint(\"中央値：\", ②)\nprint(\"分散：\", ③)",
    "choices": [
      "average / median / variance",
      "average / median / standard",
      "mean / median / variance",
      "mean / median / standard"
    ],
    "correct": 2,
    "explanation": "平均は mean（average ではない）、中央値は median、分散は variance。"
  },
  {
    "id": "logic-mock-exam-4-q4",
    "source": "模擬演習4 Q4",
    "domain": "気楽な入門編",
    "question": "次のコードを対話モードで実行した結果として正しい選択肢を選択してください。",
    "code": "price = 100\ntax = 0.1\nprice * tax\nprice + _",
    "choices": [
      "10 / 100 + _",
      "10.0 / 100.0_",
      "10.0 / 110.0",
      "10 / エラーが発生する"
    ],
    "correct": 2,
    "explanation": "対話モードの _ は直前の式の結果。100*0.1=10.0、100+10.0=110.0。"
  },
  {
    "id": "logic-mock-exam-4-q5",
    "source": "模擬演習4 Q5",
    "domain": "気楽な入門編",
    "question": "変数sは以下のように定義されています。このとき、選択肢のコードを実行した場合、エラーになる選択肢を選択してください。",
    "code": "s = \"programming\"",
    "choices": [
      "s[2] = \"a\"",
      "s[:4]",
      "s[4:]",
      "s[:]"
    ],
    "correct": 0,
    "explanation": "文字列はイミュータブルでインデックス代入は不可。スライスは可能。"
  },
  {
    "id": "logic-mock-exam-4-q6",
    "source": "模擬演習4 Q6",
    "domain": "気楽な入門編",
    "question": "次のコードを実行した結果として、正しい選択肢を選択してください。",
    "code": "num = [1, 3, 5, 7, 9]\nprint(num[:2], num[2:])",
    "choices": [
      "1, 3, 5, 7, 9",
      "[1, 3, 5, 7, 9]",
      "[1, 3] [5, 7, 9]",
      "エラーが発生する"
    ],
    "correct": 2,
    "explanation": "num[:2]=[1,3], num[2:]=[5,7,9]。"
  },
  {
    "id": "logic-mock-exam-4-q7",
    "source": "模擬演習4 Q7",
    "domain": "気楽な入門編",
    "question": "次のコードを実行した結果として、正しい選択肢を選択してください。",
    "code": "num = [1, 8, 27]\nnum = num + [64, 5**3]\nprint(num)",
    "choices": [
      "エラーになる",
      "[1, 8, 27, 64, 125]",
      "1, 8, 27, 64, 125",
      "64, 125"
    ],
    "correct": 1,
    "explanation": "5**3=125。リスト同士の + で連結 → [1, 8, 27, 64, 125]。"
  },
  {
    "id": "logic-mock-exam-4-q8",
    "source": "模擬演習4 Q8",
    "domain": "制御構文ツール",
    "question": "以下のコードを実行した結果として、正しい選択肢を選択してください。",
    "code": "fruits = [\"orange\", \"apple\", \"lemon\"]\n\nfor fruit in fruits:\n  print(fruit)",
    "choices": [
      "[\"orange\", \"apple\", \"lemon\"]",
      "[\"orange\"] / [\"apple\"] / [\"lemon\"]",
      "\"orange\", \"apple\", \"lemon\"",
      "orange / apple / lemon"
    ],
    "correct": 3,
    "explanation": "for で要素を1個ずつ取り出して print。"
  },
  {
    "id": "logic-mock-exam-4-q9",
    "source": "模擬演習4 Q9",
    "domain": "制御構文ツール",
    "question": "以下のコードを実行したとき、「Python」と表示される回数の選択肢を選択してください。",
    "code": "for n in range(1, 8, 2):\n  print(\"Python\")",
    "choices": [
      "3回",
      "4回",
      "5回",
      "6回"
    ],
    "correct": 1,
    "explanation": "range(1,8,2)=[1,3,5,7] → 4回。"
  },
  {
    "id": "logic-mock-exam-4-q10",
    "source": "模擬演習4 Q10",
    "domain": "制御構文ツール",
    "question": "以下の実行結果を得たい場合、①に当てはまる選択肢を選択してください。\n\n実行結果: numは奇数です / numは偶数です / numは奇数です / numは偶数です",
    "code": "for num in range(1, 5):\n  if num % 2 == 0:\n    print(\"numは偶数です\")\n    ①\n  print(\"numは奇数です\")",
    "choices": [
      "elif",
      "else",
      "continue",
      "break"
    ],
    "correct": 2,
    "explanation": "偶数のとき「奇数です」を飛ばすには continue で次のループへ。break だと2で終わる。"
  },
  {
    "id": "logic-mock-exam-4-q11",
    "source": "模擬演習4 Q11",
    "domain": "制御構文ツール",
    "question": "次のコードを実行した結果として、正しい選択肢を選択してください。",
    "code": "def add(a=2, b):\n  return a + b\n\nprint(add(1))",
    "choices": [
      "None",
      "add(1, 2)",
      "3",
      "エラーになる"
    ],
    "correct": 3,
    "explanation": "デフォルト値あり引数(a=2)の後にデフォルト値なし引数(b)を置けない（SyntaxError）。"
  },
  {
    "id": "logic-mock-exam-4-q12",
    "source": "模擬演習4 Q12",
    "domain": "制御構文ツール",
    "question": "以下の関数を呼び出すコードとして、間違っている選択肢を選択してください。",
    "code": "def calc_price(price, tax_rate=10, shipping=0):\n    tax = price * tax_rate / 100\n    total = price + tax + shipping\n    return total",
    "choices": [
      "calc_price(tax_rate=8)",
      "calc_price(price=500, tax_rate=8)",
      "calc_price(500, 8)",
      "calc_price(500, shipping=800)"
    ],
    "correct": 0,
    "explanation": "price は必須引数なので渡さないとエラー。"
  },
  {
    "id": "logic-mock-exam-4-q13",
    "source": "模擬演習4 Q13",
    "domain": "制御構文ツール",
    "question": "次のコードを実行した結果として、正しい選択肢を選択してください。",
    "code": "def print_args(*args):\n  print(args)\n  for arg in args:\n    print(arg, end=\",\")\n\nprint_args('a', 'b', 'c')",
    "choices": [
      "('a', 'b', 'c') / a,b,c,",
      "(a, b, c) / a b c",
      "(a, b, c) / 'a','b','c'",
      "エラーが発生する"
    ],
    "correct": 0,
    "explanation": "*args は tuple として受け取る。print(args)はタプル、ループ内では各要素を出力。"
  },
  {
    "id": "logic-mock-exam-4-q14",
    "source": "模擬演習4 Q14",
    "domain": "制御構文ツール",
    "question": "次のコードを実行した結果として、正しい選択肢を選択してください。",
    "code": "def test(name, *args, job):\n  print(f\"名前は{name}です。仕事は{job}です。\", end=\" \")\n  for arg in args:\n    print(arg, end=\"です。\")\n\ntest(\"Yamada\", \"特技は水泳\", \"趣味は読書\", job=\"デザイナー\")",
    "choices": [
      "名前はYamadaです。仕事はデザイナーです。 特技は水泳です。趣味は読書です。",
      "名前はYamadaです。仕事はデザイナーです。 {'特技は水泳'}です。{'趣味は読書'}です。",
      "名前はYamadaです。仕事はデザイナーです。 ['特技は水泳']です。['趣味は読書']です。",
      "エラーが発生する"
    ],
    "correct": 0,
    "explanation": "*args の後ろの引数は自動でキーワード専用。args は tuple なので各要素が文字列として出る。"
  },
  {
    "id": "logic-mock-exam-4-q17",
    "source": "模擬演習4 Q17",
    "domain": "データ構造",
    "question": "次のコードを実行した結果として、正しい選択肢を選択してください。",
    "code": "users = [\"Tanaka\", \"Suzuki\", \"Akayama\", \"Miyamoto\"]\nprint(users.pop(2))\nprint(users)",
    "choices": [
      "[\"Tanaka\", \"Suzuki\", \"Akayama\", \"Miyamoto\"]",
      "['Tanaka', 'Suzuki', 'Miyamoto']",
      "Akayama / [\"Tanaka\", \"Suzuki\", \"Akayama\", \"Miyamoto\"]",
      "Akayama / ['Tanaka', 'Suzuki', 'Miyamoto']"
    ],
    "correct": 3,
    "explanation": "pop(i) は要素を取り出して返し、リストからその要素を除く。"
  },
  {
    "id": "logic-mock-exam-4-q18",
    "source": "模擬演習4 Q18",
    "domain": "データ構造",
    "question": "次のコードと同じ結果になるリスト内包表記を選択してください。",
    "code": "matrix = []\nfor x in [1,2,3,4,5]:\n  for y in [1,3,5]:\n    if x == y:\n      matrix.append((x, y))",
    "choices": [
      "matrix = [(x, y) for [1, 2, 3, 4, 5] in x for [1, 3, 5] in y if x == y]",
      "matrix = [(x, y) for [1, 2, 3, 4, 5] in x for [1, 3, 5] in y if x != y]",
      "matrix = [(x, y) for x in [1, 2, 3, 4, 5] for y in [1, 3, 5] if x == y]",
      "matrix = [(x, y) for x in [1, 2, 3, 4, 5] for y in [1, 3, 5] if x != y]"
    ],
    "correct": 2,
    "explanation": "[式 for 外側 for 内側 if 条件] の順で書く。"
  },
  {
    "id": "logic-mock-exam-4-q19",
    "source": "模擬演習4 Q19",
    "domain": "データ構造",
    "question": "次のコードを実行した結果として、正しい選択肢を選択してください。",
    "code": "number = [1, 2, 3, 4, 5, 6, 7]\ndel number\nprint(number)",
    "choices": [
      "[1, 2, 3, 4, 5, 6]",
      "[]",
      "何も表示されない",
      "エラーになる"
    ],
    "correct": 3,
    "explanation": "del number で変数自体を削除。print(number) で NameError。"
  },
  {
    "id": "logic-mock-exam-4-q20",
    "source": "模擬演習4 Q20",
    "domain": "データ構造",
    "question": "次のコードを実行した結果として、正しい選択肢を選択してください。",
    "code": "t = 3, 2, 3, 1\nw, x, y, z = t\n\nprint(t[2], end=\",\")\nprint(x)",
    "choices": [
      "エラーになる",
      "2,3,2,3,1",
      "2,2",
      "3,2"
    ],
    "correct": 3,
    "explanation": "t=(3,2,3,1)。t[2]=3、x=2（タプルアンパックで2番目の値）。"
  },
  {
    "id": "logic-mock-exam-4-q21",
    "source": "模擬演習4 Q21",
    "domain": "データ構造",
    "question": "次のコードを実行した結果として、正しい選択肢を選択してください。",
    "code": "colors_1 = {'red', 'black', 'green', 'white'}\ncolors_2 = {'green', 'black', \"orange\"}\n\nprint(colors_1 - colors_2)\nprint(colors_2 - colors_1)",
    "choices": [
      "{'white', 'orange', 'green', 'black', 'red'} / {'green', 'black'}",
      "{'red', 'white'} / {'orange'}",
      "{'red', 'white'} / {'red', 'white'}",
      "{'green', 'black'} / {'orange', 'white', 'red'}"
    ],
    "correct": 1,
    "explanation": "差集合 - は左から右の要素を除く。"
  },
  {
    "id": "logic-mock-exam-4-q22",
    "source": "模擬演習4 Q22",
    "domain": "データ構造",
    "question": "次の変数 users がある。エラーが発生する選択肢を選択してください。",
    "code": "users = {'Fujikawa': 170, 'Ayase': 165, 'Takayama': 172}",
    "choices": [
      "del users['Ayase']",
      "users['Ayase'] = 168",
      "print(users['Tanaka'])",
      "users['Tanaka'] = 160"
    ],
    "correct": 2,
    "explanation": "存在しないキーを参照すると KeyError。代入は新規追加なのでOK。"
  },
  {
    "id": "logic-mock-exam-4-q23",
    "source": "模擬演習4 Q23",
    "domain": "データ構造",
    "question": "次のコードを実行した結果として、正しい選択肢を選択してください。",
    "code": "a = dict([('Yamada', 170), ('Suzuki', 165), ('Takayama', 172)])\nprint(a)\n\nb = dict(Yamada=170, Suzuki=165)\nprint(b)",
    "choices": [
      "('Yamada', 170), ('Suzuki', 165), ('Takayama', 172) / {'Yamada': 170, 'Suzuki': 165}",
      "{'Yamada': 170, 'Suzuki': 165, 'Takayama': 172} / {'Yamada': 170, 'Suzuki': 165}",
      "{'Yamada': 170, 'Suzuki': 165, 'Takayama': 172} / {(Yamada,170), (Suzuki, 165)}",
      "エラーになる"
    ],
    "correct": 1,
    "explanation": "dict() は (key,value) のリスト or キーワード引数から辞書生成。"
  },
  {
    "id": "logic-mock-exam-4-q25",
    "source": "模擬演習4 Q25",
    "domain": "データ構造",
    "question": "次のコードを実行した結果として、正しい選択肢を選択してください。",
    "code": "a = [1, 2, 3]\nb = [1, 2, 3]\n\nif a is b:\n  print(\"a is b\")\nelif a == b:\n  print(\"a == b\")",
    "choices": [
      "a is b",
      "a == b",
      "何も表示されない",
      "エラーになる"
    ],
    "correct": 1,
    "explanation": "is は同一性（メモリ番地）、== は値の等価性。リテラルが同じでも別オブジェクト。"
  },
  {
    "id": "logic-mock-exam-4-q27",
    "source": "模擬演習4 Q27",
    "domain": "モジュール",
    "question": "sys モジュールと組み込みの名前リストを確認するコードを①と②に入れてください。",
    "code": "import sys, builtins\n①\n②",
    "choices": [
      "①: print(sys.dir()) / ②: print(builtins.dir())",
      "①: print(dir(sys)) / ②: print(builtins())",
      "①: print(dir(sys)) / ②: print(dir(builtins))",
      "①: print(sys(dir)) / ②: print(sys(builtins))"
    ],
    "correct": 2,
    "explanation": "dir() は組み込み関数で dir(obj) と呼ぶ。obj.dir() ではない。"
  },
  {
    "id": "logic-mock-exam-4-q30",
    "source": "模擬演習4 Q30",
    "domain": "エラーと例外",
    "question": "以下のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "a = 8\n\ntry:\n  print(a / b)\nexcept ZeroDivisionError:\n  print(\"ZeroDivisionError\")\nexcept NameError:\n  print(\"NameError\")\nexcept ValueError:\n  print(\"ValueError\")\nexcept Exception:\n  print(\"Exception\")",
    "choices": [
      "ZeroDivisionError",
      "NameError",
      "ValueError",
      "Exception"
    ],
    "correct": 1,
    "explanation": "b が未定義 → NameError。一致した except が実行される（その下の Exception には行かない）。"
  },
  {
    "id": "logic-mock-exam-4-q31",
    "source": "模擬演習4 Q31",
    "domain": "エラーと例外",
    "question": "以下のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "try:\n  print('try')\nexcept:\n  print('except')\nelse:\n  print('else')\nfinally:\n  print('finally')",
    "choices": [
      "try / else / finally",
      "try / finally",
      "try / else / finally（重複）",
      "try / except / finally"
    ],
    "correct": 0,
    "explanation": "例外発生なし → try → else → finally の順。"
  },
  {
    "id": "logic-mock-exam-4-q33",
    "source": "模擬演習4 Q33",
    "domain": "クラス",
    "question": "以下のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "num = 1\n\ndef test1():\n    def test2():\n        num = 2\n    num = 5\n    test2()\n    print(num, end=\",\")\n\ntest1()\nprint(num)",
    "choices": [
      "2,1",
      "5,1",
      "5,2",
      "2,2"
    ],
    "correct": 1,
    "explanation": "test2 の num=2 はそこのローカルだけ。test1 の num は 5。グローバルは 1 のまま。"
  },
  {
    "id": "logic-mock-exam-4-q34",
    "source": "模擬演習4 Q34",
    "domain": "クラス",
    "question": "「cola」が「Drink」のインスタンスかを確認するコードを選択してください。",
    "code": "class Item:\n  def __init__(self, name, quantity):\n    self.name = name\n    self.quantity = quantity\n\nclass Drink(Item):\n  def buy(self, quantity):\n    print(f\"{self.name}を{quantity}本購入しました\")\n\ncola = Drink(\"コーラ\", 10)",
    "choices": [
      "issubclass(cola, Drink)",
      "issubclass(Drink, cola)",
      "isinstance(cola, Drink)",
      "isinstance(Drink, cola)"
    ],
    "correct": 2,
    "explanation": "isinstance(obj, Class) でインスタンス判定。issubclass はクラス間の継承判定。"
  }
];
