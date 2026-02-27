<script setup lang="ts">
  import { AppHeadingTranslations } from './AppHeading.translations.ts';
  import CreateDeckButton from '../../components/navigation/CreateDeckButton.vue';
  import CreateFolderButton from '../../components/navigation/CreateFolderButton.vue';
</script>

<template>
  <header>
    <Translation v-bind:id="AppHeadingTranslations.Heading" tag="h2" />
    <div class="button-container">
      <CreateFolderButton>
        <Translation :id="AppHeadingTranslations.Buttons.NewFolder" />
      </CreateFolderButton>
      <CreateDeckButton :textTranslation="AppHeadingTranslations.Buttons.NewDeck">
        <Translation :id="AppHeadingTranslations.Buttons.NewDeck" />
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
