// A small pixel alphabet lets the machine-page wordmark change its letterforms
// without ever replacing the readable, static HTML fallback.
(function () {
  const stage = document.querySelector('.logo-stage');
  const svg = stage?.querySelector('.logo-morph');
  if (!stage || !svg) return;

  const NS = 'http://www.w3.org/2000/svg';
  const STEP = 30;
  const HOLD_MS = 3000;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const cases = ['RAFT', 'RAFT', 'Raft', 'Raft', 'raft'];
  const styles = ['regular', 'heavy', 'light', 'italic', 'slab'];
  const googleFonts = {
    fraunces: { family: 'Fraunces', category: 'serif', threshold: 0.1 },
    space: { family: 'Space Grotesk', category: 'sans serif', threshold: 0.13 },
    bungee: { family: 'Bungee', category: 'display', threshold: 0.15 },
    caveat: { family: 'Caveat', category: 'handwriting', threshold: 0.055 }
  };
  const readyFonts = new Set();
  const fontQueue = [];
  let variationDeck = [];
  // This bitmap is the five-row wordmark already printed in /ai/index.html.
  // Each bit represents one original two-character block (██).
  const original = [
    '1110001100111101111',
    '100101001010000011',
    '111001111011100011',
    '101001001010000011',
    '100101001010000011'
  ];
  const glyphs = {
    R: {
      regular: ['11110', '10001', '10001', '11110', '10100', '10010', '10001'],
      heavy:   ['11111', '11011', '11011', '11110', '11100', '11010', '11011'],
      slab:    ['11111', '10001', '10001', '11110', '10100', '10010', '11011']
    },
    A: {
      regular: ['01110', '10001', '10001', '11111', '10001', '10001', '10001'],
      heavy:   ['01110', '11011', '11011', '11111', '11011', '11011', '11011'],
      slab:    ['01110', '11011', '10001', '11111', '10001', '10001', '11011']
    },
    F: {
      regular: ['11111', '10000', '10000', '11110', '10000', '10000', '10000'],
      heavy:   ['11111', '11000', '11000', '11110', '11000', '11000', '11000'],
      slab:    ['11111', '11000', '10000', '11110', '10000', '10000', '11000']
    },
    T: {
      regular: ['11111', '00100', '00100', '00100', '00100', '00100', '00100'],
      heavy:   ['11111', '01110', '01110', '01110', '01110', '01110', '01110'],
      slab:    ['11111', '01110', '00100', '00100', '00100', '00100', '01110']
    },
    r: { regular: ['00000', '00000', '10110', '11001', '10000', '10000', '10000'] },
    a: { regular: ['00000', '00000', '01110', '00001', '01111', '10001', '01111'] },
    f: { regular: ['00110', '01001', '01000', '11100', '01000', '01000', '01000'] },
    t: { regular: ['00100', '00100', '11110', '00100', '00100', '00101', '00010'] }
  };

  let timeouts = [];
  let frame = 0;
  let lastSignature = '';
  let cycleCount = 0;

  function later(fn, delay) {
    timeouts.push(setTimeout(fn, delay));
  }

  function stop() {
    timeouts.forEach(clearTimeout);
    timeouts = [];
    cancelAnimationFrame(frame);
  }

  function choice(items) {
    return items[Math.floor(Math.random() * items.length)];
  }

  function shuffle(items) {
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    return items;
  }

  function nextVariation() {
    if (fontQueue.length) return fontQueue.shift();
    if (!variationDeck.length) variationDeck = shuffle([...styles, ...readyFonts]);
    return variationDeck.pop();
  }

  function composition(baseStyle) {
    let letters, forms, signature;
    do {
      letters = choice(cases);
      forms = [...letters].map(() => Math.random() < 0.75 ? baseStyle : choice(styles));
      signature = letters + '/' + forms.join('-');
    } while (signature === lastSignature);
    lastSignature = signature;
    return { letters, forms };
  }

  function draw(letters, forms, visible) {
    svg.replaceChildren();
    const pixels = [];
    [...letters].forEach((letter, letterIndex) => {
      const style = forms[letterIndex];
      const pattern = glyphs[letter][style] || glyphs[letter].regular;
      pattern.forEach((line, row) => {
        [...line].forEach((bit, col) => {
          if (bit !== '1') return;
          const rect = document.createElementNS(NS, 'rect');
          const inset = style === 'light' ? 4 : 1;
          const width = style === 'light' ? 22 : style === 'heavy' ? 30 : 28;
          const height = style === 'light' ? 22 : style === 'heavy' ? 30 : 28;
          const spacing = style === 'light' ? 32 : style === 'slab' ? 29 : STEP;
          const slant = style === 'italic' ? (6 - row) * 3 : 0;
          const x = letterIndex * 7 * STEP + col * spacing + inset + slant;
          const y = row * STEP + inset;
          rect.setAttribute('x', x);
          rect.setAttribute('y', y);
          rect.setAttribute('width', width);
          rect.setAttribute('height', height);
          rect.classList.add('logo-pixel');
          if (visible) rect.classList.add('is-on');
          svg.appendChild(rect);
          pixels.push({ element: rect, progress: (letterIndex * 5 + col) / 19, rowProgress: row / 6 });
        });
      });
    });
    stage.classList.add('is-enhanced');
    return pixels;
  }

  function drawOriginal(visible) {
    svg.replaceChildren();
    const pixels = [];
    const blockWidth = 810 / 19;
    const blockHeight = 210 / 5;
    original.forEach((line, row) => {
      [...line].forEach((bit, col) => {
        if (bit !== '1') return;
        const rect = document.createElementNS(NS, 'rect');
        rect.setAttribute('x', col * blockWidth);
        rect.setAttribute('y', row * blockHeight);
        rect.setAttribute('width', blockWidth);
        rect.setAttribute('height', blockHeight);
        rect.classList.add('logo-pixel');
        if (visible) rect.classList.add('is-on');
        svg.appendChild(rect);
        pixels.push({ element: rect, progress: col / 18, rowProgress: row / 4 });
      });
    });
    stage.classList.add('is-enhanced');
    return pixels;
  }

  function drawGoogleFont(key) {
    const font = googleFonts[key];
    const canvas = document.createElement('canvas');
    canvas.width = 810;
    canvas.height = 210;
    const context = canvas.getContext('2d', { willReadFrequently: true });
    if (!context) return drawOriginal(false);
    const word = choice(cases);
    context.font = `700 190px "${font.family}"`;
    context.fillStyle = '#fff';
    const metrics = context.measureText(word);
    const ascent = metrics.actualBoundingBoxAscent || 190 * 0.75;
    const descent = metrics.actualBoundingBoxDescent || 190 * 0.2;
    const inkWidth = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight || metrics.width;
    const targetWidth = 690;
    const targetHeight = 165;
    context.save();
    context.translate((canvas.width - targetWidth) / 2, (canvas.height - targetHeight) / 2);
    context.scale(targetWidth / inkWidth, targetHeight / (ascent + descent));
    context.fillText(word, metrics.actualBoundingBoxLeft || 0, ascent);
    context.restore();

    svg.replaceChildren();
    const pixels = [];
    const image = context.getImageData(0, 0, canvas.width, canvas.height).data;
    const columns = 54;
    const rows = 14;
    const cell = 15;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        let coverage = 0;
        for (let y = 0; y < cell; y += 3) {
          for (let x = 0; x < cell; x += 3) {
            const index = ((row * cell + y) * canvas.width + col * cell + x) * 4 + 3;
            coverage += image[index] / 255;
          }
        }
        if (coverage / 25 < font.threshold) continue;
        const rect = document.createElementNS(NS, 'rect');
        rect.setAttribute('x', col * cell);
        rect.setAttribute('y', row * cell);
        rect.setAttribute('width', cell - 0.7);
        rect.setAttribute('height', cell - 0.7);
        rect.classList.add('logo-pixel');
        svg.appendChild(rect);
        pixels.push({ element: rect, progress: col / (columns - 1), rowProgress: row / (rows - 1) });
      }
    }
    stage.classList.add('is-enhanced');
    return pixels;
  }

  function revealInOrder(entries, turnOn, done) {
    const ordered = entries.sort((a, b) => a.at - b.at);
    const started = performance.now();
    let next = 0;
    function tick(now) {
      while (next < ordered.length && ordered[next].at <= now - started) {
        ordered[next].element.classList.toggle('is-on', turnOn);
        next++;
      }
      if (next < ordered.length) frame = requestAnimationFrame(tick);
      else done();
    }
    frame = requestAnimationFrame(tick);
  }

  function cycle() {
    stop();
    if (document.hidden || reducedMotion.matches) return;
    const useOriginal = cycleCount++ % 5 === 0;
    const variation = useOriginal ? 'original' : nextVariation();
    svg.dataset.variation = variation;
    svg.dataset.category = googleFonts[variation]?.category || 'pixel';
    const pixels = useOriginal
      ? drawOriginal(false)
      : googleFonts[variation]
        ? drawGoogleFont(variation)
        : (() => {
            const { letters, forms } = composition(variation);
            return draw(letters, forms, false);
          })();
    const build = pixels.map((pixel) => ({
      element: pixel.element,
      at: pixel.progress * 1450 + pixel.rowProgress * 240 + Math.random() * 420
    }));
    revealInOrder(build, true, () => {
      // Allow the last block's short transition to finish, then hold three seconds.
      later(() => {
        const scattered = shuffle([...pixels]);
        const clear = scattered.map((pixel, index) => ({
          element: pixel.element,
          at: index / scattered.length * 520
        }));
        revealInOrder(clear, false, () => later(cycle, 180));
      }, HOLD_MS + 180);
    });
  }

  function start() {
    stop();
    if (reducedMotion.matches) {
      svg.dataset.variation = 'original';
      drawOriginal(true);
    } else if (!document.hidden) {
      cycle();
    }
  }

  document.addEventListener('visibilitychange', start);
  reducedMotion.addEventListener('change', start);

  Object.entries(googleFonts).forEach(([key, font]) => {
    document.fonts.load(`700 190px "${font.family}"`, 'RAFTraft').then((faces) => {
      if (!faces.length) return;
      readyFonts.add(key);
      fontQueue.push(key);
    }).catch(() => {
      // Keep the locally drawn pixel variants if a Google font is unavailable.
    });
  });

  // The machine page streams its text on a first visit. Begin the logo once
  // that existing entrance has finished so the first build is visible.
  if (document.documentElement.classList.contains('stream')) {
    const observer = new MutationObserver(() => {
      if (document.documentElement.classList.contains('stream')) return;
      observer.disconnect();
      start();
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  } else {
    start();
  }
})();
