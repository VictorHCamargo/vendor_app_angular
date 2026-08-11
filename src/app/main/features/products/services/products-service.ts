import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BaseServices } from '../../../shared/services/base-services';
import { IProductsModel } from '../interfaces/products-model';
import { IProductsServiceModel } from '../interfaces/products-service-model';
import { IProductsSelectOption } from '../interfaces/products-select-option-model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService extends BaseServices<IProductsModel, IProductsServiceModel> {
  override endPoint = '/victor/produto';

  override search(): Observable<IProductsModel[]> {
    return this.http.get(`${this.host}${this.endPoint}`).pipe(
      map((value: any) => {
        const data = (value.data ?? []) as IProductsServiceModel[];
        return data.map((item) => this.mapModel(item));
      }),
    );
  }

  searchByName(nome: string): Observable<IProductsModel[]> {
    return this.http.get(`${this.host}${this.endPoint}`, { params: { nome } }).pipe(
      map((value: any) => {
        const data = (value.data ?? []) as IProductsServiceModel[];
        return data.map((item) => this.mapModel(item));
      }),
    );
  }

  override searchId(id: string | number): Observable<IProductsModel> {
    return this.http.get(`${this.host}${this.endPoint}/${id}`).pipe(
      map((value: any) => {
        const [data] = (value.data ?? []) as IProductsServiceModel[];
        return this.mapModel(data);
      }),
    );
  }

  override save(model: IProductsModel, id: string | number | null): Observable<IProductsModel> {
    const payload = this.mapDto(model);
    const request$ = id
      ? this.http.put(`${this.host}${this.endPoint}/${id}`, payload)
      : this.http.post(`${this.host}${this.endPoint}`, payload);

    return request$.pipe(
      map((value: any) => {
        const [data] = (value.data ?? []) as { id: number }[];
        return { id: data?.id ?? id } as IProductsModel;
      }),
    );
  }

  override delete(id: string | number): Observable<IProductsModel> {
    return this.http.delete(`${this.host}${this.endPoint}/${id}`).pipe(
      map((value: any) => {
        const [data] = (value.data ?? []) as { id: number }[];
        return { id: data?.id ?? id } as IProductsModel;
      }),
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
    return this.http
      .get(`${this.host}/victor/categoria`)
      .pipe(map((value: any) => this.mapSelectOptions(value)));
  }

  searchCoins(): Observable<IProductsSelectOption[]> {
    return this.http
      .get(`${this.host}/victor/moeda`)
      .pipe(map((value: any) => this.mapSelectOptions(value)));
  }

  searchMeasures(): Observable<IProductsSelectOption[]> {
    return this.http
      .get(`${this.host}/victor/medida`)
      .pipe(map((value: any) => this.mapSelectOptions(value)));
  }

  private mapSelectOptions(value: any): IProductsSelectOption[] {
    const data = (value?.data ?? []) as { id: number; nome: string }[];
    return data
      .filter((item) => item.nome != null)
      .map((item) => ({ id: item.id, name: item.nome }));
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
