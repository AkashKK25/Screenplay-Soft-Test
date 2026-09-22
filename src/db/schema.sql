-- Screenplay Studio schema
-- Pipeline: projects -> ideas -> premise -> beats (story/plot outline) -> scenes -> elements (screenplay text)
-- Every downstream row keeps a nullable FK back to what it grew out of, so you can
-- always trace a scene back to the beat, and the beat back to the idea.

CREATE TABLE IF NOT EXISTS projects (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    title       TEXT NOT NULL DEFAULT 'Untitled Project',
    logline     TEXT,
    created_at  TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Free-floating idea pool: fragments, images, character sparks, "what if" notes.
CREATE TABLE IF NOT EXISTS ideas (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id  INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    body        TEXT NOT NULL,
    tag         TEXT,              -- 'character' | 'world' | 'theme' | 'image' | 'twist' | ...
    position    INTEGER NOT NULL DEFAULT 0,
    created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

-- One premise/logline record per project (kept separate from projects.logline so
-- earlier drafts of the premise aren't lost as it's refined).
CREATE TABLE IF NOT EXISTS premises (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id   INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    version      INTEGER NOT NULL DEFAULT 1,
    logline      TEXT NOT NULL,
    synopsis     TEXT,             -- longer paragraph form
    is_current   INTEGER NOT NULL DEFAULT 1,
    created_at   TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Beats cover both "story outline" (broad narrative movements) and "plot outline"
-- (causal beats/turns). `kind` distinguishes them; `parent_beat_id` lets plot beats
-- nest under a story beat, so the two outline levels are really one tree.
CREATE TABLE IF NOT EXISTS beats (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id      INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    parent_beat_id  INTEGER REFERENCES beats(id) ON DELETE CASCADE,
    idea_id         INTEGER REFERENCES ideas(id) ON DELETE SET NULL,
    kind            TEXT NOT NULL DEFAULT 'story',  -- 'story' | 'plot'
    title           TEXT NOT NULL,
    summary         TEXT,
    act             INTEGER,          -- 1, 2, 3 (or custom act count later)
    position        INTEGER NOT NULL DEFAULT 0,
    created_at      TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Scenes are the bridge between the plot outline and the actual screenplay text.
CREATE TABLE IF NOT EXISTS scenes (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id  INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    beat_id     INTEGER REFERENCES beats(id) ON DELETE SET NULL,
    heading     TEXT NOT NULL DEFAULT 'INT. LOCATION - DAY',
    summary     TEXT,               -- one-line scene card description
    position    INTEGER NOT NULL DEFAULT 0,
    status      TEXT NOT NULL DEFAULT 'outline',  -- 'outline' | 'drafted' | 'revised' | 'locked'
    created_at  TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Screenplay text lives as ordered elements per scene, one row per line/block,
-- so the editor can render + reflow each type (slug, action, character, dialogue,
-- parenthetical, transition) independently and export to Fountain cleanly.
CREATE TABLE IF NOT EXISTS elements (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    scene_id    INTEGER NOT NULL REFERENCES scenes(id) ON DELETE CASCADE,
    type        TEXT NOT NULL,      -- 'scene_heading' | 'action' | 'character' | 'dialogue' | 'parenthetical' | 'transition'
    text        TEXT NOT NULL DEFAULT '',
    position    INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_ideas_project      ON ideas(project_id);
CREATE INDEX IF NOT EXISTS idx_beats_project       ON beats(project_id);
CREATE INDEX IF NOT EXISTS idx_beats_parent        ON beats(parent_beat_id);
CREATE INDEX IF NOT EXISTS idx_scenes_project      ON scenes(project_id);
CREATE INDEX IF NOT EXISTS idx_scenes_beat         ON scenes(beat_id);
CREATE INDEX IF NOT EXISTS idx_elements_scene      ON elements(scene_id);
