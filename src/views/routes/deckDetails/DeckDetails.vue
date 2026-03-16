<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import { useQuery } from '@pinia/colada';
  import { QueryKeys } from '../../../constants/query.constants.ts';
  import { flashcardsApiService } from '../../../api/flashcardsApi.service.ts';
  import { computed } from 'vue';
  import DeckDetailsHeading from './components/DeckDetailsHeading.vue';
  import Translation from '../../../components/translation/Translation.vue';
  import DeckDetailsNoFlashcards from './components/DeckDetailsNoFlashcards.vue';

  const currentRoute = useRoute();
  const editedDeckId = currentRoute.params.deckId as string;
  const { data, error, isLoading } = useQuery({
    key: [QueryKeys.Decks, editedDeckId],
    query: () => flashcardsApiService.getDeckDetails(editedDeckId),
  });
  const hasFlashcards = computed(() => data?.value && data.value.flashcards.length > 0);
</script>

<template>
  <main>
    <DeckDetailsHeading :deckId="editedDeckId" />
    <div v-if="data !== undefined" class="deckDetails">
      <Translation :id="[data.name]" tag="h3" />
      <Translation v-if="data.description" :id="[data.description]" color="secondary" tag="p" />
    </div>
    <DeckDetailsNoFlashcards v-if="data !== undefined && !hasFlashcards" />
  </main>
</template>

<style scoped>
  main {
    width: 100%;
  }
  .deckDetails {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: flex-start;
    align-items: flex-start;
  }
</style>
