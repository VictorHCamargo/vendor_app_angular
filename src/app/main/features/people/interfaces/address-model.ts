import { IPersonModel, TActiveType } from './person-model';

export interface IAddressModel {
  zipCode: string;
  id: number | null;
  idPerson: Pick<IPersonModel, 'id'> | null;
  number: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  activate: TActiveType;
  typeAddress: TTypeAddress;
  hasZipCode: boolean;
}

export type TTypeAddress = 'M' | 'C' | 'E';
