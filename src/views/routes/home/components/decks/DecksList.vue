<script setup lang="ts">
  import type { DeckModel } from '../../../../../interfaces/flashcards.interfaces.ts';
  import DecksListItem from './DecksListItem.vue';

  type DecksListProps = {
    decks: DeckModel[];
  };

  const { decks } = defineProps<DecksListProps>();
</script>

<template>
  <ul>
    <DecksListItem v-for="deck in decks" :key="deck.id" :deck="deck" />
  </ul>
</template>

<style scoped>
  ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1.5rem;
  }
</style>
