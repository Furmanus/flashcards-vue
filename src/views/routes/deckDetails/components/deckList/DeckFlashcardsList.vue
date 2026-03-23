<script setup lang="ts">
  import type { FlashcardModel } from '../../../../../interfaces/flashcards.interfaces.ts';
  import DeckFlashcardsListHeading from './DeckFlashcardsListHeading.vue';

  const { flashcards } = defineProps<{ flashcards: FlashcardModel[] }>();
</script>

<template>
  <DeckFlashcardsListHeading />
  {{ flashcards }}
</template>

<style scoped></style>
