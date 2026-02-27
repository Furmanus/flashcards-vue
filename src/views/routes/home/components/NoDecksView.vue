<script setup lang="ts">
  import { HomeViewTranslations } from '../constants/translations.constants.ts';
  import Button from 'primevue/button';
  import { translate } from '../../../../components/translation/translate.ts';
</script>

<template>
  <section class="wrapper">
    <i class="pi pi-th-large" style="font-size: 2rem"></i>
    <Translation :id="HomeViewTranslations.ZeroState.Heading" tag="h3" />
    <Translation :id="HomeViewTranslations.ZeroState.Description" tag="p" color="secondary" />
    <div class="button-container">
      <Button :label="translate(HomeViewTranslations.ZeroState.Buttons.CreateFolder)" icon="pi pi-folder-plus" severity="secondary" />
      <Button :label="translate(HomeViewTranslations.ZeroState.Buttons.CreateDeck)" icon="pi pi-plus" />
    </div>
  </section>
</template>

<style scoped>
  .wrapper {
    background-color: var(--p-surface-0);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    border-radius: 5px;
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
