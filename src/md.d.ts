// Markdown files are imported as raw strings via the esbuild `text` loader
// (configured in angular.json). This lets post content be bundled and
// prerendered at build time instead of fetched at runtime.
declare module '*.md' {
  const content: string;
  export default content;
}
