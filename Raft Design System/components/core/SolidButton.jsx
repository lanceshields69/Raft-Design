import React from 'react';

/* .cta-solid-button — the light-mode-inverted solid button ("Book a
   consultation" on the Connect panel). Not a variant of Button: no
   hover-invert (it's already solid), and its two colors flip together
   between themes rather than each having its own token — dark mode is a
   pure-white pill with black text, light mode is pure black with white
   text. Hover is a flat opacity fade in both themes (a black button can't
   get any darker, so the dark-mode "fade toward transparent" direction
   would go the wrong way against a white canvas). */
export function SolidButton({ children, arrow = true, href, onClick, type = 'button', style }) {
  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    gap: 'var(--space-sm)', flexShrink: 0,
    padding: '20px 60px', border: 'none', borderRadius: 'var(--radius-pill)',
    background: 'var(--pure-white)', color: 'var(--pure-black)',
    fontFamily: 'inherit', fontSize: 'var(--font-size-body-lg)',
    lineHeight: 'var(--line-height-heading)', fontWeight: 'var(--weight-regular)',
    cursor: 'pointer', transition: 'opacity 0.2s', textDecoration: 'none', ...style
  };
  const inner = [children, arrow ? React.createElement('span', { key: 'a', style: { fontWeight: 'var(--weight-bold)' } }, '→') : null];
  if (href) return React.createElement('a', { href, style: base }, inner);
  return React.createElement('button', { type, onClick, style: base }, inner);
}
