<script setup lang="ts">
  import { computed, defineProps } from 'vue';
  import type { Translation } from '../../interfaces/translations.interfaces.ts';

  interface TranslationProps {
    id: Translation;
    tag?: keyof HTMLElementTagNameMap;
    color?: 'primary' | 'secondary';
  }

  const { id, tag = 'span', color = 'primary' } = defineProps<TranslationProps>();
  const textColor = computed(() => {
    switch (color) {
      case 'primary':
        return 'var(--p-text-color)';
      case 'secondary':
        return 'var(--p-text-muted-color)';
      default:
        throw new Error('Unsupported color value');
    }
  });
</script>

<template>
  <component :is="tag" class="translation">{{ id[0] }}</component>
</template>

<style scoped>
  .translation {
    color: v-bind(textColor);
  }
</style>
