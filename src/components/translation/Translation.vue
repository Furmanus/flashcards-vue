<script setup lang="ts">
  import { computed, defineProps } from 'vue';
  import type { Translation } from '../../interfaces/translations.interfaces.ts';
  import type { TypographySizes } from '../typography/typography.interfaces.ts';
  import { TypographySizeToFontSize } from '../typography/typography.constants.ts';

  interface TranslationProps {
    id: Translation;
    tag?: keyof HTMLElementTagNameMap;
    values?: Record<string, string>;
    noMargin?: boolean;
    size?: TypographySizes;
    color?: 'primary' | 'secondary' | 'error';
  }

  const { id, tag = 'span', color = 'primary', values = {}, size, noMargin } = defineProps<TranslationProps>();
  const textColor = computed(() => {
    switch (color) {
      case 'primary':
        return 'var(--p-text-color)';
      case 'secondary':
        return 'var(--p-text-muted-color)';
      case 'error':
        return 'var(--p-red-600)';
      default:
        throw new Error('Unsupported color value');
    }
  });
  const translatedValue = computed(() => {
    let base = id[0];

    for (const [key, value] of Object.entries(values)) {
      base = base.replace(`{${key}}`, value);
    }

    return base;
  });
  const computedSize = computed(() => (!!size ? TypographySizeToFontSize[size] : undefined));
</script>

<template>
  <component :is="tag" :class="{ translation: true, translationSize: !!computedSize, noMargin: noMargin }">{{ translatedValue }}</component>
</template>

<style scoped>
  .translation {
    color: v-bind(textColor);
  }
  .translationSize {
    font-size: v-bind(computedSize);
  }
  .noMargin {
    margin-block: 0;
  }
</style>
