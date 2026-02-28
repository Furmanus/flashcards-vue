<script setup lang="ts">
  import Button from 'primevue/button';
</script>

<template>
  <Button asChild v-slot="slotProps">
    <RouterLink to="/decks/" :class="slotProps.class">
      <span class="p-button-icon p-button-icon-left pi pi-plus"></span>
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
