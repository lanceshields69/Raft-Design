import * as React from 'react';

/** Dark/light switch in the nav — moon icon in dark mode, sun in light mode. */
export interface ThemeToggleProps { theme?: 'dark' | 'light'; onToggle?: () => void; style?: React.CSSProperties }
export function ThemeToggle(props: ThemeToggleProps): JSX.Element;
