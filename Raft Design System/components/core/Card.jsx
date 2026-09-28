import React from 'react';

/* Card — elevated background, 1px rule border, md radius, lg padding.
   'sunken' is the recessed banner treatment (darker fill, bright border). */
export function Card({ children, tone = 'elevated', padding = 'var(--space-lg)', style }) {
  return React.createElement('div', { style: {
    display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', padding,
    background: tone === 'sunken' ? 'var(--bg-sunken)' : tone === 'canvas' ? 'var(--bg-canvas)' : 'var(--bg-elevated)',
    border: '1px solid ' + (tone === 'sunken' ? 'var(--border-bright)' : 'var(--border-rule)'),
    borderRadius: tone === 'sunken' ? 0 : 'var(--radius-md)', ...style
  } }, children);
}
