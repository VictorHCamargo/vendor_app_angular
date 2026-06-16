import { maxLength, minLength, pattern, required } from '@angular/forms/signals';
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

const PATTERNS = {
  CPF: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
  CNPJ: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
  RG: /^\d{1,2}\.\d{3}\.\d{3}-[\dxX]$/,
  IE: /^\d{3}\.?\d{3}\.?\d{3}\.?\d{3}$/,
};

export const applyNaturalPersonSchemaPath = (schema: any) => {
  required(schema.nickname, { message: 'O campo apelido é obrigatório!' })

  required(schema.name, { message: 'O campo nome é obrigatório!' });
  minLength(schema.name, 3, { message: 'O campo nome precisa no mínimo de 3 letras!' });

  required(schema.federalDocument, { message: 'O campo CPF é obrigatório!' });
  pattern(schema.federalDocument, PATTERNS.CPF, {
    message: 'O campo CPF precisa estar no padrão 000.000.000-00!',
  });

  required(schema.stateDocument, { message: 'O campo RG é obrigatório!' } )
  pattern(schema.stateDocument, PATTERNS.RG, {
    message: 'O campo RG precisa estar no padrão 00.000.000-0!',
  });

  required(schema.gender, { message: 'O campo gênero é obrigatório!' });
  required(schema.date, { message: 'O campo data de nascimento é obrigatório!' });

  applyAddressesSchemaPath(schema);
};

export const applyLegalPersonSchemaPath = (schema: any) => {
  required(schema.nickname, { message: 'O campo nome fantasia é obrigatório!' })
  required(schema.name, { message: 'O campo razão social é obrigatório!' });
  minLength(schema.name, 3, { message: 'O campo razão social precisa no mínimo de 3 letras!' });
  
  required(schema.federalDocument, { message: 'O campo CNPJ é obrigatório!' });
  pattern(schema.federalDocument, PATTERNS.CNPJ, {
    message: 'O campo CNPJ precisa estar no padrão 00.000.000/0000-00!',
  });

  required(schema.stateDocument, { message: 'O campo Inscriçao Estadual é obrigatório!' } )
  pattern(schema.stateDocument, PATTERNS.IE, {
    message: 'O campo IE precisa estar no padrão 000.000.000.000!',
  });
  
  applyAddressesSchemaPath(schema);
};

export const applyAddressesSchemaPath = (schema : any) => {
  minLength(schema.addresses, 1, { message: 'É necessário cadastrar pelo menos um endereço!' });
}
