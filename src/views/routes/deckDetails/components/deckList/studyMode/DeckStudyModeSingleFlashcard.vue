<script setup lang="ts">
  import type { FlashcardModel } from '../../../../../../interfaces/flashcards.interfaces.ts';
  import Translation from '../../../../../../components/translation/Translation.vue';
  import { DeckDetailsTranslations } from '../../../constants/translations.constants.ts';
  import Typography from '../../../../../../components/typography/Typography.vue';
  import { computed, ref } from 'vue';
  import DeckStudyModeSingleFlashcardRemindMe from './DeckStudyModeSingleFlashcardRemindMe.vue';

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
  <aside class="flashcard" @click.stop="side = side === 'front' ? 'back' : 'front'">
    <Translation class="heading" :id="headingKey" tag="h4" size="lg" color="primary" />
    <Typography class="content front" v-if="side === 'front'">
      {{ flashcard.front }}
    </Typography>
    <Typography class="content back" v-else>
      {{ flashcard.back }}
    </Typography>
    <div class="flipButton" role="button" @click="side = side === 'front' ? 'back' : 'front'" v-if="side === 'front'">
      <i class="pi pi-refresh" style="font-size: 0.825rem"></i>
      <Translation :id="DeckDetailsTranslations.StudyMode.Flashcard.FlipButton" />
    </div>
    <DeckStudyModeSingleFlashcardRemindMe v-else :flashcard="flashcard" />
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

    @media (prefers-color-scheme: dark) {
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
    }

    & .heading {
      margin-block: 0;
    }

    & .content {
      flex-grow: 1;
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
  }
</style>
