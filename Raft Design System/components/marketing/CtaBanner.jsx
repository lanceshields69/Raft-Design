import React from 'react';
import { Button } from '../core/Button.jsx';

/* .scan-banner-box + .scan-banner-dither — the Design Intelligence Engine
   banner. Rebuilt full-bleed (2026-09): no box, no background, no border —
   a plain text/CTA row over a full-width animated dither strip, not the
   earlier recessed sunken panel this component used to render (that
   version is gone from the live site; don't resurrect var(--bg-sunken)/
   var(--border-bright) here).

   The strip itself is Paper's WebGL "Dithering" shader, run by the
   shared, non-React dither-banner.js (see guidelines/motion-shader.html
   and assets/dither-banner.js) — a page including this component must
   also load that script once; it self-mounts into every
   [data-dither-banner]/[data-dither] element on the page via
   querySelectorAll, the same way the live site does it. Without that
   script the strip below is just an empty --bg-canvas rectangle. */
export function CtaBanner({ heading, body, cta, onCta, href, style }) {
  return React.createElement('div', { style }, [
    React.createElement('div', {
      key: 'box',
      style: { display: 'flex', alignItems: 'center', gap: 40, padding: 'var(--space-xxxl) var(--space-xxl)' }
    }, [
      React.createElement('div', { key: 't', style: { display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', maxWidth: 832, flexShrink: 0 } }, [
        React.createElement('h2', { key: 'h', style: {
          fontWeight: 'var(--weight-black)', fontSize: 'var(--font-size-heading-2)',
          lineHeight: '32px', color: 'var(--text-primary)'
        } }, heading),
        body ? React.createElement('p', { key: 'b', style: {
          fontSize: 'var(--font-size-body-lg)', lineHeight: 'var(--line-height-heading)',
          fontWeight: 'var(--weight-regular)', color: 'var(--text-primary)'
        } }, body) : null
      ]),
      cta ? React.createElement('div', { key: 'c', style: { display: 'flex', justifyContent: 'center', flex: 1 } },
        React.createElement(Button, { wide: true, onClick: onCta, href }, cta)) : null
    ]),
    React.createElement('div', {
      key: 'dither', 'data-dither-banner': true, 'aria-hidden': true,
      style: { width: '100%', height: 'clamp(160px, 18vw, 271px)', overflow: 'hidden' }
    })
  ]);
}
