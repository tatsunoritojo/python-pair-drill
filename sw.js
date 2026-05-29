// Service Worker — network-first 戦略
// オンライン時は常に最新を取得（問題追加が頻繁なため cache-first にはしない＝
// 「新しい問題が出てこない」事故を防ぐ）。オフライン時のみキャッシュにフォールバックする。
'use strict';

const CACHE = 'ppd-cache-v1';

// 同一オリジンの中核アセット（プリキャッシュ必須）
const CORE = [
  './',
  'index.html', 'exam.html', 'logic.html', 'assistant.html', '404.html',
  'style.css',
  'app.js', 'exam.js', 'logic.js', 'assistant.js', 'pwa.js',
  'questions.js', 'logic-questions.js', 'concepts.js',
  'manifest.json',
  'favicon.svg', 'favicon-64.png', 'apple-touch-icon.png',
  'mock-exams/mock-exam-1.json', 'mock-exams/mock-exam-2.json',
  'mock-exams/mock-exam-3.json', 'mock-exams/mock-exam-4.json',
];

// CDN ライブラリ（取得失敗してもインストールは続行＝ベストエフォート）
const CDN = [
  'https://cdn.jsdelivr.net/npm/lz-string@1.5.0/libs/lz-string.min.js',
  'https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.min.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(CORE).then(() =>
        Promise.allSettled(CDN.map((url) => cache.add(url)))
      ))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return; // POST（Gemini API 等）は素通し

  const url = new URL(request.url);
  // AI アシスタントの外部 API はキャッシュ対象外
  if (url.hostname.endsWith('generativelanguage.googleapis.com')) return;

  event.respondWith(
    fetch(request)
      .then((res) => {
        const cacheable = res && res.status === 200 &&
          (url.origin === self.location.origin || url.hostname === 'cdn.jsdelivr.net');
        if (cacheable) {
          const clone = res.clone();
          caches.open(CACHE).then((cache) => cache.put(request, clone));
        }
        return res;
      })
      .catch(() =>
        caches.match(request).then((cached) => {
          if (cached) return cached;
          if (request.mode === 'navigate') return caches.match('index.html');
          return new Response('', { status: 504, statusText: 'offline' });
        })
      )
  );
});
