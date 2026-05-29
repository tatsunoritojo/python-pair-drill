// PWA: Service Worker 登録 + ホーム画面追加（A2HS）の導線
// - Android/Chrome: beforeinstallprompt を捕まえて「ホームに追加」ボタンを出す
// - iOS Safari: プログラム的に出せないため、共有メニューの手順を案内する
'use strict';
(function () {
  // --- Service Worker 登録 ---
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').catch(() => {});
    });
  }

  const DISMISS_KEY = 'ppd-a2hs-dismissed-v1';
  const isStandalone =
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true;

  const dismissed = () => { try { return localStorage.getItem(DISMISS_KEY) === '1'; } catch { return false; } };
  const setDismissed = () => { try { localStorage.setItem(DISMISS_KEY, '1'); } catch {} };

  // すでにインストール済み（standalone 起動）なら導線は出さない
  if (isStandalone) return;

  let deferredPrompt = null;

  function showBanner(message, actionLabel, onAction) {
    if (document.getElementById('a2hs-banner')) return;
    const bar = document.createElement('div');
    bar.id = 'a2hs-banner';
    bar.className = 'a2hs-banner';
    bar.setAttribute('role', 'dialog');
    bar.setAttribute('aria-label', 'ホーム画面に追加');

    const msg = document.createElement('span');
    msg.className = 'a2hs-msg';
    msg.textContent = message;
    bar.appendChild(msg);

    if (actionLabel && onAction) {
      const act = document.createElement('button');
      act.type = 'button';
      act.className = 'a2hs-action';
      act.textContent = actionLabel;
      act.addEventListener('click', onAction);
      bar.appendChild(act);
    }

    const close = document.createElement('button');
    close.type = 'button';
    close.className = 'a2hs-close';
    close.setAttribute('aria-label', '閉じる');
    close.textContent = '✕';
    close.addEventListener('click', () => { bar.remove(); setDismissed(); });
    bar.appendChild(close);

    document.body.appendChild(bar);
  }

  // --- Android / デスクトップ Chrome ---
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (dismissed()) return;
    showBanner('ホーム画面に追加すると、すき間時間にすぐ起動できます', 'ホームに追加', async () => {
      const banner = document.getElementById('a2hs-banner');
      if (banner) banner.remove();
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      try { await deferredPrompt.userChoice; } catch {}
      deferredPrompt = null;
      setDismissed();
    });
  });

  window.addEventListener('appinstalled', () => {
    const banner = document.getElementById('a2hs-banner');
    if (banner) banner.remove();
    deferredPrompt = null;
    setDismissed();
  });

  // --- iOS Safari（beforeinstallprompt 非対応のため手順案内） ---
  const ua = window.navigator.userAgent;
  const isIOS = /iPhone|iPad|iPod/.test(ua);
  const isSafari = /Safari/.test(ua) && !/CriOS|FxiOS|EdgiOS|OPiOS/.test(ua);
  if (isIOS && isSafari && !dismissed()) {
    window.addEventListener('load', () => {
      showBanner('共有ボタン → 「ホーム画面に追加」で、アプリのように使えます', null, null);
    });
  }
})();
