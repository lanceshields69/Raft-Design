const { PageHero, CommunityStrip, SectionLabel, ToolCard, GraveyardRow, Button } = window.RaftDesignSystem_76d511;

const TOOLS = [
  ['Claude', 'Reasoning / Writing', 'stack', 'core stack', 'Strategic briefs, long-form synthesis, prompt writing for coding.', 'Still the clearest reasoning model we have. The $20 Pro plan is usually enough.'],
  ['ChatGPT', 'Research / Reasoning / Visuals', 'stack', 'core stack', 'Research, synthesis, concept development, critique, image generation, translation.', 'Strong for research, synthesis, and ambiguous product problems. We use it when we want breadth and multiple perspectives.'],
  ['Claude Code', 'AI Code / Build', 'stack', 'core stack', 'Front-end builds, design-to-code handoff, live iteration during client sessions.', 'Workhorse for designer-builders — it closes the gap between Figma and shipped code without waiting on engineering.'],
  ['Cursor', 'AI Code Editor', 'rotation', 'in rotation', 'Front-end builds, design-to-code handoff, live iteration during client sessions.', 'Best for line-level work where you want to see the diff before it lands. We pair it with Claude Code for active building.'],
  ['Figma + Make + MCP', 'Design / Design-to-Code', 'stack', 'core stack', 'Design system source of truth, prompt-to-prototype drafts, and the token pipeline that feeds Claude Code directly.', 'Design workhorse. MCP means Claude Code pulls real tokens and component structure.'],
  ['Claude Design', 'Design / Prototyping', 'watching', 'watching', 'Create interactive prototypes, visual concepts, presentations, and design systems by working conversationally with Claude.', 'Potentially a very big deal. The advantage is the continuity from design intent into implementation.']
];

const GRAVEYARD = [
  ['Bolt', 'Still good. Lovable is easier when we want speed; Claude Code and Cursor give us more control.'],
  ['Uizard', 'Prompt-to-UI was impressive early. Now Figma Make, Claude Design, v0 and app builders do substantially more.'],
  ['Figma AI plugins', 'Superseded by the MCP workflow — real tokens, real component code, not a plugin guessing at both.'],
  ["DALL-E", "ChatGPT's image gen sits behind dedicated tools on generation speed and top-end aesthetics."]
];

function ToolsPage({ onContact }) {
  const wrap = { maxWidth: 1200, margin: '0 auto', paddingLeft: 'var(--space-xl)', paddingRight: 'var(--space-xl)' };
  return (
    <main>
      <PageHero title="AI Tools" intro="This is a collection of tested tools and resources for designing with AI. It's regularly updated to keep up with the fast-paced innovation in AI tooling." />
      <CommunityStrip assetBase="../../assets/" text="Many of these tools come from a meetup AI Design LA, where they're shared and tested." href="#" />
      <div style={{ width: '100%', background: 'var(--bg-canvas)' }}>
        <div style={wrap}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)', padding: 'var(--space-xxxl) 0 var(--space-xxl)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
              <SectionLabel>Active</SectionLabel>
              <p style={{ fontSize: 16, lineHeight: '24px', color: 'var(--text-muted)' }}>{TOOLS.length} tools in rotation</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-lg)' }}>
              {TOOLS.map(t => <ToolCard key={t[0]} title={t[0]} category={t[1]} status={t[2]} statusLabel={t[3]} summary={t[4]} verdict={t[5]} />)}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)', padding: 'var(--space-md) 0 var(--space-xxxl)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
              <SectionLabel>Graveyard</SectionLabel>
              <p style={{ fontSize: 16, lineHeight: '24px', color: 'var(--text-muted)' }}>Dropped, and why</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid var(--border-rule)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
              {GRAVEYARD.map(([n, note], i) => <GraveyardRow key={n} name={n} note={note} tinted={i === 1 || i === 2} style={i === GRAVEYARD.length - 1 ? { borderBottom: 'none' } : undefined} />)}
            </div>
          </div>
        </div>
      </div>
      <div style={{ padding: 'var(--space-xl)', borderTop: '1px solid var(--border-rule)' }}>
        <p style={{ maxWidth: 1200, margin: '0 auto', fontSize: 16, lineHeight: '24px' }}>Everything here is judged on real project work, not demos. Tools move between lists as they earn it.</p>
      </div>
      <div style={{ padding: 'var(--space-xxl) 0', borderTop: '1px solid var(--border-rule)' }}>
        <div style={{ ...wrap, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--space-xl)' }}>
          <p style={{ fontSize: 36, fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.025em' }}><span style={{ color: 'var(--text-accent)' }}>Using</span> something we should test?</p>
          <Button wide onClick={onContact}>Tell us about it</Button>
        </div>
      </div>
    </main>
  );
}
Object.assign(window, { ToolsPage });
