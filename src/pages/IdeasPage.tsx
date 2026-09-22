import { useEffect, useState } from "react";
import { getDb } from "../db/client";
import type { Idea } from "../db/types";

// TODO: replace with the real active project id once project switching exists.
const PROJECT_ID = 1;

export default function IdeasPage() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    void loadIdeas();
  }, []);

  async function loadIdeas() {
    const db = await getDb();
    const rows = await db.select<Idea[]>(
      "SELECT * FROM ideas WHERE project_id = $1 ORDER BY position ASC, id ASC",
      [PROJECT_ID]
    );
    setIdeas(rows);
  }

  async function addIdea() {
    if (!draft.trim()) return;
    const db = await getDb();
    await db.execute("INSERT INTO ideas (project_id, body, position) VALUES ($1, $2, $3)", [
      PROJECT_ID,
      draft.trim(),
      ideas.length,
    ]);
    setDraft("");
    await loadIdeas();
  }

  return (
    <section className="page page--ideas">
      <header className="page__header">
        <h1>Ideas</h1>
        <p>Drop anything here — a line, a character, an image. Sort it out later.</p>
      </header>

      <form
        className="idea-composer"
        onSubmit={(e) => {
          e.preventDefault();
          void addIdea();
        }}
      >
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="What if..."
          rows={3}
        />
        <button type="submit">Add idea</button>
      </form>

      <div className="idea-grid">
        {ideas.map((idea) => (
          <article key={idea.id} className="idea-card">
            <p>{idea.body}</p>
            {idea.tag && <span className="idea-card__tag">{idea.tag}</span>}
          </article>
        ))}
        {ideas.length === 0 && <p className="empty-state">No ideas yet. Add your first one above.</p>}
      </div>
    </section>
  );
}
