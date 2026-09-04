import { minLength, pattern, required } from '@angular/forms/signals';
import { IPersonWebFormConfig, IPersonWebListConfig } from '../interfaces/person-web-config';

export const NATURAL_PERSON_FORM: IPersonWebFormConfig = {
  title: 'MAIN.FEATURES.PEOPLE.TITLEF',
  nameLabel: 'MAIN.FEATURES.PEOPLE.NAMEF',
  nicknameLabel: 'MAIN.FEATURES.PEOPLE.NICKNAMEF',
  federalLabel: 'MAIN.FEATURES.PEOPLE.FEDERALDOCUMENTF',
  stateLabel: 'MAIN.FEATURES.PEOPLE.STATEDOCUMENTF',
  dateLabel: 'MAIN.FEATURES.PEOPLE.DATE',
  genderLabel: 'MAIN.FEATURES.PEOPLE.GENDER',
};

export const ENTITIES_PERSON_FORM: IPersonWebFormConfig = {
  title: 'MAIN.FEATURES.PEOPLE.TITLEJ',
  nameLabel: 'MAIN.FEATURES.PEOPLE.NAMEJ',
  nicknameLabel: 'MAIN.FEATURES.PEOPLE.NICKNAMEJ',
  federalLabel: 'MAIN.FEATURES.PEOPLE.FEDERALDOCUMENTJ',
  stateLabel: 'MAIN.FEATURES.PEOPLE.STATEDOCUMENTJ',
  bondLabel: 'MAIN.FEATURES.PEOPLE.BOND',
};

export const NATURAL_PERSON_LIST: IPersonWebListConfig = {
  newRegistration: 'MAIN.FEATURES.PEOPLE.LIST.NATURAL.NEW',
  title: 'MAIN.FEATURES.PEOPLE.LIST.NATURAL.TITLE',
};

export const ENTITIES_PERSON_LIST: IPersonWebListConfig = {
  title: 'MAIN.FEATURES.PEOPLE.LIST.LEGAL.TITLE',
  newRegistration: 'MAIN.FEATURES.PEOPLE.LIST.LEGAL.NEW',
};

const PATTERNS = {
  CPF: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
  CNPJ: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
  RG: /^\d{1,2}\.\d{3}\.\d{3}-[\dxX]$/,
  IE: /^\d{3}\.?\d{3}\.?\d{3}\.?\d{3}$/,
};

export const applyNaturalPersonSchemaPath = (schema: any) => {
  required(schema.nickname, { message: 'MAIN.FEATURES.PEOPLE.VALIDATION.NICKNAME_REQUIRED' });

  required(schema.name, { message: 'MAIN.FEATURES.PEOPLE.VALIDATION.NAME_REQUIRED' });
  minLength(schema.name, 3, { message: 'MAIN.FEATURES.PEOPLE.VALIDATION.NAME_MIN_LENGTH' });

  required(schema.federalDocument, { message: 'MAIN.FEATURES.PEOPLE.VALIDATION.CPF_REQUIRED' });
  pattern(schema.federalDocument, PATTERNS.CPF, {
    message: 'MAIN.FEATURES.PEOPLE.VALIDATION.CPF_FORMAT',
  });

  required(schema.stateDocument, { message: 'MAIN.FEATURES.PEOPLE.VALIDATION.RG_REQUIRED' });
  pattern(schema.stateDocument, PATTERNS.RG, {
    message: 'MAIN.FEATURES.PEOPLE.VALIDATION.RG_FORMAT',
  });

  required(schema.gender, { message: 'MAIN.FEATURES.PEOPLE.VALIDATION.GENDER_REQUIRED' });
  required(schema.date, { message: 'MAIN.FEATURES.PEOPLE.VALIDATION.BIRTH_DATE_REQUIRED' });

  applyAddressesSchemaPath(schema);
};

export const applyLegalPersonSchemaPath = (schema: any) => {
  required(schema.nickname, { message: 'MAIN.FEATURES.PEOPLE.VALIDATION.NICKNAME_REQUIRED' });
  required(schema.name, { message: 'MAIN.FEATURES.PEOPLE.VALIDATION.COMPANY_NAME_REQUIRED' });
  minLength(schema.name, 3, { message: 'MAIN.FEATURES.PEOPLE.VALIDATION.NAME_MIN_LENGTH' });

  required(schema.federalDocument, { message: 'MAIN.FEATURES.PEOPLE.VALIDATION.CNPJ_REQUIRED' });
  pattern(schema.federalDocument, PATTERNS.CNPJ, {
    message: 'MAIN.FEATURES.PEOPLE.VALIDATION.CNPJ_FORMAT',
  });

  required(schema.stateDocument, { message: 'MAIN.FEATURES.PEOPLE.VALIDATION.STATE_ID_REQUIRED' });
  pattern(schema.stateDocument, PATTERNS.IE, {
    message: 'MAIN.FEATURES.PEOPLE.VALIDATION.STATE_ID_FORMAT',
  });

  applyAddressesSchemaPath(schema);
};

export const applyAddressesSchemaPath = (schema: any) => {
  minLength(schema.addresses, 1, { message: 'MAIN.FEATURES.ADDRESSES.VALIDATION.MIN_LENGTH' });
};
