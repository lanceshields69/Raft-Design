// The SoundCloud widget supplies the audio behind the machine page's edge tab.
(() => {
  const button = document.getElementById('ai-audio-toggle');
  const frame = document.getElementById('ai-audio-frame');
  const wave = document.getElementById('ai-audio-wave');
  if (!button || !frame) return;
  const playLabel = button.dataset.playLabel || 'Play soundtrack';
  const stopLabel = button.dataset.stopLabel || 'Stop soundtrack';
  const unavailableLabel = button.dataset.unavailableLabel || 'Soundtrack unavailable';
  const unavailableTitle = button.dataset.unavailableTitle || 'Soundtrack unavailable — open the SoundCloud song link';

  let playing = false;
  let ready = false;
  let userStopped = false;
  let pendingPlay = false;
  let playlistEnded = false;

  function render() {
    button.classList.toggle('is-playing', playing);
    wave?.classList.toggle('is-playing', playing);
    button.setAttribute('aria-pressed', String(playing));
    button.setAttribute('aria-label', playing ? stopLabel : playLabel);
    button.title = playing ? stopLabel : playLabel;
  }

  function unavailable() {
    playing = false;
    button.classList.remove('is-playing');
    wave?.classList.remove('is-playing');
    button.disabled = true;
    button.setAttribute('aria-pressed', 'false');
    button.setAttribute('aria-label', unavailableLabel);
    button.title = unavailableTitle;
  }

  if (!window.SC?.Widget) {
    unavailable();
    return;
  }

  // Set the source immediately before binding so the READY event is captured.
  frame.src = frame.dataset.src;
  const widget = window.SC.Widget(frame);
  const events = window.SC.Widget.Events;

  widget.bind(events.PLAY, () => {
    playlistEnded = false;
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
    playlistEnded = true;
    widget.seekTo(0);
    render();
  });
  widget.bind(events.ERROR, unavailable);
  widget.bind(events.READY, () => {
    ready = true;
    widget.setVolume(55);
    widget.isPaused((paused) => {
      if (paused === false) {
        playing = true;
        render();
      } else if (!userStopped || pendingPlay) {
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
        if (playlistEnded) widget.skip(0);
        widget.play();
        playlistEnded = false;
        pendingPlay = false;
      }
    }
  });

  // Browsers may block audible autoplay. A first interaction elsewhere on the
  // page can start it; the control itself always works without this fallback.
  function startAfterGesture(event) {
    if (!ready || playing || userStopped || button.contains(event.target) || event.target?.closest?.('a')) return;
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
