<script setup lang="ts">
  import DeckDetailsAddFlashcardButton from '../DeckDetailsAddFlashcardButton.vue';
  import Button from 'primevue/button';
  import { translate } from '../../../../../components/translation/translate.ts';
  import { DeckDetailsTranslations } from '../../constants/translations.constants.ts';

  interface DeckFlashcardsListHeadingProps {
    dueFlashcards: number;
  }

  const { dueFlashcards } = defineProps<DeckFlashcardsListHeadingProps>();
</script>

<template>
  <section>
    <div>
      <Button
        v-if="dueFlashcards > 0"
        :label="translate(DeckDetailsTranslations.Heading.Actions.StudyDueCards, { quantity: String(dueFlashcards) })"
        icon="pi pi-clock"
      />
      <Button :label="translate(DeckDetailsTranslations.Heading.Actions.StudyAllCards)" icon="pi pi-list" severity="secondary" />
    </div>
    <DeckDetailsAddFlashcardButton />
  </section>
</template>

<style scoped>
  section {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    & > div {
      display: flex;
      flex-direction: row;
      gap: 0.5rem;
    }
  }
</style>
