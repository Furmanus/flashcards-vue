<script setup lang="ts">
  import { HomeViewTranslations } from '../constants/translations.constants.ts';
  import CreateDeckButton from '../../../../components/navigation/CreateDeckButton.vue';
  import CreateFolderButton from './CreateFolderButton.vue';
</script>

<template>
  <section class="wrapper">
    <i class="pi pi-th-large" style="font-size: 2rem"></i>
    <Translation :id="HomeViewTranslations.ZeroState.Heading" tag="h3" />
    <Translation :id="HomeViewTranslations.ZeroState.Description" tag="p" color="secondary" />
    <div class="button-container">
      <CreateFolderButton> <Translation :id="HomeViewTranslations.ZeroState.Buttons.CreateFolder" /></CreateFolderButton>
      <CreateDeckButton>
        <Translation :id="HomeViewTranslations.ZeroState.Buttons.CreateDeck" />
      </CreateDeckButton>
    </div>
  </section>
</template>

<style scoped>
  .wrapper {
    background-color: var(--p-content-hover-background);
    border: 1px solid var(--p-content-border-color);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    border-radius: var(--p-border-radius-lg);
    padding-block: 2rem;
  }
  .button-container {
    display: flex;
    gap: 2rem;
  }
  h3,
  p {
    margin-block: 0;
  }
</style>
