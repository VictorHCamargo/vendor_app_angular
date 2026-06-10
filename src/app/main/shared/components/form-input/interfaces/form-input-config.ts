import { FieldTree } from '@angular/forms/signals';

export interface IFormInputConfig<MODEL> {
  idLabel?: keyof MODEL;
  nameLabel?: string;
  type?: string;
  options?: TOpitons[];
}

export type TTypeInput = 'input' | 'radio' | 'select' | 'active';

export type TOpitons = {
  value: string;
  data: string;
};
