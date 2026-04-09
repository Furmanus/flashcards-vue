<script setup lang="ts">
  import type { DeckPresentationModel } from '../../../../../interfaces/flashcards.interfaces.ts';
  import Translation from '../../../../../components/translation/Translation.vue';
  import { HomeViewTranslations } from '../../constants/translations.constants.ts';
  import { AppRoutes } from '../../../../../router/router.ts';
  import { useRouter } from 'vue-router';

  interface DecksListItemProps {
    deck: DeckPresentationModel;
  }

  const { deck } = defineProps<DecksListItemProps>();
  const href = AppRoutes.DeckDetails.replace(':deckId', deck.id);
  const { push } = useRouter();
  const handleClick = (e: MouseEvent) => {
    e.preventDefault();

    push(href);
  };
</script>

<template>
  <li>
    <a :href="href" @click="handleClick">
      <div class="infoContainer">
        <h4 class="heading" :title="deck.name">{{ deck.name }}</h4>
        <p class="description" :title="deck.description">{{ deck.description }}</p>
      </div>
      <Translation
        class="quantity"
        :id="HomeViewTranslations.DeckList.DeckCard.CardQuantity"
        :values="{ quantity: String(deck.flashcardsCount ?? 0) }"
        tag="p"
      />
    </a>
  </li>
</template>

<style scoped>
  li {
    border-radius: var(--p-border-radius-lg);
    border: 1px solid var(--p-content-border-color);
    width: 20rem;
    aspect-ratio: 1.75;
    gap: 0.5rem;
    padding: 1rem;
    background-color: var(--p-content-hover-background);
    transition:
      box-shadow 0.2s ease-in-out,
      border-width 0.2s ease-in-out,
      transform 0.3s ease-in-out;

    &:hover {
      cursor: pointer;
      box-shadow:
        0 12px 28px 2px var(--p-content-hover-background),
        0 4px 12px 1px var(--p-content-hover-background);
      transform: translateY(-2px);
    }

    & > a {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      text-decoration: none;
    }
  }

  .infoContainer {
    flex-grow: 1;
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 0.5rem;
    justify-content: flex-start;
    align-items: flex-start;
  }

  .heading {
    color: var(--p-text-color);
    text-align: left;
    width: 100%;
    font-size: 0.925rem;
    margin-block: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .description {
    width: 100%;
    text-align: left;
    color: var(--p-text-muted-color);
    font-size: 0.875rem;
    margin-block: 0;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .quantity {
    display: inline-block;
    width: 100%;
    text-align: left;
    border-top: 1px solid var(--p-content-border-color);
    color: var(--p-text-color);
    margin-block: 0;
    padding-top: 0.25rem;
    font-size: 0.875rem;
  }
</style>
