const { TextField, SolidButton, TextLink } = window.RaftDesignSystem_76d511;

/* /contact/ — now a full page (form + a "Let's Talk / Book a call /
   Our Office" band), not only the modal ContactModal.jsx models; that
   modal's DOM is kept on the live page (for a chat-escalation deep link)
   but isn't offered as a second visible option next to this page anymore.
   Lean composition — see readme.md's "Known gaps" note. */

function Contact({ onSubmit }) {
  return (
    <main>
      <section style={{ display: 'flex', gap: 60, flexWrap: 'wrap', padding: '60px 15px', maxWidth: 1292, margin: '0 auto' }}>
        <div style={{ flex: '1 1 420px', display: 'flex', flexDirection: 'column', gap: 24 }}>
          <span style={{ color: 'var(--text-accent)', fontSize: 13, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.52px' }}>Let's Talk</span>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, lineHeight: 1.1, margin: 0 }}>We'd love to learn more about you and what we can do together.</h1>
          <p style={{ fontSize: 20, lineHeight: 1.5, margin: 0 }}>Raft is a full-service agency working at the intersection of tech, design, and AI.</p>
          <TextLink arrow="leading" large>Book a consultation</TextLink>
        </div>
        <form onSubmit={e => { e.preventDefault(); onSubmit && onSubmit(); }} style={{ flex: '1 1 420px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <TextField label="Name" name="name" placeholder="Name" />
          <TextField label="Email" name="email" type="email" placeholder="Email" />
          <TextField label="Company" name="company" placeholder="Company" />
          <TextField label="Tell us about your project" name="message" multiline placeholder="Tell us about your project" />
          <SolidButton type="submit" arrow={false} style={{ alignSelf: 'flex-start' }}>Send message</SolidButton>
        </form>
      </section>

      {/* .contact-cta-band — a fixed #112D1B literal in dark mode (a
          deliberate, Figma-sourced exception to the token palette, same as
          the site's error-red pair), #EBF7EB in light mode (fixed 2026-09).
          This lean composition only models the dark-mode value. */}
      <section style={{ background: '#112D1B', padding: '60px 15px' }}>
        <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap', maxWidth: 1292, margin: '0 auto', justifyContent: 'space-between' }}>
          {[
            ['Let’s Talk', 'Tell us about your project.', 'hello@raftdesign.studio'],
            ['Book a call', 'Drop time in our calendar.', 'Schedule a consultation'],
            ['Our Office', '6662 Emmet Terrace\nLos Angeles, CA 90068', '(415) 361-9584'],
          ].map(([title, sub, link]) => (
            <div key={title} style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 280 }}>
              <h2 style={{ fontSize: 36, fontWeight: 300, letterSpacing: '-1.08px', margin: 0, color: '#fff' }}>{title}</h2>
              <p style={{ fontSize: 20, lineHeight: 1.4, margin: 0, whiteSpace: 'pre-line', color: '#fff' }}>{sub}</p>
              <TextLink style={{ color: 'var(--text-accent)' }}>{link}</TextLink>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { Contact });
