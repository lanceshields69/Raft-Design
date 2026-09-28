import * as React from 'react';

/**
 * The lime brand square with the stacked RAFT / DESIGN wordmark inside it.
 */
export interface LogoBlockProps {
  /** Square edge in px — 300 on desktop, 200 under 1024px */
  size?: number;
  lines?: string[];
  style?: React.CSSProperties;
}
export function LogoBlock(props: LogoBlockProps): JSX.Element;
