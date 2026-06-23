import { maxLength, minLength, pattern, required } from '@angular/forms/signals';
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

export const NATURAL_PERSON_LIST : IPersonWebListConfig = {
  newRegistration : 'Cadastrar nova Pessoa Fisica',
  title : 'Lista de Pessoa Fisica'
}

export const ENTITIES_PERSON_LIST : IPersonWebListConfig = {
  title : 'Lista de Pessoa Juridica',
  newRegistration : 'Cadastrar nova Pessoa Juridica'
}

const PATTERNS = {
  CPF: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
  CNPJ: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
  RG: /^\d{1,2}\.\d{3}\.\d{3}-[\dxX]$/,
  IE: /^\d{3}\.?\d{3}\.?\d{3}\.?\d{3}$/,
};

export const applyNaturalPersonSchemaPath = (schema: any) => {
  required(schema.nickname, { message: 'O campo apelido é obrigatório!' });

  required(schema.name, { message: 'O campo nome é obrigatório!' });
  minLength(schema.name, 3, { message: 'O campo nome precisa no mínimo de 3 letras!' });

  required(schema.federalDocument, { message: 'O campo CPF é obrigatório!' });
  pattern(schema.federalDocument, PATTERNS.CPF, {
    message: 'O campo CPF precisa estar no padrão 000.000.000-00!',
  });

  required(schema.stateDocument, { message: 'O campo RG é obrigatório!' });
  pattern(schema.stateDocument, PATTERNS.RG, {
    message: 'O campo RG precisa estar no padrão 00.000.000-0!',
  });

  required(schema.gender, { message: 'O campo gênero é obrigatório!' });
  required(schema.date, { message: 'O campo data de nascimento é obrigatório!' });

  applyAddressesSchemaPath(schema);
};

export const applyLegalPersonSchemaPath = (schema: any) => {
  required(schema.nickname, { message: 'O campo nome fantasia é obrigatório!' });
  required(schema.name, { message: 'O campo razão social é obrigatório!' });
  minLength(schema.name, 3, { message: 'O campo razão social precisa no mínimo de 3 letras!' });

  required(schema.federalDocument, { message: 'O campo CNPJ é obrigatório!' });
  pattern(schema.federalDocument, PATTERNS.CNPJ, {
    message: 'O campo CNPJ precisa estar no padrão 00.000.000/0000-00!',
  });

  required(schema.stateDocument, { message: 'O campo Inscriçao Estadual é obrigatório!' });
  pattern(schema.stateDocument, PATTERNS.IE, {
    message: 'O campo IE precisa estar no padrão 000.000.000.000!',
  });

  applyAddressesSchemaPath(schema);
};

export const applyAddressesSchemaPath = (schema: any) => {
  minLength(schema.addresses, 1, { message: 'É necessário cadastrar pelo menos um endereço!' });
};
