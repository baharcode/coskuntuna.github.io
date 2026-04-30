(function () {

  // --- CURSOR ---
  var cursor = document.getElementById('cursor');
  var ring   = document.getElementById('cursorRing');
  var mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', function (e) {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  (function anim() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(anim);
  })();

  document.addEventListener('mouseover', function (e) {
    var t = e.target;
    if (t.tagName === 'A' || t.tagName === 'BUTTON' || t.tagName === 'SPAN' ||
        t.classList.contains('work-card') || t.classList.contains('portfolio-item') ||
        t.classList.contains('hero-img-card')) {
      document.body.classList.add('hovering');
    } else {
      document.body.classList.remove('hovering');
    }
  });

  // --- NAV SCROLL ---
  window.addEventListener('scroll', function () {
    document.getElementById('mainNav').classList.toggle('scrolled', window.scrollY > 10);
  });

  // --- NAVIGATION ---
  function goTo(page) {
    document.querySelectorAll('.page').forEach(function (p) { p.classList.remove('active'); });
    document.getElementById('page-' + page).classList.add('active');
    document.querySelectorAll('.nav-links a').forEach(function (a) {
      a.classList.toggle('active', a.dataset.page === page);
    });
    window.scrollTo(0, 0);
    setTimeout(initReveals, 80);
  }

  // Nav linkleri
  document.getElementById('navLogo').addEventListener('click', function () { goTo('home'); });
  document.getElementById('nav-home').addEventListener('click',      function () { goTo('home'); });
  document.getElementById('nav-portfolio').addEventListener('click', function () { goTo('portfolio'); });
  document.getElementById('nav-about').addEventListener('click',     function () { goTo('about'); });
  document.getElementById('nav-contact').addEventListener('click',   function () { goTo('contact'); });

  // Hero butonları
  document.getElementById('heroPortfolioBtn').addEventListener('click', function () { goTo('portfolio'); });
  document.getElementById('heroContactBtn').addEventListener('click',   function () { goTo('contact'); });

  // viewAllBtn opsiyonel — HTML'de yoksa hata vermez
  var viewAllBtn = document.getElementById('viewAllBtn');
  if (viewAllBtn) {
    viewAllBtn.addEventListener('click', function () { goTo('portfolio'); });
  }

  document.querySelectorAll('.work-card').forEach(function (card) {
    card.addEventListener('click', function () { goTo('portfolio'); });
  });

  // --- HAMBURGER MENÜ ---
  var hamburger  = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        var page = link.getAttribute('data-page');
        if (page) goTo(page);
      });
    });
  }

  // --- PORTFOLIO FILTER ---
  document.querySelectorAll('.filter-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var cat = btn.dataset.cat;
      document.querySelectorAll('.portfolio-item').forEach(function (item) {
        item.classList.toggle('hidden', cat !== 'all' && item.dataset.category !== cat);
      });
    });
  });

  // --- LIGHTBOX ---
  var lightbox    = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');

  document.querySelectorAll('.portfolio-item').forEach(function (item) {
    item.addEventListener('click', function () {
      var img = item.querySelector('img');
      if (!img) return;
      lightboxImg.src = img.src;
      lightbox.style.display = 'flex';
    });
  });

  lightbox.addEventListener('click', function () {
    lightbox.style.display = 'none';
  });

  // --- SCROLL REVEAL ---
  function initReveals() {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target); }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal:not(.in-view)').forEach(function (el) { io.observe(el); });
  }
  initReveals();

})();