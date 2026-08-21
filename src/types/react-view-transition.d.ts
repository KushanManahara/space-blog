import "react";

/**
 * `<ViewTransition>` ships in the React build Next.js vendors internally for
 * the App Router (`node_modules/next/dist/compiled/react`), which is what
 * imports of `"react"` actually resolve to at build time — but the installed
 * `@types/react` package doesn't know about it yet. This augmentation adds
 * just enough of a type for the subset of the API this project uses.
 *
 * Reference: https://react.dev/reference/react/ViewTransition
 */
declare module "react" {
  type ViewTransitionClassPerType = Record<string, string> & { default?: string };

  interface ViewTransitionProps {
    children: ReactNode;
    /** Identity for shared-element morphing between two named instances. */
    name?: string;
    /** Remounts this boundary as a distinct enter/exit pair when it changes. */
    key?: Key;
    share?: "auto" | "none" | string | ViewTransitionClassPerType;
    enter?: "auto" | "none" | string | ViewTransitionClassPerType;
    exit?: "auto" | "none" | string | ViewTransitionClassPerType;
    update?: "auto" | "none" | string | ViewTransitionClassPerType;
    /** Class applied when no other prop matches the active transition type. */
    default?: "auto" | "none" | string;
  }

  export const ViewTransition: (props: ViewTransitionProps) => ReactElement;
}
