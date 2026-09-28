import * as React from 'react';

/**
 * A reviewed tool on the AI Tools page: title, category tag, status pill, summary, verdict.
 */
export interface ToolCardProps {
  title?: string;
  category?: string;
  status?: 'stack' | 'rotation' | 'watching' | 'overhyped' | 'dropped';
  statusLabel?: string;
  summary?: string;
  verdict?: string;
  verdictLabel?: string;
  style?: React.CSSProperties;
}
export function ToolCard(props: ToolCardProps): JSX.Element;
