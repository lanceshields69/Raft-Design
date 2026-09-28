const { SectionLabel } = window.RaftDesignSystem_76d511;

/* /about/ — split out from the homepage's old "Studio" section in
   2026-09; this is the first ui_kit recreation of it. Lean composition
   (see readme.md's "Known gaps" note), not pixel-exact: real current copy
   and correct component/token usage, simplified layout. */

const aboutSplit = { display: 'flex', gap: 40, flexWrap: 'wrap', maxWidth: 1292, margin: '0 auto' };
const aboutCol = { flex: '1 1 480px', display: 'flex', flexDirection: 'column', gap: 24 };
const aboutSection = { padding: '48px 15px', maxWidth: 1920 };

function About() {
  return (
    <main>
      <section style={{ padding: '80px 15px', textAlign: 'center' }}>
        <span style={{ color: 'var(--text-accent)', fontSize: 13, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.52px' }}>This is Raft</span>
        <h1 style={{ fontSize: 'clamp(40px, 8vw, 79px)', fontWeight: 700, lineHeight: 0.95, letterSpacing: '-2px', margin: '24px auto 0' }}>A craft built for change.</h1>
        <p style={{ fontSize: 20, lineHeight: 1.4, maxWidth: 560, margin: '24px auto 0' }}>Raft is an independent brand and product design studio in Los Angeles, for companies rethinking their brands, products, and experiences.</p>
      </section>

      <section style={{ ...aboutSection, borderTop: '1px solid var(--border-rule)' }}>
        <div style={aboutSplit}>
          <div style={aboutCol}>
            <h2 style={{ fontSize: 36, fontWeight: 900, margin: 0 }}>Small by design.</h2>
            <p style={{ fontSize: 20, lineHeight: 1.5, margin: 0 }}>We help startups and established companies turn new ideas into brands and products people trust and want to use. Every engagement is led directly by founder and design leader Lance Shields.</p>
            <p style={{ fontSize: 20, lineHeight: 1.5, margin: 0 }}>The experience behind Raft spans more than twenty years with Adobe, Walmart, Hitachi, and startups that went on to IPO and acquisition.</p>
            <p style={{ fontSize: 20, lineHeight: 1.5, margin: 0 }}>We also use AI every day. It helps us explore more ideas and make them real sooner. Technology helps us make. People decide what matters.</p>
            <h2 style={{ fontSize: 36, fontWeight: 900, margin: '32px 0 0' }}>Why a raft</h2>
            <p style={{ fontSize: 20, lineHeight: 1.5, margin: 0 }}>A ship is built for a known route. A raft is lighter. It responds to the water underneath it and keeps moving when conditions change. That felt like the right kind of studio to build.</p>
          </div>
          <div style={{ flex: '1 1 300px', aspectRatio: 1, background: 'var(--bg-elevated)', borderRadius: 'var(--radius-md)' }} />
        </div>
      </section>

      <section style={{ ...aboutSection, borderTop: '1px solid var(--border-rule)' }}>
        <SectionLabel style={{ marginBottom: 64 }}>The founder</SectionLabel>
        <div style={aboutSplit}>
          <div style={aboutCol}>
            <div>
              <h3 style={{ fontSize: 36, fontWeight: 900, margin: 0 }}>Lance Shields</h3>
              <span style={{ color: 'var(--text-accent)', fontSize: 13, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.52px' }}>Founder &amp; Head of Design</span>
            </div>
            <p style={{ fontSize: 20, lineHeight: 1.5, margin: 0 }}>Twenty years of design leadership across brand and product, split between big tech, agency, startup and enterprise work in the U.S. and Japan.</p>
            <p style={{ fontSize: 20, lineHeight: 1.5, margin: 0 }}>Before leading design at Adobe and Walmart, I ran an award-winning design studio in San Francisco. I also led a Tokyo design team for a decade, building Hitachi and ANA Airlines' global brand sites and winning a Good Design Award for Hitachi.com.</p>
            <p style={{ fontSize: 20, lineHeight: 1.5, margin: 0 }}>That cross-market, cross-discipline instinct now drives Raft's flagship work: LegalOn's brand and product platform across seven AI products.</p>
          </div>
          <div style={{ flex: '1 1 300px', aspectRatio: 1, background: 'var(--bg-elevated)', borderRadius: 'var(--radius-md)' }} />
        </div>
      </section>

      <section style={{ ...aboutSection, borderTop: '1px solid var(--border-rule)' }}>
        <SectionLabel style={{ marginBottom: 32 }}>Recognition</SectionLabel>
        <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap', maxWidth: 1292, margin: '0 auto' }}>
          {['Webby — All-in-One AI-Powered Creativity App, 2024 (Adobe Express)', 'Webby — Best Nonprofit Website, 2016 (Thatsnotcool.com)', 'W3 Award — Gold, Mobile Apps: Education, 2017', 'Good Design Award — Best Global Website, 2008 (Hitachi.com)'].map(a => (
            <p key={a} style={{ fontSize: 16, color: 'var(--text-muted)', flex: '1 1 240px' }}>{a}</p>
          ))}
        </div>
      </section>

      <section style={{ ...aboutSection, borderTop: '1px solid var(--border-rule)' }}>
        <SectionLabel style={{ marginBottom: 64 }}>How we build</SectionLabel>
        <div style={aboutSplit}>
          <div style={aboutCol}>
            <p style={{ fontFamily: 'var(--font-emphasis)', fontStyle: 'italic', fontSize: 28, lineHeight: 1.4, margin: 0 }}>Designers hand off. Builders wait for specs. Neither is necessary anymore.</p>
            <p style={{ fontSize: 20, lineHeight: 1.5, margin: 0 }}>Strategy forms in conversation with LLMs before any tool opens. Design and prototype move together. Then Claude Code, Cursor, and V0 turn it into shipped product. No handoff.</p>
            {[['Start with the strategy', 'Time with Claude and ChatGPT thinking through the problem, the user, and the product logic before a single pixel or line of code exists.'],
              ['Design and prototype together', 'Moving between Figma and AI tools to sketch flows, screens, and interactions — close enough to the real thing to test and iterate.'],
              ['Ship it', "Claude Code, Cursor, and V0 generate and refine working code. The build is directed, not delegated."]].map(([h, b]) => (
              <div key={h} style={{ marginTop: 8 }}>
                <h3 style={{ fontSize: 20, fontWeight: 900, margin: 0 }}>{h}</h3>
                <p style={{ fontSize: 18, lineHeight: 1.5, margin: '8px 0 0', color: 'var(--text-muted)' }}>{b}</p>
              </div>
            ))}
          </div>
          <div style={{ flex: '1 1 300px', aspectRatio: 1, background: 'var(--bg-elevated)', borderRadius: 'var(--radius-md)' }} />
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { About });
