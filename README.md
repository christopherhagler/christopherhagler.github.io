# christopherhagler.github.io

My personal site — a single-page Angular app with a dark/neon aesthetic,
animated canvas background, and scroll-reveal animations. Auto-deployed to
GitHub Pages.

**Live:** https://christopherhagler.github.io

## Develop

```bash
npm install
npm start          # dev server at http://localhost:4200
npm run build      # production build -> dist/portfolio/browser
```

## Editing content

All copy lives in [`src/app/content.ts`](src/app/content.ts) — edit the
`SKILL_GROUPS`, `EXPERIENCE`, and `PROJECTS` arrays to update Skills,
Experience, and Projects. Hero/About and Contact text is in
[`src/app/app.html`](src/app/app.html). Design tokens (colors, fonts) are in
[`src/styles.scss`](src/styles.scss).

Entries marked `TODO` in `content.ts` are placeholders — swap in your real
roles and projects. To enable the **Download résumé** button, drop a
`resume.pdf` into the [`public/`](public) folder.

## Deployment

Pushing to `main` triggers
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds the
app and publishes it to GitHub Pages. One-time setup in the repo:
**Settings → Pages → Build and deployment → Source = GitHub Actions**.
