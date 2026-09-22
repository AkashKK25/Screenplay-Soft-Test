# Screenplay Studio

A local, offline desktop tool for the full screenplay pipeline:

**Ideas → Premise → Outline (story + plot beats) → Scenes → Screenplay**

Every stage keeps a link back to where it came from, so a scene traces to a beat,
and a beat traces to an idea. No AI assistance — pure writing tool.

## Stack

- [Tauri 2](https://tauri.app) (Rust shell, native window, small binary)
- React + TypeScript + Vite
- SQLite via `tauri-plugin-sql`, one local `.db` file per install
- TipTap/ProseMirror for the screenplay editor (not yet wired up)

## Prerequisites

- Node.js 18+
- Rust (`rustup`) — required by Tauri
- Platform build tools Tauri needs for your OS (see the [Tauri prerequisites guide](https://tauri.app/start/prerequisites/))

## Setup

```bash
npm install
npm run tauri dev
```

This opens the app in a native window with hot reload.

## Getting a `.exe` without installing anything locally

`.github/workflows/build-windows.yml` builds a Windows installer (`.exe`/`.msi`)
on GitHub's own servers — no Node, Rust, or Tauri on your machine at all.

1. Create a free GitHub account if you don't have one, and create a new
   (private is fine) repository.
2. Push this folder to it:
   ```bash
   cd screenplay-studio
   git init
   git add .
   git commit -m "Initial scaffold"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. On GitHub, open the repo's **Actions** tab. The `build-windows-installer`
   workflow runs automatically on that push (or click "Run workflow" to
   trigger it manually).
4. When it finishes (a few minutes), open the completed run and download the
   `screenplay-studio-windows-installer` artifact — a zip containing the
   `.exe`/`.msi`. Unzip and run it to install the app normally.

Repeat step 3–4 (or just push again) any time you change the code and want a
new installer.

## Project layout

```
src/
  db/
    schema.sql       SQLite schema: projects, ideas, premises, beats, scenes, elements
    types.ts          TypeScript types mirroring the schema
    client.ts         DB connection helper
  pages/
    IdeasPage.tsx      Stage 1 — wired up, working idea pool
    PremisePage.tsx     Stage 2 — stub
    OutlinePage.tsx      Stage 3 — stub
    ScenesPage.tsx        Stage 4 — stub
    ScreenplayPage.tsx     Stage 5 — stub
  App.tsx             Shell + stage navigation
src-tauri/
  src/main.rs         Rust entry point, registers the SQL plugin
  tauri.conf.json      Window, build, and bundle config
```

## Status

Ideas page is functional end-to-end (add + list, persisted to SQLite). The other
four stages are routed and styled but not yet wired to the database — each has a
`TODO` comment describing what it needs.

## Suggested next steps, in order

1. **Premise** — logline + synopsis form, writes to `premises`, keeps version history.
2. **Outline** — beat board for `beats` (story beats, with plot beats nested under
   each), drag-reorder with `@dnd-kit` already in `package.json`.
3. **Scenes** — scene cards over `scenes`, linked to a beat, drag-reorder, status pill.
4. **Screenplay editor** — TipTap-based editor over `elements` with Tab-driven
   element cycling (scene heading → action → character → dialogue → parenthetical).
5. **Export** — Fountain (plain text) and PDF export in standard screenplay format.

## Data model notes

- `ideas.tag`, `beats.kind`/`act`, `scenes.status`, and `elements.type` are plain
  `TEXT` columns with an informal enum (see `src/db/types.ts` for the allowed
  values) rather than SQLite `CHECK` constraints, so the app can add new tags/types
  without a migration.
- `beats` is self-referential (`parent_beat_id`) so story-level and plot-level
  beats live in one tree instead of two disconnected tables.
