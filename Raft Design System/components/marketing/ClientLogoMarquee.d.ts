import * as React from 'react';

/** Continuously scrolling row of client logos at 50% opacity. */
export interface ClientLogoMarqueeProps {
  /** Client slugs matching assets/client-<slug>.png */
  clients?: string[];
  /** Light mode uses the -black logo variants */
  theme?: 'dark' | 'light';
  assetBase?: string;
  style?: React.CSSProperties;
}
export function ClientLogoMarquee(props: ClientLogoMarqueeProps): JSX.Element;
