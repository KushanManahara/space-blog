/*
 * Python runner for runnable code blocks.
 *
 * Runs in a Web Worker so a slow import or an accidental long loop cannot
 * freeze the article. Pyodide and its packages are fetched from the CDN on the
 * first run only — nothing is downloaded unless a reader actually presses Run.
 */

const PYODIDE_VERSION = "0.28.3";
const PYODIDE_URL = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

let pyodideReady = null;

function post(type, payload) {
  self.postMessage({ type, ...payload });
}

async function getPyodide() {
  if (pyodideReady) return pyodideReady;

  pyodideReady = (async () => {
    post("status", { message: "Downloading Python…" });
    self.importScripts(`${PYODIDE_URL}pyodide.js`);
    return await self.loadPyodide({ indexURL: PYODIDE_URL });
  })();

  return pyodideReady;
}

self.onmessage = async (event) => {
  const { code, id } = event.data;

  try {
    const pyodide = await getPyodide();

    post("status", { message: "Loading packages…" });
    await pyodide.loadPackagesFromImports(code);

    post("status", { message: "Running…" });

    // Hooked up only around the reader's code: the package loader writes its
    // own progress to stdout, and that chatter is not their program's output.
    pyodide.setStdout({ batched: (line) => post("stdout", { line }) });
    pyodide.setStderr({ batched: (line) => post("stderr", { line }) });

    // Pyodide returns the value of the trailing expression, the way a notebook
    // cell does, so code that ends in a bare expression still shows something.
    let result;
    try {
      result = await pyodide.runPythonAsync(code);
    } finally {
      pyodide.setStdout({});
      pyodide.setStderr({});
    }

    post("done", {
      id,
      result: result === undefined || result === null ? null : String(result),
    });
  } catch (error) {
    post("done", { id, error: String(error?.message ?? error) });
  }
};
