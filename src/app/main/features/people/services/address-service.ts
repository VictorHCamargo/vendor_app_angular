import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { IAddressModel } from '../interfaces/address-model';
import { BaseServices } from '../../../shared/services/base-services';
import { IStateModel } from '../interfaces/state-model';

@Injectable({
  providedIn: 'root',
})
export class AddressService extends BaseServices<IAddressModel, null> {
  override endPoint: string = '/victor/endereco';

  getStates() {
    return this.http.get(`${this.host}${this.endPoint}/estados`).pipe(
      map((data: any) => {
        return data.data.map((valueData: any) => {
          return {
            abbreviated: valueData.sigla,
            name: valueData.nome,
          } as IStateModel;
        });
      }),
    );
  }

  getAddressByZipCode(zipCode: string) {
    return this.http.post(`${this.host}${this.endPoint}/localidade/cep`, { cep: zipCode }).pipe(
      map((data: any) => {
        const valueData: any = data.data;
        if (valueData.cep != '') {
          return {
            city: valueData.cidade,
            neighborhood: valueData.bairro,
            state: valueData.estado.sigla,
            street: valueData.logradouro,
            hasZipCode: true,
          } as Partial<IAddressModel>;
        } else {
          return {
            hasZipCode : false
          };
        }
      }),
    );
  }
}
