/**
 * Builds a href from the current query plus an override. Keys set to
 * `undefined` (or a default value) are dropped so URLs stay clean.
 */
export function buildHref(
  pathname: string,
  current: Record<string, string | undefined>,
  overrides: Record<string, string | undefined> = {},
): string {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries({ ...current, ...overrides })) {
    if (value) params.set(key, value);
  }

  const query = params.toString();
  return query ? `${pathname}?${query}` : pathname;
}
