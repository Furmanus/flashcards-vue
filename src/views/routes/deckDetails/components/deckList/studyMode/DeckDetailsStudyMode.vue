<script setup lang="ts">
  import type { FlashcardModel } from '../../../../../../interfaces/flashcards.interfaces.ts';
  import type { DeckDetailsMode } from '../../../constants/deckDetails.constants.ts';
  import { ref } from 'vue';
  import Button from 'primevue/button';
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
      :noMargin="true"
      color="secondary"
      :values="{ current: String(currentFlashcardIndex + 1), total: String(flashcards.length) }"
    />
    <DeckStudyModeSingleFlashcard :flashcard="flashcards[currentFlashcardIndex]!" />
    <div class="buttons">
      <Button severity="secondary" @click="currentFlashcardIndex -= 1" :disabled="currentFlashcardIndex === 0">
        <Translation :id="DeckDetailsTranslations.StudyMode.Buttons.Previous" />
      </Button>
      <Button severity="secondary" @click="currentFlashcardIndex += 1" :disabled="currentFlashcardIndex === flashcards.length - 1">
        <Translation :id="DeckDetailsTranslations.StudyMode.Buttons.Next" />
      </Button>
    </div>
  </section>
</template>

<style scoped>
  .studyModeWrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 2rem;
    flex-grow: 1;
  }
  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }
</style>
