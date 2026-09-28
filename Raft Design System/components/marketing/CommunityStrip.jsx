import React from 'react';

/* .community-strip — full-bleed surface bar: round lime icon, one line of
   text, trailing green arrow. Whole strip is one link, fades to 85% on hover. */
export function CommunityStrip({ text, icon, assetBase = 'assets/', href = '#', style }) {
  const glyph = icon || assetBase + 'services-diamond.svg';
  return React.createElement('div', { style: { width: '100%', background: 'var(--bg-surface)', padding: 'var(--space-lg) 0', ...style } },
    React.createElement('a', { href, style: {
      display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--space-md)',
      textDecoration: 'none', color: 'inherit', transition: 'opacity .2s',
      maxWidth: 1200, margin: '0 auto', paddingLeft: 'var(--space-xl)', paddingRight: 'var(--space-xl)'
    } }, [
      React.createElement('span', { key: 'i', style: {
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        width: 36, height: 36, borderRadius: 'var(--radius-pill)',
        background: 'var(--bg-brand)', color: 'var(--accent-ink)'
      } }, React.createElement('img', { src: glyph, width: 14, height: 14, alt: '', style: { width: 14, height: 14 } })),
      React.createElement('p', { key: 't', style: { flex: '0 1 auto', fontSize: 'var(--font-size-body-md)', lineHeight: 'var(--line-height-body)', color: 'var(--text-primary)' } }, text),
      React.createElement('span', { key: 'a', style: { flexShrink: 0, fontWeight: 'var(--weight-black)', fontSize: 'var(--font-size-body-lg)', color: 'var(--bg-brand)' } }, '\u2192')
    ])
  );
}
