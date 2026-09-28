import * as React from 'react';

/** Contact-form field: uppercase muted label, translucent input, green focus border. */
export interface TextFieldProps {
  label?: string;
  name?: string;
  type?: 'text' | 'email' | 'tel';
  placeholder?: string;
  /** Renders a 122px-tall textarea instead of a 50px input */
  multiline?: boolean;
  /** Validation message — uses --color-error, the one non-brand color in the system */
  error?: string;
  defaultValue?: string;
  style?: React.CSSProperties;
}
export function TextField(props: TextFieldProps): JSX.Element;
