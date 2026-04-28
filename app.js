'use strict';

const STORAGE_KEY = 'python-pair-drill-v1';

const state = {
  questions: [],
  currentIndex: 0,
  selected: null,
  score: 0,
  streak: 0,
  bestStreak: 0,
  startTime: 0,
  wrongQuestions: [],
  config: { count: 10, category: 'all', weakMode: false },
};

// ====== ユーティリティ ======
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach((s) => {
    s.classList.remove('active');
    s.setAttribute('aria-hidden', 'true');
  });
  const el = document.getElementById(id);
  el.classList.add('active');
  el.setAttribute('aria-hidden', 'false');
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

// ====== 永続ストレージ ======
const storage = {
  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const data = raw ? JSON.parse(raw) : null;
      return Object.assign({ history: [], questionStats: {}, theme: null }, data || {});
    } catch {
      return { history: [], questionStats: {}, theme: null };
    }
  },
  save(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {}
  },
  recordResult(questionId, correct) {
    const data = storage.load();
    if (!data.questionStats[questionId]) {
      data.questionStats[questionId] = { correct: 0, total: 0, streak: 0, lastAt: 0 };
    }
    const s = data.questionStats[questionId];
    s.total += 1;
    s.lastAt = Date.now();
    if (correct) {
      s.correct += 1;
      s.streak = (s.streak || 0) + 1;
    } else {
      s.streak = 0;
    }
    storage.save(data);
  },
  recordAttempt(score, total, timeSec) {
    const data = storage.load();
    data.history.push({ score, total, timeSec, date: Date.now() });
    if (data.history.length > 100) data.history = data.history.slice(-100);
    storage.save(data);
  },
};

// ====== 賢い出題ロジック ======
//
// 設計方針:
//   1. 各問題に concept タグ（誤答癖7分類）と difficulty を付与（concepts.js）
//   2. ユーザー履歴から concept 別の正答率を集計して「弱点プロファイル」を作る
//   3. 各問題のスコア = 弱概念ボーナス + 個別エラー率 + 久しぶり度 + 未着手 - 連続正解
//   4. セッション最適化: 同 concept が連続しないよう並べ替え
//
// スコアリング重み（UIから編集可能）
const SCORING_DEFAULT = {
  weakConceptWeight: 2.0,    // 弱点 concept のエラー率ボーナス
  errorRateWeight:  1.5,     // 個別エラー率の重み
  unseenBonus:      0.6,     // 未着手問題のボーナス
  recencyMaxBonus:  0.5,     // 最終解答からの経過時間ボーナス上限
  recencySaturationHours: 24,// 経過時間が頭打ちになる時間
  streak3Penalty:   0.6,     // 3回連続正解
  streak5Penalty:   0.4,     // 5回連続正解（追加分）
  randomJitter:     0.3,     // 同スコアを散らすランダム
  oversamplingFactor: 2,     // 候補プールの倍率（最終的に count 個に絞る）
  conceptDataMin:   2,       // concept 統計の最低サンプル数
};

const SCORING_PRESETS = {
  balanced: {
    label: 'バランス（標準）',
    desc: '弱点と忘却曲線、未着手をまんべんなく',
    values: { ...SCORING_DEFAULT },
  },
  weakFocus: {
    label: '弱点集中',
    desc: '誤答が多い問題と弱い概念を最大限優先',
    values: {
      weakConceptWeight: 3.0, errorRateWeight: 2.5, unseenBonus: 0.3,
      recencyMaxBonus: 0.3, recencySaturationHours: 24,
      streak3Penalty: 0.8, streak5Penalty: 0.6, randomJitter: 0.2,
      oversamplingFactor: 2, conceptDataMin: 1,
    },
  },
  unseenFirst: {
    label: '未着手優先',
    desc: 'まだ解いていない問題から先に消化',
    values: {
      weakConceptWeight: 1.5, errorRateWeight: 1.0, unseenBonus: 1.5,
      recencyMaxBonus: 0.3, recencySaturationHours: 24,
      streak3Penalty: 0.5, streak5Penalty: 0.3, randomJitter: 0.3,
      oversamplingFactor: 2, conceptDataMin: 2,
    },
  },
  spacedRepetition: {
    label: '間隔反復',
    desc: '正解した問題も時間が経ったら再出題',
    values: {
      weakConceptWeight: 1.5, errorRateWeight: 1.0, unseenBonus: 0.5,
      recencyMaxBonus: 1.5, recencySaturationHours: 12,
      streak3Penalty: 0.3, streak5Penalty: 0.2, randomJitter: 0.3,
      oversamplingFactor: 2, conceptDataMin: 2,
    },
  },
  random: {
    label: 'ほぼランダム',
    desc: '統計の影響を最小化、新鮮さ優先',
    values: {
      weakConceptWeight: 0.3, errorRateWeight: 0.3, unseenBonus: 0.3,
      recencyMaxBonus: 0.2, recencySaturationHours: 24,
      streak3Penalty: 0.0, streak5Penalty: 0.0, randomJitter: 1.5,
      oversamplingFactor: 1, conceptDataMin: 5,
    },
  },
};

const SCORING_FIELDS = [
  { key: 'weakConceptWeight', label: '弱点 concept ボーナス', min: 0, max: 5, step: 0.1, hint: '苦手な concept を持つ問題を上位に' },
  { key: 'errorRateWeight',   label: '個別エラー率の重み',     min: 0, max: 5, step: 0.1, hint: '間違えた問題ほど出やすく' },
  { key: 'unseenBonus',       label: '未着手ボーナス',         min: 0, max: 3, step: 0.1, hint: '一度も解いていない問題を上位に' },
  { key: 'recencyMaxBonus',   label: '久しぶり度ボーナス',     min: 0, max: 3, step: 0.1, hint: '時間が経った問題ほど出やすく' },
  { key: 'recencySaturationHours', label: '頭打ち時間 (h)',    min: 1, max: 168, step: 1, hint: 'この時間で久しぶり度が最大に' },
  { key: 'streak3Penalty',    label: '3連正解ペナルティ',      min: 0, max: 2, step: 0.1, hint: '熟練問題の出題頻度を下げる' },
  { key: 'streak5Penalty',    label: '5連正解の追加ペナルティ', min: 0, max: 2, step: 0.1, hint: 'さらに下げる加算分' },
  { key: 'randomJitter',      label: 'ランダム性',             min: 0, max: 2, step: 0.1, hint: '同スコアの順序を散らす' },
  { key: 'oversamplingFactor',label: '候補プール倍率',         min: 1, max: 5, step: 1, hint: 'スコア上位 N×倍率 から最適化' },
  { key: 'conceptDataMin',    label: 'concept 統計最低件数',  min: 1, max: 10, step: 1, hint: 'これ未満のサンプル数の concept は無視' },
];

function loadScoring() {
  try {
    const raw = localStorage.getItem('python-pair-drill-scoring');
    if (!raw) return { ...SCORING_DEFAULT };
    const saved = JSON.parse(raw);
    return { ...SCORING_DEFAULT, ...saved };
  } catch {
    return { ...SCORING_DEFAULT };
  }
}
function saveScoring(values) {
  localStorage.setItem('python-pair-drill-scoring', JSON.stringify(values));
}

// 動的に変わる SCORING（後方互換のため変数名は維持）
let SCORING = loadScoring();

function computeConceptStats(questionStats) {
  const result = {};
  Object.keys(questionStats).forEach((qid) => {
    const meta = (typeof getMeta === 'function') ? getMeta(qid) : { concepts: [] };
    const s = questionStats[qid];
    meta.concepts.forEach((c) => {
      result[c] = result[c] || { correct: 0, total: 0 };
      result[c].correct += s.correct || 0;
      result[c].total += s.total || 0;
    });
  });
  return result;
}

function scorePool(pool, questionStats) {
  const conceptStats = computeConceptStats(questionStats);
  const now = Date.now();

  const scored = pool.map((q) => {
    const meta = (typeof getMeta === 'function') ? getMeta(q.id) : { difficulty: 'medium', concepts: [] };
    const s = questionStats[q.id] || { correct: 0, total: 0, streak: 0, lastAt: 0 };

    let score = 0;

    // 弱点概念ボーナス: その問題のタグの中で最も弱い concept のエラー率を採用
    let conceptBonus = 0;
    meta.concepts.forEach((c) => {
      const cs = conceptStats[c];
      if (cs && cs.total >= SCORING.conceptDataMin) {
        conceptBonus = Math.max(conceptBonus, 1 - cs.correct / cs.total);
      }
    });
    score += conceptBonus * SCORING.weakConceptWeight;

    // 個別の誤答率（未着手はボーナス）
    if (s.total > 0) {
      score += (1 - s.correct / s.total) * SCORING.errorRateWeight;
    } else {
      score += SCORING.unseenBonus;
    }

    // 久しぶり度
    if (s.lastAt > 0) {
      const hoursSince = (now - s.lastAt) / (1000 * 60 * 60);
      score += Math.min(hoursSince / SCORING.recencySaturationHours, 1.0) * SCORING.recencyMaxBonus;
    }

    // 連続正解ペナルティ
    const streak = s.streak || 0;
    if (streak >= 3) score -= SCORING.streak3Penalty;
    if (streak >= 5) score -= SCORING.streak5Penalty;

    // 同スコアを散らすランダム
    score += Math.random() * SCORING.randomJitter;

    return { q, score, meta };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored;
}

function optimizeSession(scored, count) {
  if (count <= 0 || count > scored.length) count = scored.length;
  const pool = scored.slice(0, count);
  const arranged = [];
  const EASY_LEAD = 3;  // 最初のN問を easy 優先で並べる

  // 各ステップで「直前と concept が被らない」「easyリード期は easy 優先」の二段階で選ぶ
  while (pool.length > 0) {
    const idx = arranged.length;
    const lastConcepts = idx > 0 ? new Set(arranged[idx - 1].meta.concepts) : new Set();
    const noOverlap = (item) =>
      item.meta.concepts.length === 0 || !item.meta.concepts.some((c) => lastConcepts.has(c));

    let pickIdx = -1;
    if (idx < EASY_LEAD) {
      // easy かつ concept 被らない → easy のみ → 被らないだけ → 何でもいい
      pickIdx = pool.findIndex((it) => it.meta.difficulty === 'easy' && noOverlap(it));
      if (pickIdx === -1) pickIdx = pool.findIndex((it) => it.meta.difficulty === 'easy');
    }
    if (pickIdx === -1) pickIdx = pool.findIndex(noOverlap);
    if (pickIdx === -1) pickIdx = 0;

    arranged.push(pool.splice(pickIdx, 1)[0]);
  }

  return arranged.map((item) => item.q);
}

// ====== データのエクスポート / インポート ======
const EXPORT_KEYS = {
  drillData: 'python-pair-drill-v1',
  examHistory: 'python-pair-drill-exam-history-v1',
  assistantData: 'python-pair-drill-assistant-v1',
};

function collectExportData(includeApiKey) {
  const data = { version: 1, exportedAt: new Date().toISOString() };
  for (const [field, key] of Object.entries(EXPORT_KEYS)) {
    const raw = localStorage.getItem(key);
    if (!raw) { data[field] = null; continue; }
    try {
      data[field] = JSON.parse(raw);
    } catch {
      data[field] = null;
    }
  }
  // AI会話履歴はデバイス間引き継ぎ対象外（文脈が切れて価値が薄い、容量も食う）
  if (data.assistantData) {
    data.assistantData = { ...data.assistantData, messages: [] };
  }
  if (!includeApiKey && data.assistantData && data.assistantData.apiKey) {
    data.assistantData = { ...data.assistantData, apiKey: '' };
  }
  return data;
}

function exportAllData(includeApiKey) {
  const data = collectExportData(includeApiKey);
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const stamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-');
  a.href = url;
  a.download = `python-pair-drill-${stamp}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function compressData(data) {
  if (typeof LZString === 'undefined') {
    throw new Error('LZ-string ライブラリが読み込めていません。');
  }
  return LZString.compressToEncodedURIComponent(JSON.stringify(data));
}

function decompressData(compressed) {
  if (typeof LZString === 'undefined') {
    throw new Error('LZ-string ライブラリが読み込めていません。');
  }
  const json = LZString.decompressFromEncodedURIComponent(compressed);
  if (!json) throw new Error('圧縮データを展開できませんでした。');
  return JSON.parse(json);
}

function applyImportData(data) {
  if (!data || typeof data !== 'object' || data.version !== 1) {
    alert('対応していないデータ形式です（version: 1 のみ対応）。');
    return false;
  }
  let count = 0;
  for (const [field, key] of Object.entries(EXPORT_KEYS)) {
    if (data[field] !== undefined && data[field] !== null) {
      localStorage.setItem(key, JSON.stringify(data[field]));
      count++;
    }
  }
  return count;
}

function exportAsQR(includeApiKey) {
  const data = collectExportData(includeApiKey);
  let compressed;
  try {
    compressed = compressData(data);
  } catch (e) {
    alert(e.message);
    return;
  }
  const baseUrl = location.origin + location.pathname;
  const url = `${baseUrl}?import=${compressed}`;

  if (typeof qrcode !== 'function') {
    alert('QRライブラリが読み込めていません。インターネット接続を確認してください。');
    return;
  }

  // 古いQRを消す
  const canvas = document.getElementById('qr-canvas');
  canvas.innerHTML = '';

  // qrcode-generator: typeNumber=0 で容量に応じて自動判定、L=容量優先
  let qr, version;
  try {
    qr = qrcode(0, 'L');
    qr.addData(url);
    qr.make();
    version = qr.getModuleCount();  // 1辺のセル数（バージョンの目安）
  } catch (e) {
    alert(`QRコード生成失敗: データが大きすぎます（${(url.length/1024).toFixed(1)} KB）。\n履歴を減らすか、テキスト書き出しをご利用ください。\n\n詳細: ${e.message}`);
    return;
  }

  // SVG で描画（拡大縮小しても綺麗）
  canvas.innerHTML = qr.createSvgTag({
    cellSize: 4,
    margin: 2,
    scalable: true,
  });

  // SVG を画面サイズに合わせる
  const svg = canvas.querySelector('svg');
  if (svg) {
    svg.style.width = '100%';
    svg.style.maxWidth = '320px';
    svg.style.height = 'auto';
  }

  const sizeKB = (url.length / 1024).toFixed(2);
  document.getElementById('qr-info').textContent =
    `データ: ${url.length}文字 / ${sizeKB} KB · QRバージョン: ${Math.round((version - 17) / 4)} (${version}×${version}セル)`;
  openModal('qr-modal');
}

function exportAsText(includeApiKey) {
  const data = collectExportData(includeApiKey);
  let compressed;
  try {
    compressed = compressData(data);
  } catch (e) {
    alert(e.message);
    return;
  }
  document.getElementById('text-export-area').value = compressed;
  document.getElementById('text-export-info').textContent =
    `${compressed.length.toLocaleString()} 文字 / 約 ${(compressed.length / 1024).toFixed(1)} KB`;
  openModal('text-modal');
}

function importFromText() {
  openModal('text-import-modal');
  document.getElementById('text-import-area').value = '';
  setTimeout(() => document.getElementById('text-import-area').focus(), 50);
}

function applyTextImport() {
  const text = document.getElementById('text-import-area').value.trim();
  if (!text) {
    alert('テキストが空です。');
    return;
  }
  let data;
  try {
    data = decompressData(text);
  } catch (e) {
    alert(`データの読み込みに失敗しました: ${e.message}`);
    return;
  }
  if (!confirm('現在のデータを上書きしてインポートします。よろしいですか？')) return;
  const count = applyImportData(data);
  if (count !== false) {
    alert(`${count}件のデータを読み込みました。ページを再読み込みします。`);
    location.reload();
  }
}

// URL ?import= を起動時に検出して自動復元
function checkUrlImport() {
  const params = new URLSearchParams(location.search);
  const compressed = params.get('import');
  if (!compressed) return;
  let data;
  try {
    data = decompressData(compressed);
  } catch (e) {
    console.error('Import from URL failed:', e);
    alert('URL のデータが破損しています。');
    history.replaceState({}, '', location.pathname);
    return;
  }
  if (confirm('URL に他端末のデータが含まれています。\n既存のデータを上書きしてインポートしますか？')) {
    const count = applyImportData(data);
    history.replaceState({}, '', location.pathname);
    if (count !== false) {
      alert(`${count}件のデータを読み込みました。ページを再読み込みします。`);
      location.reload();
    }
  } else {
    history.replaceState({}, '', location.pathname);
  }
}

// モーダル制御
function openModal(id) {
  const m = document.getElementById(id);
  m.hidden = false;
  m.setAttribute('aria-hidden', 'false');
}
function closeModal(id) {
  const m = document.getElementById(id);
  m.hidden = true;
  m.setAttribute('aria-hidden', 'true');
}
document.addEventListener('click', (e) => {
  const close = e.target.closest('[data-close]');
  if (close) {
    const modal = close.closest('.modal');
    if (modal) closeModal(modal.id);
  }
});

function importAllData(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    let data;
    try {
      data = JSON.parse(e.target.result);
    } catch {
      alert('JSONとして読み込めませんでした。ファイルが破損している可能性があります。');
      return;
    }
    if (!data || typeof data !== 'object' || data.version !== 1) {
      alert('対応していないデータ形式です（version: 1 のみ対応）。');
      return;
    }
    if (!confirm('現在のデータを上書きしてインポートします。よろしいですか？')) return;

    let count = 0;
    for (const [field, key] of Object.entries(EXPORT_KEYS)) {
      if (data[field] !== undefined && data[field] !== null) {
        localStorage.setItem(key, JSON.stringify(data[field]));
        count++;
      }
    }
    alert(`${count}件のデータを読み込みました。ページを再読み込みします。`);
    location.reload();
  };
  reader.onerror = () => alert('ファイル読み込みに失敗しました。');
  reader.readAsText(file);
}

function wipeAllData() {
  if (!confirm('すべてのドリル統計・模擬履歴・アシスタント設定（APIキー含む）を削除します。元に戻せません。')) return;
  if (!confirm('本当に削除しますか？')) return;
  Object.values(EXPORT_KEYS).forEach((key) => localStorage.removeItem(key));
  alert('すべて削除しました。ページを再読み込みします。');
  location.reload();
}

// 弱点プロファイル（ホーム画面で参照用）
function getWeakProfile(questionStats) {
  const cs = computeConceptStats(questionStats);
  return Object.keys(cs)
    .map((c) => ({
      concept: c,
      label: (typeof CONCEPT_LABELS !== 'undefined' && CONCEPT_LABELS[c]) || c,
      correct: cs[c].correct,
      total: cs[c].total,
      rate: cs[c].total > 0 ? cs[c].correct / cs[c].total : null,
    }))
    .filter((x) => x.total >= 2)
    .sort((a, b) => (a.rate || 1) - (b.rate || 1));
}

// ====== テーマ ======
function initTheme() {
  const data = storage.load();
  if (data.theme) {
    document.documentElement.setAttribute('data-theme', data.theme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
  updateThemeIcon();
}

function updateThemeIcon() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  document.getElementById('theme-toggle').textContent = isDark ? '☀️' : '🌙';
}

document.getElementById('theme-toggle').addEventListener('click', () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const next = isDark ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  const data = storage.load();
  data.theme = next;
  storage.save(data);
  updateThemeIcon();
});

// ====== ホーム画面 ======
function initHome() {
  const data = storage.load();

  document.getElementById('attempt-count').textContent = data.history.length;
  document.getElementById('total-questions').textContent = QUESTIONS.length;

  const best = data.history.reduce((max, h) => {
    const rate = h.total ? h.score / h.total : 0;
    return rate > max ? rate : max;
  }, 0);
  document.getElementById('best-score').textContent = data.history.length ? Math.round(best * 100) + '%' : '-';

  // カテゴリチップ
  const cats = ['all', ...Array.from(new Set(QUESTIONS.map((q) => q.category)))];
  const filterEl = document.getElementById('category-filter');
  filterEl.innerHTML = '';
  cats.forEach((cat) => {
    const btn = document.createElement('button');
    btn.textContent = cat === 'all' ? '全カテゴリ' : cat;
    btn.dataset.cat = cat;
    if (cat === state.config.category) btn.classList.add('active');
    btn.addEventListener('click', () => {
      filterEl.querySelectorAll('button').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      state.config.category = cat;
    });
    filterEl.appendChild(btn);
  });

  // 出題数
  document.querySelectorAll('#count-select button').forEach((b) => {
    b.classList.toggle('active', parseInt(b.dataset.count, 10) === state.config.count);
    b.onclick = () => {
      document.querySelectorAll('#count-select button').forEach((x) => x.classList.remove('active'));
      b.classList.add('active');
      state.config.count = parseInt(b.dataset.count, 10);
    };
  });

  document.getElementById('weak-mode').checked = state.config.weakMode;
  document.getElementById('weak-mode').onchange = (e) => {
    state.config.weakMode = e.target.checked;
  };

  // データ管理ボタン（毎回再バインドしないようガード）
  const bindOnce = (id, handler) => {
    const el = document.getElementById(id);
    if (el && !el.dataset.bound) {
      el.dataset.bound = '1';
      el.addEventListener('click', handler);
    }
  };
  const getInclude = () => document.getElementById('export-include-key').checked;

  bindOnce('export-btn', () => exportAllData(getInclude()));
  bindOnce('export-qr-btn', () => exportAsQR(getInclude()));
  bindOnce('export-text-btn', () => exportAsText(getInclude()));
  bindOnce('import-text-btn', importFromText);
  bindOnce('text-import-confirm-btn', applyTextImport);
  bindOnce('text-copy-btn', () => {
    const ta = document.getElementById('text-export-area');
    ta.select();
    try {
      navigator.clipboard.writeText(ta.value).then(
        () => { document.getElementById('text-export-info').textContent = 'コピーしました ✓'; },
        () => { document.execCommand('copy'); }
      );
    } catch {
      document.execCommand('copy');
    }
  });
  bindOnce('wipe-btn', wipeAllData);

  const importInput = document.getElementById('import-file');
  if (importInput && !importInput.dataset.bound) {
    importInput.dataset.bound = '1';
    importInput.addEventListener('change', (ev) => {
      if (ev.target.files && ev.target.files[0]) {
        importAllData(ev.target.files[0]);
      }
      ev.target.value = '';
    });
  }

  // 誤答癖プロファイル表示
  renderWeakProfile(data.questionStats);

  // スコアリング設定UI
  renderScoringUI();
}

function renderScoringUI() {
  // プリセット
  const presetEl = document.getElementById('scoring-preset-list');
  if (!presetEl) return;
  if (!presetEl.dataset.bound) {
    presetEl.dataset.bound = '1';
    presetEl.innerHTML = '';
    Object.entries(SCORING_PRESETS).forEach(([key, p]) => {
      const btn = document.createElement('button');
      btn.className = 'scoring-preset';
      btn.dataset.preset = key;
      btn.innerHTML = `
        <span class="scoring-preset-label"></span>
        <span class="scoring-preset-desc muted small"></span>
      `;
      btn.querySelector('.scoring-preset-label').textContent = p.label;
      btn.querySelector('.scoring-preset-desc').textContent = p.desc;
      btn.addEventListener('click', () => {
        SCORING = { ...SCORING_DEFAULT, ...p.values };
        saveScoring(SCORING);
        renderScoringFields();
        markActivePreset();
      });
      presetEl.appendChild(btn);
    });
    markActivePreset();
  }

  // 個別フィールド
  renderScoringFields();
  bindScoringResetOnce();
}

function renderScoringFields() {
  const fieldsEl = document.getElementById('scoring-fields');
  if (!fieldsEl) return;
  fieldsEl.innerHTML = '';
  SCORING_FIELDS.forEach((f) => {
    const row = document.createElement('div');
    row.className = 'scoring-field';
    const id = `scoring-${f.key}`;
    row.innerHTML = `
      <label for="${id}" class="scoring-field-label">
        <span class="scoring-field-name"></span>
        <span class="scoring-field-value" id="${id}-value"></span>
      </label>
      <input type="range" id="${id}" min="${f.min}" max="${f.max}" step="${f.step}" value="${SCORING[f.key]}" />
      <span class="scoring-field-hint muted small"></span>
    `;
    row.querySelector('.scoring-field-name').textContent = f.label;
    row.querySelector(`#${id}-value`).textContent = SCORING[f.key];
    row.querySelector('.scoring-field-hint').textContent = f.hint;
    const slider = row.querySelector(`#${id}`);
    slider.addEventListener('input', (ev) => {
      const v = parseFloat(ev.target.value);
      SCORING[f.key] = v;
      row.querySelector(`#${id}-value`).textContent = v;
      saveScoring(SCORING);
      markActivePreset();
    });
    fieldsEl.appendChild(row);
  });
}

function markActivePreset() {
  // 完全一致するプリセットがあればハイライト
  const presetEl = document.getElementById('scoring-preset-list');
  if (!presetEl) return;
  presetEl.querySelectorAll('.scoring-preset').forEach((btn) => {
    const key = btn.dataset.preset;
    const p = SCORING_PRESETS[key];
    const match = p && SCORING_FIELDS.every((f) => SCORING[f.key] === p.values[f.key]);
    btn.classList.toggle('active', !!match);
  });
}

function bindScoringResetOnce() {
  const btn = document.getElementById('scoring-reset-btn');
  if (btn && !btn.dataset.bound) {
    btn.dataset.bound = '1';
    btn.addEventListener('click', () => {
      SCORING = { ...SCORING_DEFAULT };
      saveScoring(SCORING);
      renderScoringFields();
      markActivePreset();
    });
  }
}

function renderWeakProfile(questionStats) {
  const wrap = document.getElementById('weak-profile');
  const list = document.getElementById('weak-profile-list');
  const profile = getWeakProfile(questionStats);
  if (profile.length === 0) {
    wrap.hidden = true;
    return;
  }
  wrap.hidden = false;
  list.innerHTML = '';
  profile.slice(0, 7).forEach((p) => {
    const row = document.createElement('div');
    row.className = 'weak-row';
    const rate = p.rate !== null ? Math.round(p.rate * 100) : '-';
    row.innerHTML = `
      <span class="weak-label"></span>
      <span class="weak-bar"><span class="weak-bar-fill" style="width:${p.rate * 100}%"></span></span>
      <span class="weak-rate">${p.correct}/${p.total} (${rate}%)</span>
    `;
    row.querySelector('.weak-label').textContent = p.label;
    list.appendChild(row);
  });
}

// ====== クイズ開始 ======
function startQuiz(overridePool) {
  let pool;
  if (overridePool) {
    pool = overridePool;
  } else {
    pool = QUESTIONS.filter((q) => state.config.category === 'all' || q.category === state.config.category);

    if (state.config.weakMode) {
      const data = storage.load();
      const scored = scorePool(pool, data.questionStats);
      const want = state.config.count > 0 ? state.config.count : scored.length;
      const candidates = Math.min(want * SCORING.oversamplingFactor, scored.length);
      pool = optimizeSession(scored.slice(0, candidates), want);
    } else {
      pool = shuffle(pool);
      if (state.config.count > 0) pool = pool.slice(0, state.config.count);
    }
  }

  // 問題ごとに選択肢をシャッフル
  state.questions = pool.map((q) => {
    const indexed = q.choices.map((text, i) => ({ text, isCorrect: i === q.correct }));
    const shuffled = shuffle(indexed);
    return Object.assign({}, q, {
      _shuffledChoices: shuffled.map((c) => c.text),
      _newCorrect: shuffled.findIndex((c) => c.isCorrect),
    });
  });
  state.currentIndex = 0;
  state.selected = null;
  state.score = 0;
  state.streak = 0;
  state.bestStreak = 0;
  state.startTime = Date.now();
  state.wrongQuestions = [];

  showScreen('quiz-screen');
  renderQuestion();
}

// ====== 問題描画 ======
function renderQuestion() {
  const q = state.questions[state.currentIndex];
  state.selected = null;

  document.getElementById('quiz-progress').textContent = `${state.currentIndex + 1}/${state.questions.length}`;
  document.getElementById('quiz-score').textContent = state.score;
  document.getElementById('quiz-streak').textContent = state.streak;
  document.getElementById('progress-fill').style.width =
    (state.currentIndex / state.questions.length) * 100 + '%';
  document.getElementById('quiz-category').textContent = q.category;
  document.getElementById('question-text').textContent = q.question;

  const choicesEl = document.getElementById('choices');
  choicesEl.innerHTML = '';
  const labels = ['A', 'B', 'C', 'D'];
  q._shuffledChoices.forEach((text, i) => {
    const btn = document.createElement('button');
    btn.className = 'choice';
    btn.type = 'button';
    btn.dataset.index = i;

    const marker = document.createElement('span');
    marker.className = 'marker';
    marker.textContent = labels[i] || String(i + 1);
    btn.appendChild(marker);

    const tx = document.createElement('span');
    tx.className = 'text';
    tx.textContent = text;
    btn.appendChild(tx);

    btn.addEventListener('click', () => selectChoice(i));
    choicesEl.appendChild(btn);
  });

  document.getElementById('feedback').hidden = true;
}

function selectChoice(index) {
  if (state.selected !== null) return;
  state.selected = index;

  const q = state.questions[state.currentIndex];
  const isCorrect = index === q._newCorrect;

  document.querySelectorAll('.choice').forEach((b, i) => {
    b.disabled = true;
    if (i === q._newCorrect) b.classList.add('correct');
    else if (i === index) b.classList.add('wrong');
  });

  if (isCorrect) {
    state.score += 1;
    state.streak += 1;
    if (state.streak > state.bestStreak) state.bestStreak = state.streak;
  } else {
    state.streak = 0;
    state.wrongQuestions.push(Object.assign({}, q, { _selectedText: q._shuffledChoices[index] }));
  }
  storage.recordResult(q.id, isCorrect);

  document.getElementById('quiz-score').textContent = state.score;
  document.getElementById('quiz-streak').textContent = state.streak;
  document.getElementById('progress-fill').style.width =
    ((state.currentIndex + 1) / state.questions.length) * 100 + '%';

  const fb = document.getElementById('feedback');
  fb.hidden = false;
  const resultEl = document.getElementById('feedback-result');
  resultEl.textContent = isCorrect ? '✓ 正解' : '✗ 不正解';
  resultEl.className = 'feedback-result ' + (isCorrect ? 'correct' : 'wrong');
  document.getElementById('feedback-explanation').textContent = q.explanation;

  document.getElementById('next-btn').textContent =
    state.currentIndex < state.questions.length - 1 ? '次へ' : '結果を見る';
}

document.getElementById('next-btn').addEventListener('click', () => {
  state.currentIndex += 1;
  if (state.currentIndex >= state.questions.length) {
    showResult();
  } else {
    renderQuestion();
  }
});

document.getElementById('quit-btn').addEventListener('click', () => {
  if (confirm('クイズを中断してホームに戻りますか？')) {
    showScreen('home-screen');
    initHome();
  }
});

// キーボードショートカット (1-4 / A-D で選択肢、Enter で次へ)
document.addEventListener('keydown', (e) => {
  if (!document.getElementById('quiz-screen').classList.contains('active')) return;

  if (state.selected === null) {
    let idx = -1;
    if (e.key >= '1' && e.key <= '4') idx = parseInt(e.key, 10) - 1;
    else if (['a', 'b', 'c', 'd'].includes(e.key.toLowerCase()))
      idx = e.key.toLowerCase().charCodeAt(0) - 97;
    if (idx >= 0 && idx < state.questions[state.currentIndex]._shuffledChoices.length) {
      e.preventDefault();
      selectChoice(idx);
    }
  } else if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    document.getElementById('next-btn').click();
  }
});

// ====== 結果画面 ======
function showResult() {
  const total = state.questions.length;
  const timeSec = Math.round((Date.now() - state.startTime) / 1000);
  storage.recordAttempt(state.score, total, timeSec);

  const rate = total ? Math.round((state.score / total) * 100) : 0;
  document.getElementById('big-score').textContent = `${state.score}/${total}`;
  document.getElementById('score-rate').textContent = `${rate}%${rate >= 70 ? ' 🎉' : ''}`;
  document.getElementById('result-correct').textContent = state.score;
  document.getElementById('result-wrong').textContent = total - state.score;
  document.getElementById('result-best-streak').textContent = state.bestStreak;
  document.getElementById('result-time').textContent = formatTime(timeSec);

  const titleEl = document.getElementById('result-title');
  if (rate === 100) titleEl.textContent = '完璧！';
  else if (rate >= 90) titleEl.textContent = 'もう少しで満点';
  else if (rate >= 70) titleEl.textContent = '合格圏内';
  else if (rate >= 50) titleEl.textContent = 'もう一歩';
  else titleEl.textContent = '繰り返し練習しよう';

  const wrongList = document.getElementById('wrong-list');
  const wrongSection = document.getElementById('wrong-section');
  wrongList.innerHTML = '';
  if (state.wrongQuestions.length === 0) {
    wrongSection.classList.remove('empty');
    const msg = document.createElement('div');
    msg.className = 'empty-msg';
    msg.textContent = '間違いなし！素晴らしい';
    wrongList.appendChild(msg);
    document.getElementById('retry-wrong-btn').style.display = 'none';
  } else {
    wrongSection.classList.remove('empty');
    state.wrongQuestions.forEach((q) => {
      const div = document.createElement('div');
      div.className = 'wrong-item';

      const qDiv = document.createElement('div');
      qDiv.className = 'q';
      qDiv.textContent = q.question;
      div.appendChild(qDiv);

      const aw = document.createElement('div');
      aw.className = 'a-wrong';
      aw.textContent = '✗ ' + q._selectedText;
      div.appendChild(aw);

      const ac = document.createElement('div');
      ac.className = 'a-correct';
      ac.textContent = '✓ ' + q._shuffledChoices[q._newCorrect];
      div.appendChild(ac);

      const exp = document.createElement('div');
      exp.className = 'exp';
      exp.textContent = q.explanation;
      div.appendChild(exp);

      wrongList.appendChild(div);
    });
    document.getElementById('retry-wrong-btn').style.display = '';
  }

  showScreen('result-screen');
}

document.getElementById('retry-wrong-btn').addEventListener('click', () => {
  if (state.wrongQuestions.length === 0) return;
  const ids = new Set(state.wrongQuestions.map((q) => q.id));
  const subset = QUESTIONS.filter((q) => ids.has(q.id));
  startQuiz(shuffle(subset));
});

document.getElementById('retry-all-btn').addEventListener('click', () => startQuiz());

document.getElementById('home-btn').addEventListener('click', () => {
  showScreen('home-screen');
  initHome();
});

// ====== 統計画面 ======
function showStats() {
  const data = storage.load();

  document.getElementById('total-attempts').textContent = data.history.length;

  let totalCorrect = 0;
  let totalSeen = 0;
  Object.values(data.questionStats).forEach((s) => {
    totalCorrect += s.correct;
    totalSeen += s.total;
  });
  document.getElementById('overall-rate').textContent = totalSeen
    ? Math.round((totalCorrect / totalSeen) * 100) + '%'
    : '-';

  const recent = data.history.slice(-5);
  if (recent.length > 0) {
    const recentRate =
      recent.reduce((sum, h) => sum + (h.total ? h.score / h.total : 0), 0) / recent.length;
    document.getElementById('recent-rate').textContent = Math.round(recentRate * 100) + '%';
  } else {
    document.getElementById('recent-rate').textContent = '-';
  }

  // 問題別正答率
  const list = QUESTIONS.map((q) => {
    const s = data.questionStats[q.id];
    const total = s ? s.total : 0;
    const rate = total > 0 ? s.correct / total : null;
    return { q, rate, total };
  })
    .filter((x) => x.total > 0)
    .sort((a, b) => (a.rate ?? 1) - (b.rate ?? 1));

  const statsEl = document.getElementById('question-stats');
  statsEl.innerHTML = '';
  if (list.length === 0) {
    const p = document.createElement('p');
    p.className = 'empty-state';
    p.textContent = 'まだ統計がありません';
    statsEl.appendChild(p);
  } else {
    list.forEach(({ q, rate, total }) => {
      const div = document.createElement('div');
      div.className = 'qstat';
      const rateClass = rate < 0.5 ? 'low' : rate < 0.8 ? 'mid' : 'high';

      const tx = document.createElement('span');
      tx.className = 'qstat-text';
      tx.textContent = q.question;
      tx.title = q.question;
      div.appendChild(tx);

      const r = document.createElement('span');
      r.className = `qstat-rate ${rateClass}`;
      r.textContent = `${Math.round(rate * 100)}% (${total}回)`;
      div.appendChild(r);

      statsEl.appendChild(div);
    });
  }

  // 履歴
  const histEl = document.getElementById('history-list');
  histEl.innerHTML = '';
  const recentHistory = data.history.slice().reverse().slice(0, 10);
  if (recentHistory.length === 0) {
    const p = document.createElement('p');
    p.className = 'empty-state';
    p.textContent = '挑戦履歴はまだありません';
    histEl.appendChild(p);
  } else {
    recentHistory.forEach((h) => {
      const div = document.createElement('div');
      div.className = 'history-item';
      const d = new Date(h.date);
      const ds = `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
      const dateSpan = document.createElement('span');
      dateSpan.className = 'date';
      dateSpan.textContent = `${ds} · ${formatTime(h.timeSec)}`;
      div.appendChild(dateSpan);
      const scoreSpan = document.createElement('span');
      scoreSpan.className = 'score';
      const rate = h.total ? Math.round((h.score / h.total) * 100) : 0;
      scoreSpan.textContent = `${h.score}/${h.total} (${rate}%)`;
      div.appendChild(scoreSpan);
      histEl.appendChild(div);
    });
  }

  showScreen('stats-screen');
}

document.getElementById('stats-btn').addEventListener('click', showStats);

document.getElementById('reset-stats-btn').addEventListener('click', () => {
  if (!confirm('統計データをすべて削除します。よろしいですか？')) return;
  const data = storage.load();
  data.history = [];
  data.questionStats = {};
  storage.save(data);
  showStats();
});

document.getElementById('stats-back-btn').addEventListener('click', () => {
  showScreen('home-screen');
  initHome();
});

document.getElementById('start-btn').addEventListener('click', () => startQuiz());

// ====== 起動 ======
initTheme();
initHome();
checkUrlImport();  // URL ?import= があれば自動復元
