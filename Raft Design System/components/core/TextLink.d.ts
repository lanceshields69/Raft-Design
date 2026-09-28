import * as React from 'react';

/** Quiet inline link with a brand-green arrow — the site's secondary action. */
export interface TextLinkProps {
  children?: React.ReactNode;
  href?: string;
  /** -0.6px tracking variant (.text-link-large) */
  large?: boolean;
  arrow?: 'leading' | 'trailing';
  style?: React.CSSProperties;
}
export function TextLink(props: TextLinkProps): JSX.Element;
