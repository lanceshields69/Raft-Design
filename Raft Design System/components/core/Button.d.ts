import * as React from 'react';

/**
 * The pill-outline button style in the Raft system: transparent border that
 * inverts to a solid brand-green fill on hover.
 */
export interface ButtonProps {
  children?: React.ReactNode;
  /** 60px horizontal padding instead of 30px (.scan-cta--wide) */
  wide?: boolean;
  /** Leading → glyph. On by default — nearly every CTA on the site has one. */
  arrow?: boolean;
  /** Degrees to rotate the arrow — 90 reproduces the hero's "scroll down" CTA (.hero-scroll-arrow), which is this same component, not a separate one. */
  arrowRotate?: number;
  /** Renders an <a> instead of a <button> */
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  style?: React.CSSProperties;
}
export function Button(props: ButtonProps): JSX.Element;
