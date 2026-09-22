export default function ScreenplayPage() {
  return (
    <section className="page page--screenplay">
      <header className="page__header">
        <h1>Screenplay</h1>
        <p>Courier, 12pt, standard margins. Tab cycles element types.</p>
      </header>
      {/* TODO: TipTap editor over `elements`, one scene at a time or continuous
          scroll across all scenes in `position` order. Tab/Enter state machine:
          scene_heading -> action -> character -> dialogue -> (parenthetical) -> character...
          Export button -> Fountain (.fountain) and PDF. */}
      <p className="empty-state">Not built yet — wire this to the `elements` table next.</p>
    </section>
  );
}
