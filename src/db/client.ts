import Database from "@tauri-apps/plugin-sql";

// One SQLite file per install, stored in the app's data dir (Tauri resolves
// "sqlite:screenplay-studio.db" relative to $APP_DATA on desktop).
let dbInstance: Database | null = null;

export async function getDb(): Promise<Database> {
  if (!dbInstance) {
    dbInstance = await Database.load("sqlite:screenplay-studio.db");
    await migrate(dbInstance);
  }
  return dbInstance;
}

async function migrate(db: Database) {
  // In dev, schema.sql is applied by the Rust side on startup (see
  // src-tauri/src/main.rs). This is a safety net for first run.
  const schema = await fetch("/src/db/schema.sql").then((r) => r.text()).catch(() => null);
  if (schema) {
    for (const statement of schema.split(";").map((s) => s.trim()).filter(Boolean)) {
      await db.execute(statement);
    }
  }
}
