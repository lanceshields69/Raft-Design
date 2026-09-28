import React from 'react';

/* .footer — oversized thin RAFT / DESIGN lockup beside OFFICE / CONTACT /
   SOCIAL columns, then the colophon line. */
export function SiteFooter({ office = ['Hollywood', 'Los Angeles, CA 90068'], phone = '(415) 361-9584', email = 'hello@raftdesign.studio', social = ['LinkedIn', 'Twitter', 'Instagram', 'Note', 'Substack'], colophon = 'Designed by hand. Built by AI.', assetBase = 'assets/', style }) {
  const heading = { fontSize: 'var(--font-size-body-lg)', fontWeight: 'var(--weight-medium)', lineHeight: 1, color: 'var(--text-muted)' };
  const link = { fontSize: 'var(--font-size-body-lg)', lineHeight: 1, color: 'var(--text-primary)', textDecoration: 'none' };
  return React.createElement('footer', { style: { padding: '30px 15px 15px', display: 'flex', flexDirection: 'column', gap: 47, width: '100%', ...style } }, [
    React.createElement('div', { key: 'c', style: { display: 'flex', alignItems: 'flex-start', width: '100%', gap: 40 } }, [
      React.createElement('div', { key: 'l', style: { flex: 1, maxWidth: 625 } }, [
        React.createElement('p', { key: 'r', style: { fontWeight: 200, fontSize: 105, lineHeight: '120px', letterSpacing: '-0.05em', marginBottom: -19, color: 'var(--text-accent)' } }, 'RAFT'),
        React.createElement('p', { key: 'd', style: { fontWeight: 300, fontSize: 66, lineHeight: '55px', letterSpacing: '-0.01em', color: 'var(--text-primary)' } }, 'DESIGN')
      ]),
      React.createElement('div', { key: 't', style: { display: 'flex', justifyContent: 'space-between', width: 616, fontSize: 'var(--font-size-body-lg)', letterSpacing: '-1px' } }, [
        React.createElement('div', { key: 'c1', style: { display: 'flex', flexDirection: 'column', gap: 62 } }, [
          React.createElement('div', { key: 'o', style: { display: 'flex', flexDirection: 'column', gap: 30 } }, [
            React.createElement('p', { key: 'h', style: heading }, 'OFFICE'),
            React.createElement('div', { key: 'b', style: { lineHeight: 1.4, color: 'var(--text-primary)' } }, office.map((o, i) => React.createElement('p', { key: i }, o)))
          ]),
          React.createElement('div', { key: 'ct', style: { display: 'flex', flexDirection: 'column', gap: 30 } }, [
            React.createElement('p', { key: 'h', style: heading }, 'CONTACT'),
            React.createElement('div', { key: 'b', style: { display: 'flex', flexDirection: 'column', gap: 10 } }, [
              React.createElement('a', { key: 'p', href: 'tel:' + phone.replace(/[^0-9]/g, ''), style: link }, phone),
              React.createElement('a', { key: 'e', href: 'mailto:' + email, style: link }, email)
            ])
          ])
        ]),
        React.createElement('div', { key: 'c2', style: { display: 'flex', flexDirection: 'column', gap: 30 } }, [
          React.createElement('p', { key: 'h', style: heading }, 'SOCIAL'),
          React.createElement('div', { key: 'b', style: { display: 'flex', flexDirection: 'column', gap: 10 } }, social.map(s => React.createElement('a', { key: s, href: '#', style: link }, s)))
        ])
      ])
    ]),
    React.createElement('p', { key: 'x', style: { fontSize: 'var(--font-size-body-lg)', color: 'var(--text-primary)', paddingTop: 20, paddingBottom: 20, display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' } }, [
      colophon,
      React.createElement('img', { key: 'a', src: assetBase + 'llm-anthropic.svg', width: 16, height: 16, alt: 'Anthropic', style: { width: 16, height: 16 } }),
      React.createElement('img', { key: 'o', src: assetBase + 'llm-openai.svg', width: 16, height: 16, alt: 'OpenAI', style: { width: 16, height: 16 } }),
      React.createElement('img', { key: 'l', src: assetBase + 'llm-lovable.svg', width: 16, height: 16, alt: 'Lovable', style: { width: 16, height: 16 } })
    ])
  ]);
}
