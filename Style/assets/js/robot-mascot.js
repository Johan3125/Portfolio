(function () {
  'use strict';

  /* ── Speech bubble messages ── */
  var messages = {
    en: {
      default:          "Hi! I'm Johan's AI companion. Click me anytime for a tour! 👋",
      hero:             "Welcome! I'm here to guide you through Johan's portfolio. Scroll down to explore!",
      about:            "This is Johan — a passionate developer & designer. Let's get to know him! 🙂",
      skills:           "Johan has a broad skill set across both front-end and back-end technologies. Impressive!",
      resume:           "Here's Johan's journey — education, certifications, and work experience. 📄",
      services:         "Need a web app, UI design, or AI solution? Johan can help! 🚀",
      portfolio:        "Check out Johan's projects! Click any card to learn more. 💼",
      testimonials:     "People love working with Johan. See what they say! ⭐",
      faq:              "Got questions? This section answers the most common ones! 🤔",
      contact:          "Want to work together? Drop Johan a message here! 📬",
      /* ── Service pages ── */
      service_digital:    "Welcome to Digital Solutions! Web apps, mobile, APIs — let's explore! 🌐",
      service_security:   "Security first! Discover how Johan protects your systems end-to-end. 🛡️",
      service_growth:     "Ready to grow? Let me walk you through Johan's strategic approach! 📈",
      service_ai:         "AI is the future — see how Johan integrates intelligence into real products. 🤖",
      service_cloud:      "Scalable, reliable cloud infrastructure — explore what Johan can build. ☁️",
      service_automation: "Work smarter, not harder! See how automation transforms your workflow. ⚙️",
      service_overview:   "Here's the full picture of what this service covers. Quite comprehensive!",
      service_features:   "These features tackle real business challenges. Worth a close look! 💡",
      service_process:    "Johan follows a clear, transparent process — no surprises, just results. 📋",
      service_stats:      "Numbers don't lie — check out the results Johan has delivered! 📊",
      service_cta:        "Ready to get started? Let's build something great together! 🚀"
    },
    vi: {
      default:          "Chào bạn! Tôi là trợ lý AI của Johan. Nhấn vào tôi để khám phá! 👋",
      hero:             "Chào mừng! Tôi sẽ dẫn bạn tham quan portfolio của Johan. Cuộn xuống để khám phá!",
      about:            "Đây là Johan — một lập trình viên & nhà thiết kế đam mê. Hãy làm quen nhé! 🙂",
      skills:           "Johan có kỹ năng đa dạng từ front-end đến back-end. Thật ấn tượng!",
      resume:           "Hành trình của Johan — học vấn, chứng chỉ và kinh nghiệm làm việc. 📄",
      services:         "Cần web app, thiết kế UI hay giải pháp AI? Johan sẵn sàng giúp! 🚀",
      portfolio:        "Khám phá các dự án của Johan! Nhấn vào từng thẻ để xem chi tiết. 💼",
      testimonials:     "Mọi người yêu thích làm việc cùng Johan. Xem họ nói gì nhé! ⭐",
      faq:              "Có thắc mắc? Phần này giải đáp những câu hỏi phổ biến nhất! 🤔",
      contact:          "Muốn hợp tác? Gửi tin nhắn cho Johan tại đây! 📬",
      /* ── Service pages ── */
      service_digital:    "Chào mừng đến Giải pháp Kỹ thuật số! Web, mobile, API — cùng khám phá! 🌐",
      service_security:   "Bảo mật là ưu tiên! Khám phá cách Johan bảo vệ hệ thống của bạn. 🛡️",
      service_growth:     "Sẵn sàng tăng trưởng? Xem chiến lược của Johan ngay đây! 📈",
      service_ai:         "AI là tương lai! Xem Johan tích hợp trí tuệ vào sản phẩm thực tế. 🤖",
      service_cloud:      "Cloud linh hoạt và đáng tin cậy — khám phá hạ tầng Johan xây dựng. ☁️",
      service_automation: "Làm việc thông minh hơn! Xem cách tự động hóa thay đổi quy trình của bạn. ⚙️",
      service_overview:   "Đây là cái nhìn tổng quan về dịch vụ này. Khá toàn diện đấy nhỉ!",
      service_features:   "Những tính năng này được thiết kế để giải quyết thách thức thực tế! 💡",
      service_process:    "Johan theo quy trình rõ ràng — không bất ngờ, chỉ có kết quả. 📋",
      service_stats:      "Con số không nói dối — xem kết quả Johan đã đạt được! 📊",
      service_cta:        "Sẵn sàng bắt đầu? Hãy cùng tạo ra điều tuyệt vời! 🚀"
    }
  };

  var currentLang    = 'en';
  var currentSection = 'default';
  var bubbleVisible  = false;
  var autoHideTimer  = null;
  var hasGreeted     = false;

  /* ── Detect service page ── */
  var isServicePage = !!document.querySelector('.sd-hero');
  function getServiceKey() {
    var p = window.location.pathname;
    if (p.indexOf('service-digital')   !== -1) return 'service_digital';
    if (p.indexOf('service-secure')    !== -1) return 'service_security';
    if (p.indexOf('service-growth')    !== -1) return 'service_growth';
    if (p.indexOf('service-ai')        !== -1) return 'service_ai';
    if (p.indexOf('service-cloud')     !== -1) return 'service_cloud';
    if (p.indexOf('service-automation')!== -1) return 'service_automation';
    return 'default';
  }
  var serviceKey = isServicePage ? getServiceKey() : null;

  /* ── Bubble helpers ── */
  function showBubble(sectionKey, autoHide) {
    var bubble = document.getElementById('robot-bubble');
    var msgEl  = document.getElementById('robot-message');
    if (!bubble || !msgEl) return;

    var text = (messages[currentLang] && messages[currentLang][sectionKey])
      ? messages[currentLang][sectionKey]
      : messages[currentLang]['default'];

    msgEl.textContent = text;
    bubble.classList.add('visible');
    bubbleVisible  = true;
    currentSection = sectionKey;

    if (autoHideTimer) clearTimeout(autoHideTimer);
    if (autoHide) {
      autoHideTimer = setTimeout(hideBubble, 5000);
    }
  }

  function hideBubble() {
    var bubble = document.getElementById('robot-bubble');
    if (bubble) bubble.classList.remove('visible');
    bubbleVisible = false;
    if (autoHideTimer) clearTimeout(autoHideTimer);
  }

  /* ── Draggable robot ── */
  function initDrag() {
    var mascot  = document.getElementById('robot-mascot');
    var wrapper = document.getElementById('robot-wrapper');
    if (!mascot) return;

    var isDragging = false;
    var hasDragged = false;
    var startClientX, startClientY, startLeft, startTop;
    var positionConverted = false;

    function convertPosition() {
      if (positionConverted) return;
      var rect = mascot.getBoundingClientRect();
      mascot.style.bottom = 'auto';
      mascot.style.right  = 'auto';
      mascot.style.top    = rect.top  + 'px';
      mascot.style.left   = rect.left + 'px';
      positionConverted = true;
    }

    function clamp(val, min, max) {
      return Math.max(min, Math.min(max, val));
    }

    function startDrag(clientX, clientY) {
      convertPosition();
      isDragging   = true;
      hasDragged   = false;
      startClientX = clientX;
      startClientY = clientY;
      startLeft    = parseFloat(mascot.style.left) || 0;
      startTop     = parseFloat(mascot.style.top)  || 0;
      mascot.style.transition = 'none';
      mascot.style.cursor     = 'grabbing';
      if (wrapper) wrapper.style.transition = 'none';
    }

    function moveDrag(clientX, clientY) {
      if (!isDragging) return;
      var dx = clientX - startClientX;
      var dy = clientY - startClientY;
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) hasDragged = true;

      var maxLeft = window.innerWidth  - mascot.offsetWidth;
      var maxTop  = window.innerHeight - mascot.offsetHeight;
      mascot.style.left = clamp(startLeft + dx, 0, maxLeft) + 'px';
      mascot.style.top  = clamp(startTop  + dy, 0, maxTop)  + 'px';
    }

    function endDrag() {
      if (!isDragging) return;
      isDragging          = false;
      mascot.style.cursor = 'pointer';
      if (wrapper) wrapper.style.transition = '';
      if (!hasDragged) {
        bubbleVisible ? hideBubble() : showBubble(currentSection || 'default', false);
      }
    }

    mascot.addEventListener('mousedown', function (e) {
      if (e.target.closest && e.target.closest('.robot-bubble')) return;
      e.preventDefault();
      startDrag(e.clientX, e.clientY);
    });

    document.addEventListener('mousemove', function (e) { moveDrag(e.clientX, e.clientY); });
    document.addEventListener('mouseup',   function ()  { endDrag(); });

    mascot.addEventListener('touchstart', function (e) {
      if (e.target.closest && e.target.closest('.robot-bubble')) return;
      var t = e.touches[0];
      startDrag(t.clientX, t.clientY);
    }, { passive: true });

    document.addEventListener('touchmove', function (e) {
      if (!isDragging) return;
      var t = e.touches[0];
      moveDrag(t.clientX, t.clientY);
      e.preventDefault();
    }, { passive: false });

    document.addEventListener('touchend', function () { endDrag(); });
  }

  /* ── 3D mouse tilt on robot wrapper ── */
  function initMouseTilt() {
    var wrapper = document.getElementById('robot-wrapper');
    if (!wrapper) return;

    document.addEventListener('mousemove', function (e) {
      var mascot = document.getElementById('robot-mascot');
      if (mascot && mascot.style.cursor === 'grabbing') return;

      var rect = wrapper.getBoundingClientRect();
      var cx = rect.left + rect.width  / 2;
      var cy = rect.top  + rect.height / 2;
      var dx = (e.clientX - cx) / window.innerWidth;
      var dy = (e.clientY - cy) / window.innerHeight;
      wrapper.style.transform =
        'perspective(300px) rotateX(' + (-dy * 18) + 'deg) rotateY(' + (dx * 22) + 'deg)';
    });
  }

  /* ── Hero image 3D parallax tilt (main page only) ── */
  function initHero3D() {
    var hero = document.querySelector('.hero');
    var imgContainer = hero && hero.querySelector('.image-container');
    if (!hero || !imgContainer) return;

    hero.addEventListener('mousemove', function (e) {
      var rect = hero.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width  - 0.5;
      var y = (e.clientY - rect.top)  / rect.height - 0.5;
      imgContainer.style.transform =
        'perspective(900px) rotateX(' + (-y * 10) + 'deg) rotateY(' + (x * 12) + 'deg)';
    });

    hero.addEventListener('mouseleave', function () {
      imgContainer.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
    });
  }

  /* ── Section observer — main portfolio page ── */
  function initSectionObserver() {
    var sectionMap = {
      hero: 'hero', about: 'about', skills: 'skills', resume: 'resume',
      services: 'services', portfolio: 'portfolio', testimonials: 'testimonials',
      faq: 'faq', contact: 'contact'
    };

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var key = sectionMap[entry.target.id] || 'default';
          if (key !== currentSection) showBubble(key, true);
        }
      });
    }, { root: null, rootMargin: '-40% 0px -40% 0px', threshold: 0 });

    Object.keys(sectionMap).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }

  /* ── Section observer — service detail pages ── */
  function initServiceSectionObserver() {
    var sectionSelectors = [
      { selector: '.sd-overview',      key: 'service_overview'  },
      { selector: '.sd-features-grid', key: 'service_features'  },
      { selector: '.sd-process',       key: 'service_process'   },
      { selector: '.sd-stats-section', key: 'service_stats'     },
      { selector: '.sd-cta-section',   key: 'service_cta'       }
    ];

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var key = entry.target._robotKey || 'default';
          if (key !== currentSection) showBubble(key, true);
        }
      });
    }, { root: null, rootMargin: '-35% 0px -35% 0px', threshold: 0 });

    sectionSelectors.forEach(function (item) {
      var el = document.querySelector(item.selector);
      if (el) {
        el._robotKey = item.key;
        observer.observe(el);
      }
    });
  }

  /* ── Initial greeting ── */
  function greet() {
    if (hasGreeted) return;
    hasGreeted = true;
    var key = serviceKey || 'default';
    setTimeout(function () { showBubble(key, true); }, 1800);
  }

  /* ── Language sync (called by i18n.js) ── */
  window.robotUpdateLang = function (lang) {
    currentLang = lang || 'en';
    if (bubbleVisible) showBubble(currentSection, false);
  };

  /* ── Boot ── */
  window.addEventListener('DOMContentLoaded', function () {
    initDrag();
    initMouseTilt();
    if (isServicePage) {
      initServiceSectionObserver();
    } else {
      initHero3D();
      initSectionObserver();
    }
    greet();
  });

})();
