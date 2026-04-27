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
  document.querySelectorAll('.screen').forEach((s) => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
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
    if (!data.questionStats[questionId]) data.questionStats[questionId] = { correct: 0, total: 0 };
    data.questionStats[questionId].total += 1;
    if (correct) data.questionStats[questionId].correct += 1;
    storage.save(data);
  },
  recordAttempt(score, total, timeSec) {
    const data = storage.load();
    data.history.push({ score, total, timeSec, date: Date.now() });
    if (data.history.length > 100) data.history = data.history.slice(-100);
    storage.save(data);
  },
};

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
      // 過去の不正解率で重み付けし、降順ソート → 同率はランダム
      const weighted = pool.map((q) => {
        const s = data.questionStats[q.id];
        const errorRate = s && s.total > 0 ? 1 - s.correct / s.total : 0.5;
        return { q, weight: errorRate + Math.random() * 0.3 };
      });
      weighted.sort((a, b) => b.weight - a.weight);
      pool = weighted.map((x) => x.q);
    } else {
      pool = shuffle(pool);
    }

    if (state.config.count > 0) pool = pool.slice(0, state.config.count);
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
