const { LogoBlock, ClientLogoMarquee, SectionLabel, Button, StatValue, WorkCard, CtaBanner, ShowreelLauncher, JournalCard, FaqItem, SolidButton } = window.RaftDesignSystem_76d511;

/* Rebuilt 2026-09 against the CURRENT homepage (the version this file modeled
   before had a different hero, a merged "Studio" section since split out to
   /about/, and was missing the Work section, the Design Intelligence Engine
   banner, the rotating-phrase message panel, and the showreel launcher
   entirely). Lean composition, not a pixel-exact recreation — see readme.md's
   "Known gaps" note on the standard this file and About.jsx/Contact.jsx are
   held to. */

const homeSection = { padding: '48px 15px', maxWidth: 1920, borderTop: '1px solid var(--border-rule)' };
const homeLabelGap = { marginBottom: 64 };

function Hero() {
  return (
    <section style={{ padding: '45px 15px 0' }}>
      <LogoBlock size={64} />
      <h1 style={{ fontSize: 'clamp(40px, 7vw, 79px)', fontWeight: 700, lineHeight: 0.95, letterSpacing: '-2px', margin: '24px 0 0', maxWidth: 900 }}>
        Brand and product design for <span style={{ color: 'var(--text-accent)' }}>what comes next</span>.
      </h1>
      <p style={{ fontSize: 20, lineHeight: 1.4, maxWidth: 640, margin: '24px 0 0' }}>
        Raft helps startups and established companies turn new technology into brands and products people trust. We use AI to move faster. People make the calls.
      </p>
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', margin: '38px 0 0' }}>
        {['See the work', 'Discover our services', 'Learn about Raft'].map(t => (
          <p key={t} style={{ fontSize: 20 }}><span style={{ color: 'var(--text-accent)' }}>→</span> {t}</p>
        ))}
      </div>
      <div style={{ marginTop: 60 }}><ClientLogoMarquee assetBase="../../assets/" /></div>
    </section>
  );
}

function Approach() {
  return (
    <section id="approach" style={homeSection}>
      <SectionLabel style={homeLabelGap}>Approach</SectionLabel>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 40, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)', maxWidth: 500 }}>
          <p style={{ fontSize: 28, fontWeight: 900, lineHeight: 1.1, margin: 0 }}>Knowing what's worth making.</p>
          <p style={{ fontSize: 16, lineHeight: 1.4, margin: 0 }}>Anything can be made now. The hard part is deciding what matters to your customers and your business. We work on brand, product, and strategy together, because a strong brand can't make up for a confusing product. Then we prototype early and stay with your team through design and build.</p>
          <Button href="/about/">Learn about Raft</Button>
        </div>
        <div style={{ display: 'flex', gap: 40 }}>
          <StatValue size="lg" italic value="540M+" label="Users and visitors interacted with our design in Walmart app" style={{ width: 240 }} />
          <StatValue size="lg" italic value="2X" label="Increase of MAU for Adobe Express from an extensible platform" style={{ width: 240 }} />
        </div>
      </div>
    </section>
  );
}

const HOME_WORK = [
  ['LegalOn', 'Global branding platform', '../../assets/legalon-3.webp'],
  ['Walmart', 'AI-First shopping experience', '../../assets/walmart-1.webp'],
  ['Adobe Express Photos', '0-to-1 AI product design', '../../assets/harmony-hero.jpg'],
];

function Work({ onNavigate }) {
  return (
    <section id="work" style={homeSection}>
      <SectionLabel style={homeLabelGap}>Featured Work</SectionLabel>
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        {HOME_WORK.map(([title, subtitle, image]) => (
          <div key={title} style={{ flex: '1 1 260px', minWidth: 220 }}>
            <WorkCard title={title} image={image} href="#" />
            <p style={{ color: 'var(--text-muted)', fontSize: 16, marginTop: 8 }}>{subtitle}</p>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
        <Button href="#" onClick={() => onNavigate({ label: 'Work' })}>View all projects</Button>
      </div>
    </section>
  );
}

/* Raft message panel — Paper "Raft-message-animation." No dedicated
   component: dither-banner.js reads data-messages off this div and rotates
   a sibling .raft-message-text's content while the shader's centre goes
   dark. Requires the host page to load assets/dither-banner.js (see
   guidelines/motion-shader.html) — this ui_kit does, in index.html. */
function MessagePanel() {
  return (
    <section aria-label="Raft Design principles" style={{ position: 'relative', height: 'clamp(240px, 30vw, 405px)', overflow: 'hidden' }}>
      <div data-dither data-light-front="--text-accent" data-shape="simplex" data-type="8x8" data-size="2.5" data-scale="1.29" data-frame="2864630.595"
        aria-hidden="true" style={{ position: 'absolute', inset: 0 }} />
      <p className="raft-message-text" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', margin: 0, whiteSpace: 'nowrap', fontSize: 'min(64px, 6vw)', fontWeight: 900, letterSpacing: '-0.02em', color: 'var(--bg-canvas)' }}>
        A craft built for change.
      </p>
    </section>
  );
}

function Offerings() {
  const items = [
    ['Foundation Design Sprint', 'Your product outgrew your brand. Fix both in four weeks.', 'In 30 days, Raft aligns your strategy, brand, product experience, and design foundation so customers understand your value, trust what they see, and choose you with confidence.', '/design-foundation/'],
    ['AI-Ready Design Systems', 'Build a design system your team and AI can work from.', 'Raft turns brand rules, voice, components, templates, and DESIGN.md into one shared source of truth, helping your team and AI create faster, more consistent work.', '/design-system/'],
  ];
  return (
    <section id="engage" style={homeSection}>
      <SectionLabel style={homeLabelGap}>Offerings</SectionLabel>
      <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
        {items.map(([eyebrow, heading, body, href]) => (
          <div key={eyebrow} style={{ flex: '1 1 320px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <span style={{ color: 'var(--text-accent)', fontSize: 13, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.52px' }}>{eyebrow}</span>
            <h3 style={{ fontSize: 28, fontWeight: 900, lineHeight: 1.1, margin: 0 }}>{heading}</h3>
            <p style={{ fontSize: 16, lineHeight: 1.5, margin: 0 }}>{body}</p>
            <Button href={href}>{eyebrow}</Button>
          </div>
        ))}
      </div>
    </section>
  );
}

const ARTICLES = [
  ['Stop Adding AI to the Design Process. Re-engineer It.', '../../assets/article-img-stop-adding-ai.jpg'],
  ['The AI-Native Designer Was Only Phase One', '../../assets/article-img-ai-native-designer-was-phase-1.webp'],
  ['How I Use AI', '../../assets/article-img-how-i-use-ai.webp'],
];

const FAQS = [
  ['What is Raft Design?', 'Raft Design is an AI-native studio working across the U.S. and Japan on brand, product, and digital experience. Twenty years of experience across Adobe, Walmart, and LegalOn shape how we work: hands-on, fast, and built to move with change rather than around it.'],
  ['What does "AI-native studio" mean?', "It means AI is part of how the work gets made, not just what it's about. Strategy forms in conversation with language models, design and prototype move together, and working software gets built without the usual handoff between design and engineering."],
  ['How do engagements work?', "Three ways, depending on what a team needs. We take on projects like a traditional studio. We embed as fractional design leadership when a team is scaling. And we consult with teams that want to make their own design practice AI-native."],
  ['Does Raft Design design, or also build?', 'Both. Most studios hand off static designs for someone else to build. We take work through to functioning software — prototypes that behave like the real thing, using tools like Claude Code, Cursor, and V0.'],
];

function Home({ onScan, onNavigate, onContact }) {
  return (
    <main>
      <Hero />
      <Approach />
      <Work onNavigate={onNavigate} />
      <MessagePanel />
      <Offerings />
      <section style={{ padding: 32, maxWidth: 1920, borderTop: '1px solid var(--border-rule)' }}>
        <CtaBanner heading="Design Intelligence Engine" body="Ever wondered if your site is designed or built well? Is it readable by LLMs or search? Let our intelligent tool scan your site and give you a genuine score." cta="Scan your site" onCta={onScan} />
      </section>
      <section id="journal" style={homeSection}>
        <SectionLabel style={homeLabelGap}>Journal</SectionLabel>
        <div style={{ display: 'flex', gap: 20, overflowX: 'auto' }}>
          {ARTICLES.map(([t, img]) => <JournalCard key={t} variant="carousel" title={t} image={img} href="#" />)}
        </div>
      </section>
      <section id="faqs" style={homeSection}>
        <SectionLabel style={{ marginBottom: 'var(--space-xxl)' }}>FAQs</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xxl)' }}>
          {[[0, 1], [2, 3]].map(row => (
            <div key={row[0]} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-xxxl)', flexWrap: 'wrap' }}>
              {row.map(i => <FaqItem key={i} question={FAQS[i][0]} answer={FAQS[i][1]} />)}
            </div>
          ))}
        </div>
      </section>
      <section style={{ padding: '80px 15px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, textAlign: 'center' }}>
        <p style={{ fontSize: 'clamp(30px, 7vw, 64px)', fontWeight: 900, lineHeight: 1, margin: 0 }}>Ready to move at <span style={{ color: 'var(--text-accent)' }}>Raft</span> speed?</p>
        <SolidButton onClick={onContact}>Book a consultation</SolidButton>
        <a href="/assets/raft-design-overview.pdf" style={{ color: 'var(--text-accent)', fontSize: 16 }}>→ Download the Raft overview (PDF)</a>
      </section>
    </main>
  );
}

Object.assign(window, { Home });
