<script setup lang="ts">
import { computed, ref } from 'vue'

import ProjectCard from '@/components/ProjectCard.vue'
import { allTags, projects } from '@/data/projects'
import { siteConfig } from '@/data/site.config'

const query = ref('')
const activeTag = ref<string | null>(null)

const filtered = computed(() => {
  const needle = query.value.trim().toLowerCase()
  return projects.filter((project) => {
    if (activeTag.value && !project.tags.includes(activeTag.value)) return false
    if (!needle) return true
    return [project.name, project.description, project.slug, ...project.tags]
      .join(' ')
      .toLowerCase()
      .includes(needle)
  })
})

function reset() {
  query.value = ''
  activeTag.value = null
}
</script>

<template>
  <div class="mx-auto max-w-6xl px-5 py-16">
    <header>
      <p class="font-mono text-sm text-accent">$ ls ~/projects</p>
      <h1 class="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Projects</h1>
      <p class="mt-4 max-w-2xl leading-relaxed text-muted">
        Pulled straight from
        <a
          :href="`https://github.com/${siteConfig.github.user}?tab=repositories`"
          target="_blank"
          rel="noopener noreferrer"
          class="text-accent underline-offset-4 hover:underline"
          >my public GitHub repos</a
        >. New repositories appear here on the next deploy — nothing to update by hand.
      </p>
    </header>

    <div class="mt-10 flex flex-col gap-4">
      <label class="relative block max-w-md">
        <span class="sr-only">Search projects</span>
        <span class="absolute top-1/2 left-3 -translate-y-1/2 font-mono text-sm text-muted" aria-hidden="true">/</span>
        <input
          v-model="query"
          type="search"
          placeholder="Search projects…"
          class="surface w-full rounded-lg py-2.5 pr-4 pl-8 text-sm outline-none transition focus:border-[var(--accent)]"
        />
      </label>

      <ul v-if="allTags.length" class="flex flex-wrap gap-2">
        <li>
          <button type="button" class="chip" :class="{ 'chip-active': !activeTag }" @click="activeTag = null">
            All
          </button>
        </li>
        <li v-for="tag in allTags" :key="tag">
          <button
            type="button"
            class="chip"
            :class="{ 'chip-active': activeTag === tag }"
            :aria-pressed="activeTag === tag"
            @click="activeTag = activeTag === tag ? null : tag"
          >
            {{ tag }}
          </button>
        </li>
      </ul>
    </div>

    <p class="mt-8 font-mono text-xs text-muted" role="status">
      {{ filtered.length }} of {{ projects.length }} {{ projects.length === 1 ? 'project' : 'projects' }}
    </p>

    <div v-if="filtered.length" class="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <ProjectCard v-for="project in filtered" :key="project.id" :project="project" />
    </div>

    <div v-else class="surface mt-4 rounded-xl p-12 text-center">
      <p class="font-mono text-muted">No projects match that filter.</p>
      <button
        type="button"
        class="mt-4 text-sm font-semibold text-accent underline-offset-4 hover:underline"
        @click="reset"
      >
        Clear filters
      </button>
    </div>
  </div>
</template>

<style scoped>
@reference "@/style.css";

.chip {
  @apply rounded-full border border-[var(--border)] px-3 py-1 font-mono text-xs text-[var(--text-muted)] transition;
  @apply hover:border-[var(--accent)] hover:text-[var(--text)];
}
.chip-active {
  @apply border-[var(--accent)] bg-[var(--accent)] text-[var(--color-ink-950)];
}
</style>
