<script setup lang="ts">
  import type { FlashcardModel } from '../../../../../../interfaces/flashcards.interfaces.ts';
  import Translation from '../../../../../../components/translation/Translation.vue';
  import { DeckDetailsTranslations } from '../../../constants/translations.constants.ts';
  import { computed, ref } from 'vue';
  import DeckStudyModeSingleFlashcardRemindMe from './DeckStudyModeSingleFlashcardRemindMe.vue';
  import DeckStudyModeSingleFlashcardContent from './DeckStudyModeSingleFlashcardContent.vue';

  interface DeckStudyModeSingleFlashcardProps {
    flashcard: FlashcardModel;
  }

  const { flashcard } = defineProps<DeckStudyModeSingleFlashcardProps>();
  const side = ref<'front' | 'back'>('front');
  const headingKey = computed(() =>
    side.value === 'front'
      ? DeckDetailsTranslations.StudyMode.Flashcard.HeadingFront
      : DeckDetailsTranslations.StudyMode.Flashcard.HeadingBack,
  );
</script>

<template>
  <aside class="flashcard">
    <Translation class="heading" :id="headingKey" tag="h4" size="lg" color="primary" />
    <DeckStudyModeSingleFlashcardContent :content="flashcard.front" :flashcardId="flashcard.id" type="question" v-if="side === 'front'" />
    <DeckStudyModeSingleFlashcardContent :content="flashcard.back" :flashcardId="flashcard.id" type="answer" v-else />
    <footer class="footer">
      <div class="flipButton" role="button" @click.stop="side = side === 'front' ? 'back' : 'front'">
        <i class="pi pi-refresh" style="font-size: 0.825rem"></i>
        <Translation :id="DeckDetailsTranslations.StudyMode.Flashcard.FlipButton" />
      </div>
      <DeckStudyModeSingleFlashcardRemindMe v-if="side === 'back'" :flashcard="flashcard" />
    </footer>
  </aside>
</template>

<style scoped>
  .flashcard {
    padding: 1rem 2rem;
    width: 48rem;
    aspect-ratio: 16/9;
    border-radius: var(--p-border-radius-lg);
    background-color: var(--p-content-hover-background);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 1rem;
    min-height: 0;
    overflow: auto;
    flex-grow: 1;

    @media (prefers-color-scheme: dark) {
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
    }

    & .heading {
      margin-block: 0;
    }

    .flipButton {
      cursor: pointer;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      align-self: center;
      gap: 0.5rem;
    }

    & .footer {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      width: 100%;
    }
  }
</style>
