import React from 'react';
import { Tag } from '../core/Tag.jsx';
import { StatusBadge } from '../core/StatusBadge.jsx';
import { Eyebrow } from '../core/Eyebrow.jsx';

/* .tool-card — the AI Tools page card. Verdict block pinned to the bottom. */
export function ToolCard({ title, category, status = 'stack', statusLabel = 'core stack', summary, verdict, verdictLabel = 'Verdict', style }) {
  return React.createElement('div', { style: {
    display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', padding: 'var(--space-lg)',
    background: 'var(--bg-elevated)', border: '1px solid var(--border-rule)',
    borderRadius: 'var(--radius-md)', ...style
  } }, [
    React.createElement('div', { key: 't', style: { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--space-md)' } }, [
      React.createElement('div', { key: 'h', style: { display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)', minWidth: 0 } }, [
        React.createElement('h3', { key: 'ti', style: { fontSize: 'var(--font-size-heading-3)', fontWeight: 'var(--weight-black)', lineHeight: 1.2, color: 'var(--text-primary)' } }, title),
        category ? React.createElement(Tag, { key: 'c' }, category) : null
      ]),
      React.createElement(StatusBadge, { key: 's', status }, statusLabel)
    ]),
    summary ? React.createElement('p', { key: 'su', style: { fontSize: 'var(--font-size-body-md)', fontWeight: 'var(--weight-semibold)', lineHeight: 'var(--line-height-body)', color: 'var(--text-muted)' } }, summary) : null,
    verdict ? React.createElement('div', { key: 'v', style: { marginTop: 'auto', paddingTop: 'var(--space-lg)', borderTop: '1px solid var(--border-rule)' } }, [
      React.createElement(Eyebrow, { key: 'l', tone: 'accent', style: { marginBottom: 'var(--space-sm)', fontSize: 'var(--font-size-label-small)', letterSpacing: 'var(--tracking-eyebrow)', lineHeight: 1.5 } }, verdictLabel),
      React.createElement('p', { key: 'x', style: { fontSize: 'var(--font-size-body-md)', lineHeight: 'var(--line-height-body)', color: 'var(--text-muted)' } }, verdict)
    ]) : null
  ]);
}
