/* ═══════════════════════════════════════════════
   СНОВИДЕЦ — ПРОТОТИП
   script.js
═══════════════════════════════════════════════ */

const SCREENS = [
  'loading',
  'login',
  'diary-entries',
  'add-dream',
  'visualization',
  'analytics',
  'profile'
];

let currentIndex = 0;

/* ── Core: show a screen by id ── */
function goTo(screenId) {
  const idx = SCREENS.indexOf(screenId);
  if (idx === -1) return;

  // Hide all
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('active');
  });

  // Show target
  const target = document.getElementById('screen-' + screenId);
  if (target) {
    target.classList.add('active');
    // Scroll body to top
    const body = target.querySelector('.screen-body');
    if (body) body.scrollTop = 0;
  }

  currentIndex = idx;
  updateArrows();
  updateCounter();
}

/* ── Desktop arrows ── */
function updateArrows() {
  const prev = document.getElementById('btn-prev');
  const next = document.getElementById('btn-next');
  if (!prev || !next) return;
  prev.disabled = currentIndex === 0;
  next.disabled = currentIndex === SCREENS.length - 1;
}

function updateCounter() {
  const el = document.getElementById('screen-counter');
  if (!el) return;
  const labels = ['Загрузка','Вход','Дневник','Добавление','Визуализация','Аналитика','Профиль'];
  el.textContent = `${currentIndex + 1} / ${SCREENS.length}  ·  ${labels[currentIndex]}`;
}

/* ── Nav bottom menu ── */
function bindNav() {
  document.querySelectorAll('.nav-item[data-screen]').forEach(item => {
    item.addEventListener('click', () => {
      goTo(item.dataset.screen);
    });
  });
}

/* ── Clickable transitions ── */
function bindTransitions() {

  // Loading → Login (tap anywhere)
  const loading = document.getElementById('screen-loading');
  if (loading) {
    loading.addEventListener('click', () => goTo('login'));
  }

  // Login → Diary entries
  document.querySelectorAll('[data-goto]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      goTo(el.dataset.goto);
    });
  });
}

/* ── Arrow buttons ── */
function bindArrows() {
  document.getElementById('btn-prev')?.addEventListener('click', () => {
    if (currentIndex > 0) goTo(SCREENS[currentIndex - 1]);
  });
  document.getElementById('btn-next')?.addEventListener('click', () => {
    if (currentIndex < SCREENS.length - 1) goTo(SCREENS[currentIndex + 1]);
  });
}

/* ── Keyboard nav ── */
function bindKeyboard() {
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      if (currentIndex < SCREENS.length - 1) goTo(SCREENS[currentIndex + 1]);
    }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      if (currentIndex > 0) goTo(SCREENS[currentIndex - 1]);
    }
  });
}

/* ── Swipe support ── */
function bindSwipe() {
  let startX = 0;
  const shell = document.getElementById('app');

  shell.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  shell.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentIndex < SCREENS.length - 1) {
        goTo(SCREENS[currentIndex + 1]);
      } else if (diff < 0 && currentIndex > 0) {
        goTo(SCREENS[currentIndex - 1]);
      }
    }
  }, { passive: true });
}

/* ── Active nav highlight ── */
function highlightNav(screenId) {
  document.querySelectorAll('.nav-item[data-screen]').forEach(item => {
    item.classList.toggle('active', item.dataset.screen === screenId);
  });
}

// Extend goTo to also highlight nav
const _goTo = goTo;
window.goTo = function(screenId) {
  _goTo(screenId);
  highlightNav(screenId);
};

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  bindNav();
  bindTransitions();
  bindArrows();
  bindKeyboard();
  bindSwipe();
  goTo('loading');
});
