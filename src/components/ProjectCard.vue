<script setup lang="ts">
import { computed } from 'vue'

import type { Project } from '@/data/projects'

const props = defineProps<{ project: Project }>()

const imageSrc = computed(() => {
  const image = props.project.image
  if (!image) return null
  return /^https?:\/\//.test(image) ? image : import.meta.env.BASE_URL + image.replace(/^\//, '')
})

/** Deterministic hue per project, so the placeholder is stable across builds. */
const hue = computed(() => {
  let hash = 0
  for (const char of props.project.slug) hash = (hash * 31 + char.charCodeAt(0)) % 360
  return hash
})

const lastPush = computed(() =>
  new Date(props.project.pushedAt).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }),
)

const visibleTags = computed(() => props.project.tags.slice(0, 4))
</script>

<template>
  <article
    class="surface group flex flex-col overflow-hidden rounded-xl transition duration-200 hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-xl hover:shadow-black/10"
  >
    <div class="relative aspect-[16/9] overflow-hidden border-b border-[var(--border)]">
      <img
        v-if="imageSrc"
        :src="imageSrc"
        :alt="project.imageAlt"
        loading="lazy"
        decoding="async"
        class="size-full object-cover transition duration-500 group-hover:scale-105"
      />
      <div
        v-else
        class="flex size-full items-center justify-center"
        :style="{
          background: `linear-gradient(135deg, hsl(${hue} 45% 22%), hsl(${(hue + 45) % 360} 40% 12%))`,
        }"
        aria-hidden="true"
      >
        <span class="font-mono text-3xl font-bold text-white/80 sm:text-4xl">
          {{ project.slug.slice(0, 2).toUpperCase() }}
        </span>
      </div>

      <span
        v-if="project.isArchived"
        class="absolute top-3 right-3 rounded-full bg-black/70 px-2.5 py-1 font-mono text-[11px] font-medium text-white backdrop-blur"
      >
        archived
      </span>
    </div>

    <div class="flex flex-1 flex-col gap-3 p-5">
      <div class="flex items-start justify-between gap-3">
        <h3 class="text-lg font-semibold leading-tight">
          <a
            :href="project.url"
            target="_blank"
            rel="noopener noreferrer"
            class="transition after:absolute after:inset-0 hover:text-[var(--accent)]"
          >
            {{ project.name }}
          </a>
        </h3>
        <span v-if="project.stars > 0" class="shrink-0 font-mono text-xs text-muted" :title="`${project.stars} stars`">
          ★ {{ project.stars }}
        </span>
      </div>

      <p class="flex-1 text-sm leading-relaxed text-muted">{{ project.description }}</p>

      <ul v-if="visibleTags.length" class="flex flex-wrap gap-1.5">
        <li
          v-for="tag in visibleTags"
          :key="tag"
          class="rounded-md bg-[var(--surface-raised)] px-2 py-0.5 font-mono text-[11px] text-muted"
        >
          {{ tag }}
        </li>
      </ul>

      <div class="flex items-center justify-between border-t border-[var(--border)] pt-3 font-mono text-xs text-muted">
        <span>updated {{ lastPush }}</span>
        <span class="relative z-10 flex gap-3">
          <a
            v-if="project.liveUrl"
            :href="project.liveUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="transition hover:text-[var(--accent)]"
          >
            Live ↗
          </a>
          <a
            :href="project.url"
            target="_blank"
            rel="noopener noreferrer"
            class="transition hover:text-[var(--accent)]"
          >
            GitHub ↗
          </a>
        </span>
      </div>
    </div>
  </article>
</template>

<style scoped>
article {
  position: relative;
}
</style>
