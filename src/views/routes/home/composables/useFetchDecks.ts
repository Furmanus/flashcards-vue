import { onUnmounted, type Ref, ref } from 'vue';
import { flashcardsApiService } from '../../../../api/flashcardsApi.service.ts';
import type { DeckModel } from '../../../../interfaces/flashcards.interfaces.ts';

export function useFetchDecks() {
  const data: Ref<DeckModel[] | null> = ref(null);
  const isFetching = ref(true);
  const error: Ref<unknown | null> = ref(null);
  const abortController = new AbortController();

  flashcardsApiService
    .getDecks({ signal: abortController.signal })
    .then((decksData) => {
      data.value = decksData;
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

  onUnmounted(() => {
    abortController.abort();
  });

  return { data, isFetching, error };
}
