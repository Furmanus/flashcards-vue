<script setup lang="ts">
  import type { FlashcardModel } from '../../../../../../interfaces/flashcards.interfaces.ts';
  import { DeckDetailsTranslations } from '../../../constants/translations.constants.ts';
  import Translation from '../../../../../../components/translation/Translation.vue';

  interface DeckStudyModeSingleFlashcardRemindMeProps {
    flashcard: FlashcardModel;
  }

  const { flashcard } = defineProps<DeckStudyModeSingleFlashcardRemindMeProps>();
</script>

<template>
  <div class="remindMeWrapper">
    <div class="title">
      <i class="pi pi-calendar" style="font-size: 0.825rem"></i>
      <Translation :id="DeckDetailsTranslations.StudyMode.Flashcard.RemindMe.Title" />
    </div>
    <ul class="remindMeList">
      {{
        flashcard.nextReviewAt
      }}
    </ul>
  </div>
</template>

<style scoped>
  .remindMeWrapper {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    & > .title {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      gap: 0.25rem;
    }

    & > .remindMeList {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      list-style-type: none;
      margin: 0;
      padding-inline-start: 0;
    }
  }
</style>
