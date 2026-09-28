import React from 'react';

/* .service-card — Expertise/Build section card: title, body, green arrow tag line.
   No border, no fill; it's a text block on the canvas. */
export function ServiceCard({ title, body, tagline, width = 480, style }) {
  return React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 13, width, maxWidth: '100%', ...style } }, [
    React.createElement('p', { key: 't', style: { fontSize: 'var(--font-size-heading-2)', fontWeight: 'var(--weight-black)', lineHeight: 0.95, color: 'var(--text-primary)' } }, title),
    React.createElement('p', { key: 'b', style: { fontSize: 'var(--font-size-body-md)', lineHeight: 1.4, color: 'var(--text-primary)' } }, body),
    tagline ? React.createElement('p', { key: 'g', style: { fontSize: 'var(--font-size-body-md)', lineHeight: 1.4, fontWeight: 'var(--weight-semibold)', color: 'var(--text-accent)' } }, '\u2192 ' + tagline) : null
  ]);
}
