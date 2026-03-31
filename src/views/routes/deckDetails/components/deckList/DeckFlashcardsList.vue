<script setup lang="ts">
  import type { FlashcardModel } from '../../../../../interfaces/flashcards.interfaces.ts';
  import DeckFlashcardsListHeading from './DeckFlashcardsListHeading.vue';
  import DeckFlashcardsListItem from './DeckFlashcardsListItem.vue';
  import { computed, ref } from 'vue';
  import DeckDetailsStudyMode from './studyMode/DeckDetailsStudyMode.vue';
  import { DeckDetailsMode } from '../../constants/deckDetails.constants.ts';

  const { flashcards } = defineProps<{ flashcards: FlashcardModel[] }>();
  const mode = ref(DeckDetailsMode.List);
  const dueFlashcards = computed(() => flashcards.filter((flashcard) => new Date(flashcard.nextReviewAt).getTime() < Date.now()));
  const computedFlashcards = computed(() => {
    if (mode.value === DeckDetailsMode.StudyDue) {
      return flashcards.filter((flashcard) => new Date(flashcard.nextReviewAt).getTime() < Date.now());
    }

    return flashcards;
  });

  function changeMode(newMode: DeckDetailsMode) {
    mode.value = newMode;
  }
</script>

<template>
  <section class="deckDetailsContainer">
    <DeckFlashcardsListHeading
      :dueFlashcards="dueFlashcards.length"
      :totalFlashcards="flashcards.length"
      @modeChange="changeMode"
      :mode="mode"
    />
    <ul v-if="mode === DeckDetailsMode.List">
      <DeckFlashcardsListItem v-for="flashcard in flashcards" :key="flashcard.id" :flashcard="flashcard" />
    </ul>
    <DeckDetailsStudyMode :flashcards="computedFlashcards" v-else :mode="mode" />
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
