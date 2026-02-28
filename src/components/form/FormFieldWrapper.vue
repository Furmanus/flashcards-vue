<script setup lang="ts"></script>

<template>
  <div class="form-field-wrapper">
    <slot></slot>
  </div>
</template>

<style scoped>
  .form-field-wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    align-items: flex-start;
    font-size: var(--p-form-field-sm-font-size);
  }
</style>
