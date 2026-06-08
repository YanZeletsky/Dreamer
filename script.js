/* Сновидец — Navigation */

var SCREENS = [
  { id: '1_loading',    label: 'Загрузка',      file: '1_loading.html' },
  { id: '2_login',      label: 'Вход',           file: '2_login.html' },
  { id: '3_diary',      label: 'Дневник',        file: '3_diary.html' },
  { id: '4_detail',     label: 'Детали сна',     file: '4_detail.html' },
  { id: '5_add',        label: 'Добавление сна', file: '5_add.html' },
  { id: '6_viz',        label: 'Визуализация',   file: '6_viz.html' },
  { id: '7_analytics',  label: 'Аналитика',      file: '7_analytics.html' },
  { id: '8_profile',    label: 'Профиль',        file: '8_profile.html' }
];

var currentIndex = 0;

function goTo(screenId) {
  var idx = SCREENS.findIndex(function(s) { return s.id === screenId; });
  if (idx === -1) return;

  var frame = document.getElementById('screen-frame');
  if (frame) {
    frame.src = SCREENS[idx].file;
  }

  currentIndex = idx;
  updateUI();
}

function updateUI() {
  // Arrows
  var prev = document.getElementById('btn-prev');
  var next = document.getElementById('btn-next');
  if (prev) prev.classList.toggle('disabled', currentIndex === 0);
  if (next) next.classList.toggle('disabled', currentIndex === SCREENS.length - 1);

  // Label
  var label = document.getElementById('screen-label');
  if (label) {
    label.textContent = (currentIndex + 1) + ' / ' + SCREENS.length + '  ·  ' + SCREENS[currentIndex].label;
  }
}

// Arrow clicks
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('btn-prev').addEventListener('click', function() {
    if (currentIndex > 0) goTo(SCREENS[currentIndex - 1].id);
  });

  document.getElementById('btn-next').addEventListener('click', function() {
    if (currentIndex < SCREENS.length - 1) goTo(SCREENS[currentIndex + 1].id);
  });

  // Keyboard
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      if (currentIndex < SCREENS.length - 1) goTo(SCREENS[currentIndex + 1].id);
    }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      if (currentIndex > 0) goTo(SCREENS[currentIndex - 1].id);
    }
  });

  // Start at loading
  goTo('1_loading');
});
