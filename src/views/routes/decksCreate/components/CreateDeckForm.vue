<script setup lang="ts">
  import { CreateDeckFormFields } from '../constants/form.constants.ts';
  import Translation from '../../../../components/translation/Translation.vue';
  import { CreateDeckTranslations } from '../constants/translations.constants.ts';
  import { translate } from '../../../../components/translation/translate.ts';
  import InputText from 'primevue/inputtext';
  import Textarea from 'primevue/textarea';
  import FormFieldWrapper from '../../../../components/form/FormFieldWrapper.vue';
  import { useQuery } from '@pinia/colada';
  import { QueryKeys } from '../../../../constants/query.constants.ts';
  import { flashcardsApiService } from '../../../../api/flashcardsApi.service.ts';
  import Select from 'primevue/select';
  import Button from 'primevue/button';
  import { computed } from 'vue';
  import { useRoute, useRouter } from 'vue-router';

  const { data, asyncStatus } = useQuery({
    key: [QueryKeys.Folders],
    query: flashcardsApiService.getFolders,
  });
  const foldersSelectPlaceholder = computed(() =>
    translate(
      !data || asyncStatus.value !== 'idle'
        ? CreateDeckTranslations.FormFields.Folder.NoFolderSelectedOption
        : CreateDeckTranslations.FormFields.Folder.NoFoldersAvailableOption,
    ),
  );
  const router = useRouter();
  const currentRoute = useRoute();
  const editedDeckId = currentRoute.params.id as string;

  console.log('EDITED DECK ID', editedDeckId);

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    console.log('VALUES', new FormData(event.target as HTMLFormElement));
  }
</script>

<template>
  <form @submit="handleSubmit">
    <FormFieldWrapper>
      <label :for="CreateDeckFormFields.Name">
        <Translation :id="CreateDeckTranslations.FormFields.DeckTitle.Label" />
      </label>
      <InputText
        :id="CreateDeckFormFields.Name"
        :name="CreateDeckFormFields.Name"
        :placeholder="translate(CreateDeckTranslations.FormFields.DeckTitle.Placeholder)"
        fluid
      />
    </FormFieldWrapper>
    <FormFieldWrapper>
      <label :for="CreateDeckFormFields.Folder">
        <Translation :id="CreateDeckTranslations.FormFields.Folder.Label" />
      </label>
      <Select
        class="folders-select"
        :id="CreateDeckFormFields.Folder"
        :name="CreateDeckFormFields.Folder"
        :placeholder="foldersSelectPlaceholder"
        :loading="asyncStatus !== 'idle'"
        :disabled="asyncStatus !== 'idle' || !data?.length"
        :data="data"
        fluid
      />
    </FormFieldWrapper>
    <FormFieldWrapper>
      <label :for="CreateDeckFormFields.Description">
        <Translation :id="CreateDeckTranslations.FormFields.Description.Label" />
      </label>
      <Textarea
        :id="CreateDeckFormFields.Description"
        :name="CreateDeckFormFields.Description"
        :placeholder="translate(CreateDeckTranslations.FormFields.Description.Placeholder)"
        rows="5"
        fluid
      />
    </FormFieldWrapper>
    <div class="buttons-wrapper">
      <Button severity="secondary" type="button" @click="router.back()" outlined>
        <Translation :id="CreateDeckTranslations.Buttons.Cancel" />
      </Button>
      <Button type="submit">
        <Translation :id="CreateDeckTranslations.Buttons.Create" />
      </Button>
    </div>
  </form>
</template>

<style scoped>
  form {
    width: 100%;
    padding-inline: 6rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    & textarea {
      resize: none;
    }
  }

  .folders-select {
    text-align: left;
  }

  .buttons-wrapper {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
  }
</style>
