<script setup lang="ts">
  import type { FlashcardModel } from '../../../../../interfaces/flashcards.interfaces.ts';
  import Typography from '../../../../../components/typography/Typography.vue';
  import Button from 'primevue/button';
  import Chip from 'primevue/chip';
  import { computed } from 'vue';
  import Translation from '../../../../../components/translation/Translation.vue';
  import { DeckDetailsTranslations } from '../../constants/translations.constants.ts';
  import { translate } from '../../../../../components/translation/translate.ts';
  import { AppRoutes } from '../../../../../router/router.ts';
  import { useRouter } from 'vue-router';

  const { flashcard } = defineProps<{ flashcard: FlashcardModel }>();
  const router = useRouter();
  const deckId = router.currentRoute.value.params.deckId as string;
  const isDue = computed(() => new Date(flashcard.nextReviewAt).getTime() < Date.now());
</script>

<template>
  <li>
    <header>
      <div class="headerStart maxWidthContainer">
        <Typography class="maxWidth" size="md" fontWeight="bold" :title="flashcard.front">{{ flashcard.front }}</Typography>
        <Chip
          v-if="isDue"
          class="dueChip"
          :label="translate(DeckDetailsTranslations.FlashcardList.FlashcardCard.DueIcon)"
          icon="pi pi-clock"
        />
      </div>
      <Button
        class="editButton"
        as="a"
        severity="secondary"
        :href="AppRoutes.CreateFlashcard.replace(':deckId', deckId).replace(':flashcardId?', flashcard.id)"
        icon="pi pi-pencil"
      >
      </Button>
    </header>
    <section class="maxWidthContainer">
      <Typography class="maxWidth" size="sm" color="secondary" :title="flashcard.back">{{ flashcard.back }}</Typography>
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
    --p-chip-background: var(--p-primary-color);

    border: 1px solid var(--p-content-border-color);
    font-size: 0.75rem;
    padding: 0.25rem 1rem;
  }
  .editButton.editButton {
    padding: 0;
    text-decoration: none;

    &:hover {
      background: var(--p-content-hover-background);
      border: none;
    }
    &:focus-visible {
      outline: none;
    }
  }
  .maxWidthContainer {
    max-width: 90%;
    display: flex;
  }
  .maxWidth {
    white-space: nowrap;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
