# Portfolio

Personal site for [Cameron Wragg](https://github.com/CameronWragg). It's built with Next.js
(static export), TypeScript and Pico.css in a Monokai Pro Ristretto palette, and deployed to
Cloudflare Pages.

The Projects page is generated from the public Repos on my GitHub account, so it stays up to date
on its own. See [`GLOSSARY.md`](GLOSSARY.md) for the site's vocabulary and
[`docs/adr/`](docs/adr) for the decisions behind it.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script              | What it does                                                            |
| ------------------- | ----------------------------------------------------------------------- |
| `npm run dev`       | Next.js dev server                                                      |
| `npm run sync`      | Refresh `src/data/github.generated.json` from the GitHub API            |
| `npm run build`     | Sync (keeping the committed snapshot on failure), then export to `out/` |
| `npm run typecheck` | `tsc` only                                                              |
| `npm run lint`      | ESLint                                                                  |
| `npm run format`    | Prettier                                                                |
| `npm test`          | Vitest (the Repo → Project logic in `src/lib`)                          |

Set `GITHUB_TOKEN` to lift GitHub's anonymous rate limit during sync, and `SITE_URL` (e.g.
`https://example.com`) so metadata and the sitemap use absolute URLs.

## Where things live

| What                                                            | Where                                                  |
| --------------------------------------------------------------- | ------------------------------------------------------ |
| Hand-written copy: hero, about, Experience, Education, LinkedIn | `src/content/site.content.ts`                          |
| Repo filters, Overrides, Tag display names                      | `src/content/projects.config.ts`                       |
| Repo → Project logic (Overrides, Tags, Banners)                 | `src/lib/`                                             |
| Components, by atomic design layer                              | `src/components/{atoms,molecules,organisms,templates}` |
| Routes (thin: fetch data, render one Template)                  | `src/app/`                                             |
| Design tokens (Ristretto palette → Pico)                        | `src/app/globals.css`                                  |

Strings in `site.content.ts` that start with `TODO` are placeholders. `npm run dev` and
`npm run build` list any that remain.

## Adding a project

**Nothing to do.** Push a public Repo and it becomes a Project on the next deploy, either your
next push to `main` or the monthly scheduled rebuild. To polish one, add an Override keyed by the
Repo name in `src/content/projects.config.ts`:

```ts
'my-new-repo': {
  name: 'My New Repo',          // otherwise prettified from the Repo name
  description: 'Better copy.',  // otherwise the GitHub description
  tags: ['Raspberry Pi'],       // merged with languages and topics
  featured: true,               // sorts first and shows on Home
  order: 1,                     // lower sorts first
  hidden: true,                 // keep off the site
  liveUrl: 'https://…',
},
```

## Deployment (Cloudflare Pages)

Cloudflare builds from this repo on every push to `main`:

- **Build command:** `npm run build`
- **Output directory:** `out`
- **Environment variables:** `GITHUB_TOKEN` (a fine-grained token with read-only access to public
  repos) and `SITE_URL`
- Node version comes from `.nvmrc`

`.github/workflows/scheduled-rebuild.yml` triggers a monthly rebuild through a Cloudflare deploy
hook stored in the `CLOUDFLARE_DEPLOY_HOOK_URL` repo secret. Turn on Web Analytics for the Pages
project in the Cloudflare dashboard; no code change is needed.
