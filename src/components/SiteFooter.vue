<script setup lang="ts">
import { siteConfig } from '@/data/site.config'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-[var(--border)]">
    <div
      class="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between"
    >
      <p class="font-mono">
        <span class="text-accent">#</span> © {{ year }} {{ siteConfig.profile.name }}
      </p>
      <ul class="flex flex-wrap gap-x-5 gap-y-2">
        <li v-for="link in siteConfig.profile.links" :key="link.url">
          <a
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            class="transition hover:text-[var(--text)]"
          >
            {{ link.label }}
          </a>
        </li>
      </ul>
    </div>
  </footer>
</template>
