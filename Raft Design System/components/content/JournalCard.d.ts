import * as React from 'react';

/** Journal article card — borderless on the index, bordered 440px card in the homepage carousel. */
export interface JournalCardProps {
  image?: string;
  title?: string;
  excerpt?: string;
  href?: string;
  variant?: 'index' | 'carousel';
  linkLabel?: string;
  style?: React.CSSProperties;
}
export function JournalCard(props: JournalCardProps): JSX.Element;
