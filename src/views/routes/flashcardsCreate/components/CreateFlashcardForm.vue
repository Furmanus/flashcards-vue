<script setup lang="ts">
  import { translate } from '../../../../components/translation/translate.ts';
  import Translation from '../../../../components/translation/Translation.vue';
  import FormFieldWrapper from '../../../../components/form/FormFieldWrapper.vue';
  import { CreateFlashcardTranslations } from '../constants/translations.constants.ts';
  import { computed, reactive, watch } from 'vue';
  import { FlashcardsFormFields } from '../constants/form.constants.ts';
  import FormFieldTip from '../../../../components/form/FormFieldTip.vue';
  import Button from 'primevue/button';
  import { useRoute, useRouter } from 'vue-router';
  import { useMutation, useQuery, useQueryCache } from '@pinia/colada';
  import { CreateFlashcardSchema } from '../../../../schema/flashcards.schema.ts';
  import { flashcardsApiService } from '../../../../api/flashcardsApi.service.ts';
  import type { CreateFlashcardModel } from '../../../../interfaces/flashcards.interfaces.ts';
  import { AppRoutes } from '../../../../router/router.ts';
  import { QueryKeys } from '../../../../constants/query.constants.ts';
  import CreateFlashcardFormEditorFormField from './CreateFlashcardFormEditorFormField.vue';

  const currentRoute = useRoute();
  const deckId = currentRoute.params.deckId as string;
  const editedFlashcardId = currentRoute.params.flashcardId as string;
  const isEditing = !!editedFlashcardId;
  const { data, status } = useQuery({
    key: [QueryKeys.Flashcards],
    enabled: isEditing,
    query: () => {
      return flashcardsApiService.getFlashcardDetails(editedFlashcardId);
    },
  }); // TODO handle error
  const isFetchingEditedFlashcardData = computed(() => isEditing && status.value === 'pending');
  const router = useRouter();
  const queryCache = useQueryCache();
  const formState = reactive({
    [FlashcardsFormFields.Question]: '',
    [FlashcardsFormFields.Answer]: '',
  });
  const { asyncStatus, mutate } = useMutation({
    mutation: (flashcardData: CreateFlashcardModel) => {
      if (isEditing) {
        return flashcardsApiService.updateFlashcard(editedFlashcardId, flashcardData);
      }

      return flashcardsApiService.createFlashcard(flashcardData);
    },
    onSuccess: () => {
      queryCache.invalidateQueries({
        predicate: (entry) => {
          return entry.key[0] === QueryKeys.Decks || (entry.key[0] === QueryKeys.Decks && entry.key[1] === deckId);
        },
      });

      router.push(AppRoutes.DeckDetails.replace(':deckId', deckId));
    },
    onError: () => {
      // TODO handle and show error
    },
  });
  const isSubmitting = computed(() => asyncStatus.value !== 'idle');

  watch(data, (newData) => {
    if (newData) {
      formState[FlashcardsFormFields.Question] = newData.front;
      formState[FlashcardsFormFields.Answer] = newData.back;
    }
  });

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    const parseResult = CreateFlashcardSchema.safeParse({
      front: formState[FlashcardsFormFields.Question],
      back: formState[FlashcardsFormFields.Answer],
      deckId,
    });

    if (parseResult.success) {
      mutate(parseResult.data);
    } else {
      console.log(parseResult.error); // TODO show validation errors
    }
  }
</script>

<template>
  <form @submit="handleSubmit">
    <FormFieldWrapper>
      <label :for="FlashcardsFormFields.Question">
        <Translation :id="CreateFlashcardTranslations.FormFields.Question.Label" />
      </label>
      <CreateFlashcardFormEditorFormField
        :id="FlashcardsFormFields.Question"
        height="short"
        :disabled="isSubmitting || isFetchingEditedFlashcardData"
        v-model="formState[FlashcardsFormFields.Question]"
        :placeholder="translate(CreateFlashcardTranslations.FormFields.Question.Placeholder)"
      />
      <FormFieldTip :text="translate(CreateFlashcardTranslations.FormFields.Question.Tip)" severity="info" />
    </FormFieldWrapper>
    <FormFieldWrapper>
      <label :for="FlashcardsFormFields.Answer">
        <Translation :id="CreateFlashcardTranslations.FormFields.Answer.Label" />
      </label>
      <CreateFlashcardFormEditorFormField
        :id="FlashcardsFormFields.Answer"
        height="tall"
        :disabled="isSubmitting || isFetchingEditedFlashcardData"
        v-model="formState[FlashcardsFormFields.Answer]"
        :placeholder="translate(CreateFlashcardTranslations.FormFields.Answer.Placeholder)"
      />
      <FormFieldTip :text="translate(CreateFlashcardTranslations.FormFields.Answer.Tip)" severity="info" />
    </FormFieldWrapper>
    <div class="buttons-wrapper">
      <Button severity="secondary" type="button" @click="router.back()" outlined :disabled="isSubmitting">
        <Translation :id="CreateFlashcardTranslations.Buttons.Cancel" />
      </Button>
      <Button type="submit" :disabled="asyncStatus !== 'idle' || isSubmitting || isFetchingEditedFlashcardData" :loading="isSubmitting">
        <Translation :id="isEditing ? CreateFlashcardTranslations.Buttons.Edit : CreateFlashcardTranslations.Buttons.Create" />
      </Button>
    </div>
  </form>
</template>

<style scoped>
  form {
    width: 100%;
    padding: 2rem 4rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border-radius: 0.5rem;
    background-color: var(--p-content-hover-background);

    @media (max-width: 768px) {
      padding: 2rem;
    }

    @media (max-width: 480px) {
      padding: 1rem;
    }

    & textarea {
      resize: none;
    }
  }

  .buttons-wrapper {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
  }
</style>
