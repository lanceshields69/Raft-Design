import * as React from 'react';

/**
 * The Design Intelligence Engine banner: heading, body copy, one wide CTA,
 * over a full-width animated dither strip. Full-bleed — no box, no
 * background, no border (that recessed sunken-panel version is retired).
 *
 * Requires the page to also load the shared dither-banner.js script (see
 * guidelines/motion-shader.html) so the strip actually animates.
 */
export interface CtaBannerProps {
  heading?: string;
  body?: string;
  /** CTA label; omit to render the panel with no button */
  cta?: string;
  onCta?: () => void;
  href?: string;
  style?: React.CSSProperties;
}
export function CtaBanner(props: CtaBannerProps): JSX.Element;
