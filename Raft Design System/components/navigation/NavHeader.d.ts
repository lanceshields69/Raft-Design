import * as React from 'react';

export interface NavLink { label: string; href?: string }
/**
 * Sticky site header: animated R-mark, nav links, theme toggle, EN|JP switch.
 * @startingPoint section="Navigation" subtitle="Sticky blurred site header with EN/JP switch" viewport="1280x120"
 */
export interface NavHeaderProps {
  links?: NavLink[];
  /** Path to the animated mark — r-mark-dark.gif on dark, r-mark-light.gif on light */
  logo?: string;
  lang?: 'EN' | 'JP';
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
  onNavigate?: (link: NavLink) => void;
  /** Label of the current page — rendered in accent green */
  active?: string;
  style?: React.CSSProperties;
}
export function NavHeader(props: NavHeaderProps): JSX.Element;
