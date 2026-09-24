// Home hero "inverse lens" cursor — see hero-lens.css.
(function () {
  var hero = document.querySelector('.intro-section--video');
  if (!hero) return;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!fine.matches || reduce.matches) return;

  var root = document.documentElement;
  var lens = null, srcEls = [], lensEls = [], srcVideos = {}, lensVideos = {};
  var lastX = 0, lastY = 0, raf = 0, syncTimer = 0;

  var pageTheme = function () { return root.dataset.theme === 'light' ? 'light' : 'dark'; };
  var lensTheme = function () { return pageTheme() === 'light' ? 'dark' : 'light'; };

  function build() {
    if (lens) return;
    lens = hero.cloneNode(true);
    lens.className = 'intro-section intro-section--video hero-lens';
    lens.setAttribute('aria-hidden', 'true');
    lens.setAttribute('inert', '');
    lens.removeAttribute('id');
    lens.querySelectorAll('[id]').forEach(function (el) { el.removeAttribute('id'); });
    lens.querySelectorAll('[tabindex]').forEach(function (el) { el.setAttribute('tabindex', '-1'); });

    srcEls = Array.prototype.slice.call(hero.querySelectorAll('*'));
    lensEls = Array.prototype.slice.call(lens.querySelectorAll('*'));
    // ids were stripped from the clone, so pair by position (same tree shape).
    ['dark', 'light'].forEach(function (v) {
      srcVideos[v] = hero.querySelector('.intro-bg-video--' + v);
      lensVideos[v] = lens.querySelector('.intro-bg-video--' + v);
    });
    hero.appendChild(lens);

    // Mirror class/style changes (headline wipes, logo flicker, reveals).
    var map = new Map();
    srcEls.forEach(function (el, i) { if (lensEls[i]) map.set(el, lensEls[i]); });
    new MutationObserver(function (records) {
      records.forEach(function (r) {
        var twin = map.get(r.target);
        if (!twin || twin.tagName === 'VIDEO') return;
        var v = r.target.getAttribute(r.attributeName);
        if (v === null) twin.removeAttribute(r.attributeName);
        else twin.setAttribute(r.attributeName, v);
      });
    }).observe(hero, { attributes: true, attributeFilter: ['class', 'style'], subtree: true });

    // Page theme changes -> flip the lens to the new opposite.
    new MutationObserver(applyTheme).observe(root, { attributes: true, attributeFilter: ['data-theme'] });
    applyTheme();
  }

  function applyTheme() {
    if (!lens) return;
    var t = lensTheme();
    lens.classList.remove('hero-lens--light', 'hero-lens--dark');
    lens.classList.add('hero-lens--' + t);
    // applyLogoTheme() (index.html) retargets every .client-logo to the page
    // theme, this one included — set the lens's back to its own theme.
    lens.querySelectorAll('.client-logo').forEach(function (img) {
      var white = img.dataset.srcWhite || img.getAttribute('src').replace(/-black\.png$/, '.png');
      var src = t === 'light' ? white.replace(/\.png$/, '-black.png') : white;
      if (img.getAttribute('src') !== src) img.setAttribute('src', src);
    });
    // Only the lens video actually showing needs to play.
    var show = lensVideos[t], hide = lensVideos[t === 'light' ? 'dark' : 'light'];
    if (hide) hide.pause();
    if (show) { syncVideo(); var p = show.play(); if (p && p.catch) p.catch(function () {}); }
  }

  // Lens video shows the same footage as the base video, so match its time.
  function syncVideo() {
    var ref = srcVideos[pageTheme()], mine = lensVideos[lensTheme()];
    if (!ref || !mine || !isFinite(mine.duration) || !mine.duration) return;
    var t = ref.currentTime % mine.duration;
    if (Math.abs(mine.currentTime - t) > 0.1) mine.currentTime = t;
  }

  function syncMarquee() {
    var a = hero.querySelector('.client-logos-track');
    var b = lens.querySelector('.client-logos-track');
    if (!a || !b) return;
    var aa = a.getAnimations()[0], ba = b.getAnimations()[0];
    if (aa && ba) ba.currentTime = aa.currentTime;
  }

  function place() {
    raf = 0;
    var rect = hero.getBoundingClientRect();
    lens.style.setProperty('--lens-x', (lastX - rect.left) + 'px');
    lens.style.setProperty('--lens-y', (lastY - rect.top) + 'px');
  }
  function queue() { if (!raf) raf = requestAnimationFrame(place); }

  function activate() {
    build();
    syncMarquee();
    syncVideo();
    lens.classList.add('is-active');
    clearInterval(syncTimer);
    syncTimer = setInterval(syncVideo, 1000);
  }
  function deactivate() {
    if (!lens) return;
    lens.classList.remove('is-active', 'is-over-cta', 'is-over-text');
    clearInterval(syncTimer);
  }

  // Over the logo or a client logo, or directly over headline/subhead glyphs (not the empty
  // space beside them — the text blocks are wider than their lines).
  function overText(e) {
    var t = e.target;
    if (t.closest('.logo-block')) return true;
    // The scrim sits above the marquee, so target-based checks miss it.
    var strip = hero.querySelector('.client-logos');
    var sr = strip && strip.getBoundingClientRect();
    if (sr && e.clientY >= sr.top && e.clientY <= sr.bottom) {
      var logos = strip.querySelectorAll('.client-logo');
      for (var j = 0; j < logos.length; j++) {
        var lr = logos[j].getBoundingClientRect();
        if (e.clientX >= lr.left && e.clientX <= lr.right && e.clientY >= lr.top && e.clientY <= lr.bottom) return true;
      }
    }
    var el = t.closest('.intro-heading, .hero-subhead');
    if (!el) return false;
    // Text nodes only: selecting the element would also return its
    // (full-width) block boxes.
    var range = document.createRange();
    var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      if (!walker.currentNode.nodeValue.trim()) continue;
      range.selectNodeContents(walker.currentNode);
      var rects = range.getClientRects();
      for (var i = 0; i < rects.length; i++) {
        var r = rects[i];
        if (e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom) return true;
      }
    }
    return false;
  }

  hero.classList.add('has-hero-lens');
  hero.addEventListener('mouseenter', function (e) { lastX = e.clientX; lastY = e.clientY; activate(); queue(); });
  hero.addEventListener('mouseleave', deactivate);
  hero.addEventListener('mousemove', function (e) {
    lastX = e.clientX; lastY = e.clientY;
    if (lens) {
      var cta = !!e.target.closest('.hero-link');
      lens.classList.toggle('is-over-cta', cta);
      lens.classList.toggle('is-over-text', !cta && overText(e));
    }
    queue();
  });
  window.addEventListener('scroll', function () { if (lens && lens.classList.contains('is-active')) queue(); }, { passive: true });

  // Pre-build once the page has settled so the first hover isn't a cold start.
  window.addEventListener('load', function () {
    (window.requestIdleCallback || function (f) { setTimeout(f, 800); })(build);
  });
})();
