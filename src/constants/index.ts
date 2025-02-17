export const VIEW_MODES = {
  GRID: "grid",
  LIST: "list",
} as const;

export const CONTENT_TYPES = {
  MOVIES: "movies",
  CATEGORIES: "categories",
} as const;

export type ViewMode = (typeof VIEW_MODES)[keyof typeof VIEW_MODES];
export type ContentType = (typeof CONTENT_TYPES)[keyof typeof CONTENT_TYPES];
