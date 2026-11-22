import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, test } from "node:test";

import {
  getThemeInitScript,
  resolveThemeSurfaceColor,
  THEME_CHROME_COLORS,
} from "@/lib/theme-chrome";

describe("theme chrome & safe-area tokens", () => {
  const globalsCss = readFileSync("src/app/globals.css", "utf8");
  const manifest = JSON.parse(readFileSync("public/site.webmanifest", "utf8")) as {
    background_color: string;
    theme_color: string;
  };

  test("THEME_CHROME_COLORS matches --color-n-50 and --color-n-950 in globals.css", () => {
    const lightMatch = globalsCss.match(/--color-n-50:\s*(#[0-9a-fA-F]{6})/);
    const darkMatch = globalsCss.match(/--color-n-950:\s*(#[0-9a-fA-F]{6})/);

    assert.ok(lightMatch, "expected --color-n-50 token in globals.css");
    assert.ok(darkMatch, "expected --color-n-950 token in globals.css");
    assert.equal(THEME_CHROME_COLORS.light, lightMatch[1].toLowerCase());
    assert.equal(THEME_CHROME_COLORS.dark, darkMatch[1].toLowerCase());
  });

  test("globals.css defines safe-area custom properties and paints root html background", () => {
    assert.match(globalsCss, /--safe-top:\s*env\(safe-area-inset-top,\s*0px\)/);
    assert.match(globalsCss, /--safe-right:\s*env\(safe-area-inset-right,\s*0px\)/);
    assert.match(globalsCss, /--safe-bottom:\s*env\(safe-area-inset-bottom,\s*0px\)/);
    assert.match(globalsCss, /--safe-left:\s*env\(safe-area-inset-left,\s*0px\)/);
    assert.match(globalsCss, /html\s*\{[\s\S]*background-color:\s*var\(--color-bg-1\)/);
    assert.match(globalsCss, /scroll-padding-top:\s*calc\(var\(--safe-top\)\s*\+/);
    assert.match(globalsCss, /scroll-padding-bottom:\s*calc\(var\(--safe-bottom\)\s*\+/);
  });

  test("site.webmanifest matches default light surface color", () => {
    assert.equal(manifest.background_color.toLowerCase(), THEME_CHROME_COLORS.light);
    assert.equal(manifest.theme_color.toLowerCase(), THEME_CHROME_COLORS.light);
  });

  test("resolveThemeSurfaceColor falls back cleanly outside a browser", () => {
    assert.equal(resolveThemeSurfaceColor("light"), THEME_CHROME_COLORS.light);
    assert.equal(resolveThemeSurfaceColor("dark"), THEME_CHROME_COLORS.dark);
  });

  test("getThemeInitScript embeds both light and dark surface colors and syncs theme-color + color-scheme", () => {
    const script = getThemeInitScript();
    assert.ok(script.includes(THEME_CHROME_COLORS.dark));
    assert.ok(script.includes(THEME_CHROME_COLORS.light));
    assert.ok(script.includes("theme-color"));
    assert.ok(script.includes("color-scheme"));
  });
});
