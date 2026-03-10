import type { FolderPresentationModel } from '../../../../interfaces/flashcards.interfaces.ts';
import { type Ref, ref } from 'vue';
import { flashcardsApiService } from '../../../../api/flashcardsApi.service.ts';

export function useFetchFolders() {
  const data: Ref<FolderPresentationModel[] | null> = ref(null);
  const isFetching = ref(true);
  const error: Ref<unknown | null> = ref(null);
  const abortController = new AbortController();

  flashcardsApiService
    .getFolders({ signal: abortController.signal })
    .then((foldersData) => {
      data.value = foldersData;
    })
    .catch((err: unknown) => {
      if (err instanceof DOMException && err.name === 'AbortError') {
        return;
      }

      error.value = err;
    })
    .finally(() => {
      isFetching.value = false;
    });

  return { data, isFetching, error };
}
