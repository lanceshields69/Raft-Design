import React from 'react';

/* .status-badge — pill, dot + label, five color-coded variants. */
const MAP = {
  stack: ['--status-stack', '--status-stack-bg', '--status-stack-border'],
  rotation: ['--status-rotation', '--status-rotation-bg', '--status-rotation-border'],
  watching: ['--status-watching', '--status-watching-bg', '--status-watching-border'],
  overhyped: ['--status-overhyped', '--status-overhyped-bg', '--status-overhyped-border'],
  dropped: ['--status-dropped', '--status-dropped-bg', '--status-dropped-border']
};
export function StatusBadge({ status = 'stack', children, style }) {
  const [dot, bg, border] = MAP[status] || MAP.stack;
  return React.createElement('span', { style: {
    display: 'inline-flex', alignItems: 'center', gap: 'var(--space-6)', flexShrink: 0,
    padding: 'var(--space-xs) var(--space-12)', borderRadius: 'var(--radius-pill)',
    border: '1px solid var(--' + border.slice(2) + ')',
    background: 'var(' + bg + ')',
    fontSize: 'var(--font-size-label-medium)', fontWeight: 'var(--weight-medium)',
    lineHeight: 'var(--line-height-label)', whiteSpace: 'nowrap',
    color: status === 'dropped' ? 'var(--status-dropped)' : 'var(--text-primary)', ...style
  } }, [
    React.createElement('span', { key: 'd', style: { flexShrink: 0, width: 'var(--space-6)', height: 'var(--space-6)', borderRadius: '50%', background: 'var(' + dot + ')' } }),
    children
  ]);
}
