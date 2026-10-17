# Portfolio

Personal site for [Cameron Wragg](https://github.com/CameronWragg). It's built with Next.js, TypeScript and Pico.css.

The Projects page is generated from my public repos, so it stays up to date on its own.

See [`GLOSSARY.md`](GLOSSARY.md) for the site's vocabulary and [`docs/adr/`](docs/adr) for the decisions behind it.

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
| `npm test`          | Vitest (the Repo -> Project logic in `src/lib`)                         |

## Where things live

| What                                                            | Where                                                  |
| --------------------------------------------------------------- | ------------------------------------------------------ |
| Hero, About, Experience, Education, LinkedIn                    | `src/content/site.content.ts`                          |
| Repo filters, Overrides, Tag display names                      | `src/content/projects.config.ts`                       |
| Repo -> Project logic (Overrides, Tags, Banners)                | `src/lib/`                                             |
| Components                                                      | `src/components/{atoms,molecules,organisms,templates}` |
| Routes                                                          | `src/app/`                                             |
| Design                                                          | `src/app/globals.css`                                  |

## Editing a project

To edit a project, add an Override keyed by the repo name in `src/content/projects.config.ts`:

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

Cloudflare builds from this repo on every push to `main`.

`.github/workflows/scheduled-rebuild.yml` triggers a monthly rebuild through a Cloudflare deploy hook.
