// Random glitch bursts on the pixel logo: rows slide sideways, a few
// pixels drop out, and the color splits for a few frames. Skipped for
// reduced motion; pauses while the tab is hidden. Dispatch a "glitch"
// event on .logo to trigger one on demand.
(function () {
  var logo = document.querySelector('.logo');
  if (!logo || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var rows = logo.textContent.split('\n');
  logo.textContent = '';
  var lines = rows.map(function (txt) {
    var el = document.createElement('span');
    el.className = 'gl-line';
    el.textContent = txt;
    logo.appendChild(el);
    return { el: el, txt: txt };
  });
  var DROP = ['\u2592', '\u2591', ' '];

  function frame(on) {
    lines.forEach(function (l) {
      if (!on) { l.el.style.transform = ''; l.el.textContent = l.txt; return; }
      var shift = Math.random() < 0.55 ? Math.round((Math.random() * 2 - 1) * 22) : 0;
      l.el.style.transform = shift ? 'translateX(' + shift + 'px)' : '';
      l.el.textContent = l.txt.replace(/\u2588/g, function (c) {
        return Math.random() < 0.05 ? DROP[Math.floor(Math.random() * DROP.length)] : c;
      });
    });
    logo.classList.toggle('glitching', on);
  }

  var running = false;
  function burst() {
    if (running) return;
    running = true;
    var n = 5 + Math.floor(Math.random() * 5), i = 0;
    (function step() {
      if (i++ < n) { frame(true); setTimeout(step, 40 + Math.random() * 40); }
      else { frame(false); running = false; }
    })();
  }

  function schedule() {
    setTimeout(function () {
      if (!document.hidden) {
        burst();
        if (Math.random() < 0.3) setTimeout(burst, 380);
      }
      schedule();
    }, 2500 + Math.random() * 5500);
  }

  logo.addEventListener('glitch', burst);
  schedule();
})();
