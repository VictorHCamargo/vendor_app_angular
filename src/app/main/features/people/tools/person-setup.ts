import { IPersonWebFormConfig } from '../interfaces/person-web-config';

export const NATURAL_PERSON: IPersonWebFormConfig = {
  title: 'Pessoa Física',
  nameLabel: 'Nome Pessoa',
  nicknameLabel: 'Apelido',
  federalLabel: 'CPF',
  stateLabel: 'RG',
  dateLabel: 'Data de Nascimento',
  genderLabel: 'Sexo',
};

export const ENTITIES_PERSON: IPersonWebFormConfig = {
  title: 'Pessoa Jurídica',
  nameLabel: 'Razao Social',
  nicknameLabel: 'Nome Fantasia',
  federalLabel: 'CNPJ',
  stateLabel: 'Inscriçao Estadual',
  bondLabel: 'Vinculo',
};

export const applyNaturalPersonSchemaPath = (schema: any) => {};

export const applyLegalPersonSchemaPath = (schema: any) => {};
