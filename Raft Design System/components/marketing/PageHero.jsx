import React from 'react';

/* .work-hero / .tools-hero — centered 72px accent-green display title with a
   short 559px-measure intro under it. Shared by Projects, Journal, AI Tools. */
export function PageHero({ title, intro, style }) {
  return React.createElement('div', { style: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    gap: 'var(--space-sm)', width: '100%', padding: '120px clamp(20px, 8vw, 96px)', textAlign: 'center', ...style
  } }, [
    React.createElement('h1', { key: 't', style: {
      fontSize: 'var(--font-size-display)', fontWeight: 'var(--weight-black)',
      letterSpacing: 'var(--tracking-display)', textTransform: 'uppercase',
      lineHeight: 1, color: 'var(--text-accent)'
    } }, title),
    intro ? React.createElement('p', { key: 'i', style: {
      fontSize: 'var(--font-size-body-md)', lineHeight: 'var(--line-height-body)',
      maxWidth: 559, color: 'var(--text-primary)'
    } }, intro) : null
  ]);
}
