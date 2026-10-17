import type { NextConfig } from 'next'

import { siteContent } from './src/content/site.content'
import { findTodos } from './src/lib/todos'

// Placeholders render as-is, so shout about any that remain on every dev start and build.
const todos = findTodos(siteContent)
if (todos.length) {
  console.warn(`\n⚠ ${todos.length} TODO placeholder(s) in src/content/site.content.ts:`)
  for (const path of todos) console.warn(`  - ${path}`)
  console.warn('')
}

// Static export: `next build` writes plain files to out/ for Cloudflare to serve.
// See docs/adr/0001-nextjs-static-export.md before adding anything server-only.
const nextConfig: NextConfig = {
  output: 'export',
}

export default nextConfig
