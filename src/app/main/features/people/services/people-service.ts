import { Injectable } from '@angular/core';
import { BaseServices } from '../../../shared/services/base-services';
import { ILegalPerson, INaturalPerson, TPersonModel } from '../interfaces/person-model';
import { map, Observable, of } from 'rxjs';
import { IAddressModel } from '../interfaces/address-model';

@Injectable({
  providedIn: 'root',
})
export class PeopleService extends BaseServices<TPersonModel, any> {
  override endPoint: string = '/victor/pessoa/';

  override save(model: TPersonModel, id: string | number | null): Observable<TPersonModel> {
    this.http
      .post(`${this.host}${this.endPoint}`, this.mapDto(model))
      .subscribe((value) => console.log(value));

    return of({} as TPersonModel);
  }

  override mapDto(model: TPersonModel) {
    if (model.peopleType == 'F') {
      return this.mapDtoNaturalPerson(model);
    } else {
      return this.mapDtoLegalPerson(model);
    }
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

  private dtoActive(active: boolean) {
    return active ? 'A' : 'I';
  }

  private dtoDate(date : string) {
    const dataEntrada = date.split('-');

    const day = parseInt(dataEntrada[2]);
    const month = parseInt(dataEntrada[1]);
    const year = parseInt(dataEntrada[0]);

    return `${day}/${month}/${year}`;
  }
}
