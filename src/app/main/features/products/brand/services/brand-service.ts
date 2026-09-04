import { Injectable } from '@angular/core';
import { BaseServices } from '../../../../shared/services/base-services';
import { IBrandModel } from '../interfaces/brand-model';
import { map, Observable } from 'rxjs';
import { IBrandServiceModel } from '../interfaces/brand-service-model';
import { IApiResponse } from '../../../../shared/interfaces/api-response';

@Injectable({
  providedIn: 'root',
})
export class BrandService extends BaseServices<IBrandModel, IBrandServiceModel> {
  override readonly endPoint = '/victor/marca';

  search(): Observable<IBrandModel[]> {
    return this.processObservable(
      this.http.get<IApiResponse<IBrandServiceModel[]>>(`${this.host}${this.endPoint}`),
    ).pipe(map(({ data }) => data.map((item) => this.mapModel(item))));
  }

  searchId(id: string | number): Observable<IBrandModel> {
    return this.processObservable(
      this.http.get<IApiResponse<IBrandServiceModel[]>>(`${this.host}${this.endPoint}/${id}`),
    ).pipe(map(({ data }) => this.mapModel(data[0])));
  }

  save(model: IBrandModel, id: string | number | null): Observable<IBrandModel> {
    const request = id
      ? this.http.put<IApiResponse<IBrandServiceModel[]>>(
          `${this.host}${this.endPoint}/${id}`,
          this.mapDto(model),
        )
      : this.http.post<IApiResponse<IBrandServiceModel[]>>(
          `${this.host}${this.endPoint}`,
          this.mapDto(model),
        );

    return this.processObservable(request).pipe(
      map(({ data }) => {
        const item = data[0];
        return item ? this.mapModel(item) : { ...model, id };
      }),
    );
  }

  delete(id: string | number): Observable<IBrandModel> {
    return this.processObservable(
      this.http.delete<IApiResponse<IBrandServiceModel[]>>(`${this.host}${this.endPoint}/${id}`),
    ).pipe(
      map(({ data }) => {
        const item = data[0];
        return item ? this.mapModel(item) : { id, name: '' };
      }),
    );
  }

  override mapDto(model: IBrandModel): IBrandServiceModel {
    return {
      id: typeof model.id === 'number' ? model.id : null,
      nome: model.name,
    };
  }

  private mapModel(model: IBrandServiceModel): IBrandModel {
    return {
      id: model.id,
      name: model.nome,
    };
  }
}
