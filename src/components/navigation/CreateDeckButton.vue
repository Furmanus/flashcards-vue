<script setup lang="ts">
  import { translate } from '../translation/translate.ts';
  import { AppHeadingTranslations } from '../../views/heading/AppHeading.translations.ts';
  import Button from 'primevue/button';
  // TODO wyniesc tutaj wspolny button do nawigacji i przyjmij translation tuple jako prop
</script>

<template>
  <Button :label="translate(AppHeadingTranslations.Buttons.NewDeck)" icon="pi pi-plus" />
</template>

<style scoped></style>
