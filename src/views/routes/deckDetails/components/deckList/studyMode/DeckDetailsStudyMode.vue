<script setup lang="ts">
  import type { FlashcardModel } from '../../../../../../interfaces/flashcards.interfaces.ts';
  import type { DeckDetailsMode } from '../../../constants/deckDetails.constants.ts';
  import { ref } from 'vue';
  import Translation from '../../../../../../components/translation/Translation.vue';
  import { DeckDetailsTranslations } from '../../../constants/translations.constants.ts';
  import DeckStudyModeSingleFlashcard from './DeckStudyModeSingleFlashcard.vue';

  interface DeckDetailsStudyModeProps {
    flashcards: FlashcardModel[];
    mode: DeckDetailsMode;
  }

  const { flashcards } = defineProps<DeckDetailsStudyModeProps>();
  const currentFlashcardIndex = ref(0);
</script>

<template>
  <section class="studyModeWrapper">
    <Translation
      :id="DeckDetailsTranslations.StudyMode.Heading"
      tag="p"
      color="secondary"
      :values="{ current: String(currentFlashcardIndex + 1), total: String(flashcards.length) }"
    />
    <DeckStudyModeSingleFlashcard :flashcard="flashcards[currentFlashcardIndex]!" />
  </section>
</template>

<style scoped>
  .studyModeWrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 1rem;
  }
</style>
