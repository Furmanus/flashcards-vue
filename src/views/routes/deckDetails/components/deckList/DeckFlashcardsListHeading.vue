<script setup lang="ts">
  import DeckDetailsAddFlashcardButton from '../DeckDetailsAddFlashcardButton.vue';
  import Button from 'primevue/button';
  import { translate } from '../../../../../components/translation/translate.ts';
  import { DeckDetailsTranslations } from '../../constants/translations.constants.ts';
  import { DeckDetailsMode } from '../../constants/deckDetails.constants.ts';

  interface DeckFlashcardsListHeadingProps {
    dueFlashcards: number;
    totalFlashcards: number;
    mode: DeckDetailsMode;
  }

  const { dueFlashcards, mode, totalFlashcards } = defineProps<DeckFlashcardsListHeadingProps>();
  const emit = defineEmits(['modeChange']);
</script>

<template>
  <section :class="{ study: mode !== DeckDetailsMode.List }">
    <div>
      <Button
        v-if="mode === DeckDetailsMode.List"
        :disabled="dueFlashcards === 0"
        :label="translate(DeckDetailsTranslations.Heading.Actions.StudyDueCards, { quantity: String(dueFlashcards) })"
        icon="pi pi-clock"
        @click="emit('modeChange', DeckDetailsMode.StudyDue)"
      />
      <Button
        v-if="mode === DeckDetailsMode.List"
        :label="translate(DeckDetailsTranslations.Heading.Actions.StudyAllCards)"
        icon="pi pi-list"
        :disabled="totalFlashcards === 0"
        severity="secondary"
        @click="emit('modeChange', DeckDetailsMode.StudyAll)"
      />
      <Button
        v-if="mode !== DeckDetailsMode.List"
        :label="translate(DeckDetailsTranslations.Heading.Actions.ExitStudyMode)"
        severity="secondary"
        @click="emit('modeChange', DeckDetailsMode.List)"
      />
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

    @media (max-width: 480px) {
      flex-direction: column;
      gap: 1rem;

      &.study {
        flex-direction: row;
        justify-content: space-evenly;
      }
    }

    & > div {
      display: flex;
      flex-direction: row;
      gap: 1rem;
    }
  }
</style>
