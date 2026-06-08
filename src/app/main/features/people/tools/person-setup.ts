import { IPersonWebConfig } from '../interfaces/person-web-config';

export const NATURAL_PERSON: IPersonWebConfig = {
  title: 'Pessoa Física',
  nameLabel: 'Nome Pessoa',
  nicknameLabel: 'Apelido',
  federalLabel: 'CPF',
  stateLabel: 'RG',
  ageLabel: 'Data de Nascimento',
  bondLabel: 'Vinculo',
  genderLabel: 'Sexo',
};

export const ENTITIES_PERSON: IPersonWebConfig = {
  title: 'Pessoa Jurídica',
  nameLabel: 'Razao Social',
  nicknameLabel: 'Nome Fantasia',
  federalLabel: 'CNPJ',
  stateLabel: 'Inscriçao Estadual',
};
