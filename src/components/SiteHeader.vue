<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import ThemeToggle from '@/components/ThemeToggle.vue'
import { siteConfig } from '@/data/site.config'

const route = useRoute()
const open = ref(false)

watch(() => route.fullPath, () => (open.value = false))

const { name, role, links } = siteConfig.profile
</script>

<template>
  <header
    class="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--page)]/85 backdrop-blur-md"
  >
    <div class="mx-auto flex max-w-6xl items-center gap-4 px-5 py-4">
      <RouterLink
        to="/"
        class="group min-w-0 font-mono text-sm sm:text-base"
        :aria-label="`${name}, home`"
      >
        <span class="text-muted">def</span>
        <span class="text-accent"> {{ name.toLowerCase().replace(' ', '_') }}</span>
        <span class="text-muted">(</span><span class="hidden sm:inline">about_me</span
        ><span class="text-muted hidden sm:inline">) -&gt; </span>
        <span class="text-muted sm:hidden">) -&gt; </span>
        <span class="font-semibold">{{ role }}</span>
      </RouterLink>

      <nav class="ml-auto hidden items-center gap-1 md:flex" aria-label="Main">
        <RouterLink v-for="link in [{ to: '/', label: 'Home' }, { to: '/projects', label: 'Projects' }]" :key="link.to" :to="link.to" class="nav-link">
          {{ link.label }}
        </RouterLink>
        <a
          v-for="link in links"
          :key="link.url"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="nav-link"
        >
          {{ link.label }}
        </a>
        <ThemeToggle class="ml-2" />
      </nav>

      <div class="ml-auto flex items-center gap-1 md:hidden">
        <ThemeToggle />
        <button
          type="button"
          class="rounded-md p-2 text-muted transition hover:bg-[var(--surface-raised)] hover:text-[var(--text)]"
          :aria-expanded="open"
          aria-controls="mobile-nav"
          aria-label="Toggle navigation"
          @click="open = !open"
        >
          <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path v-if="!open" stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16" />
            <path v-else stroke-linecap="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>
    </div>

    <nav
      v-show="open"
      id="mobile-nav"
      class="border-t border-[var(--border)] px-5 pb-4 md:hidden"
      aria-label="Main"
    >
      <RouterLink to="/" class="nav-link block py-2">Home</RouterLink>
      <RouterLink to="/projects" class="nav-link block py-2">Projects</RouterLink>
      <a
        v-for="link in links"
        :key="link.url"
        :href="link.url"
        target="_blank"
        rel="noopener noreferrer"
        class="nav-link block py-2"
      >
        {{ link.label }} ↗
      </a>
    </nav>
  </header>
</template>

<style scoped>
/* Tailwind v4 needs the theme in scope before @apply can be used here. */
@reference "@/style.css";

.nav-link {
  @apply rounded-md px-3 py-1.5 text-sm font-medium text-[var(--text-muted)] transition;
  @apply hover:bg-[var(--surface-raised)] hover:text-[var(--text)];
}
.nav-link.router-link-exact-active {
  @apply text-[var(--accent)];
}
</style>
