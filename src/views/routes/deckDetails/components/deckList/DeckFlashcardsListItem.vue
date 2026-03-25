<script setup lang="ts">
  import type { FlashcardModel } from '../../../../../interfaces/flashcards.interfaces.ts';
  import Typography from '../../../../../components/typography/Typography.vue';
  import Button from 'primevue/button';
  import Chip from 'primevue/chip';
  import { computed } from 'vue';
  import Translation from '../../../../../components/translation/Translation.vue';
  import { DeckDetailsTranslations } from '../../constants/translations.constants.ts';
  import { translate } from '../../../../../components/translation/translate.ts';

  const { flashcard } = defineProps<{ flashcard: FlashcardModel }>();
  const isDue = computed(() => new Date(flashcard.nextReviewAt).getTime() < Date.now());
  console.log(flashcard);
</script>

<template>
  <li>
    <header>
      <div class="headerStart">
        <Typography size="md" fontWeight="bold">{{ flashcard.front }}</Typography>
        <Chip
          v-if="isDue"
          class="dueChip"
          :label="translate(DeckDetailsTranslations.FlashcardList.FlashcardCard.DueIcon)"
          icon="pi pi-clock"
        />
      </div>
      <Button aria-label="edit" icon="pi pi-pencil" size="small" severity="secondary" class="editButton p-button-sm" />
    </header>
    <section>
      <Typography size="sm" color="secondary">{{ flashcard.back }}</Typography>
    </section>
    <Translation
      v-if="!isDue"
      :id="DeckDetailsTranslations.FlashcardList.FlashcardCard.NextReview"
      :values="{ date: flashcard.nextReviewAt }"
      size="sm"
      color="secondary"
    />
  </li>
</template>

<style scoped>
  li {
    background-color: var(--p-content-hover-background);
    border: 1px solid var(--p-content-border-color);
    border-radius: var(--p-border-radius-lg);
    list-style-type: none;
    text-align: left;
    padding: 1rem;
    display: flex;
    flex-direction: column;
  }
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    & > .headerStart {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 1.5rem;
    }
  }
  .dueChip {
    --p-chip-icon-size: 0.75rem;

    border: 1px solid var(--p-content-border-color);
    font-size: 0.75rem;
    padding: 0.25rem 1rem;
  }
  .editButton {
    padding: 0;

    &:hover {
      background-color: var(--p-content-hover-background);
    }
  }
</style>
