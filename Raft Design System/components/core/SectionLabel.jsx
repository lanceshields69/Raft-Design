import React from 'react';

/* .section-label — the brand-green eyebrow pill that opens every section
   (Approach, Expertise, Projects, Studio, FAQs, Active, Graveyard). */
export function SectionLabel({ children, style }) {
  return React.createElement('span', { style: {
    display: 'inline-block', alignSelf: 'flex-start',
    fontSize: 'var(--font-size-eyebrow)', fontWeight: 'var(--weight-black)',
    letterSpacing: 'var(--tracking-eyebrow)', lineHeight: 'var(--line-height-eyebrow)',
    textTransform: 'uppercase', background: 'var(--bg-brand)', color: 'var(--accent-ink)',
    padding: '5px 20px', borderRadius: 'var(--radius-sm)', ...style
  } }, children);
}
