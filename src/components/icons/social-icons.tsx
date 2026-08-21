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

export function XIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 11.9 3 7c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </Svg>
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
