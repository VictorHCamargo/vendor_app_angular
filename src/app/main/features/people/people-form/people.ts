import { Component, inject } from '@angular/core';
import { IPersonWebConfig } from '../interfaces/person-web-config';
import { IPersonModel } from '../interfaces/person-model';
import { BaseForms } from '../../../shared/class/base-form';
import { ActivatedRoute } from '@angular/router';
import { FieldTree, required } from '@angular/forms/signals';
import { ENTITIES_PERSON, NATURAL_PERSON } from '../tools/person-setup';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormInput } from '../../../shared/components/form-input/form-input';
import {
  IFormInputConfig,
  TTypeInput,
} from '../../../shared/components/form-input/interfaces/form-input-config';

@Component({
  selector: 'app-peoples',
  imports: [FormInput],
  templateUrl: './people.html',
  styleUrl: './people.scss',
})
export class People extends BaseForms<IPersonModel> {
  route = inject(ActivatedRoute);
  html!: IPersonWebConfig;

  testForm!: IFormInputConfig<IPersonModel>;

  testRadio!: IFormInputConfig<IPersonModel>;

  testSelect!: IFormInputConfig<IPersonModel>;

  constructor() {
    super();
    this.createForm(this.createModel(), (Path) => {
      required(Path.name, { message: 'O campo nome é obrigatorio!!' });
    });
    this.testForm = {
      idLabel: 'name',
      inputField: this.formData.name,
      messageId: 'name',
      nameLabel: 'Nome',
      type: 'text',
      typeInput: 'input',
    };

    this.testRadio = {
      typeInput: 'radio',
      inputField: this.formData.active,
      messageId: 'active',
      options: [
        {
          data: 'Ativo',
          value: 'A',
        },
        {
          data: 'Inativo',
          value: 'I',
        },
      ],
    };

    this.testSelect = {
      typeInput: 'select',
      inputField: this.formData.nickname,
      messageId: 'nickname',
      nameLabel: 'Sobrenome',
      options: [
        {
          data: 'Camargo',
          value: 'Camargo',
        },
        {
          data: 'Hugo',
          value: 'Hugo',
        },
      ],
    };
    this.setHtmlConfig();
  }

  override createModel(): IPersonModel {
    const routeData = toSignal(this.route.data);
    const data = routeData()?.['data'];

    return data as IPersonModel;
  }

  isNaturalPerson(): boolean {
    return this.model().peopleType == 'F';
  }

  createConfigInput(
    type: TTypeInput,
    config: Omit<Partial<IFormInputConfig<IPersonModel>>, 'typeInput' | 'messageId' | 'inputField'>,
    idLabel: keyof IPersonModel,
    inputField: FieldTree<string | number | null | boolean>,
    messageId : string
  ): IFormInputConfig<IPersonModel> {
    return {
      idLabel,
      typeInput: type,
      messageId,
      inputField,
      ...config,
    };
  }

  setHtmlConfig() {
    if (this.isNaturalPerson()) {
      this.html = NATURAL_PERSON;
    } else {
      this.html = ENTITIES_PERSON;
    }
  }

  override onSalve(): void {
    console.log(this.model());
  }
}
