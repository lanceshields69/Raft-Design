const { SectionLabel, TextField, Button } = window.RaftDesignSystem_76d511;

function ContactModal({ open, onClose }) {
  const [sent, setSent] = React.useState(false);
  if (!open) return null;
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 950, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, background: 'rgba(0,0,0,0.5)' }}>
      <div onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" style={{ width: '100%', maxWidth: 540, maxHeight: 'calc(100vh - 32px)', overflowY: 'auto', background: 'var(--bg-canvas)', border: '1px solid var(--border-rule)', borderRadius: 'var(--radius-md)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--space-md)', padding: 'var(--space-xl) var(--space-xl) 25px', borderBottom: '1px solid var(--border-rule)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
            <SectionLabel>Contact</SectionLabel>
            <h2 style={{ fontSize: 22, lineHeight: 1.25, letterSpacing: '-0.5px' }}>Let's explore your project's potential.</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, width: 36, height: 36, border: '1px solid var(--border-rule)', borderRadius: 'var(--radius-pill)', background: 'none', color: 'var(--text-primary)', cursor: 'pointer', fontSize: 16 }}>✕</button>
        </div>
        <div style={{ padding: 'var(--space-xl)' }}>
          {sent ? (
            <div style={{ padding: 'var(--space-md)', border: '1px solid var(--border-rule)', borderRadius: 'var(--radius-sm)', background: 'rgb(from var(--bg-brand) r g b / 12%)' }}>
              <p style={{ fontSize: 16, lineHeight: 1.5 }}>Thanks — I'll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSent(true); }} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
              <TextField label="Name" name="name" placeholder="Your name" />
              <TextField label="Email" name="email" type="email" placeholder="you@company.com" />
              <TextField label="Message" name="message" multiline placeholder="Tell me about your project…" />
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button type="submit" style={{ fontSize: 16 }}>Send message</Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
Object.assign(window, { ContactModal });
