const { PageHero, JournalCard } = window.RaftDesignSystem_76d511;

const POSTS = [
  ['Stop Adding AI to the Design Process. Re-engineer It.', 'Putting AI into every stage of a broken process just makes the same process run faster. Re-engineering the workflow itself—not bolting tools onto it—is the real work.', '../../assets/article-img-stop-adding-ai.jpg'],
  ['Why I Built a Raft, Not a Ship', 'On choosing to build something built to move with change, rather than something built to look finished.', '../../assets/article-img-the-contradiction.webp'],
  ['The AI-Native Designer Was Only Phase One', 'A team of faster designers can be a slower team. We spent the past year obsessed with getting individual designers faster with AI.', '../../assets/article-img-ai-native-designer-was-phase-1.webp'],
  ['How I Use AI', "The designers who thrive in the AI era aren't just fluent with the tools—they know exactly where human judgment takes over.", '../../assets/article-img-how-i-use-ai.webp'],
  ['Designing for Awareness: How Multimodal AI Is Reshaping the Future of Interaction', 'For most of its history, AI has been blind and deaf—reasoning only from text. Multimodal AI changes what design is responsible for.', '../../assets/article-img-Designing-for-Awareness.png'],
  ['Stop Treating AI Like Cheating on Your Homework', 'In 2026, as AI becomes standard in everyday tools, the real edge will go to design teams that stop treating it like cheating.', '../../assets/article-img-stop-treating-ai.webp']
];

function JournalIndex() {
  return (
    <main>
      <PageHero title="Journal" intro={<>Leading through design.<br />Where the practice of design meets the future of how we work.</>} />
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', paddingBottom: 'var(--space-huge)' }}>
        {[[0, 1], [2, 3], [4, 5]].map((row, ri) => (
          <div key={ri} style={{ display: 'flex', gap: 'var(--space-xxxl)', width: '100%', padding: 'var(--space-lg) clamp(20px, 6vw, 60px) var(--space-xxl)' }}>
            {row.map(i => <JournalCard key={i} title={POSTS[i][0]} excerpt={POSTS[i][1]} image={POSTS[i][2]} href="#" />)}
          </div>
        ))}
      </div>
    </main>
  );
}
Object.assign(window, { JournalIndex });
