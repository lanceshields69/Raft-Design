import React from 'react';

/* .client-logos — 125x35 white client marks scrolling left at 24s linear,
   held at 50% opacity. Light mode swaps to the -black variants. */
const DEFAULT = ['chase','hitachi','redbull','kddi','walmart','mitsubishi','adobe','yokogawa','visa','jal','chanel','mitsui','kraft','tepco','fitbit'];
export function ClientLogoMarquee({ clients = DEFAULT, theme = 'dark', assetBase = 'assets/', style }) {
  const src = c => assetBase + 'client-' + c + (theme === 'light' ? '-black' : '') + '.png';
  const set = clients.concat(clients);
  return React.createElement('div', { 'aria-hidden': true, style: { width: '100%', overflow: 'hidden', opacity: 0.5, ...style } },
    React.createElement('div', { style: { display: 'flex', gap: 40, width: 'max-content', animation: 'raft-marquee 24s linear infinite' } },
      set.map((c, i) => React.createElement('img', { key: c + i, src: src(c), alt: '', style: { flexShrink: 0, width: 125, height: 35, objectFit: 'contain' } }))
    )
  );
}
