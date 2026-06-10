import { TPersonModel } from './person-model';

export interface IAddressModel {
  zipCode: string;
  id: number | null;
  idPerson: Pick<TPersonModel, 'id'> | null;
  number: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  active: boolean;
  typeAddress: TTypeAddress;
  hasZipCode: boolean;
}

export type TTypeAddress = 'M' | 'C' | 'E';
