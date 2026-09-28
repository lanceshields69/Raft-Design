import React from 'react';

/* .showreel-launcher — the floating video-preview panel (Figma node
   793:5157) fixed bottom-right of the home hero, revealed once #approach
   scrolls into view. It plays a silent looping preview clip; clicking it
   is what the source morphs into a fullscreen custom video player with
   sound on (the click supplies the user gesture browsers require for
   unmuted autoplay).

   This component models the launcher panel only — the reusable,
   presentational piece. The fullscreen playback shell it morphs into
   (.showreel-overlay: a FLIP position/size morph, play/pause, mute,
   scrub progress bar, close) is bespoke interaction logic built for this
   one home-hero video, not a generalizable component; reproduce it as a
   page-specific behavior, the way the live site does, rather than
   forcing it into a reusable "VideoModal." */
export function ShowreelLauncher({ videoSrc, label = 'Play showreel', onClick, style }) {
  return React.createElement('div', {
    role: 'button', tabIndex: 0, 'aria-label': label, onClick,
    style: {
      position: 'fixed', right: 'clamp(12px, 4vw, 24px)', bottom: 30,
      width: 'clamp(160px, 42vw, 300px)', borderRadius: 24,
      border: '4px solid var(--pure-white)', overflow: 'hidden', cursor: 'pointer',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.35)', fontFamily: 'var(--font-sans)', ...style
    }
  }, [
    React.createElement('div', { key: 'media', style: { position: 'relative', width: '100%', aspectRatio: '366 / 209' } },
      videoSrc ? React.createElement('video', { src: videoSrc, autoPlay: true, muted: true, loop: true, playsInline: true, 'aria-hidden': true, style: { width: '100%', height: '100%', objectFit: 'cover', display: 'block' } }) : null),
    React.createElement('span', {
      key: 'cta',
      style: {
        position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
        display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 22px', borderRadius: 999,
        background: 'rgba(216, 216, 216, 0.3)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        color: 'var(--pure-white)', fontSize: 13, fontWeight: 600, letterSpacing: '-0.13px', whiteSpace: 'nowrap'
      }
    }, label)
  ]);
}
