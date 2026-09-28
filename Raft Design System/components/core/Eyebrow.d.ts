import * as React from 'react';

/** Flat uppercase field label (MY ROLE, PUBLISHED, VERDICT) — no pill background. */
export interface EyebrowProps { children?: React.ReactNode; tone?: 'muted' | 'primary' | 'accent'; style?: React.CSSProperties }
export function Eyebrow(props: EyebrowProps): JSX.Element;
