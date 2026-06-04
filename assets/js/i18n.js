(function () {
  'use strict';

  let currentLang = 'vi';
  let typedInstance = null;

  function initTyped(lang) {
    const typedEl = document.querySelector('.typed');
    if (!typedEl || typeof Typed === 'undefined') return;
    const key = typedEl.getAttribute('data-i18n-typed');
    const str = (key && translations[lang] && translations[lang][key])
      ? translations[lang][key]
      : typedEl.getAttribute('data-typed-items');
    if (typedInstance) {
      typedInstance.destroy();
      typedEl.textContent = '';
    }
    typedInstance = new Typed('.typed', {
      strings: str.split(','),
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  function apply(lang) {
    if (!translations || !translations[lang]) return;
    currentLang = lang;
    localStorage.setItem('portfolio-lang', lang);
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      const val = translations[lang][el.getAttribute('data-i18n')];
      if (val !== undefined) el.textContent = val;
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      const val = translations[lang][el.getAttribute('data-i18n-placeholder')];
      if (val !== undefined) el.placeholder = val;
    });

    initTyped(lang);

    const btn = document.getElementById('lang-toggle');
    if (btn) btn.textContent = lang === 'en' ? 'VI' : 'EN';

    if (typeof window.robotUpdateLang === 'function') window.robotUpdateLang(lang);
  }

  function toggle() {
    apply(currentLang === 'en' ? 'vi' : 'en');
  }

  window.addEventListener('load', function () {
    apply(localStorage.getItem('portfolio-lang') || 'vi');
  });

  window.i18n = { toggle: toggle, apply: apply };
})();
