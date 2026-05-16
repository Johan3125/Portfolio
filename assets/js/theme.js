(function () {
  'use strict';

  var DARK_CLASS = 'dark-mode';
  var STORAGE_KEY = 'portfolio-theme';

  function apply(isDark) {
    if (isDark) {
      document.body.classList.add(DARK_CLASS);
    } else {
      document.body.classList.remove(DARK_CLASS);
    }
    var btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.innerHTML = isDark
        ? '<i class="bi bi-sun-fill"></i>'
        : '<i class="bi bi-moon-fill"></i>';
      btn.title = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    }
    localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
  }

  function toggle() {
    apply(!document.body.classList.contains(DARK_CLASS));
  }

  /* Restore saved theme — sync across all pages */
  window.addEventListener('DOMContentLoaded', function () {
    apply(localStorage.getItem(STORAGE_KEY) === 'dark');
  });

  window.themeManager = { toggle: toggle, apply: apply };
})();
