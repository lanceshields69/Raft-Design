import * as React from 'react';

/** Projects-index card: full-bleed square-cornered image over a heavy 28px title. */
export interface WorkCardProps { image?: string; title?: string; href?: string; alt?: string; style?: React.CSSProperties }
export function WorkCard(props: WorkCardProps): JSX.Element;
