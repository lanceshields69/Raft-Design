import * as React from 'react';

/** One row in the AI Tools "Graveyard" list: status pill, tool name, why it was dropped. */
export interface GraveyardRowProps {
  name?: string;
  note?: string;
  status?: 'stack' | 'rotation' | 'watching' | 'overhyped' | 'dropped';
  statusLabel?: string;
  /** 40%-opacity elevated fill — the source tints the 2nd and 3rd rows */
  tinted?: boolean;
  style?: React.CSSProperties;
}
export function GraveyardRow(props: GraveyardRowProps): JSX.Element;
