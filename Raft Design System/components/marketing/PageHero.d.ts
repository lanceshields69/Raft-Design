import * as React from 'react';

/**
 * Centered page hero: 72px uppercase brand-green title over a 559px intro measure.
 */
export interface PageHeroProps { title?: React.ReactNode; intro?: React.ReactNode; style?: React.CSSProperties }
export function PageHero(props: PageHeroProps): JSX.Element;
