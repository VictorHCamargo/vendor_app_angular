import { inject, Injectable } from '@angular/core';
import { BaseServices } from '../../../shared/services/base-services';
import {
  ILegalPerson,
  INaturalPerson,
  TPersonModel,
  TPersonType,
} from '../interfaces/person-model';
import { map, Observable, of } from 'rxjs';
import { IAddressModel } from '../interfaces/address-model';
import { ToastService } from '../../../shared/components/toast-messages/services/toast-service';
import { AddressService } from './address-service';

@Injectable({
  providedIn: 'root',
})
export class PeopleService extends BaseServices<TPersonModel, any> {
  override endPoint: string = '/victor/pessoa/';
  toastService = inject(ToastService);
  addressService = inject(AddressService);

  override save(model: TPersonModel, id: string | number | null): Observable<TPersonModel> {
    if (id) {
      const results = this.http.put(`${this.host}${this.endPoint}${id}`, this.mapDto(model)).pipe(
        map((value: any) => {
          this.toastService.show('Pessoa atualizada com sucesso!', 'success');
          return {
            id: value.id,
          } as TPersonModel;
        }),
      );
      return results;
    } else {
      const results = this.http.post(`${this.host}${this.endPoint}`, this.mapDto(model)).pipe(
        map((value: any) => {
          this.toastService.show('Pessoa cadastrada com sucesso!', 'success');
          return {
            id: value.id,
          } as TPersonModel;
        }),
      );

      return results;
    }
  }

  override searchId(id: string | number): Observable<TPersonModel> {
    const results = this.http.get(`${this.host}${this.endPoint}${id}`).pipe(
      map((value: any) => {
        const data = value.data;
        if (data.tipo_pessoa == 'F') {
          return this.mapDtoNaturalPersonOut(data);
        } else {
          return this.mapDtoLegalPersonOut(data);
        }
      }),
    );

    return results;
  }

  override mapDto(model: TPersonModel) {
    if (model.peopleType == 'F') {
      return this.mapDtoNaturalPerson(model);
    } else {
      return this.mapDtoLegalPerson(model);
    }
  }

  searchByQuery(typePerson: TPersonType): Observable<TPersonModel[]> {
    const results = this.http.get(`${this.host}${this.endPoint}/?esp=${typePerson}`).pipe(
      map((value: any) => {
        const data = value.data;
        return data.map((valueData: any) => {
          if (valueData.tipo_pessoa == 'F') {
            return this.mapDtoNaturalPersonOut(valueData);
          } else {
            return this.mapDtoLegalPersonOut(valueData);
          }
        }) as TPersonModel[];
      }),
    );

    return results;
  }

  private searchAddress(id: number) {
    const results = this.http.get(`${this.host}${this.endPoint}e/${id}`).pipe(
      map((value: any) => {
        const data = value.data;
        return data.map((valueData: any) => {
          return this.mapDtoAddressOut(valueData, id);
        })[0];
      }),
    );
    return results;
  }

  private mapDtoNaturalPerson(model: INaturalPerson): any {
    return {
      nome: model.name,
      apelido: model.nickname,
      tipo_pessoa: model.peopleType,
      sexo: model.gender,
      data_nascimento: this.dtoDate(model.date),
      documento_federal: model.federalDocument,
      documento_estadual: model.stateDocument,
      ativo: this.dtoActive(model.active),
      enderecos: this.mapDtoAddress(model.addresses),
    };
  }

  private mapDtoNaturalPersonOut(model: any): INaturalPerson {
    if (model.enderecos == undefined) {
      return {
        id: model.id_pessoa,
        name: model.nome,
        nickname: model.apelido,
        federalDocument: model.documento_federal,
        stateDocument: model.documento_estadual,
        date: this.dtoDateOut(model.data_nascimento),
        gender: model.sexo,
        active: this.dtoActiveOut(model.ativo),
        peopleType: 'F',
        addresses: this.mapDtoAddressesOut([model.id_moradia, model.id_entrega, model.id_cobranca]),
      } as INaturalPerson;
    } else {
      return {
        id: model.id_pessoa,
        name: model.nome,
        nickname: model.apelido,
        federalDocument: model.documento_federal,
        stateDocument: model.documento_estadual,
        date: this.dtoDateOut(model.data_nascimento),
        gender: model.sexo,
        active: this.dtoActiveOut(model.ativo),
        peopleType: 'F',
        addresses: model.enderecos.map((value: any) => {
          return this.mapDtoAddressOut(value, value.id_endereco);
        }),
      } as INaturalPerson;
    }
  }

  private mapDtoLegalPerson(model: ILegalPerson): any {
    return {
      nome: model.name,
      apelido: model.nickname,
      tipo_pessoa: model.peopleType,
      documento_federal: model.federalDocument,
      documento_estadual: model.stateDocument,
      ativo: this.dtoActive(model.active),
      id_vinculo: model.bond,
      enderecos: this.mapDtoAddress(model.addresses),
    };
  }

  private mapDtoLegalPersonOut(model: any): ILegalPerson {
    if (model.enderecos == undefined) {
      return {
        id: model.id_pessoa,
        name: model.nome,
        nickname: model.apelido,
        federalDocument: model.documento_federal,
        stateDocument: model.documento_estadual,
        active: this.dtoActiveOut(model.ativo),
        peopleType: 'J',
        bond: model.id_vinculo,
        addresses: this.mapDtoAddressesOut([model.id_moradia, model.id_entrega, model.id_cobranca]),
      } as ILegalPerson;
    } else {
      return {
        id: model.id_pessoa,
        name: model.nome,
        nickname: model.apelido,
        federalDocument: model.documento_federal,
        stateDocument: model.documento_estadual,
        active: this.dtoActiveOut(model.ativo),
        peopleType: 'J',
        bond: model.id_vinculo,
        addresses: model.enderecos.map((value: any) => {
          return this.mapDtoAddressOut(value, value.id_endereco);
        }),
      } as ILegalPerson;
    }
  }

  private mapDtoAddress(addresses: IAddressModel[]): any {
    return addresses.map((value) => ({
      id_endereco: value.id,
      cep: value.zipCode,
      logradouro: value.street,
      numero: value.number,
      bairro: value.neighborhood,
      cidade: value.city,
      estado: value.state,
      tipo_endereco: value.typeAddress,
      ativo: this.dtoActive(value.active),
    }));
  }

  private mapDtoAddressesOut(ids: any): IAddressModel[] {
    const addresses: IAddressModel[] = [];

    ids.forEach((value: any) => {
      if (value)
        this.searchAddress(value).subscribe({
          next: (valueData) => {
            addresses.push(valueData);
          },
        });
    });

    return addresses;
  }

  private mapDtoAddressOut(address: any, id: number): IAddressModel {
    return {
      id: id,
      zipCode: address.cep,
      street: address.logradouro,
      neighborhood: address.bairro,
      number: address.numero,
      state: address.estado,
      city: address.cidade,
      active: address.ativo,
      typeAddress: address.tipo_endereco,
    } as IAddressModel;
  }

  private dtoActive(active: boolean) {
    return active ? 'A' : 'I';
  }
  private dtoActiveOut(active: string) {
    return active == 'A' ? true : false;
  }

  private dtoDate(date: string) {
    const dateIn = date.split('-');

    const day = parseInt(dateIn[2]);
    const month = parseInt(dateIn[1]);
    const year = parseInt(dateIn[0]);

    return `${day}/${month}/${year}`;
  }

  private dtoDateOut(date: string) {
    const dateOut = date.split('T');
    const dateSplit = dateOut[0].split('-');

    const day = dateSplit[2]
    const month = dateSplit[1]
    const year = dateSplit[0]

    return `${year}-${month}-${day}`;
  }

  byZipCode(zipCode: string): Observable<boolean> {
    return this.addressService
      .getAddressByZipCode(zipCode)
      .pipe(map((value) => value.hasZipCode ?? false));
  }
}
