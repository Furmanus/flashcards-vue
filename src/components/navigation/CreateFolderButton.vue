<script setup lang="ts">
  import Button from 'primevue/button';
</script>

<template>
  <Button asChild v-slot="slotProps" severity="secondary">
    <RouterLink to="/folders/create" :class="slotProps.class">
      <span class="p-button-icon p-button-icon-left pi pi-folder-plus"></span>
      <span class="p-button-label">
        <slot>Create folder</slot>
      </span>
    </RouterLink>
  </Button>
</template>

<style scoped>
  a {
    text-decoration: none;
  }
</style>
