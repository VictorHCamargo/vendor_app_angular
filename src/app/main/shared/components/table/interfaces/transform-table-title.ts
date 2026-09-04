export interface ITransformTableTitle {
  type: TTableTransformType;
  transform: (value: unknown) => unknown;
}

export type TTableTransformType = 'icon' | 'color' | 'active';
