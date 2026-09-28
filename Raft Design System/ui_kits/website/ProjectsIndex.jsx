const { PageHero, WorkCard } = window.RaftDesignSystem_76d511;

const WORK = [
  ["LegalOn's AI Brand Platform", '../../assets/Modular-2.webp'],
  ['Adobe Express Photos', '../../assets/adp-hero.jpg'],
  ["Walmart's AI-First Shopping Experience", '../../assets/ADP-thumbnail-1.webp'],
  ['Adobe Express Enterprise Platform', '../../assets/ADP-thumbnail-8.webp'],
  ['Modere eCommerce', '../../assets/Harmony-thumbnail-01.webp'],
  ['Modular Suite for XD', '../../assets/Modular-6.webp']
];

function ProjectsIndex() {
  return (
    <main>
      <PageHero title="Projects" intro="Brand and AI product work across the U.S. and Japan, for companies from category-defining startups to the Fortune 1." />
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', paddingBottom: 'var(--space-huge)' }}>
        {[[0, 1], [2, 3], [4, 5]].map((row, ri) => (
          <div key={ri} style={{ display: 'flex', gap: 'var(--space-xxxl)', width: '100%', padding: ri === 0 ? '0 clamp(20px, 6vw, 60px) var(--space-lg)' : 'var(--space-xxl) clamp(20px, 6vw, 60px) var(--space-lg)' }}>
            {row.map(i => <WorkCard key={i} title={WORK[i][0]} image={WORK[i][1]} href="#" />)}
          </div>
        ))}
      </div>
    </main>
  );
}
Object.assign(window, { ProjectsIndex });
