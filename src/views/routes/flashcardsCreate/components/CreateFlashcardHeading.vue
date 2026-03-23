<script setup lang="ts">
  import Translation from '../../../../components/translation/Translation.vue';
  import { CreateFlashcardTranslations } from '../constants/translations.constants.ts';
  import { useRouter } from 'vue-router';
  import { AppRoutes } from '../../../../router/router.ts';
  import { useQuery } from '@pinia/colada';
  import { QueryKeys } from '../../../../constants/query.constants.ts';
  import { flashcardsApiService } from '../../../../api/flashcardsApi.service.ts';
  import ProgressSpinner from 'primevue/progressspinner';

  const router = useRouter();
  const deckId = router.currentRoute.value.params.deckId as string;
  const { data, status } = useQuery({
    key: [QueryKeys.Decks, deckId],
    query: () => {
      return flashcardsApiService.getDeckDetails(deckId);
    },
  });
</script>

<template>
  <header>
    <nav>
      <RouterLink :to="AppRoutes.DeckDetails.replace(':deckId', deckId)" class="link">
        <i class="pi pi-arrow-left" style="font-size: 0.625rem"></i>
        <Translation :id="CreateFlashcardTranslations.Navigation.BackToDeck" />
      </RouterLink>
    </nav>
    <div class="heading-text">
      <Translation :id="CreateFlashcardTranslations.Heading.Main" tag="h2" />
      <Translation
        :id="CreateFlashcardTranslations.Heading.DeckDescription"
        tag="p"
        color="secondary"
        v-if="data?.name"
        :values="{ deckName: data.name }"
      />
      <ProgressSpinner class="progress-spinner" v-if="status === 'pending'" />
    </div>
  </header>
</template>

<style scoped>
  header {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 1rem;

    & nav {
      display: flex;
      flex-direction: row;
    }

    & h2,
    p {
      margin-block: 0;
    }
  }

  .progress-spinner {
    flex-grow: 0;
    width: 1.25rem;
    height: 1.25rem;
    margin-top: 0.5rem;
    align-self: flex-start;
    margin-inline: 0;
  }

  .heading-text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
  }
</style>
