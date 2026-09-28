import * as React from 'react';

/** Expertise / Build section entry: 28px black title, 16px body, green arrow tagline. */
export interface ServiceCardProps {
  title?: string;
  body?: string;
  /** Rendered with a leading → in accent green */
  tagline?: string;
  width?: number | string;
  style?: React.CSSProperties;
}
export function ServiceCard(props: ServiceCardProps): JSX.Element;
