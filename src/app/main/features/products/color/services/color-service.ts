import { Injectable } from '@angular/core';
import { BaseServices } from '../../../../shared/services/base-services';
import { IColorModel } from '../interfaces/color-model';
import { IColorServiceModel } from '../interfaces/color-service-model';
import { map, Observable } from 'rxjs';
import { IApiResponse } from '../../../../shared/interfaces/api-response';

@Injectable({
  providedIn: 'root',
})
export class ColorService extends BaseServices<IColorModel, IColorServiceModel> {
  override readonly endPoint = '/victor/cor';

  search(): Observable<IColorModel[]> {
    return this.processObservable(
      this.http.get<IApiResponse<IColorServiceModel[]>>(`${this.host}${this.endPoint}`),
    ).pipe(map(({ data }) => data.map((item) => this.mapModel(item))));
  }

  searchId(id: string | number): Observable<IColorModel> {
    return this.processObservable(
      this.http.get<IApiResponse<IColorServiceModel[]>>(`${this.host}${this.endPoint}/${id}`),
    ).pipe(map(({ data }) => this.mapModel(data[0])));
  }

  delete(id: string | number): Observable<IColorModel> {
    return this.processObservable(
      this.http.delete<IApiResponse<IColorServiceModel[]>>(`${this.host}${this.endPoint}/${id}`),
    ).pipe(
      map(({ data }) => {
        const item = data[0];
        return item ? this.mapModel(item) : { id, active: false, hexadecimal: '' };
      }),
    );
  }

  save(model: IColorModel, id: string | number | null): Observable<IColorModel> {
    const request = id
      ? this.http.put<IApiResponse<IColorServiceModel[]>>(
          `${this.host}${this.endPoint}/${id}`,
          this.mapDto(model),
        )
      : this.http.post<IApiResponse<IColorServiceModel[]>>(
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

  override mapDto(model: IColorModel): IColorServiceModel {
    return {
      id: model.id,
      hexadecimal: model.hexadecimal,
      ativo: model.active ? 'A' : 'I',
    };
  }

  private mapModel(model: IColorServiceModel): IColorModel {
    return {
      id: model.id,
      active: model.ativo === 'A',
      hexadecimal: model.hexadecimal,
    };
  }
}
