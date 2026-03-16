<script setup lang="ts">
  import Button, { type ButtonProps } from 'primevue/button';

  interface LinkButtonProps extends /* @vue-ignore */ ButtonProps {
    href: string;
    iconName: string;
  }

  const { href, asChild, iconName, ...restProps } = defineProps<LinkButtonProps>();
</script>

<template>
  <Button asChild v-slot="slotProps" v-bind="restProps">
    <RouterLink :to="href" :class="slotProps.class">
      <span :class="`p-button-icon p-button-icon-left pi pi-plus ${iconName}`"></span>
      <span class="p-button-label">
        <slot>Create deck</slot>
      </span>
    </RouterLink>
  </Button>
</template>

<style scoped>
  a {
    text-decoration: none;
  }
</style>
