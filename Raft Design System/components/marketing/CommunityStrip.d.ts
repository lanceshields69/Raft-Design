import * as React from 'react';

/** Full-bleed one-line callout bar on the chrome surface, with a round lime icon and trailing arrow. */
export interface CommunityStripProps {
  text?: string;
  /** Overrides the default diamond glyph */
  icon?: string;
  /** Path prefix for assets/ — pass '../../assets/' from a page two levels deep */
  assetBase?: string;
  href?: string;
  style?: React.CSSProperties;
}
export function CommunityStrip(props: CommunityStripProps): JSX.Element;
