import * as React from 'react';

/** FAQ pair — 28px regular-weight question over 16px body. Always expanded. */
export interface FaqItemProps { question?: string; answer?: string; style?: React.CSSProperties }
export function FaqItem(props: FaqItemProps): JSX.Element;
