<script setup lang="ts">
  import { MdEditor } from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';
  import { useTheme } from '../../../../composables/useTheme.ts';
  import { computed } from 'vue';

  interface CreateFlashcardFormEditorFormFieldProps {
    id: string;
    disabled?: boolean;
    height?: 'tall' | 'short';
  }

  const model = defineModel<string>({ default: '' });
  const props = defineProps<CreateFlashcardFormEditorFormFieldProps>();
  const currentTheme = useTheme();
  const heightValue = computed(() => (props.height === 'tall' ? '480px' : '240px'));
</script>

<template>
  <MdEditor
    v-model="model"
    language="en-US"
    class="editorFormField"
    :editorId="props.id"
    :preview="true"
    inputBoxWidth="70%"
    :disabled="props.disabled"
    :theme="currentTheme"
  />
</template>

<style scoped>
  .editorFormField {
    width: 100%;
    height: v-bind(heightValue);
    text-align: left;
  }
</style>
