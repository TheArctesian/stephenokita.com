/**
 * Shared helpers for the service layer.
 *
 * A Drizzle `leftJoin` returns each row split by table name, e.g.
 * `{ skills: {...}, skill_categories: {...} }`. Every "categorized" service
 * (skills, projects, …) then flattens that into the main entity with its
 * joined category attached. `attachCategory` is that flatten, in one place.
 *
 * `mainKey`/`categoryKey` are Drizzle's generated table names for the row.
 */
export function attachCategory<M, C>(
  rows: Record<string, unknown>[],
  mainKey: string,
  categoryKey: string
): (M & { category: C })[] {
  return rows.map((row) => ({
    ...(row[mainKey] as M),
    category: row[categoryKey] as C
  }));
}
