import { Component, computed, inject, signal } from '@angular/core';
import { IPersonWebFormConfig } from '../interfaces/person-web-config';
import {
  ILegalPerson,
  INaturalPerson,
  TPersonModel,
  TPersonType,
} from '../interfaces/person-model';
import { BaseForms } from '../../../shared/class/base-form';
import { ActivatedRoute, Router } from '@angular/router';
import { FieldTree, required } from '@angular/forms/signals';
import {
  applyLegalPersonSchemaPath,
  applyNaturalPersonSchemaPath,
  ENTITIES_PERSON_FORM,
  NATURAL_PERSON_FORM,
} from '../tools/person-setup';
import { FormInput } from '../../../shared/components/form-input/form-input';
import { AddressForm } from './components/address-form/address-form';
import { IAddressModel } from '../interfaces/address-model';
import { AddressList } from './components/address-list/address-list';
import { ToastService } from '../../../shared/components/toast-messages/services/toast-service';
import { IAddressEvent } from '../interfaces/address-event';
import { PeopleService } from '../services/people-service';
import { TranslatePipe } from '@ngx-translate/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Modal } from '../../../shared/components/modal/modal';
import { ModalDeactivate } from './components/modal-deactivate/modal-deactivate';

@Component({
  selector: 'app-peoples',
  imports: [FormInput, AddressForm, AddressList, TranslatePipe, Modal, ModalDeactivate],
  templateUrl: './people.html',
  styleUrl: './people.scss',
})
export class People extends BaseForms<TPersonModel> {
  toastService = inject(ToastService);

  peopleService = inject(PeopleService);

  route = inject(ActivatedRoute);

  router = inject(Router);

  html!: IPersonWebFormConfig;

  createAddress = signal<boolean>(false);

  editAddress = signal<IAddressEvent | null>(null);

  deactivateAddress = signal<IAddressEvent | null>(null);

  addresses = computed(() => this.model().addresses);

  onEditing = computed(() => (this.editAddress() ? true : false));

  onDeactivating = computed(() => this._deactivate());

  private _deactivate = signal<boolean>(false);

  constructor() {
    super();
    this.createForm(this.createModel(), (Path) => {
      if (this.isNaturalPerson()) {
        applyNaturalPersonSchemaPath(Path);
      } else {
        applyLegalPersonSchemaPath(Path);
      }
    });
    this.setHtmlConfig();
  }

  override createModel(): TPersonModel {
    const routeData = toSignal(this.route.data);
    const data = routeData()?.['data'];
    if (data) {
      return data;
    } else {
      if (this.isNaturalPerson()) {
        return this.makeNaturalPersonModel();
      } else {
        return this.makeLegalPersonModel();
      }
    }
  }

  override onSalve(): void {
    this.peopleService.save(this.model(), this.model().id).subscribe({
      next: () => {
        this.router.navigate([
          'people',
          'list',
          this.isNaturalPerson() ? 'naturalPerson' : 'legalPerson',
        ]);
      },
    });
  }

  override onCancel(): void {
    if (this.isNaturalPerson()) {
      this.router.navigate(['people', 'list', 'naturalPerson']);
    } else {
      this.router.navigate(['people', 'list', 'legalPerson']);
    }
  }

  isAddressModeForm() {
    return this.createAddress();
  }

  isNaturalPerson(data?: TPersonModel): boolean {
    const peopleType = this.route.snapshot.routeConfig?.path?.includes('naturalPerson') ? 'F' : 'J';
    return peopleType == 'F';
  }

  setHtmlConfig() {
    if (this.isNaturalPerson()) {
      this.html = NATURAL_PERSON_FORM;
    } else {
      this.html = ENTITIES_PERSON_FORM;
    }
  }

  onEditForm(event: IAddressEvent) {
    this.createAddress.set(true);
    this.editAddress.set(event);
  }

  onCancelForm(event: boolean) {
    this.editAddress.set(null);
    this.createAddress.set(event);
  }

  onDelList(event: IAddressEvent) {
    this.deactivateAddress.set(event);
    this._deactivate.set(true);
  }

  onDelModal(event: IAddressEvent) {
    if (this.validateDelAddress(event.address, event.index!)) {
      this.model.update((value) => {
        value.addresses[event.index!] = {
          ...value.addresses[event.index!],
          active: !value.addresses[event.index!].active,
        };
        return { ...value };
      });
    }
    this._deactivate.set(false);
  }

  onSalveForm(event: IAddressEvent) {
    if (!this.onEditing()) {
      if (this.validateAddress(event.address)) {
        this.model.update((value) => {
          return {
            ...value,
            addresses: [...value.addresses, event.address],
          };
        });
        this.createAddress.update((value) => !value);
      }
    } else {
      if (this.validateEditAddress(event.address, event.index!)) {
        this.model.update((value) => {
          value.addresses[event.index!] = event.address;
          return { ...value };
        });
        this.editAddress.set(null);
        this.createAddress.update((value) => !value);
      }
    }
  }

  validateAddress(address: IAddressModel): boolean {
    const thereIsTypeAddress = this.addresses().find(
      (value) => value.typeAddress === address.typeAddress,
    );
    if (thereIsTypeAddress) {
      this.toastService.show('Não é possivel cadastrar dois endereços do mesmo tipo!', 'danger');
      return false;
    }

    return true;
  }

  validateEditAddress(address: IAddressModel, index: number): boolean {
    const thereIsTypeAddress = this.addresses().find(
      (value, position) => value.typeAddress === address.typeAddress && position != index,
    );

    if (thereIsTypeAddress) {
      this.toastService.show(
        'Não é possivel atualizar o tipo de endereço para um existente!',
        'danger',
      );
      return false;
    }

    return true;
  }

  validateDelAddress(address: IAddressModel, index: number): boolean {
    const thereIsTypeAddress = this.addresses().find(
      (value, position) => value.typeAddress === address.typeAddress && position == index,
    );

    if (thereIsTypeAddress?.typeAddress == 'M') {
      this.toastService.show('Não é possivel desativar o tipo de endereço moradia!', 'danger');
      return false;
    }

    return true;
  }

  onClosedModal() {
    this._deactivate.set(false);
  }

  private makeNaturalPersonModel(): INaturalPerson {
    return {
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
    } as INaturalPerson;
  }

  private makeLegalPersonModel() {
    return {
      id: null,
      name: '',
      nickname: '',
      active: true,
      federalDocument: '',
      peopleType: 'J',
      stateDocument: '',
      addresses: [],
      bond: null,
    } as ILegalPerson;
  }

  get formName() {
    return this.formData.name;
  }

  get formNickname() {
    return this.formData.nickname;
  }

  get formType() {
    return this.formData.peopleType;
  }

  get formStateDocument() {
    return this.formData.stateDocument;
  }

  get formFederalDocument() {
    return this.formData.federalDocument;
  }

  get formActive() {
    return this.formData.active;
  }

  get formGender() {
    return (this.formData as FieldTree<INaturalPerson>).gender;
  }

  get formDate() {
    return (this.formData as FieldTree<INaturalPerson>).date;
  }

  get formBond() {
    return (this.formData as FieldTree<ILegalPerson>).bond;
  }
}
