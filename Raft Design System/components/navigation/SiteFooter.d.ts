import * as React from 'react';

/** Site footer: thin oversized RAFT/DESIGN lockup, office/contact/social columns, colophon with LLM marks. */
export interface SiteFooterProps {
  office?: string[];
  phone?: string;
  email?: string;
  social?: string[];
  colophon?: string;
  /** Path prefix for assets/ — pass '../../assets/' from a page two levels deep */
  assetBase?: string;
  style?: React.CSSProperties;
}
export function SiteFooter(props: SiteFooterProps): JSX.Element;
