<script setup lang="ts">
  import Translation from '../../../../components/translation/Translation.vue';
  import { CreateDeckTranslations } from '../constants/translations.constants.ts';
</script>

<template>
  <Translation :id="CreateDeckTranslations.Heading" tag="h2" />
  <RouterLink to="/">
    <i class="pi pi-angle-left" style="font-size: 1.2rem"></i>
    <Translation :id="CreateDeckTranslations.HeadingBackLink" />
  </RouterLink>
</template>

<style scoped></style>
