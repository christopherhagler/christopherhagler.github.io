# Tinyforge site

The Tinyforge website: iPhone games and apps, each with an overview, support and
privacy page (the URLs App Store listings link to). Prerendered Angular,
auto-deployed to GitHub Pages.

**Live:** https://christopherhagler.github.io

## Develop

```bash
npm install
npm start          # dev server at http://localhost:4200
npm run build      # production build + sitemap -> dist/portfolio/browser
npm test           # unit tests (Karma + Jasmine; needs Chrome, or set CHROME_BIN)
```

## Adding an app

1. Add an entry to `APPS` in `src/app/data/apps.ts` (name, tagline, features,
   support questions, privacy policy).
2. Put its icon (and an optional screenshot) in `public/apps/<slug>/`.

That's it: `/apps/<slug>`, `/apps/<slug>/support` and `/apps/<slug>/privacy` are
prerendered automatically, and the app appears on the home page, in the nav and
in the footer. The studio name lives in `src/app/data/site.ts`.
