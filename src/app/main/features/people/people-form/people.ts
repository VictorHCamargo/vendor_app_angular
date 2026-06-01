import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { IPersonWebConfig } from '../interfaces/person-web-config';
import { IPersonModel, TPersonType } from '../interfaces/person-model';
import { BaseForms } from '../../../shared/class/base-form';
import { ActivatedRoute } from '@angular/router';
import { ErrorMessages } from '../../../shared/components/error-messages/error-messages';
import { Field } from '@angular/forms/signals';
import { ENTITIES_PERSON, NATURAL_PERSON } from '../tools/person-setup';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-peoples',
  imports: [ErrorMessages, Field],
  templateUrl: './people.html',
  styleUrl: './people.scss',
})
export class People extends BaseForms<IPersonModel> {
  route = inject(ActivatedRoute);
  html!: IPersonWebConfig;

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
}
