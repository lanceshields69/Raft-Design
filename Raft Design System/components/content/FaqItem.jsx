import React from 'react';

/* .faq-item — always-open question/answer pair (no accordion in the source). */
export function FaqItem({ question, answer, style }) {
  return React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', flex: '1 0 0', minWidth: 0, ...style } }, [
    React.createElement('p', { key: 'q', style: { fontSize: 'var(--font-size-heading-2)', lineHeight: 1, color: 'var(--text-primary)', fontWeight: 'var(--weight-regular)' } }, question),
    React.createElement('p', { key: 'a', style: { fontSize: 'var(--font-size-body-md)', lineHeight: 1.5, color: 'var(--text-primary)' } }, answer)
  ]);
}
