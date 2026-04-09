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
  import { useRoute, useRouter } from 'vue-router';
  import { CreateDeckSchema } from '../../../../schema/flashcards.schema.ts';
  import { AppRoutes } from '../../../../router/router.ts';
  import type { DeckModel } from '../../../../interfaces/flashcards.interfaces.ts';

  const queryCache = useQueryCache();
  const { data, asyncStatus } = useQuery({
    key: [QueryKeys.Folders],
    query: flashcardsApiService.getFolders.bind(flashcardsApiService),
  });
  const router = useRouter();
  const currentRoute = useRoute();
  const editedDeckId = currentRoute.params.deckId as string;
  const isEditing = !!editedDeckId;
  const deckData = useQuery({
    key: [QueryKeys.Decks, editedDeckId],
    query: () => {
      return flashcardsApiService.getDeckDetails(editedDeckId);
    },
    enabled: isEditing,
  });
  const isFetchingEditedDeckData = computed(() => deckData.status.value === 'pending');
  const formData = reactive({
    [CreateDeckFormFields.Name]: isEditing && !isFetchingEditedDeckData.value ? deckData.data.value?.name : '',
    [CreateDeckFormFields.Folder]: isEditing && !isFetchingEditedDeckData.value ? deckData.data.value?.folderId : undefined,
    [CreateDeckFormFields.Description]: isEditing && !isFetchingEditedDeckData.value ? deckData.data.value?.description : undefined,
  });
  const { mutate, asyncStatus: mutationAsyncStatus } = useMutation({
    mutation: ({ deckId, data }: { deckId?: string; data: Omit<DeckModel, 'id'> }) => {
      if (deckId) {
        return flashcardsApiService.updateDeck(deckId, data);
      } else {
        return flashcardsApiService.createDeck(data);
      }
    },
    onSuccess: () => {
      queryCache.invalidateQueries({
        predicate: (entry) => {
          return entry.key[0] === QueryKeys.Folders || (entry.key[0] === QueryKeys.Decks && entry.key[1] === editedDeckId);
        },
      });
      router.push(AppRoutes.Home);
    },
    onError: (e) => {
      console.log('ERROR', e); // TODO handle mutation error
    },
  });
  const foldersSelectPlaceholder = computed(() =>
    translate(
      Number(data?.value?.length) > 0 || asyncStatus.value !== 'idle'
        ? CreateDeckTranslations.FormFields.Folder.NoFolderSelectedOption
        : CreateDeckTranslations.FormFields.Folder.NoFoldersAvailableOption,
    ),
  );
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
      return mutate({
        deckId: isEditing ? editedDeckId : undefined,
        data: parseResult.data,
      });
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
        <Translation :id="isEditing ? CreateDeckTranslations.Buttons.Edit : CreateDeckTranslations.Buttons.Create" />
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

    @media (max-width: 768px) {
      padding-inline: 3rem;
    }

    @media (max-width: 480px) {
      padding-inline: 1rem;
    }

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
