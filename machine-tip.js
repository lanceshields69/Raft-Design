// Tooltips for the llms.txt and ai.md links in the footer. Same behavior as
// the tooltips on /ai/ and /ja/ai/: hover, keyboard focus, and tap (first tap
// shows the tooltip, second tap follows the link).
(function () {
  var links = document.querySelectorAll('a[data-machine-tip]');
  if (!links.length) return;

  var ja = /^ja/i.test(document.documentElement.lang || '');
  var COPY = ja
    ? {
        llms: 'AI向けのサイト目次です。モデルはまずここを読んで、情報の場所を把握します。',
        aimd: 'デザインを取り除いたRaft Designです。AIが判断に必要な情報を、一つのファイルにまとめています。'
      }
    : {
        llms: 'A table of contents for AI. Models read it first to find their way around.',
        aimd: "Raft, minus the design. Everything an AI needs to decide if we're a fit."
      };

  var tip = document.createElement('div');
  tip.className = 'machine-tip';
  tip.setAttribute('aria-hidden', 'true');
  tip.innerHTML = '<div class="machine-tip-box"></div>' +
    '<svg class="machine-tip-arrow" width="12.1244" height="10.5" viewBox="0 0 12.1244 10.5" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M6.06218 10.5L12.1244 0H0L6.06218 10.5Z" fill="#818181"/></svg>';
  document.body.appendChild(tip);
  var box = tip.querySelector('.machine-tip-box');
  var arrow = tip.querySelector('.machine-tip-arrow');

  // Static descriptions so assistive tech announces them on focus.
  Array.prototype.forEach.call(links, function (a) {
    var key = a.getAttribute('data-machine-tip');
    var d = document.createElement('span');
    d.className = 'machine-tip-sr';
    d.id = 'machine-tip-' + key + '-' + Math.random().toString(36).slice(2, 7);
    d.textContent = COPY[key] || '';
    document.body.appendChild(d);
    a.setAttribute('aria-describedby', d.id);
  });

  // The tooltip uses Kode Mono, which only the machine pages load by default.
  var fontLoaded = false;
  function loadFont() {
    if (fontLoaded) return;
    fontLoaded = true;
    var l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Kode+Mono:wght@400&display=swap';
    document.head.appendChild(l);
  }

  var current = null;
  var lastType = 'mouse'; // 'mouse' | 'touch' | 'key'

  function tipLink(t) {
    return t && t.closest ? t.closest('a[data-machine-tip]') : null;
  }

  function place(x, rect) {
    var w = tip.offsetWidth, h = tip.offsetHeight;
    var left = Math.max(8, Math.min(innerWidth - w - 8, x - w / 2));
    tip.style.transform = 'translate(' + Math.round(left) + 'px,' + Math.round(rect.top - h - 4) + 'px)';
    arrow.style.transform = 'translateX(' + Math.round(x - (left + w / 2)) + 'px)';
  }

  function rectAt(a, y) {
    var rs = a.getClientRects();
    for (var i = 0; i < rs.length; i++) if (y >= rs[i].top && y <= rs[i].bottom) return rs[i];
    return rs[0] || a.getBoundingClientRect();
  }

  function show(a, x, y) {
    loadFont();
    current = a;
    box.textContent = COPY[a.getAttribute('data-machine-tip')] || '';
    tip.setAttribute('aria-hidden', 'false');
    place(x, rectAt(a, y));
    tip.classList.add('show');
  }

  function showAtLink(a) {
    var r = a.getBoundingClientRect();
    show(a, r.left + r.width / 2, r.top + r.height / 2);
  }

  function hide() {
    current = null;
    tip.classList.remove('show');
    tip.setAttribute('aria-hidden', 'true');
  }

  document.addEventListener('pointerdown', function (e) {
    lastType = e.pointerType === 'touch' ? 'touch' : 'mouse';
    if (lastType === 'touch' && current && !current.contains(e.target)) hide();
  }, true);
  document.addEventListener('keydown', function () { lastType = 'key'; }, true);

  document.addEventListener('mouseover', function (e) {
    if (lastType === 'touch') return; // compatibility mouse events after a tap
    var a = tipLink(e.target);
    if (a) show(a, e.clientX, e.clientY); else if (current) hide();
  });
  document.addEventListener('mousemove', function (e) {
    if (current && lastType !== 'touch') place(e.clientX, rectAt(current, e.clientY));
  });
  document.addEventListener('mouseout', function (e) {
    if (lastType === 'touch') return;
    if (current && !(e.relatedTarget && current.contains(e.relatedTarget))) hide();
  });
  document.addEventListener('focusin', function (e) {
    if (lastType === 'touch') return;
    var a = tipLink(e.target);
    if (a) showAtLink(a);
  });
  document.addEventListener('focusout', hide);
  document.addEventListener('click', function (e) {
    if (lastType !== 'touch') return;
    var a = tipLink(e.target);
    if (a && current !== a) { e.preventDefault(); showAtLink(a); }
  }, true);
  addEventListener('scroll', hide, { passive: true });
})();
