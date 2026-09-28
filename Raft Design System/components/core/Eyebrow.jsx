import React from 'react';

/* .article-eyebrow / .project-section-label — flat uppercase field label,
   no pill. Uses --tracking-section-title (1px), not the eyebrow's 0.52px. */
export function Eyebrow({ children, tone = 'muted', style }) {
  return React.createElement('p', { style: {
    fontSize: 'var(--font-size-eyebrow)', fontWeight: 'var(--weight-black)',
    letterSpacing: 'var(--tracking-section-title)', lineHeight: 'var(--line-height-eyebrow)',
    textTransform: 'uppercase',
    color: tone === 'accent' ? 'var(--text-accent)' : tone === 'primary' ? 'var(--text-primary)' : 'var(--text-muted)',
    ...style
  } }, children);
}
