<script setup lang="ts">
  import type { FolderPresentationModel } from '../../../../../interfaces/flashcards.interfaces.ts';
  import FoldersListEntry from './FoldersListEntry.vue';
  import Dialog from 'primevue/dialog';
  import Button from 'primevue/button';
  import { ref } from 'vue';
  import { translate } from '../../../../../components/translation/translate.ts';
  import { HomeViewTranslations } from '../../constants/translations.constants.ts';
  import { useMutation, useQueryCache } from '@pinia/colada';
  import { flashcardsApiService } from '../../../../../api/flashcardsApi.service.ts';
  import { useToast } from 'primevue';
  import { QueryKeys } from '../../../../../constants/query.constants.ts';
  import DecksList from '../decks/DecksList.vue';
  import Translation from '../../../../../components/translation/Translation.vue';

  interface FoldersListProps {
    folders?: FolderPresentationModel[];
    uncategorizedDecksFolder?: FolderPresentationModel;
  }

  const { folders, uncategorizedDecksFolder } = defineProps<FoldersListProps>();
  const queryCache = useQueryCache();
  const toast = useToast();
  const { mutate: deleteFolder } = useMutation({
    mutation: flashcardsApiService.deleteFolder.bind(flashcardsApiService),
    onSuccess: () => {
      queryCache.invalidateQueries({ key: [QueryKeys.Folders] });
      toast.add({
        summary: translate(HomeViewTranslations.Folders.DeleteToast.Success),
        life: 2000,
        severity: 'secondary',
      });
    },
    onError: () => {
      toast.add({
        summary: translate(HomeViewTranslations.Folders.DeleteToast.Fail),
        life: 2000,
        severity: 'secondary',
      });
    },
  });
  const deleteFolderDialogAttemptId = ref('');
  const handleDelete = (folderId: string) => {
    deleteFolderDialogAttemptId.value = folderId;
  };
  const handleDeleteConfirm = () => {
    const deleteFolderId = deleteFolderDialogAttemptId.value;

    deleteFolderDialogAttemptId.value = '';

    deleteFolder(deleteFolderId);
  };
</script>

<template>
  <ul class="folderList">
    <FoldersListEntry v-for="folder in folders || []" :key="folder.id" :folder="folder" @delete="handleDelete" />
  </ul>
  <section class="uncategorizedDecks" v-if="uncategorizedDecksFolder && uncategorizedDecksFolder.decks.length > 0">
    <Translation :id="HomeViewTranslations.DeckList.UncategorizedDecks.Heading" tag="h3" class="heading" />
    <div class="uncategorizedDecksList">
      <DecksList :decks="uncategorizedDecksFolder.decks" v-if="uncategorizedDecksFolder && uncategorizedDecksFolder.decks.length > 0" />
    </div>
  </section>
  <Dialog
    :visible="deleteFolderDialogAttemptId !== ''"
    modal
    :header="translate(HomeViewTranslations.Folders.DeleteModal.Heading)"
    :closable="false"
  >
    <div class="dialog">
      <Translation
        :id="HomeViewTranslations.Folders.DeleteModal.Description"
        color="secondary"
        :values="{ folderName: folders?.find((f) => f.id === deleteFolderDialogAttemptId)?.name || '' }"
      />
      <div class="buttonWrapper">
        <Button severity="secondary" @click="deleteFolderDialogAttemptId = ''" variant="text" size="small">
          <Translation :id="HomeViewTranslations.Folders.DeleteModal.Buttons.Cancel" />
        </Button>
        <Button severity="secondary" @click="handleDeleteConfirm" variant="text" size="small">
          <Translation :id="HomeViewTranslations.Folders.DeleteModal.Buttons.Delete" />
        </Button>
      </div>
    </div>
  </Dialog>
</template>

<style scoped>
  .folderList {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-inline-start: 0;
  }

  .uncategorizedDecks {
    & > .heading {
      margin-block: 2rem;
      text-align: left;

      @media (max-width: 480px) {
        text-align: center;
      }
    }
  }

  .uncategorizedDecksList {
    & > ul {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;
      padding-inline-start: 0;

      @media (max-width: 480px) {
        flex-direction: column;
        align-items: center;
      }
    }
  }

  .dialog {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .buttonWrapper {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    align-self: flex-end;
    gap: 0.5rem;
  }
</style>
