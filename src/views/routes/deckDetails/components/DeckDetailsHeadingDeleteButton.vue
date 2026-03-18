<script setup lang="ts">
  import { DeckDetailsTranslations } from '../constants/translations.constants.ts';
  import Button from 'primevue/button';
  import Dialog from 'primevue/dialog';
  import { translate } from '../../../../components/translation/translate.ts';
  import { computed, ref } from 'vue';
  import Translation from '../../../../components/translation/Translation.vue';
  import { useMutation, useQueryCache } from '@pinia/colada';
  import { flashcardsApiService } from '../../../../api/flashcardsApi.service.ts';
  import { QueryKeys } from '../../../../constants/query.constants.ts';
  import { useRouter } from 'vue-router';
  import { AppRoutes } from '../../../../router/router.ts';

  const { deckId, deckName } = defineProps<{ deckId: string; deckName: string }>();
  const isDeleteModalVisible = ref(false);
  const queryCache = useQueryCache();
  const router = useRouter();
  const { mutate, asyncStatus } = useMutation({
    mutation: (deletingDeckID: string) => {
      return flashcardsApiService.deleteDeck(deletingDeckID);
    },
    onSuccess: () => {
      queryCache.invalidateQueries({
        predicate: (entry) => {
          return entry.key[0] === QueryKeys.Folders || (entry.key[0] === QueryKeys.Decks && entry.key[1] === deckId);
        },
      });
      router.push(AppRoutes.Home);
    },
    onError: () => {
      router.push(AppRoutes.Home);
      // TODO handle error
    },
  });
  const handleDeleteClick = () => {
    isDeleteModalVisible.value = true;
  };
  const handleDeleteConfirm = () => {
    mutate(deckId);
  };
  const isDeleting = computed(() => asyncStatus.value !== 'idle');
</script>

<template>
  <Button
    @click="handleDeleteClick"
    severity="danger"
    :disabled="isDeleting"
    :loading="isDeleting"
    icon="pi pi-trash"
    :label="translate(DeckDetailsTranslations.Heading.DeleteButton)"
    variant="outlined"
  >
  </Button>
  <Dialog
    v-model:visible="isDeleteModalVisible"
    :header="translate(DeckDetailsTranslations.Content.DeleteModal.Heading)"
    :closable="false"
    class="deleteModal"
  >
    <div class="content">
      <Translation :id="DeckDetailsTranslations.Content.DeleteModal.Description" color="secondary" :values="{ deckName: deckName }" />
      <div class="buttonsWrapper">
        <Button severity="secondary" @click="isDeleteModalVisible = false">
          <Translation :id="DeckDetailsTranslations.Content.DeleteModal.Buttons.Cancel" />
        </Button>
        <Button severity="danger" @click="handleDeleteConfirm">
          <Translation :id="DeckDetailsTranslations.Content.DeleteModal.Buttons.Delete" />
        </Button>
      </div>
    </div>
  </Dialog>
</template>

<style scoped>
  .content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    justify-content: flex-start;
    align-items: flex-start;
  }
  .buttonsWrapper {
    display: flex;
    width: 100%;
    gap: 1rem;
    justify-content: flex-end;
    align-items: center;
  }
</style>
