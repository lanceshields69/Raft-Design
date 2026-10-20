// SoundCloud soundtrack behind the right-edge player on the human home page.
(() => {
  const button = document.getElementById('home-audio-toggle');
  const frame = document.getElementById('home-audio-frame');
  const wave = document.getElementById('home-audio-wave');
  if (!button || !frame) return;
  const playLabel = button.dataset.playLabel || 'Play soundtrack';
  const stopLabel = button.dataset.stopLabel || 'Stop soundtrack';
  const unavailableLabel = button.dataset.unavailableLabel || 'Soundtrack unavailable';
  const unavailableTitle = button.dataset.unavailableTitle || 'Soundtrack unavailable — open the SoundCloud link';

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
    wave?.classList.toggle('is-playing', playing);
    button.setAttribute('aria-pressed', String(playing));
    button.setAttribute('aria-label', playing ? stopLabel : playLabel);
    button.title = playing ? stopLabel : playLabel;
  }

  function unavailable() {
    playing = false;
    render();
    button.disabled = true;
    button.setAttribute('aria-label', unavailableLabel);
    button.title = unavailableTitle;
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
