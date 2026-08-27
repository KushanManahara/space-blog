import { Prism } from "prism-react-renderer";

/**
 * prism-react-renderer ships its own Prism with ~20 grammars, and bash is not
 * among them — which is most of the code on this site. Prism's language files
 * register themselves onto a global `Prism`, so that global has to be pointed
 * at the bundled instance before they are imported.
 *
 * Importing this module for its side effect is what makes the extra languages
 * available; it is safe to import more than once.
 */
type PrismGlobal = typeof globalThis & { Prism?: typeof Prism };
(globalThis as PrismGlobal).Prism = Prism;

/* eslint-disable @typescript-eslint/no-require-imports */
require("prismjs/components/prism-bash");
require("prismjs/components/prism-ini");
require("prismjs/components/prism-java");
require("prismjs/components/prism-ruby");
require("prismjs/components/prism-scss");
require("prismjs/components/prism-toml");
require("prismjs/components/prism-docker");
require("prismjs/components/prism-makefile");
/* eslint-enable @typescript-eslint/no-require-imports */

export { Prism };
