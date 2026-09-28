import React from 'react';

/* .work-card — Projects index card: 2000x1307 image, square corners, 28px title. */
export function WorkCard({ image, title, href = '#', alt = '', style }) {
  return React.createElement('a', { href, style: { display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', flex: '1 0 0', minWidth: 0, textDecoration: 'none', color: 'inherit', ...style } }, [
    React.createElement('img', { key: 'i', src: image, alt, style: { width: '100%', height: 'auto', aspectRatio: '2000 / 1307', objectFit: 'cover', display: 'block' } }),
    React.createElement('p', { key: 't', style: { fontSize: 'var(--font-size-heading-2)', fontWeight: 'var(--weight-black)', lineHeight: 'var(--line-height-heading-large)', letterSpacing: 0, color: 'var(--text-primary)' } }, title)
  ]);
}
