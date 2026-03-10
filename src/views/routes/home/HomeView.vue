<script setup lang="ts">
  import NoDecksView from './components/NoDecksView.vue';
  import ErrorComponent from './components/ErrorComponent.vue';
  import { Skeleton, ProgressSpinner } from 'primevue';
  import Heading from './components/Heading.vue';
  import CreateFolderForm from './components/folders/CreateFolderForm.vue';
  import { HomeViewStore } from './store/store.ts';
  import FoldersList from './components/folders/FoldersList.vue';
  import { computed } from 'vue';
  import { UncategorizedFlashcardsDeckId } from '../../../constants/flashcards.constants.ts';
  import { useQuery } from '@pinia/colada';
  import { QueryKeys } from '../../../constants/query.constants.ts';
  import { flashcardsApiService } from '../../../api/flashcardsApi.service.ts';

  const { asyncStatus, error, data } = useQuery({
    key: [QueryKeys.Folders],
    query: flashcardsApiService.getFolders.bind(flashcardsApiService),
  });
  const isFetching = computed(() => asyncStatus.value !== 'idle');
  const computedData = computed(() => {
    const uncategorizedFolder = data.value?.find((folder) => folder.id === UncategorizedFlashcardsDeckId);
    const otherFolders = data.value?.filter((folder) => folder.id !== UncategorizedFlashcardsDeckId);

    return {
      uncategorizedFolder,
      otherFolders,
      showFoldersList: (uncategorizedFolder && uncategorizedFolder.decks.length > 0) || (otherFolders && otherFolders?.length > 0),
    };
  });
</script>

<template>
  <Heading />
  <CreateFolderForm v-if="HomeViewStore.showCreateDeckForm" />
  <Skeleton v-if="isFetching" width="100%" height="20rem">
    <ProgressSpinner />
  </Skeleton>
  <NoDecksView v-else-if="!computedData.showFoldersList && !isFetching" />
  <ErrorComponent v-else-if="error" />
  <FoldersList v-else :folders="computedData.otherFolders" :uncategorizedDecksFolder="computedData.uncategorizedFolder" />
</template>

<style scoped></style>
