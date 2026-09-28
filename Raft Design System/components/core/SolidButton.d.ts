import * as React from 'react';

/**
 * The light-mode-inverted solid button (.cta-solid-button): pure-white pill
 * with black text in dark mode, pure-black pill with white text in light
 * mode. Distinct from `Button` — no hover-invert, no outline state.
 */
export interface SolidButtonProps {
  children?: React.ReactNode;
  /** Trailing → glyph (after the label, not leading like `Button`). On by default. */
  arrow?: boolean;
  /** Renders an <a> instead of a <button> */
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  style?: React.CSSProperties;
}
export function SolidButton(props: SolidButtonProps): JSX.Element;
