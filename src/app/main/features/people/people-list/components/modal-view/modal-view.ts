import {
  Component,
  computed,
  effect,
  inject,
  input,
  OnInit,
  output,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { ILegalPerson, INaturalPerson, TPersonModel } from '../../../interfaces/person-model';
import { BadgeActivePipe } from '../../../../../shared/pipe/badge-active-pipe';
import { FormInput } from '../../../../../shared/components/form-input/form-input';
import { FieldTree, form } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { Table } from '../../../../../shared/components/table/table';
import { ITableConfig } from '../../../../../shared/components/table/interfaces/table-config';
import { IAddressModel, TTypeAddress } from '../../../interfaces/address-model';
import { IPersonWebFormConfig } from '../../../interfaces/person-web-config';
import { ENTITIES_PERSON_FORM, NATURAL_PERSON_FORM } from '../../../tools/person-setup';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-modal-view',
  imports: [BadgeActivePipe, FormInput, Table, TranslatePipe],
  templateUrl: './modal-view.html',
  styleUrl: './modal-view.scss',
})
export class ModalView implements OnInit{
  person = input<TPersonModel | null>(null);

  isNaturalPerson = input.required<boolean>();

  onClosed = output<void>();

  router = inject(Router);

  html! : IPersonWebFormConfig;

  tableConfig = computed<ITableConfig<IAddressModel>>(() => {
    return {
      buttons: [],
      data: this.person()?.addresses!,
      titles: [
        {
          name: 'MAIN.FEATURES.ADDRESSES.TYPEADDRESS',
          dataField: 'typeAddress',
          transform: (value: TTypeAddress) =>
            ({
              M: 'bi bi-house-door',
              C: 'bi bi-building',
              E: 'bi bi-truck',
            })[value] ?? 'bi bi-geo-alt',
        },
        { dataField: 'zipCode', name: 'MAIN.FEATURES.ADDRESSES.ZIPCODE' },
        { dataField: 'city', name: 'MAIN.FEATURES.ADDRESSES.CITY' },
        { dataField: 'state', name: 'MAIN.FEATURES.ADDRESSES.STATE' },
        { dataField: 'neighborhood', name: 'MAIN.FEATURES.ADDRESSES.NEIGHBORHOOD' },
        { dataField: 'street', name: 'MAIN.FEATURES.ADDRESSES.STREET' },
        { dataField: 'number', name: 'MAIN.FEATURES.ADDRESSES.NUMBER' },
      ],
    };
  });

  private model: WritableSignal<TPersonModel> = signal({
    id: null,
    name: '',
    nickname: '',
    active: true,
    federalDocument: '',
    peopleType: 'F',
    stateDocument: '',
    date: '',
    gender: 'M',
    addresses: [],
  } as TPersonModel);

  private formData: WritableSignal<FieldTree<TPersonModel>> = signal(form(this.model));

  constructor() {
    effect(() => {
      const person = this.person();
      if (person) {
        this.model.set(person);
      }
    });
    
  }
  ngOnInit(): void {
    this.setHtmlConfig()
  }

  onEdit(id: any) {
    if (this.isNaturalPerson()) {
      this.router.navigate(['people', 'form', 'naturalPerson', `${id}`]);
      this.onClosed.emit();
    } else {
      this.router.navigate(['people', 'form', 'legalPerson', `${id}`]);
      this.onClosed.emit();
    }
  }

  setHtmlConfig() {
      if (this.isNaturalPerson()) {
        this.html = NATURAL_PERSON_FORM;
      } else {
        this.html = ENTITIES_PERSON_FORM;
      }
    }
  

  get formName() {
    return this.formData().name;
  }
  get formNickname() {
    return this.formData().nickname;
  }
  get formType() {
    return this.formData().peopleType;
  }
  get formStateDocument() {
    return this.formData().stateDocument;
  }
  get formFederalDocument() {
    return this.formData().federalDocument;
  }
  get formActive() {
    return this.formData().active;
  }
  get formGender() {
    return (this.formData() as FieldTree<INaturalPerson>).gender;
  }
  get formDate() {
    return (this.formData() as FieldTree<INaturalPerson>).date;
  }
  get formBond() {
    return (this.formData() as FieldTree<ILegalPerson>).bond;
  }
}
