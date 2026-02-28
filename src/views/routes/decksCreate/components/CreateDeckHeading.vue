<script setup lang="ts">
  import Translation from '../../../../components/translation/Translation.vue';
  import { CreateDeckTranslations } from '../constants/translations.constants.ts';
</script>

<template>
  <header>
    <Translation :id="CreateDeckTranslations.Heading" tag="h2" />
    <RouterLink to="/" class="link">
      <i class="pi pi-arrow-left" style="font-size: 0.625rem"></i>
      <Translation :id="CreateDeckTranslations.HeadingBackLink" />
    </RouterLink>
  </header>
</template>

<style scoped>
  header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
  }
</style>
