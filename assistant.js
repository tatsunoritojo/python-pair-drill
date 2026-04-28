// 学習アシスタント（Gemini API、ユーザー側APIキー方式）
'use strict';

const ASSISTANT_STORAGE_KEY = 'python-pair-drill-assistant-v1';
const SHARED_STORAGE_KEY = 'python-pair-drill-v1';

const API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';

const SYSTEM_PROMPT_BASE = `あなたは Python3エンジニア認定基礎試験を控えた学習者の専属アシスタントです。
ユーザーは東城立憲（とうじょう たつのり）、ペアプログラマーとして対話してください。

【応答スタイル】
- 日本語で返答する
- ペアプログラマーとして対等。過剰な敬語を避け、自然な会話調
- 説明は「演繹的」: 大ルールを先に提示し、そこから個別ケースを導出する形
- コード問題は1行ずつトレースし、頭の中の状態（変数・属性・スコープ）を書き下す
- 単に答えだけを返さず、答えに至る思考プロセスを示す
- 必要なら表や箇条書きを使うが、まず1つの原理から始める

【ユーザーの誤答癖（過去の3模擬から抽出した7分類）】
1. 推測しがち: 単語の意味から名前を推測（例: sys.end? mean? average?）
2. 語順: 自然な英語に直したくなる（from→import を逆にしがち）
3. 存在しない値: ありそうな選択肢を選ぶ（__module__、=>、Tab+C 等）
4. 境界追跡: ループの最終周回・raise後の行・スコープ脱出後を見落とす
5. 対の取り違え: dir/help、pack/unpack、args/kwargs を取り違える
6. 暗黙ルール: 「タプル内のリストは変更可能」「デフォルト引数は共有」等
7. 文字列・正規表現: \\b \\d * + ? の境界条件

【教える際のヒント】
- これらの癖に該当する論点では、ユーザーが「ありがちに陥る誤答パターン」を先に提示し、なぜそう間違えるかを言語化してから正解へ導く
- 「間違えた経験を通して記憶」と「正しい思考プロセスのトレース」が東城さんに刺さる
- カフェ経営や日常の比喩を使うと理解が深まる

【回答の形式】
- マークダウンを使ってよい（ただし装飾は控えめに）
- コードブロックは三連バッククォート + 言語名で
- 長くなりすぎない（3〜10段落目安）
- 質問が短ければ短く返す`;

// ========== 設定の永続化 ==========
function loadSettings() {
  try {
    const raw = localStorage.getItem(ASSISTANT_STORAGE_KEY);
    return Object.assign({
      apiKey: '',
      model: 'gemini-2.0-flash',
      useContext: true,
      messages: [],
    }, raw ? JSON.parse(raw) : {});
  } catch {
    return { apiKey: '', model: 'gemini-2.0-flash', useContext: true, messages: [] };
  }
}
function saveSettings(s) {
  localStorage.setItem(ASSISTANT_STORAGE_KEY, JSON.stringify(s));
}

// ========== テーマ ==========
function loadSharedStore() {
  try {
    return JSON.parse(localStorage.getItem(SHARED_STORAGE_KEY)) || {};
  } catch { return {}; }
}
function applyTheme(theme) {
  const dark = theme === 'dark' || (theme == null && matchMedia('(prefers-color-scheme: dark)').matches);
  if (dark) document.documentElement.setAttribute('data-theme', 'dark');
  else document.documentElement.removeAttribute('data-theme');
  document.getElementById('theme-toggle').textContent = dark ? '☀️' : '🌙';
}
document.getElementById('theme-toggle').addEventListener('click', () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const next = isDark ? 'light' : 'dark';
  const shared = loadSharedStore();
  shared.theme = next;
  localStorage.setItem(SHARED_STORAGE_KEY, JSON.stringify(shared));
  applyTheme(next);
});

// ========== 画面切り替え ==========
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('active');
    s.setAttribute('aria-hidden', 'true');
  });
  const el = document.getElementById(id);
  el.classList.add('active');
  el.setAttribute('aria-hidden', 'false');
}

// ========== 統計コンテキスト生成（誤答癖を埋め込む） ==========
function buildContextSummary() {
  if (typeof QUESTIONS === 'undefined' || typeof getMeta !== 'function') {
    return '';
  }
  // ドリル統計とアシスタント設定は別領域だが、ドリル統計はSHARED側にある
  const shared = loadSharedStore();
  const qs = shared.questionStats || {};
  if (Object.keys(qs).length === 0) return '';

  // concept 別の集計
  const conceptStats = {};
  Object.keys(qs).forEach((qid) => {
    const meta = getMeta(qid);
    const s = qs[qid];
    meta.concepts.forEach((c) => {
      conceptStats[c] = conceptStats[c] || { correct: 0, total: 0 };
      conceptStats[c].correct += s.correct || 0;
      conceptStats[c].total += s.total || 0;
    });
  });

  const labels = (typeof CONCEPT_LABELS !== 'undefined') ? CONCEPT_LABELS : {};
  const lines = Object.keys(conceptStats)
    .filter((c) => conceptStats[c].total >= 2)
    .map((c) => ({ c, ...conceptStats[c], rate: conceptStats[c].correct / conceptStats[c].total }))
    .sort((a, b) => a.rate - b.rate)
    .slice(0, 7)
    .map((x) => `- ${labels[x.c] || x.c}: ${x.correct}/${x.total} (${Math.round(x.rate * 100)}%)`);

  if (lines.length === 0) return '';
  return `\n【現在の東城さんの誤答癖プロファイル（ドリル統計より）】\n${lines.join('\n')}\n`;
}

// ========== Gemini API 呼び出し ==========
async function callGemini(messages, settings) {
  const url = `${API_BASE}/${settings.model}:generateContent?key=${encodeURIComponent(settings.apiKey)}`;

  const systemPrompt = settings.useContext
    ? SYSTEM_PROMPT_BASE + buildContextSummary()
    : SYSTEM_PROMPT_BASE;

  const contents = messages.map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));

  const body = {
    systemInstruction: { parts: [{ text: systemPrompt }] },
    contents: contents,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 2048,
    },
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`API error ${res.status}: ${errText}`);
  }

  const data = await res.json();
  if (!data.candidates || data.candidates.length === 0) {
    throw new Error('応答が空でした。プロンプトがブロックされた可能性があります。');
  }
  const parts = data.candidates[0].content?.parts || [];
  return parts.map((p) => p.text || '').join('');
}

// ========== UI ==========
function renderMessage(msg) {
  const el = document.createElement('div');
  el.className = `chat-msg chat-msg-${msg.role}`;
  const bubble = document.createElement('div');
  bubble.className = 'chat-bubble';
  bubble.innerHTML = renderMarkdown(msg.content);
  el.appendChild(bubble);
  return el;
}

function renderMarkdown(text) {
  // 軽量マークダウン: コードブロック、インラインコード、太字、改行のみ
  const escape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const codeBlocks = [];
  let escaped = text.replace(/```([a-zA-Z]*)\n([\s\S]*?)```/g, (m, lang, code) => {
    codeBlocks.push(`<pre class="code-block"><code>${escape(code)}</code></pre>`);
    return `CB${codeBlocks.length - 1}`;
  });
  escaped = escape(escaped)
    .replace(/`([^`\n]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^\*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');
  escaped = escaped.replace(/CB(\d+)/g, (m, i) => codeBlocks[parseInt(i, 10)]);
  return escaped;
}

function renderAllMessages() {
  const list = document.getElementById('chat-messages');
  list.innerHTML = '';
  const settings = loadSettings();
  if (settings.messages.length === 0) {
    const hint = document.createElement('div');
    hint.className = 'chat-empty';
    hint.textContent = 'まずは何でも聞いてみてください。例: 「タプル内のリストが変更可能なのはなぜ？」';
    list.appendChild(hint);
    return;
  }
  settings.messages.forEach((m) => list.appendChild(renderMessage(m)));
  list.scrollTop = list.scrollHeight;
}

async function sendMessage(text) {
  const settings = loadSettings();
  if (!settings.apiKey) {
    alert('API キーが設定されていません。');
    showScreen('setup-screen');
    return;
  }

  settings.messages.push({ role: 'user', content: text });
  saveSettings(settings);
  renderAllMessages();

  // 仮のローディング表示
  const list = document.getElementById('chat-messages');
  const loader = document.createElement('div');
  loader.className = 'chat-msg chat-msg-assistant';
  loader.innerHTML = '<div class="chat-bubble chat-loading">考え中…</div>';
  list.appendChild(loader);
  list.scrollTop = list.scrollHeight;

  try {
    const reply = await callGemini(settings.messages, settings);
    list.removeChild(loader);
    settings.messages.push({ role: 'assistant', content: reply });
    saveSettings(settings);
    renderAllMessages();
  } catch (err) {
    list.removeChild(loader);
    const msg = `エラー: ${err.message}`;
    settings.messages.push({ role: 'assistant', content: msg });
    saveSettings(settings);
    renderAllMessages();
  }
}

// ========== イベント ==========
document.getElementById('setup-save-btn').addEventListener('click', () => {
  const apiKey = document.getElementById('api-key').value.trim();
  if (!apiKey) {
    alert('API キーを入力してください。');
    return;
  }
  const model = document.getElementById('model-select').value;
  const useContext = document.getElementById('use-context').checked;
  const cur = loadSettings();
  cur.apiKey = apiKey;
  cur.model = model;
  cur.useContext = useContext;
  saveSettings(cur);
  showScreen('chat-screen');
  renderAllMessages();
});

document.getElementById('chat-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  sendMessage(text);
});

document.getElementById('chat-input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    document.getElementById('chat-form').requestSubmit();
  }
});

document.getElementById('chat-clear-btn').addEventListener('click', () => {
  if (!confirm('会話履歴をすべて削除しますか？')) return;
  const s = loadSettings();
  s.messages = [];
  saveSettings(s);
  renderAllMessages();
});

document.getElementById('chat-settings-btn').addEventListener('click', () => {
  const s = loadSettings();
  document.getElementById('api-key').value = s.apiKey;
  document.getElementById('model-select').value = s.model;
  document.getElementById('use-context').checked = s.useContext;
  showScreen('setup-screen');
});

document.getElementById('chat-suggest-btn').addEventListener('click', () => {
  const suggestions = [
    'タプル内のリストが変更可能なのはなぜ？',
    'デフォルト引数のリストが共有される現象を、原理から教えて',
    'super().method() と ClassName.method(self) の違いは？',
    'pack と unpack を絶対に混同しない覚え方を教えて',
    '正規表現の \\b と \\B の違いを実例で',
    'メソッドの第1引数 self が必須な理由を、言語設計の観点から',
    'デコレータの仕組みを、関数を引数に取る関数として説明して',
  ];
  const pick = suggestions[Math.floor(Math.random() * suggestions.length)];
  document.getElementById('chat-input').value = pick;
  document.getElementById('chat-input').focus();
});

// ========== 起動 ==========
applyTheme(loadSharedStore().theme);
const initSettings = loadSettings();
if (initSettings.apiKey) {
  showScreen('chat-screen');
  renderAllMessages();
} else {
  showScreen('setup-screen');
}
