<script setup lang="ts">
  import Button from 'primevue/button';
  import { HomeViewStore } from '../store/store.ts';
</script>

<template>
  <Button severity="secondary" @click="HomeViewStore.showCreateDeckForm = true">
    <span class="p-button-icon p-button-icon-left pi pi-folder-plus"></span>
    <span class="p-button-label">
      <slot>Create folder</slot>
    </span>
  </Button>
</template>
