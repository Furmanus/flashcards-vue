<script setup lang="ts">
  import { DeckDetailsTranslations } from '../constants/translations.constants.ts';
  import Button from 'primevue/button';
  import { translate } from '../../../../components/translation/translate.ts';

  const { deckId } = defineProps<{ deckId: string }>();
  const handleClick = () => {
    console.log(deckId);
  };
</script>

<template>
  <Button
    @click="handleClick"
    severity="danger"
    icon="pi pi-trash"
    :label="translate(DeckDetailsTranslations.Heading.DeleteButton)"
    variant="outlined"
  >
  </Button>
</template>

<style scoped></style>
