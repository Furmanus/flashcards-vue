<script setup lang="ts">
  import { CreateDeckFormFields } from '../constants/form.constants.ts';
  import Translation from '../../../../components/translation/Translation.vue';
  import { CreateDeckTranslations } from '../constants/translations.constants.ts';
  import { translate } from '../../../../components/translation/translate.ts';
  import InputText from 'primevue/inputtext';
  import Textarea from 'primevue/textarea';
  import FormFieldWrapper from '../../../../components/form/FormFieldWrapper.vue';
  import { useMutation, useQuery, useQueryCache } from '@pinia/colada';
  import { QueryKeys } from '../../../../constants/query.constants.ts';
  import { flashcardsApiService } from '../../../../api/flashcardsApi.service.ts';
  import Select from 'primevue/select';
  import Button from 'primevue/button';
  import { computed, reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import { CreateDeckSchema } from '../../../../schema/flashcards.schema.ts';
  import { AppRoutes } from '../../../../router/router.ts';

  const queryCache = useQueryCache();
  const { data, asyncStatus } = useQuery({
    key: [QueryKeys.Folders],
    query: flashcardsApiService.getFolders.bind(flashcardsApiService),
  });
  const router = useRouter();
  const formData = reactive({
    [CreateDeckFormFields.Name]: '',
    [CreateDeckFormFields.Folder]: undefined,
    [CreateDeckFormFields.Description]: undefined,
  });
  const { mutate, asyncStatus: mutationAsyncStatus } = useMutation({
    mutation: flashcardsApiService.createDeck.bind(flashcardsApiService),
    onSuccess: () => {
      queryCache.invalidateQueries({ key: [QueryKeys.Folders] });
      router.push(AppRoutes.Home);
    },
    onError: () => {
      console.log('ERROR'); // TODO handle mutation error
    },
  });
  const foldersSelectPlaceholder = computed(() =>
    translate(
      Number(data?.value?.length) > 0 || asyncStatus.value !== 'idle'
        ? CreateDeckTranslations.FormFields.Folder.NoFolderSelectedOption
        : CreateDeckTranslations.FormFields.Folder.NoFoldersAvailableOption,
    ),
  );
  // const currentRoute = useRoute();
  // const editedDeckId = currentRoute.params.id as string; // TODO dorób edycję
  const selectOptions = computed(() =>
    data.value?.map((folder) => {
      if (folder.id === '') {
        return {
          ...folder,
          name: translate(CreateDeckTranslations.FormFields.Folder.NoFolderSelectedOption),
        };
      }

      return folder;
    }),
  );
  const isSubmitting = computed(() => mutationAsyncStatus.value !== 'idle');

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    const parseResult = CreateDeckSchema.safeParse(formData);

    if (parseResult.success) {
      return mutate(parseResult.data);
    } else {
      console.error('Validation failed:', parseResult.error); // TODO handle validation errors
    }
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
        :disabled="isSubmitting"
        v-model="formData[CreateDeckFormFields.Name]"
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
        v-model="formData[CreateDeckFormFields.Folder]"
        :loading="asyncStatus !== 'idle'"
        :disabled="asyncStatus !== 'idle' || !data?.length || isSubmitting"
        option-label="name"
        option-value="id"
        :options="selectOptions"
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
        v-model="formData[CreateDeckFormFields.Description]"
        :disabled="isSubmitting"
        :placeholder="translate(CreateDeckTranslations.FormFields.Description.Placeholder)"
        rows="5"
        fluid
      />
    </FormFieldWrapper>
    <div class="buttons-wrapper">
      <Button severity="secondary" type="button" @click="router.back()" outlined :disabled="isSubmitting">
        <Translation :id="CreateDeckTranslations.Buttons.Cancel" />
      </Button>
      <Button type="submit" :disabled="asyncStatus !== 'idle' || isSubmitting" :loading="isSubmitting">
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
