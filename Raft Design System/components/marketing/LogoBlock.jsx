import React from 'react';

/* .logo-block — the lime square holding the stacked RAFT / DESIGN wordmark.
   Letters are Inter 900, uppercase, tight tracking; RAFT reveals left-to-right
   and DESIGN right-to-left on load. */
export function LogoBlock({ size = 300, lines = ['RAFT', 'DESIGN'], style }) {
  const fs = size * 0.29;
  return React.createElement('div', { role: 'img', 'aria-label': 'Raft Design', style: {
    width: size, height: size, background: 'var(--lime)', overflow: 'hidden',
    display: 'flex', alignItems: 'center', justifyContent: 'center', ...style
  } }, React.createElement('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', padding: '0 4px' } },
    lines.map((line, i) => React.createElement('div', { key: line, style: {
      display: 'flex', justifyContent: 'center', fontFamily: 'var(--font-sans)',
      fontWeight: 900, fontOpticalSizing: 'auto', textTransform: 'uppercase',
      letterSpacing: i === 0 ? '-0.06em' : '-0.04em', lineHeight: 0.85,
      whiteSpace: 'nowrap', fontSize: fs, color: i === 0 ? 'var(--dark)' : 'var(--white)'
    } }, line))
  ));
}
