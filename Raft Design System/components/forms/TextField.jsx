import React, { useState } from 'react';

/* .contact-modal-field — uppercase muted label, translucent input on a
   rule border, focus turns the border brand-green. */
export function TextField({ label, name, type = 'text', placeholder, multiline = false, error, defaultValue, style }) {
  const [focus, setFocus] = useState(false);
  const control = {
    width: '100%', padding: '13px 17px', background: 'rgba(44, 71, 54, 0.35)',
    border: '1px solid ' + (focus ? 'var(--border-button)' : 'var(--border-rule)'),
    borderRadius: 'var(--radius-sm)', fontFamily: 'inherit',
    fontSize: 'var(--font-size-body-md)', color: 'var(--text-primary)',
    outline: 'none', transition: 'border-color .2s',
    height: multiline ? 122 : 50, lineHeight: multiline ? 1.5 : 'normal',
    resize: multiline ? 'vertical' : undefined
  };
  return React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)', ...style } }, [
    label ? React.createElement('label', { key: 'l', htmlFor: name, style: {
      fontSize: 'var(--font-size-label-medium)', fontWeight: 'var(--weight-medium)',
      letterSpacing: '0.48px', textTransform: 'uppercase', color: 'var(--text-muted)'
    } }, label) : null,
    React.createElement(multiline ? 'textarea' : 'input', {
      key: 'c', id: name, name, placeholder, defaultValue,
      type: multiline ? undefined : type, style: control,
      onFocus: () => setFocus(true), onBlur: () => setFocus(false)
    }),
    error ? React.createElement('span', { key: 'e', style: { fontSize: 13, color: 'var(--color-error)' } }, error) : null
  ]);
}
