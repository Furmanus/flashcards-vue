<script setup lang="ts">
  import type { FlashcardModel } from '../../../../../../interfaces/flashcards.interfaces.ts';
  import Translation from '../../../../../../components/translation/Translation.vue';
  import { DeckDetailsTranslations } from '../../../constants/translations.constants.ts';
  import { computed, ref, watch } from 'vue';
  import DeckStudyModeSingleFlashcardRemindMe from './DeckStudyModeSingleFlashcardRemindMe.vue';
  import DeckStudyModeSingleFlashcardContent from './DeckStudyModeSingleFlashcardContent.vue';

  interface DeckStudyModeSingleFlashcardProps {
    flashcard: FlashcardModel;
  }

  const props = defineProps<DeckStudyModeSingleFlashcardProps>();
  const side = ref<'front' | 'back'>('front');
  const headingKey = computed(() =>
    side.value === 'front'
      ? DeckDetailsTranslations.StudyMode.Flashcard.HeadingFront
      : DeckDetailsTranslations.StudyMode.Flashcard.HeadingBack,
  );

  watch(
    () => props.flashcard,
    (newFlashcard, oldFlashcard) => {
      if (newFlashcard.id !== oldFlashcard.id) {
        side.value = 'front';
      }
    },
  );
</script>

<template>
  <aside class="flashcard">
    <Translation class="heading" :id="headingKey" tag="h4" size="lg" color="primary" />
    <DeckStudyModeSingleFlashcardContent
      :content="props.flashcard.front"
      :flashcardId="props.flashcard.id"
      type="question"
      v-if="side === 'front'"
    />
    <DeckStudyModeSingleFlashcardContent :content="props.flashcard.back" :flashcardId="props.flashcard.id" type="answer" v-else />
    <footer class="footer">
      <div class="flipButton" role="button" @click.stop="side = side === 'front' ? 'back' : 'front'">
        <i class="pi pi-refresh" style="font-size: 0.825rem"></i>
        <Translation :id="DeckDetailsTranslations.StudyMode.Flashcard.FlipButton" />
      </div>
      <DeckStudyModeSingleFlashcardRemindMe v-if="side === 'back'" :flashcard="props.flashcard" />
    </footer>
  </aside>
</template>

<style scoped>
  .flashcard {
    padding: 1rem 2rem;
    width: min(48rem, 100%);
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

    @media (max-width: 480px) {
      padding: 1rem 0.5rem;
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

      @media (max-width: 480px) {
        font-size: 13px;
      }
    }
  }
</style>
