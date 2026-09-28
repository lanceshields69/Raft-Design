const { LogoBlock, ClientLogoMarquee, SectionLabel, ServiceCard, TextLink, Button, StatValue, CtaBanner, JournalCard, FaqItem } = window.RaftDesignSystem_76d511;

const section = { padding: '20px 15px 120px', maxWidth: 1920, borderTop: '1px solid var(--border-rule)' };
const twoCol = { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 40 };
const labelGap = { marginBottom: 133 };

function HeroLockup() {
  return (
    <section style={{ padding: '45px 15px 0' }}>
      <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'auto 1fr', gridTemplateRows: 'auto auto auto', columnGap: 30, rowGap: 25, paddingBottom: 80, borderBottom: '1px solid var(--border-rule)' }}>
        <div style={{ gridColumn: 1, gridRow: 1, marginTop: 50, marginBottom: 10 }}><LogoBlock size={300} /></div>
        <h1 style={{ gridColumn: 2, gridRow: 1, minWidth: 0, marginTop: 50 }}>
          {['DESIGNING', null, 'TIMES AHEAD.'].map((l, i) => l === null
            ? <span key="e" style={{ display: 'block', fontSize: 128, lineHeight: 0.78, letterSpacing: '-0.03em', color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>FOR <span className="emphasis" style={{ fontSize: 145, lineHeight: 0, display: 'inline-block' }}>turbulent</span></span>
            : <span key={l} style={{ display: 'block', fontSize: 128, lineHeight: 0.78, letterSpacing: '-0.03em', color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>{l}</span>)}
        </h1>
        <p style={{ gridColumn: 1, gridRow: 2, alignSelf: 'start', fontWeight: 900, fontSize: 16, letterSpacing: '-0.02em', color: 'var(--text-accent)' }}>AI-Native Product Studio</p>
        <div style={{ gridColumn: 2, gridRow: 2, alignSelf: 'start', display: 'flex', gap: 20 }}>
          {['AI product design', 'Brand systems', 'Product strategy', 'Design through build'].map(t => (
            <p key={t} style={{ fontSize: 16, lineHeight: 0.95 }}><span style={{ color: 'var(--text-accent)' }}>→</span> {t}</p>
          ))}
        </div>
        <div style={{ gridColumn: '1 / -1', gridRow: 3, marginTop: 95 }}><ClientLogoMarquee /></div>
      </div>
    </section>
  );
}

function Approach() {
  return (
    <section id="approach" style={section}>
      <SectionLabel style={labelGap}>Approach</SectionLabel>
      <div style={twoCol}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
          <p style={{ fontSize: 28, fontWeight: 900, lineHeight: 0.95, maxWidth: 368 }}>Creating experiences to get you where you need to go, even as the water keeps changing.</p>
          <p style={{ fontSize: 16, lineHeight: 1.4, maxWidth: 615 }}>AI is changing how people find, trust, and use everything, and most companies feel it without knowing what to do next. Startups move fast on engineering but haven't built the brand people stay for. Established companies have the trust, and are still learning to carry it into an AI-first world. We work with both. Strategy, design, and build happen together, not handed off in sequence.</p>
        </div>
        <img src="../../assets/Thesis.png" alt="" style={{ flexShrink: 0, width: 250, height: 250, objectFit: 'cover', background: 'var(--lime)', borderRadius: 'var(--radius-sm)' }} />
      </div>
    </section>
  );
}

const EXPERTISE = [
  ['Brand strategy & design', 'We define what brands stand for and how they show up. Positioning, identity, and systems built to scale and evolve. AI expands how we explore and create.', 'Brand strategy, identity systems, positioning, art direction'],
  ['Products & platforms', 'Websites, apps, and platforms built for adoption. Design that adapts as the product grows and holds up when the team scales past the people who started it.', 'Product design, UX, design systems, web, mobile'],
  ['AI product design', 'Companies are still catching up on agentic AI. The model working is not the same as the product working. Design decides whether people trust it and come back.', 'AI product design, agentic interfaces, conversational UI'],
  ['Global brand & product', 'Brands and products that work in one market rarely survive translation intact. Meaning has to be rebuilt, not converted. Bilingual design leadership across the US and Japan.', 'Global brand platforms, localization, bilingual leadership']
];

function Expertise() {
  return (
    <section id="expertise" style={section}>
      <SectionLabel style={labelGap}>Expertise</SectionLabel>
      <div style={twoCol}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          {[[0, 1], [2, 3]].map(row => (
            <div key={row[0]} style={{ display: 'flex', gap: 40 }}>
              {row.map(i => <ServiceCard key={i} title={EXPERTISE[i][0]} body={EXPERTISE[i][1]} tagline={EXPERTISE[i][2]} />)}
            </div>
          ))}
        </div>
        <img src="../../assets/anime-1.gif" alt="" style={{ flexShrink: 0, width: 250, height: 250, borderRadius: 'var(--radius-sm)' }} />
      </div>
    </section>
  );
}

const PROJECTS = [
  {
    id: 'legalon', name: "LegalOn's AI Brand Platform", subtitle: 'Global Brand & Product Platform',
    body: "LegalOn built Japan's leading legal AI, then expanded into a broader suite of AI-powered business products. The new platform had to hold two opposing demands at once: one coherent global identity across seven products, and enough room for each to stand on its own. The resolution was the “ON” concept: always on, always intelligent, always working.",
    images: ['../../assets/Modular-2.webp', '../../assets/Modular-5.webp', '../../assets/Modular-6.webp']
  },
  {
    id: 'adobe', name: 'Adobe Express Photos', subtitle: '0-to-1 AI Product Design',
    body: "Adobe wanted to democratize image editing. Adobe's new AI-powered desktop image editor transforms complex editing into one-click operations, making professional-quality enhancement accessible to marketers, SMBs, office workers, and consumers.",
    images: ['../../assets/Harmony-thumbnail-01.webp', '../../assets/Harmony-thumbnail-02.webp', '../../assets/Harmony-thumbnail-03.webp']
  }
];

function Project({ p, onOpenImage }) {
  return (
    <article style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: '0 15px 50px', maxWidth: 1920 }}>
      <div style={{ display: 'flex', gap: 20, overflowX: 'auto' }}>
        {p.images.map(src => (
          <img key={src} src={src} alt="" onClick={() => onOpenImage(src)}
            style={{ flex: '0 0 calc(42% - 5px)', width: 'calc(42% - 5px)', objectFit: 'cover', aspectRatio: 1, borderRadius: 'var(--radius-md)', border: '1px solid var(--border-rule)', cursor: 'zoom-in' }} />
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', fontSize: 16, letterSpacing: '-0.48px' }}>
        <div style={{ display: 'flex', gap: 'var(--space-md)', fontWeight: 600, fontSize: 24, width: 682, lineHeight: 1 }}>
          <span style={{ color: 'var(--text-accent)', flexShrink: 0 }}>Project</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: 572 }}>
            <p style={{ fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1 }}>{p.name}</p>
            <p style={{ color: 'var(--text-muted)', fontWeight: 500 }}>{p.subtitle}</p>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 30, width: 316, lineHeight: 1.1 }}>
          <p>{p.body}</p>
          <TextLink href="#">See Project</TextLink>
        </div>
      </div>
    </article>
  );
}

function Studio() {
  const stats = [['540M+', 'Users and visitors interacted with our design in Walmart app'], ['114%', 'Increase of monthly active users from our strategy'], ['5X', 'Increase in add-on discovery and use in Express']];
  const awards = ['Webby Winner - All-in-One AI-Powered Creativity App, 2024, For Adobe Express', 'Webby Winner - Best Nonprofit Website, 2016, For Thatsnotcool.com', 'W3 Award - Gold: Mobile Apps - Education, 2017, For Respect Effect mobile app', 'Good Design Award - Best Global Website, 2008, For Hitachi.com'];
  return (
    <section id="studio" style={{ padding: '0 15px 50px', maxWidth: 1920, borderTop: '1px solid var(--border-rule)' }}>
      <SectionLabel style={{ marginTop: 20, marginBottom: 133 }}>Studio</SectionLabel>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%', gap: 40 }}>
        <div style={{ width: 633, flexShrink: 0, paddingTop: 12 }}>
          <p style={{ fontSize: 30, lineHeight: 1, letterSpacing: '-0.6px', maxWidth: 325, marginBottom: 'var(--space-lg)' }}>Raft Design is an AI-native studio collaborating with companies in the U.S. and Japan on brand, product, and innovation.</p>
          <p style={{ fontSize: 16, lineHeight: 1.5, maxWidth: 500 }}>Twenty years of building brand, product, and platform work across Tokyo and San Francisco taught the same lesson twice: what survives isn't the work built to impress. It's the work built to move. Design leadership at Adobe and Walmart. Brand and product work with LegalOn, Visa, Hitachi, and Red Bull.</p>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20, width: 417 }}>
          {stats.map(([v, l], i) => (
            <React.Fragment key={v}>
              <StatValue size="lg" italic value={v} label={l} />
              {i < stats.length - 1 ? <hr /> : null}
            </React.Fragment>
          ))}
        </div>
        <img src="../../assets/anime-6.gif" alt="" style={{ flexShrink: 0, width: 250, height: 250, borderRadius: 'var(--radius-sm)' }} />
      </div>
      <div style={{ marginTop: 'var(--space-xxl)', marginBottom: 'var(--space-lg)' }}>
        <p style={{ fontSize: 30, fontWeight: 400, lineHeight: 1, letterSpacing: '-0.6px', marginBottom: 32 }}>Awards</p>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-xxl)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', width: 'fit-content' }}>
            {awards.map(a => <div key={a} style={{ padding: 'var(--space-md) 0', borderBottom: '1px solid var(--border-rule)' }}><p style={{ fontSize: 16, lineHeight: 1.5 }}>{a}</p></div>)}
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <img src="../../assets/awards-logos.png" alt="" style={{ width: 'auto', height: 420 }} />
          </div>
        </div>
      </div>
    </section>
  );
}

const FAQS = [
  ['What is Raft Design?', "Raft Design is an AI-native studio working across the U.S. and Japan on brand, product, and digital experience. Twenty years of experience across Adobe, Walmart, and LegalOn shape how we work: hands-on, fast, and built to move with change rather than around it."],
  ['What does "AI-native studio" mean?', "It means AI is part of how the work gets made, not just what it's about. Strategy forms in conversation with language models, design and prototype move together, and working software gets built without the usual handoff between design and engineering."],
  ['Does Raft Design work in Japanese?', 'Yes. We work natively in both Japanese and English, with design leadership across both markets. For Japanese companies expanding abroad, or global brands entering Japan, we rebuild meaning for the new market rather than translating it — the harder and more important work.'],
  ['Does Raft Design design, or also build?', 'Both. Most studios hand off static designs for someone else to build. We take work through to functioning software — prototypes that behave like the real thing, testable and demoable, using tools like Claude Code, Cursor, and V0.']
];

const ARTICLES = [
  ['Stop Adding AI to the Design Process. Re-engineer It.', '../../assets/article-img-stop-adding-ai.jpg'],
  ['The AI-Native Designer Was Only Phase One', '../../assets/article-img-ai-native-designer-was-phase-1.webp'],
  ['How I Use AI', '../../assets/article-img-how-i-use-ai.webp'],
  ['Designing for Awareness: How Multimodal AI Is Reshaping the Future of Interaction', '../../assets/article-img-Designing-for-Awareness.png']
];

function Home({ onContact, onScan, onOpenImage, onNavigate }) {
  return (
    <main>
      <HeroLockup />
      <Approach />
      <Expertise />
      <section id="projects" style={{ padding: '20px 15px 50px', display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 1920, borderTop: '1px solid var(--border-rule)' }}>
        <SectionLabel style={labelGap}>Projects</SectionLabel>
        {PROJECTS.map(p => <Project key={p.id} p={p} onOpenImage={onOpenImage} />)}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
          <Button href="#" onClick={() => onNavigate({ label: 'Projects' })}>View all projects</Button>
        </div>
      </section>
      <Studio />
      <section style={{ padding: 'var(--space-xl)', maxWidth: 1920, borderTop: '1px solid var(--border-rule)' }}>
        <CtaBanner heading="Design Intelligence Engine" body="Ever wondered if your site is designed or built well? Is it readable by LLMs or search? Let our intelligent tool scan your site and give you a genuine score." cta="Scan your site" onCta={onScan} />
      </section>
      <section id="journal" style={{ padding: '0 15px 50px', maxWidth: 1920, borderTop: '1px solid var(--border-rule)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-lg) 1px var(--space-xxl)' }}>
          <SectionLabel>Journal</SectionLabel>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
            <a href="#" onClick={e => { e.preventDefault(); onNavigate({ label: 'Journal' }); }} style={{ fontSize: 16, color: 'var(--text-muted)' }}>View all articles →</a>
            <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
              {['←', '→'].map(a => <button key={a} type="button" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 48, height: 48, border: '1px solid var(--border-button)', borderRadius: 'var(--radius-pill)', background: 'none', color: 'var(--text-accent)', fontSize: 18, fontWeight: 700, cursor: 'pointer' }}>{a}</button>)}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 20, width: '100%', overflowX: 'auto', paddingBottom: 'var(--space-sm)' }}>
          {ARTICLES.map(([t, img]) => <JournalCard key={t} variant="carousel" title={t} image={img} href="#" />)}
        </div>
      </section>
      <section id="faqs" style={{ padding: 'var(--space-lg) var(--space-md) var(--space-huge)', maxWidth: 1920, borderTop: '1px solid var(--border-rule)' }}>
        <SectionLabel style={{ marginBottom: 'var(--space-xxl)' }}>FAQs</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xxl)' }}>
          {[[0, 1], [2, 3]].map(row => (
            <div key={row[0]} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-xxxl)' }}>
              {row.map(i => <FaqItem key={i} question={FAQS[i][0]} answer={FAQS[i][1]} />)}
            </div>
          ))}
        </div>
      </section>
      <section id="contact" style={{ padding: '0 30px 50px', display: 'flex', flexDirection: 'column', gap: 34, maxWidth: 1920 }}>
        <hr />
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
          <p style={{ fontSize: 36, fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.025em' }}><span style={{ color: 'var(--text-accent)' }}>Connect</span> with me to explore your project's potential.</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-md)', flex: '1 1 auto' }}>
            <Button wide onClick={onContact}>Send a message</Button>
          </div>
        </div>
        <hr />
      </section>
    </main>
  );
}

Object.assign(window, { Home });
