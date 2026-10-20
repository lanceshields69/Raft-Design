// Compact SoundCloud soundtrack alongside the human home page's chat dock.
(() => {
  const group = document.getElementById('home-audio');
  const button = document.getElementById('home-audio-toggle');
  const frame = document.getElementById('home-audio-frame');
  const form = document.querySelector('.raft-chat-form');
  const launcher = document.getElementById('showreel-launcher');
  if (!group || !button || !frame) return;

  let launcherObstructing = launcher?.classList.contains('visible') || false;
  let launcherHideTimer;

  function position() {
    if (!form) return;
    const formRect = form.getBoundingClientRect();
    const groupRect = group.getBoundingClientRect();
    const viewportHeight = document.documentElement.clientHeight;
    const viewportWidth = document.documentElement.clientWidth;
    const besideLeft = formRect.right + 16;
    const beside = besideLeft + groupRect.width <= viewportWidth - 16;
    group.style.left = `${beside ? besideLeft : Math.max(16, Math.min(formRect.right - groupRect.width, viewportWidth - groupRect.width - 16))}px`;
    group.style.bottom = `${beside
      ? Math.max(16, viewportHeight - formRect.top - (formRect.height + groupRect.height) / 2)
      : viewportHeight - formRect.top + 14}px`;

    // On narrow screens both controls occupy the space above the chat dock.
    // Keep the soundtrack above the floating video preview when it appears.
    if (launcher && launcherObstructing) {
      const audioRect = group.getBoundingClientRect();
      const videoRect = launcher.getBoundingClientRect();
      const videoTop = viewportHeight - parseFloat(getComputedStyle(launcher).bottom) - launcher.offsetHeight;
      const overlap = audioRect.right > videoRect.left && audioRect.left < videoRect.right
        && audioRect.bottom > videoTop && audioRect.top < videoTop + launcher.offsetHeight;
      if (overlap) group.style.bottom = `${viewportHeight - videoTop + 14}px`;
    }
  }
  position();
  window.addEventListener('resize', position);
  if (window.ResizeObserver && form) new ResizeObserver(position).observe(form);
  if (launcher) new MutationObserver(() => {
    if (launcher.classList.contains('visible')) {
      clearTimeout(launcherHideTimer);
      launcherObstructing = true;
      position();
    } else if (launcherObstructing) {
      // Let the video finish fading out before moving into its old space.
      clearTimeout(launcherHideTimer);
      launcherHideTimer = setTimeout(() => {
        launcherObstructing = false;
        position();
      }, 600);
    }
  }).observe(launcher, { attributes: true, attributeFilter: ['class', 'style'] });
  document.fonts?.ready.then(position);

  let playing = false;
  let ready = false;
  let userStopped = false;
  let pendingPlay = false;
  let showreelOpen = false;
  let resumeAfterShowreel = false;
  let leavingPage = false;
  let resumeOnReturn = false;

  function render() {
    button.classList.toggle('is-playing', playing);
    button.setAttribute('aria-pressed', String(playing));
    button.setAttribute('aria-label', playing ? 'Stop soundtrack' : 'Play soundtrack');
    button.title = playing ? 'Stop soundtrack' : 'Play soundtrack';
  }

  function unavailable() {
    playing = false;
    render();
    button.disabled = true;
    button.setAttribute('aria-label', 'Soundtrack unavailable');
    button.title = 'Soundtrack unavailable — open the SoundCloud link';
  }

  if (!window.SC?.Widget) {
    unavailable();
    return;
  }

  // Bind immediately after loading the player so its READY event is captured.
  frame.src = frame.dataset.src;
  const widget = window.SC.Widget(frame);
  const events = window.SC.Widget.Events;

  widget.bind(events.PLAY, () => {
    if (showreelOpen || leavingPage) {
      widget.pause();
      return;
    }
    playing = true;
    render();
  });
  widget.bind(events.PAUSE, () => {
    playing = false;
    render();
  });
  widget.bind(events.FINISH, () => {
    playing = false;
    userStopped = true;
    widget.seekTo(0);
    render();
  });
  widget.bind(events.ERROR, unavailable);
  widget.bind(events.READY, () => {
    ready = true;
    widget.setVolume(55);
    if (showreelOpen || leavingPage) {
      widget.pause();
      return;
    }
    widget.isPaused((paused) => {
      if (showreelOpen || leavingPage) return;
      if (paused === false) {
        playing = true;
        render();
      } else if (!showreelOpen && (!userStopped || pendingPlay)) {
        widget.play();
      }
      pendingPlay = false;
    });
  });

  button.addEventListener('click', () => {
    if (playing) {
      userStopped = true;
      widget.pause();
      widget.seekTo(0);
      playing = false;
      render();
    } else {
      userStopped = false;
      pendingPlay = true;
      if (ready) {
        widget.play();
        pendingPlay = false;
      }
    }
  });

  window.addEventListener('raft:showreel-open', () => {
    showreelOpen = true;
    resumeAfterShowreel = !userStopped;
    pendingPlay = false;
    if (ready) widget.pause();
    playing = false;
    render();
  });

  window.addEventListener('raft:showreel-closed', () => {
    showreelOpen = false;
    if (resumeAfterShowreel) {
      if (ready) widget.play();
      else pendingPlay = true;
    }
    resumeAfterShowreel = false;
  });

  function pauseForNavigation() {
    resumeOnReturn = resumeOnReturn || (playing && !userStopped);
    pendingPlay = false;
    if (ready) widget.pause();
    playing = false;
    render();
  }

  // Flow has its own soundtrack. Pause before its cross-document transition,
  // and also when leaving by any other route or browser navigation.
  document.querySelector('.raft-message-expand')?.addEventListener('click', (event) => {
    if (event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
      pauseForNavigation();
    }
  });
  window.addEventListener('pagehide', () => {
    leavingPage = true;
    pauseForNavigation();
  });
  window.addEventListener('pageshow', (event) => {
    if (!event.persisted) return;
    leavingPage = false;
    if (resumeOnReturn && !userStopped) {
      if (ready) widget.play();
      else pendingPlay = true;
    }
    resumeOnReturn = false;
  });

  // Audible autoplay can be blocked. A first gesture on the page retries it.
  function startAfterGesture(event) {
    if (!ready || playing || userStopped || showreelOpen || leavingPage || button.contains(event.target) || event.target?.closest?.('a')) return;
    widget.isPaused((paused) => {
      if (paused === true && !userStopped) widget.play();
    });
    window.removeEventListener('pointerdown', startAfterGesture);
    window.removeEventListener('keydown', startAfterGesture);
  }
  window.addEventListener('pointerdown', startAfterGesture);
  window.addEventListener('keydown', startAfterGesture);

  render();
})();
