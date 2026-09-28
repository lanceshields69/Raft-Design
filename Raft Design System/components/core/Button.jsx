import React, { useState } from 'react';

/* .scan-cta — the pill-outline button in the system. Transparent with a
   brand border; inverts to a solid brand-green fill with ink text on
   hover. --wide swaps the horizontal padding to 60px (banner/hero CTAs).
   arrowRotate covers the one structural variant that reuses this same
   shell: the hero's "scroll down" CTA, which is just this component with
   its arrow rotated 90deg (.hero-scroll-arrow) — not a separate component.
   For the light-mode-inverted solid button (.cta-solid-button, "Connect"/
   "Book a call"), use SolidButton instead — it's a different shape with
   no hover-invert, so it isn't a variant of this one. */
export function Button({ children, wide = false, arrow = true, arrowRotate = 0, href, onClick, type = 'button', disabled = false, style }) {
  const [hover, setHover] = useState(false);
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: 'var(--space-sm)', flexShrink: 0,
    padding: wide ? '20px var(--space-xxxl)' : '20px 30px',
    border: '1px solid var(--border-button)', borderRadius: 'var(--radius-pill)',
    background: hover && !disabled ? 'var(--bg-brand)' : 'none',
    color: hover && !disabled ? 'var(--accent-ink)' : 'var(--text-primary)',
    fontFamily: 'inherit', fontSize: 'var(--font-size-body-lg)',
    lineHeight: 'var(--line-height-heading)', fontWeight: 'var(--weight-regular)',
    cursor: disabled ? 'default' : 'pointer', opacity: disabled ? 0.4 : 1,
    transition: 'background .2s, color .2s', textDecoration: 'none', ...style
  };
  const inner = [
    arrow ? React.createElement('span', { key: 'a', style: { fontWeight: 'var(--weight-bold)', display: 'inline-block', transform: arrowRotate ? `rotate(${arrowRotate}deg)` : undefined } }, '→') : null,
    children
  ];
  if (href) return React.createElement('a', { href, style: base, onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false) }, inner);
  return React.createElement('button', { type, onClick, disabled, style: base, onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false) }, inner);
}
