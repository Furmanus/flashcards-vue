<script setup lang="ts">
  import { useFetchDecks } from './composables/useFetchDecks.ts';
  import NoDecksView from './components/NoDecksView.vue';
  import ErrorComponent from './components/ErrorComponent.vue';
  import { Skeleton, ProgressSpinner } from 'primevue';
  import DecksList from './components/DecksList.vue';
  import Heading from './components/Heading.vue';

  const { isFetching, error, data } = useFetchDecks();
</script>

<template>
  <Heading />
  <Skeleton v-if="isFetching" width="100%" height="20rem">
    <ProgressSpinner />
  </Skeleton>
  <NoDecksView v-else-if="!data?.length && !isFetching" />
  <ErrorComponent v-else-if="error" />
  <DecksList v-else :decks="data!" />
</template>

<style scoped></style>
