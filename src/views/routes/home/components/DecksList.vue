<script setup lang="ts">
  import { defineProps } from 'vue';
  import type { DeckModel } from '../../../../interfaces/flashcards.interfaces.ts';

  interface DecksListProps {
    decks: DeckModel[];
  }

  const { decks } = defineProps<DecksListProps>();
</script>
<template>{{ decks }}</template>

<style scoped></style>
