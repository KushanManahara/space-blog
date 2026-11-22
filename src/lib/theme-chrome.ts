/**
 * Synchronises browser system chrome (`<meta name="theme-color">`,
 * `<meta name="color-scheme">`) with the active Light / Dark theme so iOS
 * Safari, Android Chrome, and installed PWAs paint the top status bar and
 * bottom navigation area with the same surface token as `--color-bg-1`.
 *
 * Fallback values mirror `--color-n-50` (light) and `--color-n-950` (dark)
 * from `src/app/globals.css`. At runtime `resolveThemeSurfaceColor` reads the
 * live computed `--color-bg-1` custom property first so CSS remains the single
 * source of truth.
 */
export type ThemeMode = "light" | "dark";

export const THEME_CHROME_COLORS: Record<ThemeMode, string> = {
  light: "#f8fafc",
  dark: "#080d1a",
};

/**
 * Reads the computed `--color-bg-1` surface token from `:root` when available,
 * falling back to `THEME_CHROME_COLORS[theme]` if styles have not resolved yet.
 */
export function resolveThemeSurfaceColor(theme: ThemeMode): string {
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    const computed = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue("--color-bg-1")
      .trim();
    if (computed) return computed;
  }
  return THEME_CHROME_COLORS[theme];
}

function upsertHeadMeta(name: string, content: string): void {
  if (typeof document === "undefined" || !document.head) return;

  const existing = Array.from(
    document.head.querySelectorAll<HTMLMetaElement>(`meta[name="${name}"]`),
  );
  const primary = existing[0];

  // Remove any duplicate tags (e.g. media-scoped theme-color tags) so Safari
  // and Chrome always read the single active theme value.
  for (let i = 1; i < existing.length; i += 1) {
    existing[i]?.remove();
  }

  if (primary) {
    if (primary.hasAttribute("media")) primary.removeAttribute("media");
    if (primary.getAttribute("content") !== content) {
      primary.setAttribute("content", content);
    }
    return;
  }

  const meta = document.createElement("meta");
  meta.name = name;
  meta.content = content;
  document.head.appendChild(meta);
}

/**
 * Updates `<meta name="theme-color">` and `<meta name="color-scheme">` to match
 * the currently active theme.
 */
export function syncThemeChrome(theme: ThemeMode): void {
  upsertHeadMeta("theme-color", resolveThemeSurfaceColor(theme));
  upsertHeadMeta("color-scheme", theme);
}

/**
 * Compact `beforeInteractive` inline script injected in `RootLayout`.
 *
 * Light by default; dark only when the reader explicitly chose it
 * (`localStorage.theme === "dark"`). Applies the root class AND updates
 * `<meta name="theme-color">` / `<meta name="color-scheme">` synchronously
 * before first paint so iOS Safari and Android Chrome never flash a white
 * status bar in dark mode.
 */
export function getThemeInitScript(): string {
  return `
    (function () {
      var dark = false;
      try {
        dark = localStorage.getItem('theme') === 'dark';
      } catch (_) {}
      var mode = dark ? 'dark' : 'light';
      var color = dark ? '${THEME_CHROME_COLORS.dark}' : '${THEME_CHROME_COLORS.light}';
      var root = document.documentElement;
      root.classList.add(mode);
      root.classList.remove(dark ? 'light' : 'dark');
      var head = document.head;
      if (!head) return;
      function setMeta(name, value) {
        var nodes = head.querySelectorAll('meta[name="' + name + '"]');
        for (var i = 1; i < nodes.length; i++) nodes[i].remove();
        var el = nodes[0];
        if (!el) {
          el = document.createElement('meta');
          el.setAttribute('name', name);
          head.appendChild(el);
        }
        el.removeAttribute('media');
        el.setAttribute('content', value);
      }
      setMeta('theme-color', color);
      setMeta('color-scheme', mode);
    })();
  `.trim();
}
