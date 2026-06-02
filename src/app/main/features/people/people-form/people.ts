import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { IPersonWebConfig } from '../interfaces/person-web-config';
import { IPersonModel, TPersonType } from '../interfaces/person-model';
import { BaseForms } from '../../../shared/class/base-form';
import { ActivatedRoute } from '@angular/router';
import { ErrorMessages } from '../../../shared/components/error-messages/error-messages';
import { Field } from '@angular/forms/signals';
import { ENTITIES_PERSON, ENTITIES_PERSON_MODEL, NATURAL_PERSON, NATURAL_PERSON_MODEL } from '../tools/person-setup';
import { toSignal } from '@angular/core/rxjs-interop';
import { Form } from '../../../shared/components/form/form';
import { IFormConfig } from '../../../shared/components/form/interfaces/form-config';

@Component({
  selector: 'app-peoples',
  imports: [ErrorMessages, Field,Form],
  templateUrl: './people.html',
  styleUrl: './people.scss',
})
export class People extends BaseForms<IPersonModel> {
  route = inject(ActivatedRoute);
  html!: IPersonWebConfig;
  formConfig! : IFormConfig<IPersonModel>

  constructor() {
    super();
    this.createForm(
      this.createModel(),
      (_Path) => {},
    );
    this.setHtmlConfig();
  }

  override createModel(): IPersonModel {
    const routeData = toSignal(this.route.data);
    const data = routeData()?.['data']

    return data as IPersonModel
  }

  isNaturalPerson(): boolean {
    return this.model().peopleType == 'F';
  }

  setHtmlConfig() {
    if (this.isNaturalPerson()) {
      this.html = NATURAL_PERSON;
    } else {
      this.html = ENTITIES_PERSON;
    }
  }

  setFormConfig() {
    if (this.isNaturalPerson()) {
      this.formConfig = {
        fieldsPerRow : 2,
        formInfo : NATURAL_PERSON_MODEL
      };
    } else {
      this.formConfig = ENTITIES_PERSON_MODEL;
    }
  } //TO-DO: Finalizar essa forma, ou perguntar para o tiago para encontrar outra forma mais simples de realizar isso!!
}
