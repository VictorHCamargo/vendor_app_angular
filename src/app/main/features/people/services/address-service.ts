import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IAddressModel } from '../interfaces/address-model';
import { BaseServices } from '../../../shared/services/base-services';
import { IStateModel } from '../interfaces/state-model';
import { IApiResponse } from '../../../shared/interfaces/api-response';

interface IStateApiModel {
  sigla: string;
  nome: string;
}

interface IZipCodeApiModel {
  bairro?: string;
  cep?: string;
  cidade?: string;
  estado?: { sigla: string };
  logradouro?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AddressService extends BaseServices<IAddressModel, null> {
  override readonly endPoint = '/victor/endereco';

  getStates(): Observable<IStateModel[]> {
    return this.processObservable(
      this.http.get<IApiResponse<IStateApiModel[]>>(`${this.host}${this.endPoint}/estados`),
    ).pipe(
      map(({ data }) =>
        data.map((state) => ({
          abbreviated: state.sigla,
          name: state.nome,
        })),
      ),
    );
  }

  getAddressByZipCode(zipCode: string): Observable<Partial<IAddressModel>> {
    return this.processObservable(
      this.http.post<IApiResponse<IZipCodeApiModel>>(
        `${this.host}${this.endPoint}/localidade/cep`,
        {
          cep: zipCode,
        },
      ),
    ).pipe(
      map(({ data }) => {
        if (data.cep) {
          return {
            city: data.cidade ?? '',
            neighborhood: data.bairro ?? '',
            state: data.estado?.sigla ?? '',
            street: data.logradouro ?? '',
            hasZipCode: true,
          };
        }

        return { hasZipCode: false };
      }),
    );
  }
}
