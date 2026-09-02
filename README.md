# Portfolio

Personal site for [Cameron Wragg](https://github.com/CameronWragg), built with Vue 3, Vite and
Tailwind CSS, and deployed to GitHub Pages.

The Projects page is generated from the public repositories on my GitHub account — all of them
personal projects — so it keeps itself up to date.

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
```

| Script              | What it does                                                        |
| ------------------- | ------------------------------------------------------------------- |
| `npm run dev`       | Vite dev server with hot reload                                      |
| `npm run sync`      | Refresh the project list from the GitHub API                         |
| `npm run build`     | Type-check and build to `dist/` (runs `sync` first, non-fatally)     |
| `npm run preview`   | Serve the production build locally                                   |
| `npm run typecheck` | `vue-tsc` only                                                       |
| `npm run lint`      | ESLint with `--fix`                                                  |

## Adding a project

**Nothing to do.** Push a public repo to GitHub and it appears on the site the next time the
site deploys — either on the next push to `main`, or on the monthly scheduled run of the deploy
workflow. Cards fall back to the repo's own name, description, topics and language breakdown.

To trigger a rebuild immediately: **Actions → Deploy to GitHub Pages → Run workflow**.

### Giving a project the full treatment

Everything customisable lives in one file: [`src/data/site.config.ts`](src/data/site.config.ts).
Add an entry to `projectOverrides`, keyed by the exact repo name:

```ts
'my-new-repo': {
  name: 'My New Repo',              // defaults to a prettified repo name
  description: 'A better blurb.',   // defaults to the GitHub description
  image: 'images/my-new-repo.png',  // put the file in public/images/
  imageAlt: 'Screenshot of the app',
  tags: ['WebGL', 'Rust'],          // merged with GitHub topics + languages
  featured: true,                   // pin to the top and show on the home page
  order: 1,                         // manual sort weight, lower first
  liveUrl: 'https://example.com',   // defaults to the repo's homepage field
  hidden: false,                    // hide without deleting the repo
},
```

Every field is optional. Projects with no image get a deterministic gradient placeholder derived
from the repo name, so a card never looks broken.

The same file also holds the profile copy (name, tagline, about text, social links) and the
`github` settings that control which repos are pulled in — `exclude`, `includeForks`,
`includeArchived` and `requireDescription`.

## How the project data works

```
GitHub API  ──npm run sync──▶  src/data/repos.generated.json  ──▶  src/data/projects.ts  ──▶  UI
                                                                        ▲
                                              src/data/site.config.ts ──┘  (overrides)
```

`scripts/sync-projects.ts` fetches public repos plus their language breakdown and writes a
snapshot to `src/data/repos.generated.json`. That snapshot **is committed** on purpose: it means
builds work offline and the site still deploys if the GitHub API is unavailable. `npm run build`
runs the sync with `--keep-on-error` so a failed fetch falls back to the committed snapshot
rather than breaking the build.

`src/data/projects.ts` merges the snapshot with the overrides at build time and does the sorting
and tag collection. No API calls happen in the browser, so there are no rate limits for visitors.

## Deployment

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds and publishes to GitHub
Pages on every push to `main`, once a month on a schedule (the 1st), and on demand.

One-time setup: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

Two details worth knowing:

- **Base path.** A project site is served from `https://<user>.github.io/<repo>/`, so the build
  needs a matching base. The workflow passes `BASE_PATH` from `actions/configure-pages`, which
  resolves to `/` automatically if a custom domain is configured. Nothing to change by hand.
- **SPA routing.** GitHub Pages has no server-side rewrites, so a deep link like `/projects`
  would 404 on a hard refresh. The workflow copies `index.html` to `404.html`, which lets
  vue-router pick the request up and render the right view.

## Stack

Vue 3 (`<script setup>`, TypeScript) · Vite · Tailwind CSS v4 · vue-router · ESLint

The site is dark by default with a light theme toggle; the choice is stored in `localStorage` and
applied before first paint so there is no flash of the wrong theme.
