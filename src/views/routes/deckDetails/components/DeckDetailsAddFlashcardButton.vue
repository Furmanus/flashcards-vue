<script setup lang="ts">
  import LinkButtonIcon from '../../../../components/LinkButtonIcon.vue';
  import Translation from '../../../../components/translation/Translation.vue';
  import { AppRoutes } from '../../../../router/router.ts';
  import { DeckDetailsTranslations } from '../constants/translations.constants.ts';
  import { useRoute } from 'vue-router';

  const currentRoute = useRoute();
  const deckId = currentRoute.params.deckId as string;
</script>

<template>
  <LinkButtonIcon :href="AppRoutes.CreateFlashcard.replace(':deckId', deckId).replace(':flashcardId?', '')" iconName="pi-plus">
    <Translation :id="DeckDetailsTranslations.Content.ZeroState.AddFlashcardButton" />
  </LinkButtonIcon>
</template>

<style scoped></style>
