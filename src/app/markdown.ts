/* ---------------------------------------------------------------------------
   Markdown → HTML rendering for blog posts.

   Runs in both the browser and at build time (prerendering), so it must stay
   free of any DOM/window dependencies. Adds:
     • syntax highlighting via highlight.js (a curated set of languages)
     • LaTeX math via KaTeX ($inline$ and $$block$$)
   The matching CSS (highlight.js theme + katex.min.css) is loaded globally in
   angular.json.
   --------------------------------------------------------------------------- */

import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import markedKatex from 'marked-katex-extension';
import hljs from 'highlight.js/lib/core';

import bash from 'highlight.js/lib/languages/bash';
import c from 'highlight.js/lib/languages/c';
import cpp from 'highlight.js/lib/languages/cpp';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import lua from 'highlight.js/lib/languages/lua';
import matlab from 'highlight.js/lib/languages/matlab';
import plaintext from 'highlight.js/lib/languages/plaintext';
import python from 'highlight.js/lib/languages/python';
import sql from 'highlight.js/lib/languages/sql';
import typescript from 'highlight.js/lib/languages/typescript';

// Register only the languages we actually write about — keeps the bundle small.
const LANGUAGES = { bash, c, cpp, javascript, json, lua, matlab, plaintext, python, sql, typescript };
for (const [name, language] of Object.entries(LANGUAGES)) {
  hljs.registerLanguage(name, language);
}

const marked = new Marked(
  markedHighlight({
    emptyLangClass: 'hljs',
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = lang && hljs.getLanguage(lang) ? lang : 'plaintext';
      try {
        return hljs.highlight(code, { language }).value;
      } catch {
        return code;
      }
    },
  }),
);

marked.use(markedKatex({ throwOnError: false }));
marked.setOptions({ gfm: true });

/** Render a markdown string to an HTML string (synchronous). */
export function renderMarkdown(md: string): string {
  return marked.parse(md, { async: false }) as string;
}
