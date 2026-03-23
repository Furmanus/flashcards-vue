<script setup lang="ts">
  import { translate } from '../../../../components/translation/translate.ts';
  import Translation from '../../../../components/translation/Translation.vue';
  import Textarea from 'primevue/textarea';
  import FormFieldWrapper from '../../../../components/form/FormFieldWrapper.vue';
  import { CreateFlashcardTranslations } from '../constants/translations.constants.ts';
  import { computed, reactive } from 'vue';
  import { FlashcardsFormFields } from '../constants/form.constants.ts';
  import FormFieldTip from '../../../../components/form/FormFieldTip.vue';
  import Button from 'primevue/button';
  import { useRoute, useRouter } from 'vue-router';
  import { useMutation } from '@pinia/colada';
  import { CreateFlashcardSchema } from '../../../../schema/flashcards.schema.ts';
  import { flashcardsApiService } from '../../../../api/flashcardsApi.service.ts';
  import type { CreateFlashcardModel } from '../../../../interfaces/flashcards.interfaces.ts';
  import { AppRoutes } from '../../../../router/router.ts';

  const currentRoute = useRoute();
  const deckId = currentRoute.params.deckId as string;
  const editedFlashcardId = currentRoute.params.flashcardId as string;
  const isEditing = !!editedFlashcardId;
  const router = useRouter();
  const formState = reactive({
    [FlashcardsFormFields.Question]: '',
    [FlashcardsFormFields.Answer]: '',
  });
  const { asyncStatus, mutate } = useMutation({
    mutation: (flashcardData: CreateFlashcardModel) => {
      return flashcardsApiService.createFlashcard(flashcardData);
    },
    onSuccess: () => {
      router.push(AppRoutes.DeckDetails.replace(':deckId', deckId));
    },
    onError: () => {},
  });
  const isSubmitting = computed(() => asyncStatus.value !== 'idle');

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
      <Textarea
        :id="FlashcardsFormFields.Question"
        :name="FlashcardsFormFields.Question"
        :disabled="isSubmitting"
        v-model="formState[FlashcardsFormFields.Question]"
        :placeholder="translate(CreateFlashcardTranslations.FormFields.Question.Placeholder)"
        rows="5"
        fluid
      />
      <FormFieldTip :text="translate(CreateFlashcardTranslations.FormFields.Question.Tip)" severity="info" />
    </FormFieldWrapper>
    <FormFieldWrapper>
      <label :for="FlashcardsFormFields.Answer">
        <Translation :id="CreateFlashcardTranslations.FormFields.Answer.Label" />
      </label>
      <Textarea
        :id="FlashcardsFormFields.Answer"
        :name="FlashcardsFormFields.Answer"
        :disabled="isSubmitting"
        v-model="formState[FlashcardsFormFields.Answer]"
        :placeholder="translate(CreateFlashcardTranslations.FormFields.Answer.Placeholder)"
        rows="8"
        fluid
      />
      <FormFieldTip :text="translate(CreateFlashcardTranslations.FormFields.Answer.Tip)" severity="info" />
    </FormFieldWrapper>
    <div class="buttons-wrapper">
      <Button severity="secondary" type="button" @click="router.back()" outlined :disabled="isSubmitting">
        <Translation :id="CreateFlashcardTranslations.Buttons.Cancel" />
      </Button>
      <Button type="submit" :disabled="asyncStatus !== 'idle' || isSubmitting" :loading="isSubmitting">
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
