import { onMounted, ref } from 'vue'

export type Theme = 'light' | 'dark'

const theme = ref<Theme>('dark')

function apply(next: Theme) {
  theme.value = next
  document.documentElement.classList.toggle('dark', next === 'dark')
  try {
    localStorage.setItem('theme', next)
  } catch {
    // Private browsing or blocked storage — the choice just won't persist.
  }
}

export function useTheme() {
  onMounted(() => {
    theme.value = document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  })

  return {
    theme,
    toggle: () => apply(theme.value === 'dark' ? 'light' : 'dark'),
  }
}
