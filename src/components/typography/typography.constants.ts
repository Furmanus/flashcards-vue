import type { TypographyColors, TypographySizes } from './typography.interfaces.ts';

export const TypographySizeToFontSize = {
  xs: '0.75rem',
  sm: '0.875rem',
  md: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
} satisfies Record<TypographySizes, string>;

export const TypographyColorToVariable = {
  primary: 'var(--p-text-color)',
  secondary: 'var(--p-text-muted-color)',
  error: 'var(--p-red-600)',
} satisfies Record<TypographyColors, string>;
