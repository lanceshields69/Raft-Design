import * as React from 'react';

/** Category tag used on tool cards (e.g. "Reasoning / Writing"). */
export interface TagProps { children?: React.ReactNode; style?: React.CSSProperties }
export function Tag(props: TagProps): JSX.Element;
