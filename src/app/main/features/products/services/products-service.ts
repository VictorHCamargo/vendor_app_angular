import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BaseServices } from '../../../shared/services/base-services';
import { IProductsModel } from '../interfaces/products-model';
import { IProductsServiceModel } from '../interfaces/products-service-model';
import { IProductsSelectOption } from '../interfaces/products-select-option-model';
import { IApiResponse } from '../../../shared/interfaces/api-response';

interface IProductsSelectApiModel {
  id: number;
  nome: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService extends BaseServices<IProductsModel, IProductsServiceModel> {
  override readonly endPoint = '/victor/produto';

  search(): Observable<IProductsModel[]> {
    return this.processObservable(
      this.http.get<IApiResponse<IProductsServiceModel[]>>(`${this.host}${this.endPoint}`),
    ).pipe(map(({ data }) => data.map((item) => this.mapModel(item))));
  }

  searchByName(nome: string): Observable<IProductsModel[]> {
    return this.processObservable(
      this.http.get<IApiResponse<IProductsServiceModel[]>>(`${this.host}${this.endPoint}`, {
        params: { nome },
      }),
    ).pipe(map(({ data }) => data.map((item) => this.mapModel(item))));
  }

  searchId(id: string | number): Observable<IProductsModel> {
    return this.processObservable(
      this.http.get<IApiResponse<IProductsServiceModel[]>>(`${this.host}${this.endPoint}/${id}`),
    ).pipe(map(({ data }) => this.mapModel(data[0])));
  }

  save(model: IProductsModel, id: string | number | null): Observable<IProductsModel> {
    const request$ = id
      ? this.http.put<IApiResponse<{ id: number }[]>>(
          `${this.host}${this.endPoint}/${id}`,
          this.mapDto(model),
        )
      : this.http.post<IApiResponse<{ id: number }[]>>(
          `${this.host}${this.endPoint}`,
          this.mapDto(model),
        );

    return this.processObservable(request$).pipe(
      map(({ data }) => ({ ...model, id: data[0]?.id ?? id })),
    );
  }

  delete(id: string | number): Observable<IProductsModel> {
    return this.processObservable(
      this.http.delete<IApiResponse<{ id: number }[]>>(`${this.host}${this.endPoint}/${id}`),
    ).pipe(
      map(({ data }) => ({
        id: data[0]?.id ?? id,
        name: '',
        describe: '',
        idCategory: null,
        idCoin: null,
        idBrand: null,
        idColor: null,
        idUnitMeasure: null,
        idGroup: null,
        priceBuy: 0,
        priceSell: 0,
      })),
    );
  }

  override mapDto(model: IProductsModel): IProductsServiceModel {
    return {
      id: model.id ? Number(model.id) : null,
      nome: model.name,
      descricao: model.describe,
      id_categoria: model.idCategory ? Number(model.idCategory) : null,
      id_moeda: model.idCoin ? Number(model.idCoin) : null,
      id_marca: model.idBrand ? Number(model.idBrand) : null,
      id_cores: model.idColor ? Number(model.idColor) : null,
      id_unidade_medida: model.idUnitMeasure ? Number(model.idUnitMeasure) : null,
      id_grupo: model.idGroup ? Number(model.idGroup) : null,
      preco_compra: Number(model.priceBuy),
      preco_venda: Number(model.priceSell),
    };
  }

  searchCategories(): Observable<IProductsSelectOption[]> {
    return this.getSelectOptions('/victor/categoria');
  }

  searchCoins(): Observable<IProductsSelectOption[]> {
    return this.getSelectOptions('/victor/moeda');
  }

  searchMeasures(): Observable<IProductsSelectOption[]> {
    return this.getSelectOptions('/victor/medida');
  }

  private getSelectOptions(path: string): Observable<IProductsSelectOption[]> {
    return this.processObservable(
      this.http.get<IApiResponse<IProductsSelectApiModel[]>>(`${this.host}${path}`),
    ).pipe(map(({ data }) => this.mapSelectOptions(data)));
  }

  private mapSelectOptions(data: IProductsSelectApiModel[]): IProductsSelectOption[] {
    return data
      .filter((item) => item.nome != null)
      .map((item) => ({ id: item.id, name: item.nome ?? '' }));
  }

  private mapModel(item: IProductsServiceModel): IProductsModel {
    return {
      id: item.id,
      name: item.nome,
      describe: item.descricao,
      idCategory: item.id_categoria,
      idCoin: item.id_moeda,
      idBrand: item.id_marca,
      idColor: item.id_cores,
      idUnitMeasure: item.id_unidade_medida,
      idGroup: item.id_grupo,
      priceBuy: item.preco_compra,
      priceSell: item.preco_venda,
      nameCategory: item.nome_categoria,
      nameCoin: item.nome_moeda,
      nameBrand: item.nome_marca,
      nameGroup: item.nome_grupo,
      nameMeasure: item.nome_medida,
      colorHex: item.hexadecimal,
    };
  }
}
