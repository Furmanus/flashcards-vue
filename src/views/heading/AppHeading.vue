<script setup lang="ts">
  import { AppHeadingTranslations } from './AppHeading.translations.ts';
  import Button from 'primevue/button';
  import { translate } from '../../components/translation/translate.ts';
</script>

<template>
  <header>
    <Translation v-bind:id="AppHeadingTranslations.Heading" tag="h2" />
    <div class="button-container">
      <Button :label="translate(AppHeadingTranslations.Buttons.NewFolder)" icon="pi pi-folder-plus" severity="secondary" />
      <Button :label="translate(AppHeadingTranslations.Buttons.NewDeck)" icon="pi pi-plus" />
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
