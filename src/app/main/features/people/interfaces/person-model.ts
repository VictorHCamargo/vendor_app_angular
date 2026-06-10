import { IAddressModel } from './address-model';

export type TPersonType = 'F' | 'J';
export type TGenderType = 'M' | 'F';

export type TPersonModel = INaturalPerson | ILegalPerson;

interface IBasePerson {
  id: number | null;
  peopleType: TPersonType;
  name: string;
  nickname: string;
  federalDocument: string;
  stateDocument: string;
  active: boolean;
  addresses: IAddressModel[];
}

export interface INaturalPerson extends IBasePerson {
  peopleType: 'F';
  gender: TGenderType;
  date: string;
}

export interface ILegalPerson extends IBasePerson {
  peopleType: 'J';
  bond: number | null;
}
