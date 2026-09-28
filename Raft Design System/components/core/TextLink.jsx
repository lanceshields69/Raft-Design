import React, { useState } from 'react';

/* .text-link — muted label with a brand-green arrow; brightens on hover. */
export function TextLink({ children, href = '#', large = false, arrow = 'trailing', style }) {
  const [hover, setHover] = useState(false);
  const a = React.createElement('span', { key: 'a', style: { color: 'var(--text-accent)' } }, '\u2192');
  return React.createElement('a', {
    href, onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false),
    style: {
      display: 'inline-flex', alignItems: 'center', gap: 3,
      color: hover ? 'var(--text-primary)' : 'var(--text-muted)',
      fontSize: 'var(--font-size-body-lg)', fontWeight: 'var(--weight-medium)',
      letterSpacing: large ? '-0.6px' : 0, transition: 'color .2s', ...style
    }
  }, arrow === 'leading' ? [a, children] : [children, a]);
}
