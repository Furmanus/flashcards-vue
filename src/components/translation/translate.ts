import type { Translation } from '../../interfaces/translations.interfaces.ts';

export function translate(tuple: Translation, values?: Record<string, string>): string {
  let result = tuple[0];

  for (const [key, value] of Object.entries(values || {})) {
    result = result.replace(`{${key}}`, value);
  }

  return result;
}
