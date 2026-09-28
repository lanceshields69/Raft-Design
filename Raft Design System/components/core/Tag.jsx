import React from 'react';

/* .tool-card-tag — category tag: surface fill, rule border, sm radius,
   11px/900 uppercase accent text. */
export function Tag({ children, style }) {
  return React.createElement('span', { style: {
    display: 'inline-flex', alignItems: 'center', alignSelf: 'flex-start',
    padding: 'var(--space-xs) var(--space-12)', background: 'var(--bg-surface)',
    border: '1px solid var(--border-rule)', borderRadius: 'var(--radius-sm)',
    fontSize: 'var(--font-size-label-small)', fontWeight: 'var(--weight-black)',
    letterSpacing: 'var(--tracking-eyebrow)', lineHeight: 1.5,
    textTransform: 'uppercase', color: 'var(--text-accent)', ...style
  } }, children);
}
