import { onMounted, onUnmounted, ref } from 'vue';

export function useTheme() {
  const theme = ref<'light' | 'dark'>(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  let mediaQuery: MediaQueryList | null = null;

  function handleThemeChange(event: MediaQueryListEvent) {
    theme.value = event.matches ? 'dark' : 'light';
  }

  onMounted(() => {
    mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    mediaQuery.addEventListener('change', handleThemeChange);
  });

  onUnmounted(() => {
    if (mediaQuery) {
      mediaQuery.removeEventListener('change', handleThemeChange);
    }
  });

  return theme;
}
