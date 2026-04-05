<script setup lang="ts">
  import { MdPreview } from 'md-editor-v3';
  import { useTheme } from '../../../../../../composables/useTheme.ts';

  interface DeckStudyModeSingleFlashcardContentProps {
    type: 'question' | 'answer';
    flashcardId: string;
    content: string;
  }

  const props = defineProps<DeckStudyModeSingleFlashcardContentProps>();
  const currentTheme = useTheme();
</script>

<template>
  <MdPreview
    :modelValue="props.content"
    language="en-US"
    class="content"
    :editorId="`${props.type}-${props.flashcardId}`"
    :theme="currentTheme"
  />
</template>

<style scoped>
  .content {
    width: 100%;
    text-align: left;
    flex-grow: 1;
    background-color: var(--p-content-hover-background);
  }
</style>
