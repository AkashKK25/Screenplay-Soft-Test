export default function ScenesPage() {
  return (
    <section className="page page--scenes">
      <header className="page__header">
        <h1>Scenes</h1>
        <p>One card per scene, each optionally linked back to a plot beat.</p>
      </header>
      {/* TODO: corkboard/list toggle over the `scenes` table, drag-reorder by
          `position`, status pill (outline/drafted/revised/locked), click-through
          to the screenplay editor for that scene. */}
      <p className="empty-state">Not built yet — wire this to the `scenes` table next.</p>
    </section>
  );
}
