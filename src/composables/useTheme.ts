import { ref } from 'vue'

type Theme = 'light' | 'dark'

// The inline script in index.html picks the theme before first paint; mirror it.
const theme = ref<Theme>(document.documentElement.classList.contains('dark') ? 'dark' : 'light')

export function useTheme() {
  return {
    theme,
    toggle() {
      const next: Theme = theme.value === 'dark' ? 'light' : 'dark'
      theme.value = next
      document.documentElement.classList.toggle('dark', next === 'dark')
      try {
        localStorage.setItem('theme', next)
      } catch {
        // Private browsing or blocked storage — the choice just won't persist.
      }
    },
  }
}
