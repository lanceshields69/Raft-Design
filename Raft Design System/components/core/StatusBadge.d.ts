import * as React from 'react';

/**
 * Color-coded status pill with a matching dot — the AI Tools page's verdict on a tool.
 */
export interface StatusBadgeProps {
  status?: 'stack' | 'rotation' | 'watching' | 'overhyped' | 'dropped';
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export function StatusBadge(props: StatusBadgeProps): JSX.Element;
