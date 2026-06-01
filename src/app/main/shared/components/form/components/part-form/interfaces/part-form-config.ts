import { FieldTree } from '@angular/forms/signals';

export interface IPartFormConfig<MODEL> {
  idLabel: keyof MODEL;
  nameLabel: string;
  type: string;
  messageId: string;
  inputField: FieldTree<MODEL>
}
