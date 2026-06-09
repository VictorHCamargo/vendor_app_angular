import { IAddressModel } from "./address-model";

export type TPersonType = 'F' | 'J';
export type TGenderType = 'M' | 'F';
export type TActiveType = 'A' | 'I';

export type IPersonModel = INaturalPerson | ILegalPerson

interface IBasePerson {
  id: number | null;
  peopleType : TPersonType
  name: string;
  nickname: string;
  federalDocument: string;
  stateDocument: string;
  active: TActiveType;
  addresses : IAddressModel[]
}

export interface INaturalPerson extends IBasePerson {
  peopleType: 'F';
  gender: TGenderType | null;
  age: number | null;
  bond : Pick<IPersonModel, 'id'> | null;
}

export interface ILegalPerson extends IBasePerson {
  peopleType: 'J';
}