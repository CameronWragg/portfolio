<template>
  <div class="mx-auto flex max-w-6xl flex-col items-start px-5 py-32">
    <p class="font-mono text-sm text-accent">raise HTTPError(404)</p>
    <h1 class="mt-4 text-4xl font-bold tracking-tight">This page doesn't exist</h1>
    <p class="mt-4 text-muted">The link may be out of date, or the page may have moved.</p>
    <RouterLink
      to="/"
      class="on-accent mt-8 rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold transition hover:brightness-110"
    >
      Back home
    </RouterLink>
  </div>
</template>
