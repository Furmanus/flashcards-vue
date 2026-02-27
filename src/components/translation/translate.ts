import type { Translation } from '../../interfaces/translations.interfaces.ts';

export function translate(tuple: Translation): string {
  return tuple[0];
}
