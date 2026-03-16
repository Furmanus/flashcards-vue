<script setup lang="ts">
  import Translation from '../../../../components/translation/Translation.vue';
  import { DeckDetailsTranslations } from '../constants/translations.constants.ts';
  import { AppRoutes } from '../../../../router/router.ts';
  import DeckDetailsHeadingDeleteButton from './DeckDetailsHeadingDeleteButton.vue';
  import LinkButtonIcon from '../../../../components/LinkButtonIcon.vue';

  interface DeckDetailsHeadingProps {
    deckId: string;
  }

  const { deckId } = defineProps<DeckDetailsHeadingProps>();
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/" class="link">
        <i class="pi pi-arrow-left" style="font-size: 0.625rem"></i>
        <Translation :id="DeckDetailsTranslations.Heading.BackButton" />
      </RouterLink>
      <div class="buttonContainer">
        <LinkButtonIcon :href="AppRoutes.CreateDeck.replace(':deckId?', deckId)" iconName="pi-user-edit" severity="secondary">
          <Translation :id="DeckDetailsTranslations.Heading.EditButton" />
        </LinkButtonIcon>
        <DeckDetailsHeadingDeleteButton deckId="deckId" />
      </div>
    </nav>
  </header>
</template>

<style scoped>
  header {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  nav {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
  }
  .buttonContainer {
    display: flex;
    gap: 1rem;
  }
</style>
