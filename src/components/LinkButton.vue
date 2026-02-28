<script setup lang="ts">
  import Button, { type ButtonProps } from 'primevue/button';

  const { href, asChild, ...restProps } = defineProps<{ href: string } & ButtonProps>();
</script>

<template>
  <Button asChild v-slot="slotProps" v-bind="restProps">
    <RouterLink :to="href" :class="slotProps.class">
      <slot>Button link</slot>
    </RouterLink>
  </Button>
</template>

<style scoped></style>
