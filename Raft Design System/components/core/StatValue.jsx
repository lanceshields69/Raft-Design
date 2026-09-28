import React from 'react';

/* .stat-bar-value / .project-metric-value / .stat-number — Fraunces SemiBold,
   brand green, SOFT 0 / WONK 1. One shared spec, three sizes in use. */
const SIZES = { sm: ['var(--font-size-heading-1)', 'var(--line-height-heading-large)', '-0.4px'], lg: ['105px', 0.9, '-0.03em'] };
export function StatValue({ value, label, size = 'sm', italic = false, style }) {
  const [fs, lh, ls] = SIZES[size] || SIZES.sm;
  return React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: size === 'lg' ? '17px' : 'var(--space-6)', ...style } }, [
    React.createElement('p', { key: 'v', style: {
      fontFamily: 'var(--font-emphasis)', fontStyle: italic ? 'italic' : 'normal',
      fontWeight: 'var(--weight-semibold)', fontVariationSettings: "'SOFT' 0, 'WONK' 1",
      fontSize: fs, lineHeight: lh, letterSpacing: ls, color: 'var(--text-accent)'
    } }, value),
    label ? React.createElement('p', { key: 'l', style: {
      fontSize: 'var(--font-size-body-md)', fontWeight: size === 'lg' ? 'var(--weight-regular)' : 'var(--weight-semibold)',
      lineHeight: size === 'lg' ? 1.1 : 'var(--line-height-body)',
      letterSpacing: size === 'lg' ? '-0.48px' : 0, color: 'var(--text-muted)'
    } }, label) : null
  ]);
}
