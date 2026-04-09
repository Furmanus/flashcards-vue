import { onMounted, onUnmounted, ref } from 'vue';

const typeToWidthMap = {
  mobile: 480,
  tablet: 768,
  laptop: 1024,
  desktop: 1400,
};

export function useMediaDevice(deviceType: 'mobile' | 'tablet' | 'laptop' | 'desktop') {
  const width = typeToWidthMap[deviceType];
  const matches = ref(window.matchMedia(`(max-width: ${width}px)`).matches);
  let mediaQuery: MediaQueryList | null = null;

  onMounted(() => {
    mediaQuery = window.matchMedia(`(max-width: ${width}px)`);

    mediaQuery.addEventListener('change', update);
  });

  onUnmounted(() => {
    if (mediaQuery) {
      mediaQuery.removeEventListener('change', update);
    }
  });

  function update(event: MediaQueryListEvent) {
    matches.value = event.matches;
  }

  return matches;
}
