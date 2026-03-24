<script setup lang="ts">
  import type { TypographyProps } from './typography.interfaces.ts';
  import { computed } from 'vue';
  import { TypographyColorToVariable, TypographySizeToFontSize } from './typography.constants.ts';

  const { tag = 'span', size = 'md', color = 'primary', classes, align = 'left', fontWeight = 'normal' } = defineProps<TypographyProps>();
  const fontSize = computed(() => TypographySizeToFontSize[size]);
  const computedColor = computed(() => TypographyColorToVariable[color]);
</script>

<template>
  <component :is="tag" :class="{ classes: !!classes, typography: true }">
    <slot />
  </component>
</template>

<style scoped>
  .typography {
    font-size: v-bind(fontSize);
    color: v-bind(computedColor);
    text-align: v-bind(align);
    font-weight: v-bind(fontWeight);
  }
</style>
