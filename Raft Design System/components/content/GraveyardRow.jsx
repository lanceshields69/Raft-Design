import React from 'react';
import { StatusBadge } from '../core/StatusBadge.jsx';

/* .graveyard-row — dropped-tool list row inside a bordered list container. */
export function GraveyardRow({ name, note, status = 'dropped', statusLabel = 'dropped', tinted = false, style }) {
  return React.createElement('div', { style: {
    display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--space-12)',
    padding: 'var(--space-lg)', borderBottom: '1px solid var(--border-rule)',
    background: tinted ? 'rgb(from var(--bg-elevated) r g b / 40%)' : 'transparent', ...style
  } }, [
    React.createElement('div', { key: 'h', style: { display: 'flex', alignItems: 'center', gap: 'var(--space-12)', flex: '0 0 260px' } }, [
      React.createElement(StatusBadge, { key: 's', status }, statusLabel),
      React.createElement('p', { key: 'n', style: { fontSize: 'var(--font-size-body-md)', fontWeight: 'var(--weight-black)', lineHeight: 1.5, color: 'var(--text-primary)' } }, name)
    ]),
    React.createElement('p', { key: 'no', style: { flex: '1 1 320px', fontSize: 'var(--font-size-body-md)', lineHeight: 'var(--line-height-body)', color: 'var(--text-muted)' } }, note)
  ]);
}
