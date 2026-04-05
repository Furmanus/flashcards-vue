<script setup lang="ts">
  import type { FlashcardModel } from '../../../../../../interfaces/flashcards.interfaces.ts';
  import { DeckDetailsTranslations } from '../../../constants/translations.constants.ts';
  import Translation from '../../../../../../components/translation/Translation.vue';
  import Chip from 'primevue/chip';
  import { computed } from 'vue';

  interface DeckStudyModeSingleFlashcardRemindMeProps {
    flashcard: FlashcardModel;
  }

  const { flashcard } = defineProps<DeckStudyModeSingleFlashcardRemindMeProps>();
  const formattedDate = computed(() => new Date(flashcard.nextReviewAt).toLocaleDateString()); // TODO temporary
</script>

<template>
  <div class="remindMeWrapper">
    <div class="title">
      <i class="pi pi-calendar" style="font-size: 0.825rem"></i>
      <Translation :id="DeckDetailsTranslations.StudyMode.Flashcard.RemindMe.Title" />
    </div>
    <ul class="remindMeList">
      <li>
        <Chip severity="primary" :label="formattedDate" />
      </li>
    </ul>
  </div>
</template>

<style scoped>
  .remindMeWrapper {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    & > .title {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      gap: 0.25rem;
    }

    & > .remindMeList {
      --p-chip-background: var(--p-content-background);
      --p-chip-padding-y: 0.325rem;

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
