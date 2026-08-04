import { Injectable } from '@angular/core';
import { BaseServices } from '../../../../shared/services/base-services';
import { IBrandModel } from '../interfaces/brand-model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BrandService extends BaseServices<IBrandModel, any> {
  override endPoint = '/victor/marca';

  override search(): Observable<IBrandModel[]> {
    const results = this.http.get(`${this.host}${this.endPoint}`).pipe(
      map((value: any) => {
        const data = value.data;
        return data.map(
          (valueData: any) =>
            ({
              id: valueData.id,
              name: valueData.nome,
            }) as IBrandModel,
        );
      }),
    );

    return results;
  }

  override searchId(id: string | number): Observable<IBrandModel> {
    const results = this.http.get(`${this.host}${this.endPoint}/${id}`).pipe(
      map((value: any) => {
        const [data] = value.data;

        return {
          id: data.id,
          name: data.nome,
        } as IBrandModel;
      }),
    );

    return results;
  }

  override save(model: IBrandModel, id: string | number | null): Observable<IBrandModel> {
    if (id) {
      const results = this.http.put(`${this.host}${this.endPoint}/${id}`, this.mapDto(model)).pipe(
        map((value: any) => {
          const data = value.data;
          return {
            id: data.id,
          } as IBrandModel;
        }),
      );

      return results;
    } else {
      const results = this.http.post(`${this.host}${this.endPoint}`, this.mapDto(model)).pipe(
        map((value: any) => {
          const data = value.data;
          return {
            id: data.id,
          } as IBrandModel;
        }),
      );

      return results;
    }
  }

  override delete(id: string | number): Observable<IBrandModel> {
    const results = this.http.delete(`${this.host}${this.endPoint}/${id}`).pipe(
      map((value: any) => {
        const data = value.data;
        return {
          id: data.id,
        } as IBrandModel;
      }),
    );

    return results;
  }

  override mapDto(model: IBrandModel): any {
    return {
      id: model.id,
      nome: model.name,
    };
  }
}
