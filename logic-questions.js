// 模擬演習1〜4から抽出したコードトレース問題集
// 自動生成 (mock-exams/*.json から code フィールド付き問題のみ抽出)
const LOGIC_QUESTIONS = [
  {
    "id": "logic-mock-exam-1-q1",
    "source": "模擬演習1 Q1",
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
    "id": "logic-mock-exam-1-q2",
    "source": "模擬演習1 Q2",
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
    "id": "logic-mock-exam-1-q4",
    "source": "模擬演習1 Q4",
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
    "id": "logic-mock-exam-1-q6",
    "source": "模擬演習1 Q6",
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
    "id": "logic-mock-exam-1-q9",
    "source": "模擬演習1 Q9",
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
    "id": "logic-mock-exam-1-q11",
    "source": "模擬演習1 Q11",
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
    "id": "logic-mock-exam-1-q12",
    "source": "模擬演習1 Q12",
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
    "id": "logic-mock-exam-1-q14",
    "source": "模擬演習1 Q14",
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
    "id": "logic-mock-exam-1-q15",
    "source": "模擬演習1 Q15",
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
    "id": "logic-mock-exam-1-q19",
    "source": "模擬演習1 Q19",
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
    "id": "logic-mock-exam-1-q21",
    "source": "模擬演習1 Q21",
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
    "id": "logic-mock-exam-1-q22",
    "source": "模擬演習1 Q22",
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
    "id": "logic-mock-exam-1-q23",
    "source": "模擬演習1 Q23",
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
    "id": "logic-mock-exam-1-q24",
    "source": "模擬演習1 Q24",
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
    "id": "logic-mock-exam-1-q25",
    "source": "模擬演習1 Q25",
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
    "id": "logic-mock-exam-1-q26",
    "source": "模擬演習1 Q26",
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
    "id": "logic-mock-exam-1-q27",
    "source": "模擬演習1 Q27",
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
    "id": "logic-mock-exam-1-q28",
    "source": "模擬演習1 Q28",
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
    "id": "logic-mock-exam-1-q29",
    "source": "模擬演習1 Q29",
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
    "id": "logic-mock-exam-1-q30",
    "source": "模擬演習1 Q30",
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
    "id": "logic-mock-exam-1-q31",
    "source": "模擬演習1 Q31",
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
    "id": "logic-mock-exam-1-q32",
    "source": "模擬演習1 Q32",
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
    "id": "logic-mock-exam-1-q36",
    "source": "模擬演習1 Q36",
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
    "id": "logic-mock-exam-1-q37",
    "source": "模擬演習1 Q37",
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
  },
  {
    "id": "logic-int-argv-basic",
    "source": "インタープリタ章",
    "domain": "モジュール",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "import sys\nsys.argv = ['sample.py', 'alpha', 'beta']\nprint(sys.argv[0])\nprint(sys.argv[1])",
    "choices": [
      "sample.py / alpha",
      "alpha / beta",
      "python / sample.py",
      "'' / sample.py"
    ],
    "correct": 0,
    "explanation": "sys.argv は [スクリプト名, 引数1, 引数2, ...] というリスト。先頭 argv[0] がスクリプト名、argv[1] が最初のユーザー引数。「最初の引数が argv[0]」と勘違いしないこと。0 番は自分の名前。"
  },
  {
    "id": "logic-int-argv-c-option",
    "source": "インタープリタ章",
    "domain": "モジュール",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "import sys\nsys.argv = ['-c', 'spam']\nprint(sys.argv[0] == '-c')\nprint(sys.argv[1])",
    "choices": [
      "True / spam",
      "False / spam",
      "True / -c",
      "エラーが発生する"
    ],
    "correct": 0,
    "explanation": "この問題では実際に -c で起動したわけではなく、その状態を sys.argv への代入で再現している。実際 python -c 'code' で起動すると sys.argv[0] は '-c' という文字列になる（コード文字列ではない）。「コードが 0 番に入る」と勘違いしやすい。0 番は起動方式の印として '-c' が固定で入り、コード文字列以降のユーザー引数は argv[1] から並ぶ。"
  },
  {
    "id": "logic-int-multiline-if",
    "source": "インタープリタ章",
    "domain": "気楽な入門編",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "the_world_is_flat = True\nif the_world_is_flat:\n    print(\"Be careful not to fall off!\")",
    "choices": [
      "Be careful not to fall off!",
      "True",
      "何も出力されない",
      "SyntaxError"
    ],
    "correct": 0,
    "explanation": "if 文は条件が真ならインデントされたブロックを実行する。対話モードではコロンの後に改行すると ... の継続プロンプトが現れ、インデント込みでブロックを入力する。スクリプトとして書く場合も同じ構造。"
  },
  {
    "id": "logic-int-utf8-japanese",
    "source": "インタープリタ章",
    "domain": "気楽な入門編",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "msg = \"こんにちは\"\nprint(msg)",
    "choices": [
      "こんにちは",
      "SyntaxError（coding 宣言が必要）",
      "UnicodeDecodeError",
      "NameError"
    ],
    "correct": 0,
    "explanation": "Python 3 のソースコードはデフォルトで UTF-8 として扱われるため、日本語などの非 ASCII 文字を文字列リテラルや識別子・コメントにそのまま書ける。Python 2 時代に必要だった coding 宣言は、UTF-8 を使う限り省略可能。"
  },
  {
    "id": "logic-op-power-sign",
    "source": "3章チュートリアル",
    "domain": "気楽な入門編",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "print(-3**2)\nprint((-3)**2)",
    "choices": [
      "1行目: -9 / 2行目: 9",
      "1行目: 9 / 2行目: 9",
      "1行目: -9 / 2行目: -9",
      "1行目: 6 / 2行目: 6"
    ],
    "correct": 0,
    "explanation": "** は単項の負号より優先順位が高い。-3**2 は -(3**2) = -9、(-3)**2 = 9。「まず累乗、あとで符号」と覚える。"
  },
  {
    "id": "logic-print-newline-escape",
    "source": "3章チュートリアル",
    "domain": "入出力",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "s = 'First line.\\nSecond line.'\nprint(s)",
    "choices": [
      "1行目: First line. / 2行目: Second line.",
      "First line.\\nSecond line.",
      "'First line.\\nSecond line.'",
      "SyntaxError"
    ],
    "correct": 0,
    "explanation": "通常文字列では \\n は改行として解釈される。print() は __str__ を呼ぶのでエスケープが展開されて2行に出る。変数名だけ評価した場合は 'First line.\\nSecond line.' と repr 風になる点と区別する。"
  },
  {
    "id": "logic-str-literal-concat",
    "source": "3章チュートリアル",
    "domain": "気楽な入門編",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "print('Py' 'thon')",
    "choices": [
      "Python",
      "Py thon",
      "Py' 'thon",
      "SyntaxError"
    ],
    "correct": 0,
    "explanation": "隣接した文字列リテラルは + なしで自動連結される。空白で区切られていても1つの文字列になる。ただしこの自動連結はリテラル同士に限られ、変数や式には適用されない（prefix 'thon' はエラー）。"
  },
  {
    "id": "logic-str-slice-basic",
    "source": "3章チュートリアル",
    "domain": "データ構造",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "word = 'Python'\nprint(word[0:2])\nprint(word[2:5])",
    "choices": [
      "1行目: Py / 2行目: tho",
      "1行目: Pyt / 2行目: thon",
      "1行目: Py / 2行目: thon",
      "1行目: Pyt / 2行目: tho"
    ],
    "correct": 0,
    "explanation": "スライスは [start, end) の半開区間。word[0:2] は index 0,1 で 'Py'、word[2:5] は index 2,3,4 で 'tho'。end を含めると考えると 1 文字多く見積もって誤る。"
  },
  {
    "id": "logic-str-out-of-range",
    "source": "3章チュートリアル",
    "domain": "エラーと例外",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "word = 'Python'\nprint(word[4:42])\nprint(word[42:])",
    "choices": [
      "1行目: on / 2行目: 空行",
      "1行目: IndexError / 2行目: IndexError",
      "1行目: on / 2行目: IndexError",
      "1行目: Python / 2行目: 空行"
    ],
    "correct": 0,
    "explanation": "スライスは範囲外でもエラーにならず、有効な範囲だけが返る。word[4:42] は 'on'（index 4,5）、word[42:] は空文字列なので空行が出る。これに対し単一インデックス word[42] は IndexError になる。「スライスは安全、単一インデックスは厳しい」と対比で覚える。"
  },
  {
    "id": "logic-list-alias",
    "source": "3章チュートリアル",
    "domain": "データ構造",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "rgb = ['Red', 'Green', 'Blue']\nrgba = rgb\nrgba.append('Alpha')\nprint(rgb)",
    "choices": [
      "['Red', 'Green', 'Blue', 'Alpha']",
      "['Red', 'Green', 'Blue']",
      "['Alpha']",
      "NameError"
    ],
    "correct": 0,
    "explanation": "rgba = rgb は新しいリストを作らず、同じリストへの別名を作るだけ。rgba.append() は rgb から見ても同じリストを変更するので、両方とも 'Alpha' が追加された状態になる。コピーが欲しいなら rgba = rgb[:] または rgb.copy() を使う。"
  },
  {
    "id": "logic-list-slice-copy",
    "source": "3章チュートリアル",
    "domain": "データ構造",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "rgba = ['Red', 'Green', 'Blue', 'Alph']\ncorrect_rgba = rgba[:]\ncorrect_rgba[-1] = 'Alpha'\nprint(rgba)\nprint(correct_rgba)",
    "choices": [
      "1行目: ['Red', 'Green', 'Blue', 'Alph'] / 2行目: ['Red', 'Green', 'Blue', 'Alpha']",
      "1行目: ['Red', 'Green', 'Blue', 'Alpha'] / 2行目: ['Red', 'Green', 'Blue', 'Alpha']",
      "1行目: ['Red', 'Green', 'Blue', 'Alph'] / 2行目: ['Red', 'Green', 'Blue', 'Alph']",
      "NameError"
    ],
    "correct": 0,
    "explanation": "rgba[:] はリストの浅いコピーを作る（新しいリストオブジェクト）。両者は別オブジェクトなので、correct_rgba[-1] = 'Alpha' は元の rgba に影響しない。「= は共有、[:] は浅いコピー」と対で覚える。"
  },
  {
    "id": "logic-list-slice-delete",
    "source": "3章チュートリアル",
    "domain": "データ構造",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g']\nletters[2:5] = []\nprint(letters)",
    "choices": [
      "['a', 'b', 'f', 'g']",
      "['a', 'b', 'c', 'd', 'e', 'f', 'g']",
      "['a', 'b', None, None, None, 'f', 'g']",
      "['a', 'b']"
    ],
    "correct": 0,
    "explanation": "スライス代入で空リストを代入すると、その範囲の要素が削除される。letters[2:5] は index 2,3,4（'c','d','e'）で、ここを [] で置換 = 削除。残るのは 'a','b','f','g'。end の 5 は含まない。"
  },
  {
    "id": "logic-fib-multi-assign",
    "source": "3章チュートリアル",
    "domain": "制御構文ツール",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "a, b = 0, 1\nfor _ in range(5):\n    a, b = b, a + b\nprint(a, b)",
    "choices": [
      "5 8",
      "8 13",
      "3 5",
      "1 1"
    ],
    "correct": 0,
    "explanation": "右辺がすべて評価されてから左辺に代入される。a,b = 0,1 から始まり、各周回で (a,b) → (b, a+b) と推移: (0,1)→(1,1)→(1,2)→(2,3)→(3,5)→(5,8)。5回ループ後は a=5, b=8。「右辺を固めてから左辺に渡す」を追えれば解ける。"
  },
  {
    "id": "logic-range-vs-list",
    "source": "4章チュートリアル",
    "domain": "データ構造",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "print(range(5))\nprint(list(range(5)))",
    "choices": [
      "1行目: range(0, 5) / 2行目: [0, 1, 2, 3, 4]",
      "1行目: [0, 1, 2, 3, 4] / 2行目: [0, 1, 2, 3, 4]",
      "1行目: 0 1 2 3 4 / 2行目: [0, 1, 2, 3, 4]",
      "1行目: range(5) / 2行目: range(0, 5)"
    ],
    "correct": 0,
    "explanation": "range() はイテラブルで、print すると range(0, 5) の内部表現が出る。list() で実体化すると [0, 1, 2, 3, 4]。Python 3 から range はリストを返さなくなった。"
  },
  {
    "id": "logic-break-inner",
    "source": "4章チュートリアル",
    "domain": "制御構文ツール",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "for n in range(2, 5):\n    for x in range(2, n):\n        if n % x == 0:\n            print(n, x)\n            break",
    "choices": [
      "4 2",
      "4 2 と 4 3",
      "2 2 と 3 3 と 4 2",
      "出力なし"
    ],
    "correct": 0,
    "explanation": "n=2,3 では内側 range(2, n) が空なので何も起こらない。n=4 で x=2 のとき 4%2==0 が真、print(4, 2) した後 break で内側ループだけ抜ける。出力は 4 2 のみ。"
  },
  {
    "id": "logic-loop-else-prime",
    "source": "4章チュートリアル",
    "domain": "制御構文ツール",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "for n in range(2, 4):\n    for x in range(2, n):\n        if n % x == 0:\n            print('factor')\n            break\n    else:\n        print('prime')",
    "choices": [
      "1行目: prime / 2行目: prime",
      "1行目: prime / 2行目: factor",
      "1行目: factor / 2行目: prime",
      "1行目: factor / 2行目: factor"
    ],
    "correct": 0,
    "explanation": "n=2 のとき内側 range(2, 2) は空でループに入らないので break もなし → else が実行されて 'prime'。n=3 のとき内側 range(2, 3) は x=2、3%2 != 0 で if 通らず break なし → else 実行で 'prime'。ループ else は break しないとき実行される。"
  },
  {
    "id": "logic-match-wildcard",
    "source": "4章チュートリアル",
    "domain": "制御構文ツール",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "def http_error(status):\n    match status:\n        case 400:\n            return 'Bad request'\n        case 404:\n            return 'Not found'\n        case _:\n            return 'Other'\nprint(http_error(418))",
    "choices": [
      "Other",
      "Bad request",
      "Not found",
      "418"
    ],
    "correct": 0,
    "explanation": "match 文で 418 は 400 にも 404 にも一致しない。case _: はワイルドカードでどんな値にも一致するので 'Other' が返る。switch の default 相当。なお match 文は Python 3.10 で導入された構文。"
  },
  {
    "id": "logic-default-eval-time",
    "source": "4章チュートリアル",
    "domain": "制御構文ツール",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "i = 5\ndef f(arg=i):\n    print(arg)\ni = 6\nf()",
    "choices": [
      "5",
      "6",
      "None",
      "NameError"
    ],
    "correct": 0,
    "explanation": "デフォルト引数は関数定義時に評価される(呼び出し時ではない)。def f(arg=i): の時点で i=5 が arg のデフォルト値として固定される。後から i=6 に変えても関数オブジェクトに紐づいた値は 5 のまま。「default は定義時に固定」を覚える。"
  },
  {
    "id": "logic-default-none",
    "source": "4章チュートリアル",
    "domain": "制御構文ツール",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "def f(a, L=None):\n    if L is None:\n        L = []\n    L.append(a)\n    return L\nprint(f(1))\nprint(f(2))",
    "choices": [
      "1行目: [1] / 2行目: [2]",
      "1行目: [1] / 2行目: [1, 2]",
      "1行目: [1] / 2行目: []",
      "1行目: [1, 2] / 2行目: [1, 2]"
    ],
    "correct": 0,
    "explanation": "デフォルトを None にして本体で if L is None: L = [] するイディオムは、可変オブジェクト共有の落とし穴を回避する定番パターン。呼び出しごとに新しいリストが作られるので、各回独立した結果になる。L=[] を直接書くと共有問題が発生する。"
  },
  {
    "id": "logic-call-star-unpack",
    "source": "4章チュートリアル",
    "domain": "関数引数",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "args = [3, 6]\nprint(list(range(*args)))",
    "choices": [
      "[3, 4, 5]",
      "[3, 6]",
      "[0, 1, 2, 3, 4, 5]",
      "TypeError"
    ],
    "correct": 0,
    "explanation": "呼び出し側の *args は位置引数アンパック。range(*[3, 6]) は range(3, 6) と同等で、3 から 6 の手前まで生成 → [3, 4, 5]。リスト全体が 1 引数として渡るのではなく、要素が個別の位置引数として展開される。"
  },
  {
    "id": "logic-call-double-star",
    "source": "4章チュートリアル",
    "domain": "関数引数",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "def parrot(voltage, state='a stiff', action='voom'):\n    print(voltage, state, action)\nd = {'voltage': 'four million', 'state': 'demised', 'action': 'VOOM'}\nparrot(**d)",
    "choices": [
      "four million demised VOOM",
      "{'voltage': 'four million', 'state': 'demised', 'action': 'VOOM'}",
      "TypeError",
      "voltage state action"
    ],
    "correct": 0,
    "explanation": "呼び出し側の **d は辞書のキーと値をキーワード引数として展開。parrot(**d) は parrot(voltage='four million', state='demised', action='VOOM') と同等。辞書全体が 1 引数として渡るわけではない。"
  },
  {
    "id": "logic-lambda-closure",
    "source": "4章チュートリアル",
    "domain": "制御構文ツール",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "def make_incrementor(n):\n    return lambda x: x + n\nf = make_incrementor(42)\nprint(f(0))\nprint(f(1))",
    "choices": [
      "1行目: 42 / 2行目: 43",
      "1行目: 0 / 2行目: 1",
      "1行目: NameError / 2行目: NameError",
      "1行目: 42 / 2行目: 42"
    ],
    "correct": 0,
    "explanation": "lambda は外側スコープの n を取り込む(クロージャ)。make_incrementor(42) で n=42 が固定された関数 f が返り、f(0)=42, f(1)=43。lambda が外側変数を見られないと思い込むと NameError を選んで外す。"
  },
  {
    "id": "logic-annotations",
    "source": "4章チュートリアル",
    "domain": "関数引数",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "def f(ham: str, eggs: str = 'eggs') -> str:\n    return ham + ' and ' + eggs\nprint(f.__annotations__['ham'])",
    "choices": [
      "<class 'str'>",
      "str",
      "'str'",
      "AttributeError"
    ],
    "correct": 0,
    "explanation": "関数アノテーションは関数オブジェクトの __annotations__ 属性に辞書として格納される。値は class オブジェクトなので、print 表示は <class 'str'> の形式になる。実行時の型チェックは行われない(外部ツール mypy などが静的解析する)。全体表示だと並び方に依存して選択肢を作りにくいので、特定キーで取り出している。"
  },
  {
    "id": "logic-pop-vs-del",
    "source": "5章チュートリアル",
    "domain": "データ構造",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "a = ['x', 'y', 'z']\nprint(a.pop())\nprint(a)\ndel a[0]\nprint(a)",
    "choices": [
      "1行目: z / 2行目: ['x', 'y'] / 3行目: ['y']",
      "1行目: ['z'] / 2行目: ['x', 'y'] / 3行目: ['y']",
      "1行目: None / 2行目: ['x', 'y', 'z'] / 3行目: ['x', 'y', 'z']",
      "TypeError"
    ],
    "correct": 0,
    "explanation": "pop() は引数なしで末尾要素を削除して返すので 'z' が出力される。続く print(a) で残った ['x', 'y'] が出る。del a[0] は最初の要素 'x' を削除するが値は返さない。最終的に ['y']。「pop は抜いて返す、del は消すだけ」を体感する典型問題。"
  },
  {
    "id": "logic-sort-returns-none",
    "source": "5章チュートリアル",
    "domain": "データ構造",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "a = [3, 1, 2]\nresult = a.sort()\nprint(a)\nprint(result)",
    "choices": [
      "1行目: [1, 2, 3] / 2行目: None",
      "1行目: [3, 1, 2] / 2行目: [1, 2, 3]",
      "1行目: [1, 2, 3] / 2行目: [1, 2, 3]",
      "1行目: None / 2行目: [1, 2, 3]"
    ],
    "correct": 0,
    "explanation": "list.sort() は破壊的にリストを並べ替えるが、戻り値は None。result には None が入り、a 自身が [1, 2, 3] に並び替わる。新しいリストが欲しい場合は sorted(a) を使う。「破壊的メソッドは None を返す」が Python の慣例で、reverse() や append() なども同様。"
  },
  {
    "id": "logic-deque-popleft",
    "source": "5章チュートリアル",
    "domain": "標準ライブラリめぐり",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "from collections import deque\nq = deque(['Eric', 'John', 'Michael'])\nq.append('Terry')\nprint(q.popleft())\nprint(q)",
    "choices": [
      "1行目: Eric / 2行目: deque(['John', 'Michael', 'Terry'])",
      "1行目: Terry / 2行目: deque(['Eric', 'John', 'Michael'])",
      "1行目: Michael / 2行目: deque(['Eric', 'John', 'Terry'])",
      "1行目: None / 2行目: deque(['Eric', 'John', 'Michael', 'Terry'])"
    ],
    "correct": 0,
    "explanation": "deque は両端キュー。append() で末尾追加、popleft() で先頭から取り出して返す。append('Terry') 後 ['Eric', 'John', 'Michael', 'Terry']、popleft() で 'Eric' を返して取り除き、残り ['John', 'Michael', 'Terry']。FIFO キューの典型挙動。"
  },
  {
    "id": "logic-comp-if-filter",
    "source": "5章チュートリアル",
    "domain": "データ構造",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "vec = [-4, -2, 0, 2, 4]\nprint([x for x in vec if x >= 0])",
    "choices": [
      "[0, 2, 4]",
      "[-4, -2]",
      "[-4, -2, 0, 2, 4]",
      "[]"
    ],
    "correct": 0,
    "explanation": "リスト内包の if 句は要素のフィルタとして働く。x >= 0 を満たす要素 (0, 2, 4) だけが結果に入る。同じ操作を for ループで書くと result = []; for x in vec: if x >= 0: result.append(x) だが、内包のほうが宣言的で短い。"
  },
  {
    "id": "logic-comp-double-for",
    "source": "5章チュートリアル",
    "domain": "データ構造",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "print([(x, y) for x in [1, 2, 3] for y in [3, 1, 4] if x != y])",
    "choices": [
      "[(1, 3), (1, 4), (2, 3), (2, 1), (2, 4), (3, 1), (3, 4)]",
      "[(1, 3), (1, 4), (2, 3), (2, 1), (2, 4), (3, 1), (3, 3), (3, 4)]",
      "[(1, 1), (2, 2), (3, 3)]",
      "SyntaxError"
    ],
    "correct": 0,
    "explanation": "二重 for の内包は外側 x、内側 y で全組合せを生成し、if x != y で対角の組（1==1, 3==3）が落ちる。x=1: (1,3),(1,4) で 1!=1 が落ちる、x=2: 全部通る (2,3),(2,1),(2,4)、x=3: 3!=3 で (3,3) が落ちて (3,1),(3,4)。「左ほど外側、フィルタは要素ごとに評価」を体感する典型問題。"
  },
  {
    "id": "logic-comp-flatten",
    "source": "5章チュートリアル",
    "domain": "データ構造",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "vec = [[1, 2, 3], [4, 5, 6]]\nprint([num for elem in vec for num in elem])",
    "choices": [
      "[1, 2, 3, 4, 5, 6]",
      "[[1, 2, 3], [4, 5, 6]]",
      "[1, 4]",
      "[(1, 4), (2, 5), (3, 6)]"
    ],
    "correct": 0,
    "explanation": "二重 for の内包でフラット化。外側 elem が [1,2,3] と [4,5,6] を取り、内側 num が各リストの要素を取り出す。生成される値は num そのもの。「ネストリストを1次元に潰す」典型イディオム。順序は外側ループが先に進むので、最初のサブリストが完全に展開されてから次に進む。"
  },
  {
    "id": "logic-zip-transpose",
    "source": "5章チュートリアル",
    "domain": "標準ライブラリめぐり",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "matrix = [\n    [1, 2, 3],\n    [4, 5, 6],\n]\nprint(list(zip(*matrix)))",
    "choices": [
      "[(1, 4), (2, 5), (3, 6)]",
      "[(1, 2, 3), (4, 5, 6)]",
      "[(1, 2), (3, 4), (5, 6)]",
      "TypeError"
    ],
    "correct": 0,
    "explanation": "zip(*matrix) は matrix の各行をアンパックして zip に渡す → zip([1,2,3], [4,5,6]) と等価。zip は対応位置の要素をタプルにまとめるので、(1,4), (2,5), (3,6) が生成される。これが行列の転置になる。「* で展開、zip で噛み合わせ」を組み合わせて転置するイディオム。"
  },
  {
    "id": "logic-tuple-singleton",
    "source": "5章チュートリアル",
    "domain": "データ構造",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "singleton = 'hello',\nprint(type(singleton).__name__)\nprint(singleton)",
    "choices": [
      "1行目: tuple / 2行目: ('hello',)",
      "1行目: str / 2行目: hello",
      "1行目: list / 2行目: ['hello']",
      "1行目: tuple / 2行目: ('hello')"
    ],
    "correct": 0,
    "explanation": "末尾のカンマがあるので 'hello', は1要素タプル。type は tuple。print 表示は ('hello',) と末尾カンマ付き（1要素タプルであることを明示するため）。'hello' だけだと str、('hello') も str（括弧は単なる優先順位）。タプルを作るのはカンマであって括弧ではない。"
  },
  {
    "id": "logic-tuple-immutable",
    "source": "5章チュートリアル",
    "domain": "エラーと例外",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "t = (1, 2, 3)\nt[0] = 9",
    "choices": [
      "TypeError",
      "t は (9, 2, 3) になる",
      "IndexError",
      "ValueError"
    ],
    "correct": 0,
    "explanation": "タプルは不変なので、インデックス代入は TypeError: 'tuple' object does not support item assignment。中身を変更したい場合は新しいタプルを作る (t = (9,) + t[1:]) かリストに変換する必要がある。タプルが不変な代わりに、辞書のキーや集合の要素として使えるメリットがある。"
  },
  {
    "id": "logic-empty-set-vs-dict",
    "source": "5章チュートリアル",
    "domain": "データ構造",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "a = {}\nb = set()\nprint(type(a).__name__)\nprint(type(b).__name__)",
    "choices": [
      "1行目: dict / 2行目: set",
      "1行目: set / 2行目: set",
      "1行目: dict / 2行目: dict",
      "1行目: set / 2行目: dict"
    ],
    "correct": 0,
    "explanation": "{} は空辞書として扱われる（リテラルが先に dict に占有されているため）。空集合を作るには set() を呼ぶ必要がある。{1, 2, 3} のように要素があれば集合と判別されるが、空のときは dict 優先。「空集合は set()、空辞書は {}」と覚える。試験で頻出。"
  },
  {
    "id": "logic-set-ops",
    "source": "5章チュートリアル",
    "domain": "データ構造",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "a = set('abracadabra')\nb = set('alacazam')\nprint(sorted(a - b))\nprint(sorted(a & b))",
    "choices": [
      "1行目: ['b', 'd', 'r'] / 2行目: ['a', 'c']",
      "1行目: ['a', 'b', 'c', 'd', 'r'] / 2行目: ['a']",
      "1行目: ['a', 'c'] / 2行目: ['b', 'd', 'r']",
      "1行目: ['l', 'm', 'z'] / 2行目: ['a', 'c']"
    ],
    "correct": 0,
    "explanation": "set('abracadabra') の要素は a, b, c, d, r。set('alacazam') の要素は a, c, l, m, z。a - b（差集合）は a にだけある要素 = b, d, r。a & b（積集合）は両方にある要素 = a, c。set 自体は順序を持たないので、表示を安定化させたいときは sorted() を被せる。"
  },
  {
    "id": "logic-dict-get-vs-bracket",
    "source": "5章チュートリアル",
    "domain": "データ構造",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "tel = {'jack': 4098, 'sape': 4139}\nprint(tel.get('irv'))\nprint('jack' in tel)",
    "choices": [
      "1行目: None / 2行目: True",
      "1行目: KeyError / 2行目: True",
      "1行目: 0 / 2行目: 4098",
      "1行目: '' / 2行目: False"
    ],
    "correct": 0,
    "explanation": "get('irv') はキー 'irv' がないので None を返す（KeyError は出さない）。'jack' in tel は辞書のキーに 'jack' があるかを bool で返す → True。「[] は厳格、get() は穏当」を体感する典型例。in は辞書のキー検索が O(1) で高速。"
  },
  {
    "id": "logic-dict-list-sorted",
    "source": "5章チュートリアル",
    "domain": "データ構造",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "tel = {'jack': 4098, 'sape': 4139, 'guido': 4127}\nprint(list(tel))\nprint(sorted(tel))",
    "choices": [
      "1行目: ['jack', 'sape', 'guido'] / 2行目: ['guido', 'jack', 'sape']",
      "1行目: [4098, 4139, 4127] / 2行目: [4098, 4127, 4139]",
      "1行目: ['guido', 'jack', 'sape'] / 2行目: ['guido', 'jack', 'sape']",
      "1行目: [('jack', 4098), ('sape', 4139), ('guido', 4127)] / 2行目: 同左ソート"
    ],
    "correct": 0,
    "explanation": "list(tel) は辞書のキーを挿入順で返す（Python 3.7+）→ ['jack', 'sape', 'guido']。sorted(tel) はキーをソートしたリスト → ['guido', 'jack', 'sape']。値やペアではなくキーが返る点に注意。「辞書のデフォルトはキー」を覚える。"
  },
  {
    "id": "logic-reversed-sorted",
    "source": "5章チュートリアル",
    "domain": "標準ライブラリめぐり",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "print(list(reversed(range(1, 10, 2))))\nbasket = ['apple', 'orange', 'apple']\nprint(sorted(basket))",
    "choices": [
      "1行目: [9, 7, 5, 3, 1] / 2行目: ['apple', 'apple', 'orange']",
      "1行目: [1, 3, 5, 7, 9] / 2行目: ['apple', 'orange', 'apple']",
      "1行目: [9, 7, 5, 3, 1] / 2行目: ['apple', 'orange']",
      "1行目: range(1, 10, -2) / 2行目: ['apple', 'apple', 'orange']"
    ],
    "correct": 0,
    "explanation": "range(1, 10, 2) は [1, 3, 5, 7, 9]、reversed() で逆順 → [9, 7, 5, 3, 1]。sorted は新しいリストを返し、重複は除去せずそのまま並べ替える → ['apple', 'apple', 'orange']。重複除去したい場合は sorted(set(basket))。"
  },
  {
    "id": "logic-sorted-set-pattern",
    "source": "5章チュートリアル",
    "domain": "標準ライブラリめぐり",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "basket = ['apple', 'orange', 'apple', 'pear', 'orange', 'banana']\nprint(list(sorted(set(basket))))",
    "choices": [
      "['apple', 'banana', 'orange', 'pear']",
      "['apple', 'orange', 'apple', 'pear', 'orange', 'banana']",
      "['apple', 'apple', 'banana', 'orange', 'orange', 'pear']",
      "['pear', 'orange', 'banana', 'apple']"
    ],
    "correct": 0,
    "explanation": "set(basket) で重複除去 → 4要素、sorted() で昇順整列 → ['apple', 'banana', 'orange', 'pear']。重複除去 + ソートの定番イディオム。list() は冗長だが sorted() の結果は既にリストなので意味的には同じ。"
  },
  {
    "id": "logic-is-vs-eq",
    "source": "5章チュートリアル",
    "domain": "制御構文ツール",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "a = [1, 2]\nb = [1, 2]\nprint(a == b)\nprint(a is b)",
    "choices": [
      "1行目: True / 2行目: False",
      "1行目: True / 2行目: True",
      "1行目: False / 2行目: False",
      "1行目: False / 2行目: True"
    ],
    "correct": 0,
    "explanation": "== は値の等価性を比較するので、中身が同じ a と b は True。is は同一オブジェクトかどうか（id() が同じか）を比較するので、別々に作られた a と b は別オブジェクトで False。b = a のように代入すると is も True になる。「== = 同じ値、is = 同じ箱」と区別する。"
  },
  {
    "id": "logic-short-circuit",
    "source": "5章チュートリアル",
    "domain": "制御構文ツール",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "x = 0\nprint(x and 10)\nprint(x or 10)",
    "choices": [
      "1行目: 0 / 2行目: 10",
      "1行目: True / 2行目: True",
      "1行目: 10 / 2行目: 0",
      "1行目: False / 2行目: False"
    ],
    "correct": 0,
    "explanation": "x=0 は falsy。x and 10 は左が falsy で確定、その時点で 0（左の値そのもの）を返す。x or 10 は左が falsy なので右を評価し、10 を返す。「and: falsy で止まる、or: truthy で止まる」「結果は最後に評価した値そのもの（bool への変換はない）」を覚える。"
  },
  {
    "id": "logic-seq-lex-compare",
    "source": "5章チュートリアル",
    "domain": "データ構造",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "print((1, 2, 3) < (1, 2, 4))\nprint((1, 2) < (1, 2, -1))",
    "choices": [
      "1行目: True / 2行目: True",
      "1行目: True / 2行目: False",
      "1行目: False / 2行目: True",
      "1行目: False / 2行目: False"
    ],
    "correct": 0,
    "explanation": "辞書式比較で先頭から要素を比べる。1行目: 0番目 1==1, 1番目 2==2, 2番目 3<4 で True。2行目: 0番目 1==1, 1番目 2==2、ここで左が要素切れ → 短いほうが小さいので True。「先頭から比べ、共通部分が等しければ短いほうが小さい」を覚える。"
  },
  {
    "id": "logic-mod-import-basic",
    "source": "6章チュートリアル",
    "domain": "モジュール",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "import math\nprint(math.sqrt(16))",
    "choices": [
      "4.0",
      "4",
      "16",
      "NameError"
    ],
    "correct": 0,
    "explanation": "import math 後は math.sqrt() のようにモジュール名経由でアクセスする。math.sqrt(16) は 4.0 を返す（/ と同じく結果は float）。sqrt(16) だけでは NameError。"
  },
  {
    "id": "logic-mod-from-import",
    "source": "6章チュートリアル",
    "domain": "モジュール",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "from math import sqrt\nprint(sqrt(25))\nprint('math' in globals())",
    "choices": [
      "1行目: 5.0 / 2行目: False",
      "1行目: 5.0 / 2行目: True",
      "1行目: 25 / 2行目: True",
      "NameError"
    ],
    "correct": 0,
    "explanation": "from math import sqrt は sqrt だけを名前空間に追加する。math モジュール名は globals() に入らないので False。「from import は中身だけ」を確認する典型問題。"
  },
  {
    "id": "logic-mod-as",
    "source": "6章チュートリアル",
    "domain": "モジュール",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "import math as m\nprint(m.pi > 3)\nprint(round(m.pi, 2))",
    "choices": [
      "1行目: True / 2行目: 3.14",
      "1行目: False / 2行目: 3.14",
      "1行目: True / 2行目: 3.1",
      "NameError"
    ],
    "correct": 0,
    "explanation": "import math as m は math モジュールを m という別名で扱う。m.pi は math.pi と同じで約 3.14159、3 より大きいので True。round(m.pi, 2) は小数点以下2桁で 3.14。as はコピーではなく別名を付けるだけ。"
  },
  {
    "id": "logic-mod-name-main",
    "source": "6章チュートリアル",
    "domain": "モジュール",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "print(__name__)",
    "choices": [
      "__main__",
      "script",
      "module",
      "NameError"
    ],
    "correct": 0,
    "explanation": "このコードをスクリプトとして直接実行したとき、トップレベルの __name__ には \"__main__\" が設定される。これは Python が起動時に自動的に決める変数で、別のファイルから import された場合は逆にそのモジュール名が入る。"
  },
  {
    "id": "logic-mod-main-guard",
    "source": "6章チュートリアル",
    "domain": "モジュール",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "if __name__ == \"__main__\":\n    print(\"run as script\")\nelse:\n    print(\"imported\")",
    "choices": [
      "run as script",
      "imported",
      "何も出力されない",
      "SyntaxError"
    ],
    "correct": 0,
    "explanation": "このコードをスクリプトとして直接実行したとき (python script.py) は __name__ == \"__main__\" が真なので「run as script」が出る。一方、別のファイルから import されたときは __name__ がモジュール名になり else 側が実行される。これが「main ガード」と呼ばれる慣用句で、ファイルをスクリプトとしても import 可能なモジュールとしても使える。"
  },
  {
    "id": "logic-sys-path-list",
    "source": "6章チュートリアル",
    "domain": "標準ライブラリめぐり",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "import sys\nn = len(sys.path)\nsys.path.append(\"/tmp/example\")\nprint(len(sys.path) == n + 1)",
    "choices": [
      "True",
      "False",
      "TypeError",
      "AttributeError"
    ],
    "correct": 0,
    "explanation": "sys.path はモジュール検索パスのリストで、append できる（リストとして扱える）。append 後は要素が1つ増えるので、新しい len は元 + 1 と一致して True。検索パスを動的に追加したいときに使うが、副作用に注意。"
  },
  {
    "id": "logic-sys-ps12",
    "source": "6章チュートリアル",
    "domain": "標準ライブラリめぐり",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "import sys\nprint(hasattr(sys, \"ps1\") or hasattr(sys, \"ps2\"))",
    "choices": [
      "False",
      "True",
      ">>>",
      "AttributeError"
    ],
    "correct": 0,
    "explanation": "このコードをスクリプトとして実行したとき、sys.ps1 / sys.ps2 はインタプリタによって定義されないため、hasattr は両方 False を返し or の結果も False になる。これらは対話モード (REPL) 起動時にだけインタプリタが定義する属性。「対話モード時だけ定義される」を覚える。"
  },
  {
    "id": "logic-dir-module",
    "source": "6章チュートリアル",
    "domain": "標準ライブラリめぐり",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "import math\nprint(\"sqrt\" in dir(math))\nprint(\"pi\" in dir(math))",
    "choices": [
      "1行目: True / 2行目: True",
      "1行目: False / 2行目: False",
      "1行目: True / 2行目: False",
      "1行目: False / 2行目: True"
    ],
    "correct": 0,
    "explanation": "dir(math) は math モジュールで定義されているすべての名前（関数・定数）をソート済み文字列リストで返す。math モジュールには sqrt 関数も pi 定数も含まれているので両方 True。"
  },
  {
    "id": "logic-dir-current",
    "source": "6章チュートリアル",
    "domain": "モジュール",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "x = 10\nprint(\"x\" in dir())",
    "choices": [
      "True",
      "False",
      "'x'",
      "NameError"
    ],
    "correct": 0,
    "explanation": "引数なしの dir() は現在の名前空間の名前を列挙する。x = 10 で x が定義されたので、dir() の結果に \"x\" が含まれて True。dir() はインタラクティブな探索や変数確認の定番ツール。"
  },
  {
    "id": "logic-dir-builtins",
    "source": "6章チュートリアル",
    "domain": "標準ライブラリめぐり",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "import builtins\nprint(\"len\" in dir(builtins))\nprint(\"Exception\" in dir(builtins))",
    "choices": [
      "1行目: True / 2行目: True",
      "1行目: False / 2行目: False",
      "1行目: True / 2行目: False",
      "1行目: False / 2行目: True"
    ],
    "correct": 0,
    "explanation": "builtins モジュールには len や print などの組み込み関数、Exception や ValueError などの組み込み例外がすべて定義されている。普段 import なしで使えるのは Python が暗黙的に builtins の名前を解決しているため。組み込みの一覧を確認したいときは dir(builtins)。"
  },
  {
    "id": "logic-mod-name-attr",
    "source": "6章チュートリアル",
    "domain": "モジュール",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "import math\nprint(math.__name__)",
    "choices": [
      "math",
      "__main__",
      "math.py",
      "AttributeError"
    ],
    "correct": 0,
    "explanation": "import 済みモジュールの __name__ 属性はそのモジュール名。math なら 'math' が入る。スクリプトとして直接実行された側の __name__ が \"__main__\" になるのとは対比的。「__name__ は実行主体の名前で、import されたら自分のモジュール名」と覚える。"
  },
  {
    "id": "logic-from-collections-deque",
    "source": "6章チュートリアル",
    "domain": "モジュール",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "from collections import deque\nq = deque([1, 2])\nq.appendleft(0)\nprint(list(q))",
    "choices": [
      "[0, 1, 2]",
      "[1, 2, 0]",
      "[2, 1, 0]",
      "NameError"
    ],
    "correct": 0,
    "explanation": "from collections import deque は deque だけを名前空間に追加する（collections は入らない）。deque([1, 2]) で初期化、appendleft(0) で先頭に 0 が追加されて [0, 1, 2]。list() で表示用に変換。「from package import specific_submodule」の典型例。"
  },
  {
    "id": "logic-importlib-reload",
    "source": "6章チュートリアル",
    "domain": "モジュール",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "import importlib\nimport math\nreloaded = importlib.reload(math)\nprint(reloaded.__name__)",
    "choices": [
      "math",
      "__main__",
      "importlib",
      "AttributeError"
    ],
    "correct": 0,
    "explanation": "importlib.reload(module) はそのモジュールを再読み込みし、再読み込み後のモジュールオブジェクトを返す。__name__ は元のままなので 'math' が出力される。なお `reloaded is math` の真偽は実装依存（sys.modules を介して別オブジェクトに置き換えられる場合がある）ので、reload 後の同一性に依存したコードは書かないほうが安全。reload は開発時に使う機能で、本番コードでは推奨されない。"
  },
  {
    "id": "logic-str-vs-repr",
    "source": "7章チュートリアル",
    "domain": "入出力",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "s = 'Hello, world.'\nprint(str(s))\nprint(repr(s))",
    "choices": [
      "1行目: Hello, world. / 2行目: 'Hello, world.'",
      "1行目: 'Hello, world.' / 2行目: Hello, world.",
      "両方とも Hello, world.",
      "TypeError"
    ],
    "correct": 0,
    "explanation": "str() は人間向けの表現で、文字列ならクォートなしで内容そのまま。repr() はインタプリタ向けの表現で、文字列はクォート付き（'Hello, world.'）。print() は str() を経由するので、print(str(s)) と print(s) は同じ結果になる。"
  },
  {
    "id": "logic-repr-escape",
    "source": "7章チュートリアル",
    "domain": "入出力",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "hello = 'hello, world\\n'\nprint(repr(hello))",
    "choices": [
      "'hello, world\\n'（エスケープが見える）",
      "hello, world (改行付き)",
      "\"hello, world\\\\n\"",
      "TypeError"
    ],
    "correct": 0,
    "explanation": "repr() は文字列をインタプリタが読める形式（Python リテラルとして記述できる形）で返す。エスケープ文字 \\n は実際の改行ではなく \\n のまま表示され、全体がクォート 'hello, world\\n' で囲まれる。「repr は中身をリテラル表記で見せる」。"
  },
  {
    "id": "logic-fstring-decimal",
    "source": "7章チュートリアル",
    "domain": "入出力",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "import math\nprint(f'{math.pi:.3f}')",
    "choices": [
      "3.142",
      "3.14159",
      "3.14",
      ".3f"
    ],
    "correct": 0,
    "explanation": "f-string の書式指定子 :.3f は「小数点以下3桁の浮動小数点数」を意味する。math.pi (3.14159...) を3桁に丸めると 3.142（4桁目が5以上なので切り上げ）。.2f なら 3.14、.0f なら 3。フォーマット指定子は format() メソッドと同じ文法。"
  },
  {
    "id": "logic-fstring-bang-r",
    "source": "7章チュートリアル",
    "domain": "入出力",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "animals = 'ウナギ'\nprint(f'{animals!r}')",
    "choices": [
      "'ウナギ'（クォート付き）",
      "ウナギ（クォートなし）",
      "Unicode エスケープ表現",
      "TypeError"
    ],
    "correct": 0,
    "explanation": "f-string の !r は repr() を適用する変換子。文字列の repr は外側にクォートが付く形になる。!s（既定、str 適用）なら ウナギ のままクォートなしで出る。デバッグ表示で「文字列であること」を明示したいときに !r を使う。"
  },
  {
    "id": "logic-fstring-eq",
    "source": "7章チュートリアル",
    "domain": "入出力",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "bugs = 'roaches'\ncount = 13\nprint(f'{bugs=} {count=}')",
    "choices": [
      "bugs='roaches' count=13",
      "roaches 13",
      "bugs count",
      "SyntaxError"
    ],
    "correct": 0,
    "explanation": "f-string の = 指定子は self-documenting expression と呼ばれる機能（Python 3.8+）。f'{expr=}' は expr=値 の形で式と評価結果を一緒に出力する。文字列値の場合は repr 形式（クォート付き）になるのが既定。デバッグ出力で「変数名と値」を簡潔に書ける。"
  },
  {
    "id": "logic-format-positional",
    "source": "7章チュートリアル",
    "domain": "入出力",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "print('{1} and {0}'.format('spam', 'eggs'))",
    "choices": [
      "eggs and spam",
      "spam and eggs",
      "1 and 0",
      "TypeError"
    ],
    "correct": 0,
    "explanation": "format() の {} 内のインデックスは渡した位置引数の番号を指す。{1} は2番目の引数 'eggs'、{0} は1番目の引数 'spam'。順序を入れ替えたり同じ引数を複数回参照したりできる。{} だけならゼロから順に消費される。"
  },
  {
    "id": "logic-format-dict-unpack",
    "source": "7章チュートリアル",
    "domain": "入出力",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "table = {'Jack': 4098, 'Sjoerd': 4127}\nprint('Jack: {Jack:d}; Sjoerd: {Sjoerd:d}'.format(**table))",
    "choices": [
      "Jack: 4098; Sjoerd: 4127",
      "Jack: Jack; Sjoerd: Sjoerd",
      "辞書全体を文字列化",
      "TypeError"
    ],
    "correct": 0,
    "explanation": "**table で辞書のキー/値をキーワード引数として展開し、format() のテンプレートの {Jack} {Sjoerd} プレースホルダに埋まる。:d は整数表示の書式指定子。「**dict で名前付き展開」のイディオムは関数呼び出しと同じ仕組み。"
  },
  {
    "id": "logic-rjust-zfill",
    "source": "7章チュートリアル",
    "domain": "入出力",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "print('12'.rjust(5))\nprint('12'.zfill(5))",
    "choices": [
      "1行目:    12 (空白寄せ) / 2行目: 00012 (ゼロ埋め)",
      "両方ゼロ埋め",
      "両方空白寄せ",
      "TypeError"
    ],
    "correct": 0,
    "explanation": "rjust(5) は幅5に右寄せ、足りない部分は空白で埋める → '   12'（先頭3空白+12）。zfill(5) は幅5にゼロで左を埋める文字列メソッドで、特に数値文字列でよく使う → '00012'。両方とも長さ5の文字列。「rjust は空白、zfill はゼロ」と区別する。"
  },
  {
    "id": "logic-percent-format",
    "source": "7章チュートリアル",
    "domain": "入出力",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "import math\nprint('%.2f' % math.pi)",
    "choices": [
      "3.14",
      "3.142",
      "3.14159",
      "TypeError"
    ],
    "correct": 0,
    "explanation": "古い % 書式で文字列フォーマット。%.2f は「小数点以下2桁の float」、% 値 で値が埋め込まれる。math.pi (3.14159...) を2桁に丸めて 3.14。f-string や format() と同じ書式記号 .2f を使うが構文が異なる（% 演算子で対応）。古いコードや一部の文脈で残っている。"
  },
  {
    "id": "logic-write-returns",
    "source": "7章チュートリアル",
    "domain": "入出力",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "with open('tmp_ch7_a.txt', 'w', encoding='utf-8') as f:\n    n = f.write('abcde')\nprint(n)",
    "choices": [
      "5",
      "None",
      "'abcde'",
      "0"
    ],
    "correct": 0,
    "explanation": "f.write(string) は書き込んだ文字数を返す。'abcde' は5文字なので n=5。print(n) は 5 を出力。テキストモードでは文字数（バイト数ではない）を返す点に注意（マルチバイト文字なら文字数とバイト数は違う）。with ブロック終了で自動的に close される。"
  },
  {
    "id": "logic-with-closed",
    "source": "7章チュートリアル",
    "domain": "入出力",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "with open('tmp_ch7_b.txt', 'w', encoding='utf-8') as f:\n    f.write('x')\nprint(f.closed)",
    "choices": [
      "True",
      "False",
      "AttributeError",
      "NameError"
    ],
    "correct": 0,
    "explanation": "with ブロックを抜けると自動的に f.close() が呼ばれるので、f.closed 属性は True になる。f 変数自体はブロック外でも参照可能（with は新しいスコープを作らない）。Python の慣用句として「ファイルを使ったら必ず with」を覚える。"
  },
  {
    "id": "logic-read-eof",
    "source": "7章チュートリアル",
    "domain": "入出力",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "with open('tmp_ch7_c.txt', 'w', encoding='utf-8') as f:\n    f.write('abc')\nwith open('tmp_ch7_c.txt', 'r', encoding='utf-8') as f:\n    print(f.read())\n    print(repr(f.read()))",
    "choices": [
      "1行目: abc / 2行目: ''",
      "abc / abc",
      "abc / None",
      "EOFError"
    ],
    "correct": 0,
    "explanation": "1回目の read() でファイル全体 'abc' が読まれてファイル位置は EOF に達する。2回目の read() は EOF なので空文字列 '' を返す。print(repr('')) で '' と表示される（クォート付きで空であることを明示）。「EOF の read は空文字列」を覚える。"
  },
  {
    "id": "logic-readline-newline",
    "source": "7章チュートリアル",
    "domain": "入出力",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "with open('tmp_ch7_d.txt', 'w', encoding='utf-8') as f:\n    f.write('line1\\nline2\\n')\nwith open('tmp_ch7_d.txt', 'r', encoding='utf-8') as f:\n    print(repr(f.readline()))\n    print(repr(f.readline()))",
    "choices": [
      "1行目: 'line1\\n' / 2行目: 'line2\\n'",
      "1行目: 'line1' / 2行目: 'line2'",
      "改行込み全体を1回で",
      "TypeError"
    ],
    "correct": 0,
    "explanation": "readline() は末尾の \\n を含めて1行を返す。repr で表示すると 'line1\\n' のように改行文字が見える形。改行を除きたいなら line.rstrip('\\n') または line.strip() を使う。「readline は通常改行付き」。"
  },
  {
    "id": "logic-iter-file",
    "source": "7章チュートリアル",
    "domain": "入出力",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "with open('tmp_ch7_e.txt', 'w', encoding='utf-8') as f:\n    f.write('a\\nb\\n')\nwith open('tmp_ch7_e.txt', 'r', encoding='utf-8') as f:\n    for line in f:\n        print(line, end='')",
    "choices": [
      "1行目: a / 2行目: b（改行で2行）",
      "a\\nb\\n",
      "ab",
      "3行出力"
    ],
    "correct": 0,
    "explanation": "ファイルオブジェクトの直接反復は行ごとに \\n 付きで取り出す。print の end='' で print 自身の改行を抑止しているので、line 内の \\n だけが効く → a 改行 b 改行で2行出力。「行読みは for line in f」のメモリ効率の良いイディオム。"
  },
  {
    "id": "logic-closed-file-read",
    "source": "7章チュートリアル",
    "domain": "エラーと例外",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "f = open('tmp_ch7_f.txt', 'w', encoding='utf-8')\nf.close()\nf.read()",
    "choices": [
      "ValueError",
      "空文字列が返る",
      "None",
      "FileNotFoundError"
    ],
    "correct": 0,
    "explanation": "閉じられたファイルへの read/write は ValueError: I/O operation on closed file。EOF（空文字列）と紛らわしいが、ValueError が出るのが正しい挙動。with を使えばこのエラーは起きにくい。close 状態を確認したいなら f.closed 属性を使う。"
  },
  {
    "id": "logic-tell-seek",
    "source": "7章チュートリアル",
    "domain": "入出力",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "with open('tmp_ch7_g.bin', 'wb') as f:\n    f.write(b'0123456789abcdef')\nwith open('tmp_ch7_g.bin', 'rb') as f:\n    f.seek(5)\n    print(f.tell())\n    print(f.read(1))",
    "choices": [
      "1行目: 5 / 2行目: b'5'",
      "1行目: 6 / 2行目: b'5'",
      "1行目: 5 / 2行目: b'4'",
      "TypeError"
    ],
    "correct": 0,
    "explanation": "seek(5) で先頭から5バイト目に移動（whence=0 既定）。tell() は現在位置 5 を返す。read(1) でその位置から1バイト読むと b'5'（インデックス5の文字）。バイナリモードなのでバイト数で位置を扱える。「seek してから tell は同じ値、read は次の1文字」。"
  },
  {
    "id": "logic-seek-from-end",
    "source": "7章チュートリアル",
    "domain": "入出力",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "with open('tmp_ch7_h.bin', 'wb') as f:\n    f.write(b'0123456789abcdef')\nwith open('tmp_ch7_h.bin', 'rb') as f:\n    f.seek(-3, 2)\n    print(f.read(1))",
    "choices": [
      "b'd'",
      "b'c'",
      "b'e'",
      "b'f'"
    ],
    "correct": 0,
    "explanation": "seek(-3, 2) は whence=2（終端基準）から -3 バイト = 終端から3バイト戻る。'0123456789abcdef' は16バイト、終端から3戻ると 16-3=13 番目の位置 = 'd'。read(1) で1バイト読んで b'd'。バイナリモードでないと負オフセットの seek は使えない。"
  },
  {
    "id": "logic-json-dumps",
    "source": "7章チュートリアル",
    "domain": "標準ライブラリめぐり",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "import json\nx = [1, 'simple', 'list']\ns = json.dumps(x)\nprint(type(s).__name__)\nprint(s)",
    "choices": [
      "1行目: str / 2行目: [1, \"simple\", \"list\"]",
      "1行目: list / 2行目: [1, 'simple', 'list']",
      "1行目: bytes / 2行目: ...",
      "TypeError"
    ],
    "correct": 0,
    "explanation": "json.dumps(x) は Python オブジェクトを JSON 文字列にシリアライズする。type(s).__name__ は 'str'。JSON 文字列は仕様上ダブルクォートなので [1, \"simple\", \"list\"] の形（Python の repr とは違う）。リストはそのまま JSON 配列に、文字列はダブルクォート付きに変換される。"
  },
  {
    "id": "logic-json-dump-load",
    "source": "7章チュートリアル",
    "domain": "標準ライブラリめぐり",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "import json\ndata = {\"a\": 1, \"b\": [2, 3]}\nwith open('tmp_ch7_i.json', 'w', encoding='utf-8') as f:\n    json.dump(data, f)\nwith open('tmp_ch7_i.json', 'r', encoding='utf-8') as f:\n    loaded = json.load(f)\nprint(loaded)",
    "choices": [
      "{'a': 1, 'b': [2, 3]}",
      "'{\"a\": 1, \"b\": [2, 3]}'（文字列）",
      "タプル化された結果",
      "TypeError"
    ],
    "correct": 0,
    "explanation": "json.dump(data, f) は data を JSON にシリアライズしてファイルに書き込む。json.load(f) はファイルから JSON を読み込んで Python オブジェクト（dict）に戻す。Python 表現の dict が出力されるので {'a': 1, 'b': [2, 3]}（シングルクォート、JSON とは表記が違う）。"
  },
  {
    "id": "logic-syntax-error",
    "source": "8章チュートリアル",
    "domain": "エラーと例外",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "while True print(\"Hello\")",
    "choices": [
      "SyntaxError",
      "RuntimeError",
      "無限ループ",
      "NameError"
    ],
    "correct": 0,
    "explanation": "while 文のコロン (:) が抜けているため SyntaxError が発生。コードは実行されない（parsing 段階で停止）。エラーメッセージは ^ で問題箇所を示し、while True の後に : が必要であることが分かる。実行時例外ではなく構文エラーである点に注意。"
  },
  {
    "id": "logic-name-error",
    "source": "8章チュートリアル",
    "domain": "エラーと例外",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "print(4 + spam * 3)",
    "choices": [
      "NameError",
      "0",
      "None",
      "SyntaxError"
    ],
    "correct": 0,
    "explanation": "spam という変数が定義されていないので NameError: name 'spam' is not defined が発生する。Python は未定義変数を 0 や None として扱わない（厳格）。実行は print 関数の引数評価中に止まる。「未定義変数は NameError」を覚える。"
  },
  {
    "id": "logic-except-first-match",
    "source": "8章チュートリアル",
    "domain": "エラーと例外",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "class B(Exception):\n    pass\nclass C(B):\n    pass\n\ntry:\n    raise C()\nexcept B:\n    print(\"B\")\nexcept C:\n    print(\"C\")",
    "choices": [
      "B",
      "C",
      "B と C 両方",
      "出力なし"
    ],
    "correct": 0,
    "explanation": "C は B を継承しているので、except B: は C のインスタンスにもマッチする。except は上から順に判定し、最初に一致したものだけが実行される。だから B が出力され、except C: は到達しない（dead code 的な状態）。具体的な型を上に書くのが正しい順序。「except は上から最初の一致だけ」。"
  },
  {
    "id": "logic-bare-raise",
    "source": "8章チュートリアル",
    "domain": "エラーと例外",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "try:\n    raise NameError('HiThere')\nexcept NameError:\n    print('passed')\n    raise",
    "choices": [
      "passed と表示後、NameError が再送出される",
      "passed のみ表示",
      "NameError のみ（passed なし）",
      "SyntaxError"
    ],
    "correct": 0,
    "explanation": "except 節で 'passed' が出力された後、bare raise で同じ NameError が再送出される。再送出された例外は外側にハンドラがなければプログラム終了時にトレースバックに出る。これは「ログを取ったうえで上位に投げ直す」典型パターン。bare raise は現在処理中の例外を再送出する。"
  },
  {
    "id": "logic-raise-class",
    "source": "8章チュートリアル",
    "domain": "エラーと例外",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "raise ValueError",
    "choices": [
      "ValueError（引数なしで暗黙にインスタンス化）",
      "TypeError（クラスは raise できない）",
      "NameError",
      "何も起きない"
    ],
    "correct": 0,
    "explanation": "raise ValueError は raise ValueError() の省略形で、引数なしのインスタンスを暗黙的に作って送出する。raise には例外クラスでも例外インスタンスでも渡せる。引数付きなら raise ValueError(\"msg\") のようにインスタンス化形式が必須。"
  },
  {
    "id": "logic-from-none",
    "source": "8章チュートリアル",
    "domain": "エラーと例外",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "try:\n    open('database.sqlite')\nexcept OSError:\n    raise RuntimeError from None",
    "choices": [
      "RuntimeError（前の OSError は連鎖表示されない）",
      "FileNotFoundError と RuntimeError の両方が連鎖表示",
      "OSError のみ",
      "RuntimeError → OSError の順で表示"
    ],
    "correct": 0,
    "explanation": "open() で存在しないファイルにアクセス → FileNotFoundError（OSError のサブクラス）が発生し、except OSError で捕まえる。raise RuntimeError from None は前の例外を __suppress_context__ で隠すので、トレースバックには RuntimeError のみ表示される。from exc なら原因が表示される。「from None で前の例外を見せない」。"
  },
  {
    "id": "logic-finally-on-exception",
    "source": "8章チュートリアル",
    "domain": "エラーと例外",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "try:\n    raise KeyboardInterrupt\nfinally:\n    print('Goodbye, world!')",
    "choices": [
      "Goodbye, world! が出力後、KeyboardInterrupt が伝播する",
      "KeyboardInterrupt のみで Goodbye は出力されない",
      "Goodbye のみ",
      "出力なし"
    ],
    "correct": 0,
    "explanation": "finally 節は try で例外が起きても実行される。だから 'Goodbye, world!' が出力された後、KeyboardInterrupt が外側に伝播する（except でキャッチしていないので）。「finally は最後に必ず通る」を覚える。リソースクリーンアップに使う。"
  },
  {
    "id": "logic-finally-return-overrides",
    "source": "8章チュートリアル",
    "domain": "エラーと例外",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "def bool_return():\n    try:\n        return True\n    finally:\n        return False\n\nprint(bool_return())",
    "choices": [
      "False",
      "True",
      "None",
      "SyntaxError"
    ],
    "correct": 0,
    "explanation": "try 節で return True が実行されようとするが、finally 節があるので先にそちらを実行 → finally の return False が呼ばれて関数が終了。最終的な戻り値は False になる。「finally の return は try の return を上書きする」。これは混乱を招くため、Python 3.14 では SyntaxWarning が出るとされる非推奨パターン。"
  },
  {
    "id": "logic-try-else-success",
    "source": "8章チュートリアル",
    "domain": "エラーと例外",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "try:\n    x = 10 / 2\nexcept ZeroDivisionError:\n    print(\"except\")\nelse:\n    print(\"else\")",
    "choices": [
      "else",
      "except",
      "何も出力されない",
      "SyntaxError"
    ],
    "correct": 0,
    "explanation": "10 / 2 = 5.0 で例外は発生しない。try 節が成功した場合のみ else 節が実行される。if-else の else とは意味が違う（こちらは「例外なし完走」のとき実行）。「try-else = 例外なし成功時」。"
  },
  {
    "id": "logic-exception-group",
    "source": "8章チュートリアル",
    "domain": "エラーと例外",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "def f():\n    excs = [OSError('error 1'), SystemError('error 2')]\n    raise ExceptionGroup('there were problems', excs)\n\ntry:\n    f()\nexcept Exception as e:\n    print(type(e).__name__)\n    print('sub-exceptions' in str(e))",
    "choices": [
      "1行目: ExceptionGroup / 2行目: True",
      "1行目: OSError / 2行目: True",
      "1行目: ExceptionGroup / 2行目: False",
      "TypeError"
    ],
    "correct": 0,
    "explanation": "ExceptionGroup('msg', [exc1, exc2]) で複数の例外をまとめて送出する。type(e).__name__ は 'ExceptionGroup'。str(e) には \"...sub-exceptions\" のような表現が含まれる。except Exception は ExceptionGroup もキャッチできる（ExceptionGroup は Exception の派生）。"
  },
  {
    "id": "logic-except-star",
    "source": "8章チュートリアル",
    "domain": "エラーと例外",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "try:\n    raise ExceptionGroup(\n        \"group1\",\n        [OSError(1), SystemError(2)]\n    )\nexcept* OSError:\n    print(\"There were OSErrors\")\nexcept* SystemError:\n    print(\"There were SystemErrors\")",
    "choices": [
      "1行目: There were OSErrors / 2行目: There were SystemErrors",
      "1行目: There were OSErrors のみ",
      "1行目: There were SystemErrors のみ",
      "TypeError"
    ],
    "correct": 0,
    "explanation": "except* は ExceptionGroup 内の例外を型別に分けて処理する。OSError 系（OSError(1)）と SystemError 系（SystemError(2)）の両方が ExceptionGroup に含まれているので、両方の except* 節が実行される。通常の except と違い、複数 except* 節が同じ group から異なる型を取り出してそれぞれ動く。"
  },
  {
    "id": "logic-add-note",
    "source": "8章チュートリアル",
    "domain": "エラーと例外",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "try:\n    raise TypeError('bad type')\nexcept Exception as e:\n    e.add_note('Add some information')\n    print(type(e).__name__)\n    print(e)",
    "choices": [
      "1行目: TypeError / 2行目: bad type",
      "1行目: TypeError / 2行目: Add some information",
      "1行目: TypeError / 2行目: bad type Add some information",
      "TypeError 直後にエラー終了"
    ],
    "correct": 0,
    "explanation": "add_note() は例外に補足情報を追記するメソッドだが、__str__（つまり print(e) の出力）は変更しない。print(e) は元のメッセージ 'bad type' のまま。ノートは __notes__ 属性に保存され、トレースバック表示時に追記される。「add_note は本文を書き換えない、トレースバックに足すだけ」。"
  },
  {
    "id": "logic-cls-nonlocal",
    "source": "9章チュートリアル",
    "domain": "制御構文ツール",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "def scope_test():\n    def do_local():\n        spam = \"local spam\"\n\n    def do_nonlocal():\n        nonlocal spam\n        spam = \"nonlocal spam\"\n\n    spam = \"test spam\"\n    do_local()\n    print(spam)\n    do_nonlocal()\n    print(spam)\n\nscope_test()",
    "choices": [
      "1行目: test spam / 2行目: nonlocal spam",
      "1行目: local spam / 2行目: nonlocal spam",
      "1行目: nonlocal spam / 2行目: nonlocal spam",
      "1行目: test spam / 2行目: test spam"
    ],
    "correct": 0,
    "explanation": "do_local() は内側に新しい spam を作るだけで外側に影響しないので、最初の print は 'test spam'。do_nonlocal() は nonlocal spam で外側関数の spam を再束縛するので、2回目の print は 'nonlocal spam'。「nonlocal は外側関数のスコープを書き換える」。"
  },
  {
    "id": "logic-cls-global",
    "source": "9章チュートリアル",
    "domain": "制御構文ツール",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "def scope_test():\n    def do_global():\n        global spam\n        spam = \"global spam\"\n\n    spam = \"test spam\"\n    do_global()\n    print(spam)\n\nscope_test()\nprint(spam)",
    "choices": [
      "1行目: test spam / 2行目: global spam",
      "1行目: global spam / 2行目: global spam",
      "1行目: test spam / 2行目: test spam",
      "NameError"
    ],
    "correct": 0,
    "explanation": "do_global() は global spam でモジュールレベルの spam を作る。scope_test 内の spam は別スコープなので影響なし。1回目の print は 'test spam'（scope_test 内のローカル）。scope_test の外で print(spam) すると、do_global で作られたモジュールグローバルが見えて 'global spam'。「global はモジュールトップ、nonlocal は外側関数」。"
  },
  {
    "id": "logic-cls-init-complex",
    "source": "9章チュートリアル",
    "domain": "クラス",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "class Complex:\n    def __init__(self, realpart, imagpart):\n        self.r = realpart\n        self.i = imagpart\n\nx = Complex(3.0, -4.5)\nprint(x.r, x.i)",
    "choices": [
      "3.0 -4.5",
      "(3.0, -4.5)",
      "TypeError",
      "AttributeError"
    ],
    "correct": 0,
    "explanation": "Complex(3.0, -4.5) でインスタンス化すると、Python が自動的に __init__ を呼び出して self.r=3.0, self.i=-4.5 を設定する。print(x.r, x.i) で 3.0 -4.5 が表示される。__init__ はインスタンス生成直後に自動的に呼ばれる初期化メソッド（コンストラクタに近い役割）。"
  },
  {
    "id": "logic-cls-attr-counter",
    "source": "9章チュートリアル",
    "domain": "クラス",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "class MyClass:\n    pass\n\nx = MyClass()\nx.counter = 1\nwhile x.counter < 10:\n    x.counter = x.counter * 2\nprint(x.counter)",
    "choices": [
      "16",
      "10",
      "8",
      "AttributeError"
    ],
    "correct": 0,
    "explanation": "クラス本体で counter を宣言していなくても、`x.counter = 1` で動的にインスタンス属性が作られる。while ループで 1 → 2 → 4 → 8 → 16 と倍化し、16 で while 条件 (< 10) が False になって終了。「インスタンス属性は代入で生える」。"
  },
  {
    "id": "logic-cls-bound-method",
    "source": "9章チュートリアル",
    "domain": "クラス",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "class MyClass:\n    def f(self):\n        return 'hello world'\n\nx = MyClass()\nxf = x.f\nprint(xf())",
    "choices": [
      "hello world",
      "TypeError（self が渡されない）",
      "'<bound method ...>'",
      "NameError"
    ],
    "correct": 0,
    "explanation": "x.f は bound method で、x への参照を保持している。変数 xf に代入してもこの束縛は維持されるので、xf() を呼ぶと自動的に self=x が渡される。結果として 'hello world' が返り print される。「bound method は self を保持する」。"
  },
  {
    "id": "logic-cls-class-var-share",
    "source": "9章チュートリアル",
    "domain": "クラス",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "class Dog:\n    kind = 'canine'\n\n    def __init__(self, name):\n        self.name = name\n\nd = Dog('Fido')\ne = Dog('Buddy')\nprint(d.kind)\nprint(e.kind)\nprint(d.name)\nprint(e.name)",
    "choices": [
      "canine / canine / Fido / Buddy",
      "canine / canine / Fido / Fido",
      "Fido / Buddy / canine / canine",
      "AttributeError"
    ],
    "correct": 0,
    "explanation": "kind はクラス変数なので全インスタンスで共有 → d.kind も e.kind も 'canine'。name はインスタンス変数なので各インスタンス固有 → d.name='Fido', e.name='Buddy'。「class に置けば共有、self に置けば個別」。"
  },
  {
    "id": "logic-cls-isinstance-issubclass",
    "source": "9章チュートリアル",
    "domain": "クラス",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "print(isinstance(True, int))\nprint(issubclass(bool, int))\nprint(issubclass(float, int))",
    "choices": [
      "1行目: True / 2行目: True / 3行目: False",
      "1行目: False / 2行目: False / 3行目: False",
      "1行目: True / 2行目: True / 3行目: True",
      "TypeError"
    ],
    "correct": 0,
    "explanation": "Python では bool は int の派生クラスなので、isinstance(True, int) は True、issubclass(bool, int) も True。一方 float は int の派生ではないので issubclass(float, int) は False。「isinstance は個体、issubclass は型」「bool は int の派生」が同時に問われる典型問題。"
  },
  {
    "id": "logic-cls-method-override",
    "source": "9章チュートリアル",
    "domain": "クラス",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "class Base:\n    def greet(self):\n        return \"base\"\n\nclass Derived(Base):\n    def greet(self):\n        return \"derived\"\n\nx = Derived()\nprint(x.greet())",
    "choices": [
      "derived",
      "base",
      "base derived",
      "AttributeError"
    ],
    "correct": 0,
    "explanation": "Derived.greet() が Base.greet() をオーバーライドしている。x = Derived() のインスタンスから greet() を呼ぶと、派生クラス側のメソッドが呼ばれる。「派生クラスが基底クラスを上書きする」のが継承の基本。"
  },
  {
    "id": "logic-cls-base-explicit-call",
    "source": "9章チュートリアル",
    "domain": "クラス",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "class Base:\n    def greet(self):\n        return \"base\"\n\nclass Derived(Base):\n    def greet(self):\n        return Base.greet(self) + \"-derived\"\n\nx = Derived()\nprint(x.greet())",
    "choices": [
      "base-derived",
      "derived-base",
      "base",
      "derived"
    ],
    "correct": 0,
    "explanation": "Derived.greet() の中で Base.greet(self) を明示的に呼んで、その結果に '-derived' を連結している。'base' + '-derived' = 'base-derived'。super().greet() でも同じ結果になる（多重継承では super() のほうが安全）。「Base.method(self) は明示呼び出し」。"
  },
  {
    "id": "logic-cls-single-underscore",
    "source": "9章チュートリアル",
    "domain": "クラス",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "class C:\n    def __init__(self):\n        self._x = 10\n\nc = C()\nprint(c._x)",
    "choices": [
      "10",
      "AttributeError",
      "0",
      "_x"
    ],
    "correct": 0,
    "explanation": "先頭1個のアンダースコア _x は「非公開 API として扱う」慣習だけで、Python 自身は何の制限も加えない。c._x は通常通り参照できる。慣習として「_ で始まるものは内部用、外部から触らない」と理解する。「_ は慣習、__ は変形」。"
  },
  {
    "id": "logic-cls-double-underscore-mangling",
    "source": "9章チュートリアル",
    "domain": "クラス",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "class Mapping:\n    def __init__(self):\n        self.__x = 1\n\nm = Mapping()\nprint(hasattr(m, '__x'))\nprint(hasattr(m, '_Mapping__x'))",
    "choices": [
      "1行目: False / 2行目: True",
      "1行目: True / 2行目: True",
      "1行目: True / 2行目: False",
      "AttributeError"
    ],
    "correct": 0,
    "explanation": "クラス内の __x は名前マングリングで _Mapping__x に変換される。だから外部から hasattr(m, '__x') は False、hasattr(m, '_Mapping__x') は True。これは厳密な private ではなく「事故防止の名前変形」で、外から _Mapping__x で参照できる。"
  },
  {
    "id": "logic-cls-dataclass-basic",
    "source": "9章チュートリアル",
    "domain": "クラス",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "from dataclasses import dataclass\n\n@dataclass\nclass Employee:\n    name: str\n    dept: str\n    salary: int\n\njohn = Employee('john', 'computer lab', 1000)\nprint(john.dept)\nprint(john.salary)",
    "choices": [
      "1行目: computer lab / 2行目: 1000",
      "1行目: john / 2行目: 1000",
      "TypeError",
      "AttributeError"
    ],
    "correct": 0,
    "explanation": "@dataclass デコレータが __init__ を自動生成するので、Employee('john', 'computer lab', 1000) で位置引数として name, dept, salary が割り当てられる。john.dept は 'computer lab'、john.salary は 1000。手書きで __init__ を書く必要がない。「素朴な record なら dataclass」。"
  },
  {
    "id": "logic-iter-next-basic",
    "source": "9章チュートリアル",
    "domain": "イテレーション",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "s = 'abc'\nit = iter(s)\nprint(next(it))\nprint(next(it))\nprint(next(it))",
    "choices": [
      "1行目: a / 2行目: b / 3行目: c",
      "1行目: abc / 2行目: 空 / 3行目: 空",
      "1行目: a / 2行目: a / 3行目: a",
      "StopIteration"
    ],
    "correct": 0,
    "explanation": "iter(s) は文字列の各文字を順に返すイテレータを作る。next(it) を呼ぶたびに 'a' → 'b' → 'c' と1文字ずつ進む。これが for 文の内部動作で、for char in s: は iter() + next() + StopIteration の組み合わせで動いている。"
  },
  {
    "id": "logic-iter-stop-iteration",
    "source": "9章チュートリアル",
    "domain": "エラーと例外",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "s = 'a'\nit = iter(s)\nprint(next(it))\nnext(it)",
    "choices": [
      "1行目: a / 2行目: StopIteration",
      "1行目: a / 2行目: None",
      "1行目: a / 2行目: a",
      "1行目: StopIteration / 2行目: None"
    ],
    "correct": 0,
    "explanation": "1回目の next() で 'a' が返り、文字列が尽きる。2回目の next() は要素がないので StopIteration 例外を送出する。これが for 文がループを終える仕組み。「終了通知は StopIteration」。None を返すのではない点に注意。"
  },
  {
    "id": "logic-iter-reverse-class",
    "source": "9章チュートリアル",
    "domain": "クラス",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "class Reverse:\n    def __init__(self, data):\n        self.data = data\n        self.index = len(data)\n\n    def __iter__(self):\n        return self\n\n    def __next__(self):\n        if self.index == 0:\n            raise StopIteration\n        self.index -= 1\n        return self.data[self.index]\n\nrev = Reverse('spam')\nprint(iter(rev) is rev)\nfor char in rev:\n    print(char)",
    "choices": [
      "1行目: True / 2-5行目: m, a, p, s",
      "1行目: False / 2-5行目: s, p, a, m",
      "1行目: True / 2-5行目: s, p, a, m",
      "TypeError"
    ],
    "correct": 0,
    "explanation": "Reverse は __iter__ で self を返すので、iter(rev) は rev 自身 → 'iter(rev) is rev' は True。__next__ は index を減らしながら data[index] を返すので 'spam' を逆順に m, a, p, s と出力する。「iterator protocol = iter + next」の典型実装。"
  },
  {
    "id": "logic-yield-reverse",
    "source": "9章チュートリアル",
    "domain": "イテレーション",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "def reverse(data):\n    for index in range(len(data)-1, -1, -1):\n        yield data[index]\n\nfor char in reverse('golf'):\n    print(char)",
    "choices": [
      "f, l, o, g（4行）",
      "g, o, l, f（4行）",
      "golf（1行）",
      "TypeError"
    ],
    "correct": 0,
    "explanation": "reverse() は yield を使うジェネレータ関数。range(3, -1, -1) で index は 3,2,1,0 と進み、'golf'[3]='f', [2]='l', [1]='o', [0]='g' を順に yield する。クラスベースのイテレータ（前問の Reverse）と同じ機能を1関数で簡潔に書ける。「yield は返して止まり、次回続きから」。"
  },
  {
    "id": "logic-genexp-square-sum",
    "source": "9章チュートリアル",
    "domain": "イテレーション",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "print(sum(i*i for i in range(10)))",
    "choices": [
      "285",
      "100",
      "45",
      "SyntaxError"
    ],
    "correct": 0,
    "explanation": "ジェネレータ式 i*i for i in range(10) で 0², 1², 2², ..., 9² = 0, 1, 4, 9, 16, 25, 36, 49, 64, 81 を生成し、sum() で合計 = 285。関数呼び出しの引数として渡す場合、ジェネレータ式の括弧は省略できる。リスト内包と違って中間リストを作らないのでメモリ効率がよい。"
  },
  {
    "id": "logic-genexp-zip-dot",
    "source": "9章チュートリアル",
    "domain": "イテレーション",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "xvec = [10, 20, 30]\nyvec = [7, 5, 3]\nprint(sum(x*y for x, y in zip(xvec, yvec)))",
    "choices": [
      "260",
      "180",
      "60",
      "TypeError"
    ],
    "correct": 0,
    "explanation": "zip(xvec, yvec) は (10,7), (20,5), (30,3) を返す。ジェネレータ式 x*y for x, y in zip(...) で 10*7=70, 20*5=100, 30*3=90 を生成し、sum() で 70+100+90 = 260。これがベクトルのドット積（内積）の典型実装。「[] は全部作る、() は必要時生成」。"
  },
  {
    "id": "logic-shutil-vs-os",
    "source": "10章チュートリアル",
    "domain": "標準ライブラリめぐり",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "import os\nimport shutil\nprint(hasattr(shutil, 'copyfile'))\nprint(hasattr(os, 'copyfile'))",
    "choices": [
      "1行目: True / 2行目: False",
      "1行目: True / 2行目: True",
      "1行目: False / 2行目: True",
      "1行目: False / 2行目: False"
    ],
    "correct": 0,
    "explanation": "shutil.copyfile は高水準ファイルコピー関数として存在するので hasattr は True。os モジュールには copyfile が直接ないので False（os.path.copy も存在しない）。「low-level は os、high-level は shutil」を体感する典型問題。なお os には rename はある。"
  },
  {
    "id": "logic-glob-wildcard",
    "source": "10章チュートリアル",
    "domain": "標準ライブラリめぐり",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "import glob\nopen('tmp10_a.py', 'w').close()\nopen('tmp10_b.txt', 'w').close()\nprint(sorted(glob.glob('tmp10_*')))\nprint(sorted(glob.glob('tmp10_*.py')))",
    "choices": [
      "1行目: ['tmp10_a.py', 'tmp10_b.txt'] / 2行目: ['tmp10_a.py']",
      "1行目: ['tmp10_*'] / 2行目: ['tmp10_*.py']",
      "1行目: [] / 2行目: []",
      "TypeError"
    ],
    "correct": 0,
    "explanation": "glob はシェル風ワイルドカードでマッチするファイル一覧を返す。tmp10_* は両方のファイルにマッチ、tmp10_*.py は .py ファイルだけにマッチ。sorted で結果を安定化。実行ごとにファイル順序が変わる可能性があるので比較問題では sorted を被せるのが安全。"
  },
  {
    "id": "logic-argparse-parse",
    "source": "10章チュートリアル",
    "domain": "標準ライブラリめぐり",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "import argparse\nparser = argparse.ArgumentParser(prog='top')\nparser.add_argument('filenames', nargs='+')\nparser.add_argument('-l', '--lines', type=int, default=10)\nargs = parser.parse_args(['--lines=5', 'alpha.txt', 'beta.txt'])\nprint(args.lines)\nprint(args.filenames)",
    "choices": [
      "1行目: 5 / 2行目: ['alpha.txt', 'beta.txt']",
      "1行目: '5' / 2行目: ['alpha.txt', 'beta.txt']",
      "1行目: 10 / 2行目: ['alpha.txt', 'beta.txt']",
      "TypeError"
    ],
    "correct": 0,
    "explanation": "argparse は宣言的に引数を定義する。--lines=5 は type=int で整数 5 に変換される（文字列 '5' ではない）。nargs='+' の filenames は1個以上の位置引数を受け、リストとして格納される。args.lines, args.filenames で属性アクセス。"
  },
  {
    "id": "logic-stderr-write",
    "source": "10章チュートリアル",
    "domain": "入出力",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "import sys\nn = sys.stderr.write('warn\\n')\nprint(type(n).__name__)",
    "choices": [
      "int",
      "NoneType",
      "str",
      "bytes"
    ],
    "correct": 0,
    "explanation": "write() メソッドは書き込んだ文字数（テキストモード）を返す。stdout/stderr は両方ともテキストファイルとして扱えるので、sys.stderr.write('warn\\n') も整数 5 を返す。print は None を返すが、write は文字数を返す違いを覚える。「write は件数を返す」は第7章の論点と同じ。"
  },
  {
    "id": "logic-sys-exit-systemexit",
    "source": "10章チュートリアル",
    "domain": "エラーと例外",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "import sys\ntry:\n    sys.exit()\nexcept BaseException as e:\n    print(type(e).__name__)",
    "choices": [
      "SystemExit",
      "ValueError",
      "RuntimeError",
      "出力なし（プロセス即座終了）"
    ],
    "correct": 0,
    "explanation": "sys.exit() は SystemExit 例外を送出することでプロセスを終了させる。except BaseException で捕まえると終了せずに例外オブジェクトを取得できる（型は SystemExit）。except Exception では捕まえられない（SystemExit は BaseException 直下で Exception の外）。これにより try/finally でクリーンアップが動くようになっている。"
  },
  {
    "id": "logic-re-findall",
    "source": "10章チュートリアル",
    "domain": "標準ライブラリめぐり",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "import re\nprint(re.findall(r'\\bf[a-z]*', 'which foot or hand fell fastest'))",
    "choices": [
      "['foot', 'fell', 'fastest']",
      "['f', 'f', 'f']",
      "['foot or hand fell fastest']",
      "[]"
    ],
    "correct": 0,
    "explanation": "正規表現 \\bf[a-z]* は単語境界 (\\b) の直後に f、続けて0個以上の小文字。'which' の中の f はないが、'foot', 'fell', 'fastest' が単語の頭から f で始まるのでマッチ。'or hand' は f で始まる単語がないのでスキップ。re.findall はすべてのマッチを返す。"
  },
  {
    "id": "logic-re-sub-backref",
    "source": "10章チュートリアル",
    "domain": "標準ライブラリめぐり",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "import re\nprint(re.sub(r'(\\b[a-z]+) \\1', r'\\1', 'cat in the the hat'))",
    "choices": [
      "cat in the hat",
      "cat in the the hat",
      "cat in cat hat",
      "TypeError"
    ],
    "correct": 0,
    "explanation": "(\\b[a-z]+) \\1 は単語境界の小文字単語をキャプチャ (\\1)、空白、同じ単語の繰り返しにマッチする。'the the' がこれにマッチして、置換文字列 r'\\1'（後方参照で1つ目のキャプチャ）に置き換えられる結果 'the' になる。よって 'cat in the the hat' → 'cat in the hat'。連続重複語の縮約イディオム。"
  },
  {
    "id": "logic-str-replace",
    "source": "10章チュートリアル",
    "domain": "標準ライブラリめぐり",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "print('tea for too'.replace('too', 'two'))",
    "choices": [
      "tea for two",
      "tea for too",
      "two",
      "TypeError"
    ],
    "correct": 0,
    "explanation": "文字列メソッド replace(old, new) は単純な置換。re を使わずに済む典型例。'too' を 'two' に置換 → 'tea for two'。replace() は置換できなかった場合も元の文字列を返すだけでエラーにしない。「単純なら str.replace、複雑なら re.sub」。"
  },
  {
    "id": "logic-random-sample",
    "source": "10章チュートリアル",
    "domain": "標準ライブラリめぐり",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "import random\nrandom.seed(0)\nresult = random.sample(range(10), 5)\nprint(len(result))\nprint(len(set(result)) == len(result))",
    "choices": [
      "1行目: 5 / 2行目: True",
      "1行目: 5 / 2行目: False",
      "1行目: 10 / 2行目: True",
      "TypeError"
    ],
    "correct": 0,
    "explanation": "random.sample(population, k) は重複なしで k 個を選ぶ。len(result) は 5。set にしても要素数が変わらない（重複なし）ので、len(set(result)) == len(result) は True。choice や choices と違って重複が出ないことを保証する。seed(0) は再現性のため。"
  },
  {
    "id": "logic-statistics-mean-median",
    "source": "10章チュートリアル",
    "domain": "標準ライブラリめぐり",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "import statistics\ndata = [2.75, 1.75, 1.25, 0.25, 0.5, 1.25, 3.5]\nprint(statistics.mean(data))\nprint(statistics.median(data))",
    "choices": [
      "1行目: 1.6071428571428572 / 2行目: 1.25",
      "1行目: 1.25 / 2行目: 1.6071428571428572",
      "1行目: 11.25 / 2行目: 1.25",
      "TypeError"
    ],
    "correct": 0,
    "explanation": "data の合計 11.25 を 7 で割って mean は約 1.6071428571428572。データをソートすると [0.25, 0.5, 1.25, 1.25, 1.75, 2.75, 3.5] で7個の中央 (4番目) は 1.25 → median = 1.25。「mean は平均、median は中央値」。データの偏りに頑健なのは median。"
  },
  {
    "id": "logic-date-diff",
    "source": "10章チュートリアル",
    "domain": "標準ライブラリめぐり",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "import datetime as dt\na = dt.date(2020, 1, 10)\nb = dt.date(2020, 1, 1)\nage = a - b\nprint(type(age).__name__)\nprint(age.days)",
    "choices": [
      "1行目: timedelta / 2行目: 9",
      "1行目: int / 2行目: 9",
      "1行目: date / 2行目: 9",
      "1行目: timedelta / 2行目: 10"
    ],
    "correct": 0,
    "explanation": "date 同士の減算は timedelta を返す。type の名前は 'timedelta'。1月10日と1月1日の差は9日（10-1=9）。timedelta オブジェクトは .days, .seconds, .microseconds 属性を持ち、加減算で日付演算ができる。a + datetime.timedelta(days=30) で30日後など。"
  },
  {
    "id": "logic-strftime",
    "source": "10章チュートリアル",
    "domain": "標準ライブラリめぐり",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "import datetime as dt\nd = dt.date(2003, 12, 2)\nprint(d.strftime('%m-%d-%y'))",
    "choices": [
      "12-02-03",
      "2003-12-02",
      "03-12-02",
      "2003/12/02"
    ],
    "correct": 0,
    "explanation": "strftime の書式指定子 %m は2桁の月、%d は2桁の日、%y は2桁の年。2003年12月2日 → '12-02-03'。%Y なら4桁の年で '2003' になる。月日年の順序は地域慣習（米国式）で、Python は書式文字列を厳密に解釈するだけ。"
  },
  {
    "id": "logic-zlib-compress",
    "source": "10章チュートリアル",
    "domain": "標準ライブラリめぐり",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "import zlib\ns = b'witch which has which witches wrist watch'\nt = zlib.compress(s)\nprint(type(t).__name__)\nprint(zlib.decompress(t) == s)",
    "choices": [
      "1行目: bytes / 2行目: True",
      "1行目: str / 2行目: True",
      "1行目: bytes / 2行目: False",
      "TypeError"
    ],
    "correct": 0,
    "explanation": "zlib.compress(bytes) → bytes（圧縮データ）を返す。type は 'bytes'。decompress で展開すると元の bytes が完全復元されるので等価比較は True（可逆圧縮）。文字列を圧縮したい場合は事前に .encode('utf-8') で bytes に変換する必要がある。「zlib は bytes 圧縮」。"
  },
  {
    "id": "logic-zlib-crc32",
    "source": "10章チュートリアル",
    "domain": "標準ライブラリめぐり",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "import zlib\ns = b'abc'\nprint(type(zlib.crc32(s)).__name__)",
    "choices": [
      "int",
      "str",
      "bytes",
      "float"
    ],
    "correct": 0,
    "explanation": "crc32 は CRC32 チェックサムを32ビット非負整数で返す。Python では int として扱われる。文字列ハッシュのような16進文字列が返るのではない点に注意。整合性チェックや単純なハッシュ用途に使える。hex(zlib.crc32(s)) で16進表示できる。"
  },
  {
    "id": "logic-doctest-testmod",
    "source": "10章チュートリアル",
    "domain": "標準ライブラリめぐり",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "def average(values):\n    \"\"\"\n    >>> print(average([20, 30, 70]))\n    40.0\n    \"\"\"\n    return sum(values) / len(values)\n\nimport doctest\nresult = doctest.testmod()\nprint(result.failed)\nprint(result.attempted)",
    "choices": [
      "1行目: 0 / 2行目: 1",
      "1行目: 0 / 2行目: 0",
      "1行目: 1 / 2行目: 1",
      "1行目: 1 / 2行目: 0"
    ],
    "correct": 0,
    "explanation": "doctest は docstring 内の >>> 例を実行し、出力が一致するか確認する。average([20, 30, 70]) は (20+30+70)/3 = 40.0 で期待値と一致。1個試して0個失敗 → failed=0, attempted=1。testmod() は TestResults(failed=0, attempted=1) を返す。これにより docstring がテストとして機能する。"
  },
  {
    "id": "logic-unittest-assertraises",
    "source": "10章チュートリアル",
    "domain": "標準ライブラリめぐり",
    "question": "次のコードを実行した結果として、適切な選択肢を選択してください。",
    "code": "import unittest\n\ndef average(values):\n    return sum(values) / len(values)\n\nclass T(unittest.TestCase):\n    def runTest(self):\n        with self.assertRaises(ZeroDivisionError):\n            average([])\n\nresult = unittest.TestResult()\nT().run(result)\nprint(result.wasSuccessful())",
    "choices": [
      "True",
      "False",
      "ZeroDivisionError がそのまま伝播する",
      "TypeError"
    ],
    "correct": 0,
    "explanation": "average([]) は 0/0 を試みて ZeroDivisionError を起こす。assertRaises(ZeroDivisionError) は「このブロックで指定例外が発生したらテスト成功」と判定するので、テストは成功する。wasSuccessful() は失敗もエラーもなければ True。期待された例外が出るのが正しい動作という点を体感する。"
  }
];
