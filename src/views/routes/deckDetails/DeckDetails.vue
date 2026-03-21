<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import { useQuery } from '@pinia/colada';
  import { QueryKeys } from '../../../constants/query.constants.ts';
  import { flashcardsApiService } from '../../../api/flashcardsApi.service.ts';
  import { computed } from 'vue';
  import DeckDetailsHeading from './components/DeckDetailsHeading.vue';
  import Translation from '../../../components/translation/Translation.vue';
  import DeckDetailsNoFlashcards from './components/DeckDetailsNoFlashcards.vue';
  import ProgressSpinner from 'primevue/progressspinner';

  const currentRoute = useRoute();
  const editedDeckId = currentRoute.params.deckId as string;
  const { data, error, isLoading } = useQuery({
    key: [QueryKeys.Decks, editedDeckId],
    query: () => flashcardsApiService.getDeckDetails(editedDeckId),
  });
  const hasFlashcards = computed(() => data?.value && data.value.flashcards.length > 0);
  // TODO display better error
</script>

<template>
  <main v-if="isLoading">
    <ProgressSpinner />
  </main>
  <main v-else-if="error">
    <p>{{ error }}</p>
  </main>
  <main v-else>
    <DeckDetailsHeading :deckId="editedDeckId" :deckName="data?.name!" />
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
    gap: 0.125rem;
    justify-content: flex-start;
    align-items: flex-start;
    margin-top: 0.5rem;
    margin-bottom: 1.25rem;

    & > h3,
    p {
      margin-block: 0;
    }
  }
</style>
