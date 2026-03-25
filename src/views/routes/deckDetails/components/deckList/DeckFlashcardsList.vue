<script setup lang="ts">
  import type { FlashcardModel } from '../../../../../interfaces/flashcards.interfaces.ts';
  import DeckFlashcardsListHeading from './DeckFlashcardsListHeading.vue';
  import DeckFlashcardsListItem from './DeckFlashcardsListItem.vue';
  import { computed } from 'vue';

  const { flashcards } = defineProps<{ flashcards: FlashcardModel[] }>();

  const dueFlashcards = computed(() => flashcards.filter((flashcard) => new Date(flashcard.nextReviewAt).getTime() < Date.now()));
</script>

<template>
  <section class="deckDetailsContainer">
    <DeckFlashcardsListHeading :dueFlashcards="dueFlashcards.length" />
    <ul>
      <DeckFlashcardsListItem v-for="flashcard in flashcards" :key="flashcard.id" :flashcard="flashcard" />
    </ul>
  </section>
</template>

<style scoped>
  ul {
    padding-inline-start: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .deckDetailsContainer {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
