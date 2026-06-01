export type TPersonType = 'F' | 'J';
export type TGenderType = 'M' | 'F';
export type TActiveType = 'A' | 'I';

export interface IPersonModel {
  id: number | null;
  name: string;
  nickname: string;
  peopleType: TPersonType;
  gender: TGenderType | null;
  age: number | null;
  federalDocument: string;
  stateDocument: string;
  active: TActiveType;
  bond : Pick<IPersonModel, 'id'> | null;
}
