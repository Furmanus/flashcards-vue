<script setup lang="ts">
  import { defineProps } from 'vue';
  import type { FlashcardFolderModel } from '../../../../interfaces/flashcards.interfaces.ts';

  interface DecksListProps {
    folders: FlashcardFolderModel[];
  }

  const { folders } = defineProps<DecksListProps>();
</script>
<template>{{ folders }}</template>

<style scoped></style>
