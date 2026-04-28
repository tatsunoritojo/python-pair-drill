// 模擬試験ロジック
'use strict';

const EXAMS = [
  { id: 'mock-exam-1', file: 'mock-exams/mock-exam-1.json' },
  { id: 'mock-exam-2', file: 'mock-exams/mock-exam-2.json' },
  { id: 'mock-exam-3', file: 'mock-exams/mock-exam-3.json' },
  { id: 'mock-exam-4', file: 'mock-exams/mock-exam-4.json' },
];

const PASS_RATE = 0.7;
const STORAGE_KEY = 'python-pair-drill-v1';
const EXAM_HISTORY_KEY = 'python-pair-drill-exam-history-v1';

const state = {
  selectedExam: null,
  exam: null,            // ロード済み試験データ
  questions: [],         // 出題順に並べた問題
  answers: [],           // インデックスごとの選択番号 (-1 = 未回答)
  flags: [],             // 後で見直すフラグ
  current: 0,
  startTime: 0,
  timeLimit: 40 * 60,    // 秒
  timerId: null,
  endTime: 0,
};

// ---------- 永続化（ドリルと共有） ----------
function loadStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return Object.assign({ history: [], questionStats: {}, theme: null }, raw ? JSON.parse(raw) : {});
  } catch {
    return { history: [], questionStats: {}, theme: null };
  }
}
function saveStore(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
function loadExamHistory() {
  try {
    const raw = localStorage.getItem(EXAM_HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function saveExamHistory(history) {
  localStorage.setItem(EXAM_HISTORY_KEY, JSON.stringify(history));
}

// ---------- テーマ（既存ドリルと統一: data-theme="dark"） ----------
function applyTheme(stored) {
  const dark = stored === 'dark' || (stored === null && matchMedia('(prefers-color-scheme: dark)').matches);
  if (dark) document.documentElement.setAttribute('data-theme', 'dark');
  else document.documentElement.removeAttribute('data-theme');
  document.getElementById('theme-toggle').textContent = dark ? '☀️' : '🌙';
}
document.getElementById('theme-toggle').addEventListener('click', () => {
  const data = loadStore();
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const next = isDark ? 'light' : 'dark';
  data.theme = next;
  saveStore(data);
  applyTheme(next);
});

// ---------- 画面切り替え ----------
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('active');
    s.setAttribute('aria-hidden', 'true');
  });
  const el = document.getElementById(id);
  el.classList.add('active');
  el.setAttribute('aria-hidden', 'false');
  window.scrollTo(0, 0);
}

// ---------- ホーム ----------
function renderExamList() {
  const el = document.getElementById('exam-list');
  el.innerHTML = '';
  EXAMS.forEach((e) => {
    const btn = document.createElement('button');
    btn.className = 'exam-card';
    btn.dataset.id = e.id;
    btn.innerHTML = `<span class="exam-id">${e.id}</span><span class="exam-loading">読み込み中…</span>`;
    btn.addEventListener('click', () => selectExam(e.id));
    el.appendChild(btn);
  });
  // メタ情報を非同期で
  EXAMS.forEach((e) => {
    fetch(e.file).then(r => r.json()).then(data => {
      const btn = el.querySelector(`[data-id="${e.id}"]`);
      const total = data.questions.length;
      btn.innerHTML = `
        <span class="exam-title">${data.title}</span>
        <span class="exam-meta">${total}問</span>
      `;
    }).catch(err => {
      const btn = el.querySelector(`[data-id="${e.id}"]`);
      btn.innerHTML = `<span class="exam-title">${e.id}</span><span class="exam-error">読み込み失敗</span>`;
      console.error(err);
    });
  });
}

function selectExam(id) {
  state.selectedExam = id;
  document.querySelectorAll('#exam-list .exam-card').forEach(b => {
    b.classList.toggle('selected', b.dataset.id === id);
  });
  document.getElementById('exam-start-btn').disabled = false;
}

// セグメント選択UI
function setupSegment(containerId, onChange) {
  const c = document.getElementById(containerId);
  c.addEventListener('click', (ev) => {
    const btn = ev.target.closest('button');
    if (!btn) return;
    c.querySelectorAll('button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    onChange && onChange(btn.dataset);
  });
}
setupSegment('time-select', (d) => { state.timeLimit = parseInt(d.time, 10) * 60; });
setupSegment('order-select');

// ---------- 試験開始 ----------
async function startExam() {
  const examMeta = EXAMS.find(e => e.id === state.selectedExam);
  if (!examMeta) return;

  try {
    const data = await fetch(examMeta.file).then(r => r.json());
    state.exam = data;
  } catch (e) {
    alert('試験データの読み込みに失敗しました。');
    return;
  }

  let qs = state.exam.questions.slice();
  const orderBtn = document.querySelector('#order-select button.active');
  if (orderBtn && orderBtn.dataset.order === 'shuffle') {
    // Fisher-Yates シャッフル（sort()ベースは偏りが出るため使わない）
    for (let i = qs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [qs[i], qs[j]] = [qs[j], qs[i]];
    }
  }

  state.questions = qs;
  state.answers = new Array(qs.length).fill(-1);
  state.flags = new Array(qs.length).fill(false);
  state.current = 0;
  state.startTime = Date.now();
  state.endTime = state.timeLimit > 0 ? state.startTime + state.timeLimit * 1000 : 0;

  showScreen('exam-quiz-screen');
  renderQuestion();
  renderOverview();
  startTimer();
}

document.getElementById('exam-start-btn').addEventListener('click', startExam);

// ---------- 問題表示 ----------
function renderQuestion() {
  const q = state.questions[state.current];
  if (!q) return;

  document.getElementById('exam-domain').textContent = q.domain || '';
  document.getElementById('exam-question').textContent = q.question;

  const codeEl = document.getElementById('exam-code');
  if (q.code) {
    codeEl.textContent = q.code;
    codeEl.hidden = false;
  } else {
    codeEl.hidden = true;
  }

  const cs = document.getElementById('exam-choices');
  cs.innerHTML = '';
  const labels = ['A', 'B', 'C', 'D', 'E', 'F'];
  q.choices.forEach((text, i) => {
    const choice = document.createElement('button');
    choice.className = 'choice';
    const isSelected = state.answers[state.current] === i;
    if (isSelected) choice.classList.add('selected');
    choice.setAttribute('aria-pressed', String(isSelected));
    choice.innerHTML = `<span class="choice-marker">${labels[i] || (i+1)}</span><span class="choice-text"></span>`;
    choice.querySelector('.choice-text').textContent = text;
    choice.addEventListener('click', () => {
      state.answers[state.current] = i;
      renderQuestion();
      renderOverview();
    });
    cs.appendChild(choice);
  });

  // メタ
  document.getElementById('exam-progress').textContent = `${state.current + 1}/${state.questions.length}`;
  document.getElementById('exam-progress-fill').style.width =
    (state.current / state.questions.length) * 100 + '%';
  document.getElementById('exam-answered').textContent = state.answers.filter(a => a >= 0).length;

  // フラグボタンの状態
  const flagBtn = document.getElementById('exam-flag-btn');
  flagBtn.setAttribute('aria-pressed', String(state.flags[state.current]));
  flagBtn.classList.toggle('active', state.flags[state.current]);

  // ナビボタン
  document.getElementById('exam-prev-btn').disabled = state.current === 0;
  const nextBtn = document.getElementById('exam-next-btn');
  nextBtn.textContent = state.current === state.questions.length - 1 ? '最後 →' : '次へ →';
}

document.getElementById('exam-prev-btn').addEventListener('click', () => {
  if (state.current > 0) { state.current--; renderQuestion(); renderOverview(); }
});
document.getElementById('exam-next-btn').addEventListener('click', () => {
  if (state.current < state.questions.length - 1) {
    state.current++; renderQuestion(); renderOverview();
  }
});
document.getElementById('exam-flag-btn').addEventListener('click', () => {
  state.flags[state.current] = !state.flags[state.current];
  renderQuestion();
  renderOverview();
});

// ---------- 全問題のグリッド ----------
function renderOverview() {
  const grid = document.getElementById('exam-grid');
  grid.innerHTML = '';
  state.questions.forEach((q, i) => {
    const cell = document.createElement('button');
    cell.className = 'exam-cell';
    if (i === state.current) cell.classList.add('current');
    if (state.answers[i] >= 0) cell.classList.add('answered');
    if (state.flags[i]) cell.classList.add('flagged');
    cell.textContent = String(i + 1);
    cell.addEventListener('click', () => {
      state.current = i;
      renderQuestion();
      renderOverview();
    });
    grid.appendChild(cell);
  });
}

// ---------- タイマー ----------
function startTimer() {
  clearInterval(state.timerId);
  state.timerId = setInterval(updateTimer, 1000);
  updateTimer();
}
function updateTimer() {
  const el = document.getElementById('exam-timer');
  if (state.timeLimit === 0) {
    const elapsed = Math.floor((Date.now() - state.startTime) / 1000);
    el.textContent = formatSec(elapsed);
    el.classList.remove('danger');
    return;
  }
  const remaining = Math.max(0, Math.floor((state.endTime - Date.now()) / 1000));
  el.textContent = formatSec(remaining);
  el.classList.toggle('danger', remaining <= 300);
  if (remaining <= 0) {
    clearInterval(state.timerId);
    setTimeout(() => alert('制限時間を超えました。採点します。'), 0);
    finishExam(true);
  }
}
function formatSec(s) {
  const m = Math.floor(s / 60), ss = s % 60;
  return `${m}:${String(ss).padStart(2, '0')}`;
}

// ---------- 終了 ----------
document.getElementById('exam-finish-btn').addEventListener('click', () => {
  const unanswered = state.answers.filter(a => a < 0).length;
  if (unanswered > 0) {
    if (!confirm(`未回答が${unanswered}問あります。採点しますか？`)) return;
  }
  finishExam(false);
});
document.getElementById('exam-quit-btn').addEventListener('click', () => {
  if (confirm('試験を中断してホームに戻りますか？採点は行われません。')) {
    clearInterval(state.timerId);
    showScreen('exam-home-screen');
  }
});

function finishExam(timeout) {
  clearInterval(state.timerId);
  const elapsed = Math.floor((Date.now() - state.startTime) / 1000);

  let correct = 0, wrong = 0, unanswered = 0;
  const domainStats = {};
  state.questions.forEach((q, i) => {
    const a = state.answers[i];
    const d = q.domain || '未分類';
    domainStats[d] = domainStats[d] || { correct: 0, total: 0 };
    domainStats[d].total++;
    if (a < 0) {
      unanswered++;
    } else if (a === q.correct_index) {
      correct++;
      domainStats[d].correct++;
    } else {
      wrong++;
    }
  });

  // 模擬試験履歴は専用キーに保存（ドリル統計と分離）
  const examHistory = loadExamHistory();
  examHistory.push({
    examId: state.exam.id,
    examTitle: state.exam.title,
    correct, wrong, unanswered,
    total: state.questions.length,
    elapsed,
    timeout,
    timestamp: Date.now(),
  });
  if (examHistory.length > 50) examHistory.shift();
  saveExamHistory(examHistory);

  renderResult({ correct, wrong, unanswered, elapsed, domainStats, timeout });
  showScreen('exam-result-screen');
}

// ---------- 結果 ----------
function renderResult({ correct, wrong, unanswered, elapsed, domainStats, timeout }) {
  const total = state.questions.length;
  const rate = correct / total;

  document.getElementById('exam-result-title').textContent = `${state.exam.title} の採点結果`;
  document.getElementById('exam-big-score').textContent = `${correct}/${total}`;
  document.getElementById('exam-score-rate').textContent = `${Math.round(rate * 100)}%`;
  document.getElementById('exam-correct').textContent = correct;
  document.getElementById('exam-wrong').textContent = wrong;
  document.getElementById('exam-unanswered').textContent = unanswered;
  document.getElementById('exam-elapsed').textContent = formatSec(elapsed);

  const verdict = document.getElementById('exam-verdict');
  if (rate >= PASS_RATE) {
    verdict.textContent = `合格ライン70%突破！${timeout ? '（時間切れだが）' : ''}`;
    verdict.className = 'exam-verdict pass';
  } else {
    const gap = Math.ceil(PASS_RATE * total) - correct;
    verdict.textContent = `合格まであと${gap}問${timeout ? '（時間切れ）' : ''}`;
    verdict.className = 'exam-verdict fail';
  }

  // ドメイン別
  const dEl = document.getElementById('exam-domain-stats');
  dEl.innerHTML = '';
  Object.entries(domainStats)
    .sort((a, b) => (a[1].correct / a[1].total) - (b[1].correct / b[1].total))
    .forEach(([dom, s]) => {
      const r = s.correct / s.total;
      const row = document.createElement('div');
      row.className = 'domain-row';
      row.innerHTML = `
        <span class="domain-name"></span>
        <span class="domain-bar"><span class="domain-bar-fill" style="width:${r * 100}%"></span></span>
        <span class="domain-rate">${s.correct}/${s.total} (${Math.round(r*100)}%)</span>
      `;
      row.querySelector('.domain-name').textContent = dom;
      dEl.appendChild(row);
    });

  // 問題ごとの結果
  const rEl = document.getElementById('exam-review-list');
  rEl.innerHTML = '';
  state.questions.forEach((q, i) => {
    const a = state.answers[i];
    const isCorrect = a === q.correct_index;
    const isUnanswered = a < 0;
    const card = document.createElement('details');
    card.className = 'review-card ' + (isCorrect ? 'ok' : isUnanswered ? 'skip' : 'ng');
    const summary = document.createElement('summary');
    summary.innerHTML = `
      <span class="review-num">Q${i + 1}</span>
      <span class="review-status">${isCorrect ? '✓' : isUnanswered ? '–' : '✗'}</span>
      <span class="review-domain"></span>
    `;
    summary.querySelector('.review-domain').textContent = q.domain || '';
    card.appendChild(summary);

    const body = document.createElement('div');
    body.className = 'review-body';

    const qtxt = document.createElement('div');
    qtxt.className = 'review-q';
    qtxt.textContent = q.question;
    body.appendChild(qtxt);

    if (q.code) {
      const code = document.createElement('pre');
      code.className = 'code-block';
      code.textContent = q.code;
      body.appendChild(code);
    }

    q.choices.forEach((c, j) => {
      const ch = document.createElement('div');
      ch.className = 'review-choice';
      if (j === q.correct_index) ch.classList.add('correct');
      if (j === a && !isCorrect) ch.classList.add('your-wrong');
      if (j === a && isCorrect) ch.classList.add('your-correct');
      const marker = (j === q.correct_index) ? '◉' : (j === a ? '×' : '○');
      ch.innerHTML = `<span class="rc-marker">${marker}</span><span class="rc-text"></span>`;
      ch.querySelector('.rc-text').textContent = c;
      body.appendChild(ch);
    });

    if (q.explanation) {
      const ex = document.createElement('div');
      ex.className = 'review-explanation';
      ex.textContent = q.explanation;
      body.appendChild(ex);
    }

    card.appendChild(body);
    rEl.appendChild(card);
  });
}

document.getElementById('exam-retry-btn').addEventListener('click', () => {
  startExam();
});
document.getElementById('exam-retry-wrong-btn').addEventListener('click', () => {
  const wrongQs = state.questions.filter((q, i) => state.answers[i] !== q.correct_index);
  if (!wrongQs.length) {
    alert('間違えた問題はありません！');
    return;
  }
  state.questions = wrongQs;
  state.answers = new Array(wrongQs.length).fill(-1);
  state.flags = new Array(wrongQs.length).fill(false);
  state.current = 0;
  state.startTime = Date.now();
  state.endTime = state.timeLimit > 0 ? state.startTime + state.timeLimit * 1000 : 0;
  showScreen('exam-quiz-screen');
  renderQuestion();
  renderOverview();
  startTimer();
});

// ---------- 統計画面 ----------
function renderStats() {
  const history = loadExamHistory();
  document.getElementById('exam-stats-total').textContent = history.length;

  if (history.length === 0) {
    document.getElementById('exam-stats-best').textContent = '-';
    document.getElementById('exam-stats-recent').textContent = '-';
    document.getElementById('exam-stats-by-exam').innerHTML = '<p class="muted">まだ挑戦履歴がありません。</p>';
    document.getElementById('exam-stats-history').innerHTML = '';
    return;
  }

  // 最高点
  const best = history.reduce((m, h) => Math.max(m, h.correct / h.total), 0);
  document.getElementById('exam-stats-best').textContent = `${Math.round(best * 100)}%`;

  // 直近5回平均
  const recent = history.slice(-5);
  const recentAvg = recent.reduce((s, h) => s + h.correct / h.total, 0) / recent.length;
  document.getElementById('exam-stats-recent').textContent = `${Math.round(recentAvg * 100)}%`;

  // 模擬別の最高点
  const byExam = {};
  history.forEach((h) => {
    const cur = byExam[h.examId];
    const rate = h.correct / h.total;
    if (!cur || rate > cur.rate) {
      byExam[h.examId] = { rate, title: h.examTitle, correct: h.correct, total: h.total, at: h.timestamp };
    }
  });
  const byExamEl = document.getElementById('exam-stats-by-exam');
  byExamEl.innerHTML = '';
  Object.values(byExam)
    .sort((a, b) => b.rate - a.rate)
    .forEach((b) => {
      const row = document.createElement('div');
      row.className = 'stats-row';
      row.innerHTML = `
        <span class="stats-row-title"></span>
        <span class="stats-row-meta">${b.correct}/${b.total} (${Math.round(b.rate * 100)}%)</span>
      `;
      row.querySelector('.stats-row-title').textContent = b.title;
      byExamEl.appendChild(row);
    });

  // 直近20件履歴
  const histEl = document.getElementById('exam-stats-history');
  histEl.innerHTML = '';
  history.slice().reverse().slice(0, 20).forEach((h) => {
    const date = new Date(h.timestamp);
    const ymd = `${date.getMonth()+1}/${date.getDate()} ${String(date.getHours()).padStart(2,'0')}:${String(date.getMinutes()).padStart(2,'0')}`;
    const rate = Math.round((h.correct / h.total) * 100);
    const passed = rate >= 70;
    const row = document.createElement('div');
    row.className = 'history-row ' + (passed ? 'pass' : 'fail');
    row.innerHTML = `
      <span class="history-time">${ymd}</span>
      <span class="history-title"></span>
      <span class="history-score">${h.correct}/${h.total} <strong>${rate}%</strong></span>
      <span class="history-time2">${formatSec(h.elapsed)}${h.timeout ? ' ⏱' : ''}</span>
    `;
    row.querySelector('.history-title').textContent = h.examTitle;
    histEl.appendChild(row);
  });
}

document.getElementById('exam-stats-btn').addEventListener('click', () => {
  renderStats();
  showScreen('exam-stats-screen');
});
document.getElementById('exam-stats-back-btn').addEventListener('click', () => {
  showScreen('exam-home-screen');
});
document.getElementById('exam-stats-reset-btn').addEventListener('click', () => {
  if (confirm('模擬試験の履歴をすべて削除します。よろしいですか？')) {
    saveExamHistory([]);
    renderStats();
  }
});

// ---------- キーボードショートカット ----------
// 1〜9 / A〜F で選択肢、← → でナビ、Enter で次へ
document.addEventListener('keydown', (e) => {
  if (!document.getElementById('exam-quiz-screen').classList.contains('active')) return;
  if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;

  const q = state.questions[state.current];
  if (!q) return;

  // 数字またはアルファベットで選択肢
  let idx = -1;
  if (e.key >= '1' && e.key <= '9') idx = parseInt(e.key, 10) - 1;
  else if (/^[a-fA-F]$/.test(e.key)) idx = e.key.toLowerCase().charCodeAt(0) - 97;

  if (idx >= 0 && idx < q.choices.length) {
    e.preventDefault();
    state.answers[state.current] = idx;
    renderQuestion();
    renderOverview();
    return;
  }

  // 矢印キーまたは Enter で前後ナビ
  if (e.key === 'Enter' || e.key === 'ArrowRight') {
    e.preventDefault();
    document.getElementById('exam-next-btn').click();
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault();
    document.getElementById('exam-prev-btn').click();
  } else if (e.key.toLowerCase() === 'f') {
    e.preventDefault();
    document.getElementById('exam-flag-btn').click();
  }
});

// ---------- 起動 ----------
applyTheme(loadStore().theme);
renderExamList();
