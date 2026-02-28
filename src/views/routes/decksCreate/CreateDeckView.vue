<script setup lang="ts">
  import CreateDeckHeading from './components/CreateDeckHeading.vue';
  import CreateDeckForm from './components/CreateDeckForm.vue';
</script>

<template>
  <CreateDeckHeading />
  <section class="wrapper">
    <CreateDeckForm />
  </section>
</template>

<style scoped>
  .wrapper {
    background-color: var(--p-content-hover-background);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    border-radius: 5px;
    padding-block: 2rem;
  }
</style>
