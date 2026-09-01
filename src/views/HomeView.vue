<script setup lang="ts">
import ProjectCard from '@/components/ProjectCard.vue'
import { featuredProjects, projects } from '@/data/projects'
import { siteConfig } from '@/data/site.config'

const { profile } = siteConfig
// Fall back to the most recent work if nothing has been marked as featured.
const highlights = featuredProjects.length ? featuredProjects : projects.slice(0, 3)
</script>

<template>
  <div class="mx-auto max-w-6xl px-5">
    <section class="pt-20 pb-14 sm:pt-28 sm:pb-16">
      <p class="font-mono text-sm text-accent">$ whoami</p>
      <h1 class="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">{{ profile.name }}</h1>
      <p class="mt-5 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
        {{ profile.tagline }}
      </p>

      <div class="mt-9 flex flex-wrap items-center gap-3">
        <RouterLink
          to="/projects"
          class="rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--color-ink-950)] transition hover:brightness-110"
        >
          View projects
        </RouterLink>
        <a
          v-for="link in profile.links"
          :key="link.url"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="surface rounded-lg px-5 py-2.5 text-sm font-semibold transition hover:border-[var(--accent)]"
        >
          {{ link.label }} ↗
        </a>
      </div>
    </section>

    <section class="border-t border-[var(--border)] py-16" aria-labelledby="about-heading">
      <h2 id="about-heading" class="font-mono text-sm text-accent"># about</h2>
      <div class="mt-6 grid gap-6 md:grid-cols-2">
        <p v-for="(paragraph, i) in profile.about" :key="i" class="leading-relaxed text-muted">
          {{ paragraph }}
        </p>
      </div>
    </section>

    <section v-if="highlights.length" class="border-t border-[var(--border)] py-16" aria-labelledby="work-heading">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <h2 id="work-heading" class="font-mono text-sm text-accent"># selected work</h2>
        <RouterLink to="/projects" class="text-sm font-medium text-muted transition hover:text-[var(--text)]">
          All {{ projects.length }} projects →
        </RouterLink>
      </div>
      <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ProjectCard v-for="project in highlights" :key="project.id" :project="project" />
      </div>
    </section>
  </div>
</template>
