/**
 * Brand marks drawn to match the rest of the icon set (24px grid, 1.75 stroke).
 * They live here because the icon library dropped brand glyphs.
 */
type IconProps = { className?: string };

function Svg({ className, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      {children}
    </svg>
  );
}

export function GitHubIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 5-1.8 5-5a4 4 0 0 0-1-2.7 3.7 3.7 0 0 0-.1-2.7s-1.2-.4-3.9 1.5a9.3 9.3 0 0 0-5 0C6.3 3.7 5.1 4.1 5.1 4.1a3.7 3.7 0 0 0-.1 2.7A4 4 0 0 0 4 9.5c0 3.2 2 5 5 5a4.8 4.8 0 0 0-1 3.5v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </Svg>
  );
}

export function LinkedInIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </Svg>
  );
}

export function XIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      {/* The X mark, not the retired Twitter bird: everywhere else the site
          calls the account "X". */}
      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
      <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
    </Svg>
  );
}

export function YouTubeIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </Svg>
  );
}

/**
 * YouTube's own logo, for the places that present the channel rather than list
 * it among the socials. Filled and in brand red, unlike the rest of this set,
 * because the brand rules do not allow it to be recoloured.
 */
export function YouTubeLogo({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 17" aria-hidden className={className}>
      <path
        className="fill-youtube"
        d="M23.498 2.641a3.016 3.016 0 0 0-2.122-2.136C19.505 0 12 0 12 0S4.495 0 2.623.505A3.017 3.017 0 0 0 .502 2.641C0 4.525 0 8.455 0 8.455s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 12.385 24 8.455 24 8.455s0-3.93-.502-5.814z"
      />
      <path className="fill-white" d="M9.545 12.023V4.887l6.273 3.568-6.273 3.568z" />
    </svg>
  );
}

export function RssIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M4 11a9 9 0 0 1 9 9" />
      <path d="M4 4a16 16 0 0 1 16 16" />
      <path d="M5 20.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
    </Svg>
  );
}
