import { IPartFormConfig } from '../components/part-form/interfaces/part-form-config';

export interface IFormConfig<MODEL> {
  fieldsPerRow: number;
  formInfo: Partial<Record<keyof MODEL, IPartFormConfig<MODEL>>>;
}
