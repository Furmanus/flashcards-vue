<script setup lang="ts">
  import CreateFlashcardHeading from './components/CreateFlashcardHeading.vue';
  import CreateFlashcardForm from './components/CreateFlashcardForm.vue';
</script>

<template>
  <section class="wrapper">
    <CreateFlashcardHeading />
    <CreateFlashcardForm />
  </section>
</template>

<style scoped>
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.75rem;
    border-radius: 5px;
    padding-block: 2rem;
  }
</style>
