export default function OutlinePage() {
  return (
    <section className="page page--outline">
      <header className="page__header">
        <h1>Outline</h1>
        <p>Story beats first (the big movements), then plot beats nested under each.</p>
      </header>
      {/* TODO: three-act (or custom) columns of `beats` where kind='story', each
          expandable to its child beats where kind='plot'. Drag-reorder via @dnd-kit,
          updating `position`. */}
      <p className="empty-state">Not built yet — wire this to the `beats` table next.</p>
    </section>
  );
}
