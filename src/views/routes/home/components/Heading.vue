<script setup lang="ts">
  import CreateDeckButton from '../../../../components/navigation/CreateDeckButton.vue';
  import CreateFolderButton from './CreateFolderButton.vue';
  import { HomeViewTranslations } from '../constants/translations.constants.ts';
</script>

<template>
  <header>
    <Translation v-bind:id="HomeViewTranslations.Heading.Heading" tag="h2" />
    <div class="button-container">
      <CreateFolderButton>
        <Translation :id="HomeViewTranslations.Heading.Buttons.NewFolder" />
      </CreateFolderButton>
      <CreateDeckButton :textTranslation="HomeViewTranslations.Heading.Buttons.NewDeck">
        <Translation :id="HomeViewTranslations.Heading.Buttons.NewDeck" />
      </CreateDeckButton>
    </div>
  </header>
</template>

<style scoped>
  header {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 1rem;

    @media (max-width: 480px) {
      flex-direction: column;
    }
  }
  .button-container {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }
  h2 {
    font-size: 1.6rem;
  }
</style>
