export interface IFormInputConfig<MODEL> {
  idLabel?: keyof MODEL;
  nameLabel?: string;
  type?: string;
  options?: TOpitons[];
  readonly? : boolean;
}

export type TTypeInput = 'input' | 'radio' | 'select' | 'active' | 'color';

export type TOpitons = {
  value: string;
  data: string;
};
