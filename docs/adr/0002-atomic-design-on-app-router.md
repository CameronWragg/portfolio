# Atomic design layers on top of the Next.js App Router

Components follow atomic design: `src/components/{atoms,molecules,organisms,templates}/`. Next's `src/app/` route files play the role of _pages_. Next's own `layout.tsx` and `template.tsx` overlap with the _template_ layer, so we fix the boundary:

- Route files (`page.tsx`, `layout.tsx`) only fetch data and pass it to one Template. They have no markup of their own beyond that.
- Templates own page structure.
- Next's special `template.tsx` file is not used, so "template" always means the atomic layer.
- `'use client'` goes on the smallest component that needs it, such as the Tag filter, never on a template or organism.
