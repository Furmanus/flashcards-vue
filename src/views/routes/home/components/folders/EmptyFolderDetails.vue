<script setup lang="ts">
  import { HomeViewTranslations } from '../../constants/translations.constants.ts';
  import Translation from '../../../../../components/translation/Translation.vue';
</script>

<template>
  <section class="noDataWrapper">
    <div class="noDataContent">
      <Translation :id="HomeViewTranslations.Folders.NoDataView.Heading" color="secondary" />
      <Translation :id="HomeViewTranslations.Folders.NoDataView.Description" color="secondary" />
    </div>
  </section>
</template>

<style scoped>
  .noDataWrapper {
    width: 100%;
    padding: 1rem;
  }

  .noDataContent {
    width: 100%;
    padding: 3rem;
    display: flex;
    border: 2px dashed var(--p-content-border-color);
    border-radius: 0.5rem;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }
</style>
