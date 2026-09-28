import React from 'react';
import { ThemeToggle } from './ThemeToggle.jsx';

/* .nav-header — sticky, 66px, 85% canvas fill with a 12px backdrop blur.
   Animated R-mark on the left; the logotype cell and the links cell each
   carry their own bottom hairline. */
export function NavHeader({ links = [], logo = 'assets/r-mark-dark.gif', lang = 'EN', theme = 'dark', onToggleTheme, onNavigate, active, style }) {
  const cellBorder = { borderBottom: '1px solid var(--border-rule)' };
  return React.createElement('nav', { style: {
    position: 'sticky', top: 0, zIndex: 100, display: 'flex', alignItems: 'center',
    height: 'var(--nav-height)', padding: '0 15px',
    background: 'rgb(from var(--bg-canvas) r g b / 85%)',
    backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', ...style
  } }, [
    React.createElement('div', { key: 'l', style: { flex: '0 0 auto', display: 'flex', alignItems: 'center', height: '100%', padding: '12px 20px 10px 0', ...cellBorder } },
      React.createElement('img', { src: logo, width: 50, height: 50, alt: 'Raft Design', style: { width: 50, height: 50, objectFit: 'contain' } })),
    React.createElement('div', { key: 'r', style: { display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 40, height: '100%', padding: '12px 30px 10px 20px', flex: 1, minWidth: 0, ...cellBorder } }, [
      ...links.map(l => React.createElement('a', {
        key: l.label, href: l.href || '#',
        onClick: onNavigate ? (e) => { e.preventDefault(); onNavigate(l); } : undefined,
        style: {
          fontSize: 'var(--font-size-body-md)', fontWeight: 'var(--weight-regular)',
          letterSpacing: '-0.02em', lineHeight: 1, paddingBottom: 4, flexShrink: 0,
          textDecoration: 'none', transition: 'color .2s',
          color: active === l.label ? 'var(--text-accent)' : 'var(--text-primary)'
        }
      }, l.label)),
      React.createElement(ThemeToggle, { key: 'tt', theme, onToggle: onToggleTheme }),
      React.createElement('div', { key: 'lg', style: { display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0, fontSize: 'var(--font-size-body-md)', fontWeight: 'var(--weight-black)', lineHeight: 1 } }, [
        React.createElement('span', { key: 'a', style: { color: lang === 'EN' ? 'var(--text-primary)' : 'var(--text-muted)' } }, 'EN'),
        React.createElement('span', { key: 'd', style: { color: 'var(--text-muted)' } }, '|'),
        React.createElement('span', { key: 'b', style: { color: lang === 'JP' ? 'var(--text-primary)' : 'var(--text-muted)' } }, 'JP')
      ])
    ])
  ]);
}
