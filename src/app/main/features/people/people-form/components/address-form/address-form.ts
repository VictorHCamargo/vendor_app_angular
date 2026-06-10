import { Component, computed, inject, input, OnInit, output, signal } from '@angular/core';
import { BaseForms } from '../../../../../shared/class/base-form';
import { IAddressModel } from '../../../interfaces/address-model';
import { FormInput } from '../../../../../shared/components/form-input/form-input';
import { disabled, maxLength, minLength, pattern, required } from '@angular/forms/signals';
import { AddressService } from './service/address-service';
import { IAddressEvent } from '../../../interfaces/address-event';
import { IStateModel } from '../../../interfaces/state-model';
import { TOpitons } from '../../../../../shared/components/form-input/interfaces/form-input-config';

const PATTERNS = {
  CEP: /^\d{5}-\d{3}$/,
};

@Component({
  selector: 'app-address-form',
  imports: [FormInput],
  templateUrl: './address-form.html',
  styleUrl: './address-form.scss',
})
export class AddressForm extends BaseForms<IAddressModel> implements OnInit {
  addressService = inject(AddressService);

  addressEvent = input<IAddressEvent | null>(null);

  onEditing = computed(() => {
    return this.addressEvent() ? true : false;
  });

  salve = output<IAddressEvent>();

  cancel = output<boolean>();

  states = signal<IStateModel[]>([]);

  selectState = computed(() => {
    return this.states().map((value) => {
      return {
        data: value.name,
        value: value.abbreviated,
      } as TOpitons;
    });
  });

  constructor() {
    super();

    this.createForm(
      this.createModel({
        active: true,
        city: '',
        state: '',
        street: '',
        neighborhood: '',
        number: '',
        typeAddress: 'M',
        hasZipCode: false,
        zipCode: '',
        id: null,
        idPerson: null,
      }),
      (Path) => {
        pattern(Path.zipCode, PATTERNS.CEP, {
          message: 'CEP inválido. Formato esperado: 00000-000',
        });
        maxLength(Path.zipCode, 9, { message: 'CEP deve ter no máximo 9 caracteres' });
        required(Path.street, { message: 'Logradouro é obrigatório' });
        maxLength(Path.street, 128, { message: 'Logradouro deve ter no máximo 128 caracteres' });
        required(Path.number, { message: 'Número é obrigatório' });
        maxLength(Path.number, 12, { message: 'Número deve ter no máximo 12 caracteres' });
        required(Path.neighborhood, { message: 'Bairro é obrigatório' });
        maxLength(Path.neighborhood, 64, { message: 'Bairro deve ter no máximo 64 caracteres' });
        required(Path.city, { message: 'Cidade é obrigatória' });
        maxLength(Path.city, 64, { message: 'Cidade deve ter no máximo 64 caracteres' });
        required(Path.state, { message: 'Estado é obrigatório' });
        disabled(Path.street, () => this.isZipCoded);
        disabled(Path.neighborhood, () => this.isZipCoded);
        disabled(Path.city, () => this.isZipCoded);
        disabled(Path.state, () => this.isZipCoded);
      },
    );
  }

  ngOnInit(): void {
    if (this.addressEvent()) {
      this.model.set(this.addressEvent()!.address);
    }

    this.addressService.getStates().subscribe((value: IStateModel[]) => {
      this.states.set(value);
    });
  }

  getByZipCode(event: Event) {
    const element = event.target as any;
    const zipCode = element.value as string;

    const infoByZipCode = this.addressService.getAddressByZipCode(zipCode);
    infoByZipCode.subscribe({
      next: (value) => {
        this.model.update((valueModel) => {
          return {
            ...valueModel,
            city: value.city,
            state: value.state,
            neighborhood: value.neighborhood,
            street: value.street,
            hasZipCode: value.hasZipCode,
          } as IAddressModel;
        });
      },
      error: (value) => {
        this.model.update((valueModel) => {
          return {
            ...valueModel,
            city: '',
            state: '',
            neighborhood: '',
            street: '',
            hasZipCode: value.hasZipCode,
          } as IAddressModel;
        });
      },
    });
  }

  override createModel(model: IAddressModel): IAddressModel {
    const editModel = this.addressEvent()?.address;
    if (editModel != null) {
      return editModel;
    } else {
      return model;
    }
  }

  override onSalve(): void {
    if (this.onEditing()) {
      this.salve.emit({
        address: this.model(),
        index: this.addressEvent()?.index!,
      });
    } else {
      this.salve.emit({
        address: this.model(),
        index: null,
      });
    }
  }

  override onCancel(): void {
    this.cancel.emit(false);
  }

  get isZipCoded() {
    return this.model().hasZipCode;
  }

  get formStreet() {
    return this.formData.street;
  }

  get formNeighborhood() {
    return this.formData.neighborhood;
  }

  get formCity() {
    return this.formData.city;
  }

  get formState() {
    return this.formData.state;
  }

  get formNumber() {
    return this.formData.number;
  }

  get formActive() {
    return this.formData.active;
  }

  get formType() {
    return this.formData.typeAddress;
  }

  get formCode() {
    return this.formData.zipCode;
  }
}
