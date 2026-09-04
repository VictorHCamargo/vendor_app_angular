import { Component, computed, inject, input, OnInit, output, signal } from '@angular/core';
import { BaseForms } from '../../../../../shared/class/base-form';
import { IAddressModel } from '../../../interfaces/address-model';
import { FormInput } from '../../../../../shared/components/form-input/form-input';
import { disabled, maxLength, pattern, required } from '@angular/forms/signals';
import { AddressService } from '../../../services/address-service';
import { IAddressEvent } from '../../../interfaces/address-event';
import { IStateModel } from '../../../interfaces/state-model';
import { TOpitons } from '../../../../../shared/components/form-input/interfaces/form-input-config';
import { TranslatePipe } from '@ngx-translate/core';
import { FormActions } from '../../../../../shared/components/form-actions/form-actions';

const PATTERNS = {
  CEP: /^\d{5}-\d{3}$/,
};

@Component({
  selector: 'app-address-form',
  imports: [FormInput, TranslatePipe, FormActions],
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

  canceled = output<boolean>();

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
          message: 'MAIN.FEATURES.ADDRESSES.VALIDATION.ZIP_CODE_FORMAT',
        });
        maxLength(Path.zipCode, 9, { message: 'MAIN.FEATURES.ADDRESSES.VALIDATION.ZIP_CODE_MAX' });
        required(Path.street, { message: 'MAIN.FEATURES.ADDRESSES.VALIDATION.STREET_REQUIRED' });
        maxLength(Path.street, 128, { message: 'MAIN.FEATURES.ADDRESSES.VALIDATION.STREET_MAX' });
        required(Path.number, { message: 'MAIN.FEATURES.ADDRESSES.VALIDATION.NUMBER_REQUIRED' });
        maxLength(Path.number, 12, { message: 'MAIN.FEATURES.ADDRESSES.VALIDATION.NUMBER_MAX' });
        required(Path.neighborhood, {
          message: 'MAIN.FEATURES.ADDRESSES.VALIDATION.NEIGHBORHOOD_REQUIRED',
        });
        maxLength(Path.neighborhood, 64, {
          message: 'MAIN.FEATURES.ADDRESSES.VALIDATION.NEIGHBORHOOD_MAX',
        });
        required(Path.city, { message: 'MAIN.FEATURES.ADDRESSES.VALIDATION.CITY_REQUIRED' });
        maxLength(Path.city, 64, { message: 'MAIN.FEATURES.ADDRESSES.VALIDATION.CITY_MAX' });
        required(Path.state, { message: 'MAIN.FEATURES.ADDRESSES.VALIDATION.STATE_REQUIRED' });
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

  getByZipCode(event: Event): void {
    const element = event.target as HTMLInputElement;
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
      error: () => {
        this.model.update((valueModel) => {
          return {
            ...valueModel,
            city: '',
            state: '',
            neighborhood: '',
            street: '',
            hasZipCode: false,
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

  override onSave(): void {
    if (this.onEditing()) {
      this.salve.emit({
        address: this.model(),
        index: this.addressEvent()?.index ?? null,
      });
    } else {
      this.salve.emit({
        address: this.model(),
        index: null,
      });
    }
  }

  override onCancel(): void {
    this.canceled.emit(false);
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
