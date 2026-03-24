export type TypographySizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type TypographyColors = 'primary' | 'secondary' | 'error';

export interface TypographyProps {
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  align?: 'left' | 'center' | 'right' | 'justify';
  fontWeight?: 'normal' | 'bold' | 'bolder' | 'lighter';
  size?: TypographySizes;
  color?: TypographyColors;
  classes?: string;
}
