(function () {
  'use strict';

  // 히어로 슬라이더
  var slides = document.querySelectorAll('.hero .slide');
  var dotsContainer = document.querySelector('.hero-dots');
  var prevBtn = document.querySelector('.hero-prev');
  var nextBtn = document.querySelector('.hero-next');
  var current = 0;
  var total = slides.length;
  var autoplayTimer;

  function createDots() {
    if (!dotsContainer || total <= 1) return;
    dotsContainer.innerHTML = '';
    for (var i = 0; i < total; i++) {
      (function (idx) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.setAttribute('aria-label', '슬라이드 ' + (idx + 1));
        dot.classList.add('hero-dot');
        if (idx === 0) dot.classList.add('active');
        dot.addEventListener('click', function () { goTo(idx); });
        dotsContainer.appendChild(dot);
      })(i);
    }
  }

  function goTo(index) {
    current = (index + total) % total;
    slides.forEach(function (s, i) {
      s.classList.toggle('active', i === current);
    });
    var dots = document.querySelectorAll('.hero-dot');
    dots.forEach(function (d, i) {
      d.classList.toggle('active', i === current);
    });
    resetAutoplay();
  }

  function next() {
    goTo(current + 1);
  }

  function prev() {
    goTo(current - 1);
  }

  function resetAutoplay() {
    clearInterval(autoplayTimer);
    autoplayTimer = setInterval(next, 5000);
  }

  if (prevBtn) prevBtn.addEventListener('click', prev);
  if (nextBtn) nextBtn.addEventListener('click', next);
  createDots();
  if (total > 1) autoplayTimer = setInterval(next, 5000);

  // 모바일 메뉴 (전용 패널만 제어)
  var menuToggle = document.querySelector('.menu-toggle');
  var mobileMenu = document.getElementById('mobile-menu');
  if (menuToggle && mobileMenu) {
    function setMenuOpen(open) {
      mobileMenu.classList.toggle('is-open', open);
      mobileMenu.setAttribute('aria-hidden', !open);
      menuToggle.classList.toggle('open', open);
      menuToggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
      document.body.classList.toggle('menu-open', open);
    }
    menuToggle.addEventListener('click', function () {
      setMenuOpen(!mobileMenu.classList.contains('is-open'));
    });
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { setMenuOpen(false); });
    });
  }

  // 스크롤 시 헤더 배경
  var header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 60);
    });
  }
})();
