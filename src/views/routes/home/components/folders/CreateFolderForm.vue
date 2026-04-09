<script setup lang="ts">
  import { HomeViewStore } from '../../store/store.ts';
  import { CreateFolderFormFieldNames } from '../../constants/form.translations.ts';
  import { HomeViewTranslations } from '../../constants/translations.constants.ts';
  import { translate } from '../../../../../components/translation/translate.ts';
  import FormFieldWrapper from '../../../../../components/form/FormFieldWrapper.vue';
  import InputText from 'primevue/inputtext';
  import Button from 'primevue/button';
  import Toast from 'primevue/toast';
  import { onUnmounted } from 'vue';
  import { CreateFolderSchema } from '../../../../../schema/flashcards.schema.ts';
  import { flashcardsApiService } from '../../../../../api/flashcardsApi.service.ts';
  import { useMutation, useQueryCache } from '@pinia/colada';
  import { QueryKeys } from '../../../../../constants/query.constants.ts';
  import { useToast } from 'primevue';

  const queryCache = useQueryCache();
  const toast = useToast();
  const { mutate: createFolder, asyncStatus } = useMutation({
    mutation: flashcardsApiService.createFolder.bind(flashcardsApiService),
    onSuccess: () => {
      queryCache.invalidateQueries({ key: [QueryKeys.Folders] });
      HomeViewStore.showCreateDeckForm = false;
    },
    onError: () => {
      toast.add({ summary: translate(HomeViewTranslations.CreateFolder.Toast.FailMessage), life: 2000, severity: 'secondary' }); // TODO show specific message depending on message
    },
  });

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const validationResult = CreateFolderSchema.safeParse(Object.fromEntries(formData));

    if (validationResult.success) {
      createFolder(validationResult.data);
    } else {
      // TODO present validation errors
      console.error('Validation failed:', validationResult.error);
    }
  }

  onUnmounted(() => {
    HomeViewStore.showCreateDeckForm = false;
  });
</script>

<template>
  <form @submit="handleSubmit">
    <FormFieldWrapper>
      <label :for="CreateFolderFormFieldNames.Name">
        <Translation :id="HomeViewTranslations.CreateFolder.Name.Label" />
      </label>
      <InputText
        :id="CreateFolderFormFieldNames.Name"
        :name="CreateFolderFormFieldNames.Name"
        :placeholder="translate(HomeViewTranslations.CreateFolder.Name.Placeholder)"
        :disabled="asyncStatus !== 'idle'"
      />
    </FormFieldWrapper>
    <Button
      type="submit"
      icon="pi pi-check"
      @submit="handleSubmit"
      :aria-label="translate(HomeViewTranslations.CreateFolder.Buttons.Create)"
    />
    <Button
      type="button"
      severity="secondary"
      icon="pi pi-times"
      @click="HomeViewStore.showCreateDeckForm = false"
      :aria-label="translate(HomeViewTranslations.CreateFolder.Buttons.Cancel)"
    />
  </form>
  <Toast />
</template>

<style scoped>
  form {
    width: 100%;
    padding: 1rem;
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: flex-end;
    border: 1px solid var(--p-content-border-color);
    border-radius: var(--p-border-radius-lg);
    margin-bottom: 1.5rem;

    @media (max-width: 480px) {
      gap: 0.75rem;
    }
  }
</style>
