import React from 'react';
import { TextLink } from '../core/TextLink.jsx';

/* .journal-card (index, borderless) and .journal-carousel-card (homepage,
   bordered 440px card with a 10% dark scrim over the image). */
export function JournalCard({ image, title, excerpt, href = '#', variant = 'index', linkLabel = 'Read on Substack', style }) {
  if (variant === 'carousel') {
    return React.createElement('a', { href, style: {
      flex: '0 0 auto', width: 440, maxWidth: '82vw', display: 'flex', flexDirection: 'column',
      border: '1px solid var(--border-rule)', background: 'var(--bg-canvas)', textDecoration: 'none', color: 'inherit', ...style
    } }, [
      React.createElement('div', { key: 'w', style: { position: 'relative', width: '100%', height: 280 } }, [
        React.createElement('img', { key: 'i', src: image, alt: '', style: { width: '100%', height: '100%', objectFit: 'cover', display: 'block' } }),
        React.createElement('div', { key: 's', style: { position: 'absolute', inset: 0, background: 'rgb(from var(--dark) r g b / 10%)' } })
      ]),
      React.createElement('div', { key: 'b', style: { display: 'flex', flexDirection: 'column', gap: 10, padding: 'var(--space-lg)' } }, [
        React.createElement('p', { key: 't', style: { fontSize: 18, lineHeight: '26px', color: 'var(--text-primary)' } }, title),
        React.createElement('p', { key: 'l', style: { fontSize: 14, color: 'var(--text-accent)' } }, '\u2192 Read')
      ])
    ]);
  }
  return React.createElement('a', { href, style: { display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', flex: '0 1 calc(50% - 30px)', minWidth: 0, textDecoration: 'none', color: 'inherit', ...style } }, [
    React.createElement('img', { key: 'i', src: image, alt: '', style: { width: '100%', height: 'auto', aspectRatio: '2000 / 1307', objectFit: 'cover', display: 'block' } }),
    React.createElement('p', { key: 't', style: { fontSize: 'var(--font-size-heading-2)', fontWeight: 'var(--weight-black)', lineHeight: 'var(--line-height-heading-large)', color: 'var(--text-primary)' } }, title),
    excerpt ? React.createElement('p', { key: 'e', style: { fontSize: 'var(--font-size-body-md)', lineHeight: 'var(--line-height-body)', color: 'var(--text-primary)' } }, excerpt) : null,
    React.createElement(TextLink, { key: 'l', arrow: 'leading', href, style: { marginTop: 'var(--space-sm)', fontSize: 'var(--font-size-body-md)', fontWeight: 'var(--weight-semibold)' } }, linkLabel)
  ]);
}
