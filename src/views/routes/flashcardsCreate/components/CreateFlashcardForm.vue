<script setup lang="ts">
  import { translate } from '../../../../components/translation/translate.ts';
  import Translation from '../../../../components/translation/Translation.vue';
  import Textarea from 'primevue/textarea';
  import FormFieldWrapper from '../../../../components/form/FormFieldWrapper.vue';
  import { CreateFlashcardTranslations } from '../constants/translations.constants.ts';
  import { reactive, ref } from 'vue';
  import { FlashcardsFormFields } from '../constants/form.constants.ts';
  import FormFieldTip from '../../../../components/form/FormFieldTip.vue';
  import Button from 'primevue/button';
  import { useRoute, useRouter } from 'vue-router';
  import { useMutation } from '@pinia/colada';
  import { FlashcardSchema } from '../../../../schema/flashcards.schema.ts';

  const currentRoute = useRoute();
  const editedFlashcardId = currentRoute.params.flashcardId as string;
  const isEditing = !!editedFlashcardId;
  const router = useRouter();
  const isSubmitting = ref(false);
  const formState = reactive({
    [FlashcardsFormFields.Question]: '',
    [FlashcardsFormFields.Answer]: '',
  });
  const { asyncStatus, mutate } = useMutation({
    mutation: () => {
      return Promise.resolve();
    },
    onSuccess: () => {},
    onError: () => {},
  });

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    const parseResult = FlashcardSchema.safeParse(formState);

    if (parseResult.success) {
      mutate(parseResult.data as never); // TODO send data to backend
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
