/**
 * Slices a list for one page and reports how many pages there are.
 *
 * The page count has to be derived from the list being shown, not stored
 * separately: a filtered archive has fewer pages than the full one, and a
 * hardcoded total silently strands everything past the first page.
 *
 * `page` is clamped into range, so `?page=99` lands on the last page rather
 * than rendering an empty list.
 */
export function paginate<T>(
  items: T[],
  page: number,
  perPage: number,
): { items: T[]; page: number; pageCount: number } {
  const pageCount = Math.max(1, Math.ceil(items.length / perPage));
  const current = Math.min(Math.max(1, Math.trunc(page) || 1), pageCount);

  return {
    items: items.slice((current - 1) * perPage, current * perPage),
    page: current,
    pageCount,
  };
}
