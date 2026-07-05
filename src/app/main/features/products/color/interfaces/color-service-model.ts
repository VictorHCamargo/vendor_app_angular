export interface IColorServiceModel {
  id: string | number | null;
  hexadecimal: string;
  ativo: TActiveColor;
}

export type TActiveColor = 'I' | 'A';
