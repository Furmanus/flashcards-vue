<script setup lang="ts">
  interface FormFieldTipProps {
    text: string;
    severity: 'info' | 'error';
  }

  const { text, severity } = defineProps<FormFieldTipProps>();
</script>

<template>
  <span :class="severity">{{ text }}</span>
</template>

<style scoped>
  span {
    font-size: 13px;

    &.info {
      color: var(--p-text-muted-color);
    }

    &.error {
      color: var(--p-red-600);
    }
  }
</style>
