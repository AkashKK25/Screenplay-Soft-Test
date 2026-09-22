export default function PremisePage() {
  return (
    <section className="page page--premise">
      <header className="page__header">
        <h1>Premise</h1>
        <p>Distill the idea pool into a logline and a short synopsis.</p>
      </header>
      {/* TODO: logline field + synopsis textarea, backed by the `premises` table.
          Saving a new version should set is_current and keep prior versions for history. */}
      <p className="empty-state">Not built yet — wire this to the `premises` table next.</p>
    </section>
  );
}
