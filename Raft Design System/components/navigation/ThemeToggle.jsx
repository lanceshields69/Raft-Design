import React from 'react';

/* .theme-toggle — 36px pill on the chrome surface holding a moon/sun icon. */
export function ThemeToggle({ theme = 'dark', onToggle, style }) {
  const moon = React.createElement('path', { d: 'M17.5 10.6583C17.3689 12.0768 16.8365 13.4287 15.9652 14.5557C15.0939 15.6826 13.9196 16.5382 12.5798 17.0221C11.2399 17.5061 9.78999 17.5984 8.39958 17.2884C7.00918 16.9784 5.73583 16.2788 4.72852 15.2715C3.72121 14.2642 3.02162 12.9908 2.71159 11.6004C2.40156 10.21 2.49393 8.76007 2.97788 7.42025C3.46184 6.08042 4.31736 4.90614 5.44434 4.03479C6.57133 3.16345 7.92316 2.63109 9.34167 2.5C8.51118 3.62356 8.11154 5.00787 8.21544 6.40118C8.31935 7.79448 8.91988 9.10422 9.90783 10.0922C10.8958 11.0801 12.2055 11.6807 13.5988 11.7846C14.9921 11.8885 16.3764 11.4888 17.5 10.6583Z', stroke: 'currentColor', strokeWidth: 1.66667, strokeLinecap: 'round', strokeLinejoin: 'round' });
  const sunPaths = ['M10.5 14C12.433 14 14 12.433 14 10.5C14 8.567 12.433 7 10.5 7C8.567 7 7 8.567 7 10.5C7 12.433 8.567 14 10.5 14Z','M10.5 1.75V4.375','M10.5 16.625V19.25','M3.6925 3.6925L5.5475 5.5475','M15.4525 15.4525L17.3075 17.3075','M1.75 10.5H4.375','M16.625 10.5H19.25','M3.6925 17.3075L5.5475 15.4525','M15.4525 5.5475L17.3075 3.6925'];
  const icon = theme === 'light'
    ? React.createElement('svg', { width: 20, height: 20, viewBox: '0 0 21 21', fill: 'none' }, sunPaths.map((d, i) => React.createElement('path', { key: i, d, stroke: 'currentColor', strokeWidth: 1.83333, strokeLinecap: 'round', strokeLinejoin: 'round' })))
    : React.createElement('svg', { width: 20, height: 20, viewBox: '0 0 20 20', fill: 'none' }, moon);
  return React.createElement('button', {
    type: 'button', onClick: onToggle,
    'aria-label': theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode',
    style: {
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      width: 36, height: 36, padding: 8, border: 'none', borderRadius: 'var(--radius-pill)',
      background: 'var(--bg-surface)', color: 'var(--text-primary)', cursor: 'pointer',
      transition: 'background .2s', ...style
    }
  }, icon);
}
