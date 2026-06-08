import { FieldTree } from '@angular/forms/signals';

export interface IFormInputConfig<MODEL> {
  idLabel?: keyof MODEL;
  nameLabel?: string;
  type?: string;
  messageId: string;
  inputField: FieldTree<string | number | null | boolean>;

  typeInput: TTypeInput;
  options?: TOpitons[];
}

export type TTypeInput = 'input' | 'radio' | 'select';

export type TOpitons = {
  value: string;
  data: string;
};
