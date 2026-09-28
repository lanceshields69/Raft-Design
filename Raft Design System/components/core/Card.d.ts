import * as React from 'react';

/** Container surface: elevated fill, hairline rule border, 4px radius, 24px padding. */
export interface CardProps {
  children?: React.ReactNode;
  /** elevated = standard card, sunken = recessed banner panel (square, bright border), canvas = bordered carousel card */
  tone?: 'elevated' | 'sunken' | 'canvas';
  padding?: string;
  style?: React.CSSProperties;
}
export function Card(props: CardProps): JSX.Element;
