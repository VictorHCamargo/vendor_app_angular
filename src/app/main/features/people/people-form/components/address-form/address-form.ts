import { Component } from '@angular/core';
import { BaseForms } from '../../../../../shared/class/base-form';
import { IAddressModel } from '../../../interfaces/address-model';
import { FormInput } from '../../../../../shared/components/form-input/form-input';

@Component({
  selector: 'app-address-form',
  imports: [FormInput],
  templateUrl: './address-form.html',
  styleUrl: './address-form.scss',
})
export class AddressForm extends BaseForms<IAddressModel> {
  
  constructor() {
    super()

    this.createForm(this.createModel({
      activate : 'A',
      city : '',
      state : '',
      street : '',
      neighborhood : '',
      number : '',
      typeAddress : 'M',
      hasZipCode : false,
      zipCode : '',
      id : null,
      idPerson : null,
    }),(Path) => {

    })
  }

  override createModel(model: IAddressModel): IAddressModel {
    return model
  }
}
