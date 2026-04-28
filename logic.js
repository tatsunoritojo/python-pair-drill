// ロジック演習（コードトレース）ロジック
'use strict';

const STORAGE_KEY = 'python-pair-drill-v1';
const LOGIC_HISTORY_KEY = 'python-pair-drill-logic-history-v1';

const state = {
  config: { count: 10, domain: 'all', weakMode: false },
  questions: [],
  currentIndex: 0,
  selected: null,
  score: 0,
  streak: 0,
  bestStreak: 0,
  startTime: 0,
  wrongQuestions: [],
};

// ====== ストレージ ======
function loadShared() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch { return {}; }
}
function loadLogicHistory() {
  try {
    return JSON.parse(localStorage.getItem(LOGIC_HISTORY_KEY)) || { questionStats: {}, history: [] };
  } catch { return { questionStats: {}, history: [] }; }
}
function saveLogicHistory(data) {
  localStorage.setItem(LOGIC_HISTORY_KEY, JSON.stringify(data));
}
function recordResult(qid, correct) {
  const data = loadLogicHistory();
  if (!data.questionStats[qid]) data.questionStats[qid] = { correct: 0, total: 0 };
  data.questionStats[qid].total += 1;
  if (correct) data.questionStats[qid].correct += 1;
  saveLogicHistory(data);
}
function recordAttempt(score, total, sec) {
  const data = loadLogicHistory();
  data.history.push({ score, total, sec, at: Date.now() });
  if (data.history.length > 50) data.history = data.history.slice(-50);
  saveLogicHistory(data);
}

// ====== テーマ（共有） ======
function applyTheme(theme) {
  const dark = theme === 'dark' || (theme == null && matchMedia('(prefers-color-scheme: dark)').matches);
  if (dark) document.documentElement.setAttribute('data-theme', 'dark');
  else document.documentElement.removeAttribute('data-theme');
  document.getElementById('theme-toggle').textContent = dark ? '☀️' : '🌙';
}
document.getElementById('theme-toggle').addEventListener('click', () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const next = isDark ? 'light' : 'dark';
  const shared = loadShared();
  shared.theme = next;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(shared));
  applyTheme(next);
});

// ====== 画面切り替え ======
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

// ====== ホーム ======
function initHome() {
  const data = loadLogicHistory();
  document.getElementById('total-questions').textContent = LOGIC_QUESTIONS.length;
  document.getElementById('attempt-count').textContent = data.history.length;

  if (data.history.length > 0) {
    const recent = data.history.slice(-5);
    const avg = recent.reduce((s, h) => s + (h.score / h.total), 0) / recent.length;
    document.getElementById('recent-avg').textContent = Math.round(avg * 100) + '%';
  } else {
    document.getElementById('recent-avg').textContent = '-';
  }

  // ドメインチップ
  const domains = ['all', ...Array.from(new Set(LOGIC_QUESTIONS.map(q => q.domain)))];
  const filterEl = document.getElementById('domain-filter');
  filterEl.innerHTML = '';
  domains.forEach(d => {
    const btn = document.createElement('button');
    btn.textContent = d === 'all' ? '全ドメイン' : d;
    btn.dataset.domain = d;
    if (d === state.config.domain) btn.classList.add('active');
    btn.addEventListener('click', () => {
      filterEl.querySelectorAll('button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.config.domain = d;
    });
    filterEl.appendChild(btn);
  });

  // 出題数
  document.querySelectorAll('#count-select button').forEach(b => {
    b.classList.toggle('active', parseInt(b.dataset.count, 10) === state.config.count);
    b.onclick = () => {
      document.querySelectorAll('#count-select button').forEach(x => x.classList.remove('active'));
      b.classList.add('active');
      state.config.count = parseInt(b.dataset.count, 10);
    };
  });

  document.getElementById('weak-mode').checked = state.config.weakMode;
  document.getElementById('weak-mode').onchange = (e) => {
    state.config.weakMode = e.target.checked;
  };
}

// ====== クイズ開始 ======
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function startQuiz(overridePool) {
  let pool;
  if (overridePool) {
    pool = overridePool;
  } else {
    pool = LOGIC_QUESTIONS.filter(q => state.config.domain === 'all' || q.domain === state.config.domain);

    if (state.config.weakMode) {
      const data = loadLogicHistory();
      const weighted = pool.map(q => {
        const s = data.questionStats[q.id];
        const errorRate = s && s.total > 0 ? 1 - s.correct / s.total : 0.5;
        return { q, weight: errorRate + Math.random() * 0.3 };
      });
      weighted.sort((a, b) => b.weight - a.weight);
      pool = weighted.map(x => x.q);
    } else {
      pool = shuffle(pool);
    }

    if (state.config.count > 0) pool = pool.slice(0, state.config.count);
  }

  // 選択肢シャッフル
  state.questions = pool.map(q => {
    const indexed = q.choices.map((text, i) => ({ text, isCorrect: i === q.correct }));
    const shuffled = shuffle(indexed);
    return Object.assign({}, q, {
      _shuffledChoices: shuffled.map(c => c.text),
      _newCorrect: shuffled.findIndex(c => c.isCorrect),
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
  document.getElementById('progress-fill').style.width = (state.currentIndex / state.questions.length) * 100 + '%';
  document.getElementById('quiz-domain').textContent = q.domain || '';
  document.getElementById('question-text').textContent = q.question;

  const codeEl = document.getElementById('quiz-code');
  if (q.code) {
    codeEl.textContent = q.code;
    codeEl.hidden = false;
  } else {
    codeEl.hidden = true;
  }

  const cs = document.getElementById('choices');
  cs.innerHTML = '';
  const labels = ['A', 'B', 'C', 'D'];
  q._shuffledChoices.forEach((text, i) => {
    const choice = document.createElement('button');
    choice.className = 'choice';
    choice.innerHTML = `<span class="choice-marker">${labels[i] || (i+1)}</span><span class="choice-text"></span>`;
    choice.querySelector('.choice-text').textContent = text;
    choice.addEventListener('click', () => selectChoice(i));
    cs.appendChild(choice);
  });

  document.getElementById('feedback').hidden = true;
}

function selectChoice(idx) {
  if (state.selected !== null) return;
  const q = state.questions[state.currentIndex];
  state.selected = idx;
  const isCorrect = idx === q._newCorrect;

  // 選択肢のスタイル更新
  document.querySelectorAll('#choices .choice').forEach((el, i) => {
    el.classList.add('disabled');
    if (i === q._newCorrect) el.classList.add('correct');
    if (i === idx && !isCorrect) el.classList.add('wrong');
  });

  if (isCorrect) {
    state.score++;
    state.streak++;
    if (state.streak > state.bestStreak) state.bestStreak = state.streak;
  } else {
    state.streak = 0;
    state.wrongQuestions.push(q);
  }

  recordResult(q.id, isCorrect);

  document.getElementById('quiz-score').textContent = state.score;
  document.getElementById('quiz-streak').textContent = state.streak;

  const fb = document.getElementById('feedback');
  document.getElementById('feedback-result').textContent = isCorrect ? '✓ 正解' : '✗ 不正解';
  document.getElementById('feedback-result').className = 'feedback-result ' + (isCorrect ? 'correct' : 'wrong');
  document.getElementById('feedback-explanation').textContent = q.explanation || '';
  document.getElementById('feedback-source').textContent = `出典: ${q.source}`;
  fb.hidden = false;
}

document.getElementById('next-btn').addEventListener('click', () => {
  if (state.currentIndex + 1 < state.questions.length) {
    state.currentIndex++;
    renderQuestion();
  } else {
    showResult();
  }
});

document.getElementById('quit-btn').addEventListener('click', () => {
  if (confirm('演習を中断してホームに戻りますか？')) showScreen('home-screen');
});

// ====== 結果 ======
function showResult() {
  const total = state.questions.length;
  const sec = Math.round((Date.now() - state.startTime) / 1000);
  recordAttempt(state.score, total, sec);

  const rate = total ? Math.round((state.score / total) * 100) : 0;
  document.getElementById('big-score').textContent = `${state.score}/${total}`;
  document.getElementById('score-rate').textContent = `${rate}%${rate >= 70 ? ' 🎉' : ''}`;
  document.getElementById('result-correct').textContent = state.score;
  document.getElementById('result-wrong').textContent = total - state.score;
  document.getElementById('result-best-streak').textContent = state.bestStreak;
  const m = Math.floor(sec / 60), ss = sec % 60;
  document.getElementById('result-time').textContent = `${m}:${String(ss).padStart(2, '0')}`;

  const wrongEl = document.getElementById('wrong-list');
  if (state.wrongQuestions.length === 0) {
    document.getElementById('wrong-section').hidden = true;
  } else {
    document.getElementById('wrong-section').hidden = false;
    wrongEl.innerHTML = '';
    state.wrongQuestions.forEach(q => {
      const card = document.createElement('details');
      card.className = 'review-card ng';
      const summary = document.createElement('summary');
      summary.innerHTML = `<span class="review-domain"></span>`;
      summary.querySelector('.review-domain').textContent = q.domain || '';
      const text = document.createElement('span');
      text.style.flex = '1';
      text.style.minWidth = '0';
      text.style.overflow = 'hidden';
      text.style.textOverflow = 'ellipsis';
      text.style.whiteSpace = 'nowrap';
      text.textContent = q.question;
      summary.appendChild(text);
      card.appendChild(summary);

      const body = document.createElement('div');
      body.className = 'review-body';
      if (q.code) {
        const code = document.createElement('pre');
        code.className = 'code-block';
        code.textContent = q.code;
        body.appendChild(code);
      }
      const correctText = q.choices[q.correct];
      const correctEl = document.createElement('div');
      correctEl.className = 'review-choice correct';
      correctEl.innerHTML = '<span class="rc-marker">◉</span><span class="rc-text"></span>';
      correctEl.querySelector('.rc-text').textContent = correctText;
      body.appendChild(correctEl);
      if (q.explanation) {
        const ex = document.createElement('div');
        ex.className = 'review-explanation';
        ex.textContent = q.explanation;
        body.appendChild(ex);
      }
      card.appendChild(body);
      wrongEl.appendChild(card);
    });
  }

  showScreen('result-screen');
}

document.getElementById('retry-wrong-btn').addEventListener('click', () => {
  if (state.wrongQuestions.length === 0) {
    alert('間違えた問題はありません！');
    return;
  }
  // _newCorrect 等のメタを削ぐ
  const pool = state.wrongQuestions.map(q => ({
    id: q.id, source: q.source, domain: q.domain, question: q.question,
    code: q.code, choices: q.choices, correct: q.correct, explanation: q.explanation,
  }));
  startQuiz(pool);
});
document.getElementById('retry-all-btn').addEventListener('click', () => startQuiz());
document.getElementById('home-btn').addEventListener('click', () => {
  initHome();
  showScreen('home-screen');
});

// ====== キーボードショートカット ======
document.addEventListener('keydown', (e) => {
  if (!document.getElementById('quiz-screen').classList.contains('active')) return;
  if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;

  if (state.selected === null) {
    let idx = -1;
    if (e.key >= '1' && e.key <= '4') idx = parseInt(e.key, 10) - 1;
    else if (/^[a-dA-D]$/.test(e.key)) idx = e.key.toLowerCase().charCodeAt(0) - 97;
    if (idx >= 0 && idx < state.questions[state.currentIndex]._shuffledChoices.length) {
      e.preventDefault();
      selectChoice(idx);
    }
  } else if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    document.getElementById('next-btn').click();
  }
});

document.getElementById('start-btn').addEventListener('click', () => startQuiz());

// ====== 起動 ======
applyTheme(loadShared().theme);
initHome();
