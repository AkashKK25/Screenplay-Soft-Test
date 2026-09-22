export interface Project {
  id: number;
  title: string;
  logline: string | null;
  created_at: string;
  updated_at: string;
}

export type IdeaTag = "character" | "world" | "theme" | "image" | "twist" | null;

export interface Idea {
  id: number;
  project_id: number;
  body: string;
  tag: IdeaTag;
  position: number;
  created_at: string;
}

export interface Premise {
  id: number;
  project_id: number;
  version: number;
  logline: string;
  synopsis: string | null;
  is_current: 0 | 1;
  created_at: string;
}

export type BeatKind = "story" | "plot";

export interface Beat {
  id: number;
  project_id: number;
  parent_beat_id: number | null;
  idea_id: number | null;
  kind: BeatKind;
  title: string;
  summary: string | null;
  act: number | null;
  position: number;
  created_at: string;
}

export type SceneStatus = "outline" | "drafted" | "revised" | "locked";

export interface Scene {
  id: number;
  project_id: number;
  beat_id: number | null;
  heading: string;
  summary: string | null;
  position: number;
  status: SceneStatus;
  created_at: string;
  updated_at: string;
}

export type ElementType =
  | "scene_heading"
  | "action"
  | "character"
  | "dialogue"
  | "parenthetical"
  | "transition";

export interface ScreenplayElement {
  id: number;
  scene_id: number;
  type: ElementType;
  text: string;
  position: number;
}
