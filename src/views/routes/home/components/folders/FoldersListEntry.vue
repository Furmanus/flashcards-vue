<script setup lang="ts">
  import type { FolderPresentationModel } from '../../../../../interfaces/flashcards.interfaces.ts';
  import Badge from 'primevue/badge';
  import InputText from 'primevue/inputtext';
  import { computed, ref } from 'vue';
  import Button from 'primevue/button';
  import EmptyFolderDetails from './EmptyFolderDetails.vue';
  import DecksList from '../decks/DecksList.vue';
  import { useMutation, useQueryCache } from '@pinia/colada';
  import { flashcardsApiService } from '../../../../../api/flashcardsApi.service.ts';
  import { FolderNameSchema } from '../../../../../schema/flashcards.schema.ts';
  import { QueryKeys } from '../../../../../constants/query.constants.ts';

  interface FoldersListEntryProps {
    folder: FolderPresentationModel;
  }

  const queryCache = useQueryCache();
  const { folder } = defineProps<FoldersListEntryProps>();
  const emit = defineEmits(['delete']);
  const isExpanded = ref(false);
  const isEditing = ref(false);
  const editedNameFormFieldValue = ref(folder.name);
  const { mutate: editFolder, asyncStatus } = useMutation({
    mutation: ({ id, name }: { id: string; name: string }) => {
      return flashcardsApiService.updateFolder(id, { name });
    },
    onSuccess: () => {
      queryCache.invalidateQueries({ key: [QueryKeys.Folders] });
      isEditing.value = false;
      editedNameFormFieldValue.value = '';
    },
    onError: () => {},
  });
  const handleEditClick = (e: MouseEvent) => {
    e.stopPropagation();

    isEditing.value = true;
  };
  const handleSubmitEditForm = (e: SubmitEvent) => {
    e.preventDefault();

    const validationResult = FolderNameSchema.name.safeParse(editedNameFormFieldValue.value);

    if (validationResult.success) {
      editFolder({
        id: folder.id,
        name: validationResult.data,
      });
    } else {
      console.error('Validation failed:', validationResult.error); // TODO present validation errors on UI
    }
  };
  const handleWrapperClick = () => {
    if (!isEditing.value) {
      isExpanded.value = !isExpanded.value;
    }
  };
  const isSubmittingEditForm = computed(() => asyncStatus.value !== 'idle' && isEditing.value);
</script>

<template>
  <li>
    <div :class="{ wrapper: true, expanded: isExpanded }">
      <div class="listItemLeft">
        <i @click="handleWrapperClick" :class="isExpanded ? 'expandIcon pi pi-angle-down' : 'expandIcon pi pi-angle-right'"></i>
        <form v-if="isEditing" class="editForm" @submit="handleSubmitEditForm">
          <InputText v-model="editedNameFormFieldValue" size="small" :placeholder="folder.name" :disabled="isSubmittingEditForm" />
          <Button
            type="button"
            severity="secondary"
            aria-label="cancel"
            @click.prevent="isEditing = false"
            :disabled="isSubmittingEditForm"
            icon="pi pi-times"
            size="small"
          ></Button>
          <Button
            type="submit"
            severity="primary"
            aria-label="edit"
            :disabled="isSubmittingEditForm"
            :icon="`pi ${isSubmittingEditForm ? 'pi-spin pi-spinner' : 'pi-check'}`"
            size="small"
          ></Button>
        </form>
        <div v-else class="listItemLeft" @click="handleWrapperClick">
          <i class="pi pi-folder" style="font-size: 1rem"></i>
          <span>{{ folder.name }}</span>
          <Badge size="small">{{ folder.decks.length }}</Badge>
        </div>
      </div>
      <div class="listItemRight" v-if="!isEditing">
        <Button severity="secondary" size="small" icon="pi pi-pencil" aria-label="Edit folder" @click="handleEditClick" />
        <Button severity="secondary" size="small" icon="pi pi-trash" aria-label="Delete folder" @click.stop="emit('delete', folder.id)" />
      </div>
    </div>
    <section :class="isExpanded ? 'expanded deckWrapper' : 'deckWrapper'">
      <EmptyFolderDetails v-if="folder.decks.length === 0" />
      <div class="decksListWrapper" v-else>
        <DecksList :decks="folder.decks" />
      </div>
    </section>
  </li>
</template>

<style scoped>
  li {
    list-style-type: none;
    width: 100%;
    border-radius: var(--p-border-radius-lg);
    border: 1px solid var(--p-content-border-color);
  }

  .wrapper {
    padding: 1rem;
    border-top-left-radius: var(--p-border-radius-lg);
    border-top-right-radius: var(--p-border-radius-lg);
    background-color: var(--p-content-hover-background);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 0.5rem;

    &[aria-disabled='true'] {
      cursor: default;
      pointer-events: none;
    }
  }

  .listItemLeft {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    flex-grow: 1;
    gap: 0.5rem;
    cursor: pointer;
  }

  .expandIcon {
    cursor: pointer;
  }

  .listItemRight {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    gap: 0.5rem;
    z-index: 2;
  }

  .deckWrapper {
    width: 100%;
    height: 0;
    overflow: hidden;
    transition:
      height 0.2s ease-in-out,
      padding 0.2s ease-in-out;
    border: none;

    & > .decksListWrapper {
      padding: 1rem;
    }

    &.expanded {
      height: auto;
    }
  }
</style>
