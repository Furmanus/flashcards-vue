<script setup lang="ts">
  import { computed, defineProps } from 'vue';
  import type { Translation } from '../../interfaces/translations.interfaces.ts';

  interface TranslationProps {
    id: Translation;
    tag?: keyof HTMLElementTagNameMap;
    values?: Record<string, string>;
    color?: 'primary' | 'secondary' | 'error';
  }

  const { id, tag = 'span', color = 'primary', values = {} } = defineProps<TranslationProps>();
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
</script>

<template>
  <component :is="tag" class="translation">{{ translatedValue }}</component>
</template>

<style scoped>
  .translation {
    color: v-bind(textColor);
  }
</style>
