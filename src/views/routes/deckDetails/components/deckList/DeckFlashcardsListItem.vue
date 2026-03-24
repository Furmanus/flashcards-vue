<script setup lang="ts">
  import type { FlashcardModel } from '../../../../../interfaces/flashcards.interfaces.ts';
  import Typography from '../../../../../components/typography/Typography.vue';
  import Button from 'primevue/button';
  import { computed } from 'vue';

  const { flashcard } = defineProps<{ flashcard: FlashcardModel }>();
  const isDue = computed(() => new Date(flashcard.nextReviewAt).getTime() < Date.now());
</script>

<template>
  <li>
    <header>
      <Typography size="md" fontWeight="bold">{{ flashcard.front }}</Typography>
      <Button aria-label="edit" icon="pi pi-pencil" size="small" severity="secondary" class="editButton p-button-sm" />
    </header>
    <section>
      <Typography size="sm">{{ flashcard.back }}</Typography>
    </section>
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
    gap: 0.125rem;
  }
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .editButton {
    padding: 0;
  }
</style>
