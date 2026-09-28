import * as React from 'react';

/** Fraunces stat figure with a muted caption — the shared stat spec across journal and project pages. */
export interface StatValueProps {
  value?: React.ReactNode;
  label?: React.ReactNode;
  /** sm = 36px article/project metric, lg = 105px homepage studio stat */
  size?: 'sm' | 'lg';
  /** The homepage studio stats are italic; article stat-bar values are upright */
  italic?: boolean;
  style?: React.CSSProperties;
}
export function StatValue(props: StatValueProps): JSX.Element;
