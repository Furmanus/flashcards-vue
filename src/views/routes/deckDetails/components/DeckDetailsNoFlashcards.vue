<script setup lang="ts">
  import { DeckDetailsTranslations } from '../constants/translations.constants.ts';
  import Translation from '../../../../components/translation/Translation.vue';
  import DeckDetailsAddFlashcardButton from './DeckDetailsAddFlashcardButton.vue';
</script>

<template>
  <article>
    <div class="textContent">
      <Translation :id="DeckDetailsTranslations.Content.ZeroState.Heading" tag="h4" color="primary" />
      <Translation :id="DeckDetailsTranslations.Content.ZeroState.Description" tag="p" color="secondary" />
    </div>
    <DeckDetailsAddFlashcardButton />
  </article>
</template>

<style scoped>
  article {
    width: 100%;
    background-color: var(--p-content-hover-background);
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
    border: 1px solid var(--p-content-border-color);
    border-radius: var(--p-border-radius-lg);
    padding: 2rem 1rem;
  }
  h4,
  p {
    margin-block: 0;
  }
  .textContent {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    align-items: center;
  }
</style>
